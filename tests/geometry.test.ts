import { describe, expect, it } from 'vitest';
import {
  areaPath,
  buildRuns,
  buildSegments,
  intervalPercentile,
  prepareSamples,
  splitAtBridges,
  decimate,
  extent,
  gapThreshold,
  linearScale,
  medianInterval,
  DEFAULT_SMOOTHING,
  movingAverage,
  padDomain,
  seriesPath,
  smoothPath,
  SMOOTHING_LEVELS,
  smoothingWindow,
  tickCountForWidth,
  timeTicks,
  type ChartSample,
  type Point,
} from '../src/chart/geometry';

/** Samples a path string (M/L/C only, as produced by the chart) into points. */
function samplePath(d: string, steps = 24): Point[] {
  const commands = d.match(/[MLC][^MLCZ]*/g) ?? [];
  const points: Point[] = [];
  let current: Point = { x: 0, y: 0 };
  for (const command of commands) {
    const numbers = (command.match(/-?\d+(\.\d+)?/g) ?? []).map(Number);
    const type = command[0];
    if (type === 'M') {
      current = { x: numbers[0], y: numbers[1] };
      points.push(current);
    } else if (type === 'L') {
      current = { x: numbers[0], y: numbers[1] };
      points.push(current);
    } else if (type === 'C') {
      const [x1, y1, x2, y2, x3, y3] = numbers;
      const from = current;
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const u = 1 - t;
        points.push({
          x: u * u * u * from.x + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3,
          y: u * u * u * from.y + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3,
        });
      }
      current = { x: x3, y: y3 };
    }
  }
  return points;
}

function series(values: number[], stepMs = 60_000, start = 0): ChartSample[] {
  return values.map((v, index) => ({ t: start + index * stepMs, v }));
}

describe('scales', () => {
  it('maps domains onto ranges linearly', () => {
    const scale = linearScale([0, 10], [100, 0]);
    expect(scale(0)).toBe(100);
    expect(scale(5)).toBe(50);
    expect(scale(10)).toBe(0);
  });

  it('returns the middle of the range for a degenerated domain', () => {
    const scale = linearScale([5, 5], [0, 100]);
    expect(scale(5)).toBe(50);
  });

  it('computes extents and ignores invalid values', () => {
    expect(extent([3, 1, 2, Number.NaN])).toEqual([1, 3]);
    expect(extent([])).toBeNull();
    expect(extent([Number.NaN])).toBeNull();
  });

  it('pads and expands tiny domains', () => {
    const [min, max] = padDomain(21, 21.05, { minSpan: 1, padding: 0 });
    expect(max - min).toBeCloseTo(1, 5);
    const padded = padDomain(10, 20, { padding: 0.1 });
    expect(padded[0]).toBeCloseTo(9, 5);
    expect(padded[1]).toBeCloseTo(21, 5);
  });
});

describe('gaps and runs', () => {
  it('computes the median interval', () => {
    expect(medianInterval(series([1, 2, 3, 4], 60_000))).toBe(60_000);
    expect(medianInterval([])).toBe(0);
  });

  it('splits on null markers', () => {
    const samples: ChartSample[] = [
      { t: 0, v: 1 },
      { t: 60_000, v: 2 },
      { t: 120_000, v: null },
      { t: 180_000, v: 3 },
      { t: 240_000, v: null },
      { t: 300_000, v: 4 },
    ];
    const runs = buildRuns(samples, 3600_000).runs;
    expect(runs).toHaveLength(3);
    expect(runs[0].map((sample) => sample.v)).toEqual([1, 2]);
    expect(runs[1].map((sample) => sample.v)).toEqual([3]);
    expect(runs[2].map((sample) => sample.v)).toEqual([4]);
  });

  it('splits on large time gaps but keeps dense data together', () => {
    const samples: ChartSample[] = [
      { t: 0, v: 1 },
      { t: 60_000, v: 2 },
      { t: 120_000, v: 3 },
      { t: 3_600_000, v: 4 },
      { t: 3_660_000, v: 5 },
    ];
    const runs = buildRuns(samples, 6 * 3600_000).runs;
    expect(runs).toHaveLength(2);
    expect(runs[0]).toHaveLength(3);
    expect(runs[1]).toHaveLength(2);
  });

  it('adapts the gap threshold to slow sensors', () => {
    const slow = series([1, 2, 3, 4], 30 * 60_000);
    const fast = series([1, 2, 3, 4], 30_000);
    expect(gapThreshold(slow, 6 * 3600_000)).toBeGreaterThan(gapThreshold(fast, 6 * 3600_000));
  });

  it('never returns empty runs for only gaps', () => {
    const runs = buildRuns([{ t: 0, v: null }], 3600_000).runs;
    expect(runs).toEqual([]);
  });
});

