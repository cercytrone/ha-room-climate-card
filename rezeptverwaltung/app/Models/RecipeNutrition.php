<?php

namespace App\Models;

use App\Support\Quantity;
use Illuminate\Database\Eloquent\Model;

class RecipeNutrition extends Model
{
    protected $table = 'recipe_nutrition';

    public const BASES = [
        'serving' => 'pro Portion / pro Einheit der Rezeptmenge',
        '100g' => 'pro 100 g',
        'recipe' => 'gesamtes Rezept',
    ];

    /** Feld => [Bezeichnung, Einheit] */
    public const FIELDS = [
        'energy_kcal' => ['Energie', 'kcal'],
        'energy_kj' => ['Energie', 'kJ'],
        'fat' => ['Fett', 'g'],
        'saturated_fat' => ['davon gesättigte Fettsäuren', 'g'],
        'carbohydrates' => ['Kohlenhydrate', 'g'],
        'sugar' => ['davon Zucker', 'g'],
        'fiber' => ['Ballaststoffe', 'g'],
        'protein' => ['Eiweiß', 'g'],
        'salt' => ['Salz', 'g'],
    ];

    protected $fillable = ['recipe_id', 'basis', 'basis_label', 'energy_kcal', 'energy_kj', 'fat', 'saturated_fat',
        'carbohydrates', 'sugar', 'protein', 'salt', 'fiber'];

    protected function casts(): array
    {
        return array_fill_keys(array_keys(self::FIELDS), 'float');
    }

    public function hasValues(): bool
    {
        foreach (array_keys(self::FIELDS) as $f) {
            if ($this->{$f} !== null) {
                return true;
            }
        }

        return false;
    }

    /**
     * Werte für die Anzeige bei gegebenem Skalierungsfaktor.
     *
     * Nur Angaben für das GESAMTE Rezept ändern sich mit der Rezeptmenge.
     * Angaben pro Portion/Einheit oder pro 100 g bleiben gleich.
     *
     * @return array{rows: array<int, array{label: string, value: string, unit: string}>, basis: string, scaled: bool, hint: string|null}
     */
    public function present(float $factor = 1.0): array
    {
        $scaled = $this->basis === 'recipe' && abs($factor - 1.0) > 1e-9;
        $f = $this->basis === 'recipe' ? $factor : 1.0;
        $rows = [];
        foreach (self::FIELDS as $field => [$label, $unit]) {
            if ($this->{$field} !== null) {
                $rows[] = ['label' => $label, 'value' => Quantity::format($this->{$field} * $f), 'unit' => $unit, 'field' => $field, 'raw' => $this->{$field}];
            }
        }
        $basis = $this->basisText();
        $hint = match ($this->basis) {
            'recipe' => $scaled ? 'Für die gewählte Rezeptmenge umgerechnet.' : null,
            '100g' => 'Bezogen auf 100 g – unabhängig von der Rezeptmenge.',
            default => 'Bezogen auf eine Portion bzw. Einheit – unabhängig von der Rezeptmenge.',
        };
        if ($this->basis === 'recipe' && $scaled) {
            $basis = 'gesamtes Rezept (angepasste Menge)';
        }

        return ['rows' => $rows, 'basis' => $basis, 'scaled' => $scaled, 'hint' => $hint];
    }

    public function basisText(): string
    {
        $base = self::BASES[$this->basis] ?? $this->basis;
        if ($this->basis === 'serving') {
            $base = 'pro Portion';
        }

        return $this->basis_label ? $this->basis_label : $base;
    }
}
