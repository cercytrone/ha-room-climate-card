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
  smoothingGuard,
  smoothingWindow,
  type SmoothingLevel,
  placeSetpointCaption,
  roundTimeTicks,
  stepPath,
  stepRuns,
  splitAtBridges,
  type ChartSample,
  type GapMode,
  type Point,
  type SeriesSegment,
} from './geometry';
import {
  BAND_COLD,
  BAND_HOT,
  BAND_WARM,
  bandColorAt,
  bandColorAtOffset,
  bandStops,
  bandStrokeRuns,
} from './bands';

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

/** Smallest chart the min/max marks are drawn into, in CSS pixel. */
const MIN_EXTREME_WIDTH = 150;
const MIN_EXTREME_BAND = 14;

/**
 * Radius of the "now" dot at the end of a curve. The plot reserves this much on
 * the right, because the chart is drawn edge to edge inside the card.
 */
const END_DOT_RADIUS = 2.8;

/** Minimum distance of a min/max number to the chart edge, in CSS pixel. */
const EXTREME_EDGE_GAP = 6;
const DAY_MS = 24 * 3600 * 1000;
/** Room kept free left of "now" on the axis, in px. */
const AXIS_NOW_CLEARANCE = 70;
/** Smallest distance between two axis labels, in px ("Fr 03:00" ≈ 50 px). */
const AXIS_LABEL_SPACING = 72;
/** Half the width of an axis label; decides when a label leans on the left edge. */
const AXIS_LABEL_HALF_WIDTH = 26;
/** Approximate advance of one letter of the 9 px "SOLL" caption (versals, tracked). */
const CAPTION_CHAR_WIDTH = 6.6;
/** Height of the caption box and its gap to the dashed line, in px. */
const CAPTION_HEIGHT = 9;
const CAPTION_LINE_GAP = 3;

/**
 * Why a min/max mark is missing, reported once per reason.
 *
 * The card used to drop the marks silently when a chart was narrow, a band flat
 * or a curve perfectly straight – from the outside that looked like a broken
 * switch. One line in the console is cheaper than guessing.
 */
const explainedExtremeSkips = new Set<string>();
function explainExtremes(reason: string, series: string): void {
  const key = `${reason}|${series}`;
  if (explainedExtremeSkips.has(key)) return;
  explainedExtremeSkips.add(key);
  // eslint-disable-next-line no-console -- a visible hint beats a silent gap
  console.info(
    `[room-climate-card] Minimum/Maximum der ${series} ausgeblendet: ${reason}. ` +
      'Die Zahlen brauchen Platz im Chart – eine höhere Chart-Höhe oder eine breitere Karte schafft ihn.'
  );
}

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
  /**
   * Names of the four temperature bands, used for the `aria-label` only: the
   * gradient is pure colour, so the words are its accessible counterpart.
   */
  bandColdText?: string;
  bandNormalText?: string;
  bandWarmText?: string;
  bandHotText?: string;
  /** Accessible name of the focusable plot: how to explore it by keyboard. */
  explore?: string;
}

