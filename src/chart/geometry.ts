/**
 * Pure geometry helpers for the climate chart.
 * Kept free of DOM / Lit imports so they can be unit tested and reused by the
 * documentation renderer.
 */

export interface ChartSample {
  /** Unix timestamp in milliseconds. */
  t: number;
  /** `null` marks a gap (unavailable / non numeric state). */
  v: number | null;
}

export interface Point {
  x: number;
  y: number;
}

export interface SeriesLike {
  samples: ChartSample[];
}

const round = (value: number): string => {
  if (!Number.isFinite(value)) return '0';
  return (Math.round(value * 100) / 100).toString();
};

export function linearScale(domain: [number, number], range: [number, number]) {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const span = d1 - d0;
  if (!Number.isFinite(span) || span === 0) {
    const middle = (r0 + r1) / 2;
    return () => middle;
  }
  return (value: number): number => r0 + ((value - d0) / span) * (r1 - r0);
}

export function extent(values: number[]): [number, number] | null {
  let min = Infinity;
  let max = -Infinity;
  for (const value of values) {
    if (!Number.isFinite(value)) continue;
    if (value < min) min = value;
    if (value > max) max = value;
  }
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null;
  return [min, max];
}

export interface DomainOptions {
  /** Smallest allowed span so a flat line is not stretched into a wild curve. */
  minSpan?: number;
  /** Relative padding on both ends (0.12 = 12%). */
  padding?: number;
}

export function padDomain(min: number, max: number, options: DomainOptions = {}): [number, number] {
  const { minSpan = 0.5, padding = 0.12 } = options;
  let lower = min;
  let upper = max;
  if (upper - lower < minSpan) {
    const center = (upper + lower) / 2;
    lower = center - minSpan / 2;
    upper = center + minSpan / 2;
  }
  const pad = (upper - lower) * padding;
  return [lower - pad, upper + pad];
}

/** Median interval between consecutive samples (ms). */
export function medianInterval(samples: ChartSample[]): number {
  const deltas: number[] = [];
  for (let i = 1; i < samples.length; i++) {
    const delta = samples[i].t - samples[i - 1].t;
    if (delta > 0) deltas.push(delta);
  }
  if (!deltas.length) return 0;
  deltas.sort((a, b) => a - b);
  const middle = Math.floor(deltas.length / 2);
  return deltas.length % 2 ? deltas[middle] : (deltas[middle - 1] + deltas[middle]) / 2;
}

/** Linear-interpolated percentile of the intervals between samples. */
export function intervalPercentile(samples: ChartSample[], fraction: number): number {
  const deltas: number[] = [];
  for (let i = 1; i < samples.length; i++) {
    const delta = samples[i].t - samples[i - 1].t;
    if (delta > 0) deltas.push(delta);
  }
  if (!deltas.length) return 0;
  deltas.sort((a, b) => a - b);
  const position = Math.min(1, Math.max(0, fraction)) * (deltas.length - 1);
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  if (lower === upper) return deltas[lower];
  return deltas[lower] + (deltas[upper] - deltas[lower]) * (position - lower);
}

export interface GapThresholdOptions {
  /** Lower bound for a gap; smaller holes are just normal sampling jitter. */
  minMs?: number;
  /** Upper bound so a single long hole cannot swallow the whole chart. */
  maxMs?: number;
}

/**
 * Customary spacing of a series. Home Assistant only stores state *changes*, so
 * a sensor that reports every minute can still be silent for twenty minutes
 * without being broken. The median is robust against a few long holes; the
 * absolute floor keeps the threshold sane for fast reporting sensors.
 */
export function gapThreshold(
  samples: ChartSample[],
  rangeMs: number,
  options: GapThresholdOptions = {}
): number {
  const spacing = medianInterval(samples);
  const adaptive = spacing > 0 ? spacing * 2.5 : 0;
  const minMs = options.minMs ?? Math.max(rangeMs / 40, 5 * 60 * 1000);
  const maxMs = options.maxMs ?? Math.max(minMs, rangeMs / 3);
  return Math.min(maxMs, Math.max(adaptive, minMs));
}

export interface Segments {
  /** Continuous runs of numeric samples, ready for path building. */
  runs: ChartSample[][];
}

