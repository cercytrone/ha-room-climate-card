import { DEFAULT_CLOSED_STATES, type ResolvedConfig } from '../config';
import type { Translator } from '../localize';
import type { HassEntity, HomeAssistant } from '../types';
import { parseNumericState, temperatureUnit } from '../utils/format';

export type ReadingStatus = 'ok' | 'unavailable' | 'missing' | 'invalid';

export interface SensorReading {
  entity?: HassEntity;
  value: number | null;
  status: ReadingStatus;
  unit: string;
}

function isUnavailableState(state: string): boolean {
  return state === 'unavailable' || state === 'unknown';
}

export function readSensor(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
  kind: 'temperature' | 'humidity'
): SensorReading {
  const unitFallback = kind === 'humidity' ? '%' : '°C';
  if (!entityId) return { value: null, status: 'missing', unit: unitFallback };
  const entity = hass?.states[entityId];
  if (!entity) return { value: null, status: 'missing', unit: unitFallback };
  const unit = entity.attributes?.unit_of_measurement ?? unitFallback;
  if (isUnavailableState(entity.state)) {
    return { entity, value: null, status: 'unavailable', unit };
  }
  const value = parseNumericState(entity.state);
  if (value === null) {
    return { entity, value: null, status: 'invalid', unit };
  }
  return { entity, value, status: 'ok', unit };
}

export type WindowStatus = 'open' | 'closed' | 'unknown' | 'unavailable' | 'missing';

export interface WindowReading {
  status: WindowStatus;
  entity?: HassEntity;
  rawState?: string;
}

export function readWindow(hass: HomeAssistant | undefined, config: ResolvedConfig): WindowReading {
  const entityId = config.window.entity;
  if (!entityId) return { status: 'missing' };
  const entity = hass?.states[entityId];
  if (!entity) return { status: 'missing' };
  const rawState = entity.state;
  if (isUnavailableState(rawState)) return { status: 'unavailable', entity, rawState };
  const normalized = rawState.trim().toLowerCase();
  if (config.window.openStates.includes(normalized)) return { status: 'open', entity, rawState };
  if (DEFAULT_CLOSED_STATES.includes(normalized)) return { status: 'closed', entity, rawState };
  return { status: 'unknown', entity, rawState };
}

export type MotionStatus = 'active' | 'idle' | 'unknown' | 'unavailable' | 'missing';

export interface MotionReading {
  status: MotionStatus;
  entity?: HassEntity;
  rawState?: string;
  /** Time of the last state transition, used for the "quiet since" hint. */
  sinceMs?: number;
}

const MOTION_ACTIVE_STATES = ['on', 'detected', 'motion', 'occupied', 'active'];

export function readMotion(hass: HomeAssistant | undefined, config: ResolvedConfig): MotionReading {
  const entityId = config.motion.entity;
  if (!entityId) return { status: 'missing' };
  const entity = hass?.states[entityId];
  if (!entity) return { status: 'missing' };
  const rawState = entity.state;
  const sinceMs = Date.parse(entity.last_changed ?? entity.last_updated ?? '');
  if (isUnavailableState(rawState)) return { status: 'unavailable', entity, rawState };
  const normalized = rawState.trim().toLowerCase();
  if (MOTION_ACTIVE_STATES.includes(normalized)) {
    return { status: 'active', entity, rawState };
  }
  const reading: MotionReading = { status: 'idle', entity, rawState };
  if (Number.isFinite(sinceMs)) reading.sinceMs = sinceMs;
  return reading;
}

export type HeatingStatus = 'heating' | 'idle' | 'off' | 'action' | 'unknown' | 'unavailable' | 'missing';

export interface ThermostatReading {
  status: HeatingStatus;
  /** Raw `hvac_action`, if the integration provides one. */
  action?: string;
  label: string;
  colorKey: 'heating' | 'idle' | 'off' | 'unknown';
  setpoint: number | null;
  unit: string;
  mode?: string;
  modeLabel?: string;
  entity?: HassEntity;
}

