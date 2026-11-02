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