/** Splits a series into continuous numeric runs, honouring null markers and time gaps. */
export function buildRuns(samples: ChartSample[], rangeMs: number): Segments {
  const threshold = gapThreshold(samples, rangeMs);
  const runs: ChartSample[][] = [];
  let current: ChartSample[] = [];
  let previous: ChartSample | null = null;
  for (const sample of samples) {
    if (sample.v === null || !Number.isFinite(sample.v)) {
      if (current.length) runs.push(current);
      current = [];
      previous = null;
      continue;
    }
    if (previous && sample.t - previous.t > threshold) {
      if (current.length) runs.push(current);
      current = [];
    }
    current.push(sample);
    previous = sample;
  }
  if (current.length) runs.push(current);
  return { runs };
}

export type GapMode = 'connect' | 'break';

export interface SegmentOptions {
  /** Width of the visible time window in ms. */
  rangeMs: number;
  /** Window bounds; when given, the outer samples are held to the edges. */
  start?: number;
  end?: number;
  /** `connect` interpolates small holes, `break` keeps them visible. */
  gapMode?: GapMode;
  /** Largest hole that will be interpolated (ms). */
  maxGapMs?: number;
}

export interface SeriesSegment {
  samples: ChartSample[];
  /** `bridged[i]` marks the edge samples[i-1] → samples[i] as interpolated. */
  bridged: boolean[];
}

const MAX_BRIDGE_POINTS = 8;

function interpolate(
  target: SeriesSegment,
  from: ChartSample,
  to: ChartSample,
  threshold: number
): void {
  const span = to.t - from.t;
  const fromValue = from.v as number;
  const toValue = to.v as number;
  const steps = Math.min(
    MAX_BRIDGE_POINTS,
    Math.max(1, Math.round(span / Math.max(threshold / 2, 60_000)))
  );
  // Intermediate anchors only – the caller appends the real end sample.
  for (let step = 1; step < steps; step++) {
    const ratio = step / steps;
    target.samples.push({
      t: Math.round(from.t + span * ratio),
      v: fromValue + (toValue - fromValue) * ratio,
    });
    target.bridged.push(true);
  }
}

/**
 * Turns samples into renderable segments.
 *
 * - Holes shorter than `maxGapMs` are interpolated linearly, so the chart is
 *   continuous while it still only uses values that were actually measured at
 *   both ends of the hole.
 * - Longer holes are kept broken (never invent hours of data).
 * - The first and last sample are held to the window edges, because a Home
 *   Assistant state is valid until it changes.
 */
export function buildSegments(
  samples: ChartSample[],
  options: SegmentOptions
): SeriesSegment[] {
  const { rangeMs, start, end } = options;
  const gapMode: GapMode = options.gapMode ?? 'connect';
  const threshold = gapThreshold(samples, rangeMs);
  const maxGapMs = options.maxGapMs ?? rangeMs / 4;

  const segments: SeriesSegment[] = [];
  let current: SeriesSegment | null = null;
  let previous: ChartSample | null = null;
  /** Start of an explicit `unavailable` / `unknown` stretch since `previous`. */
  let unavailableSince: number | null = null;
  let leadingNull = false;
  let trailingNull = false;

  const flush = () => {
    if (current && current.samples.length) segments.push(current);
    current = null;
    previous = null;
    unavailableSince = null;
  };

  for (const sample of samples) {
    if (sample.v === null || !Number.isFinite(sample.v)) {
      if (!previous) leadingNull = true;
      unavailableSince = unavailableSince ?? sample.t;
      trailingNull = true;
      continue;
    }
    trailingNull = false;

    if (!previous || !current) {
      current = { samples: [sample], bridged: [] };
      previous = sample;
      unavailableSince = null;
      continue;
    }

    const delta = sample.t - previous.t;

    if (delta <= threshold && unavailableSince === null) {
      current.samples.push(sample);
      current.bridged.push(false);
      previous = sample;
      continue;
    }

    /*
     * Two very different situations produce a hole in the series:
     *
     * 1. The value simply did not change. Home Assistant only stores state
     *    changes, so there is no sample – but the value is known to be
     *    unchanged until the next one. This is *not* missing data and must
     *    never break the line (the HA frontend chart does not break either).
     * 2. The entity was explicitly `unavailable` / `unknown`. That is real
     *    information, so it may be shown as a hole when it lasts too long.
     */
    const explicitHole = unavailableSince !== null;
    const bridgeable =
      gapMode === 'connect' && (!explicitHole || delta <= maxGapMs);

    if (bridgeable) {
      interpolate(current, previous, sample, threshold);
      current.samples.push(sample);
      current.bridged.push(true);
      previous = sample;
      unavailableSince = null;
      continue;
    }

    flush();
    current = { samples: [sample], bridged: [] };
    previous = sample;
  }
  flush();

  if (!segments.length) return segments;

  const first = segments[0];
  if (!leadingNull && start !== undefined && first.samples[0].t > start) {
    first.samples.unshift({ t: start, v: first.samples[0].v });
    first.bridged.unshift(false);
  }

  if (trailingNull) {
    // The sensor was unavailable at the end of the window: do not extend.
    return segments;
  }

  const last = segments[segments.length - 1];
  const lastSample = last.samples[last.samples.length - 1];
  if (end !== undefined && lastSample.t < end) {
    last.samples.push({ t: end, v: lastSample.v });
    last.bridged.push(false);
  }

  return segments;
}

