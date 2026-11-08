<?php

namespace App\Services\Import;

use App\Support\Duration;
use App\Support\IngredientParser;
use App\Support\Quantity;

/**
 * Erzeugt einen Rezeptentwurf aus eingefügtem Freitext.
 * Erwartet idealerweise Abschnitte „Zutaten“ und „Zubereitung“.
 */
final class TextRecipeParser
{
    public function parse(string $text, ?string $title = null): array
    {
        $text = str_replace("\r\n", "\n", $text);
        $lines = explode("\n", $text);
        $warnings = [];

        $section = 'head';
        $head = [];
        $ingredientLines = [];
        $stepLines = [];
        foreach ($lines as $line) {
            $t = trim($line);
            $plain = mb_strtolower(trim($t, " #*:\t"));
            if (preg_match('/^(zutaten|zutatenliste|ingredients|du brauchst|einkaufsliste)\b/u', $plain) && mb_strlen($plain) < 40) {
                $section = 'ingredients';

                continue;
            }
            if (preg_match('/^(zubereitung|anleitung|so geht\'?s|instructions|arbeitsschritte|zubereitungsschritte|method)\b/u', $plain) && mb_strlen($plain) < 40) {
                $section = 'steps';

                continue;
            }
            match ($section) {
                'head' => $head[] = $line,
                'ingredients' => $ingredientLines[] = $line,
                default => $stepLines[] = $line,
            };
        }

        $headLines = array_values(array_filter(array_map('trim', $head), fn ($l) => $l !== ''));
        if ($title === null || trim($title) === '') {
            $title = $headLines[0] ?? '';
            array_shift($headLines);
        }
        $title = trim($title, " #*\t");

        // Rezeptmenge/Zeiten im Kopfbereich erkennen
        $yieldQ = '1';
        $yieldU = 'Portionen';
        $yieldFound = false;
        $times = ['prep_minutes' => '', 'rest_minutes' => '', 'cook_minutes' => ''];
        $descLines = [];
        foreach ($headLines as $l) {
            if (! $yieldFound && preg_match('/^(?:für|ergibt|menge|portionen)\s*:?\s*('.Quantity::NUMBER_PATTERN.')\s*([[:alpha:]äöüß.\s]*)$/iu', $l, $m)) {
                $yieldQ = Quantity::toInput(Quantity::parseNumber($m[1]) ?? 1);
                $u = trim($m[2], ' .');
                $yieldU = $u === '' || preg_match('/^(personen|person|portion|portionen)$/iu', $u) ? 'Portionen' : mb_substr($u, 0, 50);
                $yieldFound = true;

                continue;
            }
            if (preg_match('/^(arbeitszeit|vorbereitung|zubereitungszeit)\s*:?\s*(.+)$/iu', $l, $m)) {
                $times['prep_minutes'] = Duration::toInput(Duration::parse($m[2]));

                continue;
            }
            if (preg_match('/^(ruhezeit|gehzeit|ruhe-?\s*\/?\s*gehzeit)\s*:?\s*(.+)$/iu', $l, $m)) {
                $times['rest_minutes'] = Duration::toInput(Duration::parse($m[2]));

                continue;
            }
            if (preg_match('/^(kochzeit|backzeit|garzeit|koch-?\s*\/?\s*backzeit)\s*:?\s*(.+)$/iu', $l, $m)) {
                $times['cook_minutes'] = Duration::toInput(Duration::parse($m[2]));

                continue;
            }
            $descLines[] = $l;
        }
        if (! $yieldFound) {
            $warnings['yield'] = 'Keine Rezeptmenge erkannt – „1 Portionen“ angenommen, bitte prüfen.';
        }

        $groups = [];
        $uncertain = 0;
        foreach (IngredientParser::parseBlock(implode("\n", $ingredientLines)) as $g) {
            $items = [];
            foreach ($g['items'] as $p) {
                $uncertain += $p['uncertain'] ? 1 : 0;
                $items[] = SchemaRecipeMapper::itemToForm($p);
            }
            $groups[] = ['name' => $g['name'], 'items' => $items];
        }
        if ($groups === []) {
            $warnings['ingredients'] = 'Keine Zutaten erkannt. Tipp: Eine Zeile „Zutaten“ vor die Zutatenliste setzen.';
        } elseif ($uncertain) {
            $warnings['ingredients'] = $uncertain.' Zutat(en) konnten nicht sicher zerlegt werden (markiert).';
        }

        $steps = [];
        $stepText = trim(implode("\n", $stepLines));
        if ($stepText !== '') {
            $parts = preg_split('/\n\s*\n/u', $stepText) ?: [];
            if (count($parts) <= 1) {
                $parts = preg_split('/\n(?=\s*(?:\d+[.)]|schritt\s+\d+))/iu', $stepText) ?: [$stepText];
            }
            foreach ($parts as $p) {
                $p = trim(preg_replace('/^\s*(?:\d+[.)]|schritt\s+\d+:?)\s*/iu', '', $p) ?? $p);
                if ($p !== '') {
                    $steps[] = ['body' => $p];
                }
            }
        } else {
            $warnings['steps'] = 'Keine Zubereitung erkannt. Tipp: Eine Zeile „Zubereitung“ vor die Arbeitsschritte setzen.';
        }
        if ($title === '') {
            $warnings['title'] = 'Kein Titel erkannt – bitte ergänzen.';
        }

        return [
            'title' => mb_substr($title, 0, 255),
            'description' => mb_substr(trim(implode("\n", $descLines)), 0, 5000),
            'source_url' => null,
            'source_text' => null,
            'author' => null,
            'yield_quantity' => $yieldQ,
            'yield_unit' => $yieldU,
            ...$times,
            'total_minutes' => '',
            'recipe_type_id' => null,
            'categories' => [],
            'tags' => '',
            'groups' => $groups,
            'steps' => $steps,
            'nutrition' => null,
            'image_url' => null,
            'warnings' => $warnings,
        ];
    }
}
