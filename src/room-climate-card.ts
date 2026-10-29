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
    const { temperature: tempType, humidity: humType } = config.typography;
    const style = [
      `--rcc-radius:${config.borderRadius}px`,
      config.height ? `--rcc-height:${config.height}px` : '',
      `--rcc-chart-height:${config.chart.height}px`,
      `--rcc-temp-size:${tempType.fontSize}px`,
      `--rcc-hum-size:${humType.fontSize}px`,
      tempType.fontFamily ? `--rcc-temp-font:${tempType.fontFamily}` : '',
      humType.fontFamily ? `--rcc-hum-font:${humType.fontFamily}` : '',
    ]
      .filter(Boolean)
      .join(';');

    return html`<div
      class="card ${themeClass} density-${this._density} ${config.height ? 'fixed-height' : 'auto-height'}"
      style="${style}"
      role="group"
      aria-label="${this.cellAriaLabel(config, t)}"
    >
      ${this.renderHeader(config, t)} ${this.renderSetpointRow(config, t)}
      ${this.renderMetrics(config, t)} ${this.renderChart(config, t)}
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
      style="--badge-color:${color};--badge-bg:${withAlpha(
        active ? MOTION_ACTIVE_COLOR : '#64748b',
        active ? 0.16 : 0.12
      )};--badge-border:${withAlpha(active ? MOTION_ACTIVE_COLOR : '#64748b', active ? 0.45 : 0.22)}"
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
      style="--badge-color:${color};--badge-bg:${withAlpha(
        open ? WINDOW_OPEN_COLOR : '#64748b',
        open ? 0.18 : 0.12
      )};--badge-border:${withAlpha(open ? WINDOW_OPEN_COLOR : '#64748b', open ? 0.5 : 0.22)}"
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

  /**
   * Target temperature above the actual temperature. The heating state is
   * conveyed only by the colour of the icon in front of it (red = heating,
   * green = idle, grey = off), never by an extra text label.
   */
  private renderSetpointRow(
    config: ResolvedConfig,
    t: Translator
  ): TemplateResult | typeof nothing {
    if (!hasStatusRow(config)) return nothing;
    const thermostat = readThermostat(this.hass, config, t);
    const showSetpoint = config.thermostat.showSetpoint && thermostat.setpoint !== null;
    const showStatus = config.thermostat.showStatus;
    const showMode = config.thermostat.showMode && Boolean(thermostat.modeLabel);
    if (!showSetpoint && !showStatus && !showMode) return nothing;

    const color = thermostatStatusColor(thermostat, config);
    const statusLabel = this.thermostatAria(thermostat);
    const language = this.language();
    const setpointText =
      thermostat.setpoint !== null
        ? `${formatNumber(thermostat.setpoint, language, config.temperatureDecimals)} ${thermostat.unit}`
        : '';

    // Both the heating-mode icon and the setpoint live in badges, exactly like
    // the window and motion badges in the header.
    return html`<div class="setpoint-row">
      ${showStatus
        ? html`<span
            class="badge hvac-icon is-${thermostat.colorKey} status-${thermostat.status}"
            style="--badge-color:${color};--badge-bg:${withAlpha(color, 0.14)};--badge-border:${withAlpha(
              color,
              0.34
            )}"
            role="img"
            aria-label="${statusLabel}"
            title="${statusLabel}"
            >${this.heatingIcon(thermostat)}</span
          >`
        : nothing}
      ${showSetpoint
        ? html`<span class="badge setpoint" title="${t.t('setpoint')} ${setpointText}">
            <span class="setpoint-label">${t.t('setpoint')}</span>
            <span class="setpoint-reading"
              ><span class="setpoint-value"
                >${formatNumber(
                  thermostat.setpoint as number,
                  language,
                  config.temperatureDecimals
                )}</span
              ><span class="setpoint-unit">${thermostat.unit}</span></span
            >
          </span>`
        : nothing}
      ${showMode ? html`<span class="mode-label">${thermostat.modeLabel}</span>` : nothing}
    </div>`;
  }

  /** Icon for the current HVAC action; the colour carries the state. */
  private heatingIcon(thermostat: ThermostatReading): TemplateResult {
    if (thermostat.status === 'action') {
      switch (thermostat.action) {
        case 'cooling':
          return icons.snowflake();
        case 'fan':
          return icons.fan();
        case 'drying':
          return icons.water();
        default:
          return icons.flame();
      }
    }
    return icons.flame();
  }

  /** Accessible name of the HVAC icon: the state only, no duplicated text. */
  private thermostatAria(thermostat: ThermostatReading): string {
    return thermostat.label;
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
        .bandColors=${config.bandColors}
        .bands=${config.bands}
        .humidityColor=${config.humidity.color}
        .start=${this._historyWindow.start}
        .end=${this._historyWindow.end}
        .showLegend=${config.chart.showLegend}
        .showPoints=${config.chart.showPoints}
        .showGrid=${config.chart.showGrid}
        .curve=${config.chart.curve}
        .gapMode=${config.chart.gapMode}
        .maxGapMinutes=${config.chart.maxGapMinutes}
        .gapStyle=${config.chart.gapStyle}
        .humidityLineStyle=${config.chart.humidityLineStyle}
        .cornerRadius=${config.borderRadius}
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
      /* Modern layered surface: the gradient sits *behind* the theme colour. */
      --rcc-surface: none;
      --rcc-hairline: var(--divider-color, rgba(148, 197, 255, 0.16));
      --rcc-temp-size: 42px;
      --rcc-hum-size: 28px;
      --rcc-temp-font: inherit;
      --rcc-hum-font: inherit;
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
      padding: 13px 16px 3px;
      overflow: hidden;
      background-color: var(--rcc-bg);
      background-image: var(--rcc-surface);
      border: 1px solid var(--rcc-border);
      border-radius: var(--rcc-radius);
      box-shadow: var(--rcc-shadow);
      transition:
        background-color 0.2s ease,
        border-color 0.2s ease,
        color 0.2s ease;
    }
    .card.theme-dark {
      --rcc-bg: #101b2c;
      --rcc-surface:
        radial-gradient(120% 92% at 0% 0%, rgba(56, 189, 248, 0.16) 0%, rgba(56, 189, 248, 0) 58%),
        radial-gradient(110% 85% at 100% 0%, rgba(139, 92, 246, 0.14) 0%, rgba(139, 92, 246, 0) 62%),
        linear-gradient(158deg, #1c2d49 0%, #152238 52%, #0e1828 100%);
      --rcc-text: #eaf0fb;
      --rcc-muted: #93a7c2;
      --rcc-border: rgba(148, 197, 255, 0.16);
      --rcc-hairline: rgba(148, 197, 255, 0.14);
      --rcc-shadow:
        0 22px 46px -26px rgba(2, 6, 23, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.06);
      --rcc-neutral: #94a3b8;
    }
    .card.theme-light {
      --rcc-bg: #ffffff;
      --rcc-surface:
        radial-gradient(120% 90% at 0% 0%, rgba(56, 189, 248, 0.1) 0%, rgba(56, 189, 248, 0) 56%),
        linear-gradient(162deg, #ffffff 0%, #f8fafc 58%, #eef3fa 100%);
      --rcc-text: #0f172a;
      --rcc-muted: #64748b;
      --rcc-border: rgba(15, 23, 42, 0.08);
      --rcc-hairline: rgba(15, 23, 42, 0.08);
      --rcc-shadow: 0 18px 38px -26px rgba(15, 23, 42, 0.38), inset 0 1px 0 #ffffff;
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
      font-size: 1.0625rem;
      font-weight: 500;
      line-height: 1.25;
      letter-spacing: -0.015em;
      color: var(--rcc-text);
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow-wrap: anywhere;
    }
    .subtle {
      margin-top: 2px;
      font-size: 10.5px;
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
      gap: 6px;
      flex: none;
    }
    /*
     * Shared badge surface. Square badges (window, motion, heating mode) and the
     * wider setpoint badge use the same radius, fill, ring and inner highlight.
     */
    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      box-sizing: border-box;
      height: 30px;
      min-width: 30px;
      border-radius: 11px;
      color: var(--badge-color, var(--rcc-neutral));
      background: var(--badge-bg, rgba(100, 116, 139, 0.12));
      border: 1px solid var(--badge-border, var(--rcc-border));
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
      transition:
        color 0.18s ease,
        background-color 0.18s ease,
        border-color 0.18s ease,
        box-shadow 0.18s ease;
    }
    .badge.window,
    .badge.motion,
    .badge.hvac-icon {
      width: 30px;
      padding: 0;
    }
    .badge.window.is-open,
    .badge.motion.is-active,
    .badge.hvac-icon.is-heating {
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.08),
        0 8px 18px -12px var(--badge-color);
    }
    .badge .icon {
      width: 17px;
      height: 17px;
    }

    .metrics {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 10px;
      margin-top: 8px;
      min-height: 0;
    }
    .metric {
      display: flex;
      align-items: baseline;
      min-width: 0;
    }
    /*
     * Temperature and humidity are sized independently. Unit and drop icon use
     * em units, so they always scale with their own value.
     */
    .temperature {
      font-size: var(--rcc-temp-size, 42px);
      font-family: var(--rcc-temp-font, inherit);
    }
    .temperature .value {
      font-size: 1em;
      font-weight: 600;
      line-height: 0.94;
      letter-spacing: -0.035em;
      font-variant-numeric: tabular-nums;
      font-feature-settings: 'tnum' 1;
      transition: color 0.2s ease;
    }
    .temperature .unit {
      margin-left: 0.16em;
      font-size: 0.34em;
      font-weight: 400;
      letter-spacing: 0;
      color: var(--rcc-muted);
    }
    .humidity {
      gap: 0.28em;
      align-items: baseline;
      font-size: var(--rcc-hum-size, 28px);
      font-family: var(--rcc-hum-font, inherit);
    }
    .drop-icon {
      display: inline-flex;
      align-self: center;
      color: var(--rcc-muted);
      opacity: 0.8;
    }
    .drop-icon .icon {
      width: 0.66em;
      height: 0.66em;
    }
    .humidity-value {
      font-size: 1em;
      font-weight: 500;
      line-height: 1;
      font-variant-numeric: tabular-nums;
      letter-spacing: -0.025em;
      font-feature-settings: 'tnum' 1;
    }
    .humidity-unit {
      font-size: 0.46em;
      font-weight: 400;
      color: var(--rcc-muted);
      margin-left: -0.1em;
    }

    .setpoint-row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
      min-height: 30px;
    }
    .hvac-icon {
      flex: none;
    }
    .hvac-icon .icon {
      width: 17px;
      height: 17px;
    }
    /* Unknown / unavailable: never look like a confident state. */
    .hvac-icon.is-unknown,
    .hvac-icon.status-unavailable,
    .hvac-icon.status-missing {
      background: transparent;
      border-style: dashed;
      border-color: var(--rcc-border);
      opacity: 0.8;
    }
    .hvac-icon.is-unknown .icon,
    .hvac-icon.status-unavailable .icon,
    .hvac-icon.status-missing .icon {
      opacity: 0.7;
    }
    /*
     * Everything inside the setpoint badge is centred on the badge's vertical
     * axis: label, value and unit share one optical line. Baseline alignment on
     * the badge itself would push the flex line to the top edge of the fixed
     * 30 px box, which made the value sit right under the upper border.
     */
    .setpoint {
      padding: 0 11px;
      align-items: center;
      min-width: 0;
      font-variant-numeric: tabular-nums;
      color: var(--rcc-muted);
    }
    .setpoint-label {
      font-size: 9.5px;
      font-weight: 600;
      line-height: 1;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      opacity: 0.85;
    }
    /* Value and unit keep a shared baseline with each other. */
    .setpoint-reading {
      display: inline-flex;
      align-items: baseline;
      min-width: 0;
    }
    .setpoint-value {
      font-size: 1.0625rem;
      font-weight: 500;
      line-height: 1;
      color: var(--rcc-text);
      letter-spacing: -0.01em;
    }
    .setpoint-unit {
      margin-left: 1px;
      font-size: 0.68rem;
      font-weight: 400;
      line-height: 1;
    }
    .mode-label {
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      height: 30px;
      padding: 0 10px;
      border-radius: 11px;
      font-size: 10px;
      color: var(--rcc-muted);
      background: rgba(100, 116, 139, 0.1);
      border: 1px solid var(--rcc-border);
      white-space: nowrap;
    }

    .chart-slot {
      position: relative;
      display: flex;
      flex-direction: column;
      margin: 9px -16px 0;
      min-height: 0;
    }
    /* Hairline divider like the reference dashboard card (inset, not full width). */
    .chart-slot::before {
      content: '';
      position: absolute;
      top: 0;
      left: 16px;
      right: 16px;
      height: 1px;
      background: var(--rcc-hairline);
      pointer-events: none;
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
      margin-top: 4px;
    }
    .density-xs .temperature {
      font-size: calc(var(--rcc-temp-size, 42px) * 0.6);
    }
    .density-xs .humidity {
      font-size: calc(var(--rcc-hum-size, 28px) * 0.72);
    }
    .density-xs .setpoint-row {
      margin-top: 5px;
      gap: 5px;
      min-height: 24px;
    }
    .density-xs .badge {
      height: 24px;
      min-width: 24px;
      border-radius: 9px;
    }
    .density-xs .badge.window,
    .density-xs .badge.motion,
    .density-xs .badge.hvac-icon {
      width: 24px;
    }
    .density-xs .badge .icon,
    .density-xs .hvac-icon .icon {
      width: 14px;
      height: 14px;
    }
    .density-xs .setpoint {
      padding: 0 9px;
    }
    .density-xs .setpoint-label {
      font-size: 9px;
    }
    .density-xs .setpoint-value {
      font-size: 0.9rem;
    }
    .density-xs .mode-label {
      height: 24px;
      padding: 0 8px;
      border-radius: 9px;
    }
    .density-xs .subtle {
      display: none;
    }
    .density-sm .temperature {
      font-size: calc(var(--rcc-temp-size, 42px) * 0.82);
    }
    .density-sm .humidity {
      font-size: calc(var(--rcc-hum-size, 28px) * 0.88);
    }
    .density-xs .badge {
      width: 24px;
      height: 24px;
      border-radius: 8px;
    }
    .density-xs .badge .icon {
      width: 14px;
      height: 14px;
    }
    .density-xs .name {
      font-size: 0.95rem;
    }

    @media (prefers-reduced-motion: reduce) {
      * {
        transition: none !important;
      }
    }
  `;
}
