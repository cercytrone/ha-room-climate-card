<?php

namespace App\Services\Shopping;

use App\Models\Recipe;
use App\Models\ShoppingList;
use App\Models\ShoppingListItem;
use App\Models\ShoppingListItemSource;
use App\Models\ShoppingListRecipe;
use App\Support\Quantity;
use App\Support\Units;
use Illuminate\Support\Facades\DB;

/**
 * Baut Einkaufslisten aus Rezepten.
 *
 * Regeln:
 * - Es werden nur Zutaten mit (nach Normalisierung) GLEICHEM Namen zusammengeführt.
 * - Mengen werden nur innerhalb derselben Dimension umgerechnet (mg/g/kg bzw. ml/cl/dl/l)
 *   oder bei identischer Einheit addiert. g und ml werden nie zusammengeführt.
 * - Gleichnamige Einträge mit unvereinbaren Einheiten bleiben getrennt und werden markiert.
 * - Manuell angelegte/bearbeitete Einträge werden nicht automatisch neu berechnet.
 * - Änderungen an der Liste verändern nie ein Rezept.
 */
class ShoppingListBuilder
{
    public function __construct(private readonly AreaGuesser $areas) {}

    /** Prüft, ob ein Rezept bereits in der Liste ist. */
    public function existingSelection(ShoppingList $list, Recipe $recipe): ?ShoppingListRecipe
    {
        return $list->selections()->where('recipe_id', $recipe->id)->reorder()->latest('id')->first();
    }

    /** Nimmt ein Rezept (zusätzlich) in die Liste auf. */
    public function addRecipe(ShoppingList $list, Recipe $recipe, float $target): ShoppingListRecipe
    {
        return DB::transaction(function () use ($list, $recipe, $target) {
            $selection = $list->selections()->create([
                'recipe_id' => $recipe->id,
                'recipe_title' => $recipe->title,
                'target_quantity' => $target,
                'yield_unit' => $recipe->yield_unit,
            ]);
            $this->addIngredients($list, $selection, $recipe, $target);
            $list->touch();

            return $selection;
        });
    }

    /** Ändert die Zielmenge einer vorhandenen Auswahl und berechnet deren Zutaten neu. */
    public function updateSelection(ShoppingListRecipe $selection, float $target): void
    {
        DB::transaction(function () use ($selection, $target) {
            $list = $selection->shoppingList;
            $this->detachSources($selection);
            $selection->update(['target_quantity' => $target]);
            $recipe = $selection->recipe;
            if ($recipe) {
                $selection->update(['recipe_title' => $recipe->title, 'yield_unit' => $recipe->yield_unit]);
                $this->addIngredients($list, $selection, $recipe, $target);
            }
            $list->touch();
        });
    }

    public function removeSelection(ShoppingListRecipe $selection): void
    {
        DB::transaction(function () use ($selection) {
            $this->detachSources($selection);
            $selection->delete();
        });
    }

    /** Entfernt die Beiträge einer Auswahl aus automatisch berechneten Einträgen. */
    private function detachSources(ShoppingListRecipe $selection): void
    {
        $itemIds = $selection->sources()->pluck('shopping_list_item_id')->unique();
        $selection->sources()->delete();
        foreach (ShoppingListItem::query()->whereIn('id', $itemIds)->get() as $item) {
            if ($item->is_manual) {
                continue; // manuell bearbeitete Einträge bleiben, wie sie sind
            }
            if ($item->sources()->count() === 0) {
                $item->delete();
            } else {
                $this->recalculate($item);
            }
        }
    }

