<?php

namespace App\Services\Share;

use App\Models\Recipe;
use App\Support\Quantity;
use Illuminate\Http\Request;

/**
 * Auswahl beim Teilen/Drucken/PDF. Standard: Originalmenge, mit Bild,
 * mit Nährwerten, OHNE persönliche Notizen.
 */
final class ShareOptions
{
    public function __construct(
        public readonly float $target,
        public readonly bool $image = true,
        public readonly bool $notes = false,
        public readonly bool $nutrition = true,
    ) {}

    public static function fromRequest(Request $request, Recipe $recipe): self
    {
        $target = Quantity::parsePositive((string) $request->query('menge', '')) ?? $recipe->yield_quantity;
        if ($target > 100000) {
            $target = $recipe->yield_quantity;
        }

        return new self(
            target: $target,
            image: $request->query('bild', '1') !== '0',
            notes: $request->query('notizen', '0') === '1',
            nutrition: $request->query('naehrwerte', '1') !== '0',
        );
    }

    public function factor(Recipe $recipe): float
    {
        return $recipe->yield_quantity > 0 ? $this->target / $recipe->yield_quantity : 1.0;
    }

    /** @return array<string, string> */
    public function query(): array
    {
        return [
            'menge' => Quantity::toInput($this->target),
            'bild' => $this->image ? '1' : '0',
            'notizen' => $this->notes ? '1' : '0',
            'naehrwerte' => $this->nutrition ? '1' : '0',
        ];
    }
}
