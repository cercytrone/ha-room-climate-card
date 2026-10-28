import { describe, expect, it } from 'vitest';
import {
  DEFAULT_OPEN_STATES,
  configEntityIds,
  hasChart,
  humidityBand,
  normalizeConfig,
  preferredCardHeight,
  resolveName,
  temperatureBand,
  temperatureBandColor,
} from '../src/config';
import { createHass, entity } from './helpers';

describe('normalizeConfig', () => {
  it('returns a complete default configuration for empty input', () => {
    const config = normalizeConfig({});
    expect(config.name).toBeUndefined();
    expect(config.icon).toBe('mdi:home-thermometer-outline');
    expect(config.height).toBeNull();
    expect(config.borderRadius).toBe(18);
    expect(config.theme).toBe('auto');
    expect(config.temperatureDecimals).toBe(1);
    expect(config.humidityDecimals).toBe(0);
    expect(config.bands).toEqual({ cool: 19, warm: 25, hot: 28 });
    expect(config.chart.hours).toBe(6);
    expect(config.chart.height).toBe(84);
    expect(config.window.openStates).toEqual(DEFAULT_OPEN_STATES);
    expect(config.window.enabled).toBe(false);
    expect(config.motion.enabled).toBe(false);
    expect(config.thermostat.enabled).toBe(false);
    expect(config.chart.showTemperature).toBe(false);
  });

  it('never throws for nonsense input', () => {
    for (const input of [undefined, null, 42, 'text', [], { temperature_entity: 17 }]) {
      expect(() => normalizeConfig(input)).not.toThrow();
    }
    const config = normalizeConfig({ temperature_entity: 'NOT AN ENTITY' });
    expect(config.temperatureEntity).toBeUndefined();
  });

  it('enables optional sections from the entity alone', () => {
    const config = normalizeConfig({
      temperature_entity: 'sensor.temp',
      humidity_entity: 'sensor.hum',
      window_entity: 'binary_sensor.window',
      motion_entity: 'binary_sensor.motion',
      climate_entity: 'climate.thermostat',
    });
    expect(config.window.enabled).toBe(true);
    expect(config.motion.enabled).toBe(true);
    expect(config.thermostat.enabled).toBe(true);
    expect(config.chart.showTemperature).toBe(true);
    expect(config.chart.showHumidity).toBe(true);
    expect(hasChart(config)).toBe(true);
  });

  it('respects explicit switches that turn features off', () => {
    const config = normalizeConfig({
      window_entity: 'binary_sensor.window',
      show_window: false,
      climate_entity: 'climate.thermostat',
      show_thermostat: false,
      temperature_entity: 'sensor.temp',
      show_temperature_chart: false,
    });
    expect(config.window.enabled).toBe(false);
    expect(config.thermostat.enabled).toBe(false);
    expect(config.chart.showTemperature).toBe(false);
    expect(hasChart(config)).toBe(false);
  });

  it('clamps and sanitises numeric values', () => {
    const config = normalizeConfig({
      height: 99999,
      border_radius: -20,
      temperature_decimals: 9,
      humidity_decimals: -3,
      chart_hours: 0,
      chart_height: 5000,
    });
    expect(config.height).toBe(2000);
    expect(config.borderRadius).toBe(0);
    expect(config.temperatureDecimals).toBe(3);
    expect(config.humidityDecimals).toBe(0);
    expect(config.chart.hours).toBe(1);
    expect(config.chart.height).toBe(400);
  });

  it('treats "auto" and 0 as automatic height', () => {
    expect(normalizeConfig({ height: 'auto' }).height).toBeNull();
    expect(normalizeConfig({ height: 0 }).height).toBeNull();
    expect(normalizeConfig({ height: 240 }).height).toBe(240);
  });

  it('sorts temperature thresholds so a swapped config still behaves', () => {
    const config = normalizeConfig({
      temperature_cool_below: 28,
      temperature_warm_above: 19,
      temperature_hot_above: 25,
    });
    expect(config.bands).toEqual({ cool: 19, warm: 25, hot: 28 });
  });

  it('parses comma separated open states and lowercases them', () => {
    const config = normalizeConfig({ window_entity: 'binary_sensor.w', window_open_states: 'ON, tilted' });
    expect(config.window.openStates).toEqual(['on', 'tilted']);
  });

  it('defaults the gap handling to a continuous, solid line', () => {
    const config = normalizeConfig({ temperature_entity: 'sensor.t' });
    expect(config.chart.gapMode).toBe('connect');
    expect(config.chart.maxGapMinutes).toBe(120);
    expect(config.chart.gapStyle).toBe('solid');
  });

  it('accepts gap options and clamps the maximum gap', () => {
    const custom = normalizeConfig({
      chart_gap_mode: 'break',
      chart_gap_style: 'dashed',
      chart_max_gap_minutes: 45,
    });
    expect(custom.chart.gapMode).toBe('break');
    expect(custom.chart.gapStyle).toBe('dashed');
    expect(custom.chart.maxGapMinutes).toBe(45);

    expect(normalizeConfig({ chart_max_gap_minutes: 1 }).chart.maxGapMinutes).toBe(5);
    expect(normalizeConfig({ chart_max_gap_minutes: 5000 }).chart.maxGapMinutes).toBe(720);
    expect(normalizeConfig({ chart_max_gap_minutes: 'abc' }).chart.maxGapMinutes).toBe(120);
  });

  it('falls back to safe gap values', () => {
    const config = normalizeConfig({ chart_gap_mode: 'zigzag', chart_gap_style: 'dotted' } as never);
    expect(config.chart.gapMode).toBe('connect');
    expect(config.chart.gapStyle).toBe('solid');
  });

  it('falls back to safe theme / curve values', () => {
    const config = normalizeConfig({ theme: 'neon', chart_curve: 'zigzag' } as never);
    expect(config.theme).toBe('auto');
    expect(config.chart.curve).toBe('smooth');
  });

  it('collects every configured entity id', () => {
    const config = normalizeConfig({
      temperature_entity: 'sensor.t',
      humidity_entity: 'sensor.h',
      window_entity: 'binary_sensor.w',
      motion_entity: 'binary_sensor.m',
      climate_entity: 'climate.c',
      name_entity: 'sensor.n',
    });
    expect(configEntityIds(config).sort()).toEqual([
      'binary_sensor.m',
      'binary_sensor.w',
      'climate.c',
      'sensor.h',
      'sensor.n',
      'sensor.t',
    ]);
  });

  it('computes a preferred height for layout helpers', () => {
    const minimal = normalizeConfig({});
    const withChart = normalizeConfig({
      temperature_entity: 'sensor.t',
      climate_entity: 'climate.c',
      chart_height: 100,
    });
    expect(preferredCardHeight(withChart)).toBeGreaterThan(preferredCardHeight(minimal));
  });
});

