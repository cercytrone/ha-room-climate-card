import {
  DEFAULT_SMOOTHING,
  SMOOTHING_LEVELS,
  type SmoothingLevel,
} from './chart/geometry';
import type { HomeAssistant, LovelaceCardConfig } from './types';

export type ThemeMode = 'auto' | 'dark' | 'light';
export type CurveMode = 'smooth' | 'linear';
/** `connect` interpolates small holes, `break` keeps them visible. */
export type GapMode = 'connect' | 'break';
/** `solid` draws bridged stretches like measured ones. */
export type GapStyle = 'solid' | 'dashed';
/** Line style of the humidity curve: a continuous stroke or a dotted one. */
export type HumidityLineStyle = 'solid' | 'dotted';
export type { SmoothingLevel } from './chart/geometry';

/**
 * Card configuration as written in YAML / produced by the visual editor.
 * Every key is optional; sensible defaults are applied in `normalizeConfig`.
 */
export interface RoomClimateCardConfig extends LovelaceCardConfig {
  // General
  name?: string;
  name_entity?: string;
  icon?: string;
  /** Card height in pixels. `0` / `"auto"` (default) lets the content decide. */
  height?: number | 'auto';
  border_radius?: number;
  theme?: ThemeMode;

  // Sensors
  temperature_entity?: string;
  humidity_entity?: string;
  temperature_decimals?: number;
  humidity_decimals?: number;
  /** Font size of the big temperature value in pixels (default 42). */
  temperature_font_size?: number;
  /** CSS font family for the temperature value; empty = theme font. */
  temperature_font_family?: string;
  /** Font size of the humidity value in pixels (default 20). */
  humidity_font_size?: number;
  /** CSS font family for the humidity value; empty = theme font. */
  humidity_font_family?: string;
  /** Caption row above the values ("TEMPERATUR" / "LUFTFEUCHTE"). Default on. */
  show_series_labels?: boolean;

  // Series colours (one accent + one subdued secondary)
  /** Accent of the primary value: its dot and the temperature curve. */
  accent_color?: string;
  /** Subdued secondary colour: the humidity dot and curve, nothing else. */
  humidity_color?: string;
  /**
   * Deprecated alias for `accent_color`, kept so existing dashboards do not
   * change colour. Ignored as soon as `accent_color` is set.
   */
  temperature_comfort_color?: string;

  // Window
  show_window?: boolean;
  window_entity?: string;
  window_open_states?: string[];

  // Motion
  show_motion?: boolean;
  motion_entity?: string;
  motion_show_last_changed?: boolean;

  // Thermostat
  show_thermostat?: boolean;
  climate_entity?: string;
  /** Whole heating/status row below the readings. Default on. */
  show_climate_row?: boolean;
  show_setpoint?: boolean;
  show_hvac_status?: boolean;
  show_hvac_mode?: boolean;
  heating_color?: string;
  heating_idle_color?: string;
  heating_off_color?: string;

  // History chart
  show_temperature_chart?: boolean;
  show_humidity_chart?: boolean;
  chart_hours?: number;
  chart_height?: number;
  chart_curve?: CurveMode;
  /** How strongly the curve is averaged: `none` … `strong`. */
  chart_smoothing?: SmoothingLevel;
  chart_gap_mode?: GapMode;
  chart_max_gap_minutes?: number;
  chart_gap_style?: GapStyle;
  /** `dotted` renders the humidity curve as dots; the temperature stays as is. */
  chart_humidity_line_style?: HumidityLineStyle;
  chart_show_points?: boolean;
  chart_show_grid?: boolean;
  /** Soft colour gradient under the temperature curve. Default on. */
  chart_temperature_gradient?: boolean;
  /** Soft colour gradient under the humidity curve. Default on. */
  chart_humidity_gradient?: boolean;
}

export interface ResolvedWindowConfig {
  enabled: boolean;
  entity?: string;
  openStates: string[];
}

