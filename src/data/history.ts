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

function attributeValue(item: unknown, attribute: string): number | null {
  if (!isRecord(item)) return null;
  const attributes = isRecord(item.a) ? item.a : isRecord(item.attributes) ? item.attributes : undefined;
  const raw = attributes?.[attribute];
  if (typeof raw === 'number') return Number.isFinite(raw) ? raw : null;
  if (typeof raw === 'string') return parseNumericState(raw);
  return null;
}

/**
 * Turns the states of one entity into a step series of one numeric attribute
 * (the thermostat's `temperature` = its target). A state that carries no such
 * attribute – thermostat off, unavailable – becomes `null`, i.e. a gap.
 *
 * Climate entities write a new state row whenever *any* attribute changes
 * (current temperature, valve position, …); only the rows where the value
 * itself changes are kept, so a day of a chatty thermostat stays a handful of
 * steps.
 */
export function normalizeAttributeSamples(items: unknown, attribute: string): ChartSample[] {
  if (!Array.isArray(items)) return [];
  const samples: ChartSample[] = [];
  for (const item of items) {
    const t = sampleTime(item);
    if (t === undefined || !Number.isFinite(t)) continue;
    samples.push({ t, v: attributeValue(item, attribute) });
  }
  samples.sort((a, b) => a.t - b.t);
  const steps: ChartSample[] = [];
  for (const sample of samples) {
    const previous = steps[steps.length - 1];
    if (previous && previous.t === sample.t) {
      steps[steps.length - 1] = sample;
      if (steps.length > 1 && steps[steps.length - 2].v === sample.v) steps.pop();
    } else if (!previous || previous.v !== sample.v) {
      steps.push(sample);
    }
  }
  return steps;
}

/**
 * History of one attribute of one entity. Unlike {@link fetchHistory} this has
 * to ask for the attributes and for full (non-minimal) rows: the minimal
 * response drops the attributes of every row but the first.
 */
export async function fetchAttributeHistory(
  hass: HomeAssistant,
  entityId: string,
  attribute: string,
  options: FetchOptions
): Promise<ChartSample[]> {
  const startIso = new Date(options.start).toISOString();
  const endIso = new Date(options.end).toISOString();
  const connection = hass.connection;
  if (connection && typeof connection.sendMessagePromise === 'function') {
    try {
      const response = await connection.sendMessagePromise({
        type: 'history/history_during_period',
        start_time: startIso,
        end_time: endIso,
        entity_ids: [entityId],
        minimal_response: false,
        no_attributes: false,
        significant_changes_only: false,
        include_start_time_state: true,
      });
      return normalizeAttributeSamples(attributeBucket(response, entityId), attribute);
    } catch (error) {
      if (typeof hass.callApi !== 'function') throw error;
    }
  }
  if (typeof hass.callApi !== 'function') return [];
  const path =
    `history/period/${encodeURIComponent(startIso)}` +
    `?filter_entity_id=${encodeURIComponent(entityId)}` +
    `&end_time=${encodeURIComponent(endIso)}`;
  const response = await hass.callApi('GET', path);
  return normalizeAttributeSamples(attributeBucket(response, entityId), attribute);
}

