import { LitElement, css, html, nothing, svg, type TemplateResult } from 'lit';
import { MAX_CHART_POINTS } from '../const';
import type { TemperatureBandColors } from '../config';
import {
  areaPath,
  bandColorFor,
  buildRuns,
  decimate,
  extent,
  linearScale,
  padDomain,
  projectRun,
  seriesPath,
  temperatureGradientStops,
  tickCountForWidth,
  timeTicks,
  verticalFadeStops,
  type ChartSample,
} from './geometry';

const FALLBACK_WIDTH = 320;
const FALLBACK_HEIGHT = 84;

let uidCounter = 0;

export interface ChartLabels {
  empty: string;
  emptyHint: string;
  loading: string;
  error: string;
  aria: string;
  temperature: string;
  humidity: string;
}

export class RoomClimateChart extends LitElement {
  static properties = {
    temperature: { attribute: false },
    humidity: { attribute: false },
    temperatureValue: { attribute: false },
    humidityValue: { attribute: false },
    bandColors: { attribute: false },
    bands: { attribute: false },
    humidityColor: { attribute: false },
    start: { attribute: false },
    end: { attribute: false },
    showLegend: { attribute: false },
    showPoints: { attribute: false },
    showGrid: { attribute: false },
    curve: { attribute: false },
    language: { attribute: false },
    loading: { attribute: false },
    error: { attribute: false },
    labels: { attribute: false },
  };

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 0;
      position: relative;
      --rcc-chart-label: var(--rcc-muted, #94a3b8);
      --rcc-chart-grid: var(--rcc-text, #e2e8f0);
      --rcc-chart-point-fill: var(--rcc-bg, #162032);
    }
    :host([hidden]) {
      display: none;
    }
    .wrap {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .legend {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      padding: 0 14px 2px;
      font-size: 10px;
      line-height: 1.2;
      color: var(--rcc-chart-label);
      letter-spacing: 0.01em;
    }
    .legend-item {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      white-space: nowrap;
    }
    .legend-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex: none;
    }
    .legend-value {
      color: var(--rcc-text, inherit);
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }
    svg {
      display: block;
      flex: 0 0 auto;
      overflow: visible;
    }
    .state {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      padding: 6px 16px 10px;
      color: var(--rcc-chart-label);
      text-align: center;
    }
    .state-title {
      font-size: 11px;
      font-weight: 600;
      color: var(--rcc-text);
      opacity: 0.85;
    }
    .state-hint {
      font-size: 10px;
      line-height: 1.3;
      max-width: 34ch;
      opacity: 0.75;
    }
    .state svg {
      width: 18px;
      height: 18px;
      flex: none;
      stroke: currentColor;
      fill: none;
      stroke-width: 1.6;
      opacity: 0.7;
      margin-bottom: 2px;
    }
    .axis-label {
      font-size: 9.5px;
      fill: var(--rcc-chart-label);
      font-variant-numeric: tabular-nums;
    }
    .grid-line {
      stroke: var(--rcc-chart-grid);
      stroke-opacity: 0.1;
      stroke-width: 1;
      stroke-dasharray: 2 4;
    }
    .baseline {
      stroke: var(--rcc-chart-grid);
      stroke-opacity: 0.16;
      stroke-width: 1;
    }
    .series-line {
      fill: none;
      stroke-width: 1.9;
      stroke-linecap: round;
      stroke-linejoin: round;
      vector-effect: non-scaling-stroke;
    }
    .point {
      stroke-width: 1.2;
      fill: var(--rcc-chart-point-fill);
    }
    .end-dot {
      stroke: var(--rcc-chart-point-fill);
      stroke-width: 1.5;
    }
    @media (prefers-reduced-motion: reduce) {
      * {
        transition: none !important;
      }
    }
  `;

  temperature?: ChartSample[];
  humidity?: ChartSample[];
  temperatureValue?: string;
  humidityValue?: string;
  bandColors: TemperatureBandColors = {
    cool: '#38bdf8',
    comfort: '#34d399',
    warm: '#fbbf24',
    hot: '#f43f5e',
  };
  bands: { cool: number; warm: number; hot: number } = { cool: 19, warm: 25, hot: 28 };
  humidityColor = '#34d399';
  start = Date.now() - 6 * 3600 * 1000;
  end = Date.now();
  showLegend = false;
  showPoints = false;
  showGrid = true;
  curve: 'smooth' | 'linear' = 'smooth';
  language = 'de';
  loading = false;
  error?: string;
  labels: ChartLabels = {
    empty: 'Keine Verlaufsdaten',
    emptyHint: '',
    loading: 'Verlauf wird geladen …',
    error: 'Verlauf konnte nicht geladen werden',
    aria: 'Verlaufsdiagramm',
    temperature: 'Temperatur',
    humidity: 'Luftfeuchte',
  };

  private uid = `rcc-chart-${++uidCounter}`;
  private width = 0;
  private height = 0;
  private resizeObserver?: ResizeObserver;

  connectedCallback(): void {
    super.connectedCallback();
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;
        const box = entry.contentRect;
        this.applySize(box.width, box.height);
      });
      this.resizeObserver.observe(this);
    }
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(() => this.measure());
    } else {
      this.measure();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
  }

  private measure(): void {
    const rect = this.getBoundingClientRect();
    this.applySize(rect.width, rect.height);
  }

  private applySize(width: number, height: number): void {
    const nextWidth = Math.round(width);
    const nextHeight = Math.round(height);
    if (nextWidth === this.width && nextHeight === this.height) return;
    this.width = nextWidth;
    this.height = nextHeight;
    this.requestUpdate();
  }

  /** Exposed for tests and the editor preview. */
  setSize(width: number, height: number): void {
    this.applySize(width, height);
  }

  get chartSize(): { width: number; height: number } {
    return {
      width: this.width > 20 ? this.width : FALLBACK_WIDTH,
      height: this.height > 20 ? this.height : FALLBACK_HEIGHT,
    };
  }

  private stateView(icon: TemplateResult, title: string, hint?: string): TemplateResult {
    return html`<div class="wrap">
      <div class="state" role="status">
        ${icon}
        <span class="state-title">${title}</span>
        ${hint ? html`<span class="state-hint">${hint}</span>` : nothing}
      </div>
    </div>`;
  }

  private get hasData(): boolean {
    return Boolean(this.temperature?.some((s) => s.v !== null) || this.humidity?.some((s) => s.v !== null));
  }

  protected render(): TemplateResult | typeof nothing {
    const { width, height } = this.chartSize;
    if (width < 40 || height < 34) return nothing;

    const errorIcon = svg`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>`;
    const emptyIcon = svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" /></svg>`;

    if (this.error && !this.hasData) {
      return this.stateView(errorIcon, this.labels.error);
    }
    if (!this.hasData) {
      if (this.loading) return this.stateView(emptyIcon, this.labels.loading);
      return this.stateView(emptyIcon, this.labels.empty, this.labels.emptyHint);
    }

    return html`<div class="wrap">${this.renderLegend(height)}${this.renderChart(width, height)}</div>`;
  }

  private renderLegend(height: number): TemplateResult | typeof nothing {
    if (!this.showLegend || height < 96) return nothing;
    const compact = this.chartSize.width < 210;
    const items: TemplateResult[] = [];
    if (this.temperature?.length) {
      items.push(
        html`<span class="legend-item"
          ><span class="legend-dot" style="background:${this.bandColors.comfort}"></span
          >${this.labels.temperature}${!compact && this.temperatureValue
            ? html`<span class="legend-value">· ${this.temperatureValue}</span>`
            : nothing}</span
        >`
      );
    }
    if (this.humidity?.length) {
      items.push(
        html`<span class="legend-item"
          ><span class="legend-dot" style="background:${this.humidityColor}"></span
          >${this.labels.humidity}${!compact && this.humidityValue
            ? html`<span class="legend-value">· ${this.humidityValue}</span>`
            : nothing}</span
        >`
      );
    }
    return html`<div class="legend">${items}</div>`;
  }

  private renderChart(width: number, height: number): TemplateResult {
    const legendSpace = this.showLegend && height >= 96 ? 14 : 0;
    const chartHeight = Math.max(20, height - legendSpace);
    const showAxis = chartHeight >= 62;
    const axisSpace = showAxis ? 13 : 2;
    const top = 5;
    const bottom = chartHeight - axisSpace;
    const plotHeight = Math.max(6, bottom - top);
    const left = 1;
    const right = width - 1;
    const rangeMs = Math.max(1, this.end - this.start);
    const x = linearScale([this.start, this.end], [left, right]);

    const temperatureValues = (this.temperature ?? [])
      .map((sample) => sample.v)
      .filter((value): value is number => value !== null && Number.isFinite(value));
    const humidityValues = (this.humidity ?? [])
      .map((sample) => sample.v)
      .filter((value): value is number => value !== null && Number.isFinite(value));

    const tempExtent = extent(temperatureValues);
    const humidityExtent = extent(humidityValues);
    const tempDomain = tempExtent ? padDomain(tempExtent[0], tempExtent[1], { minSpan: 0.8, padding: 0.14 }) : null;
    const humidityDomain = humidityExtent
      ? padDomain(humidityExtent[0], humidityExtent[1], { minSpan: 6, padding: 0.16 })
      : null;

    const tempY = tempDomain ? linearScale(tempDomain, [bottom, top]) : null;
    const humidityY = humidityDomain ? linearScale(humidityDomain, [bottom, top]) : null;

    const tempSeries = this.temperature ?? [];
    const humiditySeries = this.humidity ?? [];

    // Split first (honours null markers / gaps), then limit point count per run.
    const rawTempRuns = tempDomain ? buildRuns(tempSeries, rangeMs).runs : [];
    const rawHumidityRuns = humidityDomain ? buildRuns(humiditySeries, rangeMs).runs : [];
    const perRunLimit = Math.max(60, Math.floor(MAX_CHART_POINTS / Math.max(1, rawTempRuns.length + rawHumidityRuns.length)));
    const tempRuns = rawTempRuns.map((run) => decimate(run, perRunLimit));
    const humidityRuns = rawHumidityRuns.map((run) => decimate(run, perRunLimit));

    const tempGradient = tempDomain
      ? temperatureGradientStops({
          top,
          bottom,
          domain: tempDomain,
          thresholds: this.bands,
          colors: this.bandColors,
          opacityTop: 1,
          opacityBottom: 1,
        })
      : [];
    const tempFillGradient = tempDomain
      ? temperatureGradientStops({
          top,
          bottom,
          domain: tempDomain,
          thresholds: this.bands,
          colors: this.bandColors,
          opacityTop: 0.3,
          opacityBottom: 0.02,
        })
      : [];
    const humidityGradient = verticalFadeStops(this.humidityColor, 0.28, 0.02);

    const gridLines: TemplateResult[] = [];
    if (this.showGrid) {
      for (let i = 0; i < 3; i++) {
        const y = top + (plotHeight * i) / 2;
        gridLines.push(svg`<line class="grid-line" x1=${left} x2=${right} y1=${y} y2=${y} />`);
      }
    }

    const ticks = showAxis ? timeTicks(this.start, this.end, tickCountForWidth(width)) : [];
    const axisLabels = ticks.map((tick, index) => {
      const label = this.formatTime(tick);
      const anchor = index === 0 ? 'start' : index === ticks.length - 1 ? 'end' : 'middle';
      return svg`<text class="axis-label" x=${x(tick)} y=${chartHeight - 2} text-anchor=${anchor}>
        ${label}
      </text>`;
    });

    const tempPaths = tempRuns.map((run) => {
      const points = projectRun(run, x, tempY!);
      return svg`<path class="series-line" d=${seriesPath(points, this.curve === 'smooth')} style="stroke:${`url(#${this.uid}-temp-stroke)`}" />`;
    });
    const tempAreas = tempRuns.map((run) => {
      const points = projectRun(run, x, tempY!);
      return svg`<path d=${areaPath(points, bottom, this.curve === 'smooth')} style="fill:url(#${this.uid}-temp-fill)" />`;
    });
    const humidityPaths = humidityRuns.map((run) => {
      const points = projectRun(run, x, humidityY!);
      return svg`<path class="series-line" d=${seriesPath(points, this.curve === 'smooth')} style="stroke:${this.humidityColor}" />`;
    });
    const humidityAreas = humidityRuns.map((run) => {
      const points = projectRun(run, x, humidityY!);
      return svg`<path d=${areaPath(points, bottom, this.curve === 'smooth')} style="fill:url(#${this.uid}-humidity-fill)" />`;
    });

    const pointMarkers: TemplateResult[] = [];
    if (this.showPoints) {
      const addPoints = (
        samples: ChartSample[],
        projectY: (v: number) => number,
        colorFor: (v: number) => string
      ) => {
        const numeric = samples.filter((sample) => sample.v !== null);
        if (!numeric.length) return;
        const max = 24;
        const stride = Math.max(1, Math.ceil(numeric.length / max));
        numeric.forEach((sample, index) => {
          if (index % stride !== 0 && index !== numeric.length - 1) return;
          const value = sample.v as number;
          pointMarkers.push(
            svg`<circle class="point" r="1.9" cx=${x(sample.t)} cy=${projectY(value)} style="stroke:${colorFor(value)}" />`
          );
        });
      };
      if (tempY) {
        tempRuns.forEach((run) =>
          addPoints(run, tempY, (value) => bandColorFor(value, this.bands, this.bandColors))
        );
      }
      if (humidityY) {
        humidityRuns.forEach((run) => addPoints(run, humidityY, () => this.humidityColor));
      }
    }

    const lastTemp = [...tempSeries].reverse().find((sample) => sample.v !== null);
    const lastHumidity = [...humiditySeries].reverse().find((sample) => sample.v !== null);

    return svg`<svg
      width=${width}
      height=${chartHeight}
      viewBox="0 0 ${width} ${chartHeight}"
      role="img"
      aria-label=${this.labels.aria}
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
    >
      <defs>
        <linearGradient id=${`${this.uid}-temp-stroke`} x1="0" y1=${top} x2="0" y2=${bottom} gradientUnits="userSpaceOnUse">
          ${tempGradient.map(
            (stop) =>
              svg`<stop offset=${stop.offset} stop-color=${stop.color} stop-opacity=${stop.opacity} />`
          )}
        </linearGradient>
        <linearGradient id=${`${this.uid}-temp-fill`} x1="0" y1=${top} x2="0" y2=${bottom} gradientUnits="userSpaceOnUse">
          ${tempFillGradient.map(
            (stop) =>
              svg`<stop offset=${stop.offset} stop-color=${stop.color} stop-opacity=${stop.opacity} />`
          )}
        </linearGradient>
        <linearGradient id=${`${this.uid}-humidity-fill`} x1="0" y1=${top} x2="0" y2=${bottom} gradientUnits="userSpaceOnUse">
          ${humidityGradient.map(
            (stop) =>
              svg`<stop offset=${stop.offset} stop-color=${stop.color} stop-opacity=${stop.opacity} />`
          )}
        </linearGradient>
      </defs>
      ${gridLines}
      <line class="baseline" x1=${left} x2=${right} y1=${bottom} y2=${bottom} />
      ${humidityAreas} ${tempAreas} ${humidityPaths} ${tempPaths} ${pointMarkers}
      ${lastHumidity && humidityY
        ? svg`<circle class="end-dot" r="2.6" cx=${x(lastHumidity.t)} cy=${humidityY(lastHumidity.v as number)} style="fill:${this.humidityColor}" />`
        : nothing}
      ${lastTemp && tempY
        ? svg`<circle
            class="end-dot"
            r="2.8"
            cx=${x(lastTemp.t)}
            cy=${tempY(lastTemp.v as number)}
            style="fill:${bandColorFor(lastTemp.v as number, this.bands, this.bandColors)}"
          />`
        : nothing}
      ${axisLabels}
    </svg>`;
  }

  private formatTime(timestamp: number): string {
    try {
      return new Intl.DateTimeFormat(this.language || 'en', {
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(timestamp));
    } catch {
      const date = new Date(timestamp);
      return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    }
  }
}

export const CHART_TAG = 'room-climate-chart';

if (typeof customElements !== 'undefined' && !customElements.get(CHART_TAG)) {
  customElements.define(CHART_TAG, RoomClimateChart);
}
