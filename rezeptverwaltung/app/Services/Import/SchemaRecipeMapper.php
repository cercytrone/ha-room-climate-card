<?php

namespace App\Services\Import;

use App\Models\Category;
use App\Models\RecipeType;
use App\Services\Http\SafeHttpClient;
use App\Support\Duration;
use App\Support\IngredientParser;
use App\Support\Quantity;

/**
 * Überführt ein Schema.org-Recipe-Objekt in einen bearbeitbaren Rezeptentwurf
 * (gleiches Format wie die Formulardaten). Fehlende Angaben bleiben leer und
 * werden markiert – es werden keine Werte geschätzt.
 */
final class SchemaRecipeMapper
{
    /** @param array<string, mixed> $r */
    public function map(array $r, string $pageUrl): array
    {
        $warnings = [];
        $title = self::text($r['name'] ?? $r['headline'] ?? '');
        if ($title === '') {
            $warnings['title'] = 'Kein Titel gefunden – bitte ergänzen.';
        }

        // Rezeptmenge
        [$yq, $yu, $yWarn] = $this->parseYield($r['recipeYield'] ?? $r['yield'] ?? null);
        if ($yWarn) {
            $warnings['yield'] = $yWarn;
        }

        // Zutaten
        $ingredientLines = $r['recipeIngredient'] ?? $r['ingredients'] ?? [];
        if (is_string($ingredientLines)) {
            $ingredientLines = preg_split('/\R/u', $ingredientLines) ?: [];
        }
        $items = [];
        $uncertain = 0;
        foreach ((array) $ingredientLines as $line) {
            $line = self::text(is_array($line) ? RecipeExtractor::scalar($line) : (string) $line);
            if ($line === '') {
                continue;
            }
            if (IngredientParser::looksLikeHeading($line) && $items !== []) {
                // Überschrift innerhalb der Liste -> als eigene Gruppe markieren
                $items[] = ['__group' => rtrim($line, ':')];

                continue;
            }
            $p = IngredientParser::parse($line);
            if ($p === null) {
                continue;
            }
            if ($p['uncertain']) {
                $uncertain++;
            }
            $items[] = $p;
        }
        $groups = $this->groupItems($items);
        if ($items === []) {
            $warnings['ingredients'] = 'Keine Zutaten gefunden – bitte ergänzen.';
        } elseif ($uncertain > 0) {
            $warnings['ingredients'] = $uncertain === 1
                ? '1 Zutat konnte nicht sicher zerlegt werden (markiert). Der Originaltext wurde übernommen.'
                : $uncertain.' Zutaten konnten nicht sicher zerlegt werden (markiert). Der Originaltext wurde übernommen.';
        }

        // Zubereitung
        $steps = $this->mapInstructions($r['recipeInstructions'] ?? []);
        if ($steps === []) {
            $warnings['steps'] = 'Keine Zubereitungsschritte gefunden – bitte ergänzen.';
        }

        // Zeiten
        $prep = Duration::parseIso(self::text($r['prepTime'] ?? ''));
        $cook = Duration::parseIso(self::text($r['cookTime'] ?? ''));
        $total = Duration::parseIso(self::text($r['totalTime'] ?? ''));
        $rest = null;
        // Gesamtzeit nur übernehmen, wenn sie von der Summe abweicht (z. B. wegen Ruhezeit)
        $explicitTotal = ($total !== null && $total !== (int) $prep + (int) $cook) ? $total : null;
        if ($explicitTotal !== null && $prep !== null && $cook !== null && $explicitTotal > $prep + $cook) {
            $warnings['times'] = 'Die angegebene Gesamtzeit ist länger als Arbeits- und Backzeit zusammen. Möglicherweise ist eine Ruhe- oder Gehzeit enthalten – bitte prüfen.';
        }

        // Kategorien/Schlagwörter
        $recipeCategories = self::list($r['recipeCategory'] ?? []);
        $keywords = self::list($r['keywords'] ?? []);
        $cuisine = self::list($r['recipeCuisine'] ?? []);
        $tags = array_values(array_unique(array_filter(array_map(fn ($t) => mb_substr($t, 0, 50), array_merge($recipeCategories, $cuisine, $keywords)))));
        $tags = array_slice($tags, 0, 15);

        $typeId = null;
        foreach ($recipeCategories as $rc) {
            $type = RecipeType::query()->whereRaw('LOWER(name) = ?', [mb_strtolower($rc)])->first();
            if ($type) {
                $typeId = $type->id;
                break;
            }
        }
        $categoryIds = [];
        foreach (array_merge($recipeCategories, $keywords) as $name) {
            foreach (Category::query()->whereRaw('LOWER(name) = ?', [mb_strtolower($name)])->pluck('id') as $id) {
                $categoryIds[$id] = $id;
            }
        }
        if ($typeId === null) {
            $warnings['type'] = $recipeCategories
                ? 'Rezeptart bitte auswählen (Quelle nennt: „'.implode(', ', $recipeCategories).'“, als Schlagwort übernommen).'
                : 'Rezeptart bitte auswählen.';
        }

        // Nährwerte
        [$nutrition, $nWarn] = $this->mapNutrition($r['nutrition'] ?? null);
        if ($nWarn) {
            $warnings['nutrition'] = $nWarn;
        }

        // Bild
        $imageUrl = $this->imageUrl($r['image'] ?? null, $pageUrl);

        $author = $this->author($r['author'] ?? null);

        return [
            'title' => mb_substr($title, 0, 255),
            'description' => mb_substr(self::text($r['description'] ?? ''), 0, 5000),
            'source_url' => $pageUrl,
            'source_text' => mb_substr(self::text(RecipeExtractor::scalar($r['publisher'] ?? '')) ?: (parse_url($pageUrl, PHP_URL_HOST) ?: ''), 0, 500),
            'author' => $author !== '' ? mb_substr($author, 0, 255) : null,
            'yield_quantity' => $yq,
            'yield_unit' => $yu,
            'prep_minutes' => Duration::toInput($prep),
            'rest_minutes' => Duration::toInput($rest),
            'cook_minutes' => Duration::toInput($cook),
            'total_minutes' => Duration::toInput($explicitTotal),
            'recipe_type_id' => $typeId,
            'categories' => array_values($categoryIds),
            'tags' => implode(', ', $tags),
            'groups' => $groups,
            'steps' => $steps,
            'nutrition' => $nutrition,
            'image_url' => $imageUrl,
            'warnings' => $warnings,
        ];
    }

