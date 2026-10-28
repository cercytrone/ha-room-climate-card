import { describe, expect, it, vi } from 'vitest';
import {
  HistoryRepository,
  fetchHistory,
  historyCacheKey,
  normalizeSamples,
  parseHistoryResponse,
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

  it('builds stable cache keys', () => {
    expect(historyCacheKey(['b', 'a'], 6)).toBe(historyCacheKey(['a', 'b'], 6));
    expect(historyCacheKey(['a'], 6)).not.toBe(historyCacheKey(['a'], 12));
  });
});
