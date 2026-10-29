import { beforeEach, describe, expect, it } from 'vitest';
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
    expect(svg.getAttribute('aria-label')).toBe(labels.aria);
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

  it('draws temperature and humidity series with gradient fills', async () => {
    const chart = createChart({
      temperature: samples([20, 21, 22, 21, 20.5]),
      humidity: samples([45, 47, 52, 55, 50]),
      showLegend: true,
    });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    const root = chart.shadowRoot!;
    expect(root.querySelectorAll('.series-line')).toHaveLength(2);
    // jsdom lowercases type selectors, so gradients are found by attribute.
    expect(root.querySelectorAll('[id$="-temp-stroke"]')).toHaveLength(1);
    expect(root.querySelectorAll('[id$="-temp-fill"]')).toHaveLength(1);
    expect(root.querySelectorAll('[id$="-humidity-fill"]')).toHaveLength(1);
    expect(root.querySelectorAll('stop').length).toBeGreaterThan(4);
    expect(root.querySelectorAll('.legend-item')).toHaveLength(2);
    expect(root.querySelectorAll('.axis-label').length).toBeGreaterThanOrEqual(2);
    expect(root.querySelectorAll('.grid-line').length).toBe(3);
  });

  it('blends the temperature bands over a wide ramp instead of a hard edge', async () => {
    // A series that clearly crosses several bands.
    const chart = createChart({
      temperature: samples([16, 18, 21, 24, 27, 29, 27, 24, 21, 18, 16]),
      bands: { cool: 19, warm: 25, hot: 28 },
    });
    setSize(chart, 420, 200);
    await chart.updateComplete;

    const stroke = chart.shadowRoot!.querySelector('[id$="-temp-stroke"]')!;
    const stops = Array.from(stroke.querySelectorAll('stop'));
    // Wide fades need intermediate colours: a two-stop-per-band gradient would
    // only produce a handful of stops.
    expect(stops.length).toBeGreaterThan(12);

    const colours = new Set(stops.map((stop) => stop.getAttribute('stop-color')));
    expect(colours.has('#38bdf8')).toBe(true);
    expect(colours.has('#fbbf24')).toBe(true);
    // Blended colours in between are neither of the band colours.
    const mixed = Array.from(colours).filter(
      (colour) => colour !== '#38bdf8' && colour !== '#fbbf24' && colour !== '#34d399' && colour !== '#f43f5e'
    );
    expect(mixed.length).toBeGreaterThan(2);

    // Offsets stay strictly ascending, otherwise SVG ignores the later stops.
    const offsets = stops.map((stop) => Number(stop.getAttribute('offset')));
    for (let i = 1; i < offsets.length; i++) {
      expect(offsets[i]).toBeGreaterThan(offsets[i - 1]);
    }
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

    // Default humidity colour of the chart is #34d399; the temperature uses a
    // gradient reference, so both lines are easy to tell apart.
    const humidityLine = lines.find((line) => line.style.stroke === '#34d399');
    const temperatureLine = lines.find((line) => line.style.stroke.includes('temp-stroke'));
    expect(humidityLine).toBeDefined();
    expect(humidityLine?.style.strokeDasharray).toBe('0.1 5.5');
    // The temperature curve is untouched.
    expect(temperatureLine?.style.strokeDasharray).toBe('');
    // The area underneath stays filled, only the stroke is dotted.
    expect(chart.shadowRoot!.querySelectorAll('path[style*="humidity-fill"]')).toHaveLength(1);
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

  it('shows series names only in the legend, without repeating the values', async () => {
    const chart = createChart({
      temperature: samples([20, 21, 22]),
      humidity: samples([45, 47, 52]),
      showLegend: true,
    });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    const legend = chart.shadowRoot!.querySelector('.legend')!;
    const items = Array.from(legend.querySelectorAll('.legend-item'));
    expect(items.map((item) => item.textContent?.trim())).toEqual(['Temperatur', 'Luftfeuchte']);
    // The current values live in the big readings above the chart.
    expect(legend.querySelector('.legend-value')).toBeNull();
    expect(legend.textContent).not.toContain('°C');
    expect(legend.textContent).not.toContain('%');
  });

  it('hides the legend on small charts', async () => {
    const chart = createChart({ temperature: samples([20, 21]), showLegend: true });
    setSize(chart, 320, 70);
    await chart.updateComplete;
    expect(chart.shadowRoot!.querySelectorAll('.legend-item')).toHaveLength(0);
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
});
