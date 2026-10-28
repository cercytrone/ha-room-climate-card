/**
 * DEMO ONLY.
 *
 * This module fabricates a Home Assistant object and synthetic history data so
 * the card can be developed and reviewed without a running instance.
 * It is never shipped inside `dist/` and never touches real entities.
 */
import type { HassEntity, HomeAssistant } from '../src/types';

interface EntitySpec {
  entity_id: string;
  state: string;
  name: string;
  unit?: string;
  deviceClass?: string;
  extra?: Record<string, unknown>;
  base?: number;
  amplitude?: number;
  periodHours?: number;
  gapFrom?: number;
  gapTo?: number;
}

const SPECS: EntitySpec[] = [
  {
    entity_id: 'sensor.demo_living_temperature',
    state: '21.8',
    name: 'Wohnzimmer Temperatur',
    unit: '°C',
    deviceClass: 'temperature',
    base: 21.7,
    amplitude: 0.9,
    periodHours: 5,
  },
  {
    entity_id: 'sensor.demo_living_humidity',
    state: '50.4',
    name: 'Wohnzimmer Luftfeuchte',
    unit: '%',
    deviceClass: 'humidity',
    base: 50,
    amplitude: 6,
    periodHours: 7,
  },
  {
    entity_id: 'sensor.demo_kitchen_temperature',
    state: '22.3',
    name: 'Küche Temperatur',
    unit: '°C',
    deviceClass: 'temperature',
    base: 22.4,
    amplitude: 0.6,
    periodHours: 4,
  },
  {
    entity_id: 'sensor.demo_kitchen_humidity',
    state: '64.1',
    name: 'Küche Luftfeuchte',
    unit: '%',
    deviceClass: 'humidity',
    base: 64,
    amplitude: 4,
    periodHours: 6,
  },
  {
    entity_id: 'sensor.demo_bath_temperature',
    state: '23.4',
    name: 'Bad Temperatur',
    unit: '°C',
    deviceClass: 'temperature',
    base: 23.2,
    amplitude: 0.5,
    periodHours: 3.5,
  },
  {
    entity_id: 'sensor.demo_bath_humidity',
    state: '70.2',
    name: 'Bad Luftfeuchte',
    unit: '%',
    deviceClass: 'humidity',
    base: 68,
    amplitude: 9,
    periodHours: 2.5,
    gapFrom: 2.2,
    gapTo: 1.4,
  },
  {
    entity_id: 'sensor.demo_wc_humidity',
    state: '38.5',
    name: 'Gäste-WC Luftfeuchte',
    unit: '%',
    deviceClass: 'humidity',
    base: 39,
    amplitude: 5,
    periodHours: 8,
  },
  {
    entity_id: 'sensor.demo_offline_temperature',
    state: 'unavailable',
    name: 'Flur Temperatur',
    unit: '°C',
    deviceClass: 'temperature',
  },
  {
    entity_id: 'binary_sensor.demo_living_window',
    state: 'off',
    name: 'Wohnzimmer Fenster',
    deviceClass: 'window',
  },
  {
    entity_id: 'binary_sensor.demo_kitchen_window',
    state: 'on',
    name: 'Küche Fenster',
    deviceClass: 'window',
  },
  {
    entity_id: 'binary_sensor.demo_wc_window',
    state: 'tilted',
    name: 'Gäste-WC Fenster',
    deviceClass: 'window',
  },
  {
    entity_id: 'binary_sensor.demo_living_motion',
    state: 'on',
    name: 'Wohnzimmer Bewegung',
    deviceClass: 'motion',
  },
  {
    entity_id: 'binary_sensor.demo_kitchen_motion',
    state: 'off',
    name: 'Küche Bewegung',
    deviceClass: 'motion',
    extra: { last_changed_minutes: 12 },
  },
  {
    entity_id: 'climate.demo_living_thermostat',
    state: 'heat',
    name: 'Wohnzimmer Thermostat',
    extra: { temperature: 22, current_temperature: 21.8, hvac_action: 'heating', hvac_modes: ['off', 'heat'] },
  },
  {
    entity_id: 'climate.demo_kitchen_thermostat',
    state: 'heat',
    name: 'Küche Thermostat',
    extra: { temperature: 21.5, current_temperature: 22.3, hvac_action: 'idle', hvac_modes: ['off', 'heat'] },
  },
  {
    entity_id: 'climate.demo_bath_thermostat',
    state: 'off',
    name: 'Bad Thermostat',
    extra: { temperature: 21, hvac_action: 'off', hvac_modes: ['off', 'heat'] },
  },
  {
    entity_id: 'climate.demo_office_thermostat',
    state: 'heat',
    name: 'Büro Thermostat (ohne hvac_action)',
    extra: { temperature: 20.5, hvac_modes: ['off', 'heat'] },
  },
];

