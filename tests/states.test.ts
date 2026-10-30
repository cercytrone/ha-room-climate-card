import { describe, expect, it } from 'vitest';
import { normalizeConfig } from '../src/config';
import {
  readMotion,
  readSensor,
  readThermostat,
  readWindow,
  thermostatStatusColor,
} from '../src/data/states';
import { createTranslator } from '../src/localize';
import { createHass, entity } from './helpers';

const de = createTranslator('de');

describe('readSensor', () => {
  it('reads numeric values and units', () => {
    const hass = createHass({
      states: [
        entity('sensor.temp', { state: '21.8', attributes: { unit_of_measurement: '°C' } }),
      ],
    });
    const reading = readSensor(hass, 'sensor.temp', 'temperature');
    expect(reading.value).toBe(21.8);
    expect(reading.status).toBe('ok');
    expect(reading.unit).toBe('°C');
  });

  it('handles german decimal commas', () => {
    const hass = createHass({ states: [entity('sensor.temp', { state: '21,8' })] });
    expect(readSensor(hass, 'sensor.temp', 'temperature').value).toBe(21.8);
  });

  it('reports unavailable, missing and invalid entities', () => {
    const hass = createHass({
      states: [
        entity('sensor.offline', { state: 'unavailable' }),
        entity('sensor.unknown', { state: 'unknown' }),
        entity('sensor.text', { state: 'warm' }),
      ],
    });
    expect(readSensor(hass, 'sensor.offline', 'temperature').status).toBe('unavailable');
    expect(readSensor(hass, 'sensor.unknown', 'humidity').status).toBe('unavailable');
    expect(readSensor(hass, 'sensor.text', 'temperature').status).toBe('invalid');
    expect(readSensor(hass, 'sensor.does_not_exist', 'temperature').status).toBe('missing');
    expect(readSensor(hass, undefined, 'temperature').status).toBe('missing');
    expect(readSensor(undefined, 'sensor.temp', 'temperature').status).toBe('missing');
  });

  it('falls back to a sensible unit', () => {
    const hass = createHass({ states: [entity('sensor.temp', { state: '21' })] });
    expect(readSensor(hass, 'sensor.temp', 'temperature').unit).toBe('°C');
    expect(readSensor(hass, 'sensor.temp', 'humidity').unit).toBe('%');
  });
});

describe('readWindow', () => {
  const config = normalizeConfig({ window_entity: 'binary_sensor.window' });

  it.each([
    ['on', 'open'],
    ['open', 'open'],
    ['tilted', 'open'],
    ['off', 'closed'],
    ['closed', 'closed'],
    ['unavailable', 'unavailable'],
    ['unknown', 'unavailable'],
    ['something_else', 'unknown'],
  ])('maps state %s to %s', (state, expected) => {
    const hass = createHass({ states: [entity('binary_sensor.window', { state })] });
    expect(readWindow(hass, config).status).toBe(expected);
  });

  it('respects custom open states', () => {
    const custom = normalizeConfig({
      window_entity: 'sensor.window',
      window_open_states: ['gekippt'],
    });
    const hass = createHass({ states: [entity('sensor.window', { state: 'gekippt' })] });
    expect(readWindow(hass, custom).status).toBe('open');
    const other = createHass({ states: [entity('sensor.window', { state: 'on' })] });
    expect(readWindow(other, custom).status).toBe('unknown');
  });

  it('reports missing entities', () => {
    expect(readWindow(createHass(), config).status).toBe('missing');
  });
});

