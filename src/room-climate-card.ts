import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import {
  HISTORY_REFRESH_MS,
  TICK_MS,
  CARD_TAG,
  EDITOR_TAG,
} from './const';
import { isActionable, runAction, type CardAction } from './actions';
import {
  chartSlotBottomMargin,
  chartSlotMargin,
  configEntityIds,
  defaultActionEntity,
  hasChart,
  hasReadingMeta,
  hasStatusRow,
  nameIconSize,
  nameLineHeight,
  normalizeConfig,
  preferredCardHeight,
  resolveName,
  THEME_CARD_RADIUS,
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
import {
  HistoryRepository,
  historySourceFor,
  sharedHistoryRepository,
  type HistoryMap,
} from './data/history';
import { createTranslator, type Translator } from './localize';
import type { HomeAssistant } from './types';
import {
  convertTemperature,
  formatNumber,
  formatRelative,
  parseNumericState,
  temperatureScale,
  withAlpha,
} from './utils/format';
import { icons } from './ui/icons';
import { dewPointCelsius, humidityLevel } from './utils/climate';
import './chart/climate-chart';
import type { ChartSample } from './chart/geometry';
import './editor/room-climate-editor';

type Density = 'xs' | 'sm' | 'md';

/**
 * Time zone and 12/24-hour clock for the chart axis, as Home Assistant's own
 * frontend resolves them. `locale.time_zone` is a *setting* ("local" or
 * "server"), not a zone: "server" means the instance zone from `config`,
 * "local" means the browser's own (no explicit zone). `locale.time_format` is
 * "12", "24", "language" or "system"; only the first two force a clock.
 */
export function resolveChartClock(hass?: HomeAssistant): { timeZone?: string; hour12?: boolean } {
  const locale = hass?.locale;
  const setting = locale?.time_zone;
  const serverZone = hass?.config?.time_zone || undefined;
  let timeZone: string | undefined;
  if (setting === 'local') timeZone = undefined;
  else if (setting === 'server' || !setting) timeZone = serverZone;
  // Anything else is taken as an IANA zone only if the runtime accepts it.
  else timeZone = isValidTimeZone(setting) ? setting : serverZone;
  const format = locale?.time_format;
  const hour12 = format === '12' || format === 'am_pm' ? true : format === '24' ? false : undefined;
  return { timeZone, hour12 };
}

function isValidTimeZone(zone: string): boolean {
  try {
    new Intl.DateTimeFormat('en', { timeZone: zone });
    return true;
  } catch {
    return false;
  }
}

const WINDOW_OPEN_COLOR = '#fbbf24';
const MOTION_ACTIVE_COLOR = '#34d399';
const NEUTRAL_COLOR = 'var(--rcc-neutral)';

/** Long press that counts as "hold", and the window for a second tap. */
const HOLD_MS = 500;
const HOLD_MOVE_TOLERANCE = 10;
const DOUBLE_TAP_MS = 250;

/** Backoff bounds for retrying a failed history request. */
const RETRY_MIN_MS = 15 * 1000;
const RETRY_MAX_MS = 5 * 60 * 1000;

export class RoomClimateCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _history: { state: true },
    _setpointHistory: { state: true },
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
  /** Thermostat target over the chart window (step series, thermostat unit). */
  _setpointHistory: ChartSample[] = [];
  _historyLoading = false;
  _historyError?: string;
  _density: Density = 'md';
  _now = Date.now();
  _historyWindow: { start: number; end: number } = {
    start: Date.now() - 6 * 3600 * 1000,
    end: Date.now(),
  };

  /** Fallback when there is no connection to share a cache on (tests, previews). */
  private readonly ownRepository = new HistoryRepository();
  private refreshTimer?: ReturnType<typeof setInterval>;
  private tickTimer?: ReturnType<typeof setInterval>;
  private resizeObserver?: ResizeObserver;
  private historyKey = '';
  private historyFetchedAt = 0;
  private pendingLoad?: ReturnType<typeof setTimeout>;
  private lastConnected = true;
  /** `false` while the card is scrolled out of view: no polling in the dark. */
  private visible = true;
  private intersectionObserver?: IntersectionObserver;
  /** Backoff of the retry after a failed history request (0 = nothing pending). */
  private retryDelay = 0;
  private readonly onVisibilityChange = (): void => {
    if (typeof document === 'undefined' || document.visibilityState !== 'visible') return;
    if (!this.isConnected || !this._config) return;
    // Timers are throttled while a tab or wall tablet is asleep: catch up as
    // soon as the card can be seen again.
    this._now = Date.now();
    this.loadHistory(this.historyKey, true);
  };
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
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', this.onVisibilityChange);
    }
    // Only poll while the card is actually on screen (dashboards can be long).
    if (typeof IntersectionObserver !== 'undefined' && !this.intersectionObserver) {
      this.intersectionObserver = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;
        const wasVisible = this.visible;
        this.visible = entry.isIntersecting;
        if (!wasVisible && this.visible && this.isConnected) {
          // Back on screen after a while: catch up instead of waiting for the
          // next tick of the five-minute timer.
          if (Date.now() - this.historyFetchedAt > HISTORY_REFRESH_MS) {
            this.loadHistory(this.historyKey, true);
          }
        }
      });
      this.intersectionObserver.observe(this);
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
    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', this.onVisibilityChange);
    }
    this.intersectionObserver?.disconnect();
    this.intersectionObserver = undefined;
    this.visible = true;
    if (this.refreshTimer) clearInterval(this.refreshTimer);
    if (this.tickTimer) clearInterval(this.tickTimer);
    if (this.pendingLoad) clearTimeout(this.pendingLoad);
    this.clearHold();
    if (this.tapTimer) clearTimeout(this.tapTimer);
    this.tapTimer = undefined;
    this.refreshTimer = undefined;
    this.tickTimer = undefined;
    this.pendingLoad = undefined;
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
  }

  private startTimers(): void {
    if (!this.refreshTimer) {
      this.refreshTimer = setInterval(() => {
        if (!this.isConnected || !this.visible) return;
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
    const windowSensor = pick(
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
    if (windowSensor) config.window_entity = windowSensor;
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

  /**
   * Time zone and clock format of the Home Assistant instance. Without this the
   * axis would show the browser zone (wrong on a remote dashboard) and always
   * the locale default instead of the user's 12/24-hour preference.
   */
  private chartClock(): { timeZone?: string; hour12?: boolean } {
    return resolveChartClock(this.hass);
  }

  private historyEntityIds(config: ResolvedConfig): string[] {
    const ids: string[] = [];
    if (config.chart.showTemperature && config.temperatureEntity) ids.push(config.temperatureEntity);
    if (config.chart.showHumidity && config.humidityEntity) ids.push(config.humidityEntity);
    return ids;
  }

  /** Thermostat whose target is drawn as a curve, if the chart shows one. */
  private setpointEntityId(config: ResolvedConfig): string | undefined {
    if (!config.thermostat.enabled || !config.chart.showChartSetpoint) return undefined;
    if (!config.chart.showTemperature || !config.temperatureEntity) return undefined;
    return config.thermostat.entity;
  }

  private historyKeyFor(config: ResolvedConfig): string {
    const ids = this.historyEntityIds(config);
    if (!ids.length) return '';
    const setpointEntity = this.setpointEntityId(config);
    return `${ids.sort().join('|')}@${config.chart.hours}${setpointEntity ? `#sp:${setpointEntity}` : ''}`;
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
        this._setpointHistory = [];
        this._historyLoading = false;
        this._historyError = undefined;
      }
      return;
    }
    // After a failed load the backoff timer owns the retry: not every state
    // change of the sensors may start a new request.
    if (key === this.historyKey && (this.historyFetchedAt > 0 || this.retryDelay > 0)) return;
    this.historyKey = key;
    if (this.pendingLoad) clearTimeout(this.pendingLoad);
    this.pendingLoad = setTimeout(() => {
      this.pendingLoad = undefined;
      this.loadHistory(key);
    }, 60);
  }

  /**
   * @param force  re-render even if the data object did not change.
   * @param fresh  bypass the shared cache (after a reconnect the cached curve
   *               may predate the outage).
   */
  private async loadHistory(key: string, force = false, fresh = false): Promise<void> {
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
      const repository = sharedHistoryRepository(hass) ?? this.ownRepository;
      const setpointEntity = this.setpointEntityId(config);
      /*
       * The target history is an extra: when it cannot be loaded the chart falls
       * back to the flat line at the current target instead of showing an error.
       */
      const setpointRequest = setpointEntity
        ? repository
            .loadAttribute(hass, setpointEntity, 'temperature', config.chart.hours, end, {
              ...(fresh ? { maxAgeMs: 0 } : {}),
            })
            .catch(() => [] as ChartSample[])
        : Promise.resolve([] as ChartSample[]);
      const data = await repository.load(
        hass,
        ids,
        config.chart.hours,
        end,
        {
          ...(fresh ? { maxAgeMs: 0 } : {}),
          source: historySourceFor(config.chart.hours),
        }
      );
      const setpointHistory = await setpointRequest;
      if (this.historyKey !== key) return;
      this._history = data;
      this._setpointHistory = setpointHistory;
      this._historyWindow = { start, end };
      this.historyFetchedAt = Date.now();
      this.retryDelay = 0;
      if (force) this.requestUpdate();
    } catch (error) {
      if (this.historyKey !== key) return;
      this._historyError = error instanceof Error ? error.message : String(error);
      // Keep the last good curve: one failed request (reconnect, recorder
      // restart, purge) must not empty the chart. Retry with a growing delay.
      this.retryDelay = Math.min(Math.max(this.retryDelay * 2, RETRY_MIN_MS), RETRY_MAX_MS);
      if (this.pendingLoad) clearTimeout(this.pendingLoad);
      this.pendingLoad = setTimeout(() => {
        this.pendingLoad = undefined;
        if (!this.isConnected) return;
        this.loadHistory(key, true);
      }, this.retryDelay);
    } finally {
      if (this.historyKey === key) this._historyLoading = false;
    }
  }

  /**
   * Appends the current state when it is newer than the fetched history, so the
   * curve ends exactly at the value shown in the big reading – including a
   * sensor that just became unavailable.
   */
  private withLiveState(
    samples: ChartSample[] | undefined,
    entityId: string,
    end: number
  ): ChartSample[] | undefined {
    if (!samples || !samples.length) return samples;
    const state = this.hass?.states?.[entityId];
    if (!state) return samples;
    const changed = Date.parse(state.last_changed);
    if (!Number.isFinite(changed)) return samples;
    const last = samples[samples.length - 1];
    const t = Math.min(changed, end);
    if (t <= last.t) return samples;
    const value = parseNumericState(state.state);
    if (last.v === value) return samples;
    return [...samples, { t, v: value }];
  }

  /**
   * The target history, closed with the current target (like
   * {@link withLiveState}) and converted to the scale of the temperature
   * sensor. Climate entities change `last_updated`, not `last_changed`, when
   * only an attribute such as the target moves.
   */
  private setpointSeries(
    current: number | null,
    fromUnit: string,
    toUnit: string,
    end: number
  ): ChartSample[] | undefined {
    const config = this._config;
    const entityId = config ? this.setpointEntityId(config) : undefined;
    if (!entityId || !this._setpointHistory.length) return undefined;
    let samples = this._setpointHistory;
    const state = this.hass?.states?.[entityId];
    const updated = state ? Date.parse(state.last_updated ?? state.last_changed) : NaN;
    const last = samples[samples.length - 1];
    if (Number.isFinite(updated) && last.v !== current) {
      const t = Math.max(Math.min(updated, end), last.t + 1);
      samples = [...samples, { t, v: current }];
    }
    const convert = (value: number | null): number | null => {
      if (value === null) return null;
      if (fromUnit === toUnit) return value;
      return convertTemperature(value, fromUnit, toUnit);
    };
    return samples.map((sample) => ({ t: sample.t, v: convert(sample.v) }));
  }

  private updateDensity(measuredHeight: number): void {
    /*
     * Density only answers a height the user fixed. With automatic height the
     * measured box *is* the content: a card without chart is short by nature,
     * and shrinking its type would only make it shorter still – it would lock
     * itself into the smallest step.
     */
    if (!this._config?.height) {
      if (this._density !== 'md') this._density = 'md';
      return;
    }
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
        this.loadHistory(this.historyKey, true, true);
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
        previous.locale?.time_format !== this.hass.locale?.time_format ||
        previous.locale?.time_zone !== this.hass.locale?.time_zone ||
        previous.config?.time_zone !== this.hass.config?.time_zone
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
      // Without an own radius the card keeps the theme's (`--ha-card-border-radius`).
      config.borderRadius !== null ? `--rcc-radius:${config.borderRadius}px` : '',
      `--rcc-inset:${config.padding}px`,
      config.height ? `--rcc-height:${config.height}px` : '',
      `--rcc-chart-height:${config.chart.height}px`,
      `--rcc-temp-size:${tempType.fontSize}px`,
      `--rcc-hum-size:${humType.fontSize}px`,
      /*
       * Title size and the icon that belongs to it: both are written here (not
       * in the stylesheet) so the line height and the icon box stay in step with
       * whatever the user picked in the editor.
       */
      `--rcc-name-size:${config.nameFontSize}px`,
      `--rcc-name-line:${nameLineHeight(config.nameFontSize)}px`,
      `--rcc-name-icon:${nameIconSize(config.nameFontSize)}px`,
      `--rcc-accent:${config.accentColor}`,
      `--rcc-secondary:${config.humidity.color}`,
      tempType.fontFamily ? `--rcc-temp-font:${tempType.fontFamily}` : '',
      humType.fontFamily ? `--rcc-hum-font:${humType.fontFamily}` : '',
    ]
      .filter(Boolean)
      .join(';');

    const tapEnabled = this.tapEnabled;
    const interactive = tapEnabled || this.hasGesture('hold') || this.hasGesture('doubleTap');
    const climateRow = this.renderClimateRow(config, t);
    /*
     * Without a rendered status row the card has to carry the keyboard path
     * itself, otherwise the tap would be reachable with a pointer only.
     */
    const cardIsButton = tapEnabled && climateRow === nothing;

    /*
     * `ha-card` is the frame every Home Assistant card shares: theme radius,
     * border, shadow and background (`--ha-card-*`) apply, and card-mod finds
     * the element it styles. The class keeps the card's own layout on it.
     */
    return html`<ha-card
      class="card ${themeClass} density-${this._density} ${config.height ? 'fixed-height' : 'auto-height'} ${interactive ? 'is-tappable' : ''}"
      style="${style}"
      role=${cardIsButton ? 'button' : 'group'}
      tabindex=${cardIsButton ? '0' : nothing}
      aria-label=${cardIsButton
        ? `${this.cellAriaLabel(config, t)} – ${this.tapLabel(t)}`
        : this.cellAriaLabel(config, t)}
      @click=${this.handleCardClick}
      @keydown=${cardIsButton ? this.handleCardKeydown : nothing}
      @pointerdown=${this.onPressStart}
      @pointermove=${this.onPressMove}
      @pointerup=${this.onPressEnd}
      @pointercancel=${this.onPressEnd}
      @pointerleave=${this.onPressEnd}
    >
      ${this.renderHeader(config, t)} ${this.renderReadings(config, t)}
      ${climateRow} ${this.renderWindowWarning(config, t)} ${this.renderChart(config, t)}
      ${!this.hasAnyEntity(config) ? this.renderEmpty(t) : nothing}
    </ha-card>`;
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
      >${active ? icons.motion() : icons.motionOff()}</span
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
    // Without a temperature the humidity is the only value: it takes the hero
    // slot (size, left edge) instead of sitting small on the right.
    const humidityIsHero = showHumidity && !showTemperature;

    const showLabels = config.showSeriesLabels;
    return html`<div class="readings ${showLabels ? '' : 'no-labels'}">
      ${showLabels
        ? html`<div class="reading-labels" aria-hidden="true">
        ${showTemperature
          ? html`<span class="series-label"
              ><span class="series-dot" style="background:${config.accentColor}"></span
              >${t.t('temperature')}</span
            >`
          : nothing}
        ${showHumidity
          ? html`<span class="series-label"
              ><span class="series-dot" style="background:${config.humidity.color}"></span
              >${t.t('humidity')}</span
            >`
          : nothing}
        </div>`
        : nothing}
      <div class="reading-values">
        ${showTemperature
          ? this.renderReading({
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
            })
          : nothing}
        ${showHumidity
          ? this.renderReading({
              className: humidityIsHero ? 'humidity hero' : 'humidity',
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
            })
          : nothing}
      </div>
      ${this.renderReadingMeta(config, t, temperature, humidity, humidityIsHero)}
    </div>`;
  }

  /**
   * Quiet line under the values: the dew point below the temperature and the
   * humidity rating below the humidity. The line keeps its height while a
   * sensor is unavailable, so the card does not jump.
   */
  private renderReadingMeta(
    config: ResolvedConfig,
    t: Translator,
    temperature: SensorReading,
    humidity: SensorReading,
    humidityIsHero: boolean
  ): TemplateResult | typeof nothing {
    if (!hasReadingMeta(config)) return nothing;
    const language = this.language();
    let dewPoint: TemplateResult | typeof nothing = nothing;
    if (config.humidity.showDewPoint && temperature.value !== null && humidity.value !== null) {
      // The formula works in °C; the result is shown in the sensor's own unit.
      const fahrenheit = temperatureScale(temperature.unit) === 'F';
      const celsius = fahrenheit ? (temperature.value - 32) / 1.8 : temperature.value;
      const dew = dewPointCelsius(celsius, humidity.value);
      if (dew !== null) {
        const shown = fahrenheit ? dew * 1.8 + 32 : dew;
        dewPoint = html`<span class="meta-dew"
          >${t.t('dewPoint')}
          ${formatNumber(shown, language, config.temperatureDecimals)} ${temperature.unit}</span
        >`;
      }
    }
    let rating: TemplateResult | typeof nothing = nothing;
    if (config.humidity.comfort && humidity.value !== null) {
      const level = humidityLevel(humidity.value, config.humidity.comfort);
      const label =
        level === 'dry'
          ? t.t('humidityDry')
          : level === 'humid'
            ? t.t('humidityHumid')
            : t.t('humidityComfortable');
      rating = html`<span class="meta-humidity level-${level}"
        ><span class="meta-dot" aria-hidden="true"></span>${label}</span
      >`;
    }
    return html`<div class="reading-meta ${humidityIsHero ? 'humidity-first' : ''}">
      ${dewPoint}${rating}
    </div>`;
  }

  /**
   * One measured value; the accent dot of the caption row marks its series.
   * Deliberately not a button: a tap on the value belongs to the card, which
   * opens the thermostat dialog.
   */
  private renderReading(options: {
    className: string;
    value: number | null;
    unit: string;
    decimals: number;
    language: string;
    ariaLabel: string;
    color: string;
  }): TemplateResult {
    const text =
      options.value !== null
        ? formatNumber(options.value, options.language, options.decimals)
        : '–';

    return html`<span class="reading ${options.className}" style="--series-color:${options.color}">
      <span class="reading-number" role="text" aria-label="${options.ariaLabel}"
        ><span class="reading-value">${text}</span
        ><span class="reading-unit">${options.unit}</span></span
      >
    </span>`;
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
   * Entity a more-info or toggle action works on when it names none: the
   * thermostat, else the temperature sensor, else the humidity sensor. Without
   * a thermostat a tap therefore opens the sensor's history instead of doing
   * nothing.
   */
  private get mainEntity(): string | undefined {
    return this._config ? defaultActionEntity(this._config) : undefined;
  }

  /** Whether a tap does something – the card is then a button. */
  private get tapEnabled(): boolean {
    return Boolean(this._config) && isActionable(this._config!.actions.tap, this.mainEntity);
  }

  private hasGesture(kind: 'hold' | 'doubleTap'): boolean {
    const action = this._config?.actions[kind] ?? null;
    return isActionable(action, this.mainEntity);
  }

  /** Words for the accessible name of the tap ("Thermostat öffnen", …). */
  private tapLabel(t: Translator): string {
    const action = this._config?.actions.tap;
    if (action?.action === 'more-info') {
      const entityId = action.entity ?? this.mainEntity;
      return entityId?.startsWith('climate.') ? t.t('openThermostat') : t.t('openDetails');
    }
    return t.t('runAction');
  }

  private run(action: CardAction | null): void {
    runAction(this, this.hass, action, this.mainEntity, {
      confirmText: this.translator().t('confirmAction'),
    });
  }

  private holdTimer?: ReturnType<typeof setTimeout>;
  private holdFired = false;
  private pressOrigin?: { x: number; y: number };
  private tapTimer?: ReturnType<typeof setTimeout>;

  /** Taps inside the chart belong to the chart while it shows its readout. */
  private chartOwns(target: EventTarget | null): boolean {
    const element = target as HTMLElement | null;
    return Boolean(element?.closest?.('.chart-slot, room-climate-chart')) && Boolean(this._config?.chart.showTooltip);
  }

  private clearHold(): void {
    if (this.holdTimer) clearTimeout(this.holdTimer);
    this.holdTimer = undefined;
  }

  /** A press of HOLD_MS without moving runs `hold_action`. */
  private onPressStart = (event: PointerEvent): void => {
    this.holdFired = false;
    if (!this.hasGesture('hold') || this.chartOwns(event.target)) return;
    if (event.button !== undefined && event.button > 0) return;
    this.pressOrigin = { x: event.clientX, y: event.clientY };
    this.clearHold();
    this.holdTimer = setTimeout(() => {
      this.holdTimer = undefined;
      this.holdFired = true;
      this.run(this._config?.actions.hold ?? null);
    }, HOLD_MS);
  };

  private onPressMove = (event: PointerEvent): void => {
    if (!this.holdTimer || !this.pressOrigin) return;
    const dx = event.clientX - this.pressOrigin.x;
    const dy = event.clientY - this.pressOrigin.y;
    // Scrolling the dashboard is not a long press.
    if (dx * dx + dy * dy > HOLD_MOVE_TOLERANCE * HOLD_MOVE_TOLERANCE) this.clearHold();
  };

  private onPressEnd = (): void => {
    this.clearHold();
  };

  /**
   * One tap: runs `tap_action`, unless the press just ran `hold_action`. With a
   * `double_tap_action` the first tap waits DOUBLE_TAP_MS for a second one;
   * without it nothing waits.
   */
  private handleTap(): void {
    if (this.holdFired) {
      this.holdFired = false;
      return;
    }
    const actions = this._config?.actions;
    if (!actions) return;
    if (this.hasGesture('doubleTap')) {
      if (this.tapTimer) {
        clearTimeout(this.tapTimer);
        this.tapTimer = undefined;
        this.run(actions.doubleTap);
        return;
      }
      this.tapTimer = setTimeout(() => {
        this.tapTimer = undefined;
        this.run(actions.tap);
      }, DOUBLE_TAP_MS);
      return;
    }
    this.run(actions.tap);
  }

  /**
   * A tap anywhere on the card – except on elements that act themselves (the
   * status row handles its own click, links and inputs stay theirs) and on the
   * chart while it shows the value readout.
   */
  private handleCardClick = (event: MouseEvent): void => {
    const target = event.target as HTMLElement | null;
    if (this.chartOwns(target)) return;
    if (target?.closest('button, a, input, select, textarea')) return;
    this.handleTap();
  };

  /**
   * Keyboard twin of the card tap, used while the status row (which normally
   * carries that path) is not rendered. Only keys landing on the card itself
   * count – inner controls keep their own behaviour.
   */
  private handleCardKeydown = (event: KeyboardEvent): void => {
    if (event.target !== event.currentTarget) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    if (!this.tapEnabled) return;
    event.preventDefault();
    this.run(this._config?.actions.tap ?? null);
  };

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
    /*
     * Mode and action together ("Automatik · Heizt"): the mode alone hid whether
     * the heating actually runs. Said once when both are the same thing ("Aus")
     * or when there is no action to add (the label already is the mode).
     */
    const stateText =
      showMode &&
      thermostat.modeLabel &&
      thermostat.status !== 'unknown' &&
      thermostat.modeLabel !== thermostat.label
        ? `${thermostat.modeLabel} · ${thermostat.label}`
        : showMode && thermostat.status === 'unknown'
          ? (thermostat.modeLabel ?? thermostat.label)
          : thermostat.label;
    if (!showSetpoint && !showStatus && !showMode) return nothing;

    const color = thermostatStatusColor(thermostat, config);
    const language = this.language();
    const setpointText =
      thermostat.setpoint !== null
        ? `${formatNumber(thermostat.setpoint, language, config.temperatureDecimals)} ${
            thermostat.unit
          }`
        : '';

    const tappable = this.tapEnabled;
    const content = html`${showStatus
        ? html`<span class="flame status-${thermostat.status}" style="color:${color}" aria-hidden="true"
            >${this.heatingIcon(thermostat)}</span
          >`
        : nothing}
      <span class="climate-state" role=${tappable ? 'status' : nothing}
        >${stateText}</span
      >
      ${showSetpoint
        ? html`<span class="climate-sep" aria-hidden="true">·</span>
            <span class="climate-setpoint"
              ><span class="climate-setpoint-label">${t.t('setpoint')}</span> ${setpointText}</span
            >`
        : nothing}`;

    // Without a target the row stays a plain live region; with one it becomes a
    // real button, so keyboard users have the same path as a finger.
    if (!tappable) {
      return html`<div
        class="climate-row"
        role="status"
        aria-label="${this.thermostatAria(thermostat)}"
      >
        ${content}
      </div>`;
    }
    return html`<button
      type="button"
      class="climate-row is-tappable"
      aria-label="${this.thermostatAria(thermostat)} – ${this.tapLabel(t)}"
      title="${this.tapLabel(t)}"
      @click=${(event: MouseEvent) => {
        event.stopPropagation();
        this.handleTap();
      }}
    >
      ${content}
    </button>`;
  }

  /**
   * "Fenster offen – Heizung läuft": both facts are on the card already, but
   * only together are they worth acting on. Shown while the window counts as
   * open and the thermostat reports `hvac_action: heating`.
   */
  private renderWindowWarning(
    config: ResolvedConfig,
    t: Translator
  ): TemplateResult | typeof nothing {
    if (!config.window.enabled || !config.window.warnWhileHeating) return nothing;
    if (!config.thermostat.enabled) return nothing;
    if (readWindow(this.hass, config).status !== 'open') return nothing;
    if (readThermostat(this.hass, config, t).status !== 'heating') return nothing;
    return html`<div class="climate-warning" role="alert">
      <span class="climate-warning-icon" aria-hidden="true">${icons.windowOpen()}</span>
      <span>${t.t('windowHeatingWarning')}</span>
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
    // The window ends "now", not at the last fetch (up to five minutes ago), and
    // the live state closes the remaining gap to the reading above.
    const end = Date.now();
    const start = end - config.chart.hours * 60 * 60 * 1000;
    const temperatureSamples =
      config.chart.showTemperature && config.temperatureEntity
        ? this.withLiveState(
            this._history[config.temperatureEntity],
            config.temperatureEntity,
            end
          )
        : undefined;
    const humiditySamples =
      config.chart.showHumidity && config.humidityEntity
        ? this.withLiveState(this._history[config.humidityEntity], config.humidityEntity, end)
        : undefined;

    const language = this.language();
    const clock = this.chartClock();
    const humidityUnit = config.humidityEntity
      ? this.hass?.states?.[config.humidityEntity]?.attributes?.unit_of_measurement
      : undefined;

    const thermostat = config.thermostat.enabled ? readThermostat(this.hass, config, t) : undefined;

    /*
     * The setpoint is drawn on the temperature scale. If the thermostat reports
     * a different scale than the sensor (say °F vs °C), the reference line would
     * sit at a completely wrong height – so it is converted, and dropped when a
     * conversion is impossible instead of inventing a position.
     */
    const temperatureUnitOfSensor =
      (config.temperatureEntity
        ? this.hass?.states?.[config.temperatureEntity]?.attributes?.unit_of_measurement
        : undefined) ?? '°C';
    const rawSetpoint = thermostat?.setpoint ?? null;
    const convertedSetpoint =
      rawSetpoint === null || !thermostat
        ? null
        : convertTemperature(rawSetpoint, thermostat.unit, temperatureUnitOfSensor);
    const setpoint = convertedSetpoint ?? (thermostat?.unit === temperatureUnitOfSensor ? rawSetpoint : null);
    const setpointHistory = thermostat
      ? this.setpointSeries(rawSetpoint, thermostat.unit, temperatureUnitOfSensor, end)
      : undefined;
    /*
     * The band thresholds are stored in °C (the editor always says °C), but the
     * curve plots the raw values of the sensor. A °F sensor therefore needs the
     * limits converted, otherwise 18 °C would sit at 64 °F in the band scale.
     */
    const bandValue = (celsius: number, unit: string | undefined): number =>
      convertTemperature(celsius, '°C', unit) ?? celsius;
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
      bandColdText: t.t('bandCold'),
      bandNormalText: t.t('bandNormal'),
      bandWarmText: t.t('bandWarm'),
      bandHotText: t.t('bandHot'),
    };

    // With the readout switched off the chart area belongs to the card tap.
    const chartTappable = this.tapEnabled && !config.chart.showTooltip;
    /*
     * The chart's horizontal extent is a number, not a CSS trick: full bleed
     * cancels the inset, otherwise the chart shares the text edge. Written as an
     * inline style so the value can be asserted (jsdom has no layout engine).
     */
    const chartMargin = chartSlotMargin(config);
    const chartBottomMargin = chartSlotBottomMargin(config);

    return html`<div
      class="chart-slot ${chartTappable ? 'is-tappable' : ''}"
      style="margin-left:${chartMargin}px;margin-right:${chartMargin}px;margin-bottom:${chartBottomMargin}px"
    >
      <room-climate-chart
        .temperature=${temperatureSamples}
        .humidity=${humiditySamples}
        .accentColor=${config.accentColor}
        .humidityColor=${config.humidity.color}
        .setpoint=${setpoint}
        .setpointHistory=${setpointHistory}
        .setpointUnit=${temperatureUnitOfSensor}
        .start=${start}
        .end=${end}
        .showPoints=${config.chart.showPoints}
        .showGrid=${config.chart.showGrid}
        .showTooltip=${config.chart.showTooltip}
        .showExtremes=${config.chart.showExtremes}
        .temperatureUnit=${temperatureUnitOfSensor}
        .humidityUnit=${humidityUnit ?? '%'}
        .temperatureDecimals=${config.temperatureDecimals}
        .humidityDecimals=${config.humidityDecimals}
        .curve=${config.chart.curve}
        .smoothing=${config.chart.smoothing}
        .gapMode=${config.chart.gapMode}
        .maxGapMinutes=${config.chart.maxGapMinutes}
        .gapStyle=${config.chart.gapStyle}
        .humidityLineStyle=${config.chart.humidityLineStyle}
        .showTemperatureArea=${config.chart.showTemperatureGradient}
        .showHumidityArea=${config.chart.showHumidityGradient}
        .chartOpacity=${Math.round(config.chart.opacity * 100)}
        .showAxis=${config.chart.showAxis}
        .showSetpoint=${config.chart.showChartSetpoint}
        .temperatureAreaOpacity=${config.chart.temperatureAreaOpacity}
        .humidityAreaOpacity=${config.chart.humidityAreaOpacity}
        .temperatureBands=${config.chart.temperatureBands}
        .bandCold=${bandValue(config.chart.bandLimits.coldBelow, temperatureUnitOfSensor)}
        .bandWarm=${bandValue(config.chart.bandLimits.warmAbove, temperatureUnitOfSensor)}
        .bandHot=${bandValue(config.chart.bandLimits.hotAbove, temperatureUnitOfSensor)}
        .bandTransition=${Math.round(config.chart.bandTransition * 100)}
        .temperatureScale=${temperatureScale(temperatureUnitOfSensor) ?? 'C'}
        .cornerRadius=${config.borderRadius ?? THEME_CARD_RADIUS}
        .language=${language}
        .timeZone=${clock.timeZone}
        .hour12=${clock.hour12}
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
      /* Fills its cell in the sections grid; auto everywhere else. */
      height: 100%;
      --rcc-space-1: 4px;
      --rcc-space-2: 8px;
      --rcc-space-3: 12px;
      --rcc-space-5: 20px;
      --rcc-inset: 10px;

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
      /* Amber of the open-window badge; darker on light cards for contrast. */
      --rcc-warning: var(--warning-color, #f59e0b);
      --rcc-accent: #4fd1a5;
      --rcc-secondary: #8b86d6;

      --rcc-temp-size: 42px;
      --rcc-hum-size: 20px;
      --rcc-temp-font: inherit;
      --rcc-hum-font: inherit;

      color: var(--rcc-text);
      font-family: var(--ha-font-family-body, inherit);
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }
    /*
     * The frame belongs to ha-card and the theme (background, border, shadow,
     * radius). Only an explicit dark or light theme, or an own radius, paints
     * over it.
     */
    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      height: var(--rcc-height, 100%);
      min-height: 0;
      /* One inset for everything: title, values and chart share the same edge. */
      padding: var(--rcc-inset, 10px);
      overflow: hidden;
      color: var(--rcc-text);
      border-radius: var(--rcc-radius, var(--ha-card-border-radius, 12px));
      transition:
        background-color 0.2s ease,
        border-color 0.2s ease,
        color 0.2s ease;
    }
    .card.theme-dark,
    .card.theme-light {
      background-color: var(--rcc-bg);
      background-image: var(--rcc-surface);
      border: 1px solid var(--rcc-hairline);
      box-shadow: 0 8px 24px -22px rgba(0, 0, 0, 0.9);
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
      --rcc-warning: #fbbf24;
    }
    .card.theme-light {
      --rcc-bg: #ffffff;
      --rcc-surface: linear-gradient(160deg, #ffffff 0%, #f7f8fa 100%);
      --rcc-hairline: rgba(15, 23, 42, 0.07);
      --rcc-text: rgba(15, 23, 42, 0.92);
      --rcc-muted: rgba(15, 23, 42, 0.52);
      --rcc-tertiary: rgba(15, 23, 42, 0.34);
      --rcc-warning: #b45309;
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
    /*
     * Icon height follows the capital letter of the title, not the line box.
     * The capitals of the 15 px title are ~11 px; a 16 px icon box ends up at
     * ~12.5–13 px of visible glyph (the paths do not fill their 24 px viewBox
     * completely), so the icon overshoots by about a pixel top and bottom.
     * 16 px also covers Material icons, which fill their viewBox more fully.
     * The value is a token (nameIconSize()): 16 px at the default 15 px title,
     * 26 px next to a 24 px one – the icon scales with the name instead of
     * looking lost beside it, and never grows past the line box.
     */
    .room-icon .icon {
      width: var(--rcc-name-icon, 16px);
      height: var(--rcc-name-icon, 16px);
    }
    .room-icon ha-icon {
      --mdc-icon-size: var(--rcc-name-icon, 16px);
      color: var(--rcc-tertiary);
      display: inline-flex;
    }
    /* The title is a caption, not a headline: same tone as the series labels. */
    .name {
      margin: 0;
      /* Room name size from the editor; 4/3 line height keeps the proportions. */
      font-size: var(--rcc-name-size, 15px);
      font-weight: 500;
      line-height: var(--rcc-name-line, 20px);
      letter-spacing: -0.012em;
      color: var(--rcc-muted);
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
      color: inherit;
      font: inherit;
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
    /* Dew point (left) and humidity rating (right) under the values. */
    .reading-meta {
      display: flex;
      align-items: center;
      gap: var(--rcc-space-2);
      min-height: 16px;
      font-size: 11px;
      line-height: 16px;
      color: var(--rcc-muted);
      font-variant-numeric: tabular-nums;
      font-feature-settings: 'tnum' 1;
      white-space: nowrap;
    }
    .meta-dew {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .meta-humidity {
      display: inline-flex;
      align-items: center;
      gap: var(--rcc-space-1);
      margin-left: auto;
    }
    .reading-meta.humidity-first .meta-humidity {
      margin-left: 0;
    }
    .meta-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--rcc-accent);
    }
    .meta-humidity.level-dry .meta-dot {
      background: var(--info-color, #60a5fa);
    }
    .meta-humidity.level-humid {
      color: var(--rcc-warning);
    }
    .meta-humidity.level-humid .meta-dot {
      background: var(--rcc-warning);
    }
    /* Humidity-only card: the value is the hero, on the left, at hero size. */
    .reading.humidity.hero {
      margin-left: 0;
      font-size: var(--rcc-temp-size);
    }
    .reading.humidity.hero .reading-number {
      letter-spacing: -0.035em;
    }
    .reading.humidity.hero .reading-unit {
      font-size: 0.34em;
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
    /* The row is a button when the card has somewhere to go on tap. */
    button.climate-row {
      appearance: none;
      border: 0;
      background: none;
      padding: 0;
      font-family: inherit;
      text-align: left;
      cursor: pointer;
      position: relative;
      border-radius: 6px;
    }
    /* A 20 px line is no touch target: grow the hit area, not the layout. */
    button.climate-row::after {
      content: '';
      position: absolute;
      inset: -6px -4px;
    }
    /* Text colour at low strength: visible on dark and light themes alike. */
    button.climate-row:hover {
      background: rgba(127, 127, 127, 0.08);
      background: color-mix(in srgb, var(--rcc-text) 6%, transparent);
    }
    button.climate-row:focus-visible {
      outline: 2px solid var(--rcc-accent);
      outline-offset: 2px;
    }
    /* Whole-card tap target, minus the parts that act on their own. */
    .card.is-tappable {
      cursor: pointer;
    }
    .card.is-tappable .chart-slot {
      cursor: default;
    }
    /* The chart only keeps its own cursor while it owns the tap (readout). */
    .card.is-tappable .chart-slot.is-tappable {
      cursor: pointer;
    }
    .card[role='button']:focus-visible {
      outline: 2px solid var(--rcc-accent);
      outline-offset: 2px;
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
    /* Window open while heating: the one line on the card that asks for action. */
    .climate-warning {
      display: flex;
      align-items: center;
      gap: var(--rcc-space-1);
      margin-top: var(--rcc-space-1);
      min-height: 16px;
      font-size: 12px;
      line-height: 16px;
      font-weight: 500;
      color: var(--rcc-warning);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .climate-warning-icon {
      display: inline-flex;
      flex: none;
    }
    .climate-warning-icon .icon {
      width: 14px;
      height: 14px;
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
    /*
     * Configured chart height is the minimum; inside a taller sections-grid cell
     * the chart takes the remaining space instead of leaving a gap below.
     */
    .auto-height .chart-slot {
      flex: 1 0 auto;
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
      padding: var(--rcc-inset, 10px);
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

    /* The humidity hero shrinks like the temperature it stands in for. */
    .density-xs .reading.humidity.hero {
      font-size: calc(var(--rcc-temp-size, 42px) * 0.6);
    }
    .density-sm .reading.humidity.hero {
      font-size: calc(var(--rcc-temp-size, 42px) * 0.82);
    }

    @media (prefers-reduced-motion: reduce) {
      * {
        transition: none !important;
      }
    }
  `;
}