function buildStates(): Record<string, HassEntity> {
  const now = Date.now();
  const states: Record<string, HassEntity> = {};
  for (const spec of SPECS) {
    const minutesAgo = Number(spec.extra?.last_changed_minutes ?? 0);
    const timestamp = new Date(now - minutesAgo * 60 * 1000).toISOString();
    const attributes: Record<string, unknown> = {
      friendly_name: spec.name,
      ...(spec.unit ? { unit_of_measurement: spec.unit } : {}),
      ...(spec.deviceClass ? { device_class: spec.deviceClass } : {}),
      ...spec.extra,
    };
    delete (attributes as Record<string, unknown>).last_changed_minutes;
    states[spec.entity_id] = {
      entity_id: spec.entity_id,
      state: spec.state,
      attributes,
      last_changed: timestamp,
      last_updated: timestamp,
    };
  }
  return states;
}

/** Deterministic pseudo noise in [-1, 1]. */
function noise(seed: number, index: number): number {
  const value = Math.sin(seed * 12.9898 + index * 78.233) * 43758.5453;
  return (value - Math.floor(value)) * 2 - 1;
}

function demoHistory(spec: EntitySpec, start: number, end: number): Array<{ s: string; lu: number }> {
  if (!spec.base || !spec.periodHours) return [];
  const stepMs = 5 * 60 * 1000;
  const samples: Array<{ s: string; lu: number }> = [];
  const seed = spec.entity_id.length;
  let index = 0;
  for (let time = start; time <= end; time += stepMs) {
    const hours = (time - start) / 3600000;
    const value =
      spec.base +
      (spec.amplitude ?? 0) * Math.sin((hours / spec.periodHours) * Math.PI * 2) +
      noise(seed, index) * 0.08;
    index += 1;
    if (spec.gapFrom !== undefined && spec.gapTo !== undefined) {
      const hoursToEnd = (end - time) / 3600000;
      if (hoursToEnd < spec.gapFrom && hoursToEnd > spec.gapTo) continue;
    }
    samples.push({ s: value.toFixed(2), lu: Math.floor(time / 1000) });
  }
  return samples;
}

export function createMockHass(): HomeAssistant {
  const states = buildStates();
  const specs = new Map(SPECS.map((spec) => [spec.entity_id, spec]));

  return {
    states,
    connected: true,
    locale: { language: 'de', number_format: 'language', time_format: '24' },
    config: { unit_system: { temperature: '°C' }, time_zone: 'Europe/Berlin', version: 'demo' },
    themes: { darkMode: document.documentElement.dataset.theme === 'dark' },
    callService: async () => undefined,
    callApi: async () => {
      throw new Error('Demo: REST API ist nicht verfügbar');
    },
    connection: {
      connected: true,
      sendMessagePromise: async (message: Record<string, unknown>) => {
        if (message.type !== 'history/history_during_period') {
          throw new Error(`Demo: unbekannter Befehl ${String(message.type)}`);
        }
        const start = Date.parse(String(message.start_time));
        const end = Date.parse(String(message.end_time));
        const entityIds = (message.entity_ids as string[]) ?? [];
        const response: Record<string, Array<{ s: string; lu: number }>> = {};
        for (const entityId of entityIds) {
          const spec = specs.get(entityId);
          response[entityId] = spec ? demoHistory(spec, start, end) : [];
        }
        // Simulate network latency so loading states are visible.
        await new Promise((resolve) => setTimeout(resolve, 220));
        return response;
      },
    },
  };
}
