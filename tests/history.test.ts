import { describe, expect, it, vi } from 'vitest';
import {
  HistoryRepository,
  fetchStatistics,
  historySourceFor,
  parseStatisticsResponse,
  sharedHistoryRepository,
  fetchHistory,
  historyCacheKey,
  normalizeSamples,
  parseHistoryResponse,
  fetchAttributeHistory,
  normalizeAttributeSamples,
} from '../src/data/history';
import { createHass } from './helpers';

const now = 1_700_000_000_000;

describe('normalizeSamples', () => {
  it('parses minimal websocket samples (epoch seconds)', () => {
    const samples = normalizeSamples([
      { s: '21.4', lu: 1700000000 },
      { s: '21.8', lu: 1700000300.5 },
    ]);
    expect(samples).toEqual([
      { t: 1700000000000, v: 21.4 },
      { t: 1700000300500, v: 21.8 },
    ]);
  });

  it('parses REST samples (ISO timestamps)', () => {
    const samples = normalizeSamples([
      { state: '20.1', last_changed: '2024-01-01T10:00:00.000Z' },
      { state: '20.5', last_changed: '2024-01-01T10:05:00Z' },
    ]);
    expect(samples).toHaveLength(2);
    expect(samples[0].v).toBe(20.1);
  });

  it('keeps gaps as null markers', () => {
    const samples = normalizeSamples([
      { s: '21', lu: 1700000000 },
      { s: 'unavailable', lu: 1700000300 },
      { s: '22', lu: 1700000600 },
    ]);
    expect(samples.map((sample) => sample.v)).toEqual([21, null, 22]);
  });

  it('sorts timestamps and de-duplicates them', () => {
    const samples = normalizeSamples([
      { s: '2', lu: 1700000600 },
      { s: '1', lu: 1700000000 },
      { s: '3', lu: 1700000300 },
      { s: '9', lu: 1700000300 },
    ]);
    expect(samples.map((sample) => sample.t)).toEqual([
      1700000000000, 1700000300000, 1700000600000,
    ]);
    expect(samples[1].v).toBe(9);
  });

  it('ignores unusable rows and non-array input', () => {
    expect(normalizeSamples(null)).toEqual([]);
    expect(normalizeSamples('nope')).toEqual([]);
    expect(normalizeSamples([{ foo: 'bar' }, null, 5])).toEqual([]);
  });
});

describe('parseHistoryResponse', () => {
  it('parses the websocket object shape', () => {
    const result = parseHistoryResponse(
      {
        'sensor.temp': [{ s: '21', lu: 1700000000 }],
        'sensor.hum': [],
      },
      ['sensor.temp', 'sensor.hum']
    );
    expect(Object.keys(result)).toEqual(['sensor.temp', 'sensor.hum']);
    expect(result['sensor.temp']).toHaveLength(1);
    expect(result['sensor.hum']).toHaveLength(0);
  });

  it('parses the REST array-of-buckets shape', () => {
    const result = parseHistoryResponse(
      [
        [
          { entity_id: 'sensor.temp', state: '21', last_changed: '2024-01-01T10:00:00Z' },
          { entity_id: 'sensor.temp', state: '22', last_changed: '2024-01-01T11:00:00Z' },
        ],
        [
          { entity_id: 'sensor.other', state: '1', last_changed: '2024-01-01T10:00:00Z' },
        ],
      ],
      ['sensor.temp']
    );
    expect(result['sensor.temp']).toHaveLength(2);
    expect(Object.keys(result)).toEqual(['sensor.temp']);
  });

  it('always returns every requested entity id', () => {
    const result = parseHistoryResponse(null, ['sensor.a', 'sensor.b']);
    expect(result).toEqual({ 'sensor.a': [], 'sensor.b': [] });
  });

  it('handles empty and malformed responses without throwing', () => {
    expect(parseHistoryResponse({}, ['sensor.a'])).toEqual({ 'sensor.a': [] });
    expect(() => parseHistoryResponse({ 'sensor.a': { weird: true } }, ['sensor.a'])).not.toThrow();
    expect(() => parseHistoryResponse([[null]], ['sensor.a'])).not.toThrow();
  });
});