export class RoomClimateChart extends LitElement {
  static properties = {
    temperature: { attribute: false },
    humidity: { attribute: false },
    accentColor: { attribute: false },
    humidityColor: { attribute: false },
    setpoint: { attribute: false },
    setpointUnit: { attribute: false },
    setpointHistory: { attribute: false },
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
    chartOpacity: { attribute: false },
    temperatureAreaOpacity: { attribute: false },
    humidityAreaOpacity: { attribute: false },
    temperatureBands: { attribute: false },
    bandCold: { attribute: false },
    bandWarm: { attribute: false },
    bandHot: { attribute: false },
    bandTransition: { attribute: false },
    temperatureScale: { attribute: false },
    showAxis: { attribute: false },
    showSetpoint: { attribute: false },
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
    /* Quiet corner mark: the curve shown is the last good one, not live. */
    .stale {
      position: absolute;
      top: 4px;
      right: 6px;
      display: inline-flex;
      color: var(--rcc-muted, rgba(255, 255, 255, 0.5));
      pointer-events: auto;
    }
    .stale svg {
      width: 12px;
      height: 12px;
      stroke: currentColor;
      fill: none;
      stroke-width: 1.8;
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
    .overlay:focus {
      outline: none;
    }
    .overlay:focus-visible {
      outline: 2px solid var(--rcc-focus, currentColor);
      outline-offset: -2px;
      border-radius: 4px;
    }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0 0 0 0);
      white-space: nowrap;
      border: 0;
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
      font-size: 10px;
      font-weight: 500;
      fill: var(--rcc-text);
      /*
       * 9 px at 55 % read as "nothing" on a dark card, especially on a screen
       * that is not perfectly calibrated. The number is orientation, not
       * decoration – it has to be legible, so it gets real contrast and a
       * slightly wider halo in the card colour.
       */
      fill-opacity: 0.8;
      letter-spacing: 0.02em;
      font-variant-numeric: tabular-nums;
      paint-order: stroke;
      stroke: var(--rcc-chart-point-fill);
      stroke-width: 2;
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
  /**
   * Target over the window as a step series (each value holds until the next
   * sample; `null` = no target, e.g. thermostat off). When given, the reference
   * follows the target that applied at each moment instead of today's value.
   */
  setpointHistory?: ChartSample[];
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
  /** Opacity of line, area and points in percent (15–100). */
  chartOpacity = 100;
  /** Strength of the temperature area fill (1 = built-in default). */
  temperatureAreaOpacity = 1;
  /** Strength of the humidity area fill (1 = built-in default). */
  humidityAreaOpacity = 1;
  /** Paint the temperature curve by value: cold / normal / warm / hot. */
  temperatureBands = false;
  /**
   * Thresholds of the colour bands, always ascending and in the unit the curve
   * is drawn in (the card converts the stored °C values).
   */
  bandCold = 18;
  bandWarm = 24;
  bandHot = 27;
  /** Width of the blend between two bands in percent (100 = fully continuous). */
  bandTransition = 100;
  /** Scale of the plotted values – only used for the numbers in `aria-label`. */
  temperatureScale: 'C' | 'F' = 'C';
  /** Time labels under the plot (start, middle, "now"). */
  showAxis = true;
  /** Dashed reference line at the thermostat's target value. */
  showSetpoint = true;
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
  private readonly liveRef = createRef<HTMLElement>();
  /** Instant the readout currently shows; the arrow keys move from here. */
  private hoverTime?: number;

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

  private get temperatureVisible(): boolean {
    return Boolean(this.temperature?.some((s) => s.v !== null));
  }

  private get humidityVisible(): boolean {
    return Boolean(this.humidity?.some((s) => s.v !== null));
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
    return html`<div class="wrap">
      ${chart}${this.renderOverlay(geometry)}${this.renderStaleMark(errorIcon)}
    </div>`;
  }

  /**
   * The last good curve stays visible when a refresh fails – but it must not
   * pass for live data. A small mark in the corner says so; hover or a screen
   * reader gets the reason.
   */
  private renderStaleMark(icon: TemplateResult): TemplateResult | typeof nothing {
    if (!this.error) return nothing;
    return html`<span
      class="stale"
      role="status"
      title=${this.labels.error}
      aria-label=${this.labels.error}
      >${icon}</span
    >`;
  }

  private renderChart(
    width: number,
    height: number
  ): { chart: TemplateResult; geometry: HoverGeometry } {
    const chartHeight = height;
    // Below this height the labels would collide with the curves, so they are
    // dropped; the editor switch removes them on purpose and frees the space.
    const showAxis = this.showAxis && chartHeight >= 62;
    /*
     * Without the time row there is no text below the plot, so the plot runs to
     * the bottom edge (half a pixel keeps the 1 px baseline visible). The card
     * cancels its bottom inset in that case.
     */
    const axisSpace = showAxis ? 20 : 0.5;
    const top = 6;
    const bottom = chartHeight - axisSpace;
    const plotHeight = Math.max(6, bottom - top);
    /*
     * Zero, not one: the slot already starts on the inside of the card's
     * hairline, and every extra pixel of its own showed up as a light gap
     * between the fill and the side of the card on a large screen.
     */
    const left = 0;
    /*
     * The chart runs to the card's outer edge (the card cancels its inset for
     * the chart), so the last dot would otherwise be cut in half by that edge.
     * The plot therefore ends one dot radius short: the dot still sits exactly
     * on the drawn endpoint, and it stays fully visible. Both series use the
     * same reserve so their end dots share one x position.
     */
    const right = width - 1 - END_DOT_RADIUS;
    /*
     * The data is drawn to the very edge, only the time scale ends a dot radius
     * early. "Hold" the last value over that strip, so the line and its area
     * reach the edge instead of leaving an unfilled 3 px band next to the
     * "now" dot.
     */
    const edgeRight = width;
    /*
     * The "Soll" caption is text, and the chart now touches the card's edge:
     * without a couple of pixels it would sit right on that edge.
     */
    const captionInset = 3;
    const rangeMs = Math.max(1, this.end - this.start);
    const x = linearScale([this.start, this.end], [left, right]);
    // The curves may run into the rounded corners, the labels may not.
    const cornerInset = showAxis ? Math.min(Math.max(this.cornerRadius, 0), 30) + 2 : 0;
    const labelX = linearScale(
      [this.start, this.end],
      [left + cornerInset, edgeRight - cornerInset]
    );
    const labelBaseline = chartHeight - 6;

    /*
     * Band layout. With both series drawn, humidity owns the upper third and
     * temperature the lower half, so the two curves never cross. A single series
     * gets the whole plot instead of leaving the other band empty – the same
     * temperature swing then covers twice the height.
     *
     * The decision looks at the *configuration*, not at the data: a humidity
     * sensor that briefly reports nothing must not make the chart jump. Only a
     * series the card does not hand over (`show_humidity_chart: false`) frees
     * the space.
     */
    const temperatureSeriesOn = this.temperature !== undefined;
    const humiditySeriesOn = this.humidity !== undefined;
    const singleSeries = temperatureSeriesOn !== humiditySeriesOn;
    const humidityTop = top;
    const humidityBottom = singleSeries ? bottom : top + plotHeight * HUMIDITY_BAND_HEIGHT;
    const temperatureTop = singleSeries ? top : top + plotHeight * TEMPERATURE_BAND_TOP;
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
    /*
     * With a target history the reference is a step line: the target that was
     * set at each moment. Without one it stays the flat line at the current
     * target.
     */
    const setpointParts =
      this.setpointHistory && this.setpointHistory.length
        ? stepRuns(this.setpointHistory, this.start, this.end)
        : [];
    const setpointStepped = setpointParts.length > 0;
    // The target belongs to the domain: otherwise a setpoint above or below the
    // measured range would silently drop the reference line.
    const tempValues = setpointStepped
      ? [...temperatureValues, ...setpointParts.flat().map((run) => run.v)]
      : setpointValue !== null
        ? [...temperatureValues, setpointValue]
        : temperatureValues;
    const tempExtent = extent(tempValues);
    const humidityExtent = extent(humidityValues);
    const tempDomain = tempExtent
      ? padDomain(tempExtent[0], tempExtent[1], TEMPERATURE_DOMAIN)
      : null;
    const humidityDomain = humidityExtent
      ? padDomain(humidityExtent[0], humidityExtent[1], HUMIDITY_DOMAIN)
      : null;

    const tempY = tempDomain ? linearScale(tempDomain, [temperatureBottom, temperatureTop]) : null;

    /*
     * Curve opacity and the optional temperature bands.
     *
     * The bands are one vertical gradient in user space: every point of the
     * curve picks the colour of its own value, so the transition is continuous
     * instead of four hard blocks. Off by default – the accent stays the curve.
     */
    const opacityFactor = Math.min(1, Math.max(0.15, (this.chartOpacity ?? 100) / 100));
    const bandGradient =
      this.temperatureBands && tempDomain
        ? bandStops(
            tempDomain,
            { coldBelow: this.bandCold, warmAbove: this.bandWarm, hotAbove: this.bandHot },
            { cold: BAND_COLD, normal: this.accentColor, warm: BAND_WARM, hot: BAND_HOT },
            this.bandTransition
          )
        : null;
    /*
     * `stroke:url(#…)` is not reliable: in some WebViews (the Home Assistant
     * app among them) the *stroke* of a path silently ignores the paint server
     * and the curve comes out in one flat colour while the area underneath keeps
     * its gradient. The curve is therefore painted in short runs of solid
     * colour, read from the very same stops as the area gradient.
     */
    const bandOffsetAt = (y: number): number =>
      temperatureBottom === temperatureTop
        ? 0
        : (y - temperatureTop) / (temperatureBottom - temperatureTop);
    const opacityStyle = opacityFactor < 1 ? `;stroke-opacity:${opacityFactor}` : '';
    /*
     * The area strength is a multiplier on top of the built-in falloff, so the
     * curve at 100 % looks exactly as before and 200 % doubles the fill. It is
     * clamped at 1 per stop: an area is a background, never a block of colour.
     */
    // Clamped per stop, not here: 200 % must really double the built-in 0.22.
    const areaFactor = (strength: number): number =>
      Math.max(0.01, (Number.isFinite(strength) ? strength : 1) * opacityFactor);
    const temperatureAreaFactor = areaFactor(this.temperatureAreaOpacity);
    const humidityAreaFactor = areaFactor(this.humidityAreaOpacity);
    const fillFade = (offset: number): number =>
      Math.min(
        1,
        Number(
          (0.22 * Math.pow(1 - Math.min(1, Math.max(0, offset)), 1.45) * temperatureAreaFactor).toFixed(3)
        )
      );
    const temperatureFillStops = bandGradient
      ? bandGradient.map((stop) => ({
          offset: stop.offset,
          color: stop.color,
          opacity: fillFade(stop.offset),
        }))
      : [
          { offset: 0, color: this.accentColor, opacity: fillFade(0) },
          {
            offset: 0.55,
            color: this.accentColor,
            // Same 0.08 falloff as before, scaled by strength and opacity.
            opacity: Number((0.08 * temperatureAreaFactor).toFixed(3)),
          },
          { offset: 1, color: this.accentColor, opacity: 0 },
        ];
    const humidityFillStops = [
      { offset: 0, color: this.humidityColor, opacity: Number(Math.min(1, 0.2 * humidityAreaFactor).toFixed(3)) },
      { offset: 0.6, color: this.humidityColor, opacity: Number(Math.min(1, 0.07 * humidityAreaFactor).toFixed(3)) },
      { offset: 1, color: this.humidityColor, opacity: 0 },
    ];
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
      // The level defines a *time* span, which becomes a sample count here; the
      // guard grows with that count, so a wide window is not cut down to ±3
      // neighbours (which made "medium" and "strong" draw the same curve).
      const spacing = medianInterval(series);
      const window = Math.min(
        smoothingWindow(spacing, this.smoothing),
        series.length % 2 ? series.length : series.length - 1
      );
      if (window < 3) return series;
      return movingAverage(series, window, {
        maxDeltaMs: smoothingGuard(window, spacing),
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
        gridLines.push(svg`<line class="grid-line" x1=${left} x2=${edgeRight} y1=${y} y2=${y} />`);
      }
    }

    /*
     * Round local times ("Fr 03:00", "Fr 06:00") plus "now" at the right end.
     * A label costs about 50 px; the step is the finest one whose labels keep
     * that apart and stay clear of "now".
     */
    const labelSpan = Math.max(1, edgeRight - left - 2 * cornerInset);
    const msPerPx = rangeMs / labelSpan;
    const maxTicks = width < 200 ? 1 : width < 300 ? 2 : 3;
    const ticks = showAxis
      ? roundTimeTicks(this.start, this.end, {
          maxTicks,
          endClearanceMs: AXIS_NOW_CLEARANCE * msPerPx,
          minSpacingMs: AXIS_LABEL_SPACING * msPerPx,
          offsetAt: (time) => this.zoneOffset(time),
        })
      : [];
    const leftBound = left + cornerInset;
    const axisLabels = showAxis
      ? [
          ...ticks.map((tick) => {
            const tickX = labelX(tick);
            // A centred label near the left edge would run into the corner.
            const anchor = tickX - AXIS_LABEL_HALF_WIDTH < leftBound ? 'start' : 'middle';
            return svg`<text class="axis-label" x=${Math.max(tickX, leftBound)} y=${labelBaseline} text-anchor=${anchor}>
              ${this.formatAxisLabel(tick, false, rangeMs > DAY_MS)}
            </text>`;
          }),
          svg`<text class="axis-label" x=${labelX(this.end)} y=${labelBaseline} text-anchor="end">
            ${this.formatAxisLabel(this.end, true)}
          </text>`,
        ]
      : [];

    const holdToEdge = (points: Point[]): Point[] => {
      if (points.length < 2) return points;
      const last = points[points.length - 1];
      // Only the run that actually reaches "now" gets the flat tail.
      if (last.x < right - 0.75) return points;
      return [...points, { x: edgeRight, y: last.y }];
    };

    const projectPoints = (samples: ChartSample[], y: (value: number) => number) =>
      holdToEdge(projectRun(samples, x, y));

    /*
     * A series as drawn: whole paths, or – with the bands on – runs of solid
     * colour. Dashed gap style already splits interpolated stretches into their
     * own paths so they read as "no measurement here"; the runs follow that
     * split instead of undoing it.
     */
    const linePaints = (
      segment: SeriesSegment,
      y: (value: number) => number,
      banded: boolean
    ): Array<{ d: string; color?: string }> => {
      const parts =
        this.gapStyle === 'dashed' ? splitAtBridges(segment) : [segment.samples];
      return parts
        .filter((part) => part.length > 1)
        .flatMap((part) => {
          const points = projectPoints(part, y);
          if (!banded || !bandGradient) {
            return [{ d: seriesPath(points, smooth).concat() }];
          }
          return bandStrokeRuns(points, smooth, bandGradient, bandOffsetAt);
        })
        .filter((paint) => paint.d.length > 0);
    };

    const seriesElement = (
      segment: SeriesSegment,
      y: (value: number) => number,
      stroke: string,
      options: {
        color?: string;
        dashed?: boolean;
        width?: number;
        banded?: boolean;
      } = {}
    ): TemplateResult[] => {
      const paints = linePaints(segment, y, options.banded === true);
      /*
       * Colour runs are grouped and dimmed *as a group*: neighbouring runs
       * overlap by a fraction of a pixel (otherwise anti-aliasing leaves a
       * dotted seam), and per-path opacity would show every overlap as a darker
       * spot. A group is composited once, so the overlaps stay invisible.
       */
      const groupStyle = opacityFactor < 1 ? `opacity:${opacityFactor}` : '';
      const paths = paints.map(({ d, color }, index) => {
        /*
         * Colour runs butt against each other: the curve is C1 continuous, so
         * the flat ends of two neighbouring runs share their normal and close
         * without a seam. Round caps would put a small disc of the old colour on
         * every joint – at one run per sample that reads as a dotted line.
         * Only the two visible ends of the whole curve stay round.
         */
        const cap =
          options.banded && paints.length > 1
            ? `stroke-linecap:${index === 0 || index === paints.length - 1 ? 'round' : 'butt'};`
            : '';
        const style = [
          `stroke:${color ?? options.color ?? stroke}`,
          cap,
          options.width ? `stroke-width:${options.width}` : '',
          options.dashed ? 'stroke-dasharray:0.1 5.5' : '',
          options.banded ? '' : opacityStyle.replace(/^;/, ''),
        ]
          .filter(Boolean)
          .join(';');
        return svg`<path class="series-line" d=${d} style=${style}></path>`;
      });
      if (!options.banded || paints.length < 2) return paths;
      return [svg`<g class="series-runs" style=${groupStyle}>${paths}</g>`];
    };

    /*
     * One colour (the accent) or – with the bands on – the same ramp the area
     * uses, cut into solid runs. Either way the stroke carries a real colour and
     * never a paint server, which is what the app's WebView drops.
     */
    const tempPaths = tempSegments.flatMap((segment) =>
      seriesElement(segment, tempY!, this.accentColor, {
        color: this.accentColor,
        banded: bandGradient !== null,
      })
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
            svg`<circle class="point" r="1.7" cx=${x(sample.t)} cy=${projectY(value)} style="stroke:${color}${opacityStyle}" />`
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
    const firstSetpointRun = setpointParts[0]?.[0];
    const lastSetpointPart = setpointParts[setpointParts.length - 1];
    const lastSetpointRun = lastSetpointPart?.[lastSetpointPart.length - 1];
    /** Target at the two ends of the window (null = a gap there). */
    const setpointAtEdge: Record<'left' | 'right', number | null> = setpointStepped
      ? {
          left: firstSetpointRun && firstSetpointRun.from <= this.start ? firstSetpointRun.v : null,
          right: lastSetpointRun && lastSetpointRun.to >= this.end ? lastSetpointRun.v : null,
        }
      : { left: setpointValue, right: setpointValue };
    /** Target that applied at time `t`. */
    const setpointAt = (t: number): number | null => {
      if (!setpointStepped) return setpointValue;
      for (const part of setpointParts) {
        for (const run of part) if (t >= run.from && t <= run.to) return run.v;
      }
      return null;
    };
    const setpointYOf = (value: number | null): number | null =>
      value !== null && tempY ? tempY(value) : null;
    const setpointYAt = (t: number): number | null => setpointYOf(setpointAt(t));
    // Flat reference only; the step line has its own path.
    const setpointY = setpointStepped ? null : setpointYOf(setpointValue);
    const showSetpoint =
      this.showSetpoint &&
      tempY !== null &&
      (setpointStepped ||
        (setpointY !== null &&
          Number.isFinite(setpointY) &&
          setpointY >= temperatureTop - 0.5 &&
          setpointY <= temperatureBottom + 0.5));
    const setpointPath =
      showSetpoint && setpointStepped && tempY ? stepPath(setpointParts, x, tempY) : '';

    // First guess for the caption: the end of the line where the measured
    // values keep the most distance from the reference.
    const firstTempValue = tempSeries.find((sample) => sample.v !== null)?.v ?? null;
    const lastTempValue = [...tempSeries].reverse().find((sample) => sample.v !== null)?.v ?? null;
    const distance = (value: number | null, reference: number | null) =>
      value === null || reference === null ? 0 : Math.abs(value - reference);
    const preferredCaptionSide: 'left' | 'right' =
      setpointAtEdge.right === null && setpointAtEdge.left !== null
        ? 'left'
        : distance(lastTempValue, setpointAtEdge.right) >=
            distance(firstTempValue, setpointAtEdge.left)
          ? 'right'
          : 'left';
    const captionLineYBySide: Partial<Record<'left' | 'right', number>> = {};
    for (const side of ['left', 'right'] as const) {
      const lineY = setpointYOf(setpointAtEdge[side]);
      if (lineY !== null && Number.isFinite(lineY)) captionLineYBySide[side] = lineY;
    }
    const hasCaptionLine = Object.keys(captionLineYBySide).length > 0;

    /*
     * The end dot has to sit *on* the curve, so it is taken from the drawn
     * segments instead of the raw measurements. With smoothing on, the newest
     * plotted value is the average of its neighbours: on a rising room that is
     * up to 0.2 °C below the last measurement – the dot used to float clearly
     * above the line (0.2 °C ≈ 17 px), and below it while the room cooled down.
     * Data points and the min/max marks already come from the drawn series.
     */
    const lastPlotted = (segments: SeriesSegment[]): ChartSample | undefined => {
      for (let index = segments.length - 1; index >= 0; index -= 1) {
        const run = segments[index].samples;
        for (let sampleIndex = run.length - 1; sampleIndex >= 0; sampleIndex -= 1) {
          if (run[sampleIndex].v !== null) return run[sampleIndex];
        }
      }
      return undefined;
    };
    const lastTemp = lastPlotted(tempSegments);
    const lastHumidity = lastPlotted(humiditySegments);

    /*
     * The caption checks the *drawn* curves and the "now" dots: guessing from
     * the values alone put it on the end dot whenever the room sat close to
     * its target. It tries both ends, above and below the line.
     */
    const captionText = this.labels.setpoint;
    const captionWidth = captionText.length * CAPTION_CHAR_WIDTH + 2;
    const captionPlacement =
      showSetpoint && hasCaptionLine
        ? placeSetpointCaption({
            lineY: captionLineYBySide[preferredCaptionSide] ?? 0,
            lineYBySide: captionLineYBySide,
            left: left + captionInset,
            right: edgeRight - captionInset,
            width: captionWidth,
            height: CAPTION_HEIGHT,
            top,
            bottom,
            curves: [
              ...(tempY
                ? tempSegments
                    .filter((segment) => segment.samples.length > 1)
                    .map((segment) => projectPoints(segment.samples, tempY))
                : []),
              ...(humidityY
                ? humiditySegments
                    .filter((segment) => segment.samples.length > 1)
                    .map((segment) => projectPoints(segment.samples, humidityY))
                : []),
            ],
            dots: [
              ...(lastTemp && tempY
                ? [{ x: x(lastTemp.t), y: tempY(lastTemp.v as number), r: 2.8 }]
                : []),
              ...(lastHumidity && humidityY
                ? [{ x: x(lastHumidity.t), y: humidityY(lastHumidity.v as number), r: 2.6 }]
                : []),
            ],
            preferredSide: preferredCaptionSide,
          })
        : null;
    // The fallback placement may name a side without a line (a gap there).
    const captionSide: 'left' | 'right' =
      captionPlacement && captionLineYBySide[captionPlacement.side] !== undefined
        ? captionPlacement.side
        : captionLineYBySide.right !== undefined
          ? 'right'
          : 'left';
    const captionOnRight = captionSide === 'right';
    const captionLineY = showSetpoint ? captionLineYBySide[captionSide] ?? null : null;
    const captionBaseline =
      captionLineY === null
        ? 0
        : captionPlacement && !captionPlacement.above
          ? captionLineY + CAPTION_LINE_GAP + CAPTION_HEIGHT - 1
          : captionLineY - CAPTION_LINE_GAP - 1;

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
    /*
     * The bands are pure colour, so the accessible text has to name them: a
     * screen reader hears "16,9–28,9 °C (kalt – heiß)" instead of a gradient.
     */
    const bandRangeText = (() => {
      if (!bandGradient || !tempY) return '';
      const values = tempSeries
        .map((sample) => sample.v)
        .filter((value): value is number => value !== null && Number.isFinite(value));
      if (!values.length) return '';
      const limits = {
        coldBelow: this.bandCold,
        warmAbove: this.bandWarm,
        hotAbove: this.bandHot,
      };
      const names = {
        cold: this.labels.bandColdText ?? 'kalt',
        normal: this.labels.bandNormalText ?? 'normal',
        warm: this.labels.bandWarmText ?? 'warm',
        hot: this.labels.bandHotText ?? 'heiß',
      };
      const colors = { cold: BAND_COLD, normal: this.accentColor, warm: BAND_WARM, hot: BAND_HOT };
      const first = bandColorAt(Math.min(...values), limits, colors);
      const last = bandColorAt(Math.max(...values), limits, colors);
      const nameOf = (color: string): string =>
        color === BAND_COLD ? names.cold : color === BAND_WARM ? names.warm : color === BAND_HOT ? names.hot : names.normal;
      const from = nameOf(first);
      const to = nameOf(last);
      return from === to ? `(${from})` : `(${from} – ${to})`;
    })();
    const ariaLabel = [
      this.labels.aria,
      setpointText,
      tempY ? rangeText(this.labels.temperature, tempSeries, temperatureUnit, this.temperatureDecimals) : '',
      humidityY
        ? rangeText(this.labels.humidity, humiditySeries, this.humidityUnit, this.humidityDecimals)
        : '',
      bandRangeText,
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
      decimals: number,
      seriesName: string
    ): void => {
      if (!this.showExtremes) return;
      const skip = (reason: string): void => explainExtremes(reason, seriesName);
      if (width < MIN_EXTREME_WIDTH) return skip('schmale Karte');
      if (bandBottom - bandTop < MIN_EXTREME_BAND) return skip('flaches Band');
      const extremes = seriesExtremes(samples);
      if (!extremes) return skip('keine Messwerte');
      if (samples.filter((sample) => sample.v !== null).length < 3) return skip('zu wenige Messwerte');
      /*
       * A curve that never moved has one value, not two. It used to be skipped
       * entirely, which is why a well-regulated room showed no numbers at all:
       * both thresholds sat on the same value. Now the single level is printed
       * once instead of twice.
       */
      const flat = extremes.min.v === extremes.max.v;
      const entries = (flat
        ? [{ sample: extremes.max, isMax: true }]
        : [
            { sample: extremes.max, isMax: true },
            { sample: extremes.min, isMax: false },
          ])
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
          const lineYHere = showSetpoint ? setpointYAt(sample.t) : null;
          if (lineYHere !== null && Math.abs(labelY - lineYHere) < 9) {
            const alternative = isMax ? below : above;
            if (Math.abs(alternative - lineYHere) >= 9) labelY = alternative;
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
        /*
         * The chart may run edge to edge, so a number keeps 6 px to the outer
         * edge instead of the 2 px that were enough while it always sat inside
         * the card inset.
         */
        if (anchor === 'start' && labelX + textWidth > edgeRight - EXTREME_EDGE_GAP) {
          labelX = entry.cx - 6;
          anchor = 'end';
        } else if (anchor === 'end' && labelX - textWidth < left + EXTREME_EDGE_GAP) {
          labelX = entry.cx + 6;
          anchor = 'start';
        }
        // "Soll" lives at the very edge of the plot: step aside instead of
        // printing two numbers on top of each other.
        const captionX = captionOnRight ? edgeRight - captionInset : left + captionInset;
        const captionClash = (x: number): boolean =>
          captionLineY !== null &&
          Math.abs(entry.labelY - captionBaseline) < 9 &&
          Math.abs(x - captionX) < 40;
        if (captionClash(labelX)) {
          const flipped = anchor === 'start' ? entry.cx - 6 : entry.cx + 6;
          if (!captionClash(flipped)) {
            labelX = flipped;
            anchor = anchor === 'start' ? 'end' : 'start';
          }
        }
        // Whatever the flips did: the number keeps its gap to the chart edge.
        labelX =
          anchor === 'start'
            ? Math.min(labelX, edgeRight - EXTREME_EDGE_GAP - textWidth)
            : Math.max(labelX, left + EXTREME_EDGE_GAP + textWidth);
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
        this.temperatureDecimals,
        'Temperatur'
      );
    }
    if (humidityY) {
      addExtremeMarks(
        humiditySeries,
        humidityY,
        humidityTop,
        humidityBottom,
        this.humidityColor,
        this.humidityDecimals,
        'Luftfeuchte'
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
          ${temperatureFillStops.map(
            (stop) =>
              svg`<stop offset=${stop.offset} stop-color=${stop.color} stop-opacity=${stop.opacity} />`
          )}
        </linearGradient>
        <linearGradient id=${`${this.uid}-humidity-fill`} x1="0" y1=${humidityTop} x2="0" y2=${humidityBottom} gradientUnits="userSpaceOnUse">
          ${humidityFillStops.map(
            (stop) =>
              svg`<stop offset=${stop.offset} stop-color=${stop.color} stop-opacity=${stop.opacity} />`
          )}
        </linearGradient>
      </defs>
      ${gridLines}
      ${humidityAreas}
      ${tempAreas}
      ${showSetpoint
        ? svg`${setpointStepped
            ? svg`<path
                class="setpoint-line is-stepped"
                d=${setpointPath}
                fill="none"
                style="stroke:${this.accentColor};stroke-opacity:0.42"
              ></path>`
            : svg`<line
                class="setpoint-line"
                x1=${left}
                x2=${right}
                y1=${setpointY}
                y2=${setpointY}
                style="stroke:${this.accentColor};stroke-opacity:0.42"
              ></line>`}
          ${captionLineY === null
            ? nothing
            : svg`<text
            class="setpoint-caption"
            x=${captionOnRight ? edgeRight - captionInset : left + captionInset}
            y=${captionBaseline}
            text-anchor=${captionOnRight ? 'end' : 'start'}
          >
            ${this.labels.setpoint}
          </text>`}`
        : nothing}
      ${
        /*
         * With the time row the baseline separates plot and labels. Without it
         * the plot ends on the card's own edge – a second line there read as a
         * thicker border than the sides.
         */
        showAxis
          ? svg`<line class="baseline" x1=${left} x2=${edgeRight} y1=${bottom} y2=${bottom} />`
          : nothing
      }
      ${humidityPaths} ${tempPaths} ${pointMarkers}
      ${lastHumidity && humidityY
        ? svg`<circle
            class="end-dot"
            r="2.6"
            cx=${x(lastHumidity.t)}
            cy=${humidityY(lastHumidity.v as number)}
            style=${`fill:${this.humidityColor};fill-opacity:${opacityFactor}`}
          />`
        : nothing}
      ${lastTemp && tempY
        ? svg`<circle
            class="end-dot"
            r="2.8"
            cx=${x(lastTemp.t)}
            cy=${tempY(lastTemp.v as number)}
            style=${`fill:${
              bandGradient
                ? bandColorAtOffset(bandGradient, bandOffsetAt(tempY(lastTemp.v as number)))
                : this.accentColor
            };fill-opacity:${opacityFactor}`}
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
    /*
     * The plot is a keyboard stop as well: arrow keys walk through the measured
     * values, Home/End jump to the ends, Escape closes the readout. A polite live
     * region speaks what the tooltip shows.
     */
    return html`<div
        class="overlay"
        style=${`top:${top}px;height:${height}px;--rcc-focus:${this.accentColor}`}
        tabindex="0"
        role="group"
        aria-label=${this.labels.explore ?? this.labels.aria}
        @pointerdown=${this.onPointerDown}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @pointercancel=${this.onPointerUp}
        @pointerleave=${this.onPointerLeave}
        @keydown=${this.onKeyDown}
        @focus=${this.onFocus}
        @blur=${this.onBlur}
      ></div>
      <span class="sr-only" aria-live="polite" ${ref(this.liveRef)}></span>
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

  /** Measured instants of both series, ascending – the stops of the arrow keys. */
  private keyboardTimes(): number[] {
    const geometry = this.hoverGeometry;
    if (!geometry) return [];
    const times = new Set<number>();
    for (const series of [geometry.temperature, geometry.humidity]) {
      for (const sample of series?.samples ?? []) {
        if (sample.v !== null && sample.t >= geometry.start && sample.t <= geometry.end) {
          times.add(sample.t);
        }
      }
    }
    return [...times].sort((a, b) => a - b);
  }

  private onFocus = (): void => {
    // Keyboard focus starts at "now", the value the reading above shows too. A
    // click focuses as well – its readout is already showing and stays.
    if (this.hoverTime !== undefined) return;
    const times = this.keyboardTimes();
    if (times.length) this.showHoverAt(times[times.length - 1], true);
  };

  private onBlur = (): void => {
    this.hideHover();
  };

  private onKeyDown = (event: KeyboardEvent): void => {
    if (!this.showTooltip) return;
    const times = this.keyboardTimes();
    if (!times.length) return;
    const current = this.hoverTime ?? times[times.length - 1];
    // Index of the stop at or right after the current instant.
    let index = times.findIndex((time) => time >= current);
    if (index < 0) index = times.length - 1;
    const onStop = times[index] === current;
    let next: number | undefined;
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        next = times[Math.max(0, index - 1)];
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        next = times[Math.min(times.length - 1, onStop ? index + 1 : index)];
        break;
      case 'PageDown':
        next = times[Math.max(0, index - 10)];
        break;
      case 'PageUp':
        next = times[Math.min(times.length - 1, index + 10)];
        break;
      case 'Home':
        next = times[0];
        break;
      case 'End':
        next = times[times.length - 1];
        break;
      case 'Escape':
        this.hideHover();
        event.preventDefault();
        return;
      default:
        return;
    }
    event.preventDefault();
    this.lastPointerType = 'keyboard';
    this.clearHoverTimer();
    if (next !== undefined) this.showHoverAt(next, true);
  };

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
  private showHoverAt(time: number, announce = false): void {
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
    this.hoverTime = anchorTime;
    // Spoken only for keyboard moves: a pointer sweep would flood the reader.
    const live = this.liveRef.value;
    if (live && announce) {
      live.textContent = [
        timeNode?.textContent ?? '',
        temperatureSample && temperatureValue
          ? `${this.labels.temperature} ${temperatureValue.textContent}`
          : '',
        humiditySample && humidityValue ? `${this.labels.humidity} ${humidityValue.textContent}` : '',
      ]
        .filter(Boolean)
        .join(', ');
    }
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
    this.hoverTime = undefined;
    const hover = this.hoverRef.value;
    if (hover) hover.hidden = true;
  }

  private clearHoverTimer(): void {
    if (this.hoverHideTimer) clearTimeout(this.hoverHideTimer);
    this.hoverHideTimer = undefined;
  }

  private offsetFormatter?: { zone: string; format: Intl.DateTimeFormat };

  /**
   * Offset of the displayed zone at `time` in ms (local = utc + offset), so the
   * axis can put its ticks on full local hours. Browser zone without a zone set;
   * an invalid zone falls back to it as well, like the labels do.
   */
  private zoneOffset(time: number): number {
    const browser = -new Date(time).getTimezoneOffset() * 60_000;
    const zone = this.timeZone;
    if (!zone) return browser;
    try {
      if (this.offsetFormatter?.zone !== zone) {
        this.offsetFormatter = {
          zone,
          format: new Intl.DateTimeFormat('en-US', {
            timeZone: zone,
            hourCycle: 'h23',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        };
      }
      const parts: Record<string, number> = {};
      for (const part of this.offsetFormatter.format.formatToParts(new Date(time))) {
        if (part.type !== 'literal') parts[part.type] = Number(part.value);
      }
      const asUtc = Date.UTC(
        parts.year,
        parts.month - 1,
        parts.day,
        parts.hour % 24,
        parts.minute,
        parts.second
      );
      return asUtc - Math.floor(time / 1000) * 1000;
    } catch {
      return browser;
    }
  }

  /**
   * Axis caption: weekday plus time for the first ticks, plain "now" for the
   * right-most one. "Sa 05:40" is readable at a glance; "05:40" alone is not.
   */
  private formatAxisLabel(timestamp: number, isLast: boolean, multiDay = false): string {
    if (isLast) return this.labels.now;
    // On a multi-day axis the ticks sit on midnight: the weekday says it all.
    if (multiDay && Math.round((timestamp + this.zoneOffset(timestamp)) % DAY_MS) === 0) {
      return this.formatWeekday(timestamp);
    }
    return this.formatDayTime(timestamp);
  }

  private formatWeekday(timestamp: number): string {
    try {
      return new Intl.DateTimeFormat(this.language || 'en', {
        weekday: 'short',
        ...(this.timeZone ? { timeZone: this.timeZone } : {}),
      })
        .format(new Date(timestamp))
        .replace(/[.,]/g, '')
        .trim();
    } catch {
      return this.formatDayTime(timestamp);
    }
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
