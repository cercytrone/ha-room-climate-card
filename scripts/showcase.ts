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
  buildRuns,
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
  heating: '#fb923c',
  idle: '#94a3b8',
  off: '#64748b',
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
  pills?: Array<{ label: string; color: string; icon: 'flame' | 'radiator' | 'power' | 'thermometer' }>;
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
    <rect x="0" y="0" width="26" height="26" rx="9" fill="${
      accent ? `${color}26` : 'rgba(100,116,139,0.16)'
    }" stroke="${accent ? color : 'rgba(148,163,184,0.28)'}" stroke-width="1" />
    <g transform="translate(5.5,5.5)" fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
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
  const chartY = y + CARD_H - 96;
  const chartH = 84;
  const chartTop = chartY + 6;
  const chartBottom = chartY + chartH - 12;
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
    opacityTop: 0.3,
    opacityBottom: 0.02,
  });

  const runs = buildRuns(options.series, rangeMs).runs;
  const humidityRuns = options.humiditySeries
    ? buildRuns(options.humiditySeries, rangeMs).runs
    : [];

  const smooth = options.smooth !== false;
  const paths = runs
    .map((run) => {
      const pts: Point[] = projectRun(run, xScale, yScale);
      return `<path d="${areaPath(pts, chartBottom, smooth)}" fill="url(#${options.cardId}-fill)" />
        <path d="${seriesPath(pts, smooth)}" fill="none" stroke="url(#${options.cardId}-stroke)" stroke-width="1.9" stroke-linecap="round" />`;
    })
    .join('');
  const humidityPaths =
    humidityScale === null
      ? ''
      : humidityRuns
          .map((run) => {
            const pts: Point[] = projectRun(run, xScale, humidityScale);
            return `<path d="${areaPath(pts, chartBottom, smooth)}" fill="url(#${options.cardId}-humid-fill)" />
              <path d="${seriesPath(pts, smooth)}" fill="none" stroke="${COLORS.humidity}" stroke-width="1.6" stroke-linecap="round" opacity="0.9" />`;
          })
          .join('');

  const dots = options.points
    ? runs
        .flatMap((run) =>
          run.filter((_, index) => index % 3 === 0).map((sample) => {
            const value = sample.v as number;
            return `<circle cx="${xScale(sample.t).toFixed(1)}" cy="${yScale(value).toFixed(1)}" r="1.9" fill="${
              COLORS.card
            }" stroke="${bandColorFor(value, BANDS, BAND_COLORS)}" stroke-width="1.2" />`;
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
          )}" stroke="rgba(148,163,184,0.16)" stroke-width="1" stroke-dasharray="2 4" />`;
        })
        .join('')
    : '';

  const axis = timeTicks(start, end, 4)
    .map((tick, index) => {
      const date = new Date(tick);
      const label = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      const anchor = index === 0 ? 'start' : index === 3 ? 'end' : 'middle';
      return `<text x="${xScale(tick).toFixed(1)}" y="${chartY + chartH - 2}" ${font(
        9.5
      )} fill="${COLORS.muted}" text-anchor="${anchor}">${label}</text>`;
    })
    .join('');

  const pills = (options.pills ?? [])
    .map((pill, index) => {
      const width = 18 + pill.label.length * 5.6;
      const offset = (options.pills ?? [])
        .slice(0, index)
        .reduce((sum, item) => sum + 18 + item.label.length * 5.6 + 6, 0);
      return `<g transform="translate(${offset},0)">
        <rect width="${width.toFixed(1)}" height="19" rx="9.5" fill="${pill.color}1f" stroke="${pill.color}4d" stroke-width="1" />
        <g transform="translate(6,4.5)" fill="none" stroke="${pill.color}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
          <g transform="scale(0.42)">${iconPath(pill.icon)}</g>
        </g>
        <text x="18" y="13.5" ${font(9.5, 600)} fill="${pill.color}">${escapeXml(pill.label)}</text>
      </g>`;
    })
    .join('');

  const humidity = options.humidity
    ? `<g>
        <g transform="translate(${x + CARD_W - 66},${y + 46})" fill="none" stroke="${COLORS.muted}" stroke-width="1.3">
          <path d="M6 1.6c1.4 1.6 2.8 3.2 2.8 5a2.8 2.8 0 0 1-5.6 0c0-1.8 1.4-3.4 2.8-5Z" />
        </g>
        <text x="${x + CARD_W - 52}" y="${y + 56}" ${font(15, 600)} fill="${options.humidityColor ?? COLORS.humidity}">${escapeXml(
          options.humidity
        )}</text>
        <text x="${x + CARD_W - 30}" y="${y + 56}" ${font(10)} fill="${COLORS.muted}">%</text>
      </g>`
    : '';

  const windowBadge =
    options.window && options.window !== 'unknown'
      ? badge(
          x + CARD_W - 36,
          y + 13,
          options.window === 'open' ? COLORS.windowOpen : COLORS.muted,
          options.window === 'open',
          windowIcon[options.window]
        )
      : '';

  const motionBadge =
    options.motion && options.motion !== 'none'
      ? badge(
          x + CARD_W - 68,
          y + 13,
          options.motion === 'active' ? COLORS.motion : COLORS.muted,
          options.motion === 'active',
          motionIcon
        )
      : '';

  const quietLabel = options.quiet
    ? `<text x="${x + 14}" y="${y + 47}" ${font(9.5)} fill="${COLORS.muted}">${escapeXml(options.quiet)}</text>`
    : '';

  return `<g>
    <clipPath id="${options.cardId}-clip">
      <rect x="${x}" y="${y}" width="${CARD_W}" height="${CARD_H}" rx="18" />
    </clipPath>
    <rect x="${x}" y="${y}" width="${CARD_W}" height="${CARD_H}" rx="18" fill="${COLORS.card}" stroke="${COLORS.border}" />
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
          <stop offset="0" stop-color="${COLORS.humidity}" stop-opacity="0.22" />
          <stop offset="1" stop-color="${COLORS.humidity}" stop-opacity="0.02" />
        </linearGradient>
      </defs>
      ${humidityPaths}
      ${paths}
      ${gridLines}
      ${dots}
      <line x1="${x + 1}" x2="${x + CARD_W - 1}" y1="${chartBottom}" y2="${chartBottom}" stroke="rgba(148,163,184,0.2)" />
      ${axis}
    </g>
    <text x="${x + 14}" y="${y + 29}" ${font(13.5, 700)} fill="${COLORS.text}">${escapeXml(options.name)}</text>
    ${quietLabel}
    <text x="${x + 14}" y="${y + 82}" ${font(30, 300)} fill="${options.temperatureColor}">${escapeXml(
      options.temperature
    )}</text>
    <text x="${x + 16 + options.temperature.length * 16}" y="${y + 82}" ${font(13)} fill="${COLORS.muted}">${escapeXml(
      options.unit
    )}</text>
    ${humidity}
    ${options.pills?.length ? `<g transform="translate(${x + 14},${y + 96})">${pills}</g>` : ''}
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
    temperature: '22,0',
    temperatureColor: COLORS.comfort,
    unit: '°C',
    humidity: '50',
    window: 'closed',
    motion: 'active',
    pills: [
      { label: 'Soll 22,0 °C', color: COLORS.comfort, icon: 'thermometer' },
      { label: 'Heizt', color: COLORS.heating, icon: 'flame' },
    ],
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
    pills: [
      { label: 'Soll 21,5 °C', color: COLORS.warm, icon: 'thermometer' },
      { label: 'Ruht', color: COLORS.idle, icon: 'radiator' },
    ],
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
    pills: [
      { label: 'Soll 21,0 °C', color: COLORS.off, icon: 'thermometer' },
      { label: 'Aus', color: COLORS.off, icon: 'power' },
    ],
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
    pills: [{ label: 'Status unbekannt', color: COLORS.idle, icon: 'radiator' }],
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
