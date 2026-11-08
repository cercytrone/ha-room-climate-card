<?php

namespace App\Services\Import;

/**
 * Findet strukturierte Rezeptdaten (Schema.org Recipe) in einer HTML-Seite.
 * Reihenfolge: JSON-LD, dann Microdata. Fremde Inhalte werden nur geparst,
 * niemals ausgeführt.
 */
final class RecipeExtractor
{
    /** @return array<int, array<string, mixed>> Liste von Schema.org-Recipe-Objekten */
    public function extract(string $html): array
    {
        $recipes = $this->fromJsonLd($html);
        if ($recipes === []) {
            $recipes = $this->fromMicrodata($html);
        }

        // Dubletten (gleicher Name) entfernen
        $seen = [];
        $out = [];
        foreach ($recipes as $r) {
            $key = mb_strtolower(trim((string) self::scalar($r['name'] ?? ''))).'|'.count((array) ($r['recipeIngredient'] ?? $r['ingredients'] ?? []));
            if (isset($seen[$key])) {
                continue;
            }
            $seen[$key] = true;
            $out[] = $r;
        }

        return $out;
    }

    /** @return array<int, array<string, mixed>> */
    private function fromJsonLd(string $html): array
    {
        if (! preg_match_all('#<script[^>]+type\s*=\s*["\']?application/ld\+json["\']?[^>]*>(.*?)</script>#is', $html, $m)) {
            return [];
        }
        $found = [];
        foreach ($m[1] as $raw) {
            $json = trim($raw);
            $json = preg_replace('/^\s*<!--|-->\s*$/', '', $json) ?? $json;
            $data = json_decode($json, true, 64);
            if ($data === null) {
                // Häufige Fehler: Steuerzeichen/Zeilenumbrüche in Strings
                $clean = preg_replace('/[\x00-\x1F]+/', ' ', $json) ?? $json;
                $data = json_decode($clean, true, 64);
            }
            if (is_array($data)) {
                $this->collect($data, $found, 0);
            }
        }

        return $found;
    }

    /** @param array<int, array<string, mixed>> $found */
    private function collect(mixed $node, array &$found, int $depth): void
    {
        if (! is_array($node) || $depth > 12) {
            return;
        }
        if (array_is_list($node)) {
            foreach ($node as $child) {
                $this->collect($child, $found, $depth + 1);
            }

            return;
        }
        $type = $node['@type'] ?? null;
        $types = is_array($type) ? $type : [$type];
        foreach ($types as $t) {
            if (is_string($t) && preg_match('#(^|/|:)Recipe$#i', $t)) {
                $found[] = $node;

                return;
            }
        }
        foreach (['@graph', 'mainEntity', 'mainEntityOfPage', 'itemListElement', 'item', 'hasPart'] as $key) {
            if (isset($node[$key]) && is_array($node[$key])) {
                $this->collect($node[$key], $found, $depth + 1);
            }
        }
    }

    /** Einfache Microdata-Auswertung (itemtype=schema.org/Recipe). @return array<int, array<string, mixed>> */
    private function fromMicrodata(string $html): array
    {
        if (! preg_match('#itemtype\s*=\s*["\']https?://schema\.org/Recipe["\']#i', $html)) {
            return [];
        }
        $prev = libxml_use_internal_errors(true);
        $doc = new \DOMDocument;
        $doc->loadHTML('<?xml encoding="UTF-8">'.$html, LIBXML_NONET | LIBXML_NOERROR | LIBXML_NOWARNING);
        libxml_clear_errors();
        libxml_use_internal_errors($prev);
        $xp = new \DOMXPath($doc);
        $out = [];
        foreach ($xp->query('//*[@itemscope][contains(@itemtype, "schema.org/Recipe")]') ?: [] as $scope) {
            $r = ['@type' => 'Recipe'];
            $props = $xp->query('.//*[@itemprop]', $scope) ?: [];
            foreach ($props as $el) {
                /** @var \DOMElement $el */
                $prop = $el->getAttribute('itemprop');
                $value = $el->hasAttribute('content') ? $el->getAttribute('content')
                    : ($el->hasAttribute('datetime') ? $el->getAttribute('datetime')
                    : (in_array(strtolower($el->tagName), ['img', 'source'], true) ? $el->getAttribute('src')
                    : (strtolower($el->tagName) === 'a' && in_array($prop, ['image', 'url'], true) ? $el->getAttribute('href')
                    : trim($el->textContent))));
                $value = trim(preg_replace('/\s+/u', ' ', $value) ?? $value);
                if ($value === '') {
                    continue;
                }
                if (in_array($prop, ['recipeIngredient', 'ingredients', 'recipeInstructions', 'keywords', 'image', 'recipeCategory'], true)) {
                    $r[$prop][] = $value;
                } elseif (! isset($r[$prop])) {
                    $r[$prop] = $value;
                }
            }
            $out[] = $r;
        }

        return $out;
    }

    public static function scalar(mixed $v): string
    {
        if (is_array($v)) {
            if (isset($v['name'])) {
                return self::scalar($v['name']);
            }
            if (isset($v['@value'])) {
                return self::scalar($v['@value']);
            }
            $first = reset($v);

            return $first === false ? '' : self::scalar($first);
        }

        return is_scalar($v) ? (string) $v : '';
    }
}