const KNOWN_ACTIONS = ['heating', 'idle', 'off', 'cooling', 'fan', 'drying', 'preheating', 'defrosting'];

export function readThermostat(
  hass: HomeAssistant | undefined,
  config: ResolvedConfig,
  t: Translator
): ThermostatReading {
  const entityId = config.thermostat.entity;
  // The entity's own unit wins over the unit system: an integration may report
  // its target temperature in a different scale than the system default.
  const systemUnit = temperatureUnit(
    hass?.config?.unit_system?.temperature === 'us_customary' ? '°F' : undefined
  );
  const entityUnit = hass?.states[entityId ?? '']?.attributes?.unit_of_measurement;
  const unit = temperatureUnit(typeof entityUnit === 'string' ? entityUnit : systemUnit);
  if (!entityId) {
    return { status: 'missing', label: t.t('unavailable'), colorKey: 'unknown', setpoint: null, unit };
  }
  const entity = hass?.states[entityId];
  if (!entity) {
    return { status: 'missing', label: t.t('unavailable'), colorKey: 'unknown', setpoint: null, unit };
  }

  const rawMode = entity.state?.toLowerCase();
  const actionRaw = entity.attributes?.hvac_action;
  const action = typeof actionRaw === 'string' ? actionRaw.toLowerCase() : undefined;
  const setpointRaw = entity.attributes?.temperature;
  const setpoint =
    typeof setpointRaw === 'number'
      ? setpointRaw
      : typeof setpointRaw === 'string'
        ? parseNumericState(setpointRaw)
        : null;

  const base = {
    entity,
    action,
    setpoint,
    unit,
    mode: rawMode,
    modeLabel: rawMode ? t.mode(rawMode) : undefined,
  };

  if (isUnavailableState(entity.state ?? '')) {
    return { ...base, status: 'unavailable', label: t.t('unavailable'), colorKey: 'unknown' };
  }
  if (rawMode === 'off') {
    return { ...base, status: 'off', label: t.t('off'), colorKey: 'off' };
  }
  if (action === 'heating') {
    return { ...base, status: 'heating', label: t.t('heating'), colorKey: 'heating' };
  }
  if (action === 'idle') {
    return { ...base, status: 'idle', label: t.t('idle'), colorKey: 'idle' };
  }
  if (action === 'off') {
    return { ...base, status: 'off', label: t.t('off'), colorKey: 'off' };
  }
  if (action && !KNOWN_ACTIONS.includes(action)) {
    return { ...base, status: 'action', label: t.action(action), colorKey: 'idle' };
  }
  if (action) {
    // cooling / fan / drying / preheating / defrosting
    return { ...base, status: 'action', label: t.action(action), colorKey: 'idle' };
  }
  // No hvac_action: never invent "heating".
  return { ...base, status: 'unknown', label: t.t('statusUnknown'), colorKey: 'unknown' };
}

/**
 * Colour of the HVAC glyph. Red is reserved for a running heating demand: every
 * other state (idle, cooling, fan, unknown, unavailable) stays in the calm part
 * of the palette. The flame never becomes the loud element of the row.
 */
export function thermostatStatusColor(
  reading: ThermostatReading,
  config: ResolvedConfig
): string {
  switch (reading.colorKey) {
    case 'heating':
      return config.thermostat.heatingColor;
    case 'idle':
      return config.thermostat.idleColor;
    case 'off':
      return config.thermostat.offColor;
    default:
      // Unknown / unavailable: same muted tone as the „Soll“ wording.
      return 'var(--rcc-muted)';
  }
}

export function sensorStatusLabel(reading: SensorReading, t: Translator): string {
  switch (reading.status) {
    case 'unavailable':
      return t.t('unavailable');
    case 'missing':
      return t.t('unavailable');
    case 'invalid':
      return t.t('unknown');
    default:
      return '';
  }
}