describe('segments with interpolation', () => {
  const hour = 3600_000;
  const start = 0;
  const end = 6 * hour;

  function at(hoursFromStart: number, v: number | null): ChartSample {
    return { t: hoursFromStart * hour, v };
  }

  it('draws a quiet stretch as a step instead of a ramp', () => {
    // 6 minute cadence, then 90 minutes without a sample (value unchanged –
    // Home Assistant does not store that), then a real change.
    const samples = [at(1, 20), at(1.1, 20.2), at(2.6, 21), at(2.7, 21.1)];
    const segments = buildSegments(samples, {
      rangeMs: end - start,
      start,
      end,
      gapMode: 'connect',
      maxGapMs: 2 * hour,
    });
    expect(segments).toHaveLength(1);
    const { samples: values } = segments[0];

    // The old value is held until just before the change, then it jumps.
    const held = values.filter((sample) => sample.t > at(1.1, 0).t && sample.t < at(2.6, 0).t);
    expect(held).toHaveLength(1);
    expect(held[0].v).toBe(20.2);
    expect(at(2.6, 0).t - held[0].t).toBeLessThanOrEqual(1000);

    // No sample in between suggests a slow change that never happened.
    const between = values.filter(
      (sample) => sample.t > at(1.1, 0).t && sample.t < held[0].t && sample.v !== 20.2
    );
    expect(between).toHaveLength(0);
    for (const sample of values) expect(sample.v as number).toBeLessThanOrEqual(21.1);
    for (let i = 1; i < values.length; i++) {
      expect(values[i].t).toBeGreaterThan(values[i - 1].t);
    }
  });

  it('bridges null markers in connect mode', () => {
    const samples = [at(1, 20), at(1.1, 20.1), at(1.2, null), at(2.4, 21)];
    const segments = buildSegments(samples, {
      rangeMs: end - start,
      start,
      end,
      gapMode: 'connect',
      maxGapMs: 2 * hour,
    });
    expect(segments).toHaveLength(1);
    expect(segments[0].bridged.some(Boolean)).toBe(true);
  });

  it('keeps null markers broken in break mode', () => {
    const samples = [at(1, 20), at(1.1, 20.1), at(1.2, null), at(2.4, 21)];
    const segments = buildSegments(samples, {
      rangeMs: end - start,
      start,
      end,
      gapMode: 'break',
      maxGapMs: 2 * hour,
    });
    expect(segments).toHaveLength(2);
  });

  it('never breaks the line just because the value did not change', () => {
    // Home Assistant stores no sample while a value stays constant. Four hours
    // of silence is "unchanged", not "missing" – the line has to stay whole.
    const samples = [at(1, 20), at(1.1, 20.1), at(1.2, 20.2), at(5.2, 20.2), at(5.3, 20.3)];
    const segments = buildSegments(samples, {
      rangeMs: end - start,
      start,
      end,
      gapMode: 'connect',
      maxGapMs: 2 * hour,
    });
    expect(segments).toHaveLength(1);
    const values = segments[0].samples.map((sample) => sample.v as number);
    expect(Math.min(...values)).toBeGreaterThanOrEqual(20);
    expect(Math.max(...values)).toBeLessThanOrEqual(20.3);

    // Everything after the last small step holds 20.2 until the real change.
    const flat = segments[0].samples.filter(
      (sample) => sample.t > at(1.3, 0).t && sample.t < at(5.2, 0).t
    );
    for (const sample of flat) expect(sample.v).toBe(20.2);
  });

  it('measures an outage from the moment it started, not from the last value', () => {
    // A quiet night: 04:15 last value, then a one-minute dropout at 07:59,
    // then the next real change at 08:00. The stretch before the dropout was
    // measured, so it must not count as outage time.
    const samples = [at(4.25, 21.4), at(7.983, null), at(8, 21.9)];
    const segments = buildSegments(samples, {
      rangeMs: end - start,
      start,
      end,
      gapMode: 'connect',
      maxGapMs: 2 * hour,
    });
    expect(segments).toHaveLength(1);

    // The very same outage in the middle of a dense series is bridged too.
    const dense = [at(1, 20), at(1.1, 20.1), at(1.2, null), at(1.25, 20.2), at(1.3, 20.3)];
    const bridged = buildSegments(dense, {
      rangeMs: end - start,
      start,
      end,
      gapMode: 'connect',
      maxGapMs: 2 * hour,
    });
    expect(bridged).toHaveLength(1);
  });

  it('breaks on a real outage even after a long quiet stretch', () => {
    // 04:15 last value, unavailable from 06:00 to 08:00 (2 h > 1 h limit).
    const samples = [at(4.25, 21.4), at(6, null), at(8, 21.9)];
    const segments = buildSegments(samples, {
      rangeMs: end - start,
      start,
      end,
      gapMode: 'connect',
      maxGapMs: 1 * hour,
    });
    expect(segments).toHaveLength(2);
    // The first segment ends where the measurement ended, not at 04:15.
    const first = segments[0].samples;
    expect(first[first.length - 1].t).toBe(at(6, 0).t);
    expect(first[first.length - 1].v).toBe(21.4);
  });

  it('never breaks a quiet stretch in break mode', () => {
    // `chart_gap_mode: break` may only show real outages – a value that simply
    // did not change is not a hole.
    const quiet = [at(1, 20), at(5, 20.3)];
    const segments = buildSegments(quiet, {
      rangeMs: end - start,
      start,
      end,
      gapMode: 'break',
      maxGapMs: 2 * hour,
    });
    expect(segments).toHaveLength(1);

    const outage = [at(1, 20), at(1.1, 20.1), at(1.2, null), at(4.5, 22)];
    expect(
      buildSegments(outage, {
        rangeMs: end - start,
        start,
        end,
        gapMode: 'break',
        maxGapMs: 2 * hour,
      })
    ).toHaveLength(2);
  });

  it('never bridges an explicit unavailable stretch beyond maxGapMs', () => {
    const samples = [at(1, 20), at(1.1, 20.1), at(1.2, null), at(4.5, 22)];
    const segments = buildSegments(samples, {
      rangeMs: end - start,
      start,
      end,
      gapMode: 'connect',
      maxGapMs: 2 * hour,
    });
    expect(segments).toHaveLength(2);
  });

  it('bridges a short unavailable stretch', () => {
    const samples = [at(1, 20), at(1.1, null), at(1.6, 21)];
    const segments = buildSegments(samples, {
      rangeMs: end - start,
      start,
      end,
      gapMode: 'connect',
      maxGapMs: 2 * hour,
    });
    expect(segments).toHaveLength(1);
  });

  it('holds the outer samples to the window edges', () => {
    const samples = [at(2, 20), at(3, 21)];
    const segments = buildSegments(samples, {
      rangeMs: end - start,
      start,
      end,
      gapMode: 'connect',
    });
    expect(segments).toHaveLength(1);
    const points = segments[0].samples;
    expect(points[0]).toEqual({ t: start, v: 20 });
    expect(points[points.length - 1]).toEqual({ t: end, v: 21 });
    // Edge extension is not an interpolation (state holds until it changes).
    expect(segments[0].bridged).toHaveLength(points.length - 1);
    expect(segments[0].bridged[0]).toBe(false);
    expect(segments[0].bridged[segments[0].bridged.length - 1]).toBe(false);
  });

  it('does not extend when the sensor went unavailable at the edges', () => {
    const samples = [at(0, null), at(1, 20), at(3, 21)];
    const withLeading = buildSegments(samples, {
      rangeMs: end - start,
      start,
      end,
      gapMode: 'connect',
    });
    expect(withLeading[0].samples[0].t).toBe(hour);

    const trailing = buildSegments([at(1, 20), at(3, 21), at(5.5, null)], {
      rangeMs: end - start,
      start,
      end,
      gapMode: 'connect',
    });
    const last = trailing[trailing.length - 1].samples;
    expect(last[last.length - 1].t).toBeLessThan(end);
  });

  it('returns no segments for empty or all-null input', () => {
    expect(buildSegments([], { rangeMs: end, start, end })).toEqual([]);
    expect(buildSegments([at(1, null), at(2, null)], { rangeMs: end, start, end })).toEqual([]);
  });

  it('splits a segment at bridged edges only', () => {
    // A bridged *outage* (null marker) is what may be drawn dashed later on;
    // a quiet stretch is a known value and never splits the path.
    const samples = [at(1, 20), at(1.1, 20.2), at(1.2, null), at(1.6, 21), at(1.7, 21.1)];
    const segments = buildSegments(samples, {
      rangeMs: end - start,
      start,
      end,
      gapMode: 'connect',
      maxGapMs: 2 * hour,
    });
    const parts = splitAtBridges(segments[0]);
    expect(parts.length).toBeGreaterThan(1);
    // Every part carries at least two points so a path can be drawn.
    for (const part of parts) expect(part.length).toBeGreaterThanOrEqual(2);

    const continuous = buildSegments([at(1, 20), at(1.05, 20.1)], {
      rangeMs: end - start,
      gapMode: 'connect',
    });
    expect(splitAtBridges(continuous[0])).toHaveLength(1);
  });

  it('prepares live samples: sorted, de-duplicated, windowed, validated', () => {
    const prepared = prepareSamples(
      [
        { t: 300, v: 3 },
        { t: 100, v: 1 },
        { t: 200, v: null },
        { t: 200, v: 2 },
        { t: -50, v: 9 },
        { t: 1_000, v: 9 },
        { t: 400, v: Number.NaN },
      ],
      0,
      500
    );
    expect(prepared).toEqual([
      // The state before the window is carried in at the window start.
      { t: 0, v: 9 },
      { t: 100, v: 1 },
      { t: 200, v: 2 },
      { t: 300, v: 3 },
      { t: 400, v: null },
    ]);
  });

  it('carries the state before the window in, even without samples inside', () => {
    // A quiet night: the only state is the one from before the window start.
    const carried = prepareSamples([{ t: 1_000, v: 21.4 }, { t: 2_000, v: 21.5 }], 5_000, 9_000);
    expect(carried).toEqual([{ t: 5_000, v: 21.5 }]);

    // The newest state before the window wins …
    const newest = prepareSamples([{ t: 1_000, v: 20 }, { t: 2_000, v: 21.5 }], 5_000);
    expect(newest).toEqual([{ t: 5_000, v: 21.5 }]);
    // … and an unavailable state must not silently become a value.
    const unavailable = prepareSamples([{ t: 1_000, v: 20 }, { t: 2_000, v: null }], 5_000);
    expect(unavailable).toEqual([{ t: 5_000, v: null }]);

    // A sample exactly at the window start wins over the carry-in.
    const exact = prepareSamples([{ t: 900, v: 20 }, { t: 5_000, v: 22 }], 5_000);
    expect(exact).toEqual([{ t: 5_000, v: 22 }]);
  });

  it('handles empty input for prepareSamples', () => {
    expect(prepareSamples(undefined, 0, 10)).toEqual([]);
    expect(prepareSamples([], 0, 10)).toEqual([]);
  });

  it('computes interval percentiles', () => {
    const samples = series([1, 2, 3, 4, 5], 60_000);
    expect(intervalPercentile(samples, 0)).toBe(60_000);
    expect(intervalPercentile(samples, 0.75)).toBe(60_000);
    expect(intervalPercentile([], 0.5)).toBe(0);
  });
});