export interface ResolvedMotionConfig {
  enabled: boolean;
  entity?: string;
  showLastChanged: boolean;
}

export interface ResolvedThermostatConfig {
  enabled: boolean;
  entity?: string;
  /** The whole row (flame, state, setpoint) can be switched off as one. */
  showRow: boolean;
  showSetpoint: boolean;
  showStatus: boolean;
  showMode: boolean;
  heatingColor: string;
  idleColor: string;
  offColor: string;
}

export interface ResolvedChartConfig {
  showTemperature: boolean;
  showHumidity: boolean;
  hours: number;
  height: number;
  curve: CurveMode;
  /** Averaging level of the curves, selectable in the editor. */
  smoothing: SmoothingLevel;
  gapMode: GapMode;
  maxGapMinutes: number;
  gapStyle: GapStyle;
  humidityLineStyle: HumidityLineStyle;
  showPoints: boolean;
  showGrid: boolean;
  /** Area fill under the temperature curve. */
  showTemperatureGradient: boolean;
  /** Area fill under the humidity curve. */
  showHumidityGradient: boolean;
}


/** Per-reading typography, configured independently for both values. */
export interface ReadingTypography {
  /** Font size in pixels; `null` = built-in default of the card. */
  fontSize: number;
  /** CSS font-family; `undefined` = inherit from the Home Assistant theme. */
  fontFamily?: string;
}

export interface TypographyConfig {
  temperature: ReadingTypography;
  humidity: ReadingTypography;
}

export interface HumidityConfig {
  /** Dot + curve colour of the secondary series. */
  color: string;
}

export interface ResolvedConfig {
  raw: RoomClimateCardConfig;
  name?: string;
  nameEntity?: string;
  icon: string;
  /** `null` means "automatic / content driven". */
  height: number | null;
  borderRadius: number;
  theme: ThemeMode;
  temperatureEntity?: string;
  humidityEntity?: string;
  temperatureDecimals: number;
  humidityDecimals: number;
  typography: TypographyConfig;
  /** Caption row above the readings; hiding it keeps the values in place. */
  showSeriesLabels: boolean;
  /** Single accent: dot of the primary value and the temperature curve. */
  accentColor: string;
  humidity: HumidityConfig;
  window: ResolvedWindowConfig;
  motion: ResolvedMotionConfig;
  thermostat: ResolvedThermostatConfig;
  chart: ResolvedChartConfig;
}

export const DEFAULT_OPEN_STATES = ['on', 'open', 'opening', 'tilted', 'gekippt'];
export const DEFAULT_CLOSED_STATES = ['off', 'closed', 'closing'];

export const DEFAULT_COLORS = {
  /** The only accent of the card: mint. */
  accent: '#4FD1A5',
  /** Deliberately dim indigo – only the dot and the curve use it. */
  humidity: '#8B86D6',
  /**
   * Heating = damped red. The flame is the only coloured element left in the
   * status row, so it whispers instead of shouting – and it only turns red while
   * the thermostat is actually heating.
   */
  heating: '#d16a62',
  /**
   * Off / inactive = exactly the muted tone of the „Soll“ wording next to it, so
   * the row reads as one quiet line.
   */
  off: 'var(--rcc-muted)',
  // There is deliberately no idle entry: waiting borrows `accent`, i.e. the green
  // of the chart, so the flame never introduces a hue the card does not use.
} as const;

/** Built-in reading sizes; both are deliberately large and independently tunable. */
export const DEFAULT_READING_FONT_SIZE = {
  /** Hero of the card (design token). */
  temperature: 42,
  /** Secondary value (design token): large enough to read, too small to compete. */
  humidity: 20,
} as const;

/** Range accepted for `*_font_size` (pixels). */
export const READING_FONT_SIZE_RANGE = { min: 14, max: 96 } as const;

