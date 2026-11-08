<?php

namespace App\Services;

use App\Models\Ingredient;
use App\Models\Recipe;
use App\Models\RecipeNutrition;
use App\Models\RecipeType;
use App\Models\Tag;
use App\Models\User;
use App\Support\Quantity;
use Illuminate\Support\Facades\DB;

/**
 * Speichert validierte Rezeptdaten inkl. Zutatengruppen, Schritten, Nährwerten,
 * Kategorien und Schlagwörtern in einer Transaktion.
 */
class RecipeSaver
{
    public function save(User $user, array $data, ?Recipe $recipe = null): Recipe
    {
        return DB::transaction(function () use ($user, $data, $recipe) {
            $recipe ??= new Recipe(['user_id' => $user->id]);
            $recipe->user_id ??= $user->id;

            $typeId = $data['recipe_type_id'] ?? null;
            if (! empty($data['new_type'])) {
                $name = mb_substr(trim($data['new_type']), 0, 100);
                $typeId = RecipeType::query()->where('name', $name)->value('id')
                    ?? RecipeType::create(['name' => $name, 'sort_order' => (int) RecipeType::max('sort_order') + 1])->id;
            }

            $recipe->fill([
                'title' => trim($data['title']),
                'description' => self::nullIfEmpty($data['description'] ?? null),
                'recipe_type_id' => $typeId,
                'source_url' => self::nullIfEmpty($data['source_url'] ?? null),
                'source_text' => self::nullIfEmpty($data['source_text'] ?? null),
                'author' => self::nullIfEmpty($data['author'] ?? null),
                'yield_quantity' => (float) $data['yield_quantity'],
                'yield_unit' => trim($data['yield_unit']),
                'prep_minutes' => $data['prep_minutes'] ?? null,
                'rest_minutes' => $data['rest_minutes'] ?? null,
                'cook_minutes' => $data['cook_minutes'] ?? null,
                'total_minutes' => $data['total_minutes'] ?? null,
                'rating' => $data['rating'] ?? null,
                'is_favorite' => (bool) ($data['is_favorite'] ?? false),
                'notes' => self::nullIfEmpty($data['notes'] ?? null),
            ]);
            $recipe->save();

            $recipe->categories()->sync($data['categories'] ?? []);
            $recipe->tags()->sync(Tag::idsFor(self::splitTags($data['tags'] ?? '')));

            // Zutaten und Schritte vollständig ersetzen (einfach und nachvollziehbar)
            $recipe->ingredients()->delete();
            $recipe->ingredientGroups()->delete();
            $gPos = 0;
            foreach ($data['groups'] ?? [] as $group) {
                $items = $group['items'] ?? [];
                if ($items === [] && empty($group['name'])) {
                    continue;
                }
                $g = $recipe->ingredientGroups()->create([
                    'name' => self::nullIfEmpty($group['name'] ?? null),
                    'position' => $gPos++,
                ]);
                $iPos = 0;
                foreach ($items as $item) {
                    Ingredient::create(['recipe_id' => $recipe->id, 'ingredient_group_id' => $g->id, 'position' => $iPos++]
                        + self::ingredientAttributes($item));
                }
            }

            $recipe->steps()->delete();
            $sPos = 0;
            foreach ($data['steps'] ?? [] as $step) {
                $body = trim((string) ($step['body'] ?? ''));
                if ($body !== '') {
                    $recipe->steps()->create(['position' => $sPos++, 'body' => $body]);
                }
            }

            $this->saveNutrition($recipe, $data['nutrition'] ?? null);

            $recipe->unsetRelations();
            $recipe->refreshSearchText();

            return $recipe;
        });
    }

    /** Wandelt eine Formularzeile in Datenbankattribute. */
    public static function ingredientAttributes(array $item): array
    {
        $qtyRaw = trim((string) ($item['quantity'] ?? ''));
        $quantity = null;
        $max = null;
        $text = null;
        if ($qtyRaw !== '') {
            $range = Quantity::parseRange($qtyRaw);
            if ($range !== null) {
                [$quantity, $max] = $range;
            } else {
                $text = mb_substr($qtyRaw, 0, 60);
            }
        }
        $scalable = array_key_exists('scalable', $item) ? (bool) $item['scalable'] : true;

        return [
            'quantity' => $quantity,
            'quantity_max' => $max,
            'quantity_text' => $text,
            'unit' => self::nullIfEmpty($item['unit'] ?? null),
            'name' => mb_substr(trim((string) $item['name']), 0, 255),
            'note' => self::nullIfEmpty($item['note'] ?? null),
            'scalable' => $quantity !== null && $scalable,
            'original_text' => self::nullIfEmpty($item['original_text'] ?? null),
        ];
    }

    private function saveNutrition(Recipe $recipe, ?array $n): void
    {
        $values = [];
        foreach (array_keys(RecipeNutrition::FIELDS) as $f) {
            $v = $n[$f] ?? null;
            $values[$f] = ($v === null || $v === '') ? null : (float) $v;
        }
        if (array_filter($values, fn ($v) => $v !== null) === []) {
            $recipe->nutrition()->delete();

            return;
        }
        $recipe->nutrition()->updateOrCreate(['recipe_id' => $recipe->id], $values + [
            'basis' => in_array($n['basis'] ?? null, array_keys(RecipeNutrition::BASES), true) ? $n['basis'] : 'serving',
            'basis_label' => self::nullIfEmpty($n['basis_label'] ?? null),
        ]);
    }

    /** @return array<int, string> */
    public static function splitTags(string|array|null $tags): array
    {
        if (is_array($tags)) {
            return $tags;
        }

        return array_values(array_filter(array_map('trim', preg_split('/[,;\n]/u', (string) $tags) ?: [])));
    }

    private static function nullIfEmpty(mixed $v): ?string
    {
        if ($v === null) {
            return null;
        }
        $v = trim((string) $v);

        return $v === '' ? null : $v;
    }
}