describe('readMotion', () => {
  const config = normalizeConfig({ motion_entity: 'binary_sensor.motion' });

  it('detects active motion and exposes the last change timestamp', () => {
    const lastChanged = new Date(Date.now() - 12 * 60 * 1000).toISOString();
    const hass = createHass({
      states: [entity('binary_sensor.motion', { state: 'on', lastChanged })],
    });
    const reading = readMotion(hass, config);
    expect(reading.status).toBe('active');
  });

  it('reports idle with the time the motion stopped', () => {
    const lastChanged = new Date(Date.now() - 12 * 60 * 1000).toISOString();
    const hass = createHass({
      states: [entity('binary_sensor.motion', { state: 'off', lastChanged })],
    });
    const reading = readMotion(hass, config);
    expect(reading.status).toBe('idle');
    expect(reading.sinceMs).toBe(Date.parse(lastChanged));
  });

  it('handles unavailable and missing sensors', () => {
    const hass = createHass({ states: [entity('binary_sensor.motion', { state: 'unavailable' })] });
    expect(readMotion(hass, config).status).toBe('unavailable');
    expect(readMotion(createHass(), config).status).toBe('missing');
  });
});

describe('readThermostat', () => {
  const base = { climate_entity: 'climate.living' };

  function reading(state: string, attributes: Record<string, unknown> = {}) {
    const config = normalizeConfig(base);
    const hass = createHass({
      states: [entity('climate.living', { state, attributes })],
    });
    return readThermostat(hass, config, de);
  }

  it('reports heating only when hvac_action says heating', () => {
    const result = reading('heat', { hvac_action: 'heating', temperature: 22 });
    expect(result.status).toBe('heating');
    expect(result.label).toBe('Heizt');
    expect(result.setpoint).toBe(22);
    expect(result.colorKey).toBe('heating');
  });

  it('reports idle when hvac_action says idle', () => {
    const result = reading('heat', { hvac_action: 'idle', temperature: 21.5 });
    expect(result.status).toBe('idle');
    // Idle reads as "ready" – not as "off" and not as "heating".
    expect(result.label).toBe('Bereit');
    expect(result.colorKey).toBe('idle');
  });

  it('reports off when the hvac mode is off', () => {
    const result = reading('off', { temperature: 18 });
    expect(result.status).toBe('off');
    expect(result.label).toBe('Aus');
  });

  it('does not invent heating when hvac_action is missing', () => {
    const result = reading('heat', { temperature: 21 });
    expect(result.status).toBe('unknown');
    expect(result.label).toBe('Status unbekannt');
    expect(result.colorKey).toBe('unknown');
  });

  it('maps other actions to a neutral label', () => {
    expect(reading('cool', { hvac_action: 'cooling' }).label).toBe('Kühlt');
    expect(reading('dry', { hvac_action: 'drying' }).label).toBe('Trocknet');
    expect(reading('fan_only', { hvac_action: 'fan' }).status).toBe('action');
  });

  it('handles unavailable entities', () => {
    const result = reading('unavailable');
    expect(result.status).toBe('unavailable');
    expect(result.label).toBe('Nicht verfügbar');
    expect(result.setpoint).toBeNull();
  });

  it('handles a missing entity', () => {
    const config = normalizeConfig(base);
    const result = readThermostat(createHass(), config, de);
    expect(result.status).toBe('missing');
  });

  it('uses the configured colours for each status', () => {
    const config = normalizeConfig({
      ...base,
      heating_color: '#ff0000',
      heating_idle_color: '#00ff00',
      heating_off_color: '#0000ff',
    });
    const heating = reading('heat', { hvac_action: 'heating' });
    const idle = reading('heat', { hvac_action: 'idle' });
    const off = reading('off');
    expect(thermostatStatusColor(heating, config)).toBe('#ff0000');
    expect(thermostatStatusColor(idle, config)).toBe('#00ff00');
    expect(thermostatStatusColor(off, config)).toBe('#0000ff');
  });

  it('translates labels into english', () => {
    const en = createTranslator('en');
    const config = normalizeConfig(base);
    const hass = createHass({
      states: [entity('climate.living', { state: 'heat', attributes: { hvac_action: 'heating' } })],
    });
    expect(readThermostat(hass, config, en).label).toBe('Heating');
  });
});
