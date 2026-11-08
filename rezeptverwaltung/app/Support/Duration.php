<?php

namespace App\Support;

/** Zeitangaben: Eingabe „90“, „1:30“, „1 h 30 min“, „1,5 Std.“, ISO 8601 „PT1H30M“. */
final class Duration
{
    public static function parse(mixed $value): ?int
    {
        if ($value === null) {
            return null;
        }
        if (is_int($value)) {
            return $value >= 0 ? $value : null;
        }
        $t = mb_strtolower(trim((string) $value));
        if ($t === '') {
            return null;
        }
        if (preg_match('/^\d+$/', $t)) {
            return (int) $t;
        }
        if (preg_match('/^(\d+):(\d{1,2})$/', $t, $m)) {
            return (int) $m[1] * 60 + (int) $m[2];
        }
        if (str_starts_with($t, 'p')) {
            return self::parseIso(strtoupper($t));
        }
        $total = 0.0;
        $found = false;
        if (preg_match_all('/(\d+(?:[.,]\d+)?)\s*(tage?n?|d\b|stunden?|std\.?|h\b|minuten?|min\.?|m\b)/u', $t, $all, PREG_SET_ORDER)) {
            foreach ($all as $m) {
                $num = (float) str_replace(',', '.', $m[1]);
                $u = $m[2];
                if (str_starts_with($u, 't') || $u === 'd') {
                    $total += $num * 1440;
                } elseif (str_starts_with($u, 's') || $u === 'h') {
                    $total += $num * 60;
                } else {
                    $total += $num;
                }
                $found = true;
            }
        }

        return $found ? (int) round($total) : null;
    }

    /** ISO-8601-Dauer (z. B. aus Schema.org) in Minuten. */
    public static function parseIso(?string $iso): ?int
    {
        if ($iso === null || $iso === '') {
            return null;
        }
        if (! preg_match('/^P(?:(\d+(?:[.,]\d+)?)D)?(?:T(?:(\d+(?:[.,]\d+)?)H)?(?:(\d+(?:[.,]\d+)?)M)?(?:(\d+(?:[.,]\d+)?)S)?)?$/i', trim($iso), $m)) {
            return null;
        }
        $f = fn ($i) => isset($m[$i]) && $m[$i] !== '' ? (float) str_replace(',', '.', $m[$i]) : 0.0;
        $minutes = $f(1) * 1440 + $f(2) * 60 + $f(3) + $f(4) / 60;

        return $minutes > 0 ? (int) round($minutes) : null;
    }

    public static function format(?int $minutes): string
    {
        if ($minutes === null) {
            return '';
        }
        if ($minutes < 60) {
            return $minutes.' Min.';
        }
        $days = intdiv($minutes, 1440);
        $hours = intdiv($minutes % 1440, 60);
        $min = $minutes % 60;
        $parts = [];
        if ($days) {
            $parts[] = $days.' '.($days === 1 ? 'Tag' : 'Tage');
        }
        if ($hours) {
            $parts[] = $hours.' Std.';
        }
        if ($min) {
            $parts[] = $min.' Min.';
        }

        return implode(' ', $parts);
    }

    /** Wert für Eingabefelder. */
    public static function toInput(?int $minutes): string
    {
        if ($minutes === null) {
            return '';
        }

        return $minutes < 60 ? (string) $minutes : sprintf('%d:%02d', intdiv($minutes, 60), $minutes % 60);
    }
}
