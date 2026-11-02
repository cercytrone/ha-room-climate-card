/**
 * Generates the README preview (`docs/images/showcase.svg`).
 *
 * IMPORTANT: this is a *rendering of the card design with demo data* – it uses
 * the real chart geometry module, but the data is synthetic. It is built by
 * `scripts/build-showcase.mjs`, which bundles this file with esbuild and runs it
 * in Node (no browser required). Replace it with a real screenshot after
 * installing the card in Home Assistant.
 */
import {
  areaPath,
  buildSegments,
  linearScale,
  medianInterval,
  movingAverage,
  padDomain,
  projectRun,
  seriesPath,
  smoothingGuard,
  smoothingWindow,
  timeTicks,
  type ChartSample,
  type Point,
} from '../src/chart/geometry';
import { BAND_COLD, BAND_HOT, BAND_WARM, bandColorAt, bandStops } from '../src/chart/bands';

const W = 1000;
const PAD = 24;
const GAP = 20;
const CARD_W = (W - PAD * 2 - GAP) / 2;

/* ---------------------------------------------------------------- tokens --
 * Mirrors the CSS custom properties of the card one to one.
 * ------------------------------------------------------------------------ */
const INSET = 10; // card padding (config default `card_padding: 10`)
const RADIUS = 26; // card radius
const SPACE_1 = 4;
const SPACE_2 = 8;
const SPACE_3 = 12;
const CHART_H = 112;
/*
 * Height follows the same 4 px rhythm as the stylesheet:
 * inset + title row + label row + hero + heating row + chart + inset.
 */
const HEADER_H = 28;
const LABELS_H = 16;
const HERO_H = 42;
const ROW_H = 20;
const CARD_H =
  INSET * 2 +
  HEADER_H +
  SPACE_3 +
  LABELS_H +
  SPACE_1 +
  HERO_H +
  SPACE_2 +
  ROW_H +
  SPACE_3 +
  CHART_H;

export interface Palette {
  mode: 'dark' | 'light';
  page: string;
  card: string;
  hairline: string;
  text: string;
  muted: string;
  tertiary: string;
  accent: string;
  secondary: string;
  heating: string;
  idle: string;
  off: string;
  unknown: string;
  windowOpen: string;
  motion: string;
}

/**
 * Dark tokens – identical to `.card.theme-dark` in `src/room-climate-card.ts`.
 */
export const DARK: Palette = {
  mode: 'dark',
  page: '#07080a',
  card: '#0e1013',
  hairline: 'rgba(255,255,255,0.07)',
  text: 'rgba(255,255,255,0.92)',
  muted: 'rgba(255,255,255,0.50)',
  tertiary: 'rgba(255,255,255,0.32)',
  accent: '#4FD1A5',
  secondary: '#8B86D6',
  // Damped red – the flame only turns red while heating is actually demanded.
  heating: '#d16a62',
  // Idle = the chart's green (accent), so no new hue enters the card.
  idle: '#4FD1A5',
  // Off / unknown = the muted tone of the „Soll“ wording.
  off: 'rgba(255,255,255,0.50)',
  unknown: 'rgba(255,255,255,0.50)',
  windowOpen: '#fbbf24',
  motion: '#4FD1A5',
};

/**
 * Light tokens – identical to `.card.theme-light`. The accent colours are the
 * same in both themes on purpose: the palette does not bend the brand.
 */
export const LIGHT: Palette = {
  mode: 'light',
  page: '#eceef2',
  card: '#ffffff',
  hairline: 'rgba(15,23,42,0.07)',
  text: 'rgba(15,23,42,0.92)',
  muted: 'rgba(15,23,42,0.52)',
  tertiary: 'rgba(15,23,42,0.34)',
  accent: '#4FD1A5',
  secondary: '#8B86D6',
  heating: '#d16a62',
  idle: '#4FD1A5',
  off: 'rgba(15,23,42,0.52)',
  unknown: 'rgba(15,23,42,0.52)',
  windowOpen: '#fbbf24',
  motion: '#4FD1A5',
};

const TYPE = {
  hero: 42,
  secondary: 20,
  title: 15,
  label: 9.5,
  axis: 10.5,
  row: 12,
};

const font = (size: number, weight = 400): string =>
  `font-family="DejaVu Sans, Segoe UI, Helvetica, Arial, sans-serif" font-size="${size}" font-weight="${weight}"`;

const TRACKING = (em: number, size: number): string =>
  `letter-spacing="${(em * size).toFixed(2)}"`;

/** Rough advance width for the static preview text (DejaVu/Segoe metrics). */
function approxWidth(value: string, size: number): number {
  let width = 0;
  for (const char of value) {
    if (char >= '0' && char <= '9') width += 0.62 * size;
    else if (char === ',' || char === '.') width += 0.3 * size;
    else if (char === '-') width += 0.4 * size;
    else width += 0.55 * size;
  }
  return width;
}

/**
 * Advance width of an uppercase, letter-spaced label. Uppercase letters are
 * noticeably wider than the mixed-case estimate above.
 */
function upperWidth(value: string, size: number, trackingEm: number): number {
  return value.length * (0.72 * size + trackingEm * size);
}

