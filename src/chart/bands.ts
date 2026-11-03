import { seriesPieces } from './geometry';
import type { Point } from './geometry';

/**
 * Colour bands for the temperature curve.
 *
 * The curve keeps one colour (the accent) unless the bands are switched on.
 * With bands on, the *same* curve gets a soft vertical gradient keyed to the
 * temperature axis: cold → normal → warm → hot. Because the gradient lives in
 * user space along the y axis, every point of the curve automatically picks the
 * colour of its own value – no per-segment splitting, no extra DOM nodes.
 *
 * The palette stays inside the colours the card already uses: a muted blue for
 * cold, the accent (mint) for normal, the amber of the window badge for warm and
 * the damped red of the heating flame for hot. Nothing here is configurable on
 * purpose – the thresholds are, the hues are not.
 */

export interface BandLimits {
  /** Below this value the curve is cold (blue). */
  coldBelow: number;
  /** From this value on it is warm (amber). */
  warmAbove: number;
  /** From this value on it is hot (red). */
  hotAbove: number;
}

export interface BandColors {
  cold: string;
  normal: string;
  warm: string;
  hot: string;
}

export interface BandStop {
  /** 0 = top of the temperature band (highest value), 1 = bottom (lowest). */
  offset: number;
  color: string;
}

/** Muted blue – the only new hue, kept as quiet as the indigo of the humidity. */
export const BAND_COLD = '#7FA6D9';
/** Amber of the window badge, a touch softer so it never shouts. */
export const BAND_WARM = '#EFB35F';
/** The damped red of the heating flame. */
export const BAND_HOT = '#D16A62';

export const DEFAULT_BAND_LIMITS: BandLimits = {
  coldBelow: 18,
  warmAbove: 24,
  hotAbove: 27,
};

/** Smallest distance between two thresholds, in °C. */
export const MIN_BAND_GAP = 1;

/**
 * Width of the change between two stages, in percent of the distance between
 * their thresholds.
 *
 * 100 % = the colour blends across the whole gap, so the curve flows from cold
 * to warm without a visible edge (the look of the weather card's temperature
 * ramp). 0 % keeps hard steps at the thresholds. The default is deliberately the
 * soft end: the bands are a reading aid, not a hard classification.
 */
export const DEFAULT_BAND_SOFTNESS = 100;