describe('temperature & humidity bands', () => {
  const config = normalizeConfig({});

  it('maps values to bands', () => {
    expect(temperatureBand(10, config.bands)).toBe('cool');
    expect(temperatureBand(21, config.bands)).toBe('comfort');
    expect(temperatureBand(26, config.bands)).toBe('warm');
    expect(temperatureBand(30, config.bands)).toBe('hot');
  });

  it('maps bands to colours', () => {
    expect(temperatureBandColor(10, config)).toBe(config.bandColors.cool);
    expect(temperatureBandColor(21, config)).toBe(config.bandColors.comfort);
    expect(temperatureBandColor(30, config)).toBe(config.bandColors.hot);
  });

  it('evaluates humidity thresholds and can disable them', () => {
    expect(humidityBand(20, config)).toBe('low');
    expect(humidityBand(50, config)).toBe('normal');
    expect(humidityBand(90, config)).toBe('high');
    const disabled = normalizeConfig({ humidity_low_threshold: 0, humidity_high_threshold: 0 });
    expect(humidityBand(20, disabled)).toBe('normal');
    expect(humidityBand(99, disabled)).toBe('normal');
  });
});

describe('resolveName', () => {
  it('prefers the configured name', () => {
    const config = normalizeConfig({ name: 'Küche' });
    expect(resolveName(config, createHass())).toBe('Küche');
  });

  it('falls back to the friendly name of the name entity', () => {
    const hass = createHass({
      states: [entity('sensor.name', { state: '1', attributes: { friendly_name: 'Wohnzimmer' } })],
    });
    const config = normalizeConfig({ name_entity: 'sensor.name' });
    expect(resolveName(config, hass)).toBe('Wohnzimmer');
  });

  it('falls back to the temperature sensor friendly name', () => {
    const hass = createHass({
      states: [entity('sensor.temp', { state: '21', attributes: { friendly_name: 'Bad' } })],
    });
    const config = normalizeConfig({ temperature_entity: 'sensor.temp' });
    expect(resolveName(config, hass)).toBe('Bad');
  });

  it('uses a generic label when nothing is available', () => {
    expect(resolveName(normalizeConfig({}), undefined)).toBe('Raumklima');
  });
});
