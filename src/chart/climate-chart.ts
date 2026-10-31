import { LitElement, css, html, nothing, svg, type TemplateResult } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { MAX_CHART_POINTS } from '../const';
import { formatNumber } from '../utils/format';
import {
  areaPath,
  buildSegments,
  decimateIndices,
  prepareSamples,
  extent,
  linearScale,
  medianInterval,
  movingAverage,
  nearestSample,
  padDomain,
  projectRun,
  seriesExtremes,
  seriesPath,
  smoothingWindow,
  type SmoothingLevel,
  splitAtBridges,
  tickCountForWidth,
  timeTicks,
  type ChartSample,
  type GapMode,
  type SeriesSegment,
} from './geometry';

/**
 * Decimates a segment for rendering but keeps the `bridged` flags aligned with
 * the remaining samples so interpolated stretches can still be styled apart.
 */
function decimateSegment(segment: SeriesSegment, maxPoints: number): SeriesSegment {
  const { samples, bridged } = segment;
  if (samples.length <= maxPoints || maxPoints < 3) return segment;
  // Min/max buckets instead of every n-th sample: peaks survive (see geometry).
  const indices = decimateIndices(samples, maxPoints);
  const keptSamples = indices.map((index) => samples[index]);
  const keptBridged: boolean[] = [];
  for (let i = 1; i < indices.length; i++) {
    // An edge stays "bridged" if any skipped edge in between was interpolated.
    keptBridged.push(bridged.slice(indices[i - 1] + 1, indices[i] + 1).some(Boolean));
  }
  return { samples: keptSamples, bridged: keptBridged };
}

const FALLBACK_WIDTH = 320;
const FALLBACK_HEIGHT = 112;

/** How long a touch readout stays visible after the finger lifts. */
const TOOLTIP_HOLD_MS = 4000;

/** Plot geometry, in fractions of the usable height. */
const HUMIDITY_BAND_HEIGHT = 0.3;
const TEMPERATURE_BAND_TOP = 0.44;

/**
 * Vertical domain per series.
 *
 * `minSpan` is the *smallest* value range the band ever shows. It used to be
 * generous (0.8 °C / 6 %), which turned a room that only moves a few tenths into
 * a nearly straight line – the curve looked flat although the measurement was
 * alive. A small minimum keeps a constant sensor readable without squashing a
 * real swing; `padding` adds breathing room above and below.
 */
const TEMPERATURE_DOMAIN = { minSpan: 0.4, padding: 0.15 } as const;
const HUMIDITY_DOMAIN = { minSpan: 3, padding: 0.15 } as const;

export type ChartSeriesKey = 'temperature' | 'humidity';

/** One series as it is needed for hit-testing: measured samples plus the band. */
interface HoverSeries {
  samples: ChartSample[];
  domain: [number, number];
  top: number;
  bottom: number;
}

/**
 * Plot geometry of the last render. The tooltip overlays the SVG with plain
 * elements (crisper than SVG text at 1x, no re-render per pointer move), so it
 * needs the same scales the curves were drawn with.
 */
interface HoverGeometry {
  width: number;
  height: number;
  left: number;
  right: number;
  plotTop: number;
  plotBottom: number;
  start: number;
  end: number;
  temperature: HoverSeries | null;
  humidity: HoverSeries | null;
}

let uidCounter = 0;

export interface ChartLabels {
  empty: string;
  emptyHint: string;
  loading: string;
  error: string;
  aria: string;
  temperature: string;
  humidity: string;
  /** Short label of the right-most axis tick. */
  now: string;
  /** Two-letter caption of the dashed setpoint reference line. */
  setpoint: string;
}