/** The rows of one entity from either response shape (see parseHistoryResponse). */
function attributeBucket(response: unknown, entityId: string): unknown[] {
  if (Array.isArray(response)) {
    for (const bucket of response) {
      if (!Array.isArray(bucket) || !bucket.length) continue;
      const first = bucket[0];
      if (isRecord(first) && first.entity_id === entityId) return bucket;
    }
    return [];
  }
  if (isRecord(response)) {
    const bucket = response[entityId];
    if (Array.isArray(bucket)) return bucket;
    if (isRecord(bucket) && Array.isArray(bucket.data)) return bucket.data;
  }
  return [];
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

export function historyCacheKey(
  entityIds: string[],
  hours: number,
  source: HistorySource = 'history'
): string {
  const key = `${[...entityIds].sort().join('|')}@${hours}`;
  return source === 'statistics' ? `${key}#stats` : key;
}

/**
 * `history` = every recorded state change; `statistics` = the recorder's
 * five-minute means. A week of a chatty sensor is tens of thousands of raw
 * states but only about 2 000 means – the long-term view loads the latter.
 */
export type HistorySource = 'history' | 'statistics';

/** From this window length on the chart reads five-minute statistics. */
export const STATISTICS_FROM_HOURS = 48;

export function historySourceFor(hours: number): HistorySource {
  return hours > STATISTICS_FROM_HOURS ? 'statistics' : 'history';
}

function statisticTime(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value > 1e12 ? value : value * 1000;
  if (typeof value === 'string') {
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

/**
 * Normalises a `recorder/statistics_during_period` answer. Each mean is placed
 * in the middle of its five-minute bucket.
 */
export function parseStatisticsResponse(response: unknown, entityIds: string[]): HistoryMap {
  const result: HistoryMap = {};
  for (const entityId of entityIds) result[entityId] = [];
  if (!isRecord(response)) return result;
  for (const entityId of entityIds) {
    const rows = response[entityId];
    if (!Array.isArray(rows)) continue;
    const samples: ChartSample[] = [];
    for (const row of rows) {
      if (!isRecord(row)) continue;
      const start = statisticTime(row.start);
      if (start === undefined) continue;
      const end = statisticTime(row.end) ?? start + 5 * 60 * 1000;
      const mean = typeof row.mean === 'number' && Number.isFinite(row.mean) ? row.mean : null;
      samples.push({ t: Math.round((start + end) / 2), v: mean });
    }
    samples.sort((a, b) => a.t - b.t);
    result[entityId] = samples;
  }
  return result;
}

/**
 * Five-minute means from the recorder's statistics. Entities without
 * statistics (no `state_class: measurement`) come back empty and are filled
 * from the regular history; a failing request falls back to it entirely.
 */
export async function fetchStatistics(
  hass: HomeAssistant,
  entityIds: string[],
  options: FetchOptions
): Promise<HistoryMap> {
  if (!entityIds.length) return {};
  const connection = hass.connection;
  if (!connection || typeof connection.sendMessagePromise !== 'function') {
    return fetchHistory(hass, entityIds, options);
  }
  let parsed: HistoryMap;
  try {
    const response = await connection.sendMessagePromise({
      type: 'recorder/statistics_during_period',
      start_time: new Date(options.start).toISOString(),
      end_time: new Date(options.end).toISOString(),
      statistic_ids: entityIds,
      period: '5minute',
      types: ['mean'],
    });
    parsed = parseStatisticsResponse(response, entityIds);
  } catch {
    return fetchHistory(hass, entityIds, options);
  }
  const missing = entityIds.filter((id) => !parsed[id]?.some((sample) => sample.v !== null));
  if (missing.length) {
    const raw = await fetchHistory(hass, missing, options);
    for (const id of missing) parsed[id] = raw[id] ?? [];
  }
  return parsed;
}

export interface LoadOptions {
  /**
   * Oldest cached answer that may still be served, in milliseconds. Defaults to
   * the cache TTL; `0` forces a new request (after a reconnect the cached curve
   * may predate the outage).
   */
  maxAgeMs?: number;
  /** Raw history (default) or five-minute statistics for long windows. */
  source?: HistorySource;
}

/**
 * Small in-memory cache. History is only requested again when the cached entry
 * is older than two minutes, which keeps re-renders (resize, theme change,
 * config edit) free of network traffic.
 */
export class HistoryRepository {
  private cache = new Map<string, CacheEntry>();
  private inflight = new Map<string, Promise<HistoryMap>>();
  private attributeCache = new Map<string, { fetchedAt: number; data: ChartSample[] }>();
  private attributeInflight = new Map<string, Promise<ChartSample[]>>();

  async load(
    hass: HomeAssistant,
    entityIds: string[],
    hours: number,
    now = Date.now(),
    options: LoadOptions = {}
  ): Promise<HistoryMap> {
    const source = options.source ?? 'history';
    const key = historyCacheKey(entityIds, hours, source);
    const maxAge = Math.max(0, options.maxAgeMs ?? HISTORY_CACHE_TTL_MS);
    const cached = this.cache.get(key);
    if (cached && maxAge > 0 && now - cached.fetchedAt < maxAge) {
      return cached.data;
    }
    // A request already on its way is at least as fresh as a new one would be.
    const pending = this.inflight.get(key);
    if (pending) return pending;

    const window = { start: now - hours * 60 * 60 * 1000, end: now };
    const promise = (
      source === 'statistics'
        ? fetchStatistics(hass, entityIds, window)
        : fetchHistory(hass, entityIds, window)
    )
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

  /**
   * Step series of one attribute (the thermostat target), cached like the
   * sensor curves. Kept apart from {@link load}: it needs full rows with
   * attributes, which would make the sensor request needlessly heavy.
   */
  async loadAttribute(
    hass: HomeAssistant,
    entityId: string,
    attribute: string,
    hours: number,
    now = Date.now(),
    options: Pick<LoadOptions, 'maxAgeMs'> = {}
  ): Promise<ChartSample[]> {
    const key = `${entityId}@${hours}#attr:${attribute}`;
    const maxAge = Math.max(0, options.maxAgeMs ?? HISTORY_CACHE_TTL_MS);
    const cached = this.attributeCache.get(key);
    if (cached && maxAge > 0 && now - cached.fetchedAt < maxAge) return cached.data;
    const pending = this.attributeInflight.get(key);
    if (pending) return pending;
    const window = { start: now - hours * 60 * 60 * 1000, end: now };
    const promise = fetchAttributeHistory(hass, entityId, attribute, window)
      .then((data) => {
        this.attributeCache.set(key, { fetchedAt: Date.now(), data });
        if (this.attributeCache.size > 24) {
          const oldest = this.attributeCache.keys().next();
          if (!oldest.done) this.attributeCache.delete(oldest.value);
        }
        return data;
      })
      .finally(() => {
        this.attributeInflight.delete(key);
      });
    this.attributeInflight.set(key, promise);
    return promise;
  }

  clear(): void {
    this.cache.clear();
    this.inflight.clear();
    this.attributeCache.clear();
    this.attributeInflight.clear();
  }
}

/**
 * One repository per Home Assistant connection, shared by every card on it.
 * Several cards showing the same sensors then make a single request instead of
 * one each. Keyed weakly, so a closed connection takes its cache with it.
 */
const sharedRepositories = new WeakMap<object, HistoryRepository>();

export function sharedHistoryRepository(hass: HomeAssistant): HistoryRepository | undefined {
  const connection = hass.connection;
  if (!connection || typeof connection !== 'object') return undefined;
  let repository = sharedRepositories.get(connection);
  if (!repository) {
    repository = new HistoryRepository();
    sharedRepositories.set(connection, repository);
  }
  return repository;
}
