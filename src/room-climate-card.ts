import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import {
  HISTORY_REFRESH_MS,
  TICK_MS,
  CARD_TAG,
  EDITOR_TAG,
} from './const';
import {
  configEntityIds,
  hasChart,
  hasStatusRow,
  humidityBandColor,
  normalizeConfig,
  preferredCardHeight,
  resolveName,
  temperatureBandColor,
  type ResolvedConfig,
  type RoomClimateCardConfig,
} from './config';
import {
  readMotion,
  readSensor,
  readThermostat,
  readWindow,
  thermostatStatusColor,
  type SensorReading,
  type ThermostatReading,
} from './data/states';
import { HistoryRepository, type HistoryMap } from './data/history';
import { createTranslator, type Translator } from './localize';
import type { HomeAssistant } from './types';
import { formatNumber, formatRelative, withAlpha } from './utils/format';
import { icons } from './ui/icons';
import './chart/climate-chart';
import './editor/room-climate-editor';

type Density = 'xs' | 'sm' | 'md';

const WINDOW_OPEN_COLOR = '#fbbf24';
const MOTION_ACTIVE_COLOR = '#34d399';
const NEUTRAL_COLOR = 'var(--rcc-neutral)';

export class RoomClimateCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _history: { state: true },
    _historyLoading: { state: true },
    _historyError: { state: true },
    _density: { state: true },
    _now: { state: true },
    _historyWindow: { state: true },
    _haIconReady: { state: true },
  };

  hass?: HomeAssistant;

  _config?: ResolvedConfig;
  _history: HistoryMap = {};
  _historyLoading = false;
  _historyError?: string;
  _density: Density = 'md';
  _now = Date.now();
  _historyWindow: { start: number; end: number } = {
    start: Date.now() - 6 * 3600 * 1000,
    end: Date.now(),
  };

  private readonly repository = new HistoryRepository();
  private refreshTimer?: ReturnType<typeof setInterval>;
  private tickTimer?: ReturnType<typeof setInterval>;
  private resizeObserver?: ResizeObserver;
  private historyKey = '';
  private historyFetchedAt = 0;
  private pendingLoad?: ReturnType<typeof setTimeout>;
  private lastConnected = true;
  _haIconReady = typeof customElements !== 'undefined' && Boolean(customElements.get('ha-icon'));

  // ---------------------------------------------------------------- lifecycle

  connectedCallback(): void {
    super.connectedCallback();
    this.startTimers();
    if (typeof ResizeObserver !== 'undefined' && !this.resizeObserver) {
      this.resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;
        this.updateDensity(entry.contentRect.height);
      });
      this.resizeObserver.observe(this);
    }
    this.ensureHistory();
    if (!this._haIconReady && typeof customElements !== 'undefined') {
      customElements
        .whenDefined('ha-icon')
        .then(() => {
          this._haIconReady = true;
        })
        .catch(() => undefined);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.refreshTimer) clearInterval(this.refreshTimer);
    if (this.tickTimer) clearInterval(this.tickTimer);
    if (this.pendingLoad) clearTimeout(this.pendingLoad);
    this.refreshTimer = undefined;
    this.tickTimer = undefined;
    this.pendingLoad = undefined;
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
  }

  private startTimers(): void {
    if (!this.refreshTimer) {
      this.refreshTimer = setInterval(() => {
        if (!this.isConnected) return;
        this.loadHistory(this.historyKey, true);
      }, HISTORY_REFRESH_MS);
    }
    if (!this.tickTimer) {
      this.tickTimer = setInterval(() => {
        if (!this.isConnected || !this._config) return;
        if (this._config.motion.enabled && this._config.motion.showLastChanged) {
          this._now = Date.now();
        }
      }, TICK_MS);
    }
  }

  // ------------------------------------------------------------------ options

  setConfig(config: unknown): void {
    const resolved = normalizeConfig(config);
    this._config = resolved;
    const key = this.historyKeyFor(resolved);
    if (key !== this.historyKey) {
      this.historyKey = '';
      this.ensureHistory();
    }
    if (resolved.height) this.updateDensity(resolved.height);
    else this.updateDensity(0);
  }

  getConfig(): ResolvedConfig | undefined {
    return this._config;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement(EDITOR_TAG);
  }

  getConfigElement(): HTMLElement {
    return document.createElement(EDITOR_TAG);
  }

  static getStubConfig(hass?: HomeAssistant): RoomClimateCardConfig {
    const states = hass?.states ?? {};
    const entries = Object.values(states);
    const pick = (predicate: (entity: (typeof entries)[number]) => boolean): string | undefined =>
      entries.find(predicate)?.entity_id;
    const temperature = pick(
      (entity) =>
        entity.entity_id.startsWith('sensor.') && entity.attributes?.device_class === 'temperature'
    );
    const humidity = pick(
      (entity) => entity.entity_id.startsWith('sensor.') && entity.attributes?.device_class === 'humidity'
    );
    const window = pick(
      (entity) =>
        entity.entity_id.startsWith('binary_sensor.') &&
        ['window', 'door', 'opening'].includes(String(entity.attributes?.device_class))
    );
    const motion = pick(
      (entity) =>
        entity.entity_id.startsWith('binary_sensor.') &&
        entity.attributes?.device_class === 'motion'
    );
    const climate = pick((entity) => entity.entity_id.startsWith('climate.'));
    const config: RoomClimateCardConfig = { type: `custom:${CARD_TAG}` };
    if (temperature) config.temperature_entity = temperature;
    if (humidity) config.humidity_entity = humidity;
    if (window) config.window_entity = window;
    if (motion) config.motion_entity = motion;
    if (climate) config.climate_entity = climate;
    return config;
  }

  getCardSize(): number {
    if (!this._config) return 4;
    return Math.min(12, Math.max(2, Math.round(preferredCardHeight(this._config) / 50)));
  }

  getGridOptions(): Record<string, number> {
    const height = this._config ? preferredCardHeight(this._config) : 230;
    return {
      columns: 6,
      min_columns: 4,
      rows: Math.min(12, Math.max(2, Math.round(height / 66))),
      min_rows: 2,
    };
  }

  // ------------------------------------------------------------------- history

  private translator(): Translator {
    const language = this.hass?.locale?.language ?? this.hass?.language ?? 'en';
    return createTranslator(language);
  }

  private language(): string {
    return this.hass?.locale?.language ?? this.hass?.language ?? 'en';
  }

  private historyEntityIds(config: ResolvedConfig): string[] {
    const ids: string[] = [];
    if (config.chart.showTemperature && config.temperatureEntity) ids.push(config.temperatureEntity);
    if (config.chart.showHumidity && config.humidityEntity) ids.push(config.humidityEntity);
    return ids;
  }

  private historyKeyFor(config: ResolvedConfig): string {
    const ids = this.historyEntityIds(config);
    if (!ids.length) return '';
    return `${ids.sort().join('|')}@${config.chart.hours}`;
  }

  private ensureHistory(): void {
    if (!this.isConnected) return;
    const config = this._config;
    if (!config || !this.hass) return;
    const key = this.historyKeyFor(config);
    if (!key) {
      if (this.historyKey) {
        this.historyKey = '';
        this._history = {};
        this._historyLoading = false;
        this._historyError = undefined;
      }
      return;
    }
    if (key === this.historyKey && this.historyFetchedAt > 0) return;
    this.historyKey = key;
    if (this.pendingLoad) clearTimeout(this.pendingLoad);
    this.pendingLoad = setTimeout(() => {
      this.pendingLoad = undefined;
      this.loadHistory(key);
    }, 60);
  }

  private async loadHistory(key: string, force = false): Promise<void> {
    const config = this._config;
    const hass = this.hass;
    if (!config || !hass || !key) return;
    const ids = this.historyEntityIds(config);
    if (!ids.length) return;
    this._historyLoading = true;
    this._historyError = undefined;
    const end = Date.now();
    const start = end - config.chart.hours * 60 * 60 * 1000;
    try {
      const data = await this.repository.load(hass, ids, config.chart.hours, end);
      if (this.historyKey !== key) return;
      this._history = data;
      this._historyWindow = { start, end };
      this.historyFetchedAt = Date.now();
      if (force) this.requestUpdate();
    } catch (error) {
      if (this.historyKey !== key) return;
      this._historyError = error instanceof Error ? error.message : String(error);
      this._history = {};
    } finally {
      if (this.historyKey === key) this._historyLoading = false;
    }
  }

  private updateDensity(measuredHeight: number): void {
    const height =
      measuredHeight > 0
        ? measuredHeight
        : this._config
          ? (this._config.height ?? preferredCardHeight(this._config))
          : 0;
    let next: Density = 'md';
    if (height > 0 && height < 168) next = 'xs';
    else if (height > 0 && height < 232) next = 'sm';
    if (next !== this._density) this._density = next;
  }

  // ------------------------------------------------------------------ updates

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has('hass')) {
      const connected = this.hass?.connected !== false;
      if (connected && !this.lastConnected) {
        this.historyFetchedAt = 0;
        this.loadHistory(this.historyKey, true);
      }
      this.lastConnected = connected;
      this.ensureHistory();
    }
    if (changed.has('_config') && this._config) {
      this.ensureHistory();
    }
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('hass')) {
      const previous = changed.get('hass') as HomeAssistant | undefined;
      if (!previous || !this.hass) return true;
      if (previous.connected !== this.hass.connected) return true;
      if (
        previous.locale?.language !== this.hass.locale?.language ||
        previous.locale?.number_format !== this.hass.locale?.number_format ||
        previous.locale?.time_format !== this.hass.locale?.time_format
      ) {
        return true;
      }
      if (
        previous.themes?.darkMode !== this.hass.themes?.darkMode ||
        previous.themes?.theme !== this.hass.themes?.theme
      ) {
        return true;
      }
      const ids = this._config ? configEntityIds(this._config) : [];
      if (!ids.length) return true;
      return ids.some((id) => previous.states[id] !== this.hass?.states[id]);
    }
    return true;
  }

  // ------------------------------------------------------------------- render

  protected render(): TemplateResult {
    const config = this._config;
    const t = this.translator();
    if (!config) {
      return html`<div class="card theme-auto"><div class="empty">${t.t('roomClimate')}</div></div>`;
    }
    const themeClass = config.theme === 'auto' ? 'theme-auto' : `theme-${config.theme}`;
    const style = [
      `--rcc-radius:${config.borderRadius}px`,
      config.height ? `--rcc-height:${config.height}px` : '',
      `--rcc-chart-height:${config.chart.height}px`,
    ]
      .filter(Boolean)
      .join(';');

    return html`<div
      class="card ${themeClass} density-${this._density} ${config.height ? 'fixed-height' : 'auto-height'}"
      style="${style}"
      role="group"
      aria-label="${this.cellAriaLabel(config, t)}"
    >
      ${this.renderHeader(config, t)} ${this.renderMetrics(config, t)}
      ${this.renderStatusRow(config, t)} ${this.renderChart(config, t)}
      ${!this.hasAnyEntity(config) ? this.renderEmpty(t) : nothing}
    </div>`;
  }

  private hasAnyEntity(config: ResolvedConfig): boolean {
    return Boolean(config.temperatureEntity || config.humidityEntity);
  }

  private cellAriaLabel(config: ResolvedConfig, t: Translator): string {
    const name = resolveName(config, this.hass);
    return `${name} – ${t.t('roomClimate')}`;
  }

  private renderEmpty(t: Translator): TemplateResult {
    return html`<div class="empty-state" role="status">
      ${icons.info()}
      <span class="empty-title">${t.t('noEntities')}</span>
      <span class="empty-hint">${t.t('noEntitiesHint')}</span>
    </div>`;
  }

  private renderHeader(config: ResolvedConfig, t: Translator): TemplateResult {
    const name = resolveName(config, this.hass);
    const motion = readMotion(this.hass, config);
    const windowReading = readWindow(this.hass, config);
    const quiet =
      config.motion.enabled &&
      config.motion.showLastChanged &&
      motion.status !== 'active' &&
      motion.sinceMs !== undefined;

    return html`<div class="header">
      <div class="titles">
        <div class="name-row">
          <span class="room-icon" aria-hidden="true">${this.renderRoomIcon(config)}</span>
          <h2 class="name" title="${name}">${name}</h2>
        </div>
        ${quiet
          ? html`<div class="subtle">
              ${t.t('quietSince')}
              ${formatRelative(motion.sinceMs as number, this._now, {
                justNow: t.t('justNow'),
                minutes: t.t('minutesShort'),
                hours: t.t('hoursShort'),
                days: t.t('daysShort'),
              })}
            </div>`
          : nothing}
      </div>
      <div class="badges">
        ${config.motion.enabled ? this.renderMotionBadge(motion, t) : nothing}
        ${config.window.enabled ? this.renderWindowBadge(windowReading, t) : nothing}
      </div>
    </div>`;
  }

  private renderRoomIcon(config: ResolvedConfig): TemplateResult {
    if (this._haIconReady) {
      return html`<ha-icon .icon=${config.icon}></ha-icon>`;
    }
    return icons.home();
  }

  private renderMotionBadge(
    motion: ReturnType<typeof readMotion>,
    t: Translator
  ): TemplateResult {
    const active = motion.status === 'active';
    const color = active ? MOTION_ACTIVE_COLOR : NEUTRAL_COLOR;
    const label = active
      ? t.t('motionDetected')
      : motion.status === 'unavailable' || motion.status === 'missing'
        ? t.t('unavailable')
        : t.t('motionIdle');
    return html`<span
      class="badge motion ${active ? 'is-active' : 'is-idle'}"
      style="--badge-color:${color};--badge-bg:${withAlpha(active ? MOTION_ACTIVE_COLOR : '#64748b', 0.14)}"
      title="${label}"
      aria-label="${label}"
      role="img"
      >${icons.motion()}</span
    >`;
  }

  private renderWindowBadge(
    reading: ReturnType<typeof readWindow>,
    t: Translator
  ): TemplateResult {
    const open = reading.status === 'open';
    const label =
      reading.status === 'open'
        ? t.t('windowOpen')
        : reading.status === 'closed'
          ? t.t('windowClosed')
          : reading.status === 'missing' || reading.status === 'unavailable'
            ? t.t('unavailable')
            : t.t('windowUnknown');
    const color = open ? WINDOW_OPEN_COLOR : NEUTRAL_COLOR;
    return html`<span
      class="badge window ${open ? 'is-open' : ''}"
      style="--badge-color:${color};--badge-bg:${withAlpha(open ? WINDOW_OPEN_COLOR : '#64748b', open ? 0.16 : 0.12)}"
      title="${label}"
      aria-label="${label}"
      role="img"
      >${open ? icons.windowOpen() : icons.windowClosed()}</span
    >`;
  }

  private renderMetrics(config: ResolvedConfig, t: Translator): TemplateResult | typeof nothing {
    if (!config.temperatureEntity && !config.humidityEntity) return nothing;
    const language = this.language();
    const temperature = readSensor(this.hass, config.temperatureEntity, 'temperature');
    const humidity = readSensor(this.hass, config.humidityEntity, 'humidity');

    return html`<div class="metrics">
      ${config.temperatureEntity
        ? html`<div
            class="metric temperature"
            role="group"
            aria-label="${t.t('temperature')}: ${this.sensorAria(temperature, language, config.temperatureDecimals, t)}"
          >
            <span
              class="value"
              style="color:${temperature.value !== null
                ? temperatureBandColor(temperature.value, config)
                : 'var(--rcc-muted)'}"
              >${temperature.value !== null
                ? formatNumber(temperature.value, language, config.temperatureDecimals)
                : '–'}</span
            ><span class="unit">${temperature.unit}</span>
          </div>`
        : nothing}
      ${config.humidityEntity
        ? html`<div
            class="metric humidity"
            role="group"
            aria-label="${t.t('humidity')}: ${this.sensorAria(humidity, language, config.humidityDecimals, t)}"
          >
            <span class="drop-icon" aria-hidden="true">${icons.water()}</span>
            <span
              class="humidity-value"
              style="color:${humidity.value !== null
                ? humidityBandColor(humidity.value, config)
                : 'var(--rcc-muted)'}"
              >${humidity.value !== null
                ? formatNumber(humidity.value, language, config.humidityDecimals)
                : '–'}</span
            ><span class="humidity-unit">${humidity.unit}</span>
          </div>`
        : nothing}
    </div>`;
  }

  private sensorAria(
    reading: SensorReading,
    language: string,
    decimals: number,
    t: Translator
  ): string {
    if (reading.value === null) return t.t('unavailable');
    return `${formatNumber(reading.value, language, decimals)} ${reading.unit}`;
  }

  private renderStatusRow(config: ResolvedConfig, t: Translator): TemplateResult | typeof nothing {
    if (!hasStatusRow(config)) return nothing;
    const thermostat = readThermostat(this.hass, config, t);
    const color = thermostatStatusColor(thermostat, config);
    const background = withAlpha(color, 0.12);
    const border = withAlpha(color, 0.3);
    const pillStyle = `--pill-color:${color};--pill-bg:${background};--pill-border:${border}`;
    const pills: TemplateResult[] = [];

    if (config.thermostat.showSetpoint && thermostat.setpoint !== null) {
      pills.push(html`<span
        class="pill setpoint"
        title="${t.t('setpoint')} ${formatNumber(
          thermostat.setpoint,
          this.language(),
          config.temperatureDecimals
        )} ${thermostat.unit}"
        style="${pillStyle}"
      >
        ${icons.thermometer()}<span class="pill-label"
          >${t.t('setpoint')}
          <strong
            >${formatNumber(thermostat.setpoint, this.language(), config.temperatureDecimals)}
            ${thermostat.unit}</strong
          ></span
        >
      </span>`);
    }

    if (config.thermostat.showStatus) {
      pills.push(html`<span
        class="pill hvac ${thermostat.status}"
        style="${pillStyle}"
        title="${this.thermostatAria(thermostat, t)}"
        aria-label="${this.thermostatAria(thermostat, t)}"
      >
        ${this.heatingIcon(thermostat)}<span class="pill-label">${thermostat.label}</span>
      </span>`);
    }

    if (config.thermostat.showMode && thermostat.modeLabel) {
      pills.push(html`<span class="pill mode"
        ><span class="pill-label">${thermostat.modeLabel}</span></span
      >`);
    }

    if (!pills.length) return nothing;
    return html`<div class="status-row">${pills}</div>`;
  }

  private heatingIcon(thermostat: ThermostatReading): TemplateResult {
    switch (thermostat.status) {
      case 'heating':
        return icons.flame();
      case 'off':
        return icons.power();
      case 'action':
        return thermostat.action === 'cooling' ? icons.snowflake() : icons.fan();
      default:
        return icons.radiator();
    }
  }

  private thermostatAria(thermostat: ThermostatReading, t: Translator): string {
    const parts = [t.t('roomClimate'), thermostat.label];
    if (thermostat.modeLabel) parts.push(thermostat.modeLabel);
    return parts.join(': ');
  }

  private renderChart(config: ResolvedConfig, t: Translator): TemplateResult | typeof nothing {
    if (!hasChart(config)) return nothing;
    const temperatureSamples =
      config.chart.showTemperature && config.temperatureEntity
        ? this._history[config.temperatureEntity]
        : undefined;
    const humiditySamples =
      config.chart.showHumidity && config.humidityEntity
        ? this._history[config.humidityEntity]
        : undefined;

    const language = this.language();
    const temperature = readSensor(this.hass, config.temperatureEntity, 'temperature');
    const humidity = readSensor(this.hass, config.humidityEntity, 'humidity');

    const labels = {
      empty: t.t('noHistory'),
      emptyHint: t.t('noHistoryHint'),
      loading: t.t('loadingHistory'),
      error: t.t('historyError'),
      aria: t.chartAria(config.chart.hours),
      temperature: t.t('legendTemperature'),
      humidity: t.t('legendHumidity'),
    };

    return html`<div class="chart-slot">
      <room-climate-chart
        .temperature=${temperatureSamples}
        .humidity=${humiditySamples}
        .temperatureValue=${temperature.value !== null
          ? `${formatNumber(temperature.value, language, config.temperatureDecimals)} ${temperature.unit}`
          : undefined}
        .humidityValue=${humidity.value !== null
          ? `${formatNumber(humidity.value, language, config.humidityDecimals)} ${humidity.unit}`
          : undefined}
        .bandColors=${config.bandColors}
        .bands=${config.bands}
        .humidityColor=${config.humidity.color}
        .start=${this._historyWindow.start}
        .end=${this._historyWindow.end}
        .showLegend=${config.chart.showLegend}
        .showPoints=${config.chart.showPoints}
        .showGrid=${config.chart.showGrid}
        .curve=${config.chart.curve}
        .language=${language}
        .loading=${this._historyLoading}
        .error=${this._historyError}
        .labels=${labels}
      ></room-climate-chart>
    </div>`;
  }

  // -------------------------------------------------------------------- styles

  static styles = css`
    :host {
      display: block;
      --rcc-bg: var(--ha-card-background, var(--card-background-color, #162032));
      --rcc-text: var(--primary-text-color, #e7edf8);
      --rcc-muted: var(--secondary-text-color, #93a4bd);
      --rcc-border: var(--ha-card-border-color, var(--divider-color, rgba(148, 163, 184, 0.25)));
      --rcc-shadow: var(--ha-card-box-shadow, 0 4px 18px rgba(2, 6, 23, 0.22));
      --rcc-neutral: #94a3b8;
      --rcc-radius: 18px;
      color: var(--rcc-text);
      font-family: var(--ha-font-family-body, inherit);
      -webkit-font-smoothing: antialiased;
    }
    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      height: var(--rcc-height, auto);
      min-height: 0;
      padding: 11px 14px 0;
      overflow: hidden;
      background: var(--rcc-bg);
      border: 1px solid var(--rcc-border);
      border-radius: var(--rcc-radius);
      box-shadow: var(--rcc-shadow);
      transition:
        background-color 0.2s ease,
        border-color 0.2s ease,
        color 0.2s ease;
    }
    .card.theme-dark {
      --rcc-bg: #162032;
      --rcc-text: #eaf0fb;
      --rcc-muted: #93a4bd;
      --rcc-border: rgba(148, 163, 184, 0.22);
      --rcc-shadow: 0 10px 30px rgba(2, 6, 23, 0.45);
      --rcc-neutral: #94a3b8;
    }
    .card.theme-light {
      --rcc-bg: #ffffff;
      --rcc-text: #0f172a;
      --rcc-muted: #64748b;
      --rcc-border: rgba(15, 23, 42, 0.1);
      --rcc-shadow: 0 8px 24px rgba(15, 23, 42, 0.09);
      --rcc-neutral: #94a3b8;
    }

    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
      min-height: 0;
    }
    .titles {
      min-width: 0;
      flex: 1 1 auto;
    }
    .name-row {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }
    .room-icon {
      display: inline-flex;
      flex: none;
      color: var(--rcc-muted);
      opacity: 0.9;
    }
    .room-icon .icon {
      width: 15px;
      height: 15px;
    }
    .room-icon ha-icon {
      --mdc-icon-size: 15px;
      color: var(--rcc-muted);
    }
    .name {
      margin: 0;
      font-size: 0.875rem;
      font-weight: 600;
      line-height: 1.25;
      letter-spacing: -0.01em;
      color: var(--rcc-text);
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow-wrap: anywhere;
    }
    .subtle {
      margin-top: 1px;
      font-size: 10px;
      line-height: 1.3;
      color: var(--rcc-muted);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .badges {
      display: flex;
      align-items: center;
      gap: 5px;
      flex: none;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 9px;
      color: var(--badge-color, var(--rcc-neutral));
      background: var(--badge-bg, transparent);
      border: 1px solid var(--rcc-border);
      transition:
        color 0.18s ease,
        background-color 0.18s ease,
        border-color 0.18s ease;
    }
    .badge.window.is-open,
    .badge.motion.is-active {
      border-color: var(--badge-color);
    }
    .badge .icon {
      width: 15px;
      height: 15px;
    }

    .metrics {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 8px;
      margin-top: 6px;
      min-height: 0;
    }
    .metric {
      display: flex;
      align-items: baseline;
      min-width: 0;
    }
    .temperature .value {
      font-size: 1.85rem;
      font-weight: 300;
      line-height: 0.95;
      letter-spacing: -0.03em;
      font-variant-numeric: tabular-nums;
      font-feature-settings: 'tnum' 1;
      transition: color 0.2s ease;
    }
    .temperature .unit {
      margin-left: 2px;
      font-size: 0.75rem;
      font-weight: 400;
      color: var(--rcc-muted);
    }
    .humidity {
      gap: 3px;
      align-items: center;
    }
    .drop-icon {
      display: inline-flex;
      color: var(--rcc-muted);
      opacity: 0.8;
    }
    .drop-icon .icon {
      width: 12px;
      height: 12px;
    }
    .humidity-value {
      font-size: 0.9rem;
      font-weight: 500;
      font-variant-numeric: tabular-nums;
      letter-spacing: -0.01em;
    }
    .humidity-unit {
      font-size: 0.62rem;
      color: var(--rcc-muted);
      margin-left: -1px;
    }

    .status-row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px;
      margin-top: 7px;
    }
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 7px 2px 6px;
      border-radius: 999px;
      font-size: 10.5px;
      line-height: 1.35;
      color: var(--pill-color, var(--rcc-muted));
      background: var(--pill-bg, transparent);
      border: 1px solid var(--pill-border, var(--rcc-border));
      white-space: nowrap;
      max-width: 100%;
    }
    .pill.mode {
      --pill-color: var(--rcc-muted);
      --pill-bg: transparent;
      border-color: var(--rcc-border);
      padding-right: 8px;
    }
    .pill .icon {
      width: 12px;
      height: 12px;
      flex: none;
    }
    .pill-label {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .pill strong {
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }

    .chart-slot {
      position: relative;
      display: flex;
      flex-direction: column;
      margin: 5px -14px 0;
      min-height: 0;
    }
    .chart-slot > room-climate-chart {
      flex: 1 1 auto;
      min-height: 0;
    }
    .auto-height .chart-slot {
      flex: none;
      height: var(--rcc-chart-height, 84px);
    }
    .fixed-height .chart-slot {
      flex: 1 1 auto;
      min-height: 0;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      padding: 6px 0 12px;
      text-align: center;
      color: var(--rcc-muted);
    }
    .empty-state .icon {
      width: 18px;
      height: 18px;
      opacity: 0.65;
    }
    .empty-title {
      font-size: 11px;
      font-weight: 600;
      color: var(--rcc-text);
      opacity: 0.85;
    }
    .empty-hint {
      font-size: 10px;
      max-width: 32ch;
      line-height: 1.35;
      opacity: 0.75;
    }
    .empty {
      padding: 16px;
      font-size: 12px;
      color: var(--rcc-muted);
    }

    .density-xs .metrics {
      margin-top: 3px;
    }
    .density-xs .temperature .value {
      font-size: 1.4rem;
    }
    .density-xs .status-row {
      margin-top: 4px;
    }
    .density-xs .subtle {
      display: none;
    }
    .density-sm .temperature .value {
      font-size: 1.6rem;
    }
    .density-xs .badge {
      width: 22px;
      height: 22px;
      border-radius: 7px;
    }
    .density-xs .badge .icon {
      width: 13px;
      height: 13px;
    }

    @media (prefers-reduced-motion: reduce) {
      * {
        transition: none !important;
      }
    }
  `;
}