describe('fetchHistory', () => {
  it('uses the websocket history command first', async () => {
    const sendMessagePromise = vi.fn(async (_message: Record<string, unknown>) => ({
      'sensor.temp': [{ s: '21', lu: Math.floor(now / 1000) }],
    }));
    const hass = createHass();
    hass.connection!.sendMessagePromise = sendMessagePromise;

    const result = await fetchHistory(hass, ['sensor.temp'], {
      start: now - 3600_000,
      end: now,
    });

    expect(sendMessagePromise).toHaveBeenCalledOnce();
    const message = sendMessagePromise.mock.calls[0][0];
    expect(message.type).toBe('history/history_during_period');
    expect(message.entity_ids).toEqual(['sensor.temp']);
    expect(message.minimal_response).toBe(true);
    expect(result['sensor.temp']).toHaveLength(1);
  });

  it('falls back to the REST endpoint when the websocket call fails', async () => {
    const hass = createHass({
      onCallApi: (path) => {
        expect(path).toContain('history/period/');
        expect(path).toContain('filter_entity_id=sensor.temp');
        return [
          [
            { entity_id: 'sensor.temp', state: '20', last_changed: '2024-01-01T10:00:00Z' },
          ],
        ];
      },
    });
    hass.connection!.sendMessagePromise = async () => {
      throw new Error('command not found');
    };

    const result = await fetchHistory(hass, ['sensor.temp'], { start: now - 3600_000, end: now });
    expect(result['sensor.temp']).toHaveLength(1);
  });

  it('returns an empty map without entities and never calls the API', async () => {
    const hass = createHass();
    const spy = vi.spyOn(hass.connection!, 'sendMessagePromise');
    expect(await fetchHistory(hass, [], { start: now, end: now })).toEqual({});
    expect(spy).not.toHaveBeenCalled();
  });

  it('surfaces REST errors so the card can show a fallback', async () => {
    const hass = createHass();
    delete hass.connection;
    hass.callApi = async () => {
      throw new Error('offline');
    };
    await expect(
      fetchHistory(hass, ['sensor.temp'], { start: now - 1000, end: now })
    ).rejects.toThrow('offline');
  });
});

