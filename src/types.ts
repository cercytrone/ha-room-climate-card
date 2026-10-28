/**
 * Minimal subset of the Home Assistant frontend objects used by this card.
 * Deliberately kept structural so the card works with every current HA release
 * without depending on `custom-card-helpers`.
 */

export interface HassEntityAttributes {
  friendly_name?: string;
  unit_of_measurement?: string;
  device_class?: string;
  state_class?: string;
  hvac_action?: string;
  hvac_modes?: string[];
  current_temperature?: number;
  target_temp_step?: number;
  icon?: string;
  [key: string]: unknown;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: HassEntityAttributes;
  last_changed: string;
  last_updated: string;
}

export interface HassConnection {
  connected?: boolean;
  sendMessagePromise(message: Record<string, unknown>): Promise<unknown>;
  subscribeEvents?<T = unknown>(
    callback: (event: T) => void,
    eventType?: string
  ): Promise<() => Promise<void>>;
}

export interface HassLocale {
  language: string;
  number_format?: string;
  time_format?: 'language' | 'system' | 'am_pm' | '24' | string;
  date_format?: string;
  time_zone?: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  entities?: Record<string, { entity_id?: string; area_id?: string; device_id?: string }>;
  connection?: HassConnection;
  connected?: boolean;
  locale?: HassLocale;
  language?: string;
  themes?: { darkMode?: boolean; theme?: string; default_theme?: string };
  config?: {
    unit_system?: { temperature?: string };
    time_zone?: string;
    latitude?: number;
    longitude?: number;
    version?: string;
  };
  user?: { is_admin?: boolean; name?: string };
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: Record<string, unknown>
  ): Promise<unknown>;
  callApi(method: string, path: string, parameters?: unknown): Promise<unknown>;
  formatEntityState?(stateObj: HassEntity, state?: string): string;
  localize?(key: string, ...args: unknown[]): string;
}

export interface LovelaceCardConfig {
  type: string;
  [key: string]: unknown;
}

export interface CustomCardEntry {
  type: string;
  name: string;
  description: string;
  preview?: boolean;
  documentationURL?: string;
}

declare global {
  interface Window {
    customCards?: CustomCardEntry[];
  }
}
