/** DEMO ONLY: configuration scenarios rendered by the dev playground and tests. */
import type { RoomClimateCardConfig } from '../src/config';

export interface DemoScenario {
  title: string;
  config: RoomClimateCardConfig;
}

export const demoScenarios: DemoScenario[] = [
  {
    title: 'Wohnzimmer · Heizt, Bewegung, Fenster zu',
    config: {
      type: 'custom:room-climate-card',
      name: 'Wohnzimmer',
      icon: 'mdi:sofa',
      temperature_entity: 'sensor.demo_living_temperature',
      humidity_entity: 'sensor.demo_living_humidity',
      window_entity: 'binary_sensor.demo_living_window',
      motion_entity: 'binary_sensor.demo_living_motion',
      climate_entity: 'climate.demo_living_thermostat',
      chart_show_legend: true,
      chart_show_points: true,
    },
  },
  {
    title: 'Küche · Fenster offen, Ruhe seit 12 Min.',
    config: {
      type: 'custom:room-climate-card',
      name: 'Küche',
      icon: 'mdi:stove',
      temperature_entity: 'sensor.demo_kitchen_temperature',
      humidity_entity: 'sensor.demo_kitchen_humidity',
      window_entity: 'binary_sensor.demo_kitchen_window',
      motion_entity: 'binary_sensor.demo_kitchen_motion',
      climate_entity: 'climate.demo_kitchen_thermostat',
      show_hvac_mode: true,
    },
  },
  {
    title: 'Bad · Ruht + lange konstante Phase (keine HA-Samples)',
    config: {
      type: 'custom:room-climate-card',
      name: 'Bad (1. OG)',
      icon: 'mdi:shower',
      temperature_entity: 'sensor.demo_bath_temperature',
      humidity_entity: 'sensor.demo_bath_humidity',
      window_entity: 'binary_sensor.demo_wc_window',
      climate_entity: 'climate.demo_bath_thermostat',
      chart_hours: 6,
    },
  },
  {
    title: 'Gäste-WC · nur Luftfeuchte, gekipptes Fenster',
    config: {
      type: 'custom:room-climate-card',
      name: 'Gäste-WC',
      icon: 'mdi:toilet',
      humidity_entity: 'sensor.demo_wc_humidity',
      window_entity: 'binary_sensor.demo_wc_window',
      motion_entity: 'binary_sensor.demo_living_motion',
      chart_height: 70,
    },
  },
  {
    title: 'Büro · Thermostat ohne hvac_action (Status unbekannt)',
    config: {
      type: 'custom:room-climate-card',
      name: 'Arbeitszimmer im Dachgeschoss',
      icon: 'mdi:desk',
      temperature_entity: 'sensor.demo_kitchen_temperature',
      climate_entity: 'climate.demo_office_thermostat',
      theme: 'dark',
      chart_curve: 'linear',
    },
  },
  {
    title: 'Flur · Sensor nicht verfügbar',
    config: {
      type: 'custom:room-climate-card',
      name: 'Flur',
      temperature_entity: 'sensor.demo_offline_temperature',
      humidity_entity: 'sensor.demo_missing_humidity',
      height: 'auto',
    },
  },
];