describe('paths', () => {
  const points: Point[] = [
    { x: 0, y: 80 },
    { x: 50, y: 40 },
    { x: 100, y: 60 },
    { x: 150, y: 20 },
  ];

  it('builds a straight polyline for linear mode', () => {
    const path = seriesPath(points, false);
    expect(path.startsWith('M 0 80')).toBe(true);
    expect(path).toContain('L 50 40');
    expect(path.match(/C/g)).toBeNull();
  });

  it('builds a smooth cubic path', () => {
    const path = seriesPath(points, true);
    expect(path.startsWith('M 0 80')).toBe(true);
    expect((path.match(/C/g) ?? []).length).toBe(points.length - 1);
  });

  it('never overshoots the measured values (monotone interpolation)', () => {
    const spiky: Point[] = [
      { x: 0, y: 100 },
      { x: 10, y: 10 },
      { x: 20, y: 100 },
      { x: 30, y: 10 },
      { x: 40, y: 100 },
    ];
    const samples = samplePath(smoothPath(spiky));
    const min = Math.min(...spiky.map((point) => point.y));
    const max = Math.max(...spiky.map((point) => point.y));
    for (const sample of samples) {
      expect(sample.y).toBeGreaterThanOrEqual(min - 1e-6);
      expect(sample.y).toBeLessThanOrEqual(max + 1e-6);
    }
  });

  it('handles degenerate inputs', () => {
    expect(smoothPath([])).toBe('');
    expect(smoothPath([{ x: 1, y: 2 }])).toBe('M 1 2');
    expect(smoothPath([{ x: 0, y: 0 }, { x: 10, y: 10 }])).toContain('L 10 10');
  });

  it('closes the area path on the baseline', () => {
    const path = areaPath(points, 90, true);
    expect(path.endsWith('Z')).toBe(true);
    expect(path).toContain('L 150 90');
    expect(path).toContain('L 0 90');
  });
});

