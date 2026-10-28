export const CARD_TAG = 'room-climate-card';
export const EDITOR_TAG = 'room-climate-card-editor';

export const CARD_NAME = 'Room Climate Card';
export const CARD_DESCRIPTION =
  'Raumklima auf einen Blick: Temperatur, Luftfeuchte, Fenster, Bewegung, Thermostat und echter Verlauf.';

declare const __CARD_VERSION__: string | undefined;

export const CARD_VERSION: string =
  typeof __CARD_VERSION__ !== 'undefined' && __CARD_VERSION__ ? __CARD_VERSION__ : 'dev';

/** Re-fetch history every 5 minutes while the card is visible. */
export const HISTORY_REFRESH_MS = 5 * 60 * 1000;
/** Serve cached history for up to 2 minutes to avoid redundant requests. */
export const HISTORY_CACHE_TTL_MS = 2 * 60 * 1000;
/** Upper bound of samples handed to the chart renderer. */
export const MAX_CHART_POINTS = 1200;
/** Tick for "quiet since x" labels. */
export const TICK_MS = 30 * 1000;

export const CHART_HOUR_OPTIONS = [3, 6, 12, 24] as const;
