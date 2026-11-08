<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Recipe;
use App\Models\RecipeType;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    public function index()
    {
        return view('categories.index', [
            'tree' => Category::flatTree(),
            'types' => RecipeType::ordered()->withCount('recipes')->get(),
            'tags' => Tag::query()->withCount('recipes')->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'parent_id' => ['nullable', 'integer', Rule::exists('categories', 'id')],
        ], [], ['name' => 'Name', 'parent_id' => 'Übergeordnete Kategorie']);
        $name = trim($data['name']);
        if (Category::query()->where('parent_id', $data['parent_id'] ?? null)->where('name', $name)->exists()) {
            return back()->withInput()->withErrors(['name' => 'Eine Kategorie mit diesem Namen gibt es an dieser Stelle bereits.']);
        }
        $max = (int) Category::query()->where('parent_id', $data['parent_id'] ?? null)->max('sort_order');
        Category::create(['name' => $name, 'parent_id' => $data['parent_id'] ?? null, 'sort_order' => $max + 1]);

        return back()->with('status', 'Kategorie „'.$name.'“ angelegt.');
    }

    /** Umbenennen und/oder verschieben (anderer übergeordneter Kategorie zuordnen). */
    public function update(Request $request, Category $category)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'parent_id' => ['nullable', 'integer', Rule::exists('categories', 'id')],
        ], [], ['name' => 'Name', 'parent_id' => 'Übergeordnete Kategorie']);
        $parentId = $data['parent_id'] ?? null;
        if ($parentId !== null && in_array((int) $parentId, Category::descendantIds($category->id), true)) {
            return back()->withErrors(['parent_id' => 'Eine Kategorie kann nicht in sich selbst oder eine ihrer Unterkategorien verschoben werden.']);
        }
        $name = trim($data['name']);
        if (Category::query()->where('parent_id', $parentId)->where('name', $name)->whereKeyNot($category->id)->exists()) {
            return back()->withErrors(['name' => 'Eine Kategorie mit diesem Namen gibt es an dieser Stelle bereits.']);
        }
        $renamed = $category->name !== $name;
        if ($category->parent_id !== ($parentId === null ? null : (int) $parentId)) {
            $category->sort_order = (int) Category::query()->where('parent_id', $parentId)->max('sort_order') + 1;
        }
        $category->fill(['name' => $name, 'parent_id' => $parentId])->save();
        if ($renamed) {
            Recipe::refreshSearchTextFor(Recipe::query()->whereHas('categories', fn ($q) => $q->whereKey($category->id)));
        }

        return back()->with('status', 'Kategorie gespeichert.');
    }

    /** Reihenfolge unter Geschwistern ändern (hoch/runter). */
    public function move(Request $request, Category $category)
    {
        $dir = $request->input('richtung') === 'hoch' ? -1 : 1;
        $siblings = Category::query()->where('parent_id', $category->parent_id)->orderBy('sort_order')->orderBy('name')->get()->values();
        $idx = $siblings->search(fn ($c) => $c->id === $category->id);
        $swap = $siblings->get($idx + $dir);
        if ($swap) {
            DB::transaction(function () use ($siblings, $idx, $dir) {
                $ordered = $siblings->all();
                [$ordered[$idx], $ordered[$idx + $dir]] = [$ordered[$idx + $dir], $ordered[$idx]];
                foreach ($ordered as $i => $c) {
                    $c->update(['sort_order' => $i + 1]);
                }
            });
        }

        return back();
    }

    /** Bestätigungsseite: erklärt, was mit Unterkategorien und Rezeptzuordnungen geschieht. */
    public function confirmDelete(Category $category)
    {
        $descendants = array_values(array_diff(Category::descendantIds($category->id), [$category->id]));

        return view('categories.delete', [
            'category' => $category,
            'childCount' => $category->children()->count(),
            'descendantCount' => count($descendants),
            'recipeCount' => $category->recipes()->count(),
            'descendantRecipeCount' => DB::table('category_recipe')->whereIn('category_id', $descendants)->distinct()->count('recipe_id'),
            'parent' => $category->parent,
        ]);
    }

    public function destroy(Request $request, Category $category)
    {
        $data = $request->validate([
            'children' => ['required', Rule::in(['move_up', 'delete'])],
            'reassign' => ['nullable', 'boolean'],
        ]);
        $affectedRecipeIds = [];
        DB::transaction(function () use ($category, $data, &$affectedRecipeIds) {
            $parentId = $category->parent_id;
            if ($data['children'] === 'delete') {
                $ids = Category::descendantIds($category->id);
            } else {
                // Unterkategorien eine Ebene nach oben verschieben
                foreach ($category->children as $child) {
                    $name = $child->name;
                    if (Category::query()->where('parent_id', $parentId)->where('name', $name)->exists()) {
                        $name .= ' (aus '.$category->name.')';
                    }
                    $child->update(['parent_id' => $parentId, 'name' => mb_substr($name, 0, 100)]);
                }
                $ids = [$category->id];
            }
            $affectedRecipeIds = DB::table('category_recipe')->whereIn('category_id', $ids)->pluck('recipe_id')->unique()->all();
            if (! empty($data['reassign']) && $parentId) {
                foreach ($affectedRecipeIds as $rid) {
                    DB::table('category_recipe')->insertOrIgnore(['category_id' => $parentId, 'recipe_id' => $rid]);
                }
            }
            // Zuordnungen entfernen, Rezepte bleiben erhalten
            DB::table('category_recipe')->whereIn('category_id', $ids)->delete();
            // Von unten nach oben löschen (Fremdschlüssel RESTRICT)
            foreach (array_reverse($ids) as $id) {
                Category::query()->whereKey($id)->delete();
            }
        });
        Recipe::refreshSearchTextFor(Recipe::query()->whereIn('id', $affectedRecipeIds));

        return redirect()->route('categories.index')->with('status', 'Kategorie gelöscht. Betroffene Rezepte ('.count($affectedRecipeIds).') bleiben erhalten.');
    }
}