const ENTITY_ID_RE = /^[a-z0-9_]+\.[a-z0-9_]+$/;
const FONT_FAMILY_RE = /^[-a-zA-Z0-9 ,'"_.()]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function asEntityId(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim().toLowerCase();
  return ENTITY_ID_RE.test(trimmed) ? trimmed : undefined;
}

export function asString(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
}

export function asNumber(value: unknown, min: number, max: number, fallback: number): number {
  const parsed = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

export function asBoolean(value: unknown): boolean | undefined {
  if (typeof value === 'boolean') return value;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
}

function asColor(value: unknown, fallback: string): string {
  const color = asString(value);
  if (!color) return fallback;
  // Guard against accidental YAML objects/long garbage.
  return color.length <= 64 ? color : fallback;
}

/**
 * Accepts a CSS font-family list ("Inter", "Roboto, sans-serif",
 * "var(--ha-font-family-body)") and rejects anything that could break out of
 * the declaration. Empty / invalid values fall back to the theme font.
 */
export function asFontFamily(value: unknown): string | undefined {
  const family = asString(value);
  if (!family || family.length > 120) return undefined;
  if (!FONT_FAMILY_RE.test(family)) return undefined;
  return family;
}

function readingFontSize(value: unknown, fallback: number): number {
  return Math.round(
    asNumber(value, READING_FONT_SIZE_RANGE.min, READING_FONT_SIZE_RANGE.max, fallback)
  );
}

function asStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === 'string' ? item.trim().toLowerCase() : ''))
      .filter((item) => item.length > 0);
  }
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim().toLowerCase())
      .filter((item) => item.length > 0);
  }
  return [];
}

/**
 * Builds a fully resolved configuration. Never throws: malformed values fall
 * back to their defaults so a broken YAML file cannot crash the dashboard.
 */
/**
 * Every key the card understands. Used to point out typos in YAML instead of
 * silently ignoring them (`chart_show_legend`, `temperature_comfort_*`, …).
 */
export const KNOWN_CONFIG_KEYS: readonly string[] = [
  'type',
  'name',
  'name_entity',
  'icon',
  'height',
  'border_radius',
  'theme',
  'temperature_entity',
  'humidity_entity',
  'temperature_decimals',
  'humidity_decimals',
  'temperature_font_size',
  'temperature_font_family',
  'humidity_font_size',
  'humidity_font_family',
  'show_series_labels',
  'accent_color',
  'humidity_color',
  'temperature_comfort_color',
  'show_window',
  'window_entity',
  'window_open_states',
  'show_motion',
  'motion_entity',
  'motion_show_last_changed',
  'show_thermostat',
  'climate_entity',
  'show_climate_row',
  'show_setpoint',
  'show_hvac_status',
  'show_hvac_mode',
  'heating_color',
  'heating_idle_color',
  'heating_off_color',
  'show_temperature_chart',
  'show_humidity_chart',
  'chart_hours',
  'chart_height',
  'chart_curve',
  'chart_smoothing',
  'chart_gap_mode',
  'chart_max_gap_minutes',
  'chart_gap_style',
  'chart_humidity_line_style',
  'chart_show_points',
  'chart_show_grid',
  'chart_temperature_gradient',
  'chart_humidity_gradient',
];

/** Keys already reported, so a re-render does not flood the console. */
const reportedKeys = new Set<string>();

/** Warns about unknown configuration keys (once per key). */
function reportUnknownKeys(config: Record<string, unknown>): void {
  for (const key of Object.keys(config)) {
    if (KNOWN_CONFIG_KEYS.includes(key) || reportedKeys.has(key)) continue;
    reportedKeys.add(key);
    // eslint-disable-next-line no-console -- a visible hint beats a silent typo
    console.warn(
      `[room-climate-card] Unbekannter Konfigurationsschlüssel "${key}" – wird ignoriert. ` +
        'Bekannte Schlüssel stehen in der README.'
    );
  }
}