    /** @return array{0: string, 1: string, 2: string|null} */
    private function parseYield(mixed $y): array
    {
        $candidates = is_array($y) ? array_map(fn ($v) => RecipeExtractor::scalar($v), $y) : [is_scalar($y) ? (string) $y : ''];
        $fallback = null;
        foreach ($candidates as $c) {
            $c = self::text($c);
            if ($c === '') {
                continue;
            }
            if (preg_match('/^(?:für\s+|ergibt\s+|ca\.\s*)?('.Quantity::NUMBER_PATTERN.')\s*(.*)$/iu', $c, $m)) {
                $q = Quantity::parseNumber($m[1]);
                $unit = trim(preg_replace('/\(.*?\)/u', '', $m[2]) ?? '');
                $unit = trim($unit, ' .:,-');
                if ($q !== null && $q > 0) {
                    if ($unit === '' || preg_match('/^(servings?|portions?|personen|person|pers\.?|portion(en)?)$/iu', $unit)) {
                        return [Quantity::toInput($q), 'Portionen', $unit === '' ? 'Mengeneinheit nicht angegeben – „Portionen“ angenommen, bitte prüfen.' : null];
                    }
                    if (preg_match('/^(stück|stk\.?|pieces?)$/iu', $unit)) {
                        $unit = 'Stück';
                    }

                    return [Quantity::toInput($q), mb_substr($unit, 0, 50), null];
                }
            }
            $fallback ??= $c;
        }

        return ['1', 'Portionen', $fallback
            ? 'Rezeptmenge „'.$fallback.'“ nicht eindeutig erkannt – bitte prüfen.'
            : 'Keine Rezeptmenge angegeben – bitte prüfen.'];
    }

    /** @param array<int, array<string, mixed>> $items */
    private function groupItems(array $items): array
    {
        $groups = [['name' => null, 'items' => []]];
        foreach ($items as $it) {
            if (isset($it['__group'])) {
                $groups[] = ['name' => $it['__group'], 'items' => []];

                continue;
            }
            $groups[count($groups) - 1]['items'][] = self::itemToForm($it);
        }

        return array_values(array_filter($groups, fn ($g) => $g['items'] !== []));
    }

