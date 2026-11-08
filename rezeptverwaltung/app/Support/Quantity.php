<?php

namespace App\Support;

/**
 * Zahlen- und Mengenangaben im deutschen Format.
 *
 * Unterstützt: "1,5", "1.5", "1 1/2", "1/2", "½", "1½", "1.000" (Tausenderpunkt),
 * Bereiche "2-3", "2–3", "2 bis 3".
 */
final class Quantity
{
    public const UNICODE_FRACTIONS = [
        '½' => 0.5, '⅓' => 1 / 3, '⅔' => 2 / 3, '¼' => 0.25, '¾' => 0.75,
        '⅕' => 0.2, '⅖' => 0.4, '⅗' => 0.6, '⅘' => 0.8, '⅙' => 1 / 6, '⅚' => 5 / 6,
        '⅛' => 0.125, '⅜' => 0.375, '⅝' => 0.625, '⅞' => 0.875,
    ];

    /** Regex-Baustein für eine einzelne Zahl inkl. Brüchen. */
    public const NUMBER_PATTERN = '(?:\d+\s+\d+\s*\/\s*\d+|\d+\s*\/\s*\d+|\d+\s*[½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]|\d{1,3}(?:\.\d{3})+(?![\d,])|\d+(?:[.,]\d+)?|[½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞])';

    /**
     * Wandelt eine einzelne Zahl (auch Bruch) in float um. Gibt null zurück,
     * wenn der Text keine reine Zahl ist.
     */
    public static function parseNumber(?string $text): ?float
    {
        if ($text === null) {
            return null;
        }
        $t = trim(str_replace("\u{00A0}", ' ', $text));
        if ($t === '') {
            return null;
        }

        // Gemischter Bruch: "1 1/2"
        if (preg_match('/^(\d+)\s+(\d+)\s*\/\s*(\d+)$/u', $t, $m)) {
            return (int) $m[3] === 0 ? null : (int) $m[1] + (int) $m[2] / (int) $m[3];
        }
        // Einfacher Bruch: "1/2"
        if (preg_match('/^(\d+)\s*\/\s*(\d+)$/u', $t, $m)) {
            return (int) $m[2] === 0 ? null : (int) $m[1] / (int) $m[2];
        }
        // Unicode-Bruch mit optionaler Ganzzahl: "1½", "½"
        if (preg_match('/^(\d*)\s*([½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞])$/u', $t, $m)) {
            return ($m[1] === '' ? 0 : (int) $m[1]) + self::UNICODE_FRACTIONS[$m[2]];
        }
        // Tausenderpunkte: "1.000" oder "12.500"
        if (preg_match('/^\d{1,3}(?:\.\d{3})+$/', $t)) {
            return (float) str_replace('.', '', $t);
        }
        // Dezimalzahl mit Komma oder Punkt
        if (preg_match('/^\d+(?:[.,]\d+)?$/', $t)) {
            return (float) str_replace(',', '.', $t);
        }
        // Dezimalzahl ohne führende Null: ",5"
        if (preg_match('/^[.,]\d+$/', $t)) {
            return (float) ('0'.str_replace(',', '.', $t));
        }

        return null;
    }

    /**
     * Zerlegt eine Mengenangabe, die auch ein Bereich sein kann.
     *
     * @return array{0: float, 1: float|null}|null [min, max]
     */
    public static function parseRange(?string $text): ?array
    {
        if ($text === null || trim($text) === '') {
            return null;
        }
        $t = trim($text);
        $single = self::parseNumber($t);
        if ($single !== null) {
            return [$single, null];
        }
        $n = self::NUMBER_PATTERN;
        if (preg_match('/^('.$n.')\s*(?:-|–|—|bis)\s*('.$n.')$/u', $t, $m)) {
            $a = self::parseNumber($m[1]);
            $b = self::parseNumber($m[2]);
            if ($a !== null && $b !== null && $b >= $a) {
                return [$a, $b];
            }
        }

        return null;
    }

    /** Positive Zahl (> 0) aus Benutzereingabe, sonst null. */
    public static function parsePositive(?string $text): ?float
    {
        $v = self::parseNumber($text);

        return ($v !== null && $v > 0 && is_finite($v)) ? $v : null;
    }

    /**
     * Formatiert eine Menge für die Anzeige (nur Anzeige – gespeicherte Werte bleiben unverändert).
     * Es wird nie auf ganze Stücke aufgerundet: 1,5 Eier bleiben 1,5.
     */
    public static function format(?float $value, ?string $unit = null): string
    {
        if ($value === null) {
            return '';
        }

        return self::formatNumber(round($value, self::displayDecimals($value, $unit)));
    }

    /** Anzahl Nachkommastellen für die Anzeige (identisch in resources/js/quantity.js). */
    public static function displayDecimals(float $value, ?string $unit = null): int
    {
        $abs = abs($value);
        $fine = in_array(Units::canonical($unit), ['g', 'ml'], true);
        if ($fine) {
            $decimals = $abs >= 10 ? 0 : ($abs >= 1 ? 1 : 2);
        } else {
            $decimals = $abs >= 100 ? 0 : ($abs >= 10 ? 1 : 2);
        }
        // Kleine Mengen nie als 0 anzeigen
        while ($decimals < 4 && $value != 0.0 && round($value, $decimals) == 0.0) {
            $decimals++;
        }

        return $decimals;
    }

    private static function formatNumber(float $value): string
    {
        $s = number_format($value, 4, ',', '.');
        $s = rtrim(rtrim($s, '0'), ',');

        return $s === '-0' ? '0' : $s;
    }

    public static function formatRange(?float $min, ?float $max, ?string $unit = null): string
    {
        if ($min === null) {
            return '';
        }
        $s = self::format($min, $unit);
        if ($max !== null && $max != $min) {
            $s .= '–'.self::format($max, $unit);
        }

        return $s;
    }

    /** Formatiert eine Zahl als Eingabewert (deutsches Komma, ohne Rundung auf Anzeigegenauigkeit). */
    public static function toInput(?float $value): string
    {
        if ($value === null) {
            return '';
        }
        $s = rtrim(rtrim(number_format($value, 4, ',', ''), '0'), ',');

        return $s;
    }

    /** Wandelt eine deutsche Dezimalangabe für die Validierung in einen Punkt-String um. */
    public static function normalizeDecimalInput(mixed $value): mixed
    {
        if (! is_string($value)) {
            return $value;
        }
        $t = trim($value);
        if ($t === '') {
            return null;
        }
        $n = self::parseNumber($t);

        return $n === null ? $t : (string) $n;
    }
}