export class RoomClimateChart extends LitElement {
  static properties = {
    temperature: { attribute: false },
    humidity: { attribute: false },
    accentColor: { attribute: false },
    humidityColor: { attribute: false },
    setpoint: { attribute: false },
    setpointUnit: { attribute: false },
    hiddenSeries: { attribute: false },
    start: { attribute: false },
    end: { attribute: false },
    showPoints: { attribute: false },
    showGrid: { attribute: false },
    curve: { attribute: false },
    smoothing: { attribute: false },
    gapMode: { attribute: false },
    maxGapMinutes: { attribute: false },
    gapStyle: { attribute: false },
    humidityLineStyle: { attribute: false },
    showTemperatureArea: { attribute: false },
    showHumidityArea: { attribute: false },
    cornerRadius: { attribute: false },
    showTooltip: { attribute: false },
    showExtremes: { attribute: false },
    temperatureUnit: { attribute: false },
    humidityUnit: { attribute: false },
    temperatureDecimals: { attribute: false },
    humidityDecimals: { attribute: false },
    language: { attribute: false },
    timeZone: { attribute: false },
    hour12: { attribute: false },
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
      --rcc-chart-label: var(--rcc-tertiary, rgba(255, 255, 255, 0.32));
      --rcc-chart-rule: var(--rcc-text, #ffffff);
      --rcc-chart-point-fill: var(--rcc-bg, #0e1013);
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
      padding: 4px 0 8px;
      color: var(--rcc-chart-label);
      text-align: center;
    }
    .state-title {
      font-size: 11px;
      font-weight: 500;
      color: var(--rcc-text);
      opacity: 0.6;
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
    /* Reduced axis: 10.5 px at 32 % – present, never loud. */
    .axis-label {
      font-size: 10.5px;
      font-weight: 400;
      fill: var(--rcc-chart-label);
      font-variant-numeric: tabular-nums;
      font-feature-settings: 'tnum' 1;
      letter-spacing: 0.01em;
    }
    .grid-line {
      stroke: var(--rcc-chart-rule);
      stroke-opacity: 0.06;
      stroke-width: 1;
      stroke-dasharray: 2 6;
    }
    /* One hairline instead of a grey bar. */
    .baseline {
      stroke: var(--rcc-chart-rule);
      stroke-opacity: 0.1;
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
      stroke-width: 1.4;
    }
    .end-dot {
      stroke: var(--rcc-chart-point-fill);
      stroke-width: 1.4;
    }
    .setpoint-line {
      stroke-width: 1;
      stroke-dasharray: 3 4;
      vector-effect: non-scaling-stroke;
    }
    .setpoint-caption {
      font-size: 9px;
      font-weight: 500;
      letter-spacing: 0.09em;
      fill: var(--rcc-chart-label);
      text-transform: uppercase;
    }
    /*
     * Pointer layer. The pan-y touch action is the important part: a vertical swipe still
     * scrolls the dashboard, only horizontal exploration belongs to the chart.
     * Without it the chart would swallow every touch on a wall tablet.
     */
    .overlay {
      position: absolute;
      left: 0;
      right: 0;
      touch-action: pan-y;
      cursor: crosshair;
    }
    .hover {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .hover[hidden] {
      display: none;
    }
    .crosshair {
      position: absolute;
      width: 1px;
      background: var(--rcc-chart-rule);
      opacity: 0.16;
    }
    .hover-dot {
      position: absolute;
      width: 7px;
      height: 7px;
      margin: -3.5px 0 0 -3.5px;
      border-radius: 50%;
      box-shadow: 0 0 0 1.5px var(--rcc-chart-point-fill);
    }
    .hover-dot[hidden] {
      display: none;
    }
    .tooltip {
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: 1px;
      padding: 4px 7px;
      border-radius: 6px;
      background: color-mix(in srgb, var(--rcc-bg, #0e1013) 88%, transparent);
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.07), 0 6px 16px rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(6px);
      font-size: 10px;
      line-height: 1.35;
      font-variant-numeric: tabular-nums;
      font-feature-settings: 'tnum' 1;
      color: var(--rcc-text);
      white-space: nowrap;
    }
    .tooltip-time {
      font-size: 9px;
      letter-spacing: 0.02em;
      opacity: 0.5;
    }
    .tooltip-row {
      display: flex;
      align-items: center;
      gap: 5px;
      opacity: 0.92;
    }
    .tooltip-row[hidden] {
      display: none;
    }
    .tooltip-row i {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      flex: none;
    }
    /*
     * The number sits next to the curve, so it needs a halo in the card colour
     * – otherwise the line strikes through it.
     */
    .extreme-label {
      font-size: 9px;
      font-weight: 500;
      fill: var(--rcc-text);
      fill-opacity: 0.55;
      letter-spacing: 0.02em;
      font-variant-numeric: tabular-nums;
      paint-order: stroke;
      stroke: var(--rcc-chart-point-fill);
      stroke-width: 1.4;
      stroke-linejoin: round;
    }
    @media (prefers-reduced-motion: reduce) {
      * {
        transition: none !important;
      }
    }
  `;

  temperature?: ChartSample[];
  humidity?: ChartSample[];
  /** Accent of the temperature curve – the only accent of the card. */
  accentColor = '#4FD1A5';
  /** Subdued indigo of the humidity curve. */
  humidityColor = '#8B86D6';
  /** Target temperature, drawn as a dashed reference line. */
  setpoint: number | null = null;
  setpointUnit = '°C';
  /** Series switched off with a click on the matching reading. */
  hiddenSeries: ChartSeriesKey[] = [];
  start = Date.now() - 6 * 3600 * 1000;
  end = Date.now();
  showPoints = false;
  showGrid = false;
  curve: 'smooth' | 'linear' = 'smooth';
  /** Averaging level of both curves, set in the visual editor. */
  smoothing: SmoothingLevel = 'light';
  /** `connect` interpolates holes, `break` leaves them visible. */
  gapMode: GapMode = 'connect';
  /** Largest hole in minutes that will be interpolated. */
  maxGapMinutes = 120;
  /** `solid` draws bridged stretches like measured ones. */
  gapStyle: 'solid' | 'dashed' = 'solid';
  /** `dotted` renders the humidity curve as a row of dots. */
  humidityLineStyle: 'solid' | 'dotted' = 'solid';
  /** Soft area under the temperature curve. */
  showTemperatureArea = true;
  /** Soft area under the humidity curve, kept inside its own band. */
  showHumidityArea = true;
  /** Card corner radius; keeps the axis labels clear of the rounded edges. */
  cornerRadius = 26;
  /** Crosshair readout while the pointer is over the plot. */
  showTooltip = true;
  /** Quiet min/max marks of both visible series. */
  showExtremes = true;
  /** Unit of the temperature series; falls back to the setpoint unit. */
  temperatureUnit?: string;
  /** Unit of the humidity series (usually `%`). */
  humidityUnit?: string;
  temperatureDecimals = 1;
  humidityDecimals = 1;
  language = 'de';
  /** IANA zone of the Home Assistant instance; empty = browser zone. */
  timeZone?: string;
  /** `true` = 12-hour clock, `false` = 24-hour, `undefined` = locale default. */
  hour12?: boolean;
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
    now: 'Jetzt',
    setpoint: 'Soll',
  };

  private uid = `rcc-chart-${++uidCounter}`;
  private width = 0;
  private height = 0;
  private resizeObserver?: ResizeObserver;
  /** Set while rendering; the pointer handlers read it instead of re-measuring. */
  private hoverGeometry?: HoverGeometry;
  private hoverHideTimer?: ReturnType<typeof setTimeout>;
  private lastPointerType = 'mouse';
  private readonly hoverRef = createRef<HTMLElement>();
  private readonly crosshairRef = createRef<HTMLElement>();
  private readonly temperatureDotRef = createRef<HTMLElement>();
  private readonly humidityDotRef = createRef<HTMLElement>();
  private readonly tooltipRef = createRef<HTMLElement>();
  private readonly tooltipTimeRef = createRef<HTMLElement>();
  private readonly tooltipTemperatureRef = createRef<HTMLElement>();
  private readonly tooltipHumidityRef = createRef<HTMLElement>();
  private readonly tooltipTemperatureRowRef = createRef<HTMLElement>();
  private readonly tooltipHumidityRowRef = createRef<HTMLElement>();

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
    this.clearHoverTimer();
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

  private isVisible(key: ChartSeriesKey): boolean {
    return !(this.hiddenSeries ?? []).includes(key);
  }

  private get temperatureVisible(): boolean {
    return this.isVisible('temperature') && Boolean(this.temperature?.some((s) => s.v !== null));
  }

  private get humidityVisible(): boolean {
    return this.isVisible('humidity') && Boolean(this.humidity?.some((s) => s.v !== null));
  }

  private get hasData(): boolean {
    return Boolean(
      this.temperature?.some((s) => s.v !== null) || this.humidity?.some((s) => s.v !== null)
    );
  }

  protected render(): TemplateResult | typeof nothing {
    const { width, height } = this.chartSize;
    if (width < 40 || height < 34) return nothing;

    const errorIcon = svg`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>`;
    const emptyIcon = svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" /></svg>`;

    if (!this.hasData) {
      if (this.error) return this.stateView(errorIcon, this.labels.error);
      if (this.loading) return this.stateView(emptyIcon, this.labels.loading);
      return this.stateView(emptyIcon, this.labels.empty, this.labels.emptyHint);
    }

    // Both series switched off: keep the box (no layout jump), draw only the
    // hairline baseline so the card does not look broken.
    const { chart, geometry } = this.renderChart(width, height);
    this.hoverGeometry = geometry;
    return html`<div class="wrap">${chart}${this.renderOverlay(geometry)}</div>`;
  }

  private renderChart(
    width: number,
    height: number
  ): { chart: TemplateResult; geometry: HoverGeometry } {
    const chartHeight = height;
    const showAxis = chartHeight >= 62;
    const axisSpace = showAxis ? 20 : 2;
    const top = 6;
    const bottom = chartHeight - axisSpace;
    const plotHeight = Math.max(6, bottom - top);
    const left = 1;
    const right = width - 1;
    const rangeMs = Math.max(1, this.end - this.start);
    const x = linearScale([this.start, this.end], [left, right]);
    // The curves may run into the rounded corners, the labels may not.
    const cornerInset = showAxis ? Math.min(Math.max(this.cornerRadius, 0), 30) + 2 : 0;
    const labelX = linearScale([this.start, this.end], [left + cornerInset, right - cornerInset]);
    const labelBaseline = chartHeight - 6;

    // Humidity owns the upper third, temperature the lower half. The two curves
    // therefore never cross and each one stays readable on its own.
    const humidityTop = top;
    const humidityBottom = top + plotHeight * HUMIDITY_BAND_HEIGHT;
    const temperatureTop = top + plotHeight * TEMPERATURE_BAND_TOP;
    const temperatureBottom = bottom;

    const visibleTemperature = this.temperatureVisible ? this.temperature ?? [] : [];
    const visibleHumidity = this.humidityVisible ? this.humidity ?? [] : [];

    const temperatureValues = visibleTemperature
      .map((sample) => sample.v)
      .filter((value): value is number => value !== null && Number.isFinite(value));
    const humidityValues = visibleHumidity
      .map((sample) => sample.v)
      .filter((value): value is number => value !== null && Number.isFinite(value));

    const setpointValue =
      typeof this.setpoint === 'number' && Number.isFinite(this.setpoint) ? this.setpoint : null;
    // The target belongs to the domain: otherwise a setpoint above or below the
    // measured range would silently drop the reference line.
    const tempValues =
      setpointValue !== null ? [...temperatureValues, setpointValue] : temperatureValues;
    const tempExtent = extent(tempValues);
    const humidityExtent = extent(humidityValues);
    const tempDomain = tempExtent
      ? padDomain(tempExtent[0], tempExtent[1], TEMPERATURE_DOMAIN)
      : null;
    const humidityDomain = humidityExtent
      ? padDomain(humidityExtent[0], humidityExtent[1], HUMIDITY_DOMAIN)
      : null;

    const tempY = tempDomain ? linearScale(tempDomain, [temperatureBottom, temperatureTop]) : null;
    const humidityY = humidityDomain
      ? linearScale(humidityDomain, [humidityBottom, humidityTop])
      : null;

    // Defensive clean-up: live history may be unsorted, contain duplicates or
    // reach outside the window – all of which would draw artefacts.
    const tempSeries = prepareSamples(visibleTemperature, this.start, this.end);
    const humiditySeries = prepareSamples(visibleHumidity, this.start, this.end);

    // Build segments first (holes get interpolated or stay broken), then limit
    // the point count per segment while keeping the bridge flags.
    const segmentOptions = {
      rangeMs,
      start: this.start,
      end: this.end,
      gapMode: this.gapMode,
      maxGapMs: Math.max(5, this.maxGapMinutes) * 60 * 1000,
    };

    /*
     * Averaging happens *before* the segmentation, so a quiet stretch that is
     * drawn as a step stays a step. Afterwards it would be averaged together
     * with samples from hours ago and turn back into a slow ramp.
     * The time guard keeps far-away neighbours out of the average.
     */
    const smooth = this.curve === 'smooth';
    const smoothSeries = (series: ChartSample[]): ChartSample[] => {
      if (!smooth || series.length < 5) return series;
      const window = smoothingWindow(series.length, this.smoothing);
      if (window < 3) return series;
      const spacing = medianInterval(series);
      return movingAverage(series, window, {
        maxDeltaMs: Math.max(60_000, spacing * 3),
      });
    };
    const tempSmoothed = smoothSeries(tempSeries);
    const humiditySmoothed = smoothSeries(humiditySeries);

    const rawTempSegments: SeriesSegment[] = tempDomain
      ? buildSegments(tempSmoothed, segmentOptions)
      : [];
    const rawHumiditySegments: SeriesSegment[] = humidityDomain
      ? buildSegments(humiditySmoothed, segmentOptions)
      : [];
    const segmentCount = Math.max(1, rawTempSegments.length + rawHumiditySegments.length);
    const perSegmentLimit = Math.max(60, Math.floor(MAX_CHART_POINTS / segmentCount));

    // Denoise before projecting: a centred moving average (only for the smooth
    // curve) plus the monotone interpolation below. Both keep the values inside
    // the measured range – no invented peaks.
    const prepare = (segments: SeriesSegment[]): SeriesSegment[] =>
      segments.map((segment) => decimateSegment(segment, perSegmentLimit));

    const tempSegments = prepare(rawTempSegments);
    const humiditySegments = prepare(rawHumiditySegments);

    const gridLines: TemplateResult[] = [];
    if (this.showGrid) {
      for (let i = 1; i < 3; i++) {
        const y = top + (plotHeight * i) / 3;
        gridLines.push(svg`<line class="grid-line" x1=${left} x2=${right} y1=${y} y2=${y} />`);
      }
    }

    // Three ticks only: start, middle, now. Times stay readable ("Sa 05:40"),
    // the newest point is labelled by meaning instead of by number.
    const tickCount = showAxis ? Math.min(3, tickCountForWidth(width)) : 0;
    const ticks = tickCount >= 2 ? timeTicks(this.start, this.end, Math.max(2, tickCount)) : [];
    const axisLabels = ticks.map((tick, index) => {
      const isLast = index === ticks.length - 1;
      const anchor = index === 0 ? 'start' : isLast ? 'end' : 'middle';
      return svg`<text class="axis-label" x=${labelX(tick)} y=${labelBaseline} text-anchor=${anchor}>
        ${this.formatAxisLabel(tick, isLast)}
      </text>`;
    });

    const projectPoints = (samples: ChartSample[], y: (value: number) => number) =>
      projectRun(samples, x, y);

    const linePaths = (segment: SeriesSegment, y: (value: number) => number) => {
      // Dashed gap style: interpolated stretches are drawn as separate paths so
      // they can be recognised as "no measurement here".
      const parts =
        this.gapStyle === 'dashed' ? splitAtBridges(segment) : [segment.samples];
      return parts
        .filter((part) => part.length > 1)
        .map((part) => seriesPath(projectPoints(part, y), smooth))
        .filter((path) => path.length > 0);
    };

    const seriesElement = (
      segment: SeriesSegment,
      y: (value: number) => number,
      stroke: string,
      options: { color?: string; dashed?: boolean; width?: number } = {}
    ): TemplateResult[] => {
      const paths = linePaths(segment, y);
      return paths.map((path) => {
        const style = [
          options.color ? `stroke:${options.color}` : `stroke:${stroke}`,
          options.width ? `stroke-width:${options.width}` : '',
          options.dashed ? 'stroke-dasharray:0.1 5.5' : '',
        ]
          .filter(Boolean)
          .join(';');
        return svg`<path class="series-line" d=${path} style=${style}></path>`;
      });
    };

    // One colour, drawn straight: the old gradient had two identical stops and
    // therefore never changed anything – it only forced a `url(#…)` indirection.
    const tempPaths = tempSegments.flatMap((segment) =>
      seriesElement(segment, tempY!, this.accentColor, { color: this.accentColor })
    );

    // Restrained area fills, one per series and each one inside its own band.
    const mergedArea = (
      segmentsToDraw: SeriesSegment[],
      y: (value: number) => number,
      base: number
    ): string =>
      segmentsToDraw
        .filter((segment) => segment.samples.length > 1)
        .map((segment) => areaPath(projectPoints(segment.samples, y), base, smooth))
        .join(' ');
    const tempAreaPath =
      tempY && this.showTemperatureArea ? mergedArea(tempSegments, tempY, bottom) : '';
    const tempAreas = tempAreaPath
      ? [svg`<path class="series-area" d=${tempAreaPath} style="fill:url(#${this.uid}-temp-fill)" />`]
      : [];
    // The humidity fill stops at the bottom of its own band: it may never spill
    // into the temperature half of the chart.
    const humidityAreaPath =
      humidityY && this.showHumidityArea
        ? mergedArea(humiditySegments, humidityY, humidityBottom)
        : '';
    const humidityAreas = humidityAreaPath
      ? [
          svg`<path class="series-area" d=${humidityAreaPath} style="fill:url(#${this.uid}-humidity-fill)" />`,
        ]
      : [];

    const humidityDotted = this.humidityLineStyle === 'dotted';
    const humidityPaths = humiditySegments.flatMap((segment) =>
      seriesElement(segment, humidityY!, this.humidityColor, {
        color: this.humidityColor,
        dashed: humidityDotted,
        width: humidityDotted ? 2.2 : 1.9,
      })
    );

    const pointMarkers: TemplateResult[] = [];
    if (this.showPoints) {
      const addPoints = (
        samples: ChartSample[],
        projectY: (v: number) => number,
        color: string
      ) => {
        const numeric = samples.filter((sample) => sample.v !== null);
        if (!numeric.length) return;
        const max = 24;
        const stride = Math.max(1, Math.ceil(numeric.length / max));
        numeric.forEach((sample, index) => {
          if (index % stride !== 0 && index !== numeric.length - 1) return;
          const value = sample.v as number;
          pointMarkers.push(
            svg`<circle class="point" r="1.7" cx=${x(sample.t)} cy=${projectY(value)} style="stroke:${color}" />`
          );
        });
      };
      if (tempY) tempSegments.forEach((segment) => addPoints(segment.samples, tempY, this.accentColor));
      if (humidityY) {
        humiditySegments.forEach((segment) =>
          addPoints(segment.samples, humidityY, this.humidityColor)
        );
      }
    }

    // Setpoint reference: how far is the room from its target?
    const setpointY =
      setpointValue !== null && tempY ? tempY(setpointValue) : null;
    const showSetpoint =
      setpointY !== null &&
      Number.isFinite(setpointY) &&
      setpointY >= temperatureTop - 0.5 &&
      setpointY <= temperatureBottom + 0.5;

    // The caption goes to the end of the line where the curve keeps the most
    // distance from the reference, so it never sits on top of the series.
    const firstTempValue = tempSeries.find((sample) => sample.v !== null)?.v ?? null;
    const lastTempValue = [...tempSeries].reverse().find((sample) => sample.v !== null)?.v ?? null;
    const distance = (value: number | null) =>
      value === null || setpointValue === null ? 0 : Math.abs(value - setpointValue);
    const captionOnRight = distance(lastTempValue) >= distance(firstTempValue);

    const lastTemp = [...tempSeries].reverse().find((sample) => sample.v !== null);
    const lastHumidity = [...humiditySeries].reverse().find((sample) => sample.v !== null);

    // The dashed reference is invisible to screen readers, so its value and unit
    // are part of the accessible name.
    const setpointText =
      showSetpoint && setpointValue !== null
        ? `${this.labels.setpoint} ${formatNumber(setpointValue, this.language, 1)}${
            this.setpointUnit ? ` ${this.setpointUnit}` : ''
          }`
        : '';
    // Lowest/highest of the shown window, spoken as a range. Pointer users get
    // the same numbers next to the curve; without a pointer this is the only
    // way to learn them.
    const rangeText = (
      label: string,
      samples: ChartSample[],
      unit: string | undefined,
      decimals: number
    ): string => {
      const extremes = seriesExtremes(samples);
      if (!extremes || extremes.min.v === extremes.max.v) return '';
      const low = formatNumber(extremes.min.v as number, this.language, decimals);
      const high = formatNumber(extremes.max.v as number, this.language, decimals);
      return `${label} ${low}–${high}${unit ? ` ${unit}` : ''}`;
    };
    const temperatureUnit = this.temperatureUnit || this.setpointUnit;
    const ariaLabel = [
      this.labels.aria,
      setpointText,
      tempY ? rangeText(this.labels.temperature, tempSeries, temperatureUnit, this.temperatureDecimals) : '',
      humidityY
        ? rangeText(this.labels.humidity, humiditySeries, this.humidityUnit, this.humidityDecimals)
        : '',
    ]
      .filter(Boolean)
      .join('. ');

    /*
     * Min/max marks: the quiet answer to "how far did it go?". Only the number,
     * no unit – the band and the colour already say which series it belongs to.
     * Skipped on narrow or very flat charts, where labels would collide.
     */
    const extremeMarks: TemplateResult[] = [];
    const addExtremeMarks = (
      samples: ChartSample[],
      projectY: (value: number) => number,
      bandTop: number,
      bandBottom: number,
      color: string,
      decimals: number
    ): void => {
      if (!this.showExtremes || width < 200 || bandBottom - bandTop < 18) return;
      const extremes = seriesExtremes(samples);
      if (!extremes || extremes.min.v === extremes.max.v) return;
      if (samples.filter((sample) => sample.v !== null).length < 3) return;
      const entries = [
        { sample: extremes.max, isMax: true },
        { sample: extremes.min, isMax: false },
      ]
        .map(({ sample, isMax }) => {
          const cx = x(sample.t);
          const cy = projectY(sample.v as number);
          // Above the point if the band has room, otherwise below it – a label
          // that has to be pushed into the curve is unreadable.
          // 9 px above (text bottom clear of the curve) or 15 px below; the dot sits
          // on a local extremum, so the curve drops away on both sides.
          const canAbove = cy - 11 >= bandTop;
          const canBelow = cy + 17 <= bandBottom;
          const above = canAbove ? cy - 9 : bandTop + 8;
          const below = canBelow ? cy + 15 : bandBottom - 1;
          let labelY = isMax ? (canAbove ? above : below) : canBelow ? below : above;
          // Never print the number on the dashed reference line.
          if (showSetpoint && setpointY !== null && Math.abs(labelY - setpointY) < 9) {
            const alternative = isMax ? below : above;
            if (Math.abs(alternative - setpointY) >= 9) labelY = alternative;
          }
          return { sample, cx, cy, labelY, isMax };
        })
        .filter((entry) => Number.isFinite(entry.cx) && Number.isFinite(entry.cy))
        .filter((entry) => entry.cy >= bandTop - 1 && entry.cy <= bandBottom + 1);

      /*
       * Two labels that end up on the same spot move to the corners of the band
       * instead of one of them disappearing. Only when even that overlaps (a
       * band shorter than a line) the minimum steps aside.
       */
      const tooClose = (
        a: { labelY: number; cx: number },
        b: { labelY: number; cx: number }
      ): boolean => Math.abs(a.labelY - b.labelY) < 9 && Math.abs(a.cx - b.cx) < 34;
      let keep = [...entries];
      if (keep.length === 2 && tooClose(keep[0], keep[1])) {
        for (const entry of keep) {
          entry.labelY = entry.isMax ? bandTop + 8 : bandBottom - 1;
        }
        if (tooClose(keep[0], keep[1])) keep = keep.filter((entry) => entry.isMax);
      }

      for (const entry of keep) {
        if (!entry) continue;
        // Beside the dot, never on top of it: the ring would strike through the
        // number. The free side is the one pointing into the plot.
        const textWidth = 26;
        const preferRight = entry.cx < (left + right) / 2;
        let labelX = preferRight ? entry.cx + 6 : entry.cx - 6;
        let anchor: 'start' | 'end' = preferRight ? 'start' : 'end';
        if (anchor === 'start' && labelX + textWidth > right - 2) {
          labelX = entry.cx - 6;
          anchor = 'end';
        } else if (anchor === 'end' && labelX - textWidth < left + 2) {
          labelX = entry.cx + 6;
          anchor = 'start';
        }
        // "Soll" lives at the very edge of the plot: step aside instead of
        // printing two numbers on top of each other.
        const captionX = captionOnRight ? right : left;
        const captionClash = (x: number): boolean =>
          showSetpoint &&
          setpointY !== null &&
          Math.abs(entry.labelY - (setpointY - 5)) < 9 &&
          Math.abs(x - captionX) < 40;
        if (captionClash(labelX)) {
          const flipped = anchor === 'start' ? entry.cx - 6 : entry.cx + 6;
          if (!captionClash(flipped)) {
            labelX = flipped;
            anchor = anchor === 'start' ? 'end' : 'start';
          }
        }
        extremeMarks.push(
          svg`<circle
            class="extreme-dot"
            r="1.8"
            cx=${entry.cx}
            cy=${entry.cy}
            style=${`fill:var(--rcc-chart-point-fill);stroke:${color};stroke-width:1.2`}
          />`
        );
        if (!captionClash(labelX)) {
          extremeMarks.push(
            svg`<text class="extreme-label" x=${labelX} y=${entry.labelY} text-anchor=${anchor}>${formatNumber(
              entry.sample.v as number,
              this.language,
              decimals
            )}</text>`
          );
        }
      }
    };

    if (tempY) {
      addExtremeMarks(
        tempSeries,
        tempY,
        temperatureTop,
        temperatureBottom,
        this.accentColor,
        this.temperatureDecimals
      );
    }
    if (humidityY) {
      addExtremeMarks(
        humiditySeries,
        humidityY,
        humidityTop,
        humidityBottom,
        this.humidityColor,
        this.humidityDecimals
      );
    }

    const geometry: HoverGeometry = {
      width,
      height: chartHeight,
      left,
      right,
      plotTop: top,
      plotBottom: bottom,
      start: this.start,
      end: this.end,
      // The *measured* series, not the smoothed or bridged one: hit-testing and
      // the readout must never report an invented value.
      temperature:
        tempY && tempDomain
          ? { samples: tempSeries, domain: tempDomain, top: temperatureTop, bottom: temperatureBottom }
          : null,
      humidity:
        humidityY && humidityDomain
          ? { samples: humiditySeries, domain: humidityDomain, top: humidityTop, bottom: humidityBottom }
          : null,
    };

    const chart = svg`<svg
      width=${width}
      height=${chartHeight}
      viewBox="0 0 ${width} ${chartHeight}"
      role="img"
      aria-label=${ariaLabel}
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
    >
      <defs>
        <linearGradient id=${`${this.uid}-temp-fill`} x1="0" y1=${temperatureTop} x2="0" y2=${temperatureBottom} gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color=${this.accentColor} stop-opacity="0.22" />
          <stop offset="0.55" stop-color=${this.accentColor} stop-opacity="0.08" />
          <stop offset="1" stop-color=${this.accentColor} stop-opacity="0" />
        </linearGradient>
        <linearGradient id=${`${this.uid}-humidity-fill`} x1="0" y1=${humidityTop} x2="0" y2=${humidityBottom} gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color=${this.humidityColor} stop-opacity="0.2" />
          <stop offset="0.6" stop-color=${this.humidityColor} stop-opacity="0.07" />
          <stop offset="1" stop-color=${this.humidityColor} stop-opacity="0" />
        </linearGradient>
      </defs>
      ${gridLines}
      ${humidityAreas}
      ${tempAreas}
      ${showSetpoint
        ? svg`<line
            class="setpoint-line"
            x1=${left}
            x2=${right}
            y1=${setpointY}
            y2=${setpointY}
            style="stroke:${this.accentColor};stroke-opacity:0.42"
          ></line>
          <text
            class="setpoint-caption"
            x=${captionOnRight ? right : left}
            y=${setpointY - 5}
            text-anchor=${captionOnRight ? 'end' : 'start'}
          >
            ${this.labels.setpoint}
          </text>`
        : nothing}
      <line class="baseline" x1=${left} x2=${right} y1=${bottom} y2=${bottom} />
      ${humidityPaths} ${tempPaths} ${pointMarkers}
      ${lastHumidity && humidityY
        ? svg`<circle
            class="end-dot"
            r="2.6"
            cx=${x(lastHumidity.t)}
            cy=${humidityY(lastHumidity.v as number)}
            style="fill:${this.humidityColor}"
          />`
        : nothing}
      ${lastTemp && tempY
        ? svg`<circle
            class="end-dot"
            r="2.8"
            cx=${x(lastTemp.t)}
            cy=${tempY(lastTemp.v as number)}
            style="fill:${this.accentColor}"
          />`
        : nothing}
      ${extremeMarks}
      ${axisLabels}
    </svg>`;

    return { chart, geometry };
  }

  /**
   * Pointer layer over the plot plus the readout it drives. Everything below is
   * plain DOM: the SVG is expensive to rebuild (paths, decimation), and moving
   * the crosshair 60 times a second must not rebuild it.
   */
  private renderOverlay(geometry: HoverGeometry): TemplateResult | typeof nothing {
    if (!this.showTooltip) return nothing;
    if (!geometry.temperature && !geometry.humidity) return nothing;
    const top = Math.round(geometry.plotTop);
    const height = Math.max(1, Math.round(geometry.plotBottom - geometry.plotTop));
    return html`<div
        class="overlay"
        style=${`top:${top}px;height:${height}px`}
        @pointerdown=${this.onPointerDown}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @pointercancel=${this.onPointerUp}
        @pointerleave=${this.onPointerLeave}
      ></div>
      <div class="hover" ${ref(this.hoverRef)} hidden aria-hidden="true">
        <div
          class="crosshair"
          ${ref(this.crosshairRef)}
          style=${`top:${top}px;height:${height}px`}
        ></div>
        <div
          class="hover-dot"
          ${ref(this.temperatureDotRef)}
          style=${`background:${this.accentColor}`}
          hidden
        ></div>
        <div
          class="hover-dot"
          ${ref(this.humidityDotRef)}
          style=${`background:${this.humidityColor}`}
          hidden
        ></div>
        <div class="tooltip" ${ref(this.tooltipRef)}>
          <span class="tooltip-time" ${ref(this.tooltipTimeRef)}></span>
          <span class="tooltip-row" ${ref(this.tooltipTemperatureRowRef)}>
            <i style=${`background:${this.accentColor}`}></i>
            <span ${ref(this.tooltipTemperatureRef)}></span>
          </span>
          <span class="tooltip-row" ${ref(this.tooltipHumidityRowRef)}>
            <i style=${`background:${this.humidityColor}`}></i>
            <span ${ref(this.tooltipHumidityRef)}></span>
          </span>
        </div>
      </div>`;
  }

  private onPointerDown = (event: PointerEvent | MouseEvent): void => {
    if (!this.showTooltip) return;
    this.lastPointerType = (event as PointerEvent).pointerType || 'mouse';
    this.clearHoverTimer();
    this.updateHoverAt(event);
  };

  private onPointerMove = (event: PointerEvent | MouseEvent): void => {
    if (!this.showTooltip) return;
    this.lastPointerType = (event as PointerEvent).pointerType || 'mouse';
    this.clearHoverTimer();
    this.updateHoverAt(event);
  };

  private onPointerUp = (event: PointerEvent | MouseEvent): void => {
    const type = (event as PointerEvent).pointerType || this.lastPointerType;
    if (type === 'mouse') return;
    // A lifted finger must not take the reading with it – keep it for a moment.
    this.clearHoverTimer();
    this.hoverHideTimer = setTimeout(() => this.hideHover(), TOOLTIP_HOLD_MS);
  };

  private onPointerLeave = (event: PointerEvent | MouseEvent): void => {
    const type = (event as PointerEvent).pointerType || this.lastPointerType;
    if (type !== 'mouse') return;
    this.hideHover();
  };

  private updateHoverAt(event: PointerEvent | MouseEvent): void {
    const geometry = this.hoverGeometry;
    if (!geometry) return;
    const target = event.currentTarget as HTMLElement | null;
    const rect = target?.getBoundingClientRect();
    // jsdom and hidden tabs report a zero-size rect: fall back to the measured
    // chart width so the maths stays honest.
    const width = rect && rect.width > 0 ? rect.width : geometry.width;
    if (!width) return;
    const leftPx = rect ? rect.left : 0;
    const ratio = Math.min(1, Math.max(0, (event.clientX - leftPx) / width));
    const time = geometry.start + ratio * (geometry.end - geometry.start);
    this.showHoverAt(time);
  }

  private xForTime(time: number, geometry: HoverGeometry): number {
    const span = Math.max(1, geometry.end - geometry.start);
    return geometry.left + ((time - geometry.start) / span) * (geometry.right - geometry.left);
  }

  private yForValue(series: HoverSeries, value: number): number {
    const [low, high] = series.domain;
    const span = high - low || 1;
    return series.bottom - ((value - low) / span) * (series.bottom - series.top);
  }

  private tooltipValue(value: number, unit: string | undefined, decimals: number): string {
    const number = formatNumber(value, this.language, decimals);
    return unit ? `${number} ${unit}` : number;
  }

  /**
   * Snaps to the nearest *measured* sample and reports its value. The drawn
   * curve is smoothed, decimated and may contain interpolated bridge points –
   * none of those are measurements, so none of them may be shown here.
   */
  private showHoverAt(time: number): void {
    const geometry = this.hoverGeometry;
    const hover = this.hoverRef.value;
    if (!geometry || !hover) return;

    const nearestTemperature = geometry.temperature
      ? nearestSample(geometry.temperature.samples, time)
      : null;
    const nearestHumidity = geometry.humidity
      ? nearestSample(geometry.humidity.samples, time)
      : null;
    let anchor = nearestTemperature ?? nearestHumidity;
    if (nearestTemperature && nearestHumidity) {
      anchor =
        Math.abs(nearestTemperature.t - time) <= Math.abs(nearestHumidity.t - time)
          ? nearestTemperature
          : nearestHumidity;
    }
    if (!anchor) {
      this.hideHover();
      return;
    }

    const anchorTime = anchor.t;
    const crosshair = this.crosshairRef.value;
    const xPx = this.xForTime(anchorTime, geometry);
    if (crosshair) crosshair.style.left = `${xPx}px`;

    // Both series are reported at the same instant; a HA state stays valid until
    // it changes, so the last known value of the other series is the truth.
    const temperatureSample = geometry.temperature
      ? nearestSample(geometry.temperature.samples, anchorTime)
      : null;
    const humiditySample = geometry.humidity
      ? nearestSample(geometry.humidity.samples, anchorTime)
      : null;

    this.placeDot(
      this.temperatureDotRef.value,
      geometry.temperature,
      temperatureSample,
      xPx
    );
    this.placeDot(this.humidityDotRef.value, geometry.humidity, humiditySample, xPx);

    const tooltip = this.tooltipRef.value;
    const timeNode = this.tooltipTimeRef.value;
    const temperatureRow = this.tooltipTemperatureRowRef.value;
    const humidityRow = this.tooltipHumidityRowRef.value;
    const temperatureValue = this.tooltipTemperatureRef.value;
    const humidityValue = this.tooltipHumidityRef.value;
    const temperatureUnit = this.temperatureUnit || this.setpointUnit;

    if (timeNode) timeNode.textContent = this.formatDayTime(anchorTime);
    if (temperatureRow) temperatureRow.hidden = !temperatureSample;
    if (humidityRow) humidityRow.hidden = !humiditySample;
    if (temperatureValue && temperatureSample) {
      temperatureValue.textContent = this.tooltipValue(
        temperatureSample.v as number,
        temperatureUnit,
        this.temperatureDecimals
      );
    }
    if (humidityValue && humiditySample) {
      humidityValue.textContent = this.tooltipValue(
        humiditySample.v as number,
        this.humidityUnit,
        this.humidityDecimals
      );
    }

    if (tooltip) {
      tooltip.dataset.time = String(anchorTime);
      const boxWidth = tooltip.offsetWidth || 84;
      const boxHeight = tooltip.offsetHeight || 38;
      let left = xPx + 10;
      if (left + boxWidth > geometry.width - 4) left = xPx - 10 - boxWidth;
      left = Math.max(4, Math.min(left, Math.max(4, geometry.width - boxWidth - 4)));
      const top = Math.max(2, Math.min(geometry.plotTop + 2, geometry.height - boxHeight - 2));
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    }

    hover.hidden = false;
  }

  private placeDot(
    dot: HTMLElement | undefined,
    series: HoverSeries | null,
    sample: ChartSample | null,
    xPx: number
  ): void {
    if (!dot) return;
    if (!series || !sample || sample.v === null) {
      dot.hidden = true;
      return;
    }
    dot.hidden = false;
    dot.style.left = `${xPx}px`;
    dot.style.top = `${this.yForValue(series, sample.v)}px`;
  }

  private hideHover(): void {
    this.clearHoverTimer();
    const hover = this.hoverRef.value;
    if (hover) hover.hidden = true;
  }

  private clearHoverTimer(): void {
    if (this.hoverHideTimer) clearTimeout(this.hoverHideTimer);
    this.hoverHideTimer = undefined;
  }

  /**
   * Axis caption: weekday plus time for the first ticks, plain "now" for the
   * right-most one. "Sa 05:40" is readable at a glance; "05:40" alone is not.
   */
  private formatAxisLabel(timestamp: number, isLast: boolean): string {
    if (isLast) return this.labels.now;
    return this.formatDayTime(timestamp);
  }

  private formatDayTime(timestamp: number): string {
    const date = new Date(timestamp);
    const locale = this.language || 'en';
    // Home Assistant formats times in the zone of the instance, not in the zone
    // of whatever browser happens to open the dashboard.
    const zone = this.timeZone ? { timeZone: this.timeZone } : {};
    const clock: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      ...(typeof this.hour12 === 'boolean' ? { hour12: this.hour12 } : {}),
    };
    let weekday: string;
    let time: string;
    try {
      weekday = new Intl.DateTimeFormat(locale, { weekday: 'short', ...zone })
        .format(date)
        .replace(/[.,]/g, '')
        .trim();
      time = new Intl.DateTimeFormat(locale, { ...clock, ...zone }).format(date);
    } catch {
      weekday = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'][date.getDay()];
      time = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    }
    return weekday ? `${weekday} ${time}` : time;
  }
}

export const CHART_TAG = 'room-climate-chart';

if (typeof customElements !== 'undefined' && !customElements.get(CHART_TAG)) {
  customElements.define(CHART_TAG, RoomClimateChart);
}