describe('denoising', () => {
  const series = (values: number[]): ChartSample[] =>
    values.map((v, i) => ({ t: i * 60_000, v }));

  it('smooths a jagged run with a centred moving average', () => {
    const jagged = series([20, 22, 20, 22, 20, 22, 20]);
    const smoothed = movingAverage(jagged, 3);
    expect(smoothed).toHaveLength(jagged.length);
    expect(smoothed.map((s) => s.v)).toEqual([21, 20.7, 21.3, 20.7, 21.3, 20.7, 21]);
    // The overall level must not move – only the jitter disappears.
    const mean = (values: number[]) => values.reduce((a, b) => a + b, 0) / values.length;
    // Rounding to one decimal may shift the mean by a tenth – no more.
    expect(Math.abs(mean(smoothed.map((s) => s.v as number)) - mean([20, 22, 20, 22, 20, 22, 20]))).toBeLessThan(0.2);
  });

  it('keeps timestamps and the newest sample exactly in place', () => {
    const input = series([20, 21, 22, 23]);
    const smoothed = movingAverage(input, 3);
    expect(smoothed.map((s) => s.t)).toEqual(input.map((s) => s.t));
    // The last sample averages only itself and its neighbour – its time stays.
    expect(smoothed[3].v).toBe(22.5);
    expect(smoothed[3].t).toBe(input[3].t);
  });

  it('leaves short runs and gaps untouched', () => {
    const short = series([20, 21]);
    expect(movingAverage(short, 5).map((s) => s.v)).toEqual([20, 21]);
    const withNull = [{ t: 0, v: 20 }, { t: 60_000, v: null }, { t: 120_000, v: 24 }];
    expect(movingAverage(withNull, 3).map((s) => s.v)).toEqual([20, null, 24]);
  });

  it('keeps the shape of the measurement with a short window', () => {
    // Jitter on top of a real trend: the kind of data an HA sensor delivers.
    const values = [
      21.4, 21.8, 21.5, 22.1, 21.6, 22.4, 21.9, 22.6, 22.1, 21.7, 22.2, 21.8, 22.5, 21.9,
      21.3, 21.7, 21.2, 21.6, 21.0, 20.8, 21.1, 20.7, 21.2, 20.9, 21.4, 21.8, 21.5,
    ];
    const input = series(values);
    const directionChanges = (samples: ChartSample[]) => {
      let flips = 0;
      for (let i = 2; i < samples.length; i++) {
        const before = Math.sign((samples[i - 1].v as number) - (samples[i - 2].v as number));
        const after = Math.sign((samples[i].v as number) - (samples[i - 1].v as number));
        if (before !== 0 && after !== 0 && before !== after) flips += 1;
      }
      return flips;
    };
    const amplitude = (samples: ChartSample[]) => {
      const numbers = samples.map((sample) => sample.v as number);
      return Math.max(...numbers) - Math.min(...numbers);
    };

    const raw = directionChanges(input);
    const short = movingAverage(input, 3);
    const long = movingAverage(input, 9);

    // Short window: recognisably calmer than the raw signal…
    expect(directionChanges(short)).toBeLessThan(raw / 2);
    expect(directionChanges(short)).toBeGreaterThan(0);
    // …but it keeps the amplitude of the measurement much better than the old
    // 9-point window, which flattened the curve into a nearly straight line.
    expect(amplitude(short)).toBeGreaterThan(amplitude(long));
    expect(amplitude(short)).toBeLessThan(amplitude(input));
    // And it stays within the measured range – no invented peak.
    for (const sample of short) {
      const value = sample.v as number;
      expect(value).toBeGreaterThanOrEqual(Math.min(...values));
      expect(value).toBeLessThanOrEqual(Math.max(...values));
    }
  });

  it('scales the window with the sample count and keeps it odd', () => {
    expect(smoothingWindow(3)).toBe(1);
    expect(smoothingWindow(10)).toBe(3);
    expect(smoothingWindow(40)).toBe(3);
    expect(smoothingWindow(100)).toBe(5);
    expect(smoothingWindow(400)).toBe(5);
    // Never wider than five points: the old 7/9 windows ironed the curve flat.
    for (const count of [5, 20, 60, 160, 1000]) {
      expect(smoothingWindow(count)).toBeLessThanOrEqual(5);
      expect(smoothingWindow(count) % 2).toBe(1);
    }
  });

  it('offers four smoothing levels with their own window', () => {
    // Level 0 is "draw every measurement", the ladder grows from there.
    for (const count of [10, 40, 100, 400]) {
      expect(smoothingWindow(count, 'none')).toBe(1);
    }
    expect(smoothingWindow(40, 'light')).toBe(3);
    expect(smoothingWindow(40, 'medium')).toBe(5);
    expect(smoothingWindow(40, 'strong')).toBe(9);
    expect(smoothingWindow(200, 'light')).toBe(5);
    expect(smoothingWindow(200, 'medium')).toBe(9);
    expect(smoothingWindow(200, 'strong')).toBe(15);
    // Every level stays odd so the average is centred.
    for (const level of SMOOTHING_LEVELS) {
      for (const count of [5, 30, 90, 500]) {
        expect(smoothingWindow(count, level) % 2).toBe(1);
      }
    }
    // Short runs are never averaged – there is no neighbour to average with.
    for (const level of SMOOTHING_LEVELS) {
      expect(smoothingWindow(4, level)).toBe(1);
    }
    // Unknown / missing level falls back to the default instead of throwing.
    expect(smoothingWindow(40, 'wobble' as never)).toBe(smoothingWindow(40, DEFAULT_SMOOTHING));
    expect(smoothingWindow(40)).toBe(smoothingWindow(40, 'light'));
  });

  it('draws every measured value when smoothing is off', () => {
    const input = series([21.4, 21.8, 21.5, 22.1, 21.6, 22.4, 21.9]);
    expect(movingAverage(input, smoothingWindow(input.length, 'none')).map((s) => s.v)).toEqual([
      21.4, 21.8, 21.5, 22.1, 21.6, 22.4, 21.9,
    ]);
    // A stronger level flattens more than a light one – same data, less amplitude.
    const amplitude = (window: number) => {
      const values = movingAverage(input, window).map((sample) => sample.v as number);
      return Math.max(...values) - Math.min(...values);
    };
    expect(amplitude(smoothingWindow(input.length, 'strong'))).toBeLessThan(
      amplitude(smoothingWindow(input.length, 'light'))
    );
  });

  it('rounds to the precision of the sensor, not to a fixed decimal', () => {
    // A 0.1 °C sensor keeps one decimal …
    const coarse = movingAverage(series([21.1, 21.2, 21.1, 21.2, 21.1]), 3);
    for (const sample of coarse) {
      expect(String(sample.v).split('.')[1]?.length ?? 0).toBeLessThanOrEqual(1);
    }
    // … a fine-grained one keeps its second decimal instead of losing detail.
    const fine = movingAverage(series([21.0, 21.02, 21.0, 21.04, 21.02]), 3);
    const fineValues = fine.map((sample) => sample.v as number);
    expect(new Set(fineValues).size).toBeGreaterThan(1);
    expect(fineValues.some((value) => Math.abs(value * 100 - Math.round(value * 100)) < 1e-9)).toBe(
      true
    );
    // Integer sensors still get a real average instead of being rounded away.
    const whole = movingAverage(series([20, 22, 20]), 3);
    expect(whole[1].v).toBe(20.7);
  });

  it('never leaves the measured range', () => {
    const input = series([18, 19, 25, 21, 20]);
    const smoothed = movingAverage(input, 3);
    for (const sample of smoothed) {
      expect(sample.v as number).toBeGreaterThanOrEqual(18);
      expect(sample.v as number).toBeLessThanOrEqual(25);
    }
  });
});

