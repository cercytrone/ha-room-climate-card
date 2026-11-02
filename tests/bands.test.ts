import { describe, expect, it } from 'vitest';
import {
  BAND_COLD,
  BAND_HOT,
  BAND_WARM,
  DEFAULT_BAND_LIMITS,
  MIN_BAND_GAP,
  bandColorAt,
  bandStops,
  orderBandLimits,
} from '../src/chart/bands';

const colors = { cold: BAND_COLD, normal: '#4FD1A5', warm: BAND_WARM, hot: BAND_HOT };

describe('band limits', () => {
  it('keeps a correct order untouched', () => {
    expect(orderBandLimits(18, 24, 27)).toEqual({ coldBelow: 18, warmAbove: 24, hotAbove: 27 });
  });

  it('sorts swapped thresholds instead of drawing nonsense', () => {
    expect(orderBandLimits(27, 24, 18)).toEqual({ coldBelow: 18, warmAbove: 24, hotAbove: 27 });
  });

  it('pushes thresholds apart when they are typed on top of each other', () => {
    const limits = orderBandLimits(20, 20, 20);
    expect(limits.coldBelow).toBe(20);
    expect(limits.warmAbove - limits.coldBelow).toBeGreaterThanOrEqual(MIN_BAND_GAP);
    expect(limits.hotAbove - limits.warmAbove).toBeGreaterThanOrEqual(MIN_BAND_GAP);
  });

  it('falls back to the defaults for values that are not numbers', () => {
    expect(orderBandLimits(Number.NaN, undefined, 'x' as unknown as number)).toEqual(
      DEFAULT_BAND_LIMITS
    );
  });
});

describe('band colours', () => {
  const limits = { coldBelow: 18, warmAbove: 24, hotAbove: 27 };

  it('names the stage of a value, with the threshold belonging to the warmer stage', () => {
    expect(bandColorAt(17.9, limits, colors)).toBe(BAND_COLD);
    expect(bandColorAt(18, limits, colors)).toBe(colors.normal);
    expect(bandColorAt(23.9, limits, colors)).toBe(colors.normal);
    expect(bandColorAt(24, limits, colors)).toBe(BAND_WARM);
    expect(bandColorAt(27, limits, colors)).toBe(BAND_HOT);
  });

  it('uses the normal colour for values that are not numbers', () => {
    expect(bandColorAt(Number.NaN, limits, colors)).toBe(colors.normal);
  });
});

describe('band gradient', () => {
  const limits = { coldBelow: 18, warmAbove: 24, hotAbove: 27 };

  it('runs from hot at the top to cold at the bottom', () => {
    const stops = bandStops([16, 29], limits, colors);
    expect(stops[0].offset).toBe(0);
    expect(stops[0].color).toBe(BAND_HOT);
    expect(stops[stops.length - 1].offset).toBe(1);
    expect(stops[stops.length - 1].color).toBe(BAND_COLD);
  });

  it('keeps the offsets ascending and inside 0…1', () => {
    const stops = bandStops([10, 35], limits, colors);
    for (let index = 1; index < stops.length; index++) {
      expect(stops[index].offset).toBeGreaterThanOrEqual(stops[index - 1].offset);
    }
    for (const stop of stops) {
      expect(stop.offset).toBeGreaterThanOrEqual(0);
      expect(stop.offset).toBeLessThanOrEqual(1);
    }
  });

  it('always contains every stage that lies inside the domain', () => {
    const seen = bandStops([10, 35], limits, colors).map((stop) => stop.color);
    expect(seen).toContain(BAND_COLD);
    expect(seen).toContain(colors.normal);
    expect(seen).toContain(BAND_WARM);
    expect(seen).toContain(BAND_HOT);
  });

  it('collapses to one stage when every threshold lies outside the domain', () => {
    const stops = bandStops([30, 32], limits, colors);
    expect(stops).toHaveLength(2);
    expect(stops.every((stop) => stop.color === BAND_HOT)).toBe(true);
  });

  it('survives a domain without span', () => {
    expect(bandStops([21, 21], limits, colors)).toEqual([{ offset: 0, color: colors.normal }]);
  });

  it('keeps the transitions narrower than the plateaus, so each stage stays readable', () => {
    // ~5.6 °C wide ramps at most: never more than a quarter of the tighter gap.
    const stops = bandStops([10, 35], limits, colors);
    const ramp = (() => {
      const pair = stops.findIndex((stop, index) => {
        const next = stops[index + 1];
        return next !== undefined && next.color !== stop.color;
      });
      const next = stops[pair + 1];
      return Math.abs(next.offset - stops[pair].offset);
    })();
    expect(ramp).toBeLessThan(0.25);
  });
});
