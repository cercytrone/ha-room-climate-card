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

  it('lets one series be switched off without losing the other', async () => {
    const chart = createChart({
      temperature: samples([20, 21, 22]),
      humidity: samples([45, 47, 52]),
      hiddenSeries: ['humidity'],
    });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    const lines = Array.from(chart.shadowRoot!.querySelectorAll('.series-line')) as SVGPathElement[];
    expect(lines).toHaveLength(1);
    expect(lines[0].style.stroke).toBe('#4FD1A5');
    expect(chart.shadowRoot!.querySelector('.state-title')).toBeNull();
  });

  it('keeps the chart box when both series are switched off', async () => {
    const chart = createChart({
      temperature: samples([20, 21, 22]),
      humidity: samples([45, 47, 52]),
      hiddenSeries: ['temperature', 'humidity'],
    });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    expect(chart.shadowRoot!.querySelectorAll('.series-line')).toHaveLength(0);
    // No empty-state text: the layout must not jump when toggling.
    expect(chart.shadowRoot!.querySelector('.state-title')).toBeNull();
    expect(chart.shadowRoot!.querySelector('.baseline')).not.toBeNull();
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
    const first = chart.shadowRoot!.querySelector('.axis-label')!;
    expect(Number(first.getAttribute('x'))).toBeLessThan(20);
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
    expect(startX).toBeLessThanOrEqual(2);
    expect(endX).toBeGreaterThanOrEqual(318);
    expect(Math.max(...xs)).toBeGreaterThanOrEqual(318);
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

  it('leaves the extremes alone when they are switched off or space is tight', async () => {
    const off = createChart({
      temperature: samples([19, 21, 23, 20]),
      showExtremes: false,
    });
    setSize(off, 320, 130);
    await off.updateComplete;
    expect(off.shadowRoot!.querySelector('.extreme-label')).toBeNull();

    const narrow = createChart({ temperature: samples([19, 21, 23, 20]) });
    setSize(narrow, 180, 130);
    await narrow.updateComplete;
    expect(narrow.shadowRoot!.querySelector('.extreme-label')).toBeNull();
  });

  it('speaks the measured range in the accessible description', async () => {
    const chart = createChart({ temperature: samples([19, 21, 23, 20]) });
    setSize(chart, 320, 130);
    await chart.updateComplete;
    const aria = chart.shadowRoot!.querySelector('svg')?.getAttribute('aria-label') ?? '';
    expect(aria).toContain('Temperatur 19,0–23,0 °C');
  });
});
