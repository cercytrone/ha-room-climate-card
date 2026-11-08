<?php

namespace App\Models;

use App\Support\Quantity;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ingredient extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'recipe_id', 'ingredient_group_id', 'position', 'quantity', 'quantity_max', 'quantity_text',
        'unit', 'name', 'note', 'scalable', 'original_text',
    ];

    protected function casts(): array
    {
        return [
            'quantity' => 'float',
            'quantity_max' => 'float',
            'scalable' => 'boolean',
        ];
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(IngredientGroup::class, 'ingredient_group_id');
    }

    /** Menge (skaliert) für die Anzeige, z. B. „750“ oder „2–3“ oder „etwas“. */
    public function displayQuantity(float $factor = 1.0): string
    {
        if ($this->quantity === null) {
            return (string) ($this->quantity_text ?? '');
        }
        $f = $this->scalable ? $factor : 1.0;

        return Quantity::formatRange($this->quantity * $f, $this->quantity_max !== null ? $this->quantity_max * $f : null, $this->unit);
    }

    /** Ganze Zeile als Text. */
    public function toLine(float $factor = 1.0): string
    {
        $parts = array_filter([$this->displayQuantity($factor), $this->unit, $this->name], fn ($p) => $p !== null && $p !== '');
        $line = implode(' ', $parts);
        if ($this->note) {
            // „Salz nach Geschmack“ statt „Salz, nach Geschmack“
            $line .= $this->noteSeparator().$this->note;
        }

        return $line;
    }

    /** „Salz nach Geschmack“ statt „Salz, nach Geschmack“. */
    public function noteSeparator(): string
    {
        return preg_match('/^(nach|zum|zur|für|n\. ?b\.|optional)\b/iu', (string) $this->note) ? ' ' : ', ';
    }

    /** Daten für die clientseitige Skalierung. @return array<string, mixed> */
    public function toScalerArray(): array
    {
        return [
            'q' => $this->quantity,
            'qmax' => $this->quantity_max,
            'qtext' => $this->quantity_text,
            'unit' => $this->unit,
            'scalable' => $this->scalable,
        ];
    }
}
