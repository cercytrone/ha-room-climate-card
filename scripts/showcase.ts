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
  bandColorFor,
  buildSegments,
  linearScale,
  padDomain,
  projectRun,
  seriesPath,
  temperatureGradientStops,
  timeTicks,
  type ChartSample,
  type Point,
} from '../src/chart/geometry';

const W = 1000;
const H = 664;
const PAD = 24;
const GAP = 20;
const CARD_W = (W - PAD * 2 - GAP) / 2;
const CARD_H = 250;

const COLORS = {
  bg: '#0b111e',
  card: '#162032',
  border: 'rgba(148,163,184,0.22)',
  text: '#eaf0fb',
  muted: '#93a4bd',
  cool: '#38bdf8',
  comfort: '#34d399',
  warm: '#fbbf24',
  hot: '#f43f5e',
  humidity: '#a78bfa',
  heating: '#ef4444',
  idle: '#34d399',
  off: '#64748b',
  unknown: '#94a3b8',
  windowOpen: '#fbbf24',
  motion: '#34d399',
};

const BANDS = { cool: 19, warm: 25, hot: 28 };
const BAND_COLORS = {
  cool: COLORS.cool,
  comfort: COLORS.comfort,
  warm: COLORS.warm,
  hot: COLORS.hot,
};

const font = (size: number, weight = 400): string =>
  `font-family="DejaVu Sans, Segoe UI, Helvetica, Arial, sans-serif" font-size="${size}" font-weight="${weight}"`;

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

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

interface CardOptions {
  x: number;
  y: number;
  name: string;
  temperature: string;
  temperatureColor: string;
  unit: string;
  humidity?: string;
  humidityColor?: string;
  window?: 'closed' | 'open' | 'unknown';
  motion?: 'active' | 'idle' | 'none';
  quiet?: string;
  /** Target temperature row above the current value. */
  setpoint?: string;
  /** Colour of the HVAC flame icon: heating / idle / off / unknown. */
  hvacColor?: string;
  hvacMode?: string;
  series: ChartSample[];
  humiditySeries?: ChartSample[];
  smooth?: boolean;
  points?: boolean;
  grid?: boolean;
  gap?: boolean;
  cardId: string;
}

function iconPath(kind: 'flame' | 'radiator' | 'power' | 'thermometer'): string {
  switch (kind) {
    case 'flame':
      return '<path d="M12 21a6.3 6.3 0 0 1-6.3-6.3c0-2 .9-3.7 2.2-5.1.8-.9 2-2.1 2.7-3.4.5-.9.9-1.9 1.1-2.7.2-.7 1.1-.9 1.5-.3.8 1.3 1.8 3 2.4 4.6.5 1.2.7 2.3.7 3.2 0 1-.3 2-.8 2.8" />';
    case 'radiator':
      return '<rect x="3" y="5.5" width="18" height="13" rx="2.2" /><path d="M7.5 8.5v7M12 8.5v7M16.5 8.5v7" />';
    case 'power':
      return '<path d="M12 3v9" /><path d="M7.5 6.3a7 7 0 1 0 9 0" />';
    default:
      return '<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z" />';
  }
}

function badge(
  x: number,
  y: number,
  color: string,
  accent: boolean,
  body: string
): string {
  return `<g transform="translate(${x},${y})">
    <rect x="0" y="0" width="30" height="30" rx="11" fill="${
      accent ? `${color}29` : 'rgba(100,116,139,0.14)'
    }" stroke="${accent ? `${color}73` : 'rgba(148,197,255,0.22)'}" stroke-width="1" />
    <path d="M 11 1.5 H 19" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
    <g transform="translate(6.4,6.4)" fill="none" stroke="${color}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      ${body}
    </g>
  </g>`;
}

const windowIcon = {
  closed: '<rect x="3.5" y="4" width="17" height="16" rx="2" /><path d="M12 4v16M3.5 12h17" />',
  open: '<path d="M4 4.5h11.5V20H4z" /><path d="M15.5 7.5 20.5 4v16l-5-3.5" />',
};

const motionIcon =
  '<circle cx="13" cy="4.4" r="1.9" /><path d="M10 21l2.6-5.6 3 1.9 2.2-4.6" /><path d="M7.4 13.4l3.4-2.7.9-3.4-3-1-2.8 3.6" />';