describe('axis helpers', () => {
  it('spreads ticks between start and end', () => {
    expect(timeTicks(0, 100, 3)).toEqual([0, 50, 100]);
    expect(timeTicks(100, 100, 3)).toEqual([]);
    expect(timeTicks(0, 100, 1)).toEqual([]);
  });

  it('chooses the tick count from the width', () => {
    expect(tickCountForWidth(120)).toBe(2);
    expect(tickCountForWidth(250)).toBe(3);
    expect(tickCountForWidth(400)).toBe(4);
    expect(tickCountForWidth(900)).toBe(5);
  });

  it('keeps the low and high of every bucket when decimating', () => {
    // 24 h of one-minute samples with a single short spike.
    const values = Array.from({ length: 1440 }, (_, index) => 20 + Math.sin(index / 40) * 0.4);
    values[613] = 27.5; // the peak that used to disappear
    const samples: ChartSample[] = values.map((value, index) => ({
      t: index * 60_000,
      v: Number(value.toFixed(2)),
    }));

    const result = decimate(samples, 200);
    expect(result.length).toBeLessThanOrEqual(200);
    expect(result.length).toBeGreaterThan(50);
    const kept = result.map((sample) => sample.v as number);
    expect(Math.max(...kept)).toBe(27.5);
    expect(Math.min(...kept)).toBeCloseTo(Math.min(...values), 2);
    // First and last stay, the order is chronological.
    expect(result[0]).toBe(samples[0]);
    expect(result[result.length - 1]).toBe(samples[samples.length - 1]);
    for (let i = 1; i < result.length; i++) {
      expect(result[i].t).toBeGreaterThan(result[i - 1].t);
    }
  });

  it('leaves short series untouched when decimating', () => {
    const samples = series([20, 21, 22]);
    expect(decimate(samples, 200)).toBe(samples);
  });

  it('decimates long series but keeps first and last sample', () => {
    const samples = series(Array.from({ length: 5000 }, (_, index) => index));
    const result = decimate(samples, 500);
    expect(result.length).toBeLessThanOrEqual(501);
    expect(result[0]).toBe(samples[0]);
    expect(result[result.length - 1]).toBe(samples[samples.length - 1]);
    expect(decimate(samples.slice(0, 10), 500)).toHaveLength(10);
  });
});
