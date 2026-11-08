// Mengenlogik für die Anzeige im Browser. Spiegelt app/Support/Quantity.php
// (Parsen von Dezimalkomma/Brüchen, Anzeigerundung). Gespeicherte Werte werden nie verändert.

export const UNICODE_FRACTIONS = {
    '½': 0.5, '⅓': 1 / 3, '⅔': 2 / 3, '¼': 0.25, '¾': 0.75, '⅕': 0.2, '⅖': 0.4, '⅗': 0.6, '⅘': 0.8,
    '⅙': 1 / 6, '⅚': 5 / 6, '⅛': 0.125, '⅜': 0.375, '⅝': 0.625, '⅞': 0.875,
};

const FINE_UNITS = ['g', 'gr', 'gramm', 'ml', 'milliliter'];

export function parseNumber(text) {
    if (text === null || text === undefined) return null;
    const t = String(text).replace(/ /g, ' ').trim();
    if (t === '') return null;
    let m;
    if ((m = t.match(/^(\d+)\s+(\d+)\s*\/\s*(\d+)$/))) {
        return Number(m[3]) === 0 ? null : Number(m[1]) + Number(m[2]) / Number(m[3]);
    }
    if ((m = t.match(/^(\d+)\s*\/\s*(\d+)$/))) {
        return Number(m[2]) === 0 ? null : Number(m[1]) / Number(m[2]);
    }
    if ((m = t.match(/^(\d*)\s*([½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞])$/))) {
        return (m[1] === '' ? 0 : Number(m[1])) + UNICODE_FRACTIONS[m[2]];
    }
    if (/^\d{1,3}(?:\.\d{3})+$/.test(t)) return Number(t.replace(/\./g, ''));
    if (/^\d+(?:[.,]\d+)?$/.test(t)) return Number(t.replace(',', '.'));
    if (/^[.,]\d+$/.test(t)) return Number('0' + t.replace(',', '.'));
    return null;
}

export function parsePositive(text) {
    const v = parseNumber(text);
    return v !== null && v > 0 && Number.isFinite(v) ? v : null;
}

function roundTo(value, decimals) {
    const f = Math.pow(10, decimals);
    return Math.round((value + Number.EPSILON * Math.sign(value)) * f) / f;
}

export function displayDecimals(value, unit = null) {
    const abs = Math.abs(value);
    const fine = unit ? FINE_UNITS.includes(String(unit).trim().toLowerCase()) : false;
    let decimals = fine ? (abs >= 10 ? 0 : abs >= 1 ? 1 : 2) : (abs >= 100 ? 0 : abs >= 10 ? 1 : 2);
    while (decimals < 4 && value !== 0 && roundTo(value, decimals) === 0) decimals++;
    return decimals;
}

export function formatNumber(value) {
    let s = value.toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
    const [int, frac] = s.split('.');
    const neg = int.startsWith('-');
    const digits = neg ? int.slice(1) : int;
    const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    s = (neg ? '-' : '') + grouped + (frac ? ',' + frac : '');
    return s === '-0' ? '0' : s;
}

export function format(value, unit = null) {
    if (value === null || value === undefined) return '';
    return formatNumber(roundTo(value, displayDecimals(value, unit)));
}

export function formatRange(min, max, unit = null) {
    if (min === null || min === undefined) return '';
    let s = format(min, unit);
    if (max !== null && max !== undefined && max !== min) s += '–' + format(max, unit);
    return s;
}

/** Zeile skalieren: { q, qmax, qtext, unit, scalable } */
export function scaleLine(line, factor) {
    if (line.q === null || line.q === undefined) return line.qtext || '';
    const f = line.scalable ? factor : 1;
    return formatRange(line.q * f, line.qmax !== null && line.qmax !== undefined ? line.qmax * f : null, line.unit);
}
