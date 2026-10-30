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

  it('draws both series in their own colour with one restrained area fill', async () => {
    const chart = createChart({
      temperature: samples([20, 21, 22, 21, 20.5]),
      humidity: samples([45, 47, 52, 55, 50]),
    });
    setSize(chart, 360, 130);
    await chart.updateComplete;
    const root = chart.shadowRoot!;
    expect(root.querySelectorAll('.series-line')).toHaveLength(2);
    // Gradient definitions exist, but the stroke is a single accent colour…
    expect(root.querySelectorAll('[id$="-temp-stroke"]')).toHaveLength(1);
    expect(root.querySelectorAll('[id$="-temp-fill"]')).toHaveLength(1);
    expect(root.querySelectorAll('stop')).toHaveLength(5);
    // …and the humidity has no area fill at all: one gradient, one surface.
    expect(root.querySelectorAll('[id$="-humidity-fill"]')).toHaveLength(0);
    expect(root.querySelectorAll('path[style*="temp-fill"]')).toHaveLength(1);
    // No legend: the colour dot lives next to the reading, not in the chart.
    expect(root.querySelector('.legend')).toBeNull();
    expect(root.querySelector('.legend-item')).toBeNull();
    expect(root.querySelectorAll('.axis-label').length).toBe(3);
    // The grid is opt-in now – by default there is only the hairline baseline.
    expect(root.querySelectorAll('.grid-line')).toHaveLength(0);
    expect(root.querySelectorAll('.baseline')).toHaveLength(1);
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
    const stop = chart.shadowRoot!.querySelector('[id$="-temp-stroke"] stop')!;
    expect(stop.getAttribute('stop-color')).toBe('#4FD1A5');
    expect(stop.getAttribute('stop-opacity')).toBe('1');
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
    expect(lines[0].style.stroke).toContain('temp-stroke');
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
    const temperatureLine = lines.find((line) => line.style.stroke.includes('temp-stroke'));
    expect(humidityLine).toBeDefined();
    expect(humidityLine?.style.strokeDasharray).toBe('0.1 5.5');
    // The temperature curve is untouched.
    expect(temperatureLine?.style.strokeDasharray).toBe('');
    // The humidity has no area fill at all – only its stroke is dotted.
    expect(chart.shadowRoot!.querySelectorAll('[id$="humidity-fill"]')).toHaveLength(0);
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
});