describe('HistoryRepository caching', () => {
  it('caches per entity/hour combination', async () => {
    const sendMessagePromise = vi.fn(async (_message: Record<string, unknown>) => ({
      'sensor.temp': [{ s: '21', lu: Math.floor(now / 1000) }],
    }));
    const hass = createHass();
    hass.connection!.sendMessagePromise = sendMessagePromise;
    const repository = new HistoryRepository();

    await repository.load(hass, ['sensor.temp'], 6, now);
    await repository.load(hass, ['sensor.temp'], 6, now + 1000);
    expect(sendMessagePromise).toHaveBeenCalledTimes(1);

    await repository.load(hass, ['sensor.temp'], 12, now + 1000);
    expect(sendMessagePromise).toHaveBeenCalledTimes(2);
  });

  it('refetches after the cache TTL', async () => {
    vi.useFakeTimers();
    try {
      vi.setSystemTime(now);
      const sendMessagePromise = vi.fn(async () => ({ 'sensor.temp': [] }));
      const hass = createHass();
      hass.connection!.sendMessagePromise = sendMessagePromise;
      const repository = new HistoryRepository();

      await repository.load(hass, ['sensor.temp'], 6, now);
      vi.setSystemTime(now + 3 * 60 * 1000);
      await repository.load(hass, ['sensor.temp'], 6, now + 3 * 60 * 1000);
      expect(sendMessagePromise).toHaveBeenCalledTimes(2);
    } finally {
      vi.useRealTimers();
    }
  });

  it('de-duplicates concurrent requests', async () => {
    const sendMessagePromise = vi.fn(async () => ({ 'sensor.temp': [] }));
    const hass = createHass();
    hass.connection!.sendMessagePromise = sendMessagePromise;
    const repository = new HistoryRepository();

    await Promise.all([
      repository.load(hass, ['sensor.temp'], 6, now),
      repository.load(hass, ['sensor.temp'], 6, now),
    ]);
    expect(sendMessagePromise).toHaveBeenCalledTimes(1);
  });

  it('clears its cache on demand', async () => {
    const sendMessagePromise = vi.fn(async () => ({ 'sensor.temp': [] }));
    const hass = createHass();
    hass.connection!.sendMessagePromise = sendMessagePromise;
    const repository = new HistoryRepository();

    await repository.load(hass, ['sensor.temp'], 6, now);
    repository.clear();
    await repository.load(hass, ['sensor.temp'], 6, now);
    expect(sendMessagePromise).toHaveBeenCalledTimes(2);
  });

  it('bypasses the cache when asked for a fresh answer', async () => {
    const sendMessagePromise = vi.fn(async () => ({ 'sensor.temp': [] }));
    const hass = createHass();
    hass.connection!.sendMessagePromise = sendMessagePromise;
    const repository = new HistoryRepository();

    await repository.load(hass, ['sensor.temp'], 6, now);
    await repository.load(hass, ['sensor.temp'], 6, now + 1000);
    expect(sendMessagePromise).toHaveBeenCalledTimes(1);

    // After a reconnect the cached curve may predate the outage.
    await repository.load(hass, ['sensor.temp'], 6, now + 2000, { maxAgeMs: 0 });
    expect(sendMessagePromise).toHaveBeenCalledTimes(2);
  });

  it('shares one repository per connection', () => {
    const first = createHass();
    const second = createHass();
    expect(sharedHistoryRepository(first)).toBe(sharedHistoryRepository({ ...first }));
    expect(sharedHistoryRepository(first)).not.toBe(sharedHistoryRepository(second));
    const offline = createHass();
    delete offline.connection;
    expect(sharedHistoryRepository(offline)).toBeUndefined();
  });

  it('builds stable cache keys', () => {
    expect(historyCacheKey(['b', 'a'], 6)).toBe(historyCacheKey(['a', 'b'], 6));
    expect(historyCacheKey(['a'], 6)).not.toBe(historyCacheKey(['a'], 12));
  });
});

describe('long windows from the recorder statistics', () => {
  it('switches to statistics beyond 48 hours', () => {
    expect(historySourceFor(24)).toBe('history');
    expect(historySourceFor(48)).toBe('history');
    expect(historySourceFor(72)).toBe('statistics');
    expect(historySourceFor(168)).toBe('statistics');
  });

  it('places each five-minute mean in the middle of its bucket', () => {
    const start = now - 10 * 60_000;
    const parsed = parseStatisticsResponse(
      {
        'sensor.temp': [
          { start: start + 5 * 60_000, end: start + 10 * 60_000, mean: 21.5 },
          { start, end: start + 5 * 60_000, mean: 21 },
          { start: start + 10 * 60_000, mean: null },
        ],
      },
      ['sensor.temp', 'sensor.humidity']
    );
    expect(parsed['sensor.temp']).toEqual([
      { t: start + 2.5 * 60_000, v: 21 },
      { t: start + 7.5 * 60_000, v: 21.5 },
      { t: start + 12.5 * 60_000, v: null },
    ]);
    expect(parsed['sensor.humidity']).toEqual([]);
  });

  it('asks for five-minute means and fills sensors without statistics from the history', async () => {
    const messages: Array<Record<string, unknown>> = [];
    const hass = createHass();
    hass.connection!.sendMessagePromise = async (message: Record<string, unknown>) => {
      messages.push(message);
      if (message.type === 'recorder/statistics_during_period') {
        return { 'sensor.temp': [{ start: now - 5 * 60_000, end: now, mean: 22 }] };
      }
      return { 'sensor.humidity': [{ s: '50', lu: Math.floor(now / 1000) }] };
    };
    const result = await fetchStatistics(hass, ['sensor.temp', 'sensor.humidity'], {
      start: now - 72 * 3600_000,
      end: now,
    });
    expect(messages[0]).toMatchObject({
      type: 'recorder/statistics_during_period',
      period: '5minute',
      types: ['mean'],
      statistic_ids: ['sensor.temp', 'sensor.humidity'],
    });
    expect(messages[1]).toMatchObject({
      type: 'history/history_during_period',
      entity_ids: ['sensor.humidity'],
    });
    expect(result['sensor.temp']).toEqual([{ t: now - 2.5 * 60_000, v: 22 }]);
    expect(result['sensor.humidity']).toEqual([{ t: now, v: 50 }]);
  });

  it('falls back to the history when statistics are not available', async () => {
    const hass = createHass({ history: { 'sensor.temp': [{ s: '21', lu: Math.floor(now / 1000) }] } });
    // The helper rejects every message except the history request.
    const result = await fetchStatistics(hass, ['sensor.temp'], { start: now - 1000, end: now });
    expect(result['sensor.temp']).toEqual([{ t: now, v: 21 }]);
  });

  it('keeps statistics and raw history apart in the cache', async () => {
    const types: string[] = [];
    const hass = createHass();
    hass.connection!.sendMessagePromise = async (message: Record<string, unknown>) => {
      types.push(String(message.type));
      return { 'sensor.temp': [] };
    };
    const repository = new HistoryRepository();
    await repository.load(hass, ['sensor.temp'], 72, now, { source: 'statistics' });
    await repository.load(hass, ['sensor.temp'], 72, now);
    expect(types[0]).toBe('recorder/statistics_during_period');
    expect(types).toContain('history/history_during_period');
  });
});