/**
 * Sorts samples, drops duplicated timestamps, ignores invalid values and
 * removes everything outside the visible window. Live data can contain all of
 * these – e.g. `include_start_time_state` returns a sample at (or slightly
 * before) the window start, which would otherwise be drawn off canvas.
 */
export function prepareSamples(
  samples: ChartSample[] | undefined,
  start?: number,
  end?: number
): ChartSample[] {
  if (!samples || !samples.length) return [];
  const sorted = [...samples].sort((a, b) => a.t - b.t);
  const result: ChartSample[] = [];
  for (const sample of sorted) {
    if (!Number.isFinite(sample.t)) continue;
    if (start !== undefined && sample.t < start) continue;
    if (end !== undefined && sample.t > end) continue;
    const value = sample.v === null || !Number.isFinite(sample.v as number) ? null : (sample.v as number);
    const previous = result[result.length - 1];
    if (previous && previous.t === sample.t) {
      result[result.length - 1] = { t: sample.t, v: value };
      continue;
    }
    result.push({ t: sample.t, v: value });
  }
  return result;
}

/** Splits a segment into sub-paths at interpolated edges (used for dashed gaps). */
export function splitAtBridges(segment: SeriesSegment): ChartSample[][] {
  if (!segment.bridged.some(Boolean)) return [segment.samples];
  const parts: ChartSample[][] = [];
  let current: ChartSample[] = [segment.samples[0]];
  for (let i = 1; i < segment.samples.length; i++) {
    current.push(segment.samples[i]);
    if (segment.bridged[i]) {
      parts.push(current);
      current = [segment.samples[i]];
    }
  }
  if (current.length > 1) parts.push(current);
  return parts;
}

export function projectRun(
  run: ChartSample[],
  x: (value: number) => number,
  y: (value: number) => number
): Point[] {
  return run.map((sample) => ({ x: x(sample.t), y: y(sample.v as number) }));
}

/** Straight polyline path. */
export function linePath(points: Point[]): string {
  if (!points.length) return '';
  let path = `M ${round(points[0].x)} ${round(points[0].y)}`;
  for (let i = 1; i < points.length; i++) {
    path += ` L ${round(points[i].x)} ${round(points[i].y)}`;
  }
  return path;
}

/**
 * Monotone cubic interpolation (Fritsch–Carlson). Unlike Catmull-Rom or a
 * generic spline it never overshoots, so the curve stays within the measured
 * values and does not invent peaks.
 */
