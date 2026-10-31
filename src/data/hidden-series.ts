import type { ChartSeriesKey } from '../chart/climate-chart';

/**
 * Series the user switched off are a preference, not a live value: without
 * persistence they would reappear after every reload of the dashboard. The
 * state is keyed by the entities of the card, so two cards for the same room
 * agree with each other (and a second card does not get its own copy).
 *
 * `localStorage` is not guaranteed to be available (private mode, embedded
 * iframes with a blocked storage origin), so every access is guarded and a
 * failure silently falls back to the session-only behaviour.
 */
const STORAGE_PREFIX = 'room-climate-card:hidden-series:';

const VALID_KEYS: ChartSeriesKey[] = ['temperature', 'humidity'];

export function hiddenSeriesStorageKey(
  temperatureEntity: string | undefined,
  humidityEntity: string | undefined
): string {
  return `${STORAGE_PREFIX}${temperatureEntity ?? ''}|${humidityEntity ?? ''}`;
}

function storage(): Storage | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    return window.localStorage;
  } catch {
    return null;
  }
}

export function loadHiddenSeries(key: string): ChartSeriesKey[] {
  const store = storage();
  if (!store) return [];
  try {
    const raw = store.getItem(key);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is ChartSeriesKey => typeof item === 'string' && VALID_KEYS.includes(item as ChartSeriesKey)
    );
  } catch {
    return [];
  }
}

export function saveHiddenSeries(key: string, value: ChartSeriesKey[]): void {
  const store = storage();
  if (!store) return;
  try {
    if (value.length === 0) store.removeItem(key);
    else store.setItem(key, JSON.stringify(VALID_KEYS.filter((item) => value.includes(item))));
  } catch {
    // Quota exceeded or storage disabled – the toggle still works for this session.
  }
}
