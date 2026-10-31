import { describe, expect, it } from 'vitest';
import {
  DEFAULT_OPEN_STATES,
  DEFAULT_READING_FONT_SIZE,
  READING_FONT_SIZE_RANGE,
  asFontFamily,
  configEntityIds,
  hasChart,
  normalizeConfig,
  preferredCardHeight,
  resolveName,
} from '../src/config';
import { createHass, entity } from './helpers';

describe('normalizeConfig', () => {
  it('returns a complete default configuration for empty input', () => {
    const config = normalizeConfig({});
    expect(config.name).toBeUndefined();
    expect(config.icon).toBe('mdi:home-thermometer-outline');
    expect(config.height).toBeNull();
    expect(config.borderRadius).toBe(26);
    expect(config.theme).toBe('auto');
    expect(config.temperatureDecimals).toBe(1);
    expect(config.humidityDecimals).toBe(0);
    // One accent, one subdued secondary – no band colours any more.
    expect(config.accentColor).toBe('#4FD1A5');
    expect(config.humidity.color).toBe('#8B86D6');
    expect(config.chart.hours).toBe(6);
    expect(config.chart.height).toBe(112);
    expect(config.chart.showGrid).toBe(false);
    expect(config.window.openStates).toEqual(DEFAULT_OPEN_STATES);
    expect(config.window.enabled).toBe(false);
    expect(config.motion.enabled).toBe(false);
    expect(config.thermostat.enabled).toBe(false);
    expect(config.chart.showTemperature).toBe(false);
  });

  it('exposes large, independent default font sizes for both readings', () => {
    const config = normalizeConfig({});
    expect(config.typography.temperature.fontSize).toBe(DEFAULT_READING_FONT_SIZE.temperature);
    expect(config.typography.humidity.fontSize).toBe(DEFAULT_READING_FONT_SIZE.humidity);
    // The hero stays clearly dominant; the secondary value follows at half size.
    expect(config.typography.temperature.fontSize).toBeGreaterThanOrEqual(40);
    expect(config.typography.humidity.fontSize).toBeGreaterThanOrEqual(18);
    expect(config.typography.temperature.fontSize).toBeGreaterThan(
      config.typography.humidity.fontSize * 1.5
    );
    expect(config.typography.temperature.fontFamily).toBeUndefined();
    expect(config.typography.humidity.fontFamily).toBeUndefined();
  });

  it('keeps temperature and humidity typography independent', () => {
    const config = normalizeConfig({
      temperature_font_size: 72,
      humidity_font_size: 19,
      temperature_font_family: 'Inter',
      humidity_font_family: '"Roboto Mono", monospace',
    });
    expect(config.typography.temperature).toEqual({ fontSize: 72, fontFamily: 'Inter' });
    expect(config.typography.humidity).toEqual({
      fontSize: 19,
      fontFamily: '"Roboto Mono", monospace',
    });
  });

  it('clamps font sizes and rejects unusable font families', () => {
    const clamped = normalizeConfig({ temperature_font_size: 500, humidity_font_size: 1 });
    expect(clamped.typography.temperature.fontSize).toBe(READING_FONT_SIZE_RANGE.max);
    expect(clamped.typography.humidity.fontSize).toBe(READING_FONT_SIZE_RANGE.min);

    const invalid = normalizeConfig({
      temperature_font_family: 'Inter; color: red',
      humidity_font_family: 'x'.repeat(200),
    });
    expect(invalid.typography.temperature.fontFamily).toBeUndefined();
    expect(invalid.typography.humidity.fontFamily).toBeUndefined();

    const garbage = normalizeConfig({ temperature_font_size: 'viel', humidity_font_family: 42 });
    expect(garbage.typography.temperature.fontSize).toBe(DEFAULT_READING_FONT_SIZE.temperature);
    expect(garbage.typography.humidity.fontFamily).toBeUndefined();
  });

  it('accepts theme variables and quoted font lists', () => {
    expect(asFontFamily('var(--ha-font-family-body)')).toBe('var(--ha-font-family-body)');
    expect(asFontFamily('"Segoe UI", Roboto, sans-serif')).toBe('"Segoe UI", Roboto, sans-serif');
    expect(asFontFamily('   ')).toBeUndefined();
    expect(asFontFamily(undefined)).toBeUndefined();
  });

  it('defaults the humidity line to solid and accepts dotted', () => {
    expect(normalizeConfig({}).chart.humidityLineStyle).toBe('solid');
    expect(normalizeConfig({ chart_humidity_line_style: 'dotted' }).chart.humidityLineStyle).toBe(
      'dotted'
    );
    // Unknown values fall back instead of breaking the chart.
    for (const value of ['dashed', 'dots', 42, null, {}]) {
      expect(
        normalizeConfig({ chart_humidity_line_style: value }).chart.humidityLineStyle
      ).toBe('solid');
    }
  });

  it('keeps both chart gradients on by default and switches them separately', () => {
    const defaults = normalizeConfig({});
    expect(defaults.chart.showTemperatureGradient).toBe(true);
    expect(defaults.chart.showHumidityGradient).toBe(true);

    const off = normalizeConfig({
      chart_temperature_gradient: false,
      chart_humidity_gradient: false,
    });
    expect(off.chart.showTemperatureGradient).toBe(false);
    expect(off.chart.showHumidityGradient).toBe(false);

    const mixed = normalizeConfig({ chart_humidity_gradient: false });
    expect(mixed.chart.showTemperatureGradient).toBe(true);
    expect(mixed.chart.showHumidityGradient).toBe(false);

    // `false` must survive, junk must not.
    expect(normalizeConfig({ chart_temperature_gradient: 'nein' }).chart.showTemperatureGradient).toBe(
      true
    );
    expect(normalizeConfig({ chart_humidity_gradient: 0 }).chart.showHumidityGradient).toBe(true);
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

  it('keeps the deprecated comfort colour as an accent alias', () => {
    // Dashboards from before 2.0.0 must not suddenly change colour.
    expect(normalizeConfig({ temperature_comfort_color: '#123456' }).accentColor).toBe('#123456');
    expect(
      normalizeConfig({ temperature_comfort_color: '#123456', accent_color: '#abcdef' }).accentColor
    ).toBe('#abcdef');
  });

  it('falls back to the accent colour for malformed values', () => {
    expect(normalizeConfig({ accent_color: '' }).accentColor).toBe('#4FD1A5');
    expect(normalizeConfig({ accent_color: 'x'.repeat(200) }).accentColor).toBe('#4FD1A5');
  });

  it('parses comma separated open states and lowercases them', () => {
    const config = normalizeConfig({ window_entity: 'binary_sensor.w', window_open_states: 'ON, tilted' });
    expect(config.window.openStates).toEqual(['on', 'tilted']);
  });

  it('defaults to light smoothing and accepts every level', () => {
    expect(normalizeConfig({}).chart.smoothing).toBe('light');
    for (const level of ['none', 'light', 'medium', 'strong'] as const) {
      expect(normalizeConfig({ chart_smoothing: level }).chart.smoothing).toBe(level);
    }
    // Unknown values fall back to the default instead of reaching the chart.
    for (const value of ['off', 'hart', 3, null, {}, true]) {
      expect(normalizeConfig({ chart_smoothing: value }).chart.smoothing).toBe('light');
    }
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

describe('reading typography', () => {
  it('uses a 42 px hero and a 20 px secondary value by default', () => {
    const config = normalizeConfig({});
    expect(config.typography.temperature.fontSize).toBe(42);
    expect(config.typography.humidity.fontSize).toBe(20);
    // Half the hero – the humidity may not compete with the temperature.
    expect(config.typography.humidity.fontSize * 2).toBeLessThanOrEqual(
      config.typography.temperature.fontSize
    );
    expect(DEFAULT_READING_FONT_SIZE.humidity * 2).toBeLessThanOrEqual(
      DEFAULT_READING_FONT_SIZE.temperature
    );
  });

  it('keeps both sizes independently adjustable', () => {
    const config = normalizeConfig({ temperature_font_size: 56, humidity_font_size: 24 });
    expect(config.typography.temperature.fontSize).toBe(56);
    expect(config.typography.humidity.fontSize).toBe(24);
    expect(READING_FONT_SIZE_RANGE).toEqual({ min: 14, max: 96 });
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