    /** Parser-Ergebnis in Formularfelder. */
    public static function itemToForm(array $p): array
    {
        $qty = '';
        if ($p['quantity'] !== null) {
            $qty = Quantity::toInput($p['quantity']).($p['quantity_max'] !== null ? '–'.Quantity::toInput($p['quantity_max']) : '');
        } elseif ($p['quantity_text']) {
            $qty = $p['quantity_text'];
        }

        return [
            'quantity' => $qty,
            'unit' => $p['unit'] ?? '',
            'name' => $p['name'],
            'note' => $p['note'] ?? '',
            'scalable' => (bool) $p['scalable'],
            'original_text' => $p['original_text'] ?? '',
            'uncertain' => (bool) ($p['uncertain'] ?? false),
        ];
    }

    /** @return array<int, array{body: string}> */
    private function mapInstructions(mixed $ins): array
    {
        $steps = [];
        $add = function (string $text, ?string $section = null) use (&$steps): void {
            $text = self::text($text, true);
            if ($text === '') {
                return;
            }
            if ($section !== null) {
                $text = '### '.$section."\n\n".$text;
            }
            $steps[] = ['body' => mb_substr($text, 0, 20000)];
        };

        if (is_string($ins)) {
            $plain = self::text($ins, true);
            $parts = preg_split('/\n\s*\n|\n(?=\s*\d+[.)]\s)/u', $plain) ?: [];
            if (count($parts) <= 1) {
                $parts = preg_split('/\n/u', $plain) ?: [];
            }
            foreach ($parts as $p) {
                $add(preg_replace('/^\s*\d+[.)]\s*/u', '', $p) ?? $p);
            }

            return $steps;
        }
        if (! is_array($ins)) {
            return [];
        }
        if (! array_is_list($ins)) {
            $ins = [$ins];
        }
        foreach ($ins as $item) {
            if (is_string($item)) {
                $add($item);
            } elseif (is_array($item)) {
                $type = is_array($item['@type'] ?? null) ? implode(',', $item['@type']) : (string) ($item['@type'] ?? '');
                if (stripos($type, 'HowToSection') !== false) {
                    $name = self::text($item['name'] ?? '');
                    $first = true;
                    foreach ((array) ($item['itemListElement'] ?? []) as $sub) {
                        $text = is_array($sub) ? ($sub['text'] ?? $sub['name'] ?? '') : (string) $sub;
                        $add(is_string($text) ? $text : RecipeExtractor::scalar($text), $first && $name !== '' ? $name : null);
                        $first = false;
                    }
                } else {
                    $text = $item['text'] ?? $item['name'] ?? $item['description'] ?? '';
                    $add(is_string($text) ? $text : RecipeExtractor::scalar($text));
                }
            }
        }

        return $steps;
    }

    /** @return array{0: array<string, mixed>|null, 1: string|null} */
    private function mapNutrition(mixed $n): array
    {
        if (! is_array($n)) {
            return [null, null];
        }
        $map = [
            'fatContent' => 'fat', 'saturatedFatContent' => 'saturated_fat', 'carbohydrateContent' => 'carbohydrates',
            'sugarContent' => 'sugar', 'proteinContent' => 'protein', 'fiberContent' => 'fiber', 'saltContent' => 'salt',
        ];
        $out = [];
        $cal = self::text(RecipeExtractor::scalar($n['calories'] ?? ''));
        if ($cal !== '' && preg_match('/('.Quantity::NUMBER_PATTERN.')\s*(kcal|kj|kalorien|calories|cal)?/iu', $cal, $m)) {
            $v = Quantity::parseNumber($m[1]);
            if ($v !== null) {
                if (isset($m[2]) && strtolower($m[2]) === 'kj') {
                    $out['energy_kj'] = Quantity::toInput($v);
                } else {
                    $out['energy_kcal'] = Quantity::toInput($v);
                }
                // Manche Seiten nennen beide Werte: „250 kcal / 1046 kJ“
                if (preg_match('/('.Quantity::NUMBER_PATTERN.')\s*kj/iu', $cal, $mk) && ! isset($out['energy_kj'])) {
                    $kj = Quantity::parseNumber($mk[1]);
                    if ($kj !== null) {
                        $out['energy_kj'] = Quantity::toInput($kj);
                    }
                }
            }
        }
        foreach ($map as $key => $field) {
            $raw = self::text(RecipeExtractor::scalar($n[$key] ?? ''));
            if ($raw === '') {
                continue;
            }
            if (preg_match('/('.Quantity::NUMBER_PATTERN.')\s*(mg|g)?/iu', $raw, $m)) {
                $v = Quantity::parseNumber($m[1]);
                if ($v !== null) {
                    if (isset($m[2]) && strtolower($m[2]) === 'mg') {
                        $v /= 1000;
                    }
                    $out[$field] = Quantity::toInput($v);
                }
            }
        }
        if ($out === []) {
            return [null, null];
        }
        $serving = self::text(RecipeExtractor::scalar($n['servingSize'] ?? ''));
        $basis = 'serving';
        $label = null;
        $warn = null;
        if ($serving !== '') {
            if (preg_match('/^100\s*(g|gramm)$/iu', $serving)) {
                $basis = '100g';
            } else {
                $label = mb_substr('pro '.preg_replace('/^pro\s+/iu', '', $serving), 0, 100);
            }
        } else {
            $warn = 'Die Quelle nennt keine Bezugsgröße für die Nährwerte. Nach Schema.org gelten sie üblicherweise pro Portion – bitte prüfen.';
        }

        return [array_merge(['basis' => $basis, 'basis_label' => $label], $out), $warn];
    }

