import { HISTORY_CACHE_TTL_MS } from '../const';
import type { ChartSample } from '../chart/geometry';
import type { HomeAssistant } from '../types';
import { parseNumericState } from '../utils/format';

export type HistoryMap = Record<string, ChartSample[]>;

interface CacheEntry {
  fetchedAt: number;
  data: HistoryMap;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function sampleTime(item: unknown): number | undefined {
  if (!isRecord(item)) return undefined;
  const lastUpdated = item.lu;
  if (typeof lastUpdated === 'number' && Number.isFinite(lastUpdated)) {
    return lastUpdated > 1e12 ? lastUpdated : lastUpdated * 1000;
  }
  for (const key of ['last_changed', 'last_updated', 'lc']) {
    const raw = item[key];
    if (typeof raw === 'number' && Number.isFinite(raw)) {
      return raw > 1e12 ? raw : raw * 1000;
    }
    if (typeof raw === 'string') {
      const parsed = Date.parse(raw);
      if (Number.isFinite(parsed)) return parsed;
    }
  }
  return undefined;
}

function sampleState(item: unknown): string | undefined {
  if (!isRecord(item)) return undefined;
  if (typeof item.s === 'string') return item.s;
  if (typeof item.state === 'string') return item.state;
  if (typeof item.state === 'number') return String(item.state);
  return undefined;
}

/** Normalises one history response bucket into sorted, de-duplicated samples. */
export function normalizeSamples(items: unknown): ChartSample[] {
  if (!Array.isArray(items)) return [];
  const samples: ChartSample[] = [];
  for (const item of items) {
    const t = sampleTime(item);
    if (t === undefined || !Number.isFinite(t)) continue;
    const state = sampleState(item);
    const value = parseNumericState(state);
    samples.push({ t, v: value });
  }
  if (!samples.length) return [];
  samples.sort((a, b) => a.t - b.t);
  const deduped: ChartSample[] = [];
  for (const sample of samples) {
    const previous = deduped[deduped.length - 1];
    if (previous && previous.t === sample.t) {
      deduped[deduped.length - 1] = sample;
    } else {
      deduped.push(sample);
    }
  }
  return deduped;
}

/**
 * Accepts both response shapes:
 *  - WebSocket `history/history_during_period`: `{ entity_id: [samples] }`
 *  - REST `api/history/period/...`: `[[{ entity_id, ... }, ...], ...]`
 */
export function parseHistoryResponse(response: unknown, entityIds: string[]): HistoryMap {
  const result: HistoryMap = {};
  for (const entityId of entityIds) result[entityId] = [];

  if (Array.isArray(response)) {
    for (const bucket of response) {
      if (!Array.isArray(bucket) || !bucket.length) continue;
      const first = bucket[0];
      const entityId = isRecord(first) && typeof first.entity_id === 'string' ? first.entity_id : undefined;
      if (!entityId || !(entityId in result)) continue;
      const samples = normalizeSamples(bucket);
      result[entityId] = mergeSamples(result[entityId], samples);
    }
    return result;
  }

  if (isRecord(response)) {
    for (const entityId of entityIds) {
      const bucket = response[entityId];
      if (bucket === undefined) continue;
      // Some servers answer with { data: [...] } wrappers.
      const list = Array.isArray(bucket)
        ? bucket
        : isRecord(bucket) && Array.isArray(bucket.data)
          ? bucket.data
          : bucket;
      result[entityId] = normalizeSamples(list);
    }
  }
  return result;
}

function mergeSamples(a: ChartSample[], b: ChartSample[]): ChartSample[] {
  if (!a.length) return b;
  if (!b.length) return a;
  const merged = [...a, ...b].sort((x, y) => x.t - y.t);
  const deduped: ChartSample[] = [];
  for (const sample of merged) {
    const previous = deduped[deduped.length - 1];
    if (previous && previous.t === sample.t) {
      deduped[deduped.length - 1] = sample;
    } else {
      deduped.push(sample);
    }
  }
  return deduped;
}

export interface FetchOptions {
  start: number;
  end: number;
}

/**
 * Fetches real history for the given entities.
 * Primary path is the documented WebSocket command used by the HA frontend
 * (`history/history_during_period`), with the authenticated REST endpoint as a
 * fallback for older frontends.
 */
export async function fetchHistory(
  hass: HomeAssistant,
  entityIds: string[],
  options: FetchOptions
): Promise<HistoryMap> {
  if (!entityIds.length) return {};
  const startIso = new Date(options.start).toISOString();
  const endIso = new Date(options.end).toISOString();

  const connection = hass.connection;
  if (connection && typeof connection.sendMessagePromise === 'function') {
    try {
      const response = await connection.sendMessagePromise({
        type: 'history/history_during_period',
        start_time: startIso,
        end_time: endIso,
        entity_ids: entityIds,
        minimal_response: true,
        no_attributes: true,
        significant_changes_only: false,
        include_start_time_state: true,
      });
      const parsed = parseHistoryResponse(response, entityIds);
      if (Object.values(parsed).some((samples) => samples.length > 0)) return parsed;
      // An empty websocket answer is valid; do not hammer the REST API.
      return parsed;
    } catch (error) {
      // Fall through to REST (older HA versions, permission quirks, ...).
      if (!hass.callApi) throw error;
    }
  }

  if (typeof hass.callApi !== 'function') return {};
  const path =
    `history/period/${encodeURIComponent(startIso)}` +
    `?filter_entity_id=${entityIds.map((id) => encodeURIComponent(id)).join(',')}` +
    `&end_time=${encodeURIComponent(endIso)}` +
    `&minimal_response&no_attributes`;
  const response = await hass.callApi('GET', path);
  return parseHistoryResponse(response, entityIds);
}

export function historyCacheKey(entityIds: string[], hours: number): string {
  return `${[...entityIds].sort().join('|')}@${hours}`;
}

/**
 * Small in-memory cache. History is only requested again when the cached entry
 * is older than two minutes, which keeps re-renders (resize, theme change,
 * config edit) free of network traffic.
 */
export class HistoryRepository {
  private cache = new Map<string, CacheEntry>();
  private inflight = new Map<string, Promise<HistoryMap>>();

  async load(
    hass: HomeAssistant,
    entityIds: string[],
    hours: number,
    now = Date.now()
  ): Promise<HistoryMap> {
    const key = historyCacheKey(entityIds, hours);
    const cached = this.cache.get(key);
    if (cached && now - cached.fetchedAt < HISTORY_CACHE_TTL_MS) {
      return cached.data;
    }
    const pending = this.inflight.get(key);
    if (pending) return pending;

    const promise = fetchHistory(hass, entityIds, {
      start: now - hours * 60 * 60 * 1000,
      end: now,
    })
      .then((data) => {
        this.cache.set(key, { fetchedAt: Date.now(), data });
        if (this.cache.size > 24) {
          const oldest = this.cache.keys().next();
          if (!oldest.done) this.cache.delete(oldest.value);
        }
        return data;
      })
      .finally(() => {
        this.inflight.delete(key);
      });

    this.inflight.set(key, promise);
    return promise;
  }

  clear(): void {
    this.cache.clear();
    this.inflight.clear();
  }
}