describe('target history (thermostat attribute)', () => {
  it('keeps only the rows where the target changes and turns a missing target into a gap', () => {
    const steps = normalizeAttributeSamples(
      [
        { s: 'heat', a: { temperature: 21, current_temperature: 20.1 }, lu: 1000 },
        { s: 'heat', a: { temperature: 21, current_temperature: 20.4 }, lu: 1100 },
        { s: 'heat', a: { temperature: 22.5 }, lu: 1200 },
        { s: 'off', a: { temperature: null }, lu: 1300 },
        { s: 'heat', attributes: { temperature: '19' }, last_updated: new Date(1_400_000).toISOString() },
      ],
      'temperature'
    );
    expect(steps).toEqual([
      { t: 1_000_000, v: 21 },
      { t: 1_200_000, v: 22.5 },
      { t: 1_300_000, v: null },
      { t: 1_400_000, v: 19 },
    ]);
  });

  it('asks for full rows with attributes for that one entity', async () => {
    const send = vi.fn(async () => ({
      'climate.room': [
        { s: 'heat', a: { temperature: 20 }, lu: 1000 },
        { s: 'heat', a: { temperature: 21 }, lu: 2000 },
      ],
    }));
    const hass = createHass();
    hass.connection!.sendMessagePromise = send;
    const steps = await fetchAttributeHistory(hass, 'climate.room', 'temperature', {
      start: now - 3600_000,
      end: now,
    });
    expect(steps.map((step) => step.v)).toEqual([20, 21]);
    const message = (send.mock.calls[0] as unknown[])[0] as Record<string, unknown>;
    expect(message).toMatchObject({
      type: 'history/history_during_period',
      entity_ids: ['climate.room'],
      minimal_response: false,
      no_attributes: false,
      include_start_time_state: true,
    });
  });

  it('shares and caches the target request', async () => {
    const send = vi.fn(async () => ({ 'climate.room': [{ s: 'heat', a: { temperature: 20 }, lu: 1000 }] }));
    const hass = createHass();
    hass.connection!.sendMessagePromise = send;
    const repository = new HistoryRepository();
    await Promise.all([
      repository.loadAttribute(hass, 'climate.room', 'temperature', 6, now),
      repository.loadAttribute(hass, 'climate.room', 'temperature', 6, now),
    ]);
    await repository.loadAttribute(hass, 'climate.room', 'temperature', 6, now + 1000);
    expect(send).toHaveBeenCalledTimes(1);
  });
});