    private function addIngredients(ShoppingList $list, ShoppingListRecipe $selection, Recipe $recipe, float $target): void
    {
        $factor = $recipe->yield_quantity > 0 ? $target / $recipe->yield_quantity : 1.0;
        $recipe->loadMissing('ingredients');
        $position = (int) $list->items()->max('position');

        foreach ($recipe->ingredients as $ing) {
            $name = trim($ing->name);
            if ($name === '') {
                continue;
            }
            $unit = $ing->unit !== null ? trim($ing->unit) : null;
            $dimension = Units::dimension($unit);
            $qty = null;
            $review = null;
            if ($ing->quantity !== null) {
                $f = $ing->scalable ? $factor : 1.0;
                // Bei Bereichen (2–3) wird die Obergrenze verwendet und der Eintrag markiert
                $qty = ($ing->quantity_max ?? $ing->quantity) * $f;
                if ($ing->quantity_max !== null) {
                    $review = 'Bereichsangabe im Rezept ('.$ing->displayQuantity($f).' '.($unit ?? '').'), Obergrenze übernommen.';
                }
            }

            if ($qty !== null && $dimension !== null) {
                $mergeKey = AreaGuesser::key($name).'|'.$dimension;
                $sourceQty = Units::toBase($qty, $unit);
                $sourceUnit = $dimension === 'mass' ? 'g' : 'ml';
            } elseif ($qty !== null) {
                $mergeKey = AreaGuesser::key($name).'|unit:'.mb_strtolower(Units::canonical($unit) ?? '');
                $sourceQty = $qty;
                $sourceUnit = $unit;
            } else {
                $mergeKey = AreaGuesser::key($name).'|none';
                $sourceQty = null;
                $sourceUnit = null;
            }
            if ($ing->original_text && $ing->quantity === null && $ing->quantity_text === null && preg_match('/\d/', $ing->original_text)) {
                $review = 'Menge im Rezept nicht eindeutig: „'.$ing->original_text.'“';
            }

            $item = $list->items()->where('merge_key', $mergeKey)->where('is_manual', false)->first();
            if (! $item) {
                $item = $list->items()->create([
                    'name' => $name,
                    'quantity_text' => $qty === null ? ($ing->quantity_text ?? $ing->note) : null,
                    'note' => null,
                    'area' => $this->areas->guess($name),
                    'merge_key' => $mergeKey,
                    'is_checked' => false,
                    'is_manual' => false,
                    'review_reason' => $review,
                    'position' => ++$position,
                ]);
            } elseif ($review && ! $item->review_reason) {
                $item->review_reason = $review;
            }
            if ($item->is_checked && $qty !== null) {
                // Neue Menge kommt hinzu: als noch nicht gekauft markieren
                $item->is_checked = false;
            }
            $item->save();

            ShoppingListItemSource::create([
                'shopping_list_item_id' => $item->id,
                'shopping_list_recipe_id' => $selection->id,
                'quantity' => $sourceQty,
                'unit' => $sourceUnit,
                'original_text' => $ing->toLine($ing->scalable ? $factor : 1.0),
            ]);
            $this->recalculate($item);
        }
        $this->flagConflicts($list);
    }

    /** Menge eines automatisch berechneten Eintrags aus seinen Quellen neu ermitteln. */
    public function recalculate(ShoppingListItem $item): void
    {
        if ($item->is_manual) {
            return;
        }
        $sources = $item->sources()->get();
        [, $kind] = array_pad(explode('|', (string) $item->merge_key, 2), 2, 'none');
        if ($kind === 'mass' || $kind === 'volume') {
            $sum = $sources->sum(fn ($s) => (float) $s->quantity);
            [$value, $unit] = Units::fromBase($sum, $kind);
            $item->quantity = round($value, 4);
            $item->unit = $unit;
            $item->quantity_text = null;
        } elseif (str_starts_with($kind, 'unit:')) {
            $item->quantity = round($sources->sum(fn ($s) => (float) $s->quantity), 4);
            $item->unit = $sources->first()?->unit;
            $item->quantity_text = null;
        } else {
            $item->quantity = null;
            $item->unit = null;
        }
        $item->save();
    }

    /** Markiert gleichnamige Einträge, die wegen unvereinbarer Einheiten getrennt bleiben. */
    public function flagConflicts(ShoppingList $list): void
    {
        $items = $list->items()->where('is_manual', false)->get();
        $byName = $items->groupBy(fn ($i) => explode('|', (string) $i->merge_key)[0]);
        foreach ($byName as $group) {
            $withQty = $group->filter(fn ($i) => $i->quantity !== null);
            if ($withQty->count() > 1) {
                foreach ($withQty as $i) {
                    $others = $withQty->where('id', '!=', $i->id)->map(fn ($o) => trim(Quantity::format($o->quantity, $o->unit).' '.$o->unit))->implode(', ');
                    $reason = 'Gleiche Zutat mit anderer Einheit in der Liste ('.$others.') – nicht automatisch zusammengeführt.';
                    if ($i->review_reason !== $reason && ! str_starts_with((string) $i->review_reason, 'Bereichsangabe') && ! str_starts_with((string) $i->review_reason, 'Menge im Rezept')) {
                        $i->update(['review_reason' => $reason]);
                    }
                }
            } else {
                foreach ($group as $i) {
                    if (str_starts_with((string) $i->review_reason, 'Gleiche Zutat mit anderer Einheit')) {
                        $i->update(['review_reason' => null]);
                    }
                }
            }
        }
    }

    /** Liste als Text zum Teilen. */
    public function toText(ShoppingList $list, bool $includeChecked = false): string
    {
        $list->loadMissing(['items', 'selections']);
        $lines = [$list->name, str_repeat('=', mb_strlen($list->name)), ''];
        $items = $list->items->filter(fn ($i) => $includeChecked || ! $i->is_checked);
        if ($list->group_by_area) {
            foreach ($items->groupBy(fn ($i) => $i->area ?: 'Sonstiges')->sortKeys() as $area => $group) {
                $lines[] = $area.':';
                foreach ($group as $i) {
                    $lines[] = '☐ '.$i->toLine();
                }
                $lines[] = '';
            }
        } else {
            foreach ($items as $i) {
                $lines[] = '☐ '.$i->toLine();
            }
            $lines[] = '';
        }
        if ($list->selections->isNotEmpty()) {
            $lines[] = 'Für: '.$list->selections->map->label()->implode('; ');
        }

        return trim(implode("\n", $lines));
    }
}
