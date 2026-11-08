<?php

namespace App\Http\Controllers;

use App\Models\ShoppingList;
use App\Models\ShoppingListItem;
use App\Services\Shopping\AreaGuesser;
use App\Support\Quantity;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ShoppingListItemController extends Controller
{
    public function store(Request $request, ShoppingList $list, AreaGuesser $areas)
    {
        $this->authorize('update', $list);
        $data = $this->validated($request);
        [$q, $qt] = $this->quantity($data['quantity'] ?? null);
        $list->items()->create([
            'name' => trim($data['name']),
            'quantity' => $q,
            'quantity_text' => $qt,
            'unit' => $data['unit'] ?? null,
            'note' => $data['note'] ?? null,
            'area' => $data['area'] ?? $areas->guess($data['name']),
            'is_manual' => true,
            'position' => (int) $list->items()->max('position') + 1,
        ]);

        return back()->with('status', '„'.$data['name'].'“ hinzugefügt.');
    }

    public function update(Request $request, ShoppingListItem $item, AreaGuesser $areas)
    {
        $this->authorize('update', $item->shoppingList);
        $data = $this->validated($request);
        [$q, $qt] = $this->quantity($data['quantity'] ?? null);
        if (($data['area'] ?? null) !== $item->area) {
            $areas->remember($data['name'], $data['area'] ?? null);
        }
        // Bearbeitete Einträge werden nicht mehr automatisch neu berechnet
        $item->update([
            'name' => trim($data['name']),
            'quantity' => $q,
            'quantity_text' => $qt,
            'unit' => $data['unit'] ?? null,
            'note' => $data['note'] ?? null,
            'area' => $data['area'] ?? null,
            'is_manual' => true,
            'review_reason' => null,
        ]);

        return back()->with('status', 'Eintrag gespeichert.');
    }

    public function toggle(Request $request, ShoppingListItem $item)
    {
        $this->authorize('update', $item->shoppingList);
        $item->update(['is_checked' => $request->has('checked') ? $request->boolean('checked') : ! $item->is_checked]);
        if ($request->expectsJson()) {
            return response()->json(['checked' => $item->is_checked]);
        }

        return back();
    }

    public function destroy(ShoppingListItem $item)
    {
        $this->authorize('update', $item->shoppingList);
        $item->delete();

        return back()->with('status', 'Eintrag entfernt.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'quantity' => ['nullable', 'string', 'max:60'],
            'unit' => ['nullable', 'string', 'max:40'],
            'note' => ['nullable', 'string', 'max:255'],
            'area' => ['nullable', 'string', Rule::in(AreaGuesser::AREAS)],
        ], [], ['name' => 'Bezeichnung', 'quantity' => 'Menge', 'unit' => 'Einheit', 'note' => 'Notiz', 'area' => 'Einkaufsbereich']);
    }

    /** @return array{0: float|null, 1: string|null} */
    private function quantity(?string $raw): array
    {
        $raw = trim((string) $raw);
        if ($raw === '') {
            return [null, null];
        }
        $n = Quantity::parseNumber($raw);

        return $n !== null ? [$n, null] : [null, mb_substr($raw, 0, 60)];
    }
}
