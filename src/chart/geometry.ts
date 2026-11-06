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

/** Distance of the hold anchor in front of the next real sample (ms). */
const HOLD_LEAD_MS = 1000;

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
 * - A quiet stretch (no new sample) is *not* missing data: Home Assistant only
 *   stores changes, so the last value is held flat and steps to the next sample
 *   one second before it. This never breaks the line, whatever its length –
 *   previously such a stretch was drawn as a slow ramp, which suggested a change
 *   over hours that never happened.
 * - An explicit `unavailable` / `unknown` stretch is real information and may be
 *   shown as a hole. Its length is measured from the moment the entity became
 *   unavailable, *not* from the last valid sample: a quiet night followed by a
 *   one-minute dropout used to look like a multi-hour outage.
 * - With `gapMode: 'break'` only those explicit holes stay broken.
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

  /**
   * Holds the last valid value flat until `until` (the moment the entity went
   * unavailable) so the line ends where the measurement ended instead of
   * stopping at the last sample and looking like a longer outage.
   */
  const holdUntil = (until: number | null): void => {
    if (!current || !previous || until === null || until <= previous.t) return;
    const held: ChartSample = { t: until, v: previous.v };
    current.samples.push(held);
    // A hold is a known value, not an interpolation – never drawn dashed.
    current.bridged.push(false);
    previous = held;
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
     *    It is drawn as a step: hold the old value, then jump.
     * 2. The entity was explicitly `unavailable` / `unknown`. That is real
     *    information, so it may be shown as a hole when it lasts too long.
     *    Only the time the entity was *really* unavailable counts – the quiet
     *    stretch before it was measured and is not part of the hole.
     */
    const explicitHole = unavailableSince !== null;

    if (!explicitHole) {
      // Quiet stretch: hold the old value, step one second before the new one.
      const lead = Math.min(HOLD_LEAD_MS, delta / 2);
      current.samples.push({ t: sample.t - lead, v: previous.v });
      current.bridged.push(false);
      current.samples.push(sample);
      current.bridged.push(false);
      previous = sample;
      continue;
    }

    const holeStart = Math.max(previous.t, unavailableSince as number);
    const holeMs = sample.t - holeStart;
    const bridgeable = gapMode === 'connect' && holeMs <= maxGapMs;

    if (bridgeable) {
      if (holeStart > previous.t) {
        current.samples.push({ t: holeStart, v: previous.v });
        // Holding a known value up to the outage is not an interpolation.
        current.bridged.push(false);
        previous = { t: holeStart, v: previous.v };
      }
      interpolate(current, previous, sample, threshold);
      current.samples.push(sample);
      current.bridged.push(true);
      previous = sample;
      unavailableSince = null;
      continue;
    }

    // Real outage: end the visible line where the measurement ended.
    holdUntil(unavailableSince);
    flush();
    current = { samples: [sample], bridged: [] };
    previous = sample;
  }
  // The sensor was unavailable at the end of the window: stop where it stopped.
  if (trailingNull) holdUntil(unavailableSince);
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
 * Sorts samples, drops duplicated timestamps, ignores invalid values and clips
 * everything to the visible window.
 *
 * The last state *before* the window is kept as a carry-in sample at `start`:
 * a Home Assistant state stays valid until it changes, so on a quiet night this
 * is often the only value that describes the beginning of the window. Dropping
 * it (which happened as soon as the sliding window moved past its timestamp)
 * left the chart empty or started it with the wrong value.
 */
