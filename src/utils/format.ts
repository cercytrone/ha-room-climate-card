import { baseLanguage } from '../localize';

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

const formatterCache = new Map<string, Intl.NumberFormat>();

function numberFormatter(language: string, decimals: number): Intl.NumberFormat {
  const key = `${language}|${decimals}`;
  let formatter = formatterCache.get(key);
  if (!formatter) {
    try {
      formatter = new Intl.NumberFormat(language, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    } catch {
      formatter = new Intl.NumberFormat('en', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    }
    formatterCache.set(key, formatter);
  }
  return formatter;
}

export function formatNumber(value: number, language: string, decimals: number): string {
  if (!Number.isFinite(value)) return '–';
  return numberFormatter(language || 'en', clamp(Math.round(decimals), 0, 3)).format(value);
}

/** Parses a Home Assistant state string into a finite number, or `null`. */
export function parseNumericState(state: string | undefined | null): number | null {
  if (state === undefined || state === null) return null;
  const trimmed = String(state).trim();
  if (!trimmed) return null;
  const normalized = trimmed.replace(/\s/g, '').replace(',', '.');
  if (!/^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(normalized)) return null;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

export function formatClock(timestamp: number, language: string): string {
  try {
    return new Intl.DateTimeFormat(language || 'en', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(timestamp));
  } catch {
    const date = new Date(timestamp);
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  }
}

export interface RelativeLabels {
  justNow: string;
  minutes: string;
  hours: string;
  days: string;
}

/** Compact relative duration ("12 Min.") used for the motion badge. */
export function formatRelative(timestamp: number, now: number, labels: RelativeLabels): string {
  const delta = Math.max(0, now - timestamp);
  const minutes = Math.floor(delta / 60000);
  if (minutes < 1) return labels.justNow;
  if (minutes < 60) return `${minutes} ${labels.minutes}`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${labels.hours}`;
  const days = Math.floor(hours / 24);
  return `${days} ${labels.days}`;
}

/** Locale-aware unit for a sensor, falling back to the HA unit system. */
export function temperatureUnit(entityUnit: string | undefined): string {
  return entityUnit && entityUnit.trim().length ? entityUnit.trim() : '°C';
}

/** Canonical temperature scale for a unit string, or `null` if unknown. */
export function temperatureScale(unit: string | undefined): 'C' | 'F' | null {
  const text = unit?.trim().toLowerCase();
  if (!text) return null;
  if (text.includes('°f') || text === 'f' || text.startsWith('fahrenheit')) return 'F';
  if (text.includes('°c') || text === 'c' || text.startsWith('celsius')) return 'C';
  return null;
}

/**
 * Converts a temperature between the two scales Home Assistant uses. Returns
 * `null` when either unit is unknown, so callers can decide not to draw a
 * reference line instead of guessing.
 */
export function convertTemperature(
  value: number,
  from: string | undefined,
  to: string | undefined
): number | null {
  if (!Number.isFinite(value)) return null;
  const source = temperatureScale(from);
  const target = temperatureScale(to);
  if (!source || !target) return null;
  if (source === target) return value;
  return source === 'C' ? value * 1.8 + 32 : (value - 32) / 1.8;
}

export function humidityUnit(entityUnit: string | undefined): string {
  const unit = entityUnit?.trim();
  if (!unit) return '%';
  return unit;
}

export function currentLanguage(language?: string): string {
  if (language && language.trim().length) return language;
  return baseLanguage(language) === 'de' ? 'de' : 'en';
}

export function hexToRgbArray(color: string): [number, number, number] | null {
  const match = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color.trim());
  if (!match) return null;
  let hex = match[1];
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }
  return [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ];
}

export function rgbArrayToHex(rgb: [number, number, number]): string {
  return `#${rgb
    .map((channel) => clamp(Math.round(channel), 0, 255).toString(16).padStart(2, '0'))
    .join('')}`;
}

/**
 * Adds transparency to a CSS colour. Hex colours are converted to `rgba()`,
 * anything else (CSS variables, `rgb()`, named colours) falls back to
 * `color-mix()` so the card still respects hand written YAML values.
 */
export function withAlpha(color: string, alpha: number): string {
  const rgb = hexToRgbArray(color);
  if (rgb) return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${clamp(alpha, 0, 1)})`;
  if (/^rgba?\(/i.test(color.trim())) {
    const numbers = color.match(/[\d.]+/g);
    if (numbers && numbers.length >= 3) {
      return `rgba(${numbers[0]}, ${numbers[1]}, ${numbers[2]}, ${clamp(alpha, 0, 1)})`;
    }
  }
  return `color-mix(in srgb, ${color} ${Math.round(clamp(alpha, 0, 1) * 100)}%, transparent)`;
}
