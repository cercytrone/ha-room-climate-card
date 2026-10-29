import type { HomeAssistant, LovelaceCardConfig } from './types';

export type ThemeMode = 'auto' | 'dark' | 'light';
export type CurveMode = 'smooth' | 'linear';
/** `connect` interpolates small holes, `break` keeps them visible. */
export type GapMode = 'connect' | 'break';
/** `solid` draws bridged stretches like measured ones. */
export type GapStyle = 'solid' | 'dashed';

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
  /** Font size of the humidity value in pixels (default 28). */
  humidity_font_size?: number;
  /** CSS font family for the humidity value; empty = theme font. */
  humidity_font_family?: string;

  // Temperature colour bands
  temperature_cool_below?: number;
  temperature_warm_above?: number;
  temperature_hot_above?: number;
  temperature_cool_color?: string;
  temperature_comfort_color?: string;
  temperature_warm_color?: string;
  temperature_hot_color?: string;

  // Humidity colours
  humidity_color?: string;
  humidity_low_threshold?: number;
  humidity_high_threshold?: number;
  humidity_low_color?: string;
  humidity_high_color?: string;

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
  chart_gap_mode?: GapMode;
  chart_max_gap_minutes?: number;
  chart_gap_style?: GapStyle;
  chart_show_legend?: boolean;
  chart_show_points?: boolean;
  chart_show_grid?: boolean;
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
  gapMode: GapMode;
  maxGapMinutes: number;
  gapStyle: GapStyle;
  showLegend: boolean;
  showPoints: boolean;
  showGrid: boolean;
}

export interface TemperatureBandConfig {
  cool: number;
  warm: number;
  hot: number;
}

export interface TemperatureBandColors {
  cool: string;
  comfort: string;
  warm: string;
  hot: string;
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
  color: string;
  lowThreshold: number;
  highThreshold: number;
  lowColor: string;
  highColor: string;
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
  bands: TemperatureBandConfig;
  bandColors: TemperatureBandColors;
  humidity: HumidityConfig;
  window: ResolvedWindowConfig;
  motion: ResolvedMotionConfig;
  thermostat: ResolvedThermostatConfig;
  chart: ResolvedChartConfig;
}

export const DEFAULT_OPEN_STATES = ['on', 'open', 'opening', 'tilted', 'gekippt'];
export const DEFAULT_CLOSED_STATES = ['off', 'closed', 'closing'];

export const DEFAULT_COLORS = {
  cool: '#38bdf8',
  comfort: '#34d399',
  warm: '#fbbf24',
  hot: '#f43f5e',
  humidity: '#a78bfa',
  humidityLow: '#38bdf8',
  humidityHigh: '#e879f9',
  /** Red = heating, green = idle, grey = off (colour-coded HVAC icon). */
  heating: '#ef4444',
  idle: '#34d399',
  off: '#64748b',
} as const;

