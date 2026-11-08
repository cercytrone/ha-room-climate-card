<?php

namespace App\Http\Controllers;

use App\Http\Requests\RecipeRequest;
use App\Models\Category;
use App\Models\ImportQueueItem;
use App\Models\Recipe;
use App\Models\RecipeNutrition;
use App\Models\RecipeType;
use App\Models\Setting;
use App\Models\ShoppingList;
use App\Services\Images\ImageException;
use App\Services\Images\ImageService;
use App\Services\Images\PendingUpload;
use App\Services\RecipeSaver;
use App\Support\Duration;
use App\Support\Quantity;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $q = trim((string) $request->query('q', ''));
        $typeId = $request->integer('art') ?: null;
        $categoryId = $request->integer('kategorie') ?: null;
        $favorites = $request->boolean('favoriten');
        $minRating = $request->integer('bewertung') ?: null;
        $sort = in_array($request->query('sortierung'), ['name', 'neu', 'geaendert', 'bewertung'], true) ? $request->query('sortierung') : 'name';
        $view = in_array($request->query('ansicht'), ['karten', 'liste'], true)
            ? $request->query('ansicht') : Setting::get('default_view', 'karten');

        $query = Recipe::query()->ownedBy($user)->with(['type', 'image', 'categories']);

        if ($q !== '') {
            // Jedes Suchwort muss im Suchtext vorkommen (Titel, Zutaten, Rezeptart, Kategorien, Schlagwörter, Notizen)
            foreach (array_slice(preg_split('/\s+/u', $q) ?: [], 0, 8) as $term) {
                $like = '%'.addcslashes($term, '\\%_').'%';
                $query->where('search_text', 'like', $like);
            }
        }
        if ($typeId) {
            $query->where('recipe_type_id', $typeId);
        }
        if ($categoryId) {
            $ids = Category::descendantIds($categoryId);
            $query->whereHas('categories', fn ($c) => $c->whereIn('categories.id', $ids));
        }
        if ($favorites) {
            $query->where('is_favorite', true);
        }
        if ($minRating) {
            $query->where('rating', '>=', $minRating);
        }
        match ($sort) {
            'neu' => $query->orderByDesc('created_at')->orderByDesc('id'),
            'geaendert' => $query->orderByDesc('updated_at')->orderByDesc('id'),
            'bewertung' => $query->orderByRaw('rating IS NULL')->orderByDesc('rating')->orderBy('title'),
            default => $query->orderBy('title'),
        };

        $recipes = $query->paginate(24)->withQueryString();

        return view('recipes.index', [
            'recipes' => $recipes,
            'types' => RecipeType::ordered()->get(),
            'categoryTree' => Category::flatTree(),
            'filters' => compact('q', 'typeId', 'categoryId', 'favorites', 'minRating', 'sort'),
            'view' => $view,
            'hasAny' => Recipe::query()->ownedBy($user)->exists(),
            'lists' => ShoppingList::query()->where('user_id', $user->id)->orderBy('id')->get(),
        ]);
    }

    public function create(Request $request)
    {
        return view('recipes.form', $this->formData(new Recipe(['yield_quantity' => 4, 'yield_unit' => 'Portionen'])));
    }

    public function store(RecipeRequest $request, RecipeSaver $saver, ImageService $images)
    {
        $recipe = $saver->save($request->user(), $request->validated());
        $warning = $this->handleImage($request, $recipe, $images);

        if ($request->filled('import_queue_item_id')) {
            ImportQueueItem::query()->where('user_id', $request->user()->id)->whereKey($request->integer('import_queue_item_id'))
                ->update(['status' => 'saved', 'recipe_id' => $recipe->id]);
        }

        return redirect()->route('recipes.show', $recipe)
            ->with('status', 'Rezept gespeichert.')
            ->with('warning', $warning);
    }

    public function show(Request $request, Recipe $recipe)
    {
        $this->authorize('view', $recipe);
        $recipe->load(['type', 'categories.parent', 'tags', 'ingredientGroups.ingredients', 'steps', 'nutrition', 'image', 'shares' => fn ($q) => $q->whereNull('revoked_at')]);
        $target = Quantity::parsePositive((string) $request->query('menge', '')) ?? $recipe->yield_quantity;

        return view('recipes.show', [
            'recipe' => $recipe,
            'target' => $target,
            'lists' => ShoppingList::query()->where('user_id', $request->user()->id)->orderBy('id')->get(),
            'mailEnabled' => config('mail.default') === 'smtp' && config('mail.mailers.smtp.host'),
        ]);
    }

    public function edit(Recipe $recipe)
    {
        $this->authorize('update', $recipe);
        $recipe->load(['categories', 'tags', 'ingredientGroups.ingredients', 'steps', 'nutrition', 'image']);

        return view('recipes.form', $this->formData($recipe));
    }

    public function update(RecipeRequest $request, Recipe $recipe, RecipeSaver $saver, ImageService $images)
    {
        $this->authorize('update', $recipe);
        $saver->save($request->user(), $request->validated(), $recipe);
        $warning = $this->handleImage($request, $recipe, $images);

        return redirect()->route('recipes.show', $recipe)->with('status', 'Änderungen gespeichert.')->with('warning', $warning);
    }

    public function destroy(Recipe $recipe)
    {
        $this->authorize('delete', $recipe);
        $title = $recipe->title;
        $recipe->delete();

        return redirect()->route('recipes.index')->with('status', '„'.$title.'“ wurde gelöscht.');
    }

    public function toggleFavorite(Request $request, Recipe $recipe)
    {
        $this->authorize('update', $recipe);
        $recipe->is_favorite = ! $recipe->is_favorite;
        $recipe->timestamps = false;
        $recipe->save();
        if ($request->expectsJson()) {
            return response()->json(['favorite' => $recipe->is_favorite]);
        }

        return back()->with('status', $recipe->is_favorite ? 'Als Favorit markiert.' : 'Aus den Favoriten entfernt.');
    }

    /** Cover hochladen, aus Zwischenspeicher übernehmen oder entfernen. Gibt ggf. eine Warnung zurück. */
    private function handleImage(RecipeRequest $request, Recipe $recipe, ImageService $images): ?string
    {
        try {
            if ($request->hasFile('cover')) {
                $file = $request->file('cover');
                $images->attachToRecipe($recipe, $file->getRealPath(), $file->getClientOriginalName());
            } elseif ($request->filled('pending_cover') && PendingUpload::valid($request->input('pending_cover'))) {
                $token = $request->input('pending_cover');
                $meta = PendingUpload::meta($token);
                $images->attachToRecipe($recipe, PendingUpload::path($token), $meta['original_name'], $meta['source_url']);
                PendingUpload::forget($token);
            } elseif ($request->boolean('remove_cover') && $recipe->image) {
                $recipe->image->delete();
            }
        } catch (ImageException $e) {
            return 'Das Rezept wurde gespeichert, das Bild aber nicht: '.$e->getMessage();
        }

        return null;
    }

    /** Daten für das Rezeptformular (Neu, Bearbeiten, Importvorschau). */
    public function formData(Recipe $recipe, ?array $draft = null): array
    {
        if ($draft === null) {
            $groups = $recipe->exists ? $recipe->ingredientGroups->map(fn ($g) => [
                'name' => $g->name,
                'items' => $g->ingredients->map(fn ($i) => [
                    'quantity' => $i->quantity !== null
                        ? Quantity::toInput($i->quantity).($i->quantity_max !== null ? '–'.Quantity::toInput($i->quantity_max) : '')
                        : (string) $i->quantity_text,
                    'unit' => (string) $i->unit,
                    'name' => $i->name,
                    'note' => (string) $i->note,
                    'scalable' => $i->scalable || $i->quantity === null,
                    'original_text' => (string) $i->original_text,
                    'uncertain' => false,
                ])->all(),
            ])->all() : [];
            $draft = [
                'title' => $recipe->title,
                'description' => $recipe->description,
                'recipe_type_id' => $recipe->recipe_type_id,
                'categories' => $recipe->exists ? $recipe->categories->pluck('id')->all() : [],
                'tags' => $recipe->exists ? $recipe->tags->pluck('name')->implode(', ') : '',
                'source_url' => $recipe->source_url,
                'source_text' => $recipe->source_text,
                'author' => $recipe->author,
                'yield_quantity' => Quantity::toInput($recipe->yield_quantity),
                'yield_unit' => $recipe->yield_unit,
                'prep_minutes' => Duration::toInput($recipe->prep_minutes),
                'rest_minutes' => Duration::toInput($recipe->rest_minutes),
                'cook_minutes' => Duration::toInput($recipe->cook_minutes),
                'total_minutes' => Duration::toInput($recipe->total_minutes),
                'rating' => $recipe->rating,
                'is_favorite' => $recipe->is_favorite,
                'notes' => $recipe->notes,
                'groups' => $groups ?: [['name' => null, 'items' => []]],
                'steps' => $recipe->exists ? $recipe->steps->map(fn ($s) => ['body' => $s->body])->all() : [],
                'nutrition' => $recipe->nutrition ? collect($recipe->nutrition->only(array_merge(['basis', 'basis_label'], array_keys(RecipeNutrition::FIELDS))))
                    ->map(fn ($v, $k) => is_float($v) ? Quantity::toInput($v) : $v)->all() : null,
                'warnings' => [],
            ];
        }

        return [
            'recipe' => $recipe,
            'draft' => $draft,
            'types' => RecipeType::ordered()->get(),
            'categoryTree' => Category::flatTree(),
        ];
    }
}