export function prepareSamples(
  samples: ChartSample[] | undefined,
  start?: number,
  end?: number
): ChartSample[] {
  if (!samples || !samples.length) return [];
  const sorted = [...samples].sort((a, b) => a.t - b.t);
  const result: ChartSample[] = [];
  let carry: ChartSample | null = null;
  for (const sample of sorted) {
    if (!Number.isFinite(sample.t)) continue;
    if (end !== undefined && sample.t > end) continue;
    const value = sample.v === null || !Number.isFinite(sample.v as number) ? null : (sample.v as number);
    if (start !== undefined && sample.t < start) {
      // Keep the newest state before the window – it is still valid at `start`.
      carry = { t: start, v: value };
      continue;
    }
    const previous = result[result.length - 1];
    if (previous && previous.t === sample.t) {
      result[result.length - 1] = { t: sample.t, v: value };
      continue;
    }
    result.push({ t: sample.t, v: value });
  }
  if (carry && start !== undefined && (!result.length || result[0].t > start)) {
    result.unshift(carry);
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
/**
 * How far (in pixel) the curve may leave the interval spanned by two measured
 * values. One pixel is below the 1.9 px stroke width, so rounding stays visible
 * while no reader can take the bulge for a measurement.
 */
export const MAX_OVERSHOOT = 1;

/**
 * Damping of the tangent at a turning point: 1 would be the plain mean of the
 * two slopes, smaller values keep the corner rounder but closer to the data.
 */
const TURN_DAMPING = 1;

/** Largest distance a cubic Hermite segment travels outside its end values. */
function overshoot(y0: number, y1: number, m0: number, m1: number, dx: number): number {
  if (!(dx > 0) || (y0 === y1 && m0 === 0 && m1 === 0)) return 0;
  const low = Math.min(y0, y1);
  const high = Math.max(y0, y1);
  let worst = 0;
  const steps = 16;
  for (let step = 1; step < steps; step++) {
    const t = step / steps;
    const u = 1 - t;
    // Cubic Hermite in its Bézier form (same control points as the path below).
    const c1 = y0 + (m0 * dx) / 3;
    const c2 = y1 - (m1 * dx) / 3;
    const y =
      u * u * u * y0 + 3 * u * u * t * c1 + 3 * u * t * t * c2 + t * t * t * y1;
    worst = Math.max(worst, low - y, y - high);
  }
  return worst;
}

/**
 * Tangents of the drawn curve (one per point) plus the horizontal gaps.
 *
 * Shared by `smoothPath` (one `d` for the whole curve) and `seriesPieces` (one
 * `d` per interval, used where every piece needs its own colour). Pulling the
 * maths out keeps both variants the *same* curve – a coloured curve must not
 * bulge differently from a single-colour one.
 */
function curveTangents(points: Point[]): { dx: number[]; tangents: number[] } {
  const count = points.length;
  const dx: number[] = [];
  const slope: number[] = [];
  for (let i = 0; i < count - 1; i++) {
    dx[i] = points[i + 1].x - points[i].x;
    slope[i] = dx[i] === 0 ? 0 : (points[i + 1].y - points[i].y) / dx[i];
  }

  // Tangents: the centred mean of the two neighbouring slopes, also at a
  // turning point. A hard zero there (the strictly monotone variant) turns every
  // turning point into a flat spot – with dense measurements, i.e. a small x
  // distance per sample, that reads as a staircase instead of a curve.
  const tangents: number[] = new Array(count).fill(0);
  tangents[0] = slope[0];
  tangents[count - 1] = slope[count - 2];
  for (let i = 1; i < count - 1; i++) {
    const before = slope[i - 1];
    const after = slope[i];
    tangents[i] = before * after <= 0 ? ((before + after) / 2) * TURN_DAMPING : (before + after) / 2;
  }
  // One gentle pass over the tangents: sensor noise otherwise makes every other
  // sample a turning point, and a chain of short wiggles is exactly what reads
  // as a hard, jagged line. The samples themselves stay untouched.
  const rough = tangents.slice();
  for (let i = 1; i < count - 1; i++) {
    tangents[i] = 0.25 * rough[i - 1] + 0.5 * rough[i] + 0.25 * rough[i + 1];
  }

  // Overshoot guard: a cubic with these tangents may leave the interval between
  // the two measured values. Rounding a corner is welcome, inventing a peak is
  // not, so the tangents are damped until the curve stays within
  // MAX_OVERSHOOT pixel of the measurements. Tangents are shared by both
  // neighbouring segments, hence the factor per point and the few passes.
  const factors: number[] = new Array(count).fill(1);
  for (let pass = 0; pass < 3; pass++) {
    const limits: number[] = new Array(count).fill(1);
    let changed = false;
    for (let i = 0; i < count - 1; i++) {
      if (dx[i] === 0) continue;
      const over = overshoot(
        points[i].y,
        points[i + 1].y,
        tangents[i] * factors[i],
        tangents[i + 1] * factors[i + 1],
        dx[i]
      );
      if (over > MAX_OVERSHOOT) {
        const scale = MAX_OVERSHOOT / over;
        limits[i] = Math.min(limits[i], scale);
        limits[i + 1] = Math.min(limits[i + 1], scale);
        changed = true;
      }
    }
    if (!changed) break;
    for (let i = 0; i < count; i++) factors[i] *= limits[i];
  }
  for (let i = 0; i < count; i++) tangents[i] *= factors[i];
  return { dx, tangents };
}

export function smoothPath(points: Point[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${round(points[0].x)} ${round(points[0].y)}`;
  if (points.length === 2) return linePath(points);

  const count = points.length;
  const { dx, tangents } = curveTangents(points);

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

/**
 * One interval of the drawn curve.
 *
 * `command` continues a path that already sits on `from`; joining the commands
 * of a run – `M from.x from.y` plus one command per piece – reproduces exactly
 * the `d` that `seriesPath` would have written for the same run.
 */
export interface CurvePiece {
  from: Point;
  to: Point;
  command: string;
}

/**
 * The same curve as `seriesPath`, cut into its intervals.
 *
 * Needed where a single `d` cannot carry the paint: the temperature bands give
 * every piece of the curve a colour of its own, and one path can only have one
 * `stroke`. The pieces use the identical tangents, so the assembled curve is not
 * a redrawn approximation.
 */
export function seriesPieces(points: Point[], smooth: boolean): CurvePiece[] {
  if (points.length < 2) return [];
  const pieces: CurvePiece[] = [];
  if (!smooth || points.length === 2) {
    for (let i = 1; i < points.length; i++) {
      const from = points[i - 1];
      const to = points[i];
      pieces.push({
        from,
        to,
        command: `L ${round(to.x)} ${round(to.y)}`,
      });
    }
    return pieces;
  }

  const { dx, tangents } = curveTangents(points);
  for (let i = 0; i < points.length - 1; i++) {
    const from = points[i];
    const to = points[i + 1];
    const firstX = from.x + dx[i] / 3;
    const firstY = from.y + (tangents[i] * dx[i]) / 3;
    const secondX = to.x - dx[i] / 3;
    const secondY = to.y - (tangents[i + 1] * dx[i]) / 3;
    pieces.push({
      from,
      to,
      command: `C ${round(firstX)} ${round(firstY)}, ${round(secondX)} ${round(secondY)}, ${round(
        to.x
      )} ${round(to.y)}`,
    });
  }
  return pieces;
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
 * turns into a sawtooth. A centred window removes the noise without changing the
 * shape of the trend. The window shrinks at both ends and never changes
 * timestamps, so the newest sample stays at "now" – its *value* is the average
 * of its neighbours, which is why the end dot is taken from the drawn segment.
 *
 * The window has to stay bounded: a moving average flattens real extrema, and
 * this chart exists to show what actually happened.
 */
export interface SmoothingOptions {
  /**
   * Largest time distance (ms) between two samples that may still be averaged.
   * Home Assistant only stores changes, so neighbours can be hours apart; a
   * value from three hours ago says nothing about the current jitter and would
   * smear a step into a ramp.
   */
  maxDeltaMs?: number;
}

export function movingAverage(
  samples: ChartSample[],
  window: number,
  options: SmoothingOptions = {}
): ChartSample[] {
  const size = Math.max(1, Math.round(window));
  if (size < 3 || samples.length < 3) return samples.map((sample) => ({ ...sample }));
  const radius = Math.floor(size / 2);
  const maxDelta = options.maxDeltaMs ?? Infinity;
  /*
   * Two decimals, never the grid of the sensor. Rounding the average back onto
   * the 0.1 °C grid of the measurement swallowed every difference between the
   * levels: a wider window produced the same curve, because 21.34 and 21.38 both
   * became 21.3 again. Two decimals keep the average an average; the drawn path
   * rounds its coordinates to two decimals anyway.
   */
  const precision = 2;
  return samples.map((sample, index) => {
    if (sample.v === null) return { ...sample };
    let sum = 0;
    let count = 0;
    for (let offset = -radius; offset <= radius; offset++) {
      const neighbour = samples[index + offset];
      if (!neighbour || neighbour.v === null) continue;
      if (offset !== 0 && Math.abs(neighbour.t - sample.t) > maxDelta) continue;
      sum += neighbour.v;
      count += 1;
    }
    if (!count) return { ...sample };
    return { t: sample.t, v: roundTo(sum / count, precision) };
  });
}

/**
 * How strongly the curve is averaged, selectable in the editor.
 *
 * `none` draws every measured value, `light` removes the sensor's own jitter,
 * `medium` and `strong` calm very noisy sensors down. Since "too flat" is a
 * matter of taste and of the sensor, this is a user setting instead of a fixed
 * constant.
 */
export type SmoothingLevel = 'none' | 'light' | 'medium' | 'strong';

export const SMOOTHING_LEVELS: readonly SmoothingLevel[] = [
  'none',
  'light',
  'medium',
  'strong',
] as const;

/** Default level: a light touch, the shape of the measurement stays visible. */
export const DEFAULT_SMOOTHING: SmoothingLevel = 'light';

/**
 * Half-width of the averaging window per level, in **minutes**.
 *
 * Time instead of a sample count: Home Assistant stores only changes, so "15
 * samples" is five minutes on a chatty sensor and two hours on a quiet one –
 * the levels then felt identical on some charts and far too strong on others.
 * A time span keeps the same level the same at 3 h, 6 h and 24 h.
 */
export const SMOOTHING_SPANS: Record<SmoothingLevel, number> = {
  none: 0,
  light: 10,
  medium: 30,
  strong: 60,
};

/** Hard ceiling for the window in samples (a 1-minute sensor on 7 days). */
const MAX_WINDOW = 121;

/** Number of decimals an averaged value is written with. */
function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/**
 * Window length in samples for a series whose samples sit `spacingMs` apart.
 *
 * Always odd so the average is centred; `1` means "no averaging at all". The
 * caller keeps runs under five samples untouched – there is no neighbour to
 * average with, only a value to invent.
 */
export function smoothingWindow(
  spacingMs: number,
  level: SmoothingLevel = DEFAULT_SMOOTHING
): number {
  const span = SMOOTHING_SPANS[level] ?? SMOOTHING_SPANS[DEFAULT_SMOOTHING];
  if (!(span > 0) || !Number.isFinite(spacingMs) || spacingMs <= 0) return 1;
  // At least the direct neighbour: a sensor that only reports every 20 minutes
  // must still react to "light" instead of being left completely untouched.
  const radius = Math.max(1, Math.round((span * 60_000) / spacingMs));
  return Math.min(MAX_WINDOW, radius * 2 + 1);
}

/**
 * Longest distance (ms) a neighbour may have and still be averaged in.
 *
 * The configured window has to fit inside this distance, otherwise the guard
 * silently shrinks it – that was the reason "medium" and "strong" drew the
 * same curve. A real stillstand (hours without a value) still ends the average,
 * so a measured step never turns into a ramp.
 */
export function smoothingGuard(window: number, spacingMs: number): number {
  if (!Number.isFinite(spacingMs) || spacingMs <= 0) return Infinity;
  const reach = Math.floor(Math.max(1, window) / 2) * spacingMs * 2;
  return Math.min(90 * 60_000, Math.max(2 * 60_000, reach));
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
 * Indices that survive decimation: the first and last sample plus the minimum
 * and the maximum of every bucket.
 *
 * Taking every n-th sample was cheaper, but it silently dropped peaks – a short
 * spike between two kept samples disappeared from a 24 h chart although it was
 * the most interesting thing in it. Min/max per bucket keeps the envelope.
 */
export function decimateIndices(samples: ChartSample[], maxPoints: number): number[] {
  const count = samples.length;
  if (count <= maxPoints || maxPoints < 3) return samples.map((_, index) => index);

  // Two points per bucket (low + high), plus the two fixed ends.
  const buckets = Math.max(1, Math.floor((maxPoints - 2) / 2));
  const kept = new Set<number>([0, count - 1]);
  const size = count / buckets;
  for (let bucket = 0; bucket < buckets; bucket++) {
    const from = Math.floor(bucket * size);
    const to = Math.min(count - 1, Math.floor((bucket + 1) * size) - 1);
    let lowIndex = -1;
    let highIndex = -1;
    let low = Infinity;
    let high = -Infinity;
    for (let index = from; index <= to; index++) {
      const value = samples[index].v;
      if (value === null || !Number.isFinite(value)) continue;
      if (value < low) {
        low = value;
        lowIndex = index;
      }
      if (value > high) {
        high = value;
        highIndex = index;
      }
    }
    if (lowIndex === -1) {
      // Nothing numeric in this bucket: keep one sample so the gap stays a gap.
      kept.add(from);
      continue;
    }
    kept.add(lowIndex);
    kept.add(highIndex);
  }
  return [...kept].sort((a, b) => a - b);
}

/**
 * Nearest *measured* sample to a timestamp.
 *
 * Hit-testing has to run on the measured series, never on the drawn support
 * points: those are smoothed, decimated and can carry interpolated bridge
 * samples. A tooltip that reports an invented value would be a lie.
 * Gaps (`null`) are skipped, so the nearest real measurement wins.
 */
export function nearestSample(samples: ChartSample[], time: number): ChartSample | null {
  const count = samples.length;
  if (!count || !Number.isFinite(time)) return null;
  // First index with `t >= time`.
  let low = 0;
  let high = count - 1;
  let index = count;
  while (low <= high) {
    const middle = (low + high) >> 1;
    if (samples[middle].t >= time) {
      index = middle;
      high = middle - 1;
    } else {
      low = middle + 1;
    }
  }
  let left = index - 1;
  let right = index;
  let leftSample: ChartSample | null = null;
  let rightSample: ChartSample | null = null;
  while (left >= 0) {
    if (samples[left].v !== null) {
      leftSample = samples[left];
      break;
    }
    left--;
  }
  while (right < count) {
    if (samples[right].v !== null) {
      rightSample = samples[right];
      break;
    }
    right++;
  }
  if (!leftSample) return rightSample;
  if (!rightSample) return leftSample;
  return Math.abs(leftSample.t - time) <= Math.abs(rightSample.t - time) ? leftSample : rightSample;
}

/** Lowest and highest measured sample of a series; `null` when nothing numeric is left. */
export function seriesExtremes(
  samples: ChartSample[]
): { min: ChartSample; max: ChartSample } | null {
  let min: ChartSample | null = null;
  let max: ChartSample | null = null;
  for (const sample of samples) {
    const value = sample.v;
    if (value === null || !Number.isFinite(value)) continue;
    if (!min || (min.v as number) > value) min = sample;
    if (!max || (max.v as number) < value) max = sample;
  }
  return min && max ? { min, max } : null;
}

/**
 * Reduces very long series to a manageable number of points while keeping the
 * first and last sample *and* the low/high of every bucket. Purely for
 * rendering performance.
 */
export function decimate(samples: ChartSample[], maxPoints: number): ChartSample[] {
  if (samples.length <= maxPoints || maxPoints < 3) return samples;
  return decimateIndices(samples, maxPoints).map((index) => samples[index]);
}

// ---------------------------------------------------------------- axis ticks

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

/** Steps the axis may use, from fine to coarse; up to a day they divide it evenly. */
export const ROUND_TICK_STEPS: readonly number[] = [
  30 * MINUTE,
  HOUR,
  2 * HOUR,
  3 * HOUR,
  4 * HOUR,
  6 * HOUR,
  12 * HOUR,
  24 * HOUR,
  // Week views: every second or third midnight.
  48 * HOUR,
  72 * HOUR,
];

export interface RoundTickOptions {
  /** Most labels the axis may show besides "now". */
  maxTicks: number;
  /** Time near "now" that stays free for its label, in ms. */
  endClearanceMs: number;
  /** Smallest time between two labels, in ms (keeps them apart on the axis). */
  minSpacingMs: number;
  /**
   * Offset of the displayed time zone at a moment, in ms (local = utc + offset).
   * Ticks fall on full local hours, so a Berlin chart reads 03:00, not 02:00.
   */
  offsetAt?: (time: number) => number;
}

/**
 * Ticks on round local times ("03:00", "06:00") instead of wherever the window
 * happens to start ("02:55"). Picks the finest step that still fits into
 * `maxTicks` labels; "now" is labelled separately by the chart.
 */
export function roundTimeTicks(start: number, end: number, options: RoundTickOptions): number[] {
  if (!(end > start) || options.maxTicks < 1) return [];
  const offsetAt = options.offsetAt ?? (() => 0);
  const last = end - Math.max(0, options.endClearanceMs);
  for (const step of ROUND_TICK_STEPS) {
    if (step < options.minSpacingMs) continue;
    const ticks: number[] = [];
    const startOffset = offsetAt(start);
    let local = Math.ceil((start + startOffset) / step) * step;
    for (let guard = 0; guard < 400; guard += 1) {
      // Re-evaluate the offset at the tick itself: a DST switch moves it.
      const time = local - offsetAt(local - startOffset);
      if (time > last) break;
      if (time >= start) ticks.push(time);
      local += step;
    }
    if (ticks.length >= 1 && ticks.length <= options.maxTicks) return ticks;
  }
  return [start];
}

// --------------------------------------------------------- setpoint caption

/** Linear interpolation of a polyline (sorted by x) at `x`, or `null` outside it. */
export function polylineYAt(points: Point[], x: number): number | null {
  if (!points.length) return null;
  if (x < points[0].x || x > points[points.length - 1].x) return null;
  for (let index = 1; index < points.length; index += 1) {
    const a = points[index - 1];
    const b = points[index];
    if (x <= b.x) {
      if (b.x === a.x) return Math.min(a.y, b.y);
      return a.y + ((x - a.x) / (b.x - a.x)) * (b.y - a.y);
    }
  }
  return points[points.length - 1].y;
}

export interface CaptionPlacement {
  side: 'left' | 'right';
  /** `true` = above the reference line, `false` = below it. */
  above: boolean;
  /** Free pixels between the caption box and the nearest curve. */
  clearance: number;
}

/** One horizontal piece of a step series: value `v` from `from` to `to`. */
export interface StepRun {
  from: number;
  to: number;
  v: number;
}

/**
 * Cuts a step series (each value holds until the next sample) to the window
 * `[start, end]`. Returns the contiguous parts: a `null` value (thermostat off,
 * unavailable) ends a part, so the drawn line has a gap there. The value in
 * force at `start` is the last sample at or before it.
 */
export function stepRuns(samples: ChartSample[], start: number, end: number): StepRun[][] {
  if (!(end > start)) return [];
  const sorted = [...samples].filter((sample) => Number.isFinite(sample.t)).sort((a, b) => a.t - b.t);
  const parts: StepRun[][] = [];
  let current: StepRun[] = [];
  const close = () => {
    if (current.length) parts.push(current);
    current = [];
  };
  for (let index = 0; index < sorted.length; index += 1) {
    const sample = sorted[index];
    const next = sorted[index + 1];
    const from = Math.max(sample.t, start);
    const to = Math.min(next ? next.t : end, end);
    if (to <= from) continue;
    const value = sample.v;
    if (value === null || !Number.isFinite(value)) {
      close();
      continue;
    }
    const previous = current[current.length - 1];
    if (previous && previous.v === value && previous.to === from) {
      previous.to = to;
    } else {
      if (previous && previous.to !== from) close();
      current.push({ from, to, v: value });
    }
  }
  close();
  return parts;
}

/** SVG path of step parts: horizontal runs joined by vertical risers. */
export function stepPath(
  parts: StepRun[][],
  x: (t: number) => number,
  y: (v: number) => number
): string {
  const round = (value: number) => Math.round(value * 100) / 100;
  return parts
    .map((runs) =>
      runs
        .map((run, index) => {
          const x0 = round(x(run.from));
          const x1 = round(x(run.to));
          const y0 = round(y(run.v));
          return index === 0 ? `M ${x0} ${y0} H ${x1}` : `V ${y0} H ${x1}`;
        })
        .join(' ')
    )
    .join(' ');
}

export interface CaptionOptions {
  /** y of the dashed reference line. */
  lineY: number;
  /**
   * For a stepped target line: its height at the left and right end. A side
   * without a value (a gap at that end) is not a candidate.
   */
  lineYBySide?: Partial<Record<'left' | 'right', number>>;
  /** Horizontal extent the caption may use. */
  left: number;
  right: number;
  /** Width and height of the caption text box. */
  width: number;
  height: number;
  /** Plot area the caption must stay inside. */
  top: number;
  bottom: number;
  /** Drawn curves (pixel polylines) and dots (with radius) to keep clear of. */
  curves: Point[][];
  dots?: Array<Point & { r: number }>;
  /** Side tried first; the other side wins only when it is clearly better. */
  preferredSide: 'left' | 'right';
}

/** Gap the caption keeps to the reference line. */
const CAPTION_LINE_GAP = 3;
/** Clearance that counts as "free": the curve does not touch the letters. */
const CAPTION_FREE = 4;

/**
 * Finds the spot for the "Soll" caption: one of the two ends of the reference
 * line, above or below it. The caption used to pick a side by the measured
 * values only, so it could sit right on the "now" dot. This looks at the drawn
 * curves and dots instead and takes the first candidate that keeps clear of
 * them – or, if none does, the one with the most room.
 */
export function placeSetpointCaption(options: CaptionOptions): CaptionPlacement {
  const other = options.preferredSide === 'right' ? 'left' : 'right';
  const candidates: Array<{ side: 'left' | 'right'; above: boolean }> = [
    { side: options.preferredSide, above: true },
    { side: other, above: true },
    { side: options.preferredSide, above: false },
    { side: other, above: false },
  ];
  let best: CaptionPlacement | null = null;
  for (const candidate of candidates) {
    const lineY = options.lineYBySide ? options.lineYBySide[candidate.side] : options.lineY;
    if (lineY === undefined || !Number.isFinite(lineY)) continue;
    const boxTop = candidate.above
      ? lineY - CAPTION_LINE_GAP - options.height
      : lineY + CAPTION_LINE_GAP;
    const boxBottom = boxTop + options.height;
    // A caption that would leave the plot is not a candidate.
    if (boxTop < options.top - 1 || boxBottom > options.bottom + 1) continue;
    const boxLeft = candidate.side === 'left' ? options.left : options.right - options.width;
    const boxRight = boxLeft + options.width;
    const clearance = boxClearance(boxLeft, boxRight, boxTop, boxBottom, options);
    const placement = { ...candidate, clearance };
    if (clearance >= CAPTION_FREE) return placement;
    if (!best || clearance > best.clearance) best = placement;
  }
  return best ?? { side: options.preferredSide, above: true, clearance: 0 };
}

function boxClearance(
  left: number,
  right: number,
  top: number,
  bottom: number,
  options: CaptionOptions
): number {
  let clearance = Number.POSITIVE_INFINITY;
  const distance = (y: number): number => (y < top ? top - y : y > bottom ? y - bottom : 0);
  for (const curve of options.curves) {
    for (let x = left; x <= right + 0.001; x += 2) {
      const y = polylineYAt(curve, Math.min(x, right));
      if (y !== null) clearance = Math.min(clearance, distance(y));
    }
  }
  for (const dot of options.dots ?? []) {
    const dx = dot.x < left ? left - dot.x : dot.x > right ? dot.x - right : 0;
    if (dx > dot.r + CAPTION_FREE) continue;
    clearance = Math.min(clearance, Math.max(0, distance(dot.y) - dot.r));
  }
  return clearance;
}
