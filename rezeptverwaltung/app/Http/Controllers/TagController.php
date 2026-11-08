<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TagController extends Controller
{
    public function update(Request $request, Tag $tag)
    {
        $data = $request->validate(['name' => ['required', 'string', 'max:100']], [], ['name' => 'Schlagwort']);
        $name = trim($data['name']);
        $existing = Tag::query()->where('name', $name)->whereKeyNot($tag->id)->first();
        $ids = $tag->recipes()->pluck('recipes.id');
        if ($existing) {
            // Zusammenführen
            DB::transaction(function () use ($tag, $existing, $ids) {
                foreach ($ids as $rid) {
                    DB::table('recipe_tag')->insertOrIgnore(['recipe_id' => $rid, 'tag_id' => $existing->id]);
                }
                $tag->delete();
            });
            $msg = 'Schlagwort mit „'.$existing->name.'“ zusammengeführt.';
        } else {
            $tag->update(['name' => $name]);
            $msg = 'Schlagwort umbenannt.';
        }
        Recipe::refreshSearchTextFor(Recipe::query()->whereIn('id', $ids));

        return back()->with('status', $msg);
    }

    public function destroy(Tag $tag)
    {
        $ids = $tag->recipes()->pluck('recipes.id');
        $tag->delete();
        Recipe::refreshSearchTextFor(Recipe::query()->whereIn('id', $ids));

        return back()->with('status', 'Schlagwort entfernt (Rezepte bleiben erhalten).');
    }
}
