import { beforeEach, describe, expect, it, vi } from 'vitest';
import '../src/chart/climate-chart';
import type { ChartLabels, RoomClimateChart } from '../src/chart/climate-chart';
import type { ChartSample } from '../src/chart/geometry';

const labels: ChartLabels = {
  empty: 'Keine Verlaufsdaten',
  emptyHint: 'Für den gewählten Zeitraum liegen keine Messwerte vor.',
  loading: 'Verlauf wird geladen …',
  error: 'Verlauf konnte nicht geladen werden',
  aria: 'Verlaufsdiagramm der letzten 6 Stunden',
  temperature: 'Temperatur',
  humidity: 'Luftfeuchte',
  now: 'Jetzt',
  setpoint: 'Soll',
};

const now = 1_700_000_000_000;

function samples(values: Array<number | null>, stepMs = 5 * 60_000): ChartSample[] {
  return values.map((value, index) => ({ t: now - values.length * stepMs + index * stepMs, v: value }));
}

function createChart(overrides: Partial<RoomClimateChart> = {}): RoomClimateChart {
  const chart = document.createElement('room-climate-chart') as RoomClimateChart;
  chart.labels = labels;
  chart.start = now - 6 * 3600_000;
  chart.end = now;
  chart.language = 'de';
  Object.assign(chart, overrides);
  document.body.append(chart);
  return chart;
}

function setSize(chart: RoomClimateChart, width: number, height: number): void {
  chart.setSize(width, height);
}

/** Pointer event at a horizontal fraction of the plot (jsdom has no PointerEvent). */
function pointer(
  chart: RoomClimateChart,
  type: 'pointerdown' | 'pointermove' | 'pointerup' | 'pointerleave',
  fraction: number,
  pointerType = 'mouse'
): void {
  const overlay = chart.shadowRoot!.querySelector('.overlay') as HTMLElement | null;
  if (!overlay) throw new Error('no overlay');
  const event = new MouseEvent(type, {
    clientX: fraction * chart.chartSize.width,
    clientY: 40,
    bubbles: true,
  });
  Object.defineProperty(event, 'pointerType', { value: pointerType });
  overlay.dispatchEvent(event);
}

