<?php

namespace App\Support;

/**
 * Zerlegt eine Zutatenzeile (z. B. aus einem Import) in Menge, Einheit, Name und Ergänzung.
 *
 * Grundsatz: Was nicht sicher erkannt wird, bleibt als Text erhalten und wird
 * als „unsicher“ markiert – es wird nichts erfunden.
 */
final class IngredientParser
{
    private const NUMBER_WORDS = [
        'ein' => 1, 'eine' => 1, 'einen' => 1, 'einem' => 1, 'einer' => 1,
        'zwei' => 2, 'drei' => 3, 'vier' => 4, 'fünf' => 5, 'sechs' => 6,
        'sieben' => 7, 'acht' => 8, 'neun' => 9, 'zehn' => 10, 'zwölf' => 12,
        'halbe' => 0.5, 'halber' => 0.5, 'halben' => 0.5, 'halbes' => 0.5,
    ];

    /** Unbestimmte Mengenangaben am Zeilenanfang (werden nie skaliert). */
    private const VAGUE_PREFIXES = [
        'ein wenig', 'ein paar', 'eine handvoll', 'eine hand voll', 'etwas', 'einige', 'wenig', 'reichlich', 'evtl.', 'eventuell', 'optional',
    ];

    /** Typische Zusätze ohne Mengenbezug am Zeilenende. */
    private const VAGUE_SUFFIXES = [
        'nach geschmack', 'nach bedarf', 'nach belieben', 'zum abschmecken', 'zum bestreuen', 'zum bestäuben',
        'zum braten', 'zum einfetten', 'zum bestreichen', 'zum garnieren', 'für die form', 'für die arbeitsfläche',
        'n. b.', 'n.b.', 'optional', 'evtl.', 'etwas',
    ];

    /**
     * @return array{quantity: float|null, quantity_max: float|null, quantity_text: string|null, unit: string|null,
     *               name: string, note: string|null, scalable: bool, original_text: string, uncertain: bool}|null
     */
    public static function parse(string $line): ?array
    {
        $original = self::clean($line);
        if ($original === '') {
            return null;
        }
        $text = preg_replace('/^(?:[-*•·▪◦–—]|\d+[.)](?=\s+\D))\s*/u', '', $original) ?? $original;
        $text = trim($text);

        $result = [
            'quantity' => null, 'quantity_max' => null, 'quantity_text' => null, 'unit' => null,
            'name' => $text, 'note' => null, 'scalable' => false, 'original_text' => $original, 'uncertain' => false,
        ];

        $rest = $text;
        $n = Quantity::NUMBER_PATTERN;

        // 1) Numerische Menge am Anfang (auch Bereich)
        if (preg_match('/^('.$n.')(?:\s*(?:-|–|—|bis)\s*('.$n.'))?(?![\d\/])\s*(.*)$/u', $rest, $m)) {
            $min = Quantity::parseNumber($m[1]);
            $max = isset($m[2]) && $m[2] !== '' ? Quantity::parseNumber($m[2]) : null;
            if ($min !== null) {
                $result['quantity'] = $min;
                $result['quantity_max'] = ($max !== null && $max > $min) ? $max : null;
                $result['scalable'] = true;
                $rest = trim($m[3]);
            }
        } else {
            // 2) Zahlwort am Anfang („eine Zwiebel“, „zwei Eier“, „eine halbe Zitrone“)
            if (preg_match('/^(ein|eine|einen|einem|einer)\s+(halbe|halber|halben|halbes)\s+(.*)$/iu', $rest, $m)) {
                $result['quantity'] = 0.5;
                $result['scalable'] = true;
                $rest = trim($m[3]);
            } elseif (preg_match('/^([[:alpha:]äöüß]+)\s+(.+)$/iu', $rest, $m) && isset(self::NUMBER_WORDS[mb_strtolower($m[1])])) {
                $result['quantity'] = (float) self::NUMBER_WORDS[mb_strtolower($m[1])];
                $result['scalable'] = true;
                $rest = trim($m[2]);
            } else {
                // 3) Unbestimmte Menge („etwas Öl“)
                foreach (self::VAGUE_PREFIXES as $prefix) {
                    if (preg_match('/^'.preg_quote($prefix, '/').'\s+(.+)$/iu', $rest, $m)) {
                        $result['quantity_text'] = mb_substr($rest, 0, mb_strlen($prefix));
                        $rest = trim($m[1]);
                        break;
                    }
                }
            }
        }

        // Einheit direkt nach der Menge
        if ($result['quantity'] !== null && $rest !== '') {
            foreach (Units::aliases() as $alias) {
                if (preg_match('/^'.preg_quote($alias, '/').'(?=\s|$|[,(])\s*(.*)$/iu', $rest, $m)) {
                    $result['unit'] = self::displayUnit(mb_substr($rest, 0, mb_strlen($alias)));
                    $rest = trim($m[1]);
                    break;
                }
            }
        }

        // Menge am Zeilenende („Mehl 500 g“) – nur wenn vorne nichts gefunden wurde
        if ($result['quantity'] === null && $result['quantity_text'] === null
            && preg_match('/^(.+?)[\s:,]+('.$n.')\s*([[:alpha:].]+)?$/u', $rest, $m)) {
            $unitCandidate = $m[3] ?? '';
            if ($unitCandidate === '' || Units::isKnown($unitCandidate)) {
                $q = Quantity::parseNumber($m[2]);
                if ($q !== null) {
                    $result['quantity'] = $q;
                    $result['unit'] = $unitCandidate !== '' ? self::displayUnit($unitCandidate) : null;
                    $result['scalable'] = true;
                    $rest = trim($m[1]);
                }
            }
        }

        // Klammerangabe am Anfang des Namens, z. B. „1 Dose (400 g) Tomaten“
        $notes = [];
        if (preg_match('/^\(([^)]*)\)\s*(.+)$/u', $rest, $m)) {
            $notes[] = trim($m[1]);
            $rest = trim($m[2]);
        }

        // Ergänzung nach dem ersten Komma
        if (preg_match('/^([^,]+),\s*(.+)$/u', $rest, $m)) {
            $rest = trim($m[1]);
            $notes[] = trim($m[2]);
        }

        // Zusätze ohne Mengenbezug am Ende
        foreach (self::VAGUE_SUFFIXES as $suffix) {
            if (preg_match('/^(.+?)\s+('.preg_quote($suffix, '/').')$/iu', $rest, $m)) {
                $rest = trim($m[1]);
                array_unshift($notes, $m[2]);
                break;
            }
        }

        $rest = trim($rest, " \t,;:");
        if ($rest === '') {
            // Nur Menge ohne Namen – Originaltext behalten
            $rest = $text;
            $result['uncertain'] = true;
        }

        $result['name'] = mb_substr($rest, 0, 255);
        $result['note'] = $notes ? mb_substr(implode(', ', array_filter($notes)), 0, 255) : null;

        // Restliche Ziffern im Namen deuten auf nicht erkannte Mengen hin (Ausnahme: Mehltypen u. Ä.)
        $nameForCheck = preg_replace('/\b(?:type|typ|nr\.?)\s*\d+/iu', '', $result['name']) ?? '';
        if (preg_match('/\d/u', $nameForCheck)) {
            $result['uncertain'] = true;
        }

        return $result;
    }

