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
  movingAverage,
  padDomain,
  projectRun,
  seriesPath,
  smoothingWindow,
  timeTicks,
  type ChartSample,
  type Point,
} from '../src/chart/geometry';

const W = 1000;
const PAD = 24;
const GAP = 20;
const CARD_W = (W - PAD * 2 - GAP) / 2;

/* ---------------------------------------------------------------- tokens --
 * Mirrors the CSS custom properties of the card one to one.
 * ------------------------------------------------------------------------ */
const INSET = 20; // card padding
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

const COLORS = {
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

interface CardOptions {
  x: number;
  y: number;
  name: string;
  temperature: string;
  unit: string;
  humidity?: string;
  /** Series switched off with a click – shown dimmed in the preview. */
  hidden?: Array<'temperature' | 'humidity'>;
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

const motionIcon =
  '<circle cx="13" cy="4.4" r="1.9" /><path d="M10 21l2.6-5.6 3 1.9 2.2-4.6" /><path d="M7.4 13.4l3.4-2.7.9-3.4-3-1-2.8 3.6" />';

function badge(x: number, y: number, color: string, active: boolean, body: string): string {
  return `<g transform="translate(${x},${y})">
    <rect x="0" y="0" width="28" height="28" rx="10" fill="${
      active ? `${color}24` : 'rgba(148,163,184,0.10)'
    }" stroke="${active ? `${color}59` : COLORS.hairline}" stroke-width="1" />
    <g transform="translate(6.5,6.5)" fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <g transform="scale(0.625)">${body}</g>
    </g>
  </g>`;
}

function renderCard(options: CardOptions): string {
  const { x, y } = options;
  const left = x + INSET;
  const right = x + CARD_W - INSET;
  const hidden = options.hidden ?? [];

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
  const xScale = linearScale([start, end], [left, right]);

  // --- geometry: humidity owns the upper third, temperature the lower half ---
  const plotHeight = chartBottom - chartTop;
  const humidityBandBottom = chartTop + plotHeight * 0.3;
  const temperatureBandTop = chartTop + plotHeight * 0.44;

  const temperatureVisible = !hidden.includes('temperature');
  const humidityVisible = !hidden.includes('humidity') && Boolean(options.humiditySeries);

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
          { minSpan: 0.8, padding: 0.18 }
        )
      : null;
  const humidityExtent = extentOf(options.humiditySeries);
  const humidityDomain =
    humidityExtent && humidityVisible
      ? padDomain(humidityExtent[0], humidityExtent[1], { minSpan: 6, padding: 0.2 })
      : null;

  const tempScale = tempDomain
    ? linearScale(tempDomain, [chartBottom, temperatureBandTop])
    : null;
  const humidityScale = humidityDomain
    ? linearScale(humidityDomain, [humidityBandBottom, chartTop])
    : null;

  const segmentOptions = { rangeMs, start, end, gapMode: 'connect' as const, maxGapMs: 120 * 60 * 1000 };
  const smooth = true;
  const runsOf = (series?: ChartSample[]) =>
    series
      ? buildSegments(series, segmentOptions).map((segment) =>
          movingAverage(segment.samples, smoothingWindow(segment.samples.length))
        )
      : [];

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
            COLORS.accent
          }" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" />`;
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
            COLORS.secondary
          }" stroke-width="${options.humidityDotted ? 2.2 : 1.9}" stroke-linecap="round" stroke-linejoin="round"${dash} />`;
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
                    ).toFixed(1)}" r="1.7" fill="${COLORS.card}" stroke="${COLORS.accent}" stroke-width="1.4" />`
                )
            )
          : []),
      ].join('')
    : '';

  const gridLines = options.grid
    ? [1, 2]
        .map((index) => {
          const lineY = chartTop + (plotHeight * index) / 3;
          return `<line x1="${left}" x2="${right}" y1="${lineY.toFixed(1)}" y2="${lineY.toFixed(
            1
          )}" stroke="${COLORS.text}" stroke-opacity="0.06" stroke-width="1" stroke-dasharray="2 6" />`;
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
      ? `<line x1="${left}" x2="${right}" y1="${setpointY.toFixed(1)}" y2="${setpointY.toFixed(
          1
        )}" stroke="${COLORS.accent}" stroke-opacity="0.42" stroke-width="1" stroke-dasharray="3 4" />
        <text x="${captionRight ? right : left}" y="${(setpointY - 5).toFixed(
          1
        )}" ${font(9, 500)} ${TRACKING(0.09, 9)} fill="${COLORS.tertiary}" text-anchor="${
          captionRight ? 'end' : 'start'
        }">SOLL</text>`
      : '';

  const axis = timeTicks(start, end, 3)
    .map((tick, index) => {
      const isLast = index === 2;
      const anchor = index === 0 ? 'start' : isLast ? 'end' : 'middle';
      const label = isLast ? 'Jetzt' : dayTime(tick);
      return `<text x="${xScale(tick).toFixed(1)}" y="${axisBaseline}" ${font(
        TYPE.axis
      )} fill="${COLORS.tertiary}" text-anchor="${anchor}">${label}</text>`;
    })
    .join('');

  const endDots = `${
    humidityScale && humidityRuns.length
      ? (() => {
          const run = humidityRuns[humidityRuns.length - 1];
          const last = run[run.length - 1];
          return `<circle cx="${xScale(last.t).toFixed(1)}" cy="${humidityScale(
            valueOf(last)
          ).toFixed(1)}" r="2.6" fill="${COLORS.secondary}" stroke="${COLORS.card}" stroke-width="1.4" />`;
        })()
      : ''
  }${
    tempScale && temperatureRuns.length
      ? (() => {
          const run = temperatureRuns[temperatureRuns.length - 1];
          const last = run[run.length - 1];
          return `<circle cx="${xScale(last.t).toFixed(1)}" cy="${tempScale(
            valueOf(last)
          ).toFixed(1)}" r="2.8" fill="${COLORS.accent}" stroke="${COLORS.card}" stroke-width="1.4" />`;
        })()
      : ''
  }`;

  // --- readings: caption row with the colour dots, then one baseline row ---
  const temperatureDim = hidden.includes('temperature');
  const humidityDim = hidden.includes('humidity');
  const labelColor = (dimmed: boolean) => (dimmed ? COLORS.tertiary : COLORS.muted);

  const temperatureLabel = `<g opacity="${temperatureDim ? 0.45 : 1}">
    <circle cx="${left + 3}" cy="${labelsY + 8}" r="3" fill="${COLORS.accent}" />
    <text x="${left + 12}" y="${capBaseline(labelsY + 8, TYPE.label)}" ${font(
      TYPE.label,
      500
    )} ${TRACKING(0.09, TYPE.label)} fill="${labelColor(temperatureDim)}">TEMPERATUR</text>
  </g>`;

  const humidityLabelWidth = upperWidth('LUFTFEUCHTE', TYPE.label, 0.09);
  const humidityTextX = right;
  const humidityLabel = options.humidity
    ? `<g opacity="${humidityDim ? 0.45 : 1}">
        <circle cx="${(humidityTextX - humidityLabelWidth - SPACE_2).toFixed(
          1
        )}" cy="${labelsY + 8}" r="3" fill="${COLORS.secondary}" />
        <text x="${humidityTextX}" y="${capBaseline(labelsY + 8, TYPE.label)}" ${font(
          TYPE.label,
          500
        )} ${TRACKING(0.09, TYPE.label)} fill="${labelColor(
          humidityDim
        )}" text-anchor="end">LUFTFEUCHTE</text>
      </g>`
    : '';

  const heroWidth = approxWidth(options.temperature, TYPE.hero);
  const hero = `<g opacity="${temperatureDim ? 0.45 : 1}">
    <text x="${left}" y="${heroBaseline}" ${font(TYPE.hero, 500)} ${TRACKING(
      -0.035,
      TYPE.hero
    )} fill="${temperatureDim ? COLORS.tertiary : COLORS.text}">${escapeXml(options.temperature)}</text>
    <text x="${(left + heroWidth + 6).toFixed(1)}" y="${heroBaseline}" ${font(
      TYPE.hero * 0.34
    )} fill="${COLORS.muted}">${escapeXml(options.unit)}</text>
  </g>`;

  const secondarySize = TYPE.secondary;
  const humidityUnitWidth = approxWidth('%', secondarySize * 0.5);
  const humidityValueWidth = approxWidth(options.humidity ?? '', secondarySize);
  const humidity = options.humidity
    ? `<g opacity="${humidityDim ? 0.45 : 1}">
        <text x="${(right - humidityUnitWidth - 2).toFixed(1)}" y="${heroBaseline}" ${font(
          secondarySize,
          500
        )} ${TRACKING(-0.02, secondarySize)} fill="${
          humidityDim ? COLORS.tertiary : COLORS.text
        }" text-anchor="end">${escapeXml(options.humidity)}</text>
        <text x="${right}" y="${heroBaseline}" ${font(secondarySize * 0.5)} fill="${
          COLORS.muted
        }" text-anchor="end">%</text>
      </g>`
    : '';

  // --- heating row ---
  const hvacColor = COLORS[options.hvacKey ?? 'unknown'];
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
        COLORS.muted
      }">${escapeXml(options.hvacState)}</text>`
    );
    cursor += approxWidth(options.hvacState, TYPE.row) + SPACE_1 + 2;
  }
  if (options.setpoint) {
    rowParts.push(
      `<text x="${cursor}" y="${rowBaseline}" ${font(TYPE.row)} fill="${
        COLORS.tertiary
      }">·</text>`
    );
    cursor += approxWidth('·', TYPE.row) + SPACE_1 + 2;
    rowParts.push(
      `<text x="${cursor}" y="${rowBaseline}" ${font(TYPE.row)} fill="${COLORS.muted}">Soll ${escapeXml(
        options.setpoint
      )} °C</text>`
    );
  }

  const windowBadge =
    options.window
      ? badge(
          right - 28,
          headerY,
          options.window === 'open' ? COLORS.windowOpen : COLORS.muted,
          options.window === 'open',
          windowIcon[options.window]
        )
      : '';

  const motionBadge =
    options.motion && options.motion !== 'none'
      ? badge(
          right - 28 - SPACE_1 - 28,
          headerY,
          options.motion === 'active' ? COLORS.motion : COLORS.muted,
          options.motion === 'active',
          motionIcon
        )
      : '';

  // Inline after the title: a second header line would break the 4 px rhythm.
  const titleWidth = approxWidth(options.name, TYPE.title);
  const quietLabel = options.quiet
    ? `<text x="${(left + titleWidth + SPACE_2 + 2).toFixed(1)}" y="${
        headerY + 19 - 2
      }" ${font(TYPE.label)} fill="${COLORS.tertiary}">${escapeXml(options.quiet)}</text>`
    : '';

  return `<g>
    <clipPath id="${options.cardId}-clip">
      <rect x="${x}" y="${y}" width="${CARD_W}" height="${CARD_H}" rx="${RADIUS}" />
    </clipPath>
    <defs>
      <radialGradient id="${options.cardId}-light" cx="${x}" cy="${y}" r="${CARD_W * 1.2}" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.07" />
        <stop offset="0.55" stop-color="#ffffff" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="${options.cardId}-area" gradientUnits="userSpaceOnUse" x1="0" y1="${temperatureBandTop}" x2="0" y2="${chartBottom}">
        <stop offset="0" stop-color="${COLORS.accent}" stop-opacity="0.22" />
        <stop offset="0.55" stop-color="${COLORS.accent}" stop-opacity="0.08" />
        <stop offset="1" stop-color="${COLORS.accent}" stop-opacity="0" />
      </linearGradient>
      <linearGradient id="${options.cardId}-area-humidity" gradientUnits="userSpaceOnUse" x1="0" y1="${chartTop}" x2="0" y2="${humidityBandBottom}">
        <stop offset="0" stop-color="${COLORS.secondary}" stop-opacity="0.2" />
        <stop offset="0.6" stop-color="${COLORS.secondary}" stop-opacity="0.07" />
        <stop offset="1" stop-color="${COLORS.secondary}" stop-opacity="0" />
      </linearGradient>
    </defs>
    <g clip-path="url(#${options.cardId}-clip)">
      <rect x="${x}" y="${y}" width="${CARD_W}" height="${CARD_H}" fill="${COLORS.card}" />
      <rect x="${x}" y="${y}" width="${CARD_W}" height="${CARD_H}" fill="url(#${options.cardId}-light)" />
    </g>
    <!-- 1 px hairline at 7 % white instead of a frame -->
    <rect x="${x + 0.5}" y="${y + 0.5}" width="${CARD_W - 1}" height="${
      CARD_H - 1
    }" rx="${RADIUS - 0.5}" fill="none" stroke="${COLORS.hairline}" />

    <g clip-path="url(#${options.cardId}-clip)">
      <text x="${left}" y="${headerY + 19}" ${font(TYPE.title, 500)} ${TRACKING(
        -0.012,
        TYPE.title
      )} fill="${COLORS.text}">${escapeXml(options.name)}</text>
      ${quietLabel}
      ${temperatureLabel}
      ${humidityLabel}
      ${hero}
      ${humidity}
      <g>${rowParts.join('')}</g>

      ${gridLines}
      ${temperatureArea ? `<path d="${temperatureArea}" fill="url(#${options.cardId}-area)" />` : ''}
      ${setpointLine}
      ${humidityArea ? `<path d="${humidityArea}" fill="url(#${options.cardId}-area-humidity)" />` : ''}
      ${humidityLines}
      ${temperatureLines}
      ${dots}
      <line x1="${left}" x2="${right}" y1="${chartBottom}" y2="${chartBottom}" stroke="${
        COLORS.text
      }" stroke-opacity="0.1" />
      ${endDots}
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

const cards: CardOptions[] = [
  {
    cardId: 'card-1',
    x: PAD,
    y: 104,
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
    cardId: 'card-2',
    x: PAD + CARD_W + GAP,
    y: 104,
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
    cardId: 'card-3',
    x: PAD,
    y: 104 + CARD_H + GAP,
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
    cardId: 'card-4',
    x: PAD + CARD_W + GAP,
    y: 104 + CARD_H + GAP,
    name: 'Arbeitszimmer',
    temperature: '18,6',
    unit: '°C',
    humidity: '44',
    window: 'closed',
    hvacState: 'Status unbekannt',
    hvacKey: 'unknown',
    series: samples(18.7, 0.6, 6),
    humiditySeries: samples(44, 2, 5),
    // Klick auf den Wert: die Feuchteserie ist ausgeblendet.
    hidden: ['humidity'],
  },
];

const cardMarkup = cards.map(renderCard).join('\n');
const H = 104 + CARD_H * 2 + GAP + 40;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Room Climate Card – Vorschau mit Demo-Daten">
  <rect width="${W}" height="${H}" fill="${COLORS.page}" />
  <text x="${PAD}" y="46" ${font(22, 700)} fill="${COLORS.text}">Room Climate Card</text>
  <text x="${PAD}" y="68" ${font(11)} fill="${COLORS.muted}">Temperatur · Luftfeuchte · Fenster · Bewegung · Heizstatus · Verlauf</text>
  <g transform="translate(${W - PAD - 176},30)">
    <rect width="176" height="26" rx="13" fill="rgba(251,191,36,0.12)" stroke="rgba(251,191,36,0.45)" />
    <text x="88" y="17" ${font(9.5, 700)} fill="#fbbf24" text-anchor="middle">VORSCHAU · DEMO-DATEN</text>
  </g>
  ${cardMarkup}
  <text x="${PAD}" y="${H - 12}" ${font(9.5)} fill="${COLORS.tertiary}">Design-Vorschau, gerendert aus dem Chart-Modul der Karte mit simulierten Messwerten – keine Live-Daten.</text>
</svg>
`;

process.stdout.write(svg);