function toNumber(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

/**
 * Puts the three thresholds in order. A user may type 24 / 18 / 27 – the card
 * then sorts them instead of drawing nonsense (or nothing at all).
 */
export function orderBandLimits(
  cold: unknown,
  warm: unknown,
  hot: unknown,
  fallback: BandLimits = DEFAULT_BAND_LIMITS
): BandLimits {
  const values = [
    toNumber(cold, fallback.coldBelow),
    toNumber(warm, fallback.warmAbove),
    toNumber(hot, fallback.hotAbove),
  ].sort((a, b) => a - b);
  const first = values[0];
  const second = Math.max(values[1], first + MIN_BAND_GAP);
  const third = Math.max(values[2], second + MIN_BAND_GAP);
  return { coldBelow: first, warmAbove: second, hotAbove: third };
}

/** Flat band colour of one value – used for the end dot and the aria text. */
export function bandColorAt(value: number, limits: BandLimits, colors: BandColors): string {
  if (!Number.isFinite(value)) return colors.normal;
  if (value < limits.coldBelow) return colors.cold;
  if (value < limits.warmAbove) return colors.normal;
  if (value < limits.hotAbove) return colors.warm;
  return colors.hot;
}

/**
 * Gradient stops for the temperature band, ordered by offset.
 *
 * `domain` is the padded value range the chart draws (`[min, max]`). Instead of
 * an edge at every threshold, the colour blends across the whole gap between two
 * thresholds, so the chart reads as one flowing ramp rather than four blocks.
 * `softness` (0…100) scales that blending width.
 */
export function bandStops(
  domain: readonly [number, number],
  limits: BandLimits,
  colors: BandColors,
  softness: number = DEFAULT_BAND_SOFTNESS
): BandStop[] {
  const [min, max] = domain;
  const span = max - min;
  if (!(span > 0) || !Number.isFinite(span)) return [{ offset: 0, color: colors.normal }];

  const strength = Math.min(1, Math.max(0, (Number.isFinite(softness) ? softness : 100) / 100));
  // Each gap between two thresholds is shared by both of them: the cooler stage
  // reaches up by half the gap, the warmer one reaches down by the same amount.
  // At 100 % the two ramps meet exactly on the middle of the gap – the gradient
  // then runs without a single plateau, which is what makes the curve flow.
  // The outer sides stay pure, so blue and red keep their full presence.
  const lowerGap = Math.max(limits.warmAbove - limits.coldBelow, MIN_BAND_GAP);
  const upperGap = Math.max(limits.hotAbove - limits.warmAbove, MIN_BAND_GAP);
  const lowerRamp = (strength * lowerGap) / 2;
  const upperRamp = (strength * upperGap) / 2;

  // Stage of one value – used for the two ends of the visible axis, so a chart
  // that only ever shows warm values is not painted cold at its lower edge.
  const stageAt = (value: number): string =>
    value < limits.coldBelow
      ? colors.cold
      : value < limits.warmAbove
        ? colors.normal
        : value < limits.hotAbove
          ? colors.warm
          : colors.hot;

  const edges: Array<{ value: number; color: string }> = [
    { value: limits.coldBelow, color: colors.cold },
    { value: limits.coldBelow + lowerRamp, color: colors.normal },
    { value: limits.warmAbove - lowerRamp, color: colors.normal },
    { value: limits.warmAbove + upperRamp, color: colors.warm },
    { value: limits.hotAbove - upperRamp, color: colors.warm },
    { value: limits.hotAbove, color: colors.hot },
  ]
    // Ramps that start or end outside the drawn range have no visible edge.
    .filter((edge) => edge.value > min && edge.value < max)
    .concat([
      { value: min, color: stageAt(min) },
      { value: max, color: stageAt(max) },
    ])
    .sort((a, b) => a.value - b.value);

  const stops: BandStop[] = [];
  for (const edge of edges) {
    const offset = Number(((max - edge.value) / span).toFixed(4));
    const previous = stops[stops.length - 1];
    if (previous && Math.abs(previous.offset - offset) < 0.0005 && previous.color === edge.color) {
      // Same spot, same colour: one stop is enough.
      continue;
    }
    stops.push({ offset, color: edge.color });
  }
  // Value order is ascending, offset order therefore descending.
  stops.reverse();
  if (stops.length === 1) stops.push({ offset: 1, color: stops[0].color });
  stops[0].offset = 0;
  stops[stops.length - 1].offset = 1;
  return stops;
}

/** Steps a stroke run is quantised to before neighbouring runs are merged. */
export const BAND_LEVELS = 32;

function parseHex(color: string): [number, number, number] | null {
  const match = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color.trim());
  if (!match) return null;
  const value = match[1];
  const full =
    value.length === 3
      ? value
          .split('')
          .map((part) => part + part)
          .join('')
      : value;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

function toHex(channels: [number, number, number]): string {
  return `#${channels
    .map((channel) => Math.max(0, Math.min(255, Math.round(channel))).toString(16).padStart(2, '0'))
    .join('')}`;
}

/**
 * Colour at one offset of the gradient, interpolated the way SVG paints it.
 *
 * The chart cannot hand the stroke of the temperature curve to a gradient
 * (`stroke:url(#…)` is dropped by some WebViews – the curve then falls back to
 * one flat colour while the *area* keeps its gradient), so the curve is painted
 * in short runs of solid colour. This is the function that decides those
 * colours; it reads the very same stops the area gradient uses.
 */
export function bandColorAtOffset(stops: readonly BandStop[], offset: number): string {
  if (!stops.length) return '#ffffff';
  const clamped = Math.min(1, Math.max(0, Number.isFinite(offset) ? offset : 0));
  let before = stops[0];
  let after = stops[stops.length - 1];
  for (let index = 0; index < stops.length; index++) {
    if (stops[index].offset <= clamped) before = stops[index];
    if (stops[index].offset >= clamped) {
      after = stops[index];
      break;
    }
  }
  const start = parseHex(before.color);
  const end = parseHex(after.color);
  if (!start || !end) return before.color;
  const span = after.offset - before.offset;
  const ratio = span <= 0 ? 0 : (clamped - before.offset) / span;
  return toHex([
    start[0] + (end[0] - start[0]) * ratio,
    start[1] + (end[1] - start[1]) * ratio,
    start[2] + (end[2] - start[2]) * ratio,
  ]);
}

export interface StrokeRun {
  /** Path data of this run – a run is as many curve pieces as share a colour. */
  d: string;
  color: string;
}

/**
 * Cuts the curve into runs of equal colour.
 *
 * One path per *interval* would be hundreds of tiny elements (and hundreds of
 * round line caps), so neighbouring intervals are merged while their quantised
 * colour stays the same: a flat stretch becomes one path, a curve through the
 * whole ramp a handful of them. The steps between two runs are a 32nd of the
 * ramp, which is below what a 1.9 px line shows.
 *
 * `offsetAt` maps a y coordinate to the gradient offset (0 = top / hottest).
 */
export function bandStrokeRuns(
  points: readonly Point[],
  smooth: boolean,
  stops: readonly BandStop[],
  offsetAt: (y: number) => number
): StrokeRun[] {
  /*
   * Neighbouring runs overlap by this much. Two abutting paths are antialiased
   * separately, so their shared edge is drawn at ~50 % coverage twice – on a dark
   * card that leaves a dotted seam. A short straight stub in the direction of the
   * curve (it is C1 continuous there, so the stub is invisible) closes it.
   */
  const OVERLAP = 0.8;
  const pieces = seriesPieces([...points], smooth);
  const runs: StrokeRun[] = [];
  let current: { pieces: typeof pieces; level: number } | null = null;

  /** Point on the line a→b, `dist` px past `a` (negative = before `a`). */
  const alongPoint = (a: Point, b: Point, dist: number): string => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const length = Math.hypot(dx, dy);
    if (!(length > 0)) return roundPoint(a);
    return roundPoint({ x: a.x + (dx / length) * dist, y: a.y + (dy / length) * dist });
  };

  const push = (run: { pieces: typeof pieces; level: number }): void => {
    const first = run.pieces[0];
    const last = run.pieces[run.pieces.length - 1];
    const head = alongPoint(first.from, first.to, -OVERLAP);
    const tail = alongPoint(last.to, last.from, -OVERLAP);
    const body = run.pieces.map((piece) => piece.command).join(' ');
    runs.push({
      d: `M ${head} L ${roundPoint(first.from)} ${body} L ${tail}`,
      color: bandColorAtOffset(stops, run.level / BAND_LEVELS),
    });
  };

  for (const piece of pieces) {
    // The middle of the interval decides: a piece may cross one level, it never
    // crosses more than a couple of them.
    const middle = (piece.from.y + piece.to.y) / 2;
    const level = Math.round(Math.min(1, Math.max(0, offsetAt(middle))) * BAND_LEVELS);
    if (current && current.level === level) {
      current.pieces.push(piece);
      continue;
    }
    if (current) push(current);
    current = { pieces: [piece], level };
  }
  if (current) push(current);
  return runs;
}

function roundPoint(point: Point): string {
  const format = (value: number): string =>
    Number.isFinite(value) ? (Math.round(value * 100) / 100).toString() : '0';
  return `${format(point.x)} ${format(point.y)}`;
}
