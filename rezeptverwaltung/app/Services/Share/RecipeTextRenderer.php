<?php

namespace App\Services\Share;

use App\Models\Recipe;
use App\Support\Markdown;
use App\Support\Quantity;

/** Rezept als einfacher Text (für E-Mail, WhatsApp, Zwischenablage). */
final class RecipeTextRenderer
{
    public function render(Recipe $recipe, ShareOptions $o): string
    {
        $recipe->loadMissing(['ingredientGroups.ingredients', 'steps', 'nutrition', 'type']);
        $factor = $o->factor($recipe);
        $out = [];
        $out[] = $recipe->title;
        $out[] = str_repeat('=', min(60, mb_strlen($recipe->title)));
        if ($recipe->description) {
            $out[] = Markdown::toPlainText($recipe->description);
        }
        $out[] = '';
        $out[] = 'Menge: '.Quantity::format($o->target).' '.$recipe->yield_unit
            .(abs($factor - 1) > 1e-9 ? ' (Original: '.Quantity::format($recipe->yield_quantity).' '.$recipe->yield_unit.')' : '');
        foreach ($recipe->timeRows() as $row) {
            $out[] = $row['label'].': '.$row['value'];
        }
        $out[] = '';
        $out[] = 'ZUTATEN';
        foreach ($recipe->ingredientGroups as $group) {
            if ($group->name) {
                $out[] = '';
                $out[] = $group->name.':';
            }
            foreach ($group->ingredients as $ing) {
                $out[] = '- '.$ing->toLine($factor);
            }
        }
        $out[] = '';
        $out[] = 'ZUBEREITUNG';
        foreach ($recipe->steps as $i => $step) {
            $out[] = ($i + 1).'. '.Markdown::toPlainText($step->body);
        }
        if ($o->nutrition && $recipe->nutrition && $recipe->nutrition->hasValues()) {
            $n = $recipe->nutrition->present($factor);
            $out[] = '';
            $out[] = 'NÄHRWERTE ('.$n['basis'].')';
            foreach ($n['rows'] as $row) {
                $out[] = $row['label'].': '.$row['value'].' '.$row['unit'];
            }
        }
        if ($o->notes && $recipe->notes) {
            $out[] = '';
            $out[] = 'NOTIZEN';
            $out[] = Markdown::toPlainText($recipe->notes);
        }
        $source = $this->sourceLine($recipe);
        if ($source) {
            $out[] = '';
            $out[] = $source;
        }

        return trim(implode("\n", $out))."\n";
    }

    public function sourceLine(Recipe $recipe): ?string
    {
        $parts = [];
        if ($recipe->source_text) {
            $parts[] = $recipe->source_text;
        }
        if ($recipe->source_url) {
            $parts[] = $recipe->source_url;
        }
        $line = $parts ? 'Quelle: '.implode(' – ', $parts) : null;
        if ($recipe->author) {
            $line = ($line ? $line."\n" : '').'Urheber: '.$recipe->author;
        }

        return $line;
    }
}
