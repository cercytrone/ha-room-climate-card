<?php

namespace App\Support;

/**
 * Einheiten: Normalisierung von Schreibweisen und Umrechnung innerhalb
 * derselben Dimension. Gewicht und Volumen werden NIE ineinander umgerechnet,
 * da dafür eine Dichte (Umrechnungsgrundlage) fehlt. Löffel, Tassen u. Ä. werden
 * ebenfalls nicht in ml umgerechnet, weil deren Größe nicht eindeutig ist.
 */
final class Units
{
    /** Kanonische Einheit => [Dimension, Faktor zur Basiseinheit] */
    private const CONVERTIBLE = [
        'mg' => ['mass', 0.001],
        'g' => ['mass', 1.0],
        'kg' => ['mass', 1000.0],
        'ml' => ['volume', 1.0],
        'cl' => ['volume', 10.0],
        'dl' => ['volume', 100.0],
        'l' => ['volume', 1000.0],
    ];

    /** Schreibweise (kleingeschrieben) => kanonische Einheit */
    private const ALIASES = [
        'mg' => 'mg', 'milligramm' => 'mg',
        'g' => 'g', 'gr' => 'g', 'gr.' => 'g', 'gramm' => 'g',
        'kg' => 'kg', 'kilo' => 'kg', 'kilogramm' => 'kg',
        'ml' => 'ml', 'milliliter' => 'ml',
        'cl' => 'cl', 'zentiliter' => 'cl',
        'dl' => 'dl', 'deziliter' => 'dl',
        'l' => 'l', 'liter' => 'l', 'ltr' => 'l', 'ltr.' => 'l',
        'el' => 'EL', 'el.' => 'EL', 'essl.' => 'EL', 'esslöffel' => 'EL', 'eßlöffel' => 'EL', 'tbsp' => 'EL', 'tbsp.' => 'EL',
        'tl' => 'TL', 'tl.' => 'TL', 'teel.' => 'TL', 'teelöffel' => 'TL', 'tsp' => 'TL', 'tsp.' => 'TL',
        'msp' => 'Msp.', 'msp.' => 'Msp.', 'messerspitze' => 'Msp.', 'messerspitzen' => 'Msp.',
        'prise' => 'Prise', 'prisen' => 'Prise',
        'pck' => 'Pck.', 'pck.' => 'Pck.', 'pkt' => 'Pck.', 'pkt.' => 'Pck.', 'päckchen' => 'Pck.', 'packung' => 'Pck.', 'packungen' => 'Pck.', 'pack' => 'Pck.', 'tüte' => 'Pck.', 'tüten' => 'Pck.',
        'stück' => 'Stück', 'stk' => 'Stück', 'stk.' => 'Stück', 'st.' => 'Stück',
        'bund' => 'Bund', 'bd.' => 'Bund',
        'dose' => 'Dose', 'dosen' => 'Dose',
        'becher' => 'Becher',
        'tasse' => 'Tasse', 'tassen' => 'Tasse', 'cup' => 'Tasse', 'cups' => 'Tasse',
        'zehe' => 'Zehe', 'zehen' => 'Zehe',
        'scheibe' => 'Scheibe', 'scheiben' => 'Scheibe',
        'glas' => 'Glas', 'gläser' => 'Glas',
        'blatt' => 'Blatt', 'blätter' => 'Blatt',
        'würfel' => 'Würfel',
        'zweig' => 'Zweig', 'zweige' => 'Zweig',
        'stange' => 'Stange', 'stangen' => 'Stange',
        'handvoll' => 'Handvoll',
        'schuss' => 'Schuss',
        'spritzer' => 'Spritzer',
        'tropfen' => 'Tropfen',
        'flasche' => 'Flasche', 'flaschen' => 'Flasche',
        'beutel' => 'Beutel',
        'kopf' => 'Kopf', 'köpfe' => 'Kopf',
        'knolle' => 'Knolle', 'knollen' => 'Knolle',
        'oz' => 'oz', 'lb' => 'lb', 'lbs' => 'lb',
    ];

    public static function canonical(?string $unit): ?string
    {
        if ($unit === null) {
            return null;
        }
        $u = trim($unit);
        if ($u === '') {
            return null;
        }

        return self::ALIASES[mb_strtolower($u)] ?? $u;
    }

    public static function isKnown(string $unit): bool
    {
        return array_key_exists(mb_strtolower(trim($unit)), self::ALIASES);
    }

    /** @return array<int, string> alle bekannten Schreibweisen, längste zuerst */
    public static function aliases(): array
    {
        $keys = array_keys(self::ALIASES);
        usort($keys, fn ($a, $b) => mb_strlen($b) <=> mb_strlen($a));

        return $keys;
    }

    /** Dimension ("mass", "volume") oder null, wenn nicht umrechenbar. */
    public static function dimension(?string $unit): ?string
    {
        $c = self::canonical($unit);

        return $c !== null && isset(self::CONVERTIBLE[$c]) ? self::CONVERTIBLE[$c][0] : null;
    }

    /** Menge in Basiseinheit (g bzw. ml) oder null, wenn nicht umrechenbar. */
    public static function toBase(float $value, ?string $unit): ?float
    {
        $c = self::canonical($unit);

        return $c !== null && isset(self::CONVERTIBLE[$c]) ? $value * self::CONVERTIBLE[$c][1] : null;
    }

    /**
     * Wählt für eine Menge in Basiseinheit eine gut lesbare Einheit.
     *
     * @return array{0: float, 1: string}
     */
    public static function fromBase(float $value, string $dimension): array
    {
        if ($dimension === 'mass') {
            return $value >= 1000 ? [$value / 1000, 'kg'] : ($value < 1 ? [$value * 1000, 'mg'] : [$value, 'g']);
        }

        return $value >= 1000 ? [$value / 1000, 'l'] : [$value, 'ml'];
    }
}