function renderCard(options: CardOptions): string {
  const { x, y } = options;
  const pad = 16;
  const chartY = y + CARD_H - 100;
  const chartH = 84;
  const chartTop = chartY + 8;
  const chartBottom = chartY + chartH - 16;
  const axisBaseline = chartY + chartH - 5;
  const rangeMs = 6 * 3600 * 1000;
  const end = Date.now();
  const start = end - rangeMs;
  const xScale = linearScale([start, end], [x + 2, x + CARD_W - 2]);

  const values = options.series
    .map((sample) => sample.v)
    .filter((value): value is number => value !== null);
  const domain = values.length
    ? padDomain(Math.min(...values), Math.max(...values), { minSpan: 0.8, padding: 0.16 })
    : [20, 24];
  const yScale = linearScale(domain, [chartBottom, chartTop]);

  const humidityValues = (options.humiditySeries ?? [])
    .map((sample) => sample.v)
    .filter((value): value is number => value !== null);
  const humidityDomain = humidityValues.length
    ? padDomain(Math.min(...humidityValues), Math.max(...humidityValues), {
        minSpan: 6,
        padding: 0.2,
      })
    : null;
  const humidityScale = humidityDomain
    ? linearScale(humidityDomain, [chartBottom, chartTop])
    : null;

  const tempGradient = temperatureGradientStops({
    top: chartTop,
    bottom: chartBottom,
    domain: domain as [number, number],
    thresholds: BANDS,
    colors: BAND_COLORS,
    opacityTop: 1,
    opacityBottom: 1,
  });
  const tempFill = temperatureGradientStops({
    top: chartTop,
    bottom: chartBottom,
    domain: domain as [number, number],
    thresholds: BANDS,
    colors: BAND_COLORS,
    opacityTop: 0.34,
    opacityBottom: 0.01,
  });

  // Mirror the card: holes are interpolated, the outer samples held to the edges.
  const segments = buildSegments(options.series, {
    rangeMs,
    start,
    end,
    gapMode: 'connect',
    maxGapMs: 120 * 60 * 1000,
  });
  const humiditySegments = options.humiditySeries
    ? buildSegments(options.humiditySeries, { rangeMs, start, end, gapMode: 'connect' })
    : [];
  const runs = segments.map((segment) => segment.samples);
  const humidityRuns = humiditySegments.map((segment) => segment.samples);

  const smooth = options.smooth !== false;
  const paths = runs
    .map((run) => {
      const pts: Point[] = projectRun(run, xScale, yScale);
      return `<path d="${areaPath(pts, chartBottom, smooth)}" fill="url(#${options.cardId}-fill)" />
        <path d="${seriesPath(pts, smooth)}" fill="none" stroke="url(#${options.cardId}-stroke)" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" />`;
    })
    .join('');
  const humidityPaths =
    humidityScale === null
      ? ''
      : humidityRuns
          .map((run) => {
            const pts: Point[] = projectRun(run, xScale, humidityScale);
            return `<path d="${areaPath(pts, chartBottom, smooth)}" fill="url(#${options.cardId}-humid-fill)" />
              <path d="${seriesPath(pts, smooth)}" fill="none" stroke="${COLORS.humidity}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity="0.92" />`;
          })
          .join('');

  const dots = options.points
    ? runs
        .flatMap((run) =>
          run.filter((_, index) => index % 3 === 0).map((sample) => {
            const value = sample.v as number;
            return `<circle cx="${xScale(sample.t).toFixed(1)}" cy="${yScale(value).toFixed(1)}" r="2.1" fill="${COLORS.card}" stroke="${
              bandColorFor(value, BANDS, BAND_COLORS)
            }" stroke-width="1.5" />`;
          })
        )
        .join('')
    : '';

  const gridLines = options.grid
    ? [0, 1, 2]
        .map((index) => {
          const lineY = chartTop + ((chartBottom - chartTop) * index) / 2;
          return `<line x1="${x + 1}" x2="${x + CARD_W - 1}" y1="${lineY.toFixed(1)}" y2="${lineY.toFixed(
            1
          )}" stroke="rgba(148,163,184,0.1)" stroke-width="1" stroke-dasharray="2 5" />`;
        })
        .join('')
    : '';

  const cornerInset = 20;
  const labelScale = linearScale([start, end], [x + 2 + cornerInset, x + CARD_W - 2 - cornerInset]);
  const axis = timeTicks(start, end, 4)
    .map((tick, index) => {
      const date = new Date(tick);
      const label = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      const anchor = index === 0 ? 'start' : index === 3 ? 'end' : 'middle';
      return `<text x="${labelScale(tick).toFixed(1)}" y="${axisBaseline}" ${font(
        9.5
      )} fill="${COLORS.muted}" letter-spacing="0.3" text-anchor="${anchor}">${label}</text>`;
    })
    .join('');

  const setpointLabel = 'SOLL';
  const setpointX = options.hvacColor ? 26 : 0;
  // "SOLL" at 9.5 px with letter-spacing ≈ 29 px advance, plus breathing room.
  const labelWidth = 34;
  const valueX = setpointX + labelWidth;
  const valueWidth = approxWidth(options.setpoint ?? '', 16) - (options.setpoint ?? '').length * 0.2;
  const unitX = valueX + valueWidth + 2.5;
  const setpointRow =
    options.setpoint !== undefined
      ? `<g transform="translate(${x + pad},${y + 64})">
          ${
            options.hvacColor
              ? `<rect x="0" y="0" width="20" height="20" rx="7" fill="${options.hvacColor}24" stroke="${options.hvacColor}52" stroke-width="1" />
                 <g transform="translate(4,4)" fill="none" stroke="${options.hvacColor}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                   <g transform="scale(0.5)">${iconPath('flame')}</g>
                 </g>`
              : ''
          }
          <text x="${setpointX}" y="9.6" ${font(9.5, 600)} fill="${COLORS.muted}" letter-spacing="0.66">${setpointLabel}</text>
          <text x="${valueX}" y="10.5" ${font(16, 600)} fill="${COLORS.text}" letter-spacing="-0.2">${escapeXml(
            options.setpoint
          )}</text>
          <text x="${unitX}" y="10.5" ${font(10.9)} fill="${COLORS.muted}">°C</text>
          ${
            options.hvacMode
              ? `<text x="${unitX + 20}" y="9.6" ${font(9.5)} fill="${COLORS.muted}">${escapeXml(
                  options.hvacMode
                )}</text>`
              : ''
          }
        </g>`
      : '';

  // Humidity: right aligned, its own font size (28 px) and unit (13 px).
  const humRight = x + CARD_W - pad;
  const humValueWidth = approxWidth(options.humidity ?? '', 28);
  const humUnitWidth = 11;
  const humValueX = humRight - humUnitWidth - 3;
  const humidity = options.humidity
    ? `<g>
        <g transform="translate(${(humValueX - humValueWidth - 8 - 18.5).toFixed(1)},${y + 110})" fill="none" stroke="${
          COLORS.muted
        }" stroke-width="1.3" opacity="0.8">
          <path transform="scale(0.77)" d="M12 2.6c2.8 3.2 5.6 6.4 5.6 9.9a5.6 5.6 0 0 1-11.2 0c0-3.5 2.8-6.7 5.6-9.9Z" />
        </g>
        <text x="${humValueX}" y="${y + 128}" ${font(28, 500)} fill="${
          options.humidityColor ?? COLORS.humidity
        }" text-anchor="end" letter-spacing="-0.7">${escapeXml(options.humidity)}</text>
        <text x="${humRight}" y="${y + 128}" ${font(12.9)} fill="${COLORS.muted}" text-anchor="end">%</text>
      </g>`
    : '';

  const windowBadge =
    options.window && options.window !== 'unknown'
      ? badge(
          x + CARD_W - pad - 30,
          y + 13,
          options.window === 'open' ? COLORS.windowOpen : COLORS.muted,
          options.window === 'open',
          windowIcon[options.window]
        )
      : '';

  const motionBadge =
    options.motion && options.motion !== 'none'
      ? badge(
          x + CARD_W - pad - 30 - 36,
          y + 13,
          options.motion === 'active' ? COLORS.motion : COLORS.muted,
          options.motion === 'active',
          motionIcon
        )
      : '';

  const quietLabel = options.quiet
    ? `<text x="${x + pad}" y="${y + 49}" ${font(10.5)} fill="${COLORS.muted}">${escapeXml(
        options.quiet
      )}</text>`
    : '';

  const lastTempPoint = runs.length
    ? runs[runs.length - 1][runs[runs.length - 1].length - 1]
    : undefined;
  const lastTempColor = lastTempPoint
    ? bandColorFor(lastTempPoint.v as number, BANDS, BAND_COLORS)
    : COLORS.comfort;
  const lastHumidityPoint = humidityRuns.length
    ? humidityRuns[humidityRuns.length - 1][humidityRuns[humidityRuns.length - 1].length - 1]
    : undefined;
  const endDots = `${
    lastHumidityPoint && humidityScale
      ? `<circle cx="${xScale(lastHumidityPoint.t).toFixed(1)}" cy="${humidityScale(
          lastHumidityPoint.v as number
        ).toFixed(1)}" r="7" fill="${COLORS.humidity}" opacity="0.2" />
         <circle cx="${xScale(lastHumidityPoint.t).toFixed(1)}" cy="${humidityScale(
           lastHumidityPoint.v as number
         ).toFixed(1)}" r="3" fill="${COLORS.humidity}" stroke="${COLORS.card}" stroke-width="1.6" />`
      : ''
  }${
    lastTempPoint
      ? `<circle cx="${xScale(lastTempPoint.t).toFixed(1)}" cy="${yScale(
          lastTempPoint.v as number
        ).toFixed(1)}" r="7.5" fill="${lastTempColor}" opacity="0.2" />
         <circle cx="${xScale(lastTempPoint.t).toFixed(1)}" cy="${yScale(
           lastTempPoint.v as number
         ).toFixed(1)}" r="3.1" fill="${lastTempColor}" stroke="${COLORS.card}" stroke-width="1.6" />`
      : ''
  }`;

  const cardRadius = 18;

  return `<g>
    <clipPath id="${options.cardId}-clip">
      <rect x="${x}" y="${y}" width="${CARD_W}" height="${CARD_H}" rx="${cardRadius}" />
    </clipPath>
    <defs>
      <linearGradient id="${options.cardId}-surface" x1="${x}" y1="${y}" x2="${x + CARD_W}" y2="${
        y + CARD_H
      }" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#1c2d49" />
        <stop offset="0.52" stop-color="#152238" />
        <stop offset="1" stop-color="#0e1828" />
      </linearGradient>
      <radialGradient id="${options.cardId}-cyan" cx="${x}" cy="${y}" r="${CARD_W * 0.9}" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#38bdf8" stop-opacity="0.2" />
        <stop offset="1" stop-color="#38bdf8" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="${options.cardId}-violet" cx="${x + CARD_W}" cy="${y}" r="${
        CARD_W * 0.85
      }" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#8b5cf6" stop-opacity="0.17" />
        <stop offset="1" stop-color="#8b5cf6" stop-opacity="0" />
      </radialGradient>
    </defs>
    <g clip-path="url(#${options.cardId}-clip)">
      <rect x="${x}" y="${y}" width="${CARD_W}" height="${CARD_H}" fill="url(#${options.cardId}-surface)" />
      <rect x="${x}" y="${y}" width="${CARD_W}" height="${CARD_H}" fill="url(#${options.cardId}-cyan)" />
      <rect x="${x}" y="${y}" width="${CARD_W}" height="${CARD_H}" fill="url(#${options.cardId}-violet)" />
    </g>
    <rect x="${x + 0.5}" y="${y + 0.5}" width="${CARD_W - 1}" height="${CARD_H - 1}" rx="${
      cardRadius - 0.5
    }" fill="none" stroke="${COLORS.border}" />
    <path d="M ${x + cardRadius} ${y + 1.5} H ${x + CARD_W - cardRadius}" stroke="rgba(255,255,255,0.07)" stroke-width="1" />
    <g clip-path="url(#${options.cardId}-clip)">
      <defs>
        <linearGradient id="${options.cardId}-stroke" gradientUnits="userSpaceOnUse" x1="0" y1="${chartTop}" x2="0" y2="${chartBottom}">
          ${tempGradient
            .map(
              (stop) =>
                `<stop offset="${stop.offset.toFixed(4)}" stop-color="${stop.color}" stop-opacity="${stop.opacity}" />`
            )
            .join('')}
        </linearGradient>
        <linearGradient id="${options.cardId}-fill" gradientUnits="userSpaceOnUse" x1="0" y1="${chartTop}" x2="0" y2="${chartBottom}">
          ${tempFill
            .map(
              (stop) =>
                `<stop offset="${stop.offset.toFixed(4)}" stop-color="${stop.color}" stop-opacity="${stop.opacity.toFixed(3)}" />`
            )
            .join('')}
        </linearGradient>
        <linearGradient id="${options.cardId}-humid-fill" gradientUnits="userSpaceOnUse" x1="0" y1="${chartTop}" x2="0" y2="${chartBottom}">
          <stop offset="0" stop-color="${COLORS.humidity}" stop-opacity="0.24" />
          <stop offset="1" stop-color="${COLORS.humidity}" stop-opacity="0.01" />
        </linearGradient>
      </defs>
      ${humidityPaths}
      ${paths}
      ${gridLines}
      ${dots}
      <line x1="${x + 1}" x2="${x + CARD_W - 1}" y1="${chartBottom}" y2="${chartBottom}" stroke="rgba(148,163,184,0.18)" />
      ${endDots}
      ${axis}
    </g>
    <line x1="${x + pad}" x2="${x + CARD_W - pad}" y1="${chartY}" y2="${chartY}" stroke="rgba(148,197,255,0.14)" />
    <text x="${x + pad}" y="${y + 31}" ${font(17, 500)} fill="${COLORS.text}" letter-spacing="-0.25">${escapeXml(
      options.name
    )}</text>
    ${quietLabel}
    ${setpointRow}
    <text x="${x + pad}" y="${y + 132}" ${font(42, 600)} fill="${options.temperatureColor}" letter-spacing="-1.5">${escapeXml(
      options.temperature
    )}</text>
    <text x="${x + pad + 6 + options.temperature.length * 26}" y="${
      y + 132
    }" ${font(14.3)} fill="${COLORS.muted}">${escapeXml(options.unit)}</text>
    ${humidity}
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
    const jitter = Math.sin(index * 1.7) * 0.05 + Math.sin(index * 0.37) * 0.04;
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
    temperatureColor: COLORS.comfort,
    unit: '°C',
    humidity: '50',
    window: 'closed',
    motion: 'active',
    setpoint: '22,0',
    hvacColor: COLORS.heating,
    series: samples(22, 0.6, 5),
    humiditySeries: samples(50, 5, 7),
    points: true,
    grid: true,
  },
  {
    cardId: 'card-2',
    x: PAD + CARD_W + GAP,
    y: 104,
    name: 'Küche',
    temperature: '22,6',
    temperatureColor: COLORS.comfort,
    unit: '°C',
    humidity: '64',
    humidityColor: COLORS.humidity,
    window: 'open',
    motion: 'idle',
    quiet: 'Ruhe seit 12 Min.',
    setpoint: '21,5',
    hvacColor: COLORS.idle,
    hvacMode: 'Heizen',
    series: samples(22.6, 0.5, 4),
    humiditySeries: samples(64, 3, 6),
  },
  {
    cardId: 'card-3',
    x: PAD,
    y: 104 + CARD_H + GAP,
    name: 'Bad (1. OG)',
    temperature: '25,8',
    temperatureColor: COLORS.warm,
    unit: '°C',
    humidity: '70',
    humidityColor: '#e879f9',
    window: 'open',
    motion: 'idle',
    quiet: 'Ruhe seit 46 Min.',
    setpoint: '21,0',
    hvacColor: COLORS.off,
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
    temperatureColor: COLORS.cool,
    unit: '°C',
    humidity: '44',
    window: 'closed',
    setpoint: '20,5',
    hvacColor: COLORS.unknown,
    series: samples(18.7, 0.6, 6),
    humiditySeries: samples(44, 2, 5),
    smooth: false,
  },
];

