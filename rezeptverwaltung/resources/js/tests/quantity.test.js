import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseNumber, parsePositive, format, scaleLine } from '../quantity.js';

test('Dezimalkomma und Brüche', () => {
    assert.equal(parseNumber('1,5'), 1.5);
    assert.equal(parseNumber('1.5'), 1.5);
    assert.equal(parseNumber('1/2'), 0.5);
    assert.equal(parseNumber('1 1/2'), 1.5);
    assert.equal(parseNumber('½'), 0.5);
    assert.equal(parseNumber('1½'), 1.5);
    assert.equal(parseNumber('1.000'), 1000);
    assert.equal(parseNumber('abc'), null);
    assert.equal(parsePositive('0'), null);
    assert.equal(parsePositive('-1'), null);
});

test('Skalierung 1 -> 1,5 Brote', () => {
    const f = 1.5 / 1;
    assert.equal(scaleLine({ q: 500, unit: 'g', scalable: true }, f), '750');
    assert.equal(scaleLine({ q: 350, unit: 'ml', scalable: true }, f), '525');
    assert.equal(scaleLine({ q: 10, unit: 'g', scalable: true }, f), '15');
});

test('Keine Aufrundung von Eiern, Text bleibt erhalten', () => {
    assert.equal(scaleLine({ q: 1, unit: null, scalable: true }, 1.5), '1,5');
    assert.equal(scaleLine({ q: null, qtext: 'nach Geschmack', scalable: false }, 2), 'nach Geschmack');
    assert.equal(scaleLine({ q: 2, unit: 'EL', scalable: false }, 3), '2');
    assert.equal(scaleLine({ q: 2, qmax: 3, unit: null, scalable: true }, 2), '4–6');
});

test('Anzeigeformat', () => {
    assert.equal(format(1500, 'g'), '1.500');
    assert.equal(format(0.333333), '0,33');
    assert.equal(format(7.25, 'g'), '7,3');
    assert.equal(format(0.0004), '0,0004');
});
