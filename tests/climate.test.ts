import { describe, expect, it } from 'vitest';
import {
  DEFAULT_HUMIDITY_LIMITS,
  dewPointCelsius,
  humidityLevel,
  orderHumidityLimits,
} from '../src/utils/climate';

describe('dew point', () => {
  it('matches reference values of the Magnus formula', () => {
    // 20 °C / 50 % → 9.3 °C; 25 °C / 60 % → 16.7 °C (common reference tables).
    expect(dewPointCelsius(20, 50)).toBeCloseTo(9.26, 1);
    expect(dewPointCelsius(25, 60)).toBeCloseTo(16.69, 1);
    // Saturated air: dew point equals the temperature.
    expect(dewPointCelsius(18, 100)).toBeCloseTo(18, 5);
  });

  it('refuses values it cannot work with', () => {
    expect(dewPointCelsius(20, 0)).toBeNull();
    expect(dewPointCelsius(20, 120)).toBeNull();
    expect(dewPointCelsius(Number.NaN, 50)).toBeNull();
  });
});

describe('humidity rating', () => {
  it('rates against the limits', () => {
    expect(humidityLevel(35, DEFAULT_HUMIDITY_LIMITS)).toBe('dry');
    expect(humidityLevel(40, DEFAULT_HUMIDITY_LIMITS)).toBe('comfortable');
    expect(humidityLevel(60, DEFAULT_HUMIDITY_LIMITS)).toBe('comfortable');
    expect(humidityLevel(61, DEFAULT_HUMIDITY_LIMITS)).toBe('humid');
  });

  it('sorts limits typed the wrong way round', () => {
    expect(orderHumidityLimits(65, 35)).toEqual({ dryBelow: 35, humidAbove: 65 });
    expect(orderHumidityLimits(50, 50)).toEqual({ dryBelow: 50, humidAbove: 51 });
  });
});
