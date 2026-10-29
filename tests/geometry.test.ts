import { describe, expect, it } from 'vitest';
import {
  areaPath,
  bandColorFor,
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
  padDomain,
  seriesPath,
  smoothPath,
  temperatureGradientStops,
  tickCountForWidth,
  timeTicks,
  verticalFadeStops,
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

  it('connects a hole with interpolated points', () => {
    // 6 minute cadence, then a 90 minute hole.
    const samples = [at(1, 20), at(1.1, 20.2), at(2.6, 21), at(2.7, 21.1)];
    const segments = buildSegments(samples, {
      rangeMs: end - start,
      start,
      end,
      gapMode: 'connect',
      maxGapMs: 2 * hour,
    });
    expect(segments).toHaveLength(1);
    const { samples: values, bridged } = segments[0];
    expect(values.length).toBeGreaterThan(samples.length);
    expect(bridged.some(Boolean)).toBe(true);
    // Interpolated values stay between the two measured values.
    for (const sample of values) {
      expect(sample.v as number).toBeGreaterThanOrEqual(20);
      expect(sample.v as number).toBeLessThanOrEqual(21.1);
    }
    // Timestamps stay sorted.
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
    expect(segments[0].bridged.some(Boolean)).toBe(true);

    const values = segments[0].samples.map((sample) => sample.v as number);
    expect(Math.min(...values)).toBeGreaterThanOrEqual(20);
    expect(Math.max(...values)).toBeLessThanOrEqual(20.3);
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
    const samples = [at(1, 20), at(1.1, 20.2), at(2.6, 21), at(2.7, 21.1)];
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
      { t: 100, v: 1 },
      { t: 200, v: 2 },
      { t: 300, v: 3 },
      { t: 400, v: null },
    ]);
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

describe('gradients', () => {
  const colors = { cool: '#00f', comfort: '#0f0', warm: '#ff0', hot: '#f00' };
  const thresholds = { cool: 19, warm: 25, hot: 28 };

  it('orders stops according to the temperature bands', () => {
    const stops = temperatureGradientStops({
      top: 0,
      bottom: 100,
      domain: [15, 32],
      thresholds,
      colors,
    });
    expect(stops[0].color).toBe(colors.hot);
    expect(stops[stops.length - 1].color).toBe(colors.cool);
    for (let i = 1; i < stops.length; i++) {
      expect(stops[i].offset).toBeGreaterThan(stops[i - 1].offset);
    }
    const colorsSeen = new Set(stops.map((stop) => stop.color));
    expect(colorsSeen).toEqual(new Set([colors.cool, colors.comfort, colors.warm, colors.hot]));
  });

  it('fades the area fill from top to bottom', () => {
    const stops = temperatureGradientStops({
      top: 0,
      bottom: 100,
      domain: [15, 32],
      thresholds,
      colors,
      opacityTop: 0.3,
      opacityBottom: 0,
    });
    expect(stops[0].opacity).toBeCloseTo(0.3, 5);
    expect(stops[stops.length - 1].opacity).toBeCloseTo(0, 5);
  });

  it('ignores thresholds outside the visible domain', () => {
    const stops = temperatureGradientStops({
      top: 0,
      bottom: 100,
      domain: [30, 40],
      thresholds,
      colors,
    });
    expect(stops[0].color).toBe(colors.hot);
    expect(stops[stops.length - 1].color).toBe(colors.hot);
  });

  it('creates simple vertical fades', () => {
    expect(verticalFadeStops('#0f0', 0.4, 0)).toEqual([
      { offset: 0, color: '#0f0', opacity: 0.4 },
      { offset: 1, color: '#0f0', opacity: 0 },
    ]);
  });

  it('picks band colours for single values', () => {
    expect(bandColorFor(10, thresholds, colors)).toBe(colors.cool);
    expect(bandColorFor(21, thresholds, colors)).toBe(colors.comfort);
    expect(bandColorFor(26, thresholds, colors)).toBe(colors.warm);
    expect(bandColorFor(30, thresholds, colors)).toBe(colors.hot);
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

  it('decimates long series but keeps first and last sample', () => {
    const samples = series(Array.from({ length: 5000 }, (_, index) => index));
    const result = decimate(samples, 500);
    expect(result.length).toBeLessThanOrEqual(501);
    expect(result[0]).toBe(samples[0]);
    expect(result[result.length - 1]).toBe(samples[samples.length - 1]);
    expect(decimate(samples.slice(0, 10), 500)).toHaveLength(10);
  });
});
