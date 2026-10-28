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

  it('breaks the line over data gaps', async () => {
    const chart = createChart({
      temperature: samples([20, 21, null, null, 22, 23]),
    });
    setSize(chart, 320, 90);
    await chart.updateComplete;
    expect(chart.shadowRoot!.querySelectorAll('.series-line')).toHaveLength(2);
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