const cardMarkup = cards.map(renderCard).join('\n');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Room Climate Card – Vorschau mit Demo-Daten">
  <defs>
    <radialGradient id="glow" cx="50%" cy="0%" r="80%">
      <stop offset="0%" stop-color="#1b2b45" stop-opacity="0.9" />
      <stop offset="100%" stop-color="${COLORS.bg}" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${COLORS.bg}" />
  <rect width="${W}" height="${H}" fill="url(#glow)" />
  <text x="${PAD}" y="46" ${font(22, 700)} fill="${COLORS.text}">Room Climate Card</text>
  <text x="${PAD}" y="68" ${font(11)} fill="${COLORS.muted}">Temperatur · Luftfeuchte · Fenster · Bewegung · Thermostat · Verlauf</text>
  <g transform="translate(${W - PAD - 176},30)">
    <rect width="176" height="26" rx="13" fill="rgba(251,191,36,0.12)" stroke="rgba(251,191,36,0.45)" />
    <text x="88" y="17" ${font(9.5, 700)} fill="${COLORS.warm}" text-anchor="middle">VORSCHAU · DEMO-DATEN</text>
  </g>
  ${cardMarkup}
  <text x="${PAD}" y="${H - 12}" ${font(9.5)} fill="${COLORS.muted}">Design-Vorschau, gerendert aus dem Chart-Modul der Karte mit simulierten Messwerten – keine Live-Daten.</text>
</svg>
`;

process.stdout.write(svg);