/** Vertices of a series path (`M x y` plus one cubic per following segment). */
function verticesOf(path: string): Array<{ x: number; y: number }> {
  const numbers = (path.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
  if (numbers.length < 2) return [];
  const points = [{ x: numbers[0], y: numbers[1] }];
  for (let index = 2; index + 5 < numbers.length; index += 6) {
    points.push({ x: numbers[index + 4], y: numbers[index + 5] });
  }
  return points;
}

/** Lowest y of the temperature area – the plot's own bottom edge. */
function areaBottom(chart: RoomClimateChart): number {
  const area = chart.shadowRoot!.querySelector('path.series-area')!.getAttribute('d') ?? '';
  const ys = (area.match(/-?\d+(?:\.\d+)?/g) ?? [])
    .map(Number)
    .filter((_, index) => index % 2 === 1);
  return Math.max(...ys);
}

function tooltipOf(chart: RoomClimateChart): HTMLElement {
  return chart.shadowRoot!.querySelector('.tooltip') as HTMLElement;
}

function hoverLayer(chart: RoomClimateChart): HTMLElement {
  return chart.shadowRoot!.querySelector('.hover') as HTMLElement;
}

describe('climate chart', () => {
  beforeEach(() => {
    document.body.replaceChildren();
  });

  it('shows an empty state without data', async () => {
    const chart = createChart();
    setSize(chart, 320, 90);
    await chart.updateComplete;
    expect(chart.shadowRoot!.querySelector('.state-title')?.textContent?.trim()).toBe(
      'Keine Verlaufsdaten'
    );
    expect(chart.shadowRoot!.querySelector('svg[role="img"]')).toBeNull();
  });

  it('shows a loading state', async () => {
    const chart = createChart({ loading: true });
    setSize(chart, 320, 90);
    await chart.updateComplete;
    expect(chart.shadowRoot!.querySelector('.state-title')?.textContent?.trim()).toBe(
      'Verlauf wird geladen …'
    );
  });

  it('shows an error state when loading failed', async () => {
    const chart = createChart({ error: 'boom' });
    setSize(chart, 320, 90);
    await chart.updateComplete;
    expect(chart.shadowRoot!.querySelector('.state-title')?.textContent?.trim()).toBe(
      'Verlauf konnte nicht geladen werden'
    );
  });

  it('renders a responsive svg with the measured size', async () => {
    const chart = createChart({ temperature: samples([21, 21.4, 22, 21.6, 21.2, 21.8]) });
    setSize(chart, 320, 90);
    await chart.updateComplete;
    const svg = chart.shadowRoot!.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('320');
    expect(svg.getAttribute('viewBox')).toBe('0 0 320 90');
    expect(svg.getAttribute('role')).toBe('img');
    // The visible name still comes first; the measured range is appended.
    expect(svg.getAttribute('aria-label')).toContain(labels.aria);
    expect(svg.getAttribute('aria-label')).toContain('Temperatur 21,0–22,0 °C');
  });

  it('re-renders without distortion when the size changes', async () => {
    const chart = createChart({ temperature: samples([21, 22, 23]) });
    setSize(chart, 300, 90);
    await chart.updateComplete;
    setSize(chart, 520, 110);
    await chart.updateComplete;
    const svg = chart.shadowRoot!.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('520');
    expect(svg.getAttribute('viewBox')).toBe('0 0 520 110');
    expect(svg.getAttribute('height')).toBe('110');
  });

  it('draws both series in their own colour with one restrained area fill each', async () => {
    const chart = createChart({
      temperature: samples([20, 21, 22, 21, 20.5]),
      humidity: samples([45, 47, 52, 55, 50]),
    });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    const root = chart.shadowRoot!;
    expect(root.querySelectorAll('.series-line')).toHaveLength(2);
    // No pointless stroke gradient: only the two area fills define stops.
    expect(root.querySelectorAll('[id$="-temp-stroke"]')).toHaveLength(0);
    expect(root.querySelectorAll('defs > *')).toHaveLength(2);
    expect(root.querySelectorAll('[id$="-temp-fill"]')).toHaveLength(1);
    // …and the humidity carries its own, quieter fill in its own band.
    expect(root.querySelectorAll('[id$="-humidity-fill"]')).toHaveLength(1);
    expect(root.querySelectorAll('stop')).toHaveLength(6);
    expect(root.querySelectorAll('path[style*="temp-fill"]')).toHaveLength(1);
    expect(root.querySelectorAll('path[style*="humidity-fill"]')).toHaveLength(1);
    // No legend: the colour dot lives next to the reading, not in the chart.
    expect(root.querySelector('.legend')).toBeNull();
    expect(root.querySelector('.legend-item')).toBeNull();
    expect(root.querySelectorAll('.axis-label').length).toBe(3);
    // The grid is opt-in now – by default there is only the hairline baseline.
    expect(root.querySelectorAll('.grid-line')).toHaveLength(0);
    expect(root.querySelectorAll('.baseline')).toHaveLength(1);
  });

  it('fills the temperature area with a visible but restrained gradient', async () => {
    const chart = createChart({ temperature: samples([20, 21, 22]), accentColor: '#4FD1A5' });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    const fill = chart.shadowRoot!.querySelector('[id$="-temp-fill"]')!;
    const stops = Array.from(fill.querySelectorAll('stop')).map((stop) =>
      Number(stop.getAttribute('stop-opacity'))
    );
    // Stronger than the first 2.0 draft (0.16 → 0.22 at the top) but still far
    // from a solid block of colour.
    expect(stops[0]).toBeCloseTo(0.22, 2);
    expect(stops[stops.length - 1]).toBe(0);
    for (let i = 1; i < stops.length; i++) {
      expect(stops[i]).toBeLessThanOrEqual(stops[i - 1]);
    }
  });

  it('colours the temperature curve with the accent and the humidity with the secondary', async () => {
    const chart = createChart({
      temperature: samples([20, 21, 22]),
      humidity: samples([45, 47, 52]),
      accentColor: '#4FD1A5',
      humidityColor: '#8B86D6',
    });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    const lines = Array.from(chart.shadowRoot!.querySelectorAll('.series-line')) as SVGPathElement[];
    const humidity = lines.find((line) => line.style.stroke === '#8B86D6');
    expect(humidity).toBeDefined();
    // The temperature curve paints the accent directly – no `url(#…)` indirection.
    const temperature = lines.find((line) => line.style.stroke === '#4FD1A5');
    expect(temperature).toBeDefined();
    expect(chart.shadowRoot!.querySelector('[id$="-temp-stroke"]')).toBeNull();
  });

  it('keeps the humidity in its own band above the temperature curve', async () => {
    const chart = createChart({
      temperature: samples([30, 30, 30, 30, 30]),
      humidity: samples([10, 10, 10, 10, 10]),
    });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    const lines = Array.from(chart.shadowRoot!.querySelectorAll('.series-line')) as SVGPathElement[];
    const yOf = (line: SVGPathElement): number => {
      const numbers = (line.getAttribute('d')!.match(/-?\d+(\.\d+)?/g) ?? []).map(Number);
      return numbers[1];
    };
    const humidityY = Math.min(...lines.map(yOf));
    const temperatureY = Math.max(...lines.map(yOf));
    // The two curves never touch: the humidity lives in the upper third.
    expect(humidityY).toBeLessThan(temperatureY - 12);
  });

  it('marks the setpoint with a dashed reference line and a caption', async () => {
    const chart = createChart({
      temperature: samples([18, 19, 20, 21]),
      setpoint: 22,
      setpointUnit: '°C',
    });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    const line = chart.shadowRoot!.querySelector('.setpoint-line')!;
    expect(line).not.toBeNull();
    // Dashes come from the stylesheet, the colour from the accent.
    expect(line.getAttribute('class')).toContain('setpoint-line');
    expect(line.getAttribute('style')).toContain('#4FD1A5');
    const styleText = Array.from(
      (
        chart.constructor as unknown as { elementStyles?: ArrayLike<{ cssText?: string }> }
      ).elementStyles ?? []
    )
      .map((sheet) => sheet.cssText ?? '')
      .join('\n');
    expect(styleText).toContain('stroke-dasharray: 3 4');
    const caption = chart.shadowRoot!.querySelector('.setpoint-caption')!;
    expect(caption.textContent?.trim()).toBe('Soll');
    // The reference line sits inside the temperature band, above the baseline.
    const y = Number(line.getAttribute('y1'));
    expect(y).toBeGreaterThan(0);
    expect(y).toBeLessThan(130);
  });

  it('omits the setpoint line without a target value', async () => {
    const chart = createChart({ temperature: samples([18, 19, 20, 21]) });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    expect(chart.shadowRoot!.querySelector('.setpoint-line')).toBeNull();
  });

  it('names the setpoint in the accessible description', async () => {
    const chart = createChart({
      temperature: samples([20, 21, 22]),
      setpoint: 21,
      setpointUnit: '°C',
    });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    const label = chart.shadowRoot!.querySelector('svg')?.getAttribute('aria-label');
    // The dashed reference is invisible to screen readers: it belongs in the name.
    expect(label).toContain('Soll 21,0 °C');
  });

  it('formats the axis in the given time zone and clock format', async () => {
    const start = new Date('2026-10-24T06:00:00Z').getTime();
    const end = new Date('2026-10-24T12:00:00Z').getTime();
    const label = async (options: Partial<RoomClimateChart>) => {
      const chart = createChart({
        temperature: [
          { t: start, v: 20 },
          { t: end, v: 21 },
        ],
        start,
        end,
        language: 'de',
        ...options,
      });
      setSize(chart, 420, 140);
      await chart.updateComplete;
      return chart.shadowRoot!.querySelector('.axis-label')?.textContent?.trim() ?? '';
    };

    // Browser zone would be whatever the test machine has – the instance zone wins.
    expect(await label({ timeZone: 'UTC' })).toContain('06:00');
    expect(await label({ timeZone: 'Europe/Berlin' })).toContain('08:00');
    // 12-hour clock on request.
    expect(await label({ timeZone: 'UTC', hour12: true })).toContain('6:00');
    expect(await label({ timeZone: 'UTC', hour12: true })).toMatch(/AM/i);
    // An invalid zone must not throw: it falls back to the browser zone.
    expect(await label({ timeZone: 'Not/AZone' })).not.toBe('');
  });

  it('labels the axis with day and time, and the newest tick as "Jetzt"', async () => {
    const chart = createChart({
      temperature: samples([20, 21, 22]),
      language: 'de',
      start: new Date('2026-10-24T06:00:00Z').getTime(),
      end: new Date('2026-10-25T06:00:00Z').getTime(),
    });
    setSize(chart, 420, 140);
    await chart.updateComplete;
    const labels = Array.from(chart.shadowRoot!.querySelectorAll('.axis-label')).map((label) =>
      label.textContent!.trim()
    );
    expect(labels).toHaveLength(3);
    expect(labels[2]).toBe('Jetzt');
    // "Sa 24.10." is not helpful; a weekday plus time is.
    expect(labels[0]).toMatch(/^[A-ZÄÖÜ][a-zäöü]? \d{2}:\d{2}$/);
  });

  it('draws the humidity curve as a dotted line when requested', async () => {
    const chart = createChart({
      temperature: samples([20, 21, 22, 21, 20.5]),
      humidity: samples([45, 47, 52, 55, 50]),
      humidityLineStyle: 'dotted',
    });
    setSize(chart, 360, 110);
    await chart.updateComplete;
    const lines = Array.from(chart.shadowRoot!.querySelectorAll('.series-line')) as SVGPathElement[];
    expect(lines).toHaveLength(2);

    // Default humidity colour is the subdued indigo; the temperature uses a
    // gradient reference, so both lines are easy to tell apart.
    const humidityLine = lines.find((line) => line.style.stroke === '#8B86D6');
    const temperatureLine = lines.find((line) => line.style.stroke === '#4FD1A5');
    expect(humidityLine).toBeDefined();
    expect(humidityLine?.style.strokeDasharray).toBe('0.1 5.5');
    // The temperature curve is untouched.
    expect(temperatureLine?.style.strokeDasharray).toBe('');
  });

  it('keeps the humidity fill inside the humidity band', async () => {
    const chart = createChart({
      temperature: samples([20, 21, 22, 21, 20.5]),
      humidity: samples([45, 47, 52, 55, 50]),
    });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    // Geometry mirrors the component: 20 px axis space, 6 px top inset, the
    // humidity owning the upper 30 % and the temperature starting at 44 %.
    const plotHeight = 130 - 20 - 6;
    const temperatureTop = 6 + plotHeight * 0.44;
    const path = chart.shadowRoot!.querySelector('path[style*="humidity-fill"]') as SVGPathElement;
    const numbers = path
      .getAttribute('d')!
      .match(/-?\d+(\.\d+)?/g)!
      .map(Number);
    const yValues: number[] = [];
    for (let i = 1; i < numbers.length - 2; i += 2) yValues.push(numbers[i]);
    expect(yValues.length).toBeGreaterThan(2);
    expect(Math.max(...yValues)).toBeLessThan(temperatureTop);
  });

  it('gives the humidity its own, quieter gradient inside its band', async () => {
    const chart = createChart({
      temperature: samples([20, 21, 22, 21, 20.5]),
      humidity: samples([45, 47, 52, 55, 50]),
      humidityColor: '#8B86D6',
    });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    const gradient = chart.shadowRoot!.querySelector('[id$="-humidity-fill"]')!;
    const stops = Array.from(gradient.querySelectorAll('stop')).map((stop) => ({
      color: stop.getAttribute('stop-color'),
      opacity: Number(stop.getAttribute('stop-opacity')),
    }));
    expect(stops).toHaveLength(3);
    // Own colour, softer than the temperature fill (0.22 / 0.08) so it never
    // competes with the hero value.
    for (const stop of stops) expect(stop.color).toBe('#8B86D6');
    expect(stops[0].opacity).toBeCloseTo(0.2, 2);
    expect(stops[1].opacity).toBeCloseTo(0.07, 2);
    expect(stops[2].opacity).toBe(0);
    for (let i = 1; i < stops.length; i++) {
      expect(stops[i].opacity).toBeLessThanOrEqual(stops[i - 1].opacity);
    }
  });

  it('switches each gradient off independently', async () => {
    const both = createChart({
      temperature: samples([20, 21, 22]),
      humidity: samples([45, 47, 52]),
    });
    setSize(both, 340, 120);
    await both.updateComplete;
    expect(both.shadowRoot!.querySelectorAll('.series-area')).toHaveLength(2);

    const noTemperature = createChart({
      temperature: samples([20, 21, 22]),
      humidity: samples([45, 47, 52]),
      showTemperatureArea: false,
    });
    setSize(noTemperature, 340, 120);
    await noTemperature.updateComplete;
    expect(noTemperature.shadowRoot!.querySelectorAll('.series-area')).toHaveLength(1);
    expect(
      noTemperature.shadowRoot!.querySelector('path[style*="humidity-fill"]')
    ).not.toBeNull();
    expect(
      noTemperature.shadowRoot!.querySelector('path[style*="temp-fill"]')
    ).toBeNull();

    const noHumidity = createChart({
      temperature: samples([20, 21, 22]),
      humidity: samples([45, 47, 52]),
      showHumidityArea: false,
    });
    setSize(noHumidity, 340, 120);
    await noHumidity.updateComplete;
    expect(noHumidity.shadowRoot!.querySelectorAll('.series-area')).toHaveLength(1);
    expect(
      noHumidity.shadowRoot!.querySelector('path[style*="temp-fill"]')
    ).not.toBeNull();

    // Both off: the curves stay, only the surfaces disappear.
    const none = createChart({
      temperature: samples([20, 21, 22]),
      humidity: samples([45, 47, 52]),
      showTemperatureArea: false,
      showHumidityArea: false,
    });
    setSize(none, 340, 120);
    await none.updateComplete;
    expect(none.shadowRoot!.querySelectorAll('.series-area')).toHaveLength(0);
    expect(none.shadowRoot!.querySelectorAll('.series-line')).toHaveLength(2);
  });

  it('keeps a quiet stretch flat instead of ramping it over hours', async () => {
    // Three hours of 5-minute readings around 20 °C, then a 2.5 h quiet stretch
    // (the value did not change), then a real jump to 21 °C.
    const values: ChartSample[] = [];
    for (let i = 0; i < 36; i++) {
      values.push({ t: now - 6 * 3600_000 + i * 5 * 60_000, v: 20 + (i % 2) * 0.05 });
    }
    values.push({ t: now - 0.5 * 3600_000, v: 21 });

    const chart = createChart({ temperature: values, smoothing: 'light' });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    const path = chart.shadowRoot!.querySelector('.series-line') as SVGPathElement;
    const numbers = path
      .getAttribute('d')!
      .match(/-?\d+(\.\d+)?/g)!
      .map(Number);
    const points: Array<[number, number]> = [];
    for (let i = 0; i + 1 < numbers.length; i += 2) points.push([numbers[i], numbers[i + 1]]);

    // Everything in the quiet stretch still sits on the old level …
    const tail = points.slice(-4);
    const jump = tail[tail.length - 2];
    const flat = tail[0];
    expect(flat[1]).toBeCloseTo(jump[1], 1);
    // … and the jump happens in the last few pixels, not across the stretch.
    expect(jump[0]).toBeGreaterThan(320);
    expect(flat[0]).toBeGreaterThan(150);
  });

  it('applies the smoothing level chosen in the editor', async () => {
    // A jittery but drifting signal – the kind an HA sensor delivers.
    const values = [
      21.4, 21.8, 21.5, 22.1, 21.6, 22.4, 21.9, 22.6, 22.1, 21.7, 22.2, 21.8, 22.5, 21.9,
      21.3, 21.7, 21.2, 21.6, 21.0, 20.8, 21.1, 20.7, 21.2, 20.9, 21.4, 21.8, 21.5,
    ];
    const yRange = async (smoothing: RoomClimateChart['smoothing']) => {
      const chart = createChart({ temperature: samples(values), smoothing });
      setSize(chart, 360, 130);
      await chart.updateComplete;
      const path = chart.shadowRoot!.querySelector('.series-line') as SVGPathElement;
      const numbers = path
        .getAttribute('d')!
        .match(/-?\d+(\.\d+)?/g)!
        .map(Number);
      const ys = numbers.filter((_, index) => index % 2 === 1);
      return Math.max(...ys) - Math.min(...ys);
    };

    const off = await yRange('none');
    const light = await yRange('light');
    const strong = await yRange('strong');

    // More smoothing = less vertical travel. The ladder must be strict, so every
    // step is visible on screen and not just in theory.
    expect(off).toBeGreaterThan(light);
    expect(light).toBeGreaterThan(strong);
  });

  it('uses the height of its band for small temperature swings', async () => {
    // A well insulated room: 0.15 °C over six hours. The old domain forced a
    // 0.8 °C window and flattened this into a straight line.
    const tiny = [
      21.0, 21.02, 21.0, 21.04, 21.03, 21.06, 21.05, 21.08, 21.07, 21.09, 21.1, 21.12, 21.1,
      21.13, 21.15, 21.12, 21.1, 21.08, 21.06, 21.05, 21.03, 21.02, 21.0, 21.01, 20.99, 21.0,
    ];
    // Smoothing is measured separately – here only the vertical domain counts.
    const chart = createChart({ temperature: samples(tiny), smoothing: 'none' });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    const path = chart.shadowRoot!.querySelector('.series-line') as SVGPathElement;
    const numbers = path
      .getAttribute('d')!
      .match(/-?\d+(\.\d+)?/g)!
      .map(Number);
    const ys = numbers.filter((_, index) => index % 2 === 1);
    const travel = Math.max(...ys) - Math.min(...ys);

    // Temperature band: 130 − 20 − 6 = 104 px plot, the lower 56 % is ours.
    const band = (130 - 20 - 6) * (1 - 0.44);
    expect(travel).toBeGreaterThan(band * 0.25);
    expect(travel).toBeLessThan(band);
  });

  it('keeps both curves solid by default', async () => {
    const chart = createChart({
      temperature: samples([20, 21, 22]),
      humidity: samples([45, 47, 52]),
    });
    setSize(chart, 320, 100);
    await chart.updateComplete;
    const lines = Array.from(chart.shadowRoot!.querySelectorAll('.series-line')) as SVGPathElement[];
    expect(lines).toHaveLength(2);
    for (const line of lines) expect(line.style.strokeDasharray).toBe('');
  });

  it('interpolates small data gaps into one continuous line by default', async () => {
    const chart = createChart({
      temperature: samples([20, 21, null, null, 22, 23]),
    });
    setSize(chart, 320, 90);
    await chart.updateComplete;
    expect(chart.shadowRoot!.querySelectorAll('.series-line')).toHaveLength(1);
    expect(chart.shadowRoot!.querySelectorAll('path[style*="temp-fill"]')).toHaveLength(1);
  });

  it('keeps gaps visible in break mode', async () => {
    const chart = createChart({
      temperature: samples([20, 21, null, null, 22, 23]),
      gapMode: 'break',
    });
    setSize(chart, 320, 90);
    await chart.updateComplete;
    expect(chart.shadowRoot!.querySelectorAll('.series-line')).toHaveLength(2);
  });

  it('keeps one continuous line through long constant phases', async () => {
    // No samples for almost five hours because the value did not change.
    const sparse = [
      { t: now - 6 * 3600_000, v: 20 },
      { t: now - 5.9 * 3600_000, v: 20.5 },
      { t: now - 0.9 * 3600_000, v: 22 },
      { t: now - 0.8 * 3600_000, v: 22.2 },
    ];
    const chart = createChart({ temperature: sparse, maxGapMinutes: 120 });
    setSize(chart, 320, 90);
    await chart.updateComplete;
    expect(chart.shadowRoot!.querySelectorAll('.series-line')).toHaveLength(1);
    expect(chart.shadowRoot!.querySelectorAll('path[style*="temp-fill"]')).toHaveLength(1);
  });

  it('never interpolates an unavailable stretch longer than maxGapMinutes', async () => {
    const chart = createChart({
      temperature: [
        { t: now - 6 * 3600_000, v: 20 },
        { t: now - 5.9 * 3600_000, v: 20.5 },
        { t: now - 5.8 * 3600_000, v: null },
        { t: now - 0.9 * 3600_000, v: 22 },
        { t: now - 0.8 * 3600_000, v: 22.2 },
      ],
      maxGapMinutes: 120,
    });
    setSize(chart, 320, 90);
    await chart.updateComplete;
    const lines = chart.shadowRoot!.querySelectorAll('.series-line');
    expect(lines).toHaveLength(2);
    // Even with a real hole the area stays a single element (no gradient seams).
    expect(chart.shadowRoot!.querySelectorAll('path[style*="temp-fill"]')).toHaveLength(1);
  });

  it('bridges a short unavailable stretch', async () => {
    const chart = createChart({
      temperature: [
        { t: now - 6 * 3600_000, v: 20 },
        { t: now - 5 * 3600_000, v: 20.5 },
        { t: now - 4.9 * 3600_000, v: null },
        { t: now - 4.4 * 3600_000, v: 21 },
        { t: now - 0.5 * 3600_000, v: 22 },
      ],
      maxGapMinutes: 120,
    });
    setSize(chart, 320, 90);
    await chart.updateComplete;
    expect(chart.shadowRoot!.querySelectorAll('.series-line')).toHaveLength(1);
  });

  it('ignores samples outside the visible window', async () => {
    const chart = createChart({
      temperature: [
        { t: now - 9 * 3600_000, v: 12 },
        { t: now - 5 * 3600_000, v: 21 },
        { t: now - 3 * 3600_000, v: 21.5 },
        { t: now + 2 * 3600_000, v: 30 },
      ],
    });
    setSize(chart, 320, 90);
    await chart.updateComplete;
    const d = chart.shadowRoot!.querySelector('.series-line')!.getAttribute('d')!;
    const numbers = (d.match(/-?\d+(\.\d+)?/g) ?? []).map(Number);
    const ys = numbers.filter((_, index) => index % 2 === 1);
    // Values from outside the window (12 / 30) would be far outside the plot.
    expect(Math.min(...ys)).toBeGreaterThanOrEqual(0);
    expect(Math.max(...ys)).toBeLessThanOrEqual(90);
  });

  it('bridges a hole that is shorter than maxGapMinutes', async () => {
    const chart = createChart({
      temperature: [
        { t: now - 6 * 3600_000, v: 20 },
        { t: now - 5.9 * 3600_000, v: 20.5 },
        { t: now - 4.9 * 3600_000, v: 21.5 },
        { t: now - 4.8 * 3600_000, v: 21.8 },
      ],
      maxGapMinutes: 120,
    });
    setSize(chart, 320, 90);
    await chart.updateComplete;
    expect(chart.shadowRoot!.querySelectorAll('.series-line')).toHaveLength(1);
  });

  it('splits bridged stretches when dashed style is requested', async () => {
    const chart = createChart({
      temperature: samples([20, 21, null, null, 22, 23]),
      gapStyle: 'dashed',
    });
    setSize(chart, 320, 90);
    await chart.updateComplete;
    const lines = chart.shadowRoot!.querySelectorAll('.series-line');
    expect(lines.length).toBeGreaterThan(1);
  });

  it('keeps the axis labels clear of the rounded card corners', async () => {
    const chart = createChart({ temperature: samples([20, 21, 22, 23]), cornerRadius: 18 });
    setSize(chart, 320, 100);
    await chart.updateComplete;
    const labels = Array.from(
      chart.shadowRoot!.querySelectorAll('.axis-label')
    ) as unknown as SVGGraphicsElement[];
    expect(labels.length).toBeGreaterThanOrEqual(2);
    const positions = labels.map((label) => Number(label.getAttribute('x')));
    const inset = 20;
    expect(Math.min(...positions)).toBeGreaterThanOrEqual(inset);
    expect(Math.max(...positions)).toBeLessThanOrEqual(320 - inset);
    // Baseline has to stay above the bottom edge (descenders included).
    for (const label of labels) {
      expect(Number(label.getAttribute('y'))).toBeLessThanOrEqual(100 - 5);
    }
  });

  it('respects a custom corner radius for the label inset', async () => {
    const chart = createChart({ temperature: samples([20, 21]), cornerRadius: 4 });
    setSize(chart, 320, 100);
    await chart.updateComplete;
    const labels = Array.from(chart.shadowRoot!.querySelectorAll('.axis-label'));
    const nowLabel = labels[labels.length - 1];
    // A small radius lets "Jetzt" move close to the edge (radius + 2 px).
    expect(Number(nowLabel.getAttribute('x'))).toBe(320 - 6);
  });

  it('extends the series to both window edges', async () => {
    const chart = createChart({
      temperature: [
        { t: now - 5 * 3600_000, v: 20 },
        { t: now - 3 * 3600_000, v: 21 },
      ],
    });
    setSize(chart, 320, 90);
    await chart.updateComplete;
    const path = chart.shadowRoot!.querySelector('.series-line')!.getAttribute('d')!;
    const numbers = (path.match(/-?\d+(\.\d+)?/g) ?? []).map(Number);
    const startX = numbers[0];
    const endX = numbers[numbers.length - 2];
    const xs = numbers.filter((_, index) => index % 2 === 0);
    /*
     * The chart is drawn edge to edge inside the card, with one dot radius kept
     * free on the right so the "now" dot is not cut by the outer edge.
     */
    const rightBound = 320 - 1 - 2.8;
    expect(startX).toBeLessThanOrEqual(2);
    expect(endX).toBeGreaterThanOrEqual(rightBound - 0.5);
    expect(Math.max(...xs)).toBeGreaterThanOrEqual(rightBound - 0.5);
  });

  it('renders data point markers when enabled', async () => {
    const chart = createChart({
      temperature: samples([20, 21, 22, 21]),
      showPoints: true,
    });
    setSize(chart, 320, 90);
    await chart.updateComplete;
    expect(chart.shadowRoot!.querySelectorAll('.point').length).toBeGreaterThan(0);
  });

  it('renders nothing below a minimum size instead of distorting', async () => {
    const chart = createChart({ temperature: samples([20, 21]) });
    setSize(chart, 30, 20);
    await chart.updateComplete;
    expect(chart.shadowRoot!.querySelector('svg')).toBeNull();
    expect(chart.shadowRoot!.querySelector('.wrap')).toBeNull();
  });

  /** Band of a series, read from its area gradient (userSpaceOnUse = plot pixel). */
  const bandOf = (chart: RoomClimateChart, series: 'temp' | 'humidity') => {
    // SVG tag names are case sensitive in a selector; the id is unique anyway.
    const gradient = chart.shadowRoot!.querySelector(`[id$="-${series}-fill"]`)!;
    const top = Number(gradient.getAttribute('y1'));
    const bottom = Number(gradient.getAttribute('y2'));
    return { top, bottom, height: bottom - top };
  };

  it('gives a lone series the whole plot instead of half an empty one', async () => {
    const both = createChart({
      temperature: samples([20, 21, 22, 21]),
      humidity: samples([44, 45, 46, 45]),
    });
    setSize(both, 360, 112);
    await both.updateComplete;
    const plotHeight = Number(both.shadowRoot!.querySelector('.baseline')!.getAttribute('y1')) - 6;
    const splitTemperature = bandOf(both, 'temp').height;
    // Two bands share the plot: humidity the upper third, temperature the rest.
    expect(splitTemperature).toBeLessThan(plotHeight * 0.7);

    document.body.replaceChildren();
    const lone = createChart({ temperature: samples([20, 21, 22, 21]) });
    setSize(lone, 360, 112);
    await lone.updateComplete;
    const loneTemperature = bandOf(lone, 'temp');
    expect(loneTemperature.height).toBeGreaterThanOrEqual(plotHeight * 0.8);
    expect(loneTemperature.height).toBeGreaterThan(splitTemperature * 1.5);
    // The plateau starts right at the top of the plot, the baseline stays.
    expect(loneTemperature.top).toBeCloseTo(6, 0);
  });

  it('gives the humidity curve the whole plot when temperature is off', async () => {
    const chart = createChart({ humidity: samples([44, 45, 46, 45]) });
    setSize(chart, 360, 112);
    await chart.updateComplete;
    const plotHeight = Number(chart.shadowRoot!.querySelector('.baseline')!.getAttribute('y1')) - 6;
    const band = bandOf(chart, 'humidity');
    expect(band.height).toBeGreaterThanOrEqual(plotHeight * 0.8);
    // One curve only – and it is drawn.
    expect(chart.shadowRoot!.querySelectorAll('path.series-line')).toHaveLength(1);
  });

  it('keeps the split when the humidity series is configured but has no values', async () => {
    const both = createChart({
      temperature: samples([20, 21, 22, 21]),
      humidity: samples([44, 45, 46, 45]),
    });
    setSize(both, 360, 112);
    await both.updateComplete;

    document.body.replaceChildren();
    // Every reading unavailable: the layout must not jump while the sensor is quiet.
    const quiet = createChart({
      temperature: samples([20, 21, 22, 21]),
      humidity: samples([null, null, null, null]),
    });
    setSize(quiet, 360, 112);
    await quiet.updateComplete;
    expect(bandOf(quiet, 'temp').height).toBeCloseTo(bandOf(both, 'temp').height, 1);
    expect(bandOf(quiet, 'humidity').height).toBeCloseTo(bandOf(both, 'humidity').height, 1);
  });

  it('drops the time row on request and gives the space to the curves', async () => {
    const withAxis = createChart({ temperature: samples([20, 21, 22, 23]) });
    setSize(withAxis, 320, 112);
    await withAxis.updateComplete;
    const labels = withAxis.shadowRoot!.querySelectorAll('.axis-label');
    expect(labels.length).toBeGreaterThan(0);
    const baselineWith = Number(
      withAxis.shadowRoot!.querySelector('.baseline')!.getAttribute('y1')
    );

    document.body.replaceChildren();
    const withoutAxis = createChart({ temperature: samples([20, 21, 22, 23]), showAxis: false });
    setSize(withoutAxis, 320, 112);
    await withoutAxis.updateComplete;
    expect(withoutAxis.shadowRoot!.querySelectorAll('.axis-label')).toHaveLength(0);
    /*
     * The plot now reaches down to the bottom edge instead of stopping 20 px
     * above it – and the hairline is gone with it: on the card's own edge a
     * second line read as a thicker bottom border.
     */
    expect(withoutAxis.shadowRoot!.querySelector('.baseline')).toBeNull();
    expect(areaBottom(withoutAxis)).toBeGreaterThan(baselineWith + 10);
    // Data and interaction stay untouched.
    expect(withoutAxis.shadowRoot!.querySelectorAll('.series-line').length).toBeGreaterThan(0);
    expect(withoutAxis.shadowRoot!.querySelectorAll('.end-dot').length).toBeGreaterThan(0);
  });

  it('runs the curve to the edge yet keeps the last dot whole', async () => {
    const chart = createChart({
      temperature: samples([20, 21, 22, 23]),
      humidity: samples([45, 46, 47, 48]),
    });
    setSize(chart, 360, 130);
    await chart.updateComplete;

    const svg = chart.shadowRoot!.querySelector('svg[role="img"]')!;
    const width = Number(svg.getAttribute('viewBox')!.split(/\s+/)[2]);

    /*
     * The time scale ends one dot radius early (so the dot stays whole), but the
     * drawn line and its area hold the last value across that strip: the right
     * edge is filled, no 3 px gutter.
     */
    const longest = Array.from(chart.shadowRoot!.querySelectorAll('path.series-line'))
      .map((path) => path.getAttribute('d') ?? '')
      .sort((a, b) => b.length - a.length)[0];
    const vertices = verticesOf(longest);
    // Flush means flush: the last point sits on the outer edge of the chart box.
    expect(vertices[vertices.length - 1].x).toBeCloseTo(width, 1);
    expect(vertices[vertices.length - 2].x).toBeCloseTo(width - 1 - 2.8, 1);
    // The hold is flat: both vertices carry the last value.
    expect(vertices[vertices.length - 1].y).toBeCloseTo(vertices[vertices.length - 2].y, 3);

    // The area fill reaches the edge as well.
    const area = chart.shadowRoot!.querySelector('path.series-area')!.getAttribute('d') ?? '';
    const areaNumbers = (area.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
    const areaXs = areaNumbers.filter((_, index) => index % 2 === 0);
    expect(Math.max(...areaXs)).toBeCloseTo(width, 1);
    // …and on the left side the same, with no 1 px seam either.
    expect(Math.min(...areaXs)).toBe(0);
    expect(vertices[0].x).toBe(0);

    // Both end dots stay completely inside the chart area, right at the edge.
    const dots = Array.from(chart.shadowRoot!.querySelectorAll('.end-dot')) as SVGCircleElement[];
    expect(dots).toHaveLength(2);
    for (const dot of dots) {
      const cx = Number(dot.getAttribute('cx'));
      const r = Number(dot.getAttribute('r'));
      expect(cx + r).toBeLessThanOrEqual(width);
      expect(width - (cx + r)).toBeLessThan(1.5);
    }

    // The "Jetzt" label keeps its distance to the rounded corner.
    const axisLabels = Array.from(
      chart.shadowRoot!.querySelectorAll('.axis-label')
    ) as SVGTextElement[];
    const last = axisLabels[axisLabels.length - 1];
    expect(last.textContent?.trim()).toBe('Jetzt');
    expect(Number(last.getAttribute('x'))).toBeLessThanOrEqual(width - 26);
  });

  it('keeps the "Soll" caption clear of the outer edge on both sides', async () => {
    const captionOf = async (setpoint: number): Promise<SVGTextElement> => {
      document.body.replaceChildren();
      const chart = createChart({
        temperature: samples([20, 21, 22]),
        setpoint,
        showSetpoint: true,
      });
      setSize(chart, 320, 130);
      await chart.updateComplete;
      return chart.shadowRoot!.querySelector('.setpoint-caption') as SVGTextElement;
    };

    // Reference below the curve: the caption sits at the right end.
    const right = await captionOf(19);
    const rightX = Number(right.getAttribute('x'));
    expect(right.getAttribute('text-anchor')).toBe('end');
    expect(rightX).toBeLessThanOrEqual(320 - 3);

    // Reference above the curve: the caption sits at the left end.
    const left = await captionOf(23);
    const leftX = Number(left.getAttribute('x'));
    expect(left.getAttribute('text-anchor')).toBe('start');
    expect(leftX).toBeGreaterThanOrEqual(3);
  });

  it('keeps the axis row inside the chart and clear of the bottom edge', async () => {
    /*
     * The chart is flush with the card's side edges, so the only bottom air is
     * the card inset plus what the SVG reserves itself. These numbers are what
     * that reserve is made of.
     */
    const chart = createChart({ temperature: samples([20, 21, 22, 21]) });
    setSize(chart, 340, 112);
    await chart.updateComplete;

    const svg = chart.shadowRoot!.querySelector('svg[role="img"]')!;
    const height = Number(svg.getAttribute('viewBox')!.split(/\s+/)[3]);
    const labels = Array.from(chart.shadowRoot!.querySelectorAll('.axis-label')) as SVGTextElement[];
    expect(labels).toHaveLength(3);

    // Baseline 6 px above the chart's bottom …
    const baseline = Math.max(...labels.map((label) => Number(label.getAttribute('y'))));
    expect(baseline).toBe(height - 6);
    // … and the descenders of the 10.5 px type still fit inside the box.
    expect(baseline + 10.5 * 0.22).toBeLessThanOrEqual(height - 1);

    // The row sits below the plotted area, not on the curve.
    const plotBottom = Number(
      (chart.shadowRoot!.querySelector('.baseline') as SVGLineElement).getAttribute('y1')
    );
    expect(plotBottom).toBe(height - 20);
    expect(baseline).toBeGreaterThan(plotBottom + 6);

    // Switching the axis off hands that room to the plot.
    document.body.replaceChildren();
    const withoutAxis = createChart({ temperature: samples([20, 21, 22, 21]), showAxis: false });
    setSize(withoutAxis, 340, 112);
    await withoutAxis.updateComplete;
    expect(withoutAxis.shadowRoot!.querySelectorAll('.axis-label')).toHaveLength(0);
    /*
     * Without the row the plot runs to the bottom edge (0.5 px keeps its own
     * hairline inside the box) and the separator is dropped: the card's border
     * is the lower edge, so it stays as thin as the sides and the top.
     */
    expect(withoutAxis.shadowRoot!.querySelector('.baseline')).toBeNull();
    expect(areaBottom(withoutAxis)).toBe(height - 0.5);
  });

  it('hides axis labels when there is not enough height', async () => {
    const chart = createChart({ temperature: samples([20, 21, 22]) });
    setSize(chart, 320, 55);
    await chart.updateComplete;
    expect(chart.shadowRoot!.querySelectorAll('.axis-label')).toHaveLength(0);
  });

  it('ignores non numeric samples', async () => {
    const chart = createChart({ temperature: samples([null, null]) });
    setSize(chart, 320, 90);
    await chart.updateComplete;
    expect(chart.shadowRoot!.querySelector('.state-title')?.textContent?.trim()).toBe(
      'Keine Verlaufsdaten'
    );
  });

  it('keeps vertical scrolling on the dashboard working', async () => {
    const chart = createChart({ temperature: samples([20, 21, 22]) });
    setSize(chart, 360, 120);
    await chart.updateComplete;
    // The overlay covers the plot: without pan-y it would swallow every swipe.
    const css = String((chart.constructor as unknown as { styles: { cssText: string } }).styles.cssText);
    expect(css).toContain('touch-action: pan-y');
    expect(chart.shadowRoot!.querySelector('.overlay')).not.toBeNull();
  });

  it('shows the measured value under the pointer, not the smoothed one', async () => {
    const values = Array.from({ length: 40 }, (_, index) => 20 + (index % 5) * 0.1);
    values[20] = 27.5; // a spike a moving average would never report
    const series = samples(values);
    const chart = createChart({
      temperature: series,
      curve: 'smooth',
      smoothing: 'strong',
      temperatureDecimals: 1,
      temperatureUnit: '°C',
      labels,
    });
    setSize(chart, 320, 120);
    await chart.updateComplete;

    const spike = series[20];
    const fraction = (spike.t - chart.start) / (chart.end - chart.start);
    pointer(chart, 'pointermove', fraction);
    await chart.updateComplete;

    expect(hoverLayer(chart).hidden).toBe(false);
    expect(tooltipOf(chart).dataset.time).toBe(String(spike.t));
    // The number is the raw measurement – smoothing never reaches 27,5.
    expect(tooltipOf(chart).textContent).toContain('27,5');
    expect(tooltipOf(chart).textContent).not.toContain('20,9');
  });

  it('reports both series at the same instant with their own units', async () => {
    const chart = createChart({
      temperature: samples([21, 21.4]),
      humidity: samples([48, 51]),
      humidityUnit: '%',
      temperatureUnit: '°C',
      humidityDecimals: 0,
    });
    setSize(chart, 320, 120);
    await chart.updateComplete;
    pointer(chart, 'pointermove', 1);
    await chart.updateComplete;
    const text = tooltipOf(chart).textContent ?? '';
    expect(text).toContain('21,4 °C');
    expect(text).toContain('51 %');
  });

  it('snaps to measured samples instead of interpolated bridge points', async () => {
    const start = now - 6 * 3600_000;
    const hour = 3600_000;
    // A real outage between 12:00 and 15:00; `connect` bridges it for the line.
    const temperature: ChartSample[] = [
      { t: start, v: 20 },
      { t: start + hour, v: 21 },
      { t: start + 2 * hour, v: null },
      { t: start + 5 * hour, v: 22 },
      { t: now, v: 22 },
    ];
    const chart = createChart({ temperature, gapMode: 'connect', maxGapMinutes: 720 });
    setSize(chart, 320, 120);
    await chart.updateComplete;

    // Right in the middle of the bridged stretch: the nearest *measurement* is
    // the 21 one hour earlier (or the 22 at 15:00), never an invented value.
    const fraction = (start + 2.5 * hour - chart.start) / (chart.end - chart.start);
    pointer(chart, 'pointermove', fraction);
    await chart.updateComplete;
    const shown = Number(tooltipOf(chart).dataset.time);
    expect([start + hour, start + 5 * hour]).toContain(shown);
    expect(tooltipOf(chart).textContent).not.toContain('21,5');
  });

  it('keeps the readout for a moment after a finger lifts', async () => {
    vi.useFakeTimers();
    try {
      const chart = createChart({ temperature: samples([20, 21, 22]) });
      setSize(chart, 320, 120);
      await chart.updateComplete;

      pointer(chart, 'pointerdown', 0.5, 'touch');
      await chart.updateComplete;
      expect(hoverLayer(chart).hidden).toBe(false);

      pointer(chart, 'pointerup', 0.5, 'touch');
      // A touch release is not the same as "look away".
      pointer(chart, 'pointerleave', 0.5, 'touch');
      vi.advanceTimersByTime(3900);
      expect(hoverLayer(chart).hidden).toBe(false);
      vi.advanceTimersByTime(400);
      expect(hoverLayer(chart).hidden).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });

  it('hides the readout when the mouse leaves', async () => {
    const chart = createChart({ temperature: samples([20, 21, 22]) });
    setSize(chart, 320, 120);
    await chart.updateComplete;
    pointer(chart, 'pointermove', 0.5);
    await chart.updateComplete;
    expect(hoverLayer(chart).hidden).toBe(false);
    pointer(chart, 'pointerleave', 0.5);
    expect(hoverLayer(chart).hidden).toBe(true);
  });

  it('offers no pointer layer when the readout is switched off', async () => {
    const chart = createChart({ temperature: samples([20, 21, 22]), showTooltip: false });
    setSize(chart, 320, 120);
    await chart.updateComplete;
    expect(chart.shadowRoot!.querySelector('.overlay')).toBeNull();
    expect(chart.shadowRoot!.querySelector('.hover')).toBeNull();
  });

  it('marks the minimum and maximum of both series', async () => {
    const chart = createChart({
      temperature: samples([19, 21, 23, 20]),
      humidity: samples([44, 52, 47, 49]),
      humidityDecimals: 0,
    });
    setSize(chart, 320, 130);
    await chart.updateComplete;
    const labels = [...chart.shadowRoot!.querySelectorAll('.extreme-label')].map((node) =>
      node.textContent?.trim()
    );
    expect(labels).toEqual(expect.arrayContaining(['23,0', '19,0', '52', '44']));
    expect(chart.shadowRoot!.querySelectorAll('.extreme-dot')).toHaveLength(4);
  });

  it('keeps every min/max number at least 6 px inside the plot edges', async () => {
    // The chart may run edge to edge, so the numbers need their own distance.
    const cases: Array<Partial<RoomClimateChart>> = [
      { temperature: samples([23, 20, 21, 22]) }, // maximum on the left edge
      { temperature: samples([20, 21, 22, 23]) }, // maximum on the right edge
      {
        temperature: samples([19, 21, 23, 20]),
        humidity: samples([44, 52, 47, 49]),
        humidityDecimals: 0,
      },
      { temperature: samples([23, 20, 21, 22]), setpoint: 22.5 },
    ];
    for (const overrides of cases) {
      document.body.replaceChildren();
      const chart = createChart(overrides);
      setSize(chart, 320, 130);
      await chart.updateComplete;
      const left = 1;
      const right = 320 - 1 - 2.8;
      const textWidth = 26;
      const labels = Array.from(chart.shadowRoot!.querySelectorAll('.extreme-label'));
      expect(labels.length).toBeGreaterThan(0);
      for (const label of labels) {
        const x = Number(label.getAttribute('x'));
        if (label.getAttribute('text-anchor') === 'start') {
          expect(x + textWidth).toBeLessThanOrEqual(right - 6 + 0.01);
        } else {
          expect(x - textWidth).toBeGreaterThanOrEqual(left + 6 - 0.01);
        }
      }
    }
  });

  it('prints one mark when the curve never moved instead of none', async () => {
    // A well-regulated room: every reading is the same. Min and max are one value.
    const chart = createChart({
      temperature: samples([21.4, 21.4, 21.4, 21.4, 21.4]),
    });
    setSize(chart, 320, 130);
    await chart.updateComplete;
    const labels = [...chart.shadowRoot!.querySelectorAll('.extreme-label')].map((node) =>
      node.textContent?.trim()
    );
    expect(labels).toEqual(['21,4']);
    expect(chart.shadowRoot!.querySelectorAll('.extreme-dot')).toHaveLength(1);
  });

  it('draws the marks in small charts instead of dropping them', async () => {
    const chart = createChart({
      temperature: samples([19, 21, 23, 20]),
      humidity: samples([44, 52, 47, 49]),
      humidityDecimals: 0,
    });
    // 240 × 86: a compact card, both series – the bands are only ~15 px high.
    setSize(chart, 240, 86);
    await chart.updateComplete;
    expect(chart.shadowRoot!.querySelectorAll('.extreme-dot').length).toBeGreaterThanOrEqual(2);
    const labels = [...chart.shadowRoot!.querySelectorAll('.extreme-label')].map((node) =>
      node.textContent?.trim()
    );
    expect(labels).toContain('23,0');
  });

  it('says why a mark is missing instead of staying silent', async () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    try {
      const chart = createChart({ temperature: samples([19, 21, 23, 20]) });
      setSize(chart, 140, 130);
      await chart.updateComplete;
      expect(chart.shadowRoot!.querySelector('.extreme-dot')).toBeNull();
      expect(info).toHaveBeenCalled();
      expect(String(info.mock.calls[0][0])).toContain('ausgeblendet');
    } finally {
      info.mockRestore();
    }
  });

  it('leaves the extremes alone when they are switched off or space is tight', async () => {
    const off = createChart({
      temperature: samples([19, 21, 23, 20]),
      showExtremes: false,
    });
    setSize(off, 320, 130);
    await off.updateComplete;
    expect(off.shadowRoot!.querySelector('.extreme-label')).toBeNull();

    // Narrower than the drawn minimum (150 px): no labels, and the reason is logged.
    const narrow = createChart({ temperature: samples([19, 21, 23, 20]) });
    setSize(narrow, 120, 130);
    await narrow.updateComplete;
    expect(narrow.shadowRoot!.querySelector('.extreme-label')).toBeNull();
    // 180 px is fine now – the marks used to stop at 200 px.
    const compact = createChart({ temperature: samples([19, 21, 23, 20]) });
    setSize(compact, 180, 130);
    await compact.updateComplete;
    expect(compact.shadowRoot!.querySelectorAll('.extreme-label').length).toBeGreaterThan(0);
  });

  it('hides the target line and its caption on request', async () => {
    const shown = createChart({ temperature: samples([19, 21, 23, 20]), setpoint: 22 });
    setSize(shown, 320, 130);
    await shown.updateComplete;
    expect(shown.shadowRoot!.querySelector('.setpoint-line')).not.toBeNull();
    expect(shown.shadowRoot!.querySelector('.setpoint-caption')).not.toBeNull();

    document.body.replaceChildren();
    const hidden = createChart({
      temperature: samples([19, 21, 23, 20]),
      setpoint: 22,
      showSetpoint: false,
    });
    setSize(hidden, 320, 130);
    await hidden.updateComplete;
    expect(hidden.shadowRoot!.querySelector('.setpoint-line')).toBeNull();
    expect(hidden.shadowRoot!.querySelector('.setpoint-caption')).toBeNull();
    // The curves and the min/max marks stay untouched.
    expect(hidden.shadowRoot!.querySelectorAll('.series-line').length).toBeGreaterThan(0);
    expect(hidden.shadowRoot!.querySelectorAll('.extreme-label').length).toBeGreaterThan(0);
    // Description and picture stay in sync: no line, no “target” in the spoken text.
    expect(hidden.shadowRoot!.querySelector('svg')?.getAttribute('aria-label')).not.toContain('Soll');
  });

  it('speaks the measured range in the accessible description', async () => {
    const chart = createChart({ temperature: samples([19, 21, 23, 20]) });
    setSize(chart, 320, 130);
    await chart.updateComplete;
    const aria = chart.shadowRoot!.querySelector('svg')?.getAttribute('aria-label') ?? '';
    expect(aria).toContain('Temperatur 19,0–23,0 °C');
  });
  it('keeps the curve in one accent colour until the bands are switched on', async () => {
    const chart = createChart({ temperature: samples([17, 22, 28]), accentColor: '#4FD1A5' });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    expect(chart.shadowRoot!.querySelector('[id$="-temp-stroke"]')).toBeNull();
    const line = chart.shadowRoot!.querySelector('.series-line') as SVGPathElement;
    expect(line.style.stroke).toBe('#4FD1A5');
  });

  it('paints the temperature curve in solid colour runs instead of one gradient stroke', async () => {
    const chart = createChart({
      temperature: samples(Array.from({ length: 12 }, (_, index) => 17 + index)),
      accentColor: '#4FD1A5',
      temperatureBands: true,
      bandCold: 18,
      bandWarm: 24,
      bandHot: 27,
    });
    setSize(chart, 360, 130);
    await chart.updateComplete;

    /*
     * `stroke:url(#…)` is dropped by some WebViews (the Home Assistant app among
     * them): the curve then comes out in one flat colour while the area keeps its
     * gradient. The curve is painted in solid runs instead – no paint server on a
     * stroke anywhere.
     */
    expect(chart.shadowRoot!.querySelector('[id$="-temp-stroke"]')).toBeNull();
    for (const line of chart.shadowRoot!.querySelectorAll('.series-line')) {
      expect((line as SVGPathElement).style.stroke).not.toContain('url(');
    }

    const lines = Array.from(chart.shadowRoot!.querySelectorAll('.series-line')) as SVGPathElement[];
    expect(lines.length).toBeGreaterThan(2);
    const colours = lines.map((line) => line.style.stroke);
    for (const colour of colours) expect(colour).toMatch(/^#[0-9a-f]{6}$/);
    expect(new Set(colours).size).toBeGreaterThan(2);

    /* The curve rises from 17 to 28 °C: it starts cold, passes mint and ends hot. */
    const channels = (colour: string): number[] => [
      parseInt(colour.slice(1, 3), 16),
      parseInt(colour.slice(3, 5), 16),
      parseInt(colour.slice(5, 7), 16),
    ];
    const distance = (a: string, b: string): number => {
      const [x, y] = [channels(a), channels(b)];
      return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]);
    };
    const first = colours[0];
    const last = colours[colours.length - 1];
    expect(distance(first, '#7fa6d9')).toBeLessThan(distance(first, '#d16a62'));
    expect(distance(last, '#d16a62')).toBeLessThan(distance(last, '#7fa6d9'));
    // Normal stage wears the accent, so nothing new enters the palette.
    expect(colours.some((colour) => distance(colour, '#4fd1a5') < 24)).toBe(true);

    /* One curve, not a staircase: the runs are wrapped as one painted group. */
    const groups = chart.shadowRoot!.querySelectorAll('g.series-runs');
    expect(groups).toHaveLength(1);
    expect(groups[0].querySelectorAll('path.series-line')).toHaveLength(lines.length);
    // Every joint is butt-capped, only the two visible ends of the curve are round.
    const caps = lines.map((line) => line.style.strokeLinecap);
    expect(caps[0]).toBe('round');
    expect(caps[caps.length - 1]).toBe('round');
    expect(caps.slice(1, -1).every((cap) => cap === 'butt')).toBe(true);

    /* The area keeps its vertical gradient – that one paints fine everywhere. */
    const gradient = chart.shadowRoot!.querySelector('[id$="-temp-fill"]');
    expect(gradient).not.toBeNull();
    const stops = Array.from(gradient!.querySelectorAll('stop')).map((stop) =>
      (stop.getAttribute('stop-color') ?? '').toLowerCase()
    );
    expect(stops[0]).toBe('#d16a62');
    expect(stops[stops.length - 1]).toBe('#7fa6d9');
    expect(stops).toContain('#4fd1a5');
  });

  it('names the bands in the accessible description instead of leaving a gradient', async () => {
    const chart = createChart({
      temperature: samples([17, 28]),
      temperatureBands: true,
      bandCold: 18,
      bandWarm: 24,
      bandHot: 27,
      labels: {
        ...labels,
        bandColdText: 'kalt',
        bandNormalText: 'normal',
        bandWarmText: 'warm',
        bandHotText: 'heiß',
      },
    });
    setSize(chart, 320, 130);
    await chart.updateComplete;
    const aria = chart.shadowRoot!.querySelector('svg')?.getAttribute('aria-label') ?? '';
    expect(aria).toContain('(kalt – heiß)');
  });

  it('dims line, area and points with the configured opacity', async () => {
    const chart = createChart({
      temperature: samples([20, 21, 22]),
      humidity: samples([45, 47, 52]),
      chartOpacity: 40,
      showPoints: true,
    });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    const root = chart.shadowRoot!;
    const line = root.querySelector('.series-line') as SVGPathElement;
    expect(line.style.strokeOpacity).toBe('0.4');
    const point = root.querySelector('.point') as SVGCircleElement;
    expect(point.style.strokeOpacity).toBe('0.4');

    // The fills keep their relative falloff, only scaled down.
    const tempStops = Array.from(root.querySelectorAll('[id$="-temp-fill"] stop')).map((stop) =>
      Number(stop.getAttribute('stop-opacity'))
    );
    expect(tempStops[0]).toBeCloseTo(0.22 * 0.4, 3);
    expect(tempStops[tempStops.length - 1]).toBe(0);
    const humidityStops = Array.from(root.querySelectorAll('[id$="-humidity-fill"] stop')).map(
      (stop) => Number(stop.getAttribute('stop-opacity'))
    );
    expect(humidityStops[0]).toBeCloseTo(0.2 * 0.4, 3);
  });

  it('dims a banded curve as one group so the overlaps do not darken', async () => {
    const chart = createChart({
      temperature: samples(Array.from({ length: 12 }, (_, index) => 17 + index)),
      chartOpacity: 40,
      temperatureBands: true,
    });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    /*
     * The colour runs overlap by a fraction of a pixel to hide the anti-aliasing
     * seam. Per-path opacity would turn every overlap into a darker spot, so the
     * group carries the opacity and the paths stay fully opaque.
     */
    const group = chart.shadowRoot!.querySelector('g.series-runs') as SVGGElement;
    expect(group.style.opacity).toBe('0.4');
    for (const line of group.querySelectorAll('path.series-line')) {
      expect((line as SVGPathElement).style.strokeOpacity).toBe('');
    }
  });

  it('leaves the full opacity untouched at 100 %', async () => {
    const chart = createChart({ temperature: samples([20, 21, 22]), chartOpacity: 100 });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    const line = chart.shadowRoot!.querySelector('.series-line') as SVGPathElement;
    // No `stroke-opacity` at all: the attribute stays a single stroke colour.
    expect(line.getAttribute('style')).not.toContain('stroke-opacity');
  });

  it('clamps an opacity outside the allowed range instead of drawing an invisible curve', async () => {
    const chart = createChart({ temperature: samples([20, 21, 22]), chartOpacity: 1 });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    const line = chart.shadowRoot!.querySelector('.series-line') as SVGPathElement;
    expect(line.style.strokeOpacity).toBe('0.15');
  });

  it('reads the end dot from the same ramp as the curve it sits on', async () => {
    const chart = createChart({
      temperature: samples([17, 22, 28]),
      temperatureBands: true,
      bandCold: 18,
      bandWarm: 24,
      bandHot: 27,
    });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    const dot = Array.from(chart.shadowRoot!.querySelectorAll('.end-dot')).find((node) =>
      (node.getAttribute('style') ?? '').includes('#')
    ) as SVGCircleElement;
    /*
     * The dot ends the drawn line, so it takes the colour of the ramp at exactly
     * that height – not the flat colour of the stage. Otherwise the dot can sit
     * on the curve in a slightly different red.
     */
    expect(dot.style.fill).toMatch(/^#[0-9a-f]{6}$/);
    const lines = Array.from(chart.shadowRoot!.querySelectorAll('.series-line')) as SVGPathElement[];
    const lastColour = lines[lines.length - 1].style.stroke.toLowerCase();
    expect(dot.style.fill.toLowerCase()).toBe(lastColour);
    // The last value is 28 °C: the dot is firmly in the hot end of the ramp.
    expect(parseInt(dot.style.fill.slice(1, 3), 16)).toBeGreaterThan(180);
  });

  it('draws a visibly different curve for every smoothing level', async () => {
    // 24 h of five-minute values: a slow sine plus sensor jitter.
    const values = Array.from({ length: 288 }, (_, i) =>
      Math.round((21 + Math.sin(i / 40) * 0.8 + (((i * 37) % 7) - 3) * 0.03) * 10) / 10
    );
    const paths: Record<string, string> = {};
    for (const level of ['none', 'light', 'medium', 'strong'] as const) {
      document.body.replaceChildren();
      const chart = createChart({
        temperature: samples(values),
        smoothing: level,
        curve: 'smooth',
      });
      setSize(chart, 360, 130);
      await chart.updateComplete;
      paths[level] = chart.shadowRoot!.querySelector('path.series-line')?.getAttribute('d') ?? '';
    }
    expect(paths.none.length).toBeGreaterThan(0);
    expect(paths.light).not.toBe(paths.none);
    expect(paths.medium).not.toBe(paths.light);
    expect(paths.strong).not.toBe(paths.medium);

    // And they calm down in the right order. Total variation of the drawn
    // vertices is the honest measure: every wiggle adds to it, a straight line
    // has none – this is what "ruhiger" means visually.
    const variation = (path: string): number => {
      const numbers = (path.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
      const ys: number[] = [];
      for (let index = 0; index + 1 < numbers.length; index += 6) ys.push(numbers[index + 1]);
      ys.push(numbers[numbers.length - 1]);
      let total = 0;
      for (let index = 1; index < ys.length; index++) total += Math.abs(ys[index] - ys[index - 1]);
      return total;
    };
    expect(variation(paths.light)).toBeLessThan(variation(paths.none) * 0.75);
    expect(variation(paths.medium)).toBeLessThan(variation(paths.light) * 0.85);
    expect(variation(paths.strong)).toBeLessThan(variation(paths.medium));
  });

  it('puts the end dot on the drawn curve, not on the raw measurement', async () => {
    // 6 h at five-minute resolution: "strong" averages 15 samples, so the last
    // drawn value differs clearly from the last measurement (rising room).
    const rising = Array.from({ length: 72 }, (_, i) => Math.round((20 + i * 0.05) * 10) / 10);
    const damp = Array.from({ length: 72 }, (_, i) => Math.round((45 + i * 0.1) * 10) / 10);
    const chart = createChart({
      temperature: samples(rising),
      humidity: samples(damp),
      smoothing: 'strong',
      curve: 'smooth',
    });
    setSize(chart, 360, 130);
    await chart.updateComplete;

    const paths = Array.from(chart.shadowRoot!.querySelectorAll('path.series-line'));
    const dots = Array.from(chart.shadowRoot!.querySelectorAll('.end-dot')) as SVGCircleElement[];
    // Both series are drawn, dots in the same order as the paths.
    expect(paths.length).toBe(2);
    expect(dots.length).toBe(2);

    paths.forEach((path, index) => {
      const dot = dots[index];
      const dotX = Number(dot.getAttribute('cx'));
      const dotY = Number(dot.getAttribute('cy'));
      // The dot sits on a vertex of the drawn curve – the path continues a few
      // pixels past it (flat hold to the edge), so it is not the last vertex.
      const onCurve = verticesOf(path.getAttribute('d') ?? '').find(
        (vertex) => Math.abs(vertex.x - dotX) < 0.5
      );
      expect(onCurve).toBeDefined();
      expect(dotY).toBeCloseTo(onCurve!.y, 1);
      // …and the hold carries exactly that value to the edge.
      const vertices = verticesOf(path.getAttribute('d') ?? '');
      expect(vertices[vertices.length - 1].y).toBeCloseTo(dotY, 1);
    });
  });

  it('keeps the end dot on the line without smoothing as well', async () => {
    const chart = createChart({
      temperature: samples([20, 21, 22, 23, 23.4]),
      smoothing: 'none',
      curve: 'smooth',
    });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    const path = chart.shadowRoot!.querySelector('path.series-line');
    const vertices = verticesOf(path?.getAttribute('d') ?? '');
    const dot = chart.shadowRoot!.querySelector('.end-dot') as SVGCircleElement;
    const dotX = Number(dot.getAttribute('cx'));
    const onCurve = vertices.find((vertex) => Math.abs(vertex.x - dotX) < 0.5);
    expect(onCurve).toBeDefined();
    expect(Number(dot.getAttribute('cy'))).toBeCloseTo(onCurve!.y, 1);
  });
  it('strengthens each area fill on its own without touching the curves', async () => {
    const chart = createChart({
      temperature: samples([20, 21, 22]),
      humidity: samples([45, 47, 52]),
      temperatureAreaOpacity: 2,
      humidityAreaOpacity: 0.5,
    });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    const root = chart.shadowRoot!;
    const tempStops = Array.from(root.querySelectorAll('[id$="-temp-fill"] stop')).map((stop) =>
      Number(stop.getAttribute('stop-opacity'))
    );
    const humidityStops = Array.from(root.querySelectorAll('[id$="-humidity-fill"] stop')).map(
      (stop) => Number(stop.getAttribute('stop-opacity'))
    );
    // Twice the built-in falloff (0.22 → 0.44), still fading to nothing.
    expect(tempStops[0]).toBeCloseTo(0.44, 2);
    expect(tempStops[tempStops.length - 1]).toBe(0);
    expect(humidityStops[0]).toBeCloseTo(0.1, 2);
    // The curves themselves are untouched: the strength is a fill property.
    const line = root.querySelector('.series-line') as SVGPathElement;
    expect(line.getAttribute('style')).not.toContain('stroke-opacity');
  });

  it('multiplies area strength and curve opacity instead of replacing one with the other', async () => {
    const chart = createChart({
      temperature: samples([20, 21, 22]),
      temperatureAreaOpacity: 2,
      chartOpacity: 50,
    });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    const stops = Array.from(
      chart.shadowRoot!.querySelectorAll('[id$="-temp-fill"] stop')
    ).map((stop) => Number(stop.getAttribute('stop-opacity')));
    expect(stops[0]).toBeCloseTo(0.22 * 2 * 0.5, 2);
  });

  it('never lets an area fill become a solid block', async () => {
    const chart = createChart({ temperature: samples([20, 21, 22]), temperatureAreaOpacity: 8 });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    const stops = Array.from(
      chart.shadowRoot!.querySelectorAll('[id$="-temp-fill"] stop')
    ).map((stop) => Number(stop.getAttribute('stop-opacity')));
    expect(Math.max(...stops)).toBeLessThanOrEqual(1);
  });

});

describe('axis, caption and keyboard', () => {
  beforeEach(() => {
    document.body.replaceChildren();
  });

  const axisLabels = (chart: RoomClimateChart): string[] =>
    Array.from(chart.shadowRoot!.querySelectorAll('.axis-label')).map(
      (label) => label.textContent?.trim() ?? ''
    );

  it('puts the axis labels on full hours instead of the window start', async () => {
    const start = Date.UTC(2026, 9, 24, 6, 13);
    const end = Date.UTC(2026, 9, 24, 12, 13);
    const chart = createChart({
      temperature: [
        { t: start, v: 20 },
        { t: end, v: 21 },
      ],
      start,
      end,
      timeZone: 'UTC',
    });
    setSize(chart, 420, 140);
    await chart.updateComplete;
    // Not "Sa 06:13": round times, and "Jetzt" at the right end.
    expect(axisLabels(chart)).toEqual(['Sa 08:00', 'Sa 10:00', 'Jetzt']);
  });

  it('rounds to full hours of the configured time zone', async () => {
    const start = Date.UTC(2026, 9, 24, 6, 13);
    const end = Date.UTC(2026, 9, 24, 12, 13);
    const chart = createChart({
      temperature: [
        { t: start, v: 20 },
        { t: end, v: 21 },
      ],
      start,
      end,
      timeZone: 'Europe/Berlin',
    });
    setSize(chart, 420, 140);
    await chart.updateComplete;
    // 08:13–14:13 in Berlin (summer time): 10:00 and 12:00 local.
    expect(axisLabels(chart)).toEqual(['Sa 10:00', 'Sa 12:00', 'Jetzt']);
  });

  it('labels a week by weekday at midnight', async () => {
    const end = Date.UTC(2026, 9, 24, 12, 13);
    const start = end - 7 * 24 * 3600_000;
    const chart = createChart({
      temperature: [
        { t: start, v: 20 },
        { t: end, v: 21 },
      ],
      start,
      end,
      timeZone: 'UTC',
    });
    setSize(chart, 420, 140);
    await chart.updateComplete;
    const labels = axisLabels(chart);
    expect(labels[labels.length - 1]).toBe('Jetzt');
    expect(labels.length).toBeGreaterThanOrEqual(3);
    for (const label of labels.slice(0, -1)) expect(label).toMatch(/^[A-Z][a-z]$/);
  });

  it('moves the "Soll" caption off the curve near its end', async () => {
    const start = now - 6 * 3600_000;
    const series: ChartSample[] = Array.from({ length: 31 }, (_, index) => ({
      t: start + index * 12 * 60_000,
      // On the target the whole time, just above it at the end.
      v: index > 25 ? 21.04 : 21,
    }));
    const chart = createChart({
      temperature: series,
      setpoint: 21,
      showSetpoint: true,
      curve: 'linear',
      showExtremes: false,
    });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    const line = chart.shadowRoot!.querySelector('.setpoint-line')!;
    const caption = chart.shadowRoot!.querySelector('.setpoint-caption')!;
    const lineY = Number(line.getAttribute('y1'));
    // Above the line at either end the letters would touch the curve: below it.
    expect(Number(caption.getAttribute('y'))).toBeGreaterThan(lineY);
  });

  it('lets the keyboard walk through the measured values', async () => {
    const chart = createChart({
      temperature: samples([20, 21, 22, 23]),
      humidity: samples([40, 41, 42, 43]),
      labels: { ...labels, explore: 'Verlauf: Pfeiltasten wählen einen Messwert' },
    });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    const overlay = chart.shadowRoot!.querySelector('.overlay') as HTMLElement;
    expect(overlay.getAttribute('tabindex')).toBe('0');
    expect(overlay.getAttribute('aria-label')).toBe('Verlauf: Pfeiltasten wählen einen Messwert');
    const hover = chart.shadowRoot!.querySelector('.hover') as HTMLElement;
    const live = chart.shadowRoot!.querySelector('[aria-live="polite"]') as HTMLElement;

    overlay.dispatchEvent(new FocusEvent('focus'));
    expect(hover.hidden).toBe(false);
    expect(live.textContent).toContain('23,0');

    overlay.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    expect(live.textContent).toContain('22,0');
    expect(live.textContent).toContain('42,0');

    overlay.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    expect(live.textContent).toContain('20,0');

    overlay.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(hover.hidden).toBe(true);
  });
});