/** Baseline for text whose capital-height centre sits on `center`. */
function capBaseline(center: number, size: number): number {
  return Number((center + (0.729 * size) / 2).toFixed(2));
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const WEEKDAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

function dayTime(timestamp: number): string {
  const date = new Date(timestamp);
  return `${WEEKDAYS[date.getDay()]} ${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes()
  ).padStart(2, '0')}`;
}

export interface CardOptions {
  palette: Palette;
  x: number;
  y: number;
  /** Card width; the preview column of the editor image uses a narrower one. */
  width?: number;
  name: string;
  temperature: string;
  unit: string;
  humidity?: string;
  window?: 'closed' | 'open' | 'unknown';
  motion?: 'active' | 'idle' | 'none';
  quiet?: string;
  /**
   * Text of the heating row: the action ("Heizt" | "Bereit" | "Aus" |
   * "Status unbekannt") or, with `show_hvac_mode`, the mode ("Automatik" …).
   */
  hvacState?: 'Heizt' | 'Bereit' | 'Aus' | 'Status unbekannt' | 'Automatik' | 'Heizen';
  hvacKey?: 'heating' | 'idle' | 'off' | 'unknown';
  setpoint?: string;
  series: ChartSample[];
  humiditySeries?: ChartSample[];
  humidityDotted?: boolean;
  points?: boolean;
  grid?: boolean;
  /** Temperature curve coloured by value (cold / normal / warm / hot). */
  bands?: boolean;
  /** Curve opacity, 0.15 … 1. */
  opacity?: number;
  /** Strength of the area fills (1 = built-in). */
  areaStrength?: number;
  cardId: string;
}

function flame(color: string): string {
  return `<g fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21a6.3 6.3 0 0 1-6.3-6.3c0-2 .9-3.7 2.2-5.1.8-.9 2-2.1 2.7-3.4.5-.9.9-1.9 1.1-2.7.2-.7 1.1-.9 1.5-.3.8 1.3 1.8 3 2.4 4.6.5 1.2.7 2.3.7 3.2 0 1-.3 2-.8 2.8" />
  </g>`;
}

const windowIcon = {
  closed: '<rect x="3.5" y="4" width="17" height="16" rx="2" /><path d="M12 4v16M3.5 12h17" />',
  open: '<path d="M4 4.5h11.5V20H4z" /><path d="M15.5 7.5 20.5 4v16l-5-3.5" />',
  unknown: '<rect x="3.5" y="4" width="17" height="16" rx="2" stroke-dasharray="2 3" />',
};

const homeIcon =
  '<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1Z" />';

/** Header icon box in px – mirrors `--mdc-icon-size` of the card. */
const ROOM_ICON = 16;

const motionIcon =
  '<circle cx="13" cy="4.4" r="1.9" /><path d="M10 21l2.6-5.6 3 1.9 2.2-4.6" /><path d="M7.4 13.4l3.4-2.7.9-3.4-3-1-2.8 3.6" />';

function badge(
  x: number,
  y: number,
  color: string,
  active: boolean,
  body: string,
  palette: Palette
): string {
  return `<g transform="translate(${x},${y})">
    <rect x="0" y="0" width="28" height="28" rx="10" fill="${
      active ? `${color}24` : 'rgba(148,163,184,0.10)'
    }" stroke="${active ? `${color}59` : palette.hairline}" stroke-width="1" />
    <g transform="translate(6.5,6.5)" fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <g transform="scale(0.625)">${body}</g>
    </g>
  </g>`;
}

function renderCard(options: CardOptions): string {
  const { x, y } = options;
  const C = options.palette;
  const cardW = options.width ?? CARD_W;
  const alpha = Math.min(1, Math.max(0.15, options.opacity ?? 1));
  const area = alpha * Math.max(0.1, options.areaStrength ?? 1);
  const fade = alpha < 1 ? ` stroke-opacity="${alpha}"` : '';
  const left = x + INSET;
  const right = x + cardW - INSET;
  /*
   * The chart is flush with the card edge (the card cancels its inset for the
   * chart) and keeps one dot radius free on the right, so the "now" dot stays
   * whole – same numbers as the web component.
   */
  const chartLeft = x + 1;
  const chartRight = x + cardW - 1 - 2.8;

  const headerY = y + INSET;
  const labelsY = headerY + HEADER_H + SPACE_3;
  const heroTop = labelsY + LABELS_H + SPACE_1;
  const heroBaseline = heroTop + 33;
  const rowTop = heroTop + HERO_H + SPACE_2;
  const rowBaseline = rowTop + 14;
  const chartTop = rowTop + ROW_H + SPACE_3;
  const chartBottom = chartTop + CHART_H - 20;
  const axisBaseline = chartTop + CHART_H - 6;

  const rangeMs = 6 * 3600 * 1000;
  const end = Date.now();
  const start = end - rangeMs;
  const xScale = linearScale([start, end], [chartLeft, chartRight]);
  // Text on the time axis keeps its distance to the rounded corners.
  const labelScale = linearScale([start, end], [chartLeft + 28, chartRight - 28]);

  const temperatureVisible = true;
  const humidityVisible = Boolean(options.humiditySeries);

  // --- geometry: with both series the humidity owns the upper third and the
  // temperature the lower half; a single series gets the whole plot (same rule
  // as the card itself, decided by the configuration, not by the data) ---
  const plotHeight = chartBottom - chartTop;
  const singleSeries = temperatureVisible !== humidityVisible;
  const humidityBandBottom = chartTop + plotHeight * (singleSeries ? 1 : 0.3);
  const temperatureBandTop = chartTop + plotHeight * (singleSeries ? 0 : 0.44);

  const valueOf = (sample: ChartSample) => sample.v as number;
  const extentOf = (series?: ChartSample[]) => {
    const values = (series ?? []).map((s) => s.v).filter((v): v is number => v !== null);
    return values.length ? [Math.min(...values), Math.max(...values)] : null;
  };

  const setpointValue = options.setpoint ? Number(options.setpoint.replace(',', '.')) : null;
  const tempExtent = extentOf(options.series);
  const tempDomain =
    tempExtent && temperatureVisible
      ? padDomain(
          Math.min(tempExtent[0], setpointValue ?? tempExtent[0]),
          Math.max(tempExtent[1], setpointValue ?? tempExtent[1]),
          { minSpan: 0.4, padding: 0.15 }
        )
      : null;
  const humidityExtent = extentOf(options.humiditySeries);
  const humidityDomain =
    humidityExtent && humidityVisible
      ? padDomain(humidityExtent[0], humidityExtent[1], { minSpan: 3, padding: 0.15 })
      : null;

  const tempScale = tempDomain
    ? linearScale(tempDomain, [chartBottom, temperatureBandTop])
    : null;
  const bandLimits = { coldBelow: 18, warmAbove: 24, hotAbove: 27 };
  const bandColors = { cold: BAND_COLD, normal: C.accent, warm: BAND_WARM, hot: BAND_HOT };
  const bandGradient =
    options.bands && tempDomain ? bandStops(tempDomain, bandLimits, bandColors) : null;
  const humidityScale = humidityDomain
    ? linearScale(humidityDomain, [humidityBandBottom, chartTop])
    : null;

  const segmentOptions = { rangeMs, start, end, gapMode: 'connect' as const, maxGapMs: 120 * 60 * 1000 };
  const smooth = true;
  // Same order as the card: average first (time-guarded), then segment, so a
  // quiet stretch stays a step instead of becoming a ramp.
  const runsOf = (series?: ChartSample[]) => {
    if (!series) return [];
    const spacing = medianInterval(series);
    const window = Math.min(smoothingWindow(spacing), series.length % 2 ? series.length : series.length - 1);
    const prepared =
      window < 3 ? series : movingAverage(series, window, { maxDeltaMs: smoothingGuard(window, spacing) });
    return buildSegments(prepared, segmentOptions).map((segment) => segment.samples);
  };

  const temperatureRuns = temperatureVisible ? runsOf(options.series) : [];
  const humidityRuns = humidityVisible ? runsOf(options.humiditySeries) : [];

  const temperatureArea = tempScale
    ? temperatureRuns
        .map((run) => areaPath(projectRun(run, xScale, tempScale), chartBottom, smooth))
        .join(' ')
    : '';
  const temperatureLines = tempScale
    ? temperatureRuns
        .map((run) => {
          const points: Point[] = projectRun(run, xScale, tempScale);
          return `<path d="${seriesPath(points, smooth)}" fill="none" stroke="${
            options.bands ? `url(#${options.cardId}-temp-stroke)` : C.accent
          }" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"${fade} />`;
        })
        .join('')
    : '';

  const humidityArea = humidityScale
    ? humidityRuns
        .map((run) => areaPath(projectRun(run, xScale, humidityScale), humidityBandBottom, smooth))
        .join(' ')
    : '';
  const humidityLines = humidityScale
    ? humidityRuns
        .map((run) => {
          const points: Point[] = projectRun(run, xScale, humidityScale);
          const dash = options.humidityDotted ? ' stroke-dasharray="0.1 5.5"' : '';
          return `<path d="${seriesPath(points, smooth)}" fill="none" stroke="${
            C.secondary
          }" stroke-width="${options.humidityDotted ? 2.2 : 1.9}" stroke-linecap="round" stroke-linejoin="round"${dash}${fade} />`;
        })
        .join('')
    : '';

  const dots = options.points
    ? [
        ...(tempScale
          ? temperatureRuns.flatMap((run) =>
              run
                .filter((_, index) => index % 3 === 0)
                .map(
                  (sample) =>
                    `<circle cx="${xScale(sample.t).toFixed(1)}" cy="${tempScale(
                      valueOf(sample)
                    ).toFixed(1)}" r="1.7" fill="${C.card}" stroke="${C.accent}" stroke-width="1.4" />`
                )
            )
          : []),
      ].join('')
    : '';

  const gridLines = options.grid
    ? [1, 2]
        .map((index) => {
          const lineY = chartTop + (plotHeight * index) / 3;
          return `<line x1="${chartLeft}" x2="${chartRight}" y1="${lineY.toFixed(1)}" y2="${lineY.toFixed(
            1
          )}" stroke="${C.text}" stroke-opacity="0.06" stroke-width="1" stroke-dasharray="2 6" />`;
        })
        .join('')
    : '';

  // --- setpoint reference line ---
  const setpointY =
    setpointValue !== null && tempScale ? tempScale(setpointValue) : null;
  const tempAt = (edge: 'left' | 'right'): number | null => {
    const run = temperatureRuns[0];
    if (!run || !run.length) return null;
    return valueOf(edge === 'left' ? run[0] : run[run.length - 1]);
  };
  const leftGap =
    setpointValue !== null && tempAt('left') !== null
      ? Math.abs((tempAt('left') as number) - setpointValue)
      : 0;
  const rightGap =
    setpointValue !== null && tempAt('right') !== null
      ? Math.abs((tempAt('right') as number) - setpointValue)
      : 0;
  const captionRight = rightGap >= leftGap;
  const setpointLine =
    setpointY !== null &&
    setpointY >= temperatureBandTop - 0.5 &&
    setpointY <= chartBottom + 0.5
      ? `<line x1="${chartLeft}" x2="${chartRight}" y1="${setpointY.toFixed(1)}" y2="${setpointY.toFixed(
          1
        )}" stroke="${C.accent}" stroke-opacity="0.42" stroke-width="1" stroke-dasharray="3 4" />
        <text x="${captionRight ? chartRight - 3 : chartLeft + 3}" y="${(setpointY - 5).toFixed(
          1
        )}" ${font(9, 500)} ${TRACKING(0.09, 9)} fill="${C.tertiary}" text-anchor="${
          captionRight ? 'end' : 'start'
        }">SOLL</text>`
      : '';

  /*
   * Quiet min/max marks, same rules as the web component: taken from the
   * *measured* series (not from the smoothed runs that are drawn), only when
   * there is room, and the minimum steps aside when both labels would collide.
   */
  const extremesOf = (series: ChartSample[] | undefined): { low: ChartSample; high: ChartSample } | null => {
    let low: ChartSample | null = null;
    let high: ChartSample | null = null;
    for (const sample of series ?? []) {
      if (sample.v === null) continue;
      if (!low || (low.v as number) > sample.v) low = sample;
      if (!high || (high.v as number) < sample.v) high = sample;
    }
    if (!low || !high || low.v === high.v) return null;
    return { low, high };
  };

  const extremeMarks = (
    series: ChartSample[] | undefined,
    scale: ((value: number) => number) | null,
    bandTop: number,
    bandBottom: number,
    color: string,
    decimals: number
  ): string => {
    if (!scale || bandBottom - bandTop < 18) return '';
    const extremes = extremesOf(series);
    if (!extremes) return '';
    const entries = [
      { sample: extremes.high, isMax: true },
      { sample: extremes.low, isMax: false },
    ].map(({ sample, isMax }) => {
      const cx = xScale(sample.t);
      const cy = scale(sample.v as number);
      // 9 px above (text bottom clear of the curve) or 15 px below; the dot sits
      // on a local extremum, so the curve drops away on both sides.
      const canAbove = cy - 11 >= bandTop;
      const canBelow = cy + 17 <= bandBottom;
      const above = canAbove ? cy - 9 : bandTop + 8;
      const below = canBelow ? cy + 15 : bandBottom - 1;
      let labelY = isMax ? (canAbove ? above : below) : canBelow ? below : above;
      if (setpointY !== null && Math.abs(labelY - setpointY) < 9) {
        const alternative = isMax ? below : above;
        if (Math.abs(alternative - setpointY) >= 9) labelY = alternative;
      }
      return { cx, cy, labelY, isMax, value: sample.v as number };
    });
    const tooClose = (a: { labelY: number; cx: number }, b: { labelY: number; cx: number }) =>
      Math.abs(a.labelY - b.labelY) < 9 && Math.abs(a.cx - b.cx) < 34;
    let keep = [...entries];
    if (keep.length === 2 && tooClose(keep[0], keep[1])) {
      for (const entry of keep) {
        entry.labelY = entry.isMax ? bandTop + 8 : bandBottom - 1;
      }
      if (tooClose(keep[0], keep[1])) keep = keep.filter((entry) => entry.isMax);
    }
    const captionX = captionRight ? chartRight - 3 : chartLeft + 3;
    return keep
      .map((entry) => {
        const text = entry.value.toFixed(decimals).replace('.', ',');
        const preferRight = entry.cx < (chartLeft + chartRight) / 2;
        let labelX = preferRight ? entry.cx + 6 : entry.cx - 6;
        let anchor = preferRight ? 'start' : 'end';
        if (anchor === 'start' && labelX + 26 > chartRight - 2) {
          labelX = entry.cx - 6;
          anchor = 'end';
        } else if (anchor === 'end' && labelX - 26 < chartLeft + 2) {
          labelX = entry.cx + 6;
          anchor = 'start';
        }
        const clashesAt = (x: number) =>
          setpointY !== null &&
          Math.abs(entry.labelY - (setpointY - 5)) < 9 &&
          Math.abs(x - captionX) < 40;
        if (clashesAt(labelX)) {
          const flipped = anchor === 'start' ? entry.cx - 6 : entry.cx + 6;
          if (!clashesAt(flipped)) {
            labelX = flipped;
            anchor = anchor === 'start' ? 'end' : 'start';
          }
        }
        const dot = `<circle cx="${entry.cx.toFixed(1)}" cy="${entry.cy.toFixed(
          1
        )}" r="1.8" fill="${C.card}" stroke="${color}" stroke-width="1.2" />`;
        if (clashesAt(labelX)) return dot;
        return `${dot}<text x="${labelX.toFixed(1)}" y="${entry.labelY.toFixed(
          1
        )}" ${font(9, 500)} ${TRACKING(0.02, 9)} fill="${C.text}" fill-opacity="0.55" stroke="${
          C.card
        }" stroke-width="1.4" paint-order="stroke" text-anchor="${anchor}">${text}</text>`;
      })
      .join('');
  };

  const temperatureExtremes = temperatureVisible
    ? extremeMarks(
        options.series,
        tempScale,
        temperatureBandTop,
        chartBottom,
        C.accent,
        1
      )
    : '';
  const humidityExtremes = humidityVisible
    ? extremeMarks(
        options.humiditySeries,
        humidityScale,
        chartTop,
        humidityBandBottom,
        C.secondary,
        0
      )
    : '';

  const axis = timeTicks(start, end, 3)
    .map((tick, index) => {
      const isLast = index === 2;
      const anchor = index === 0 ? 'start' : isLast ? 'end' : 'middle';
      const label = isLast ? 'Jetzt' : dayTime(tick);
      return `<text x="${labelScale(tick).toFixed(1)}" y="${axisBaseline}" ${font(
        TYPE.axis
      )} fill="${C.tertiary}" text-anchor="${anchor}">${label}</text>`;
    })
    .join('');

  const endDots = `${
    humidityScale && humidityRuns.length
      ? (() => {
          const run = humidityRuns[humidityRuns.length - 1];
          const last = run[run.length - 1];
          return `<circle cx="${xScale(last.t).toFixed(1)}" cy="${humidityScale(
            valueOf(last)
          ).toFixed(1)}" r="2.6" fill="${C.secondary}" stroke="${C.card}" stroke-width="1.4" />`;
        })()
      : ''
  }${
    tempScale && temperatureRuns.length
      ? (() => {
          const run = temperatureRuns[temperatureRuns.length - 1];
          const last = run[run.length - 1];
          const dotColor = bandGradient
            ? bandColorAt(valueOf(last), bandLimits, bandColors)
            : C.accent;
          return `<circle cx="${xScale(last.t).toFixed(1)}" cy="${tempScale(
            valueOf(last)
          ).toFixed(1)}" r="2.8" fill="${dotColor}" fill-opacity="${alpha}" stroke="${
            C.card
          }" stroke-width="1.4" />`;
        })()
      : ''
  }`;

  // --- readings: caption row with the colour dots, then one baseline row ---
  const temperatureLabel = `<g>
    <circle cx="${left + 3}" cy="${labelsY + 8}" r="3" fill="${C.accent}" />
    <text x="${left + 12}" y="${capBaseline(labelsY + 8, TYPE.label)}" ${font(
      TYPE.label,
      500
    )} ${TRACKING(0.09, TYPE.label)} fill="${C.muted}">TEMPERATUR</text>
  </g>`;

  const humidityLabelWidth = upperWidth('LUFTFEUCHTE', TYPE.label, 0.09);
  const humidityTextX = right;
  const humidityLabel = options.humidity
    ? `<g>
        <circle cx="${(humidityTextX - humidityLabelWidth - SPACE_2).toFixed(
          1
        )}" cy="${labelsY + 8}" r="3" fill="${C.secondary}" />
        <text x="${humidityTextX}" y="${capBaseline(labelsY + 8, TYPE.label)}" ${font(
          TYPE.label,
          500
        )} ${TRACKING(0.09, TYPE.label)} fill="${C.muted}" text-anchor="end">LUFTFEUCHTE</text>
      </g>`
    : '';

  const heroWidth = approxWidth(options.temperature, TYPE.hero);
  const hero = `<g>
    <text x="${left}" y="${heroBaseline}" ${font(TYPE.hero, 500)} ${TRACKING(
      -0.035,
      TYPE.hero
    )} fill="${C.text}">${escapeXml(options.temperature)}</text>
    <text x="${(left + heroWidth + 6).toFixed(1)}" y="${heroBaseline}" ${font(
      TYPE.hero * 0.34
    )} fill="${C.muted}">${escapeXml(options.unit)}</text>
  </g>`;

  const secondarySize = TYPE.secondary;
  const humidityUnitWidth = approxWidth('%', secondarySize * 0.5);
  const humidityValueWidth = approxWidth(options.humidity ?? '', secondarySize);
  const humidity = options.humidity
    ? `<g>
        <text x="${(right - humidityUnitWidth - 2).toFixed(1)}" y="${heroBaseline}" ${font(
          secondarySize,
          500
        )} ${TRACKING(-0.02, secondarySize)} fill="${
          C.text
        }" text-anchor="end">${escapeXml(options.humidity)}</text>
        <text x="${right}" y="${heroBaseline}" ${font(secondarySize * 0.5)} fill="${
          C.muted
        }" text-anchor="end">%</text>
      </g>`
    : '';

  // --- heating row ---
  const hvacColor = C[options.hvacKey ?? 'unknown'];
  const rowParts: string[] = [];
  let cursor = left;
  if (options.hvacState) {
    const icon = 14;
    rowParts.push(
      `<g transform="translate(${cursor},${(rowBaseline - 4.4 - icon).toFixed(1)}) scale(${(
        icon / 24
      ).toFixed(3)})">${flame(hvacColor)}</g>`
    );
    cursor += icon + SPACE_1;
    rowParts.push(
      `<text x="${cursor}" y="${rowBaseline}" ${font(TYPE.row, 400)} fill="${
        C.muted
      }">${escapeXml(options.hvacState)}</text>`
    );
    cursor += approxWidth(options.hvacState, TYPE.row) + SPACE_1 + 2;
  }
  if (options.setpoint) {
    rowParts.push(
      `<text x="${cursor}" y="${rowBaseline}" ${font(TYPE.row)} fill="${
        C.tertiary
      }">·</text>`
    );
    cursor += approxWidth('·', TYPE.row) + SPACE_1 + 2;
    rowParts.push(
      `<text x="${cursor}" y="${rowBaseline}" ${font(TYPE.row)} fill="${C.muted}">Soll ${escapeXml(
        options.setpoint
      )} °C</text>`
    );
  }

  const windowBadge =
    options.window
      ? badge(
          right - 28,
          headerY,
          options.window === 'open' ? C.windowOpen : C.muted,
          options.window === 'open',
          windowIcon[options.window],
          C
        )
      : '';

  const motionBadge =
    options.motion && options.motion !== 'none'
      ? badge(
          right - 28 - SPACE_1 - 28,
          headerY,
          options.motion === 'active' ? C.motion : C.muted,
          options.motion === 'active',
          motionIcon,
          C
        )
      : '';

  /*
   * Room icon: same box as the card (`--mdc-icon-size: 16px`). The paths do not
   * fill the whole 24 px viewBox, so a 16 px box renders ~13 px of glyph –
   * roughly the cap height of the title plus a pixel above and below.
   */
  const iconScale = ROOM_ICON / 24;
  const capHeight = 0.729 * TYPE.title;
  const titleBaseline = headerY + 19;
  const iconTop =
    titleBaseline - capHeight / 2 - (ROOM_ICON * (17 / 24)) / 2 - 4 * iconScale;
  const roomIcon = `<g transform="translate(${left.toFixed(1)},${iconTop.toFixed(
    1
  )}) scale(${iconScale})" fill="none" stroke="${C.tertiary}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${homeIcon}</g>`;

  const titleX = left + ROOM_ICON + SPACE_1;
  // Inline after the title: a second header line would break the 4 px rhythm.
  const titleWidth = approxWidth(options.name, TYPE.title);
  const quietLabel = options.quiet
    ? `<text x="${(titleX + titleWidth + SPACE_2 + 2).toFixed(1)}" y="${
        titleBaseline - 2
      }" ${font(TYPE.label)} fill="${C.tertiary}">${escapeXml(options.quiet)}</text>`
    : '';

  return `<g>
    <clipPath id="${options.cardId}-clip">
      <rect x="${x}" y="${y}" width="${cardW}" height="${CARD_H}" rx="${RADIUS}" />
    </clipPath>
    <defs>
      ${
        C.mode === 'light'
          ? `<linearGradient id="${options.cardId}-surface" gradientUnits="userSpaceOnUse" x1="${x}" y1="${y}" x2="${
              x + cardW
            }" y2="${y + CARD_H}">
        <stop offset="0" stop-color="#ffffff" />
        <stop offset="1" stop-color="#f7f8fa" />
      </linearGradient>`
          : `<radialGradient id="${options.cardId}-surface" cx="${x}" cy="${y}" r="${cardW * 1.2}" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.07" />
        <stop offset="0.55" stop-color="#ffffff" stop-opacity="0" />
      </radialGradient>`
      }
      <linearGradient id="${options.cardId}-area" gradientUnits="userSpaceOnUse" x1="0" y1="${temperatureBandTop}" x2="0" y2="${chartBottom}">
        ${
          bandGradient
            ? bandGradient
                .map(
                  (stop) =>
                    `<stop offset="${stop.offset}" stop-color="${stop.color}" stop-opacity="${(
                      0.22 *
                      Math.pow(1 - stop.offset, 1.45) *
                      area
                    ).toFixed(3)}" />`
                )
                .join('')
            : `<stop offset="0" stop-color="${C.accent}" stop-opacity="${Math.min(1, 0.22 * area).toFixed(3)}" />
        <stop offset="0.55" stop-color="${C.accent}" stop-opacity="${Math.min(1, 0.08 * area).toFixed(3)}" />
        <stop offset="1" stop-color="${C.accent}" stop-opacity="0" />`
        }
      </linearGradient>
      ${
        bandGradient
          ? `<linearGradient id="${options.cardId}-temp-stroke" gradientUnits="userSpaceOnUse" x1="0" y1="${temperatureBandTop}" x2="0" y2="${chartBottom}">
        ${bandGradient
          .map((stop) => `<stop offset="${stop.offset}" stop-color="${stop.color}" />`)
          .join('')}
      </linearGradient>`
          : ''
      }
      <linearGradient id="${options.cardId}-area-humidity" gradientUnits="userSpaceOnUse" x1="0" y1="${chartTop}" x2="0" y2="${humidityBandBottom}">
        <stop offset="0" stop-color="${C.secondary}" stop-opacity="${Math.min(1, 0.2 * area).toFixed(3)}" />
        <stop offset="0.6" stop-color="${C.secondary}" stop-opacity="${Math.min(1, 0.07 * area).toFixed(3)}" />
        <stop offset="1" stop-color="${C.secondary}" stop-opacity="0" />
      </linearGradient>
    </defs>
    <g clip-path="url(#${options.cardId}-clip)">
      <rect x="${x}" y="${y}" width="${cardW}" height="${CARD_H}" fill="${C.card}" />
      <rect x="${x}" y="${y}" width="${cardW}" height="${CARD_H}" fill="url(#${options.cardId}-surface)" />
    </g>
    <!-- 1 px hairline at 7 % white instead of a frame -->
    <rect x="${x + 0.5}" y="${y + 0.5}" width="${cardW - 1}" height="${
      CARD_H - 1
    }" rx="${RADIUS - 0.5}" fill="none" stroke="${C.hairline}" />

    <g clip-path="url(#${options.cardId}-clip)">
      ${roomIcon}
      <text x="${titleX.toFixed(1)}" y="${titleBaseline}" ${font(
        TYPE.title,
        500
      )} ${TRACKING(-0.012, TYPE.title)} fill="${C.muted}">${escapeXml(options.name)}</text>
      ${quietLabel}
      ${temperatureLabel}
      ${humidityLabel}
      ${hero}
      ${humidity}
      <g>${rowParts.join('')}</g>

      ${gridLines}
      ${temperatureArea ? `<path d="${temperatureArea}" fill="url(#${options.cardId}-area)" />` : ''}
      ${humidityArea ? `<path d="${humidityArea}" fill="url(#${options.cardId}-area-humidity)" />` : ''}
      ${/* The reference line sits above the fills but below the curves – same order as the card. */ ''}
      ${setpointLine}
      ${humidityLines}
      ${temperatureLines}
      ${dots}
      <line x1="${chartLeft}" x2="${chartRight}" y1="${chartBottom}" y2="${chartBottom}" stroke="${
        C.text
      }" stroke-opacity="0.1" />
      ${endDots}
      ${humidityExtremes}
      ${temperatureExtremes}
      ${axis}
    </g>
    ${motionBadge}
    ${windowBadge}
  </g>`;
}

function samples(
  base: number,
  amplitude: number,
  periodHours: number,
  gap?: { from: number; to: number }
): ChartSample[] {
  const end = Date.now();
  const start = end - 6 * 3600 * 1000;
  const step = 5 * 60 * 1000;
  const result: ChartSample[] = [];
  let index = 0;
  for (let time = start; time <= end; time += step) {
    const hours = (time - start) / 3600000;
    // A little jitter, exactly like a real sensor – removed by the moving average.
    const jitter = Math.sin(index * 1.7) * 0.12 + Math.sin(index * 0.37) * 0.08;
    index += 1;
    if (gap) {
      const hoursToEnd = (end - time) / 3600000;
      if (hoursToEnd < gap.from && hoursToEnd > gap.to) continue;
    }
    result.push({
      t: time,
      v: Number((base + amplitude * Math.sin((hours / periodHours) * Math.PI * 2) + jitter).toFixed(2)),
    });
  }
  return result;
}

/* --------------------------------------------------------------- content -- */

/** One card of the preview, without position or palette (filled in later). */
type CardSpec = Omit<CardOptions, 'x' | 'y' | 'palette' | 'cardId'>;

function cardSpecs(): CardSpec[] {
  return [
    {
      name: 'Wohnzimmer',
      temperature: '21,8',
      unit: '°C',
      humidity: '50',
      window: 'closed',
      motion: 'active',
      hvacState: 'Heizt',
      hvacKey: 'heating',
      setpoint: '22,0',
      series: samples(22, 0.6, 5),
      humiditySeries: samples(50, 5, 7),
    },
    {
      name: 'Küche',
      temperature: '22,6',
      unit: '°C',
      humidity: '64',
      humidityDotted: true,
      window: 'open',
      motion: 'idle',
      quiet: 'Ruhe seit 12 Min.',
      // `show_hvac_mode: true` – the mode replaces the action word.
      hvacState: 'Automatik',
      hvacKey: 'idle',
      setpoint: '21,5',
      series: samples(22.6, 0.5, 4),
      humiditySeries: samples(64, 3, 6),
      points: true,
    },
    {
      name: 'Bad (1. OG)',
      temperature: '25,8',
      unit: '°C',
      humidity: '70',
      window: 'open',
      motion: 'idle',
      quiet: 'Ruhe seit 46 Min.',
      hvacState: 'Aus',
      hvacKey: 'off',
      setpoint: '21,0',
      series: samples(25.4, 0.9, 3.5, { from: 2.2, to: 1.4 }),
      humiditySeries: samples(68, 7, 2.5),
      grid: true,
    },
    {
      name: 'Arbeitszimmer',
      temperature: '18,6',
      unit: '°C',
      humidity: '44',
      window: 'closed',
      hvacState: 'Status unbekannt',
      hvacKey: 'unknown',
      series: samples(18.7, 0.6, 6),
      humiditySeries: samples(44, 2, 5),
    },
  ];
}

function placeCards(specs: CardSpec[], palette: Palette, width = CARD_W): CardOptions[] {
  return specs.map((spec, index) => ({
    ...spec,
    palette,
    width,
    cardId: `card-${palette.mode}-${index + 1}`,
    x: PAD + (index % 2) * (width + GAP),
    y: 104 + Math.floor(index / 2) * (CARD_H + GAP),
  }));
}

export interface ShowcaseOptions {
  palette: Palette;
  specs: CardSpec[];
  title: string;
  subtitle: string;
  /** Small pill in the top right corner. */
  pill: string;
  note: string;
}

export function renderShowcase(options: ShowcaseOptions): string {
  const { palette, specs } = options;
  const cards = placeCards(specs, palette);
  const rows = Math.max(1, Math.ceil(specs.length / 2));
  const H = 104 + CARD_H * rows + GAP * (rows - 1) + 40;
  const cardMarkup = cards.map(renderCard).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Room Climate Card – Vorschau mit Demo-Daten">
  <rect width="${W}" height="${H}" fill="${palette.page}" />
  <text x="${PAD}" y="46" ${font(22, 700)} fill="${palette.text}">${escapeXml(options.title)}</text>
  <text x="${PAD}" y="68" ${font(11)} fill="${palette.muted}">${escapeXml(options.subtitle)}</text>
  <g transform="translate(${W - PAD - 176},30)">
    <rect width="176" height="26" rx="13" fill="rgba(251,191,36,0.12)" stroke="rgba(251,191,36,0.45)" />
    <text x="88" y="17" ${font(9.5, 700)} fill="#fbbf24" text-anchor="middle">${escapeXml(options.pill)}</text>
  </g>
  ${cardMarkup}
  <text x="${PAD}" y="${H - 12}" ${font(9.5)} fill="${palette.tertiary}">${escapeXml(options.note)}</text>
</svg>
`;
}

