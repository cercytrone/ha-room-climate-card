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
 * `domain` is the padded value range the chart draws (`[min, max]`). Each
 * threshold becomes a short ramp instead of a hard edge, which is what makes the
 * result look like one flowing colour change rather than four blocks.
 */
export function bandStops(
  domain: readonly [number, number],
  limits: BandLimits,
  colors: BandColors
): BandStop[] {
  const [min, max] = domain;
  const span = max - min;
  if (!(span > 0) || !Number.isFinite(span)) return [{ offset: 0, color: colors.normal }];

  const gap = Math.min(
    Math.max(limits.warmAbove - limits.coldBelow, MIN_BAND_GAP),
    Math.max(limits.hotAbove - limits.warmAbove, MIN_BAND_GAP)
  );
  // Half the transition width: at most a quarter of the tighter gap, so the
  // plateaus always stay visible, and at most 6 % of the drawn range, so the
  // change looks like one flowing colour instead of a cut.
  const half = Math.max(0.05, Math.min(gap / 4, span * 0.06));

  const edges: Array<{ value: number; color: string }> = [
    { value: min, color: colors.cold },
    { value: limits.coldBelow - half, color: colors.cold },
    { value: limits.coldBelow + half, color: colors.normal },
    { value: limits.warmAbove - half, color: colors.normal },
    { value: limits.warmAbove + half, color: colors.warm },
    { value: limits.hotAbove - half, color: colors.warm },
    { value: limits.hotAbove + half, color: colors.hot },
    { value: max, color: colors.hot },
  ]
    .map((entry) => ({
      value: Math.min(max, Math.max(min, entry.value)),
      color: entry.color,
    }))
    .sort((a, b) => a.value - b.value);

  const stops: BandStop[] = [];
  for (const edge of edges) {
    const offset = Number(((max - edge.value) / span).toFixed(4));
    const previous = stops[stops.length - 1];
    if (previous && Math.abs(previous.offset - offset) < 0.0005) {
      // Two stops on the same spot: the later one wins, so a ramp keeps its
      // end colour instead of adding a duplicate stop.
      previous.color = edge.color;
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