/** Test helper: forget which keys were reported. */
export function resetUnknownKeyWarnings(): void {
  reportedKeys.clear();
}

export function normalizeConfig(input: unknown): ResolvedConfig {
  const config = (isRecord(input) ? input : {}) as RoomClimateCardConfig;
  reportUnknownKeys(config as Record<string, unknown>);

  const temperatureEntity = asEntityId(config.temperature_entity);
  const humidityEntity = asEntityId(config.humidity_entity);
  const windowEntity = asEntityId(config.window_entity);
  const motionEntity = asEntityId(config.motion_entity);
  const climateEntity = asEntityId(config.climate_entity);
  const nameEntity = asEntityId(config.name_entity);

  const openStates = asStringList(config.window_open_states);

  const showWindow = asBoolean(config.show_window) ?? Boolean(windowEntity);
  const showMotion = asBoolean(config.show_motion) ?? Boolean(motionEntity);
  const showThermostat = asBoolean(config.show_thermostat) ?? Boolean(climateEntity);
  const showTemperatureChart =
    asBoolean(config.show_temperature_chart) ?? Boolean(temperatureEntity);
  const showHumidityChart = asBoolean(config.show_humidity_chart) ?? Boolean(humidityEntity);

  const heightValue = config.height;
  const height =
    heightValue === 'auto' || heightValue === undefined || heightValue === null || heightValue === 0
      ? null
      : asNumber(heightValue, 120, 2000, 0) || null;

  const theme: ThemeMode =
    config.theme === 'dark' || config.theme === 'light' || config.theme === 'auto'
      ? config.theme
      : 'auto';

  const curve: CurveMode = config.chart_curve === 'linear' ? 'linear' : 'smooth';
  const smoothing: SmoothingLevel = SMOOTHING_LEVELS.includes(config.chart_smoothing as SmoothingLevel)
    ? (config.chart_smoothing as SmoothingLevel)
    : DEFAULT_SMOOTHING;
  const gapMode: GapMode = config.chart_gap_mode === 'break' ? 'break' : 'connect';
  const gapStyle: GapStyle = config.chart_gap_style === 'dashed' ? 'dashed' : 'solid';
  const humidityLineStyle: HumidityLineStyle =
    config.chart_humidity_line_style === 'dotted' ? 'dotted' : 'solid';

  const accentColor = asColor(
    config.accent_color ?? config.temperature_comfort_color,
    DEFAULT_COLORS.accent
  );

  return {
    raw: config,
    name: asString(config.name),
    nameEntity,
    icon: asString(config.icon) ?? 'mdi:home-thermometer-outline',
    height,
    borderRadius: asNumber(config.border_radius, 0, 40, 26),
    theme,
    temperatureEntity,
    humidityEntity,
    temperatureDecimals: Math.round(asNumber(config.temperature_decimals, 0, 3, 1)),
    humidityDecimals: Math.round(asNumber(config.humidity_decimals, 0, 3, 0)),
    typography: {
      temperature: {
        fontSize: readingFontSize(
          config.temperature_font_size,
          DEFAULT_READING_FONT_SIZE.temperature
        ),
        fontFamily: asFontFamily(config.temperature_font_family),
      },
      humidity: {
        fontSize: readingFontSize(config.humidity_font_size, DEFAULT_READING_FONT_SIZE.humidity),
        fontFamily: asFontFamily(config.humidity_font_family),
      },
    },
    showSeriesLabels: asBoolean(config.show_series_labels) ?? true,
    accentColor,
    humidity: {
      color: asColor(config.humidity_color, DEFAULT_COLORS.humidity),
    },
    window: {
      enabled: showWindow && Boolean(windowEntity),
      entity: windowEntity,
      openStates: openStates.length ? openStates : [...DEFAULT_OPEN_STATES],
    },
    motion: {
      enabled: showMotion && Boolean(motionEntity),
      entity: motionEntity,
      showLastChanged: asBoolean(config.motion_show_last_changed) ?? true,
    },
    thermostat: {
      enabled: showThermostat && Boolean(climateEntity),
      entity: climateEntity,
      showRow: asBoolean(config.show_climate_row) ?? true,
      showSetpoint: asBoolean(config.show_setpoint) ?? true,
      showStatus: asBoolean(config.show_hvac_status) ?? true,
      showMode: asBoolean(config.show_hvac_mode) ?? false,
      heatingColor: asColor(config.heating_color, DEFAULT_COLORS.heating),
      // Waiting is not a state of its own: the flame borrows the chart green.
      idleColor: asColor(config.heating_idle_color, accentColor),
      offColor: asColor(config.heating_off_color, DEFAULT_COLORS.off),
    },
    chart: {
      showTemperature: showTemperatureChart && Boolean(temperatureEntity),
      showHumidity: showHumidityChart && Boolean(humidityEntity),
      hours: Math.round(asNumber(config.chart_hours, 1, 168, 6)),
      height: Math.round(asNumber(config.chart_height, 30, 400, 112)),
      curve,
      smoothing,
      gapMode,
      maxGapMinutes: Math.round(asNumber(config.chart_max_gap_minutes, 5, 720, 120)),
      gapStyle,
      humidityLineStyle,
      showPoints: asBoolean(config.chart_show_points) ?? false,
      showTemperatureGradient: asBoolean(config.chart_temperature_gradient) ?? true,
      showHumidityGradient: asBoolean(config.chart_humidity_gradient) ?? true,
      // The reference sheet reduces the axis to a hairline plus three labels;
      // the dashed helper lines are opt-in now.
      showGrid: asBoolean(config.chart_show_grid) ?? false,
    },
  };
}

