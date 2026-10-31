import { LitElement, css, html, nothing, svg, type TemplateResult } from 'lit';
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
  padDomain,
  projectRun,
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
    return html`<div class="wrap">${this.renderChart(width, height)}</div>`;
  }

  private renderChart(width: number, height: number): TemplateResult {
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
    const ariaLabel = setpointText
      ? `${this.labels.aria}. ${setpointText}`
      : this.labels.aria;

    return svg`<svg
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
      ${axisLabels}
    </svg>`;
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