export function smoothPath(points: Point[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${round(points[0].x)} ${round(points[0].y)}`;
  if (points.length === 2) return linePath(points);

  const count = points.length;
  const dx: number[] = [];
  const slope: number[] = [];
  for (let i = 0; i < count - 1; i++) {
    dx[i] = points[i + 1].x - points[i].x;
    slope[i] = dx[i] === 0 ? 0 : (points[i + 1].y - points[i].y) / dx[i];
  }

  const tangents: number[] = new Array(count).fill(0);
  tangents[0] = slope[0];
  tangents[count - 1] = slope[count - 2];
  for (let i = 1; i < count - 1; i++) {
    if (slope[i - 1] * slope[i] <= 0) {
      tangents[i] = 0;
    } else {
      tangents[i] = (slope[i - 1] + slope[i]) / 2;
    }
  }
  for (let i = 0; i < count - 1; i++) {
    if (slope[i] === 0) {
      tangents[i] = 0;
      tangents[i + 1] = 0;
      continue;
    }
    const a = tangents[i] / slope[i];
    const b = tangents[i + 1] / slope[i];
    const sum = a * a + b * b;
    if (sum > 9) {
      const tau = 3 / Math.sqrt(sum);
      tangents[i] = tau * a * slope[i];
      tangents[i + 1] = tau * b * slope[i];
    }
  }

  let path = `M ${round(points[0].x)} ${round(points[0].y)}`;
  for (let i = 0; i < count - 1; i++) {
    const firstX = points[i].x + dx[i] / 3;
    const firstY = points[i].y + (tangents[i] * dx[i]) / 3;
    const secondX = points[i + 1].x - dx[i] / 3;
    const secondY = points[i + 1].y - (tangents[i + 1] * dx[i]) / 3;
    path += ` C ${round(firstX)} ${round(firstY)}, ${round(secondX)} ${round(secondY)}, ${round(
      points[i + 1].x
    )} ${round(points[i + 1].y)}`;
  }
  return path;
}

export function seriesPath(points: Point[], smooth: boolean): string {
  return smooth ? smoothPath(points) : linePath(points);
}

export function areaPath(points: Point[], baseline: number, smooth: boolean): string {
  if (!points.length) return '';
  const line = seriesPath(points, smooth);
  const first = points[0];
  const last = points[points.length - 1];
  return `${line} L ${round(last.x)} ${round(baseline)} L ${round(first.x)} ${round(baseline)} Z`;
}

/**
 * Centred moving average over one contiguous run.
 *
 * History sensors report to one decimal and often jitter; drawn 1:1 the curve
 * turns into a sawtooth. A short centred window removes the noise without
 * changing the shape of the trend. The window shrinks at both ends and never
 * changes timestamps, so the newest sample still sits exactly at "now".
 *
 * The window has to stay small: a moving average flattens real extrema, and
 * this chart exists to show what actually happened.
 */
export function movingAverage(samples: ChartSample[], window: number): ChartSample[] {
  const size = Math.max(1, Math.round(window));
  if (size < 3 || samples.length < 3) return samples.map((sample) => ({ ...sample }));
  const radius = Math.floor(size / 2);
  return samples.map((sample, index) => {
    if (sample.v === null) return { ...sample };
    let sum = 0;
    let count = 0;
    for (let offset = -radius; offset <= radius; offset++) {
      const neighbour = samples[index + offset];
      if (!neighbour || neighbour.v === null) continue;
      sum += neighbour.v;
      count += 1;
    }
    if (!count) return { ...sample };
    // Keep one decimal – exactly what the sensor reports; further digits are
    // noise that only makes the path data longer.
    return { t: sample.t, v: Math.round((sum / count) * 10) / 10 };
  });
}

/**
 * Window length for a run of `count` samples: 3 points for short runs, up to 9
 * for dense ones. Always odd so the average is centred.
 */
export function smoothingWindow(count: number): number {
  if (count < 5) return 1;
  if (count < 20) return 3;
  if (count < 60) return 5;
  if (count < 160) return 7;
  return 9;
}

export function timeTicks(start: number, end: number, count: number): number[] {
  if (!(end > start) || count < 2) return [];
  const ticks: number[] = [];
  for (let i = 0; i < count; i++) {
    ticks.push(start + ((end - start) * i) / (count - 1));
  }
  return ticks;
}

/** Evenly spaced tick count based on available width. */
export function tickCountForWidth(width: number): number {
  if (width < 180) return 2;
  if (width < 300) return 3;
  if (width < 460) return 4;
  return 5;
}

/**
 * Reduces very long series to a manageable number of points while keeping the
 * first and last sample. Purely for rendering performance.
 */
export function decimate(samples: ChartSample[], maxPoints: number): ChartSample[] {
  if (samples.length <= maxPoints || maxPoints < 3) return samples;
  const stride = Math.ceil(samples.length / maxPoints);
  const result: ChartSample[] = [];
  for (let i = 0; i < samples.length; i += stride) result.push(samples[i]);
  const last = samples[samples.length - 1];
  if (result[result.length - 1] !== last) result.push(last);
  return result;
}