/* ----------------------------------------------------------------- editor --
 * The editor image is a *drawing* of the panel, not a browser screenshot: the
 * labels are read from the same wording as `src/editor/room-climate-editor.ts`,
 * the fields are stylised Material filled inputs. Real screenshots replace it
 * the moment someone runs Home Assistant in a browser.
 * ------------------------------------------------------------------------ */

const EDITOR = {
  page: '#07080a',
  panel: '#16181d',
  border: 'rgba(255,255,255,0.10)',
  field: 'rgba(255,255,255,0.055)',
  fieldBorder: 'rgba(255,255,255,0.09)',
  text: 'rgba(255,255,255,0.92)',
  muted: 'rgba(255,255,255,0.55)',
  faint: 'rgba(255,255,255,0.34)',
  switchOn: '#2196f3',
  switchOff: 'rgba(255,255,255,0.22)',
  helper: 'rgba(255,255,255,0.42)',
};

interface EditorField {
  label: string;
  value?: string;
  kind?: 'text' | 'select' | 'number' | 'switch' | 'color' | 'slider';
  on?: boolean;
  disabled?: boolean;
  helper?: string;
  unit?: string;
  swatch?: string;
  /** Position of the handle for `kind: 'slider'`, 0…1. */
  ratio?: number;
}

