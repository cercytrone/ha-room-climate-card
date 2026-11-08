<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\RecipeType;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class RecipeTypeController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate(['name' => ['required', 'string', 'max:100', Rule::unique('recipe_types', 'name')]], [], ['name' => 'Rezeptart']);
        RecipeType::create(['name' => trim($data['name']), 'sort_order' => (int) RecipeType::max('sort_order') + 1]);

        return back()->with('status', 'Rezeptart angelegt.');
    }

    public function update(Request $request, RecipeType $type)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:100', Rule::unique('recipe_types', 'name')->ignore($type->id)],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:100000'],
        ], [], ['name' => 'Rezeptart']);
        $type->update(['name' => trim($data['name']), 'sort_order' => $data['sort_order'] ?? $type->sort_order]);
        Recipe::refreshSearchTextFor(Recipe::query()->where('recipe_type_id', $type->id));

        return back()->with('status', 'Rezeptart gespeichert.');
    }

    public function destroy(RecipeType $type)
    {
        $ids = Recipe::query()->where('recipe_type_id', $type->id)->pluck('id');
        $type->delete(); // Rezepte bleiben, recipe_type_id wird NULL
        Recipe::refreshSearchTextFor(Recipe::query()->whereIn('id', $ids));

        return back()->with('status', 'Rezeptart gelöscht. '.$ids->count().' Rezept(e) haben jetzt keine Rezeptart mehr.');
    }
}