    /**
     * Mehrere Zeilen auf einmal; Zeilen, die wie Gruppenüberschriften aussehen
     * („Für den Teig:“), starten eine neue Gruppe.
     *
     * @return array<int, array{name: string|null, items: array<int, array<string, mixed>>}>
     */
    public static function parseBlock(string $text): array
    {
        $groups = [['name' => null, 'items' => []]];
        foreach (preg_split('/\R/u', $text) ?: [] as $line) {
            $clean = self::clean($line);
            if ($clean === '') {
                continue;
            }
            if (self::looksLikeHeading($clean)) {
                $name = rtrim(preg_replace('/^#+\s*/u', '', $clean) ?? $clean, ':');
                if (count($groups) === 1 && $groups[0]['items'] === [] && $groups[0]['name'] === null) {
                    $groups[0]['name'] = $name;
                } else {
                    $groups[] = ['name' => $name, 'items' => []];
                }

                continue;
            }
            $parsed = self::parse($clean);
            if ($parsed !== null) {
                $groups[count($groups) - 1]['items'][] = $parsed;
            }
        }

        return array_values(array_filter($groups, fn ($g) => $g['items'] !== [] || $g['name'] !== null));
    }

    public static function looksLikeHeading(string $line): bool
    {
        if (str_starts_with($line, '#')) {
            return true;
        }
        if (! str_ends_with($line, ':') || mb_strlen($line) > 60) {
            return false;
        }

        return ! preg_match('/^\s*'.Quantity::NUMBER_PATTERN.'/u', $line);
    }

    /** Maßeinheiten werden vereinheitlicht, Zähleinheiten („Zehen“) behalten ihre Schreibweise. */
    private static function displayUnit(string $written): string
    {
        $canonical = Units::canonical($written) ?? $written;

        return in_array($canonical, ['mg', 'g', 'kg', 'ml', 'cl', 'dl', 'l', 'EL', 'TL', 'Msp.', 'Pck.'], true) ? $canonical : $written;
    }

    private static function clean(string $line): string
    {
        $line = html_entity_decode(strip_tags($line), ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $line = str_replace(["\u{00A0}", "\u{2009}", "\u{202F}", "\t"], ' ', $line);
        $line = preg_replace('/\s+/u', ' ', $line) ?? $line;

        return trim($line);
    }
}