interface EditorSection {
  title: string;
  open: boolean;
  fields?: EditorField[];
  hint?: string;
}

function wrapText(text: string, maxWidth: number, size: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (line && approxWidth(next, size) > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function editorField(field: EditorField, y: number, width: number, opacity = 1): {
  svg: string;
  height: number;
} {
  const grouped = `<g opacity="${opacity}">`;
  if (field.kind === 'switch') {
    const track = 36;
    const knob = 16;
    const lines = wrapText(field.label, width - track - 16, 12.5);
    const svg = `${grouped}
    ${lines
      .map(
        (line, index) =>
          `<text x="0" y="${19 + index * 16}" ${font(12.5)} fill="${EDITOR.muted}">${escapeXml(
            line
          )}</text>`
      )
      .join('')}
    <rect x="${width - track}" y="6" width="${track}" height="20" rx="10" fill="${
      field.on ? EDITOR.switchOn : EDITOR.switchOff
    }" />
    <circle cx="${width - track + (field.on ? track - 10 : 10)}" cy="16" r="${knob / 2}" fill="${
      field.on ? '#ffffff' : 'rgba(255,255,255,0.75)'
    }" />
  </g>`;
    return { svg, height: 26 + lines.length * 16 };
  }

  if (field.kind === 'slider') {
    const labelLines = wrapText(field.label, width, 12.5);
    const ratio = Math.min(1, Math.max(0, field.ratio ?? 1));
    const trackWidth = width - 52;
    const trackX = 0;
    const trackY = 23 + labelLines.length * 16;
    const knobX = trackX + trackWidth * ratio;
    const svg = `${grouped}
    ${labelLines
      .map(
        (line, index) =>
          `<text x="0" y="${19 + index * 16}" ${font(12.5)} fill="${EDITOR.muted}">${escapeXml(
            line
          )}</text>`
      )
      .join('')}
    <rect x="${trackX}" y="${trackY}" width="${trackWidth}" height="4" rx="2" fill="${
      EDITOR.switchOff
    }" />
    <rect x="${trackX}" y="${trackY}" width="${trackWidth * ratio}" height="4" rx="2" fill="${
      EDITOR.switchOn
    }" />
    <circle cx="${knobX}" cy="${trackY + 2}" r="7" fill="${EDITOR.switchOn}" stroke="#ffffff" stroke-width="1.5" />
    <text x="${width}" y="${trackY + 7}" ${font(11)} fill="${EDITOR.faint}" text-anchor="end">${escapeXml(
      field.unit ?? ''
    )}</text>
  </g>`;
    const helperLines = field.helper ? wrapText(field.helper, width - 4, 10.5) : [];
    const helper = helperLines
      .map(
        (line, index) =>
          `<text x="1" y="${trackY + 26 + index * 13}" ${font(10.5)} fill="${
            EDITOR.helper
          }">${escapeXml(line)}</text>`
      )
      .join('');
    return {
      svg: `${svg}${helper}`,
      height: trackY + 30 + helperLines.length * 13,
    };
  }

  const boxH = 38;
  const inner = `${grouped}
    <text x="0" y="12" ${font(11)} fill="${EDITOR.helper}">${escapeXml(field.label)}</text>
    <rect x="0" y="19" width="${width}" height="${boxH}" rx="8" fill="${EDITOR.field}" stroke="${EDITOR.fieldBorder}" />
  `;
  let content = '';
  if (field.kind === 'color') {
    content = `<circle cx="22" cy="${19 + boxH / 2}" r="8" fill="${field.swatch ?? '#4FD1A5'}" />
      <text x="40" y="${19 + boxH / 2 + 4.5}" ${font(12.5)} fill="${EDITOR.muted}">${escapeXml(
        field.value ?? ''
      )}</text>`;
  } else {
    content = `<text x="14" y="${19 + boxH / 2 + 4.5}" ${font(12.5)} fill="${EDITOR.muted}">${escapeXml(
      field.value ?? ''
    )}</text>`;
    if (field.kind === 'select') {
      content += `<path d="M${width - 24} ${19 + boxH / 2 - 2.5} l4.5 5 4.5 -5" fill="none" stroke="${
        EDITOR.muted
      }" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />`;
    }
    if (field.unit) {
      content += `<text x="${width - 14}" y="${19 + boxH / 2 + 4.5}" ${font(11)} fill="${
        EDITOR.faint
      }" text-anchor="end">${escapeXml(field.unit)}</text>`;
    }
  }
  let extra = '';
  let height = 19 + boxH;
  if (field.helper) {
    const lines = wrapText(field.helper, width - 4, 10.5);
    extra = lines
      .map(
        (line, index) =>
          `<text x="1" y="${height + 14 + index * 13}" ${font(10.5)} fill="${EDITOR.helper}">${escapeXml(
            line
          )}</text>`
      )
      .join('');
    height += 6 + lines.length * 13;
  }
  return { svg: `${inner}${content}${extra}</g>`, height: height + 10 };
}

function editorSection(section: EditorSection, y: number, width: number): {
  svg: string;
  height: number;
} {
  const headerH = 40;
  let inner = '';
  let cursor = 4;
  if (section.open) {
    if (section.hint) {
      const lines = wrapText(section.hint, width - 8, 11);
      inner += lines
        .map(
          (line, index) =>
            `<text x="0" y="${cursor + 11 + index * 13}" ${font(11)} fill="${EDITOR.helper}">${escapeXml(
              line
            )}</text>`
        )
        .join('');
      cursor += lines.length * 13 + 8;
    }
    for (const field of section.fields ?? []) {
      const rendered = editorField(field, cursor, width, field.disabled ? 0.5 : 1);
      inner += `<g transform="translate(0,${cursor})">${rendered.svg}</g>`;
      cursor += rendered.height;
    }
  }
  const height = section.open ? headerH + cursor + 8 : headerH;
  const chevronY = 16;
  return {
    svg: `<g transform="translate(0,${y})">
    <rect x="0" y="0" width="${width + 28}" height="${height}" rx="12" fill="${EDITOR.panel}" stroke="${EDITOR.border}" />
    <text x="14" y="26" ${font(14, 600)} fill="${EDITOR.text}">${escapeXml(section.title)}</text>
    <path d="M${width + 28 - 24} ${chevronY + (section.open ? 3 : -2)} l4.5 ${
      section.open ? -5 : 5
    } 4.5 ${section.open ? 5 : -5}" fill="none" stroke="${EDITOR.faint}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    <g transform="translate(14,${headerH})">${inner}</g>
  </g>`,
    height,
  };
}

export function renderEditor(palette: Palette): string {
  const WIDTH = 1000;
  const PANEL_X = 24;
  const PANEL_W = 500;
  const FIELD_W = PANEL_W - 28;
  const PREVIEW_X = PANEL_X + PANEL_W + 28;
  const PREVIEW_W = WIDTH - PREVIEW_X - 24;

  const sections: EditorSection[] = [
    { title: 'Allgemein', open: false },
    { title: 'Sensoren', open: false },
    { title: 'Messwerte (Schrift)', open: false },
    { title: 'Farben', open: false },
    { title: 'Fenster', open: false },
    { title: 'Bewegung', open: false },
    { title: 'Thermostat', open: false },
    {
      // The section this release is about: opacity and the colour bands.
      title: 'Verlauf',
      open: true,
      fields: [
        { label: 'Temperaturverlauf anzeigen', kind: 'switch', on: true },
        { label: 'Luftfeuchteverlauf anzeigen', kind: 'switch', on: true },
        { label: 'Zeitraum', value: '6 h', kind: 'select' },
        { label: 'Chart-Höhe', value: '112', unit: 'px', kind: 'number' },
        { label: 'Kurvenverlauf', value: 'Geglättet', kind: 'select' },
        { label: 'Glättung der Kurven', value: 'Leicht (Standard)', kind: 'select' },
        { label: 'Farbverlauf unter der Temperaturkurve', kind: 'switch', on: true },
        { label: 'Farbverlauf unter der Feuchtekurve', kind: 'switch', on: true },
        {
          label: 'Stärke des Flächenverlaufs (Temperatur)',
          value: '180',
          unit: '%',
          kind: 'number',
          helper:
            '100 % ist der eingebaute Verlauf. Höhere Werte machen die Fläche unter der Kurve kräftiger (bis 300 %).',
        },
        { label: 'Stärke des Flächenverlaufs (Luftfeuchte)', value: '100', unit: '%', kind: 'number' },
        {
          label: 'Deckkraft der Kurven',
          value: '85',
          unit: '%',
          kind: 'number',
          helper:
            'Gilt für Linien, Flächen und Datenpunkte. 100 % ist die volle Darstellung.',
        },
        {
          label: 'Temperaturkurve nach Bereich einfärben (kalt / normal / warm / heiß)',
          kind: 'switch',
          on: true,
          helper:
            'Blau unter „kalt“, Mint im Normalbereich, Amber ab „warm“, das gedämpfte Rot ab „heiß“ – fließend, ohne harte Kanten.',
        },
        { label: 'Kalt unter', value: '18', unit: '°C', kind: 'number' },
        { label: 'Warm ab', value: '24', unit: '°C', kind: 'number' },
        { label: 'Heiß ab', value: '27', unit: '°C', kind: 'number' },
        {
          label: 'Übergang zwischen den Bereichen',
          kind: 'slider',
          ratio: 1,
          unit: '100 %',
          helper:
            '0 % = harte Stufen, 100 % = die Farbe fließt über den ganzen Abstand zwischen zwei Grenzen.',
        },
        { label: 'Linienart Luftfeuchte', value: 'Durchgezogen', kind: 'select' },
        { label: 'Datenlücken', value: 'Kurze Ausfälle überbrücken', kind: 'select' },
        {
          label: 'Soll-Linie im Verlauf',
          kind: 'switch',
          on: true,
          helper: 'Gestrichelte Referenz auf die Solltemperatur samt Beschriftung.',
        },
        {
          label: 'Zeitangaben unter dem Verlauf',
          kind: 'switch',
          on: true,
          helper:
            'Die unterste Zeile mit Startzeit, Mitte und „Jetzt“. Ohne sie gehört der Platz den Kurven.',
        },
        { label: 'Datenpunkte', kind: 'switch', on: false },
        { label: 'Werte beim Überfahren', kind: 'switch', on: true },
        { label: 'Minimum/Maximum im Chart anzeigen', kind: 'switch', on: true },
      ],
    },
  ];

  let y = 96;
  let panelSvg = '';
  for (const section of sections) {
    const rendered = editorSection(section, y, FIELD_W);
    panelSvg += rendered.svg;
    y += rendered.height + 8;
  }
  const panelH = y - 96;

  const previewCard = renderCard({
    ...cardSpecs()[0],
    palette,
    width: PREVIEW_W,
    cardId: 'editor-card',
    x: PREVIEW_X,
    y: 148,
  });

  const H = Math.max(panelH + 96 + 46, 148 + CARD_H + 96);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${H}" viewBox="0 0 ${WIDTH} ${H}" role="img" aria-label="Room Climate Card – visueller Editor, Nachbau mit Demo-Werten">
  <rect width="${WIDTH}" height="${H}" fill="${EDITOR.page}" />
  <text x="${PANEL_X}" y="46" ${font(22, 700)} fill="${EDITOR.text}">Visueller Editor</text>
  <text x="${PANEL_X}" y="68" ${font(11)} fill="${EDITOR.muted}">Acht Abschnitte, native Home-Assistant-Selektoren, Live-Vorschau – hier der Abschnitt „Verlauf“</text>
  <g transform="translate(${PANEL_X},0)">${panelSvg}</g>

  <text x="${PREVIEW_X}" y="108" ${font(9.5, 700)} ${TRACKING(0.09, 9.5)} fill="${
    EDITOR.faint
  }">LIVE-VORSCHAU</text>
  ${previewCard}
  ${wrapText(
    'Die Vorschau reagiert sofort auf jede Änderung – hier steht die echte Karte.',
    PREVIEW_W,
    10.5
  )
    .map(
      (line, index) =>
        `<text x="${PREVIEW_X}" y="${148 + CARD_H + 24 + index * 14}" ${font(10.5)} fill="${
          EDITOR.helper
        }">${escapeXml(line)}</text>`
    )
    .join('')}
  ${[
    'Jede Änderung landet sofort in der Vorschau.',
    'Nicht benötigte Felder werden automatisch deaktiviert.',
    'Leere Zahlenfelder springen nicht auf den Standardwert zurück.',
    'Unbekannte YAML-Schlüssel bleiben erhalten.',
  ]
    .map(
      (line, index) =>
        `<g transform="translate(${PREVIEW_X},${148 + CARD_H + 62 + index * 20})">
      <circle cx="3" cy="-3.5" r="2" fill="${palette.accent}" />
      <text x="12" y="0" ${font(10.5)} fill="${EDITOR.muted}">${escapeXml(line)}</text>
    </g>`
    )
    .join('')}
  <text x="${PANEL_X}" y="${H - 14}" ${font(9.5)} fill="${EDITOR.faint}">Nachbau der Editor-Oberfläche mit den echten Beschriftungen der Karte; die Formularelemente sind stilisiert, keine Live-Daten.</text>
</svg>
`;
}

/* -------------------------------------------------------------------- CLI -- */

const mode = process.argv[2] ?? 'dark';

if (mode === 'light') {
  process.stdout.write(
    renderShowcase({
      palette: LIGHT,
      specs: cardSpecs().slice(0, 2),
      title: 'Room Climate Card',
      subtitle: 'Helle Darstellung – Temperatur · Luftfeuchte · Fenster · Bewegung · Heizstatus · Verlauf',
      pill: 'HELL · DEMO-DATEN',
      note: 'Design-Vorschau, gerendert aus dem Chart-Modul der Karte mit simulierten Messwerten – keine Live-Daten.',
    })
  );
} else if (mode === 'bands') {
  // Cold morning → warm midday → hot afternoon, so all four stages appear.
  const day = samples(22.5, 5.4, 6);
  process.stdout.write(
    renderShowcase({
      palette: DARK,
      specs: [
        {
          name: 'Wohnzimmer',
          temperature: '21,8',
          unit: '°C',
          humidity: '50',
          window: 'closed',
          motion: 'active',
          hvacState: 'Heizt',
          hvacKey: 'heating',
          // No target on this preview: the picture is about the band colours,
          // and a reference line would only add another caption to dodge.
          series: day,
          humiditySeries: samples(50, 5, 7),
          bands: true,
        },
        {
          name: 'Arbeitszimmer',
          temperature: '19,4',
          unit: '°C',
          humidity: '44',
          window: 'closed',
          hvacState: 'Bereit',
          hvacKey: 'idle',
          series: samples(21, 6, 6),
          humiditySeries: samples(44, 3, 5),
          bands: true,
          opacity: 0.55,
          areaStrength: 2.4,
        },
      ],
      title: 'Farbbereiche & Deckkraft',
      subtitle:
        'Temperaturkurve nach Bereich eingefärbt – links Standard, rechts mit 55 % Deckkraft und kräftigerem Flächenverlauf',
      pill: 'FARBBEREICHE · DEMO',
      note: 'Blau = kalt, Mint = normal, Amber = warm, Rot = heiß. Die Übergänge sind fließend; die Grenzen liegen bei 18 / 24 / 27 °C und sind einstellbar.',
    })
  );
} else if (mode === 'editor') {
  process.stdout.write(renderEditor(DARK));
} else {
  process.stdout.write(
    renderShowcase({
      palette: DARK,
      specs: cardSpecs(),
      title: 'Room Climate Card',
      subtitle: 'Temperatur · Luftfeuchte · Fenster · Bewegung · Heizstatus · Verlauf',
      pill: 'VORSCHAU · DEMO-DATEN',
      note: 'Design-Vorschau, gerendert aus dem Chart-Modul der Karte mit simulierten Messwerten – keine Live-Daten.',
    })
  );
}
