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
  normalizeConfig,
  preferredCardHeight,
  resolveName,
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
import type { ChartSeriesKey } from './chart/climate-chart';
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
    _hiddenSeries: { state: true },
  };

  hass?: HomeAssistant;

  _config?: ResolvedConfig;
  _history: HistoryMap = {};
  _historyLoading = false;
  _historyError?: string;
  /** Series the user switched off by clicking the matching reading. */
  _hiddenSeries: ChartSeriesKey[] = [];
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
      `--rcc-accent:${config.accentColor}`,
      `--rcc-secondary:${config.humidity.color}`,
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
      ${this.renderHeader(config, t)} ${this.renderReadings(config, t)}
      ${this.renderClimateRow(config, t)} ${this.renderChart(config, t)}
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

  /**
   * Readings block: a caption row (label + series dot) above a single baseline
   * row with both values. Temperature is the hero, humidity follows at half the
   * size – both share one baseline, so nothing floats.
   */
  private renderReadings(config: ResolvedConfig, t: Translator): TemplateResult | typeof nothing {
    if (!config.temperatureEntity && !config.humidityEntity) return nothing;
    const language = this.language();
    const temperature = readSensor(this.hass, config.temperatureEntity, 'temperature');
    const humidity = readSensor(this.hass, config.humidityEntity, 'humidity');
    const showTemperature = Boolean(config.temperatureEntity);
    const showHumidity = Boolean(config.humidityEntity);

    const showLabels = config.showSeriesLabels;
    return html`<div class="readings ${showLabels ? '' : 'no-labels'}">
      ${showLabels
        ? html`<div class="reading-labels" aria-hidden="true">
        ${showTemperature
          ? html`<span
              class="series-label ${this._hiddenSeries.includes('temperature') ? 'is-hidden' : ''}"
              ><span class="series-dot" style="background:${config.accentColor}"></span
              >${t.t('temperature')}</span
            >`
          : nothing}
        ${showHumidity
          ? html`<span
              class="series-label ${this._hiddenSeries.includes('humidity') ? 'is-hidden' : ''}"
              ><span class="series-dot" style="background:${config.humidity.color}"></span
              >${t.t('humidity')}</span
            >`
          : nothing}
        </div>`
        : nothing}
      <div class="reading-values">
        ${showTemperature
          ? this.renderReading({
              key: 'temperature',
              className: 'temperature',
              value: temperature.value,
              unit: temperature.unit,
              decimals: config.temperatureDecimals,
              language,
              ariaLabel: `${t.t('temperature')}: ${this.sensorAria(
                temperature,
                language,
                config.temperatureDecimals,
                t
              )}`,
              color: config.accentColor,
              toggleable: config.chart.showTemperature,
            })
          : nothing}
        ${showHumidity
          ? this.renderReading({
              key: 'humidity',
              className: 'humidity',
              value: humidity.value,
              unit: humidity.unit,
              decimals: config.humidityDecimals,
              language,
              ariaLabel: `${t.t('humidity')}: ${this.sensorAria(
                humidity,
                language,
                config.humidityDecimals,
                t
              )}`,
              color: config.humidity.color,
              toggleable: config.chart.showHumidity,
            })
          : nothing}
      </div>
    </div>`;
  }

  /** One measured value; the accent dot of the caption row marks its series. */
  private renderReading(options: {
    key: ChartSeriesKey;
    className: string;
    value: number | null;
    unit: string;
    decimals: number;
    language: string;
    ariaLabel: string;
    color: string;
    toggleable: boolean;
  }): TemplateResult {
    const hidden = this._hiddenSeries.includes(options.key);
    const text =
      options.value !== null
        ? formatNumber(options.value, options.language, options.decimals)
        : '–';
    const content = html`<span class="reading-value">${text}</span
      ><span class="reading-unit">${options.unit}</span>`;

    if (!options.toggleable) {
      return html`<span class="reading ${options.className}" style="--series-color:${options.color}">
        <span class="reading-number" role="text" aria-label="${options.ariaLabel}">${content}</span>
      </span>`;
    }

    // A click on the value hides or shows its curve. The state is announced via
    // aria-pressed and mirrored by the dimmed type and the hollow series dot.
    return html`<button
      type="button"
      class="reading ${options.className} ${hidden ? 'is-hidden' : ''}"
      style="--series-color:${options.color}"
      aria-pressed=${!hidden}
      aria-label="${options.ariaLabel} – ${hidden ? 'Serie eingeblendet' : 'Serie ausgeblendet'}"
      title="${hidden ? 'Serie einblenden' : 'Serie ausblenden'}"
      @click=${() => this.toggleSeries(options.key)}
    >
      <span class="reading-number">${content}</span>
    </button>`;
  }

  private toggleSeries(key: ChartSeriesKey): void {
    this._hiddenSeries = this._hiddenSeries.includes(key)
      ? this._hiddenSeries.filter((item) => item !== key)
      : [...this._hiddenSeries, key];
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
   * Heating row below the readings: colour-coded flame, the current HVAC action
   * and the target temperature. Deliberately one line at one size – no badges to
   * optically centre, nothing to misalign.
   */
  private renderClimateRow(
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
    const language = this.language();
    const setpointText =
      thermostat.setpoint !== null
        ? `${formatNumber(thermostat.setpoint, language, config.temperatureDecimals)} ${
            thermostat.unit
          }`
        : '';

    return html`<div class="climate-row" role="status" aria-label="${this.thermostatAria(thermostat)}">
      ${showStatus
        ? html`<span class="flame status-${thermostat.status}" style="color:${color}" aria-hidden="true"
            >${this.heatingIcon(thermostat)}</span
          >`
        : nothing}
      <span class="climate-state">${showMode ? thermostat.modeLabel : thermostat.label}</span>
      ${showSetpoint
        ? html`<span class="climate-sep" aria-hidden="true">·</span>
            <span class="climate-setpoint"
              ><span class="climate-setpoint-label">${t.t('setpoint')}</span> ${setpointText}</span
            >`
        : nothing}
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

    const thermostat = config.thermostat.enabled ? readThermostat(this.hass, config, t) : undefined;
    const labels = {
      empty: t.t('noHistory'),
      emptyHint: t.t('noHistoryHint'),
      loading: t.t('loadingHistory'),
      error: t.t('historyError'),
      aria: t.chartAria(config.chart.hours),
      temperature: t.t('temperature'),
      humidity: t.t('humidity'),
      now: t.t('now'),
      setpoint: t.t('setpoint'),
    };

    return html`<div class="chart-slot">
      <room-climate-chart
        .temperature=${temperatureSamples}
        .humidity=${humiditySamples}
        .accentColor=${config.accentColor}
        .humidityColor=${config.humidity.color}
        .setpoint=${thermostat?.setpoint ?? null}
        .setpointUnit=${thermostat?.unit ?? '°C'}
        .hiddenSeries=${this._hiddenSeries}
        .start=${this._historyWindow.start}
        .end=${this._historyWindow.end}
        .showPoints=${config.chart.showPoints}
        .showGrid=${config.chart.showGrid}
        .curve=${config.chart.curve}
        .smoothing=${config.chart.smoothing}
        .gapMode=${config.chart.gapMode}
        .maxGapMinutes=${config.chart.maxGapMinutes}
        .gapStyle=${config.chart.gapStyle}
        .humidityLineStyle=${config.chart.humidityLineStyle}
        .showTemperatureArea=${config.chart.showTemperatureGradient}
        .showHumidityArea=${config.chart.showHumidityGradient}
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
    /*
     * Design tokens. Everything below is built from these values so the whole
     * card stays on one 4 px grid and one colour set:
     *
     *   surface   #0E1013 (OLED friendly, never pure black)
     *   hairline  rgba(255,255,255,0.07) – replaces hard borders
     *   text      0.92 / 0.50 / 0.32 opacity, never pure white
     *   accent    #4FD1A5 – the only signal, primary value + temperature curve
     *   secondary #8B86D6 – dot and curve of the humidity, nothing else
     */
    :host {
      display: block;
      --rcc-space-1: 4px;
      --rcc-space-2: 8px;
      --rcc-space-3: 12px;
      --rcc-space-5: 20px;

      --rcc-bg: var(--ha-card-background, var(--card-background-color, #0e1013));
      --rcc-surface: none;
      /* Plain values first, then a theme-aware mix, so the auto theme works
         on light and dark dashboards without any JS. */
      --rcc-hairline: rgba(255, 255, 255, 0.07);
      --rcc-hairline: color-mix(in srgb, var(--primary-text-color, #ffffff) 7%, transparent);
      --rcc-text: var(--primary-text-color, rgba(255, 255, 255, 0.92));
      --rcc-muted: var(--secondary-text-color, rgba(255, 255, 255, 0.5));
      --rcc-tertiary: rgba(255, 255, 255, 0.32);
      --rcc-tertiary: color-mix(in srgb, var(--primary-text-color, #ffffff) 32%, transparent);
      --rcc-neutral: #94a3b8;
      --rcc-accent: #4fd1a5;
      --rcc-secondary: #8b86d6;
      --rcc-radius: 26px;

      --rcc-temp-size: 42px;
      --rcc-hum-size: 20px;
      --rcc-temp-font: inherit;
      --rcc-hum-font: inherit;

      color: var(--rcc-text);
      font-family: var(--ha-font-family-body, inherit);
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }
    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      height: var(--rcc-height, auto);
      min-height: 0;
      /* One inset for everything: title, values and chart share the same edge. */
      padding: var(--rcc-space-5);
      overflow: hidden;
      background-color: var(--rcc-bg);
      background-image: var(--rcc-surface);
      border: 1px solid var(--rcc-hairline);
      border-radius: var(--rcc-radius);
      box-shadow: 0 8px 24px -22px rgba(0, 0, 0, 0.9);
      transition:
        background-color 0.2s ease,
        border-color 0.2s ease,
        color 0.2s ease;
    }
    /* Depth instead of a frame: a hairline plus a barely visible light gradient. */
    .card.theme-dark {
      --rcc-bg: #0e1013;
      --rcc-surface: radial-gradient(
        140% 120% at 0% 0%,
        rgba(255, 255, 255, 0.05) 0%,
        rgba(255, 255, 255, 0) 54%
      );
      --rcc-hairline: rgba(255, 255, 255, 0.07);
      --rcc-text: rgba(255, 255, 255, 0.92);
      --rcc-muted: rgba(255, 255, 255, 0.5);
      --rcc-tertiary: rgba(255, 255, 255, 0.32);
    }
    .card.theme-light {
      --rcc-bg: #ffffff;
      --rcc-surface: linear-gradient(160deg, #ffffff 0%, #f7f8fa 100%);
      --rcc-hairline: rgba(15, 23, 42, 0.07);
      --rcc-text: rgba(15, 23, 42, 0.92);
      --rcc-muted: rgba(15, 23, 42, 0.52);
      --rcc-tertiary: rgba(15, 23, 42, 0.34);
    }

    /* ------------------------------------------------------------- header */
    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--rcc-space-2);
      min-height: 0;
    }
    .titles {
      min-width: 0;
      flex: 1 1 auto;
    }
    .name-row {
      display: flex;
      align-items: center;
      gap: var(--rcc-space-1);
      min-width: 0;
      min-height: 28px;
    }
    .room-icon {
      display: inline-flex;
      flex: none;
      color: var(--rcc-tertiary);
    }
    .room-icon .icon {
      width: 14px;
      height: 14px;
    }
    .room-icon ha-icon {
      --mdc-icon-size: 14px;
      color: var(--rcc-tertiary);
      display: inline-flex;
    }
    .name {
      margin: 0;
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: -0.012em;
      color: var(--rcc-text);
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow-wrap: anywhere;
    }
    .subtle {
      margin-top: var(--rcc-space-1);
      font-size: 10.5px;
      line-height: 16px;
      color: var(--rcc-tertiary);
      font-variant-numeric: tabular-nums;
      font-feature-settings: 'tnum' 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .badges {
      display: flex;
      align-items: center;
      gap: var(--rcc-space-1);
      flex: none;
    }
    /*
     * Shared badge surface. Square badges (window, motion) keep the same radius,
     * hairline and tint so they read as one family.
     */
    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--rcc-space-1);
      box-sizing: border-box;
      height: 28px;
      min-width: 28px;
      border-radius: 10px;
      color: var(--badge-color, var(--rcc-neutral));
      background: var(--badge-bg, rgba(148, 163, 184, 0.1));
      border: 1px solid var(--badge-border, var(--rcc-hairline));
      transition:
        color 0.18s ease,
        background-color 0.18s ease,
        border-color 0.18s ease;
    }
    .badge.window,
    .badge.motion {
      width: 28px;
      padding: 0;
    }
    .badge .icon {
      width: 15px;
      height: 15px;
    }

    /* ----------------------------------------------------------- readings */
    .readings {
      display: flex;
      flex-direction: column;
      gap: var(--rcc-space-1);
      margin-top: var(--rcc-space-3);
      min-width: 0;
    }
    .readings.no-labels {
      /* Without the caption row the values carry their own top gap. */
      margin-top: var(--rcc-space-2);
    }
    .reading-labels {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--rcc-space-2);
      min-height: 16px;
    }
    /* Labels in versals with 0.09 em tracking – quiet, but unmistakable. */
    /*
     * Captions stay deliberately small: they declare the series, they are not
     * content. Tracking compensates for the low size so the versals stay legible.
     */
    .series-label {
      display: inline-flex;
      align-items: center;
      gap: var(--rcc-space-1);
      font-size: 9.5px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      color: var(--rcc-muted);
      white-space: nowrap;
    }
    .series-label svg,
    .series-label .icon {
      width: 10px;
      height: 10px;
      opacity: 0.7;
    }
    .series-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex: none;
      transition: opacity 0.18s ease;
    }
    .series-label.is-hidden {
      color: var(--rcc-tertiary);
    }
    .series-label.is-hidden .series-dot {
      opacity: 0.3;
    }

    .reading-values {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: var(--rcc-space-3);
      min-width: 0;
    }
    .reading {
      display: inline-flex;
      align-items: baseline;
      min-width: 0;
      border: 0;
      background: none;
      /* 8 px of symmetric padding lifts the 20 px humidity value to a 36 px
         tap target; the negative margin cancels it visually, so the shared
         baseline of both values is untouched. */
      padding: 8px 0;
      margin: -8px 0;
      color: inherit;
      font: inherit;
      border-radius: 8px;
    }
    button.reading {
      cursor: pointer;
      transition: opacity 0.18s ease;
    }
    button.reading:focus-visible {
      outline: 2px solid var(--rcc-accent);
      outline-offset: 2px;
    }
    .reading.temperature {
      font-size: var(--rcc-temp-size);
      font-family: var(--rcc-temp-font);
    }
    .reading.humidity {
      margin-left: auto;
      font-size: var(--rcc-hum-size);
      font-family: var(--rcc-hum-font);
    }
    /* Hero: tabular figures and tight tracking, so updates never shift. */
    .reading-number {
      font-size: 1em;
      font-weight: 500;
      line-height: 1;
      letter-spacing: -0.035em;
      font-variant-numeric: tabular-nums;
      font-feature-settings: 'tnum' 1;
      color: var(--rcc-text);
      white-space: nowrap;
    }
    .reading.humidity .reading-number {
      letter-spacing: -0.02em;
    }
    /* Units are their own, smaller secondary type – they never compete. */
    .reading-unit {
      margin-left: 0.12em;
      font-size: 0.34em;
      font-weight: 400;
      letter-spacing: 0;
      color: var(--rcc-muted);
    }
    .reading.humidity .reading-unit {
      font-size: 0.5em;
    }
    .reading.is-hidden .reading-number,
    .reading.is-hidden .reading-unit {
      color: var(--rcc-tertiary);
    }

    /* --------------------------------------------------------- heating row */
    .climate-row {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      gap: var(--rcc-space-1);
      margin-top: var(--rcc-space-2);
      min-height: 20px;
      min-width: 0;
      font-size: 12px;
      line-height: 16px;
      color: var(--rcc-muted);
      white-space: nowrap;
    }
    .flame {
      display: inline-flex;
      flex: none;
      align-items: center;
    }
    .flame .icon {
      width: 14px;
      height: 14px;
    }
    /*
     * Unknown / unavailable already use the muted text tone; dimming them a
     * second time made the tiny glyph disappear in the dark theme.
     */
    .flame.status-unknown,
    .flame.status-unavailable,
    .flame.status-missing {
      opacity: 0.9;
    }
    /*
     * State and target share one colour: the row is a single piece of context,
     * only the flame carries the accent.
     */
    .climate-state {
      color: var(--rcc-muted);
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .climate-sep {
      color: var(--rcc-tertiary);
    }
    .climate-setpoint {
      color: var(--rcc-muted);
      font-variant-numeric: tabular-nums;
      font-feature-settings: 'tnum' 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .climate-setpoint-label {
      color: var(--rcc-tertiary);
    }

    /* -------------------------------------------------------------- chart */
    .chart-slot {
      position: relative;
      display: flex;
      flex-direction: column;
      margin-top: var(--rcc-space-3);
      min-height: 0;
    }
    .chart-slot > room-climate-chart {
      flex: 1 1 auto;
      min-height: 0;
    }
    .auto-height .chart-slot {
      flex: none;
      height: var(--rcc-chart-height, 112px);
    }
    .fixed-height .chart-slot {
      flex: 1 1 auto;
      min-height: 0;
    }

    /* -------------------------------------------------------- empty state */
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--rcc-space-1);
      padding: var(--rcc-space-2) 0 var(--rcc-space-3);
      text-align: center;
      color: var(--rcc-muted);
    }
    .empty-state .icon {
      width: 18px;
      height: 18px;
      opacity: 0.5;
    }
    .empty-title {
      font-size: 12px;
      font-weight: 500;
      color: var(--rcc-text);
      opacity: 0.8;
    }
    .empty-hint {
      font-size: 10.5px;
      line-height: 16px;
      max-width: 32ch;
      opacity: 0.7;
    }
    .empty {
      padding: var(--rcc-space-5);
      font-size: 12px;
      color: var(--rcc-muted);
    }

    /* ----------------------------------------------------------- density */
    /* Dense variant: tighten the vertical rhythm, keep the grid intact. */
    .density-xs {
      --rcc-space-3: 8px;
    }
    .density-xs .reading.temperature {
      font-size: calc(var(--rcc-temp-size, 42px) * 0.6);
    }
    .density-xs .reading.humidity {
      font-size: calc(var(--rcc-hum-size, 20px) * 0.9);
    }
    .density-xs .badge {
      height: 24px;
      min-width: 24px;
      border-radius: 8px;
    }
    .density-xs .badge.window,
    .density-xs .badge.motion {
      width: 24px;
    }
    .density-xs .badge .icon,
    .density-xs .flame .icon {
      width: 12px;
      height: 12px;
    }
    .density-xs .subtle {
      display: none;
    }
    .density-sm .reading.temperature {
      font-size: calc(var(--rcc-temp-size, 42px) * 0.82);
    }
    .density-sm .reading.humidity {
      font-size: calc(var(--rcc-hum-size, 20px) * 0.95);
    }

    @media (prefers-reduced-motion: reduce) {
      * {
        transition: none !important;
      }
    }
  `;
}