/** Built-in reading sizes; both are deliberately large and independently tunable. */
export const DEFAULT_READING_FONT_SIZE = {
  temperature: 42,
  humidity: 28,
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
export function normalizeConfig(input: unknown): ResolvedConfig {
  const config = (isRecord(input) ? input : {}) as RoomClimateCardConfig;

  const temperatureEntity = asEntityId(config.temperature_entity);
  const humidityEntity = asEntityId(config.humidity_entity);
  const windowEntity = asEntityId(config.window_entity);
  const motionEntity = asEntityId(config.motion_entity);
  const climateEntity = asEntityId(config.climate_entity);
  const nameEntity = asEntityId(config.name_entity);

  const bands = normalizeBands(config);
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
  const gapMode: GapMode = config.chart_gap_mode === 'break' ? 'break' : 'connect';
  const gapStyle: GapStyle = config.chart_gap_style === 'dashed' ? 'dashed' : 'solid';

  return {
    raw: config,
    name: asString(config.name),
    nameEntity,
    icon: asString(config.icon) ?? 'mdi:home-thermometer-outline',
    height,
    borderRadius: asNumber(config.border_radius, 0, 40, 18),
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
    bands,
    bandColors: {
      cool: asColor(config.temperature_cool_color, DEFAULT_COLORS.cool),
      comfort: asColor(config.temperature_comfort_color, DEFAULT_COLORS.comfort),
      warm: asColor(config.temperature_warm_color, DEFAULT_COLORS.warm),
      hot: asColor(config.temperature_hot_color, DEFAULT_COLORS.hot),
    },
    humidity: {
      color: asColor(config.humidity_color, DEFAULT_COLORS.humidity),
      lowThreshold: asNumber(config.humidity_low_threshold, 0, 100, 35),
      highThreshold: asNumber(config.humidity_high_threshold, 0, 100, 65),
      lowColor: asColor(config.humidity_low_color, DEFAULT_COLORS.humidityLow),
      highColor: asColor(config.humidity_high_color, DEFAULT_COLORS.humidityHigh),
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
      showSetpoint: asBoolean(config.show_setpoint) ?? true,
      showStatus: asBoolean(config.show_hvac_status) ?? true,
      showMode: asBoolean(config.show_hvac_mode) ?? false,
      heatingColor: asColor(config.heating_color, DEFAULT_COLORS.heating),
      idleColor: asColor(config.heating_idle_color, DEFAULT_COLORS.idle),
      offColor: asColor(config.heating_off_color, DEFAULT_COLORS.off),
    },
    chart: {
      showTemperature: showTemperatureChart && Boolean(temperatureEntity),
      showHumidity: showHumidityChart && Boolean(humidityEntity),
      hours: Math.round(asNumber(config.chart_hours, 1, 168, 6)),
      height: Math.round(asNumber(config.chart_height, 30, 400, 84)),
      curve,
      gapMode,
      maxGapMinutes: Math.round(asNumber(config.chart_max_gap_minutes, 5, 720, 120)),
      gapStyle,
      showLegend: asBoolean(config.chart_show_legend) ?? false,
      showPoints: asBoolean(config.chart_show_points) ?? false,
      showGrid: asBoolean(config.chart_show_grid) ?? true,
    },
  };
}

function normalizeBands(config: RoomClimateCardConfig): TemperatureBandConfig {
  const values = [
    asNumber(config.temperature_cool_below, -50, 80, 19),
    asNumber(config.temperature_warm_above, -50, 80, 25),
    asNumber(config.temperature_hot_above, -50, 80, 28),
  ].sort((a, b) => a - b);
  return { cool: values[0], warm: values[1], hot: values[2] };
}

/** Temperature band for a value, expressed as a band key. */
export type TemperatureBand = 'cool' | 'comfort' | 'warm' | 'hot';

export function temperatureBand(value: number, bands: TemperatureBandConfig): TemperatureBand {
  if (value < bands.cool) return 'cool';
  if (value < bands.warm) return 'comfort';
  if (value < bands.hot) return 'warm';
  return 'hot';
}

export function temperatureBandColor(value: number, config: ResolvedConfig): string {
  return config.bandColors[temperatureBand(value, config.bands)];
}

export type HumidityBand = 'low' | 'normal' | 'high';

export function humidityBand(value: number, config: ResolvedConfig): HumidityBand {
  const { lowThreshold, highThreshold } = config.humidity;
  if (lowThreshold > 0 && value < lowThreshold) return 'low';
  if (highThreshold > 0 && value > highThreshold) return 'high';
  return 'normal';
}

export function humidityBandColor(value: number, config: ResolvedConfig): string {
  switch (humidityBand(value, config)) {
    case 'low':
      return config.humidity.lowColor;
    case 'high':
      return config.humidity.highColor;
    default:
      return config.humidity.color;
  }
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
  return config.thermostat.enabled;
}

/** Default card height used for `getCardSize()` / grid options. */
export function preferredCardHeight(config: ResolvedConfig): number {
  if (config.height) return config.height;
  const chartHeight = hasChart(config) ? config.chart.height + 26 : 0;
  const statusRow = hasStatusRow(config) ? 26 : 0;
  // The readings dominate the header; larger fonts should not shrink the card.
  const readings = Math.max(config.typography.temperature.fontSize, config.typography.humidity.fontSize);
  return 62 + Math.round(readings * 0.98) + chartHeight + statusRow;
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