/** All entity ids this configuration listens to. */
export function configEntityIds(config: ResolvedConfig): string[] {
  const ids = [
    config.temperatureEntity,
    config.humidityEntity,
    config.window.entity,
    config.motion.entity,
    config.thermostat.entity,
    config.nameEntity,
  ];
  return ids.filter((id): id is string => typeof id === 'string' && id.length > 0);
}

export function hasChart(config: ResolvedConfig): boolean {
  return (
    (config.chart.showTemperature && Boolean(config.temperatureEntity)) ||
    (config.chart.showHumidity && Boolean(config.humidityEntity))
  );
}

export function hasStatusRow(config: ResolvedConfig): boolean {
  return config.thermostat.enabled && config.thermostat.showRow;
}

/**
 * Default card height used for `getCardSize()` / grid options.
 *
 * Mirrors the 4 px rhythm of the stylesheet: 20 px inset top and bottom, title
 * row, caption row, hero, heating row, chart slot.
 */
export function preferredCardHeight(config: ResolvedConfig): number {
  if (config.height) return config.height;
  const readings = config.typography.temperature.fontSize;
  const chartHeight = hasChart(config) ? config.chart.height : 0;
  const statusRow = hasStatusRow(config) ? 20 : 0;
  const header = 28;
  // Caption row plus its 4 px gap disappears completely when switched off.
  const labels = config.showSeriesLabels ? 20 : 0;
  return 20 + header + 12 + labels + readings + 8 + statusRow + 12 + chartHeight + 20;
}

export function resolveName(config: ResolvedConfig, hass?: HomeAssistant): string {
  if (config.name) return config.name;
  if (config.nameEntity) {
    const entity = hass?.states[config.nameEntity];
    const friendly = entity?.attributes?.friendly_name;
    if (typeof friendly === 'string' && friendly.trim().length) return friendly;
  }
  if (config.temperatureEntity) {
    const entity = hass?.states[config.temperatureEntity];
    const friendly = entity?.attributes?.friendly_name;
    if (typeof friendly === 'string' && friendly.trim().length) return friendly;
  }
  return 'Raumklima';
}
