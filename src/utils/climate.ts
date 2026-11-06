/**
 * Small indoor-climate helpers: the humidity rating and the dew point.
 */

export type HumidityLevel = 'dry' | 'comfortable' | 'humid';

export interface HumidityLimits {
  /** Below this relative humidity (%) the air counts as dry. */
  dryBelow: number;
  /** Above this relative humidity (%) the air counts as humid (mould risk). */
  humidAbove: number;
}

/** Defaults that match common indoor guidance: 40–60 % RH is comfortable. */
export const DEFAULT_HUMIDITY_LIMITS: HumidityLimits = { dryBelow: 40, humidAbove: 60 };

export function humidityLevel(value: number, limits: HumidityLimits): HumidityLevel {
  if (value < limits.dryBelow) return 'dry';
  if (value > limits.humidAbove) return 'humid';
  return 'comfortable';
}

/** Keeps the two limits usable: in range and the dry one below the humid one. */
export function orderHumidityLimits(dryBelow: number, humidAbove: number): HumidityLimits {
  const low = Math.min(dryBelow, humidAbove);
  const high = Math.max(dryBelow, humidAbove);
  return { dryBelow: low, humidAbove: high === low ? Math.min(100, low + 1) : high };
}

/**
 * Dew point in °C from air temperature (°C) and relative humidity (%), after
 * the Magnus formula (coefficients of Sonntag 1990, good to ±0.4 °C between
 * -45 and 60 °C). Returns `null` for values it cannot work with.
 */
export function dewPointCelsius(temperatureC: number, relativeHumidity: number): number | null {
  if (!Number.isFinite(temperatureC) || !Number.isFinite(relativeHumidity)) return null;
  if (relativeHumidity <= 0 || relativeHumidity > 100) return null;
  const a = 17.62;
  const b = 243.12;
  const gamma = Math.log(relativeHumidity / 100) + (a * temperatureC) / (b + temperatureC);
  return (b * gamma) / (a - gamma);
}