    private function imageUrl(mixed $img, string $pageUrl): ?string
    {
        $candidates = [];
        $collect = function ($v) use (&$collect, &$candidates): void {
            if (is_string($v)) {
                $candidates[] = ['url' => $v, 'w' => 0];
            } elseif (is_array($v)) {
                if (array_is_list($v)) {
                    foreach ($v as $x) {
                        $collect($x);
                    }
                } elseif (isset($v['url']) || isset($v['contentUrl'])) {
                    $candidates[] = ['url' => (string) ($v['url'] ?? $v['contentUrl']), 'w' => (int) ($v['width'] ?? 0)];
                }
            }
        };
        $collect($img);
        if ($candidates === []) {
            return null;
        }
        usort($candidates, fn ($a, $b) => $b['w'] <=> $a['w']);
        $url = trim(html_entity_decode($candidates[0]['url'], ENT_QUOTES | ENT_HTML5, 'UTF-8'));
        if ($url === '' || str_starts_with($url, 'data:')) {
            return null;
        }
        $abs = SafeHttpClient::resolveRelative($pageUrl, $url);

        return preg_match('#^https?://#i', $abs) ? $abs : null;
    }

    private function author(mixed $a): string
    {
        if (is_string($a)) {
            return self::text($a);
        }
        if (is_array($a)) {
            if (array_is_list($a)) {
                return implode(', ', array_filter(array_map(fn ($x) => $this->author($x), $a)));
            }

            return self::text(RecipeExtractor::scalar($a['name'] ?? ''));
        }

        return '';
    }

    /** @return array<int, string> */
    private static function list(mixed $v): array
    {
        $items = is_array($v) ? array_map(fn ($x) => RecipeExtractor::scalar($x), $v) : (is_string($v) ? preg_split('/\s*[,;]\s*/u', $v) : []);

        return array_values(array_filter(array_map(fn ($x) => self::text((string) $x), $items ?: [])));
    }

    public static function text(mixed $v, bool $keepLines = false): string
    {
        if (! is_string($v)) {
            $v = is_scalar($v) ? (string) $v : '';
        }
        $v = html_entity_decode(html_entity_decode($v, ENT_QUOTES | ENT_HTML5, 'UTF-8'), ENT_QUOTES | ENT_HTML5, 'UTF-8');
        if ($keepLines) {
            $v = preg_replace('#<br\s*/?>|</p>|</li>#i', "\n", $v) ?? $v;
        }
        $v = strip_tags($v);
        $v = str_replace("\u{00A0}", ' ', $v);
        if ($keepLines) {
            $v = preg_replace('/[ \t]+/u', ' ', $v) ?? $v;
            $v = preg_replace('/\n\s*\n\s*\n+/u', "\n\n", $v) ?? $v;

            return trim(implode("\n", array_map('trim', explode("\n", $v))));
        }

        return trim(preg_replace('/\s+/u', ' ', $v) ?? $v);
    }
}
