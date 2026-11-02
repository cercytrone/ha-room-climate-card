import { describe, expect, it } from 'vitest';
import {
  BAND_COLD,
  BAND_HOT,
  BAND_WARM,
  DEFAULT_BAND_LIMITS,
  DEFAULT_BAND_SOFTNESS,
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

  it('defaults to the fully continuous ramp', () => {
    expect(DEFAULT_BAND_SOFTNESS).toBe(100);
    const stops = bandStops([10, 35], limits, colors);
    expect(stops).toEqual(bandStops([10, 35], limits, colors, 100));
  });

  it('at 0 % keeps hard steps exactly on the thresholds', () => {
    const stops = bandStops([10, 35], limits, colors, 0);
    // Two stops per threshold on the same offset: that is what makes a hard
    // edge – a single stop would let the gradient blend across the whole band.
    const pairs = stops
      .map((stop) => stop.offset)
      .sort((a, b) => a - b)
      .reduce<number[]>((acc, offset) => (acc[acc.length - 1] === offset ? acc : [...acc, offset]), []);
    expect(pairs).toEqual([0, 0.32, 0.44, 0.68, 1]);
    expect(stops).toHaveLength(8);
  });

  it('at 100 % blends across the whole gap, so no plateau is left', () => {
    const stops = bandStops([10, 35], limits, colors, 100);
    // cold → normal ends on 21 °C, normal → warm on 25.5 °C, then hot from 27 °C.
    expect(stops.map((stop) => [stop.offset, stop.color])).toEqual([
      [0, BAND_HOT],
      [0.32, BAND_HOT],
      [0.38, BAND_WARM],
      [0.56, colors.normal],
      [0.68, BAND_COLD],
      [1, BAND_COLD],
    ]);
  });

  it('widens the ramp monotonically with the softness setting', () => {
    /** Width in °C of the mixed zone between “cold” and “normal”. */
    const blendWidth = (softness: number): number => {
      const stops = [...bandStops([10, 35], limits, colors, softness)].sort(
        (a, b) => a.offset - b.offset
      );
      const rgb = (hex: string): number[] => {
        const value = Number.parseInt(hex.slice(1), 16);
        return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
      };
      const mixAt = (offset: number): number[] => {
        const upper = stops.find((stop) => stop.offset >= offset) ?? stops[stops.length - 1];
        const lower = [...stops].reverse().find((stop) => stop.offset <= offset) ?? stops[0];
        const span = upper.offset - lower.offset;
        const ratio = span === 0 ? 0 : (offset - lower.offset) / span;
        const from = rgb(lower.color);
        const to = rgb(upper.color);
        return from.map((channel, index) => channel + (to[index] - channel) * ratio);
      };
      const isPure = (color: number[], hex: string): boolean => {
        const target = rgb(hex);
        return target.every((channel, index) => Math.abs(color[index] - channel) < 2);
      };
      let width = 0;
      for (let value = 15; value <= 22; value += 0.05) {
        const color = mixAt((35 - value) / 25);
        if (!isPure(color, BAND_COLD) && !isPure(color, colors.normal)) width += 0.05;
      }
      return Number(width.toFixed(2));
    };
    expect(blendWidth(0)).toBe(0);
    expect(blendWidth(25)).toBeGreaterThan(0);
    expect(blendWidth(50)).toBeGreaterThan(blendWidth(25));
    expect(blendWidth(100)).toBeGreaterThan(blendWidth(50));
    // 18 °C → 21 °C, the full half-gap of the 6 °C wide cold band.
    expect(blendWidth(100)).toBeGreaterThanOrEqual(3);
    expect(blendWidth(100)).toBeLessThan(4);
  });

  it('keeps the outer ends pure, so blue and red stay present', () => {
    const stops = bandStops([10, 35], limits, colors, 100);
    expect(stops[0].color).toBe(BAND_HOT);
    expect(stops[stops.length - 1].color).toBe(BAND_COLD);
    // 18 °C is still fully cold, 27 °C fully hot.
    const at = (value: number) => {
      const offset = (35 - value) / 25;
      const sorted = [...stops].sort((a, b) => a.offset - b.offset);
      const next = sorted.find((stop) => stop.offset >= offset);
      return next?.color;
    };
    expect(at(17.5)).toBe(BAND_COLD);
    expect(at(27.5)).toBe(BAND_HOT);
  });

  it('falls back to the default when the softness value is not a number', () => {
    expect(bandStops([10, 35], limits, colors, Number.NaN)).toEqual(
      bandStops([10, 35], limits, colors, 100)
    );
  });
});
