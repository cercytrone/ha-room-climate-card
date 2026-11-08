<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\ShoppingList;
use App\Models\ShoppingListRecipe;
use App\Services\Share\PdfRenderer;
use App\Services\Shopping\AreaGuesser;
use App\Services\Shopping\ShoppingListBuilder;
use App\Support\Quantity;
use Illuminate\Http\Request;

class ShoppingListController extends Controller
{
    public function __construct(private readonly ShoppingListBuilder $builder) {}

    public function current(Request $request)
    {
        $id = $request->session()->get('shopping_list_id');
        $list = $id ? ShoppingList::query()->where('user_id', $request->user()->id)->find($id) : null;

        return $this->show($request, $list ?? ShoppingList::defaultFor($request->user()));
    }

    public function show(Request $request, ShoppingList $list)
    {
        $this->authorize('view', $list);
        $request->session()->put('shopping_list_id', $list->id);
        $list->load(['items.sources.selection', 'selections.recipe']);

        return view('shopping.show', [
            'list' => $list,
            'lists' => ShoppingList::query()->where('user_id', $request->user()->id)->orderBy('id')->get(),
            'areas' => AreaGuesser::AREAS,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate(['name' => ['required', 'string', 'max:150']], [], ['name' => 'Name']);
        $list = ShoppingList::create(['user_id' => $request->user()->id, 'name' => trim($data['name'])]);

        return redirect()->route('shopping.show', $list)->with('status', 'Einkaufsliste angelegt.');
    }

    public function update(Request $request, ShoppingList $list)
    {
        $this->authorize('update', $list);
        $data = $request->validate(['name' => ['sometimes', 'required', 'string', 'max:150'], 'group_by_area' => ['sometimes', 'boolean']], [], ['name' => 'Name']);
        $list->update($data);

        return back()->with('status', 'Einkaufsliste gespeichert.');
    }

    public function destroy(Request $request, ShoppingList $list)
    {
        $this->authorize('delete', $list);
        $list->delete();
        $request->session()->forget('shopping_list_id');

        return redirect()->route('shopping.current')->with('status', 'Einkaufsliste gelöscht. Die Rezepte bleiben unverändert.');
    }

    /**
     * Rezept hinzufügen. Ist es schon enthalten, wird ausdrücklich gefragt:
     * „vorhandene Auswahl aktualisieren“ oder „zusätzlich aufnehmen“.
     */
    public function addRecipe(Request $request, ShoppingList $list)
    {
        $this->authorize('update', $list);
        $data = $request->validate([
            'recipe_id' => ['required', 'integer'],
            'target' => ['required', 'string', 'max:20'],
            'mode' => ['nullable', 'in:update,add'],
        ], [], ['target' => 'Zielmenge']);
        $recipe = Recipe::query()->ownedBy($request->user())->findOrFail($data['recipe_id']);
        $target = Quantity::parsePositive($data['target']);
        if ($target === null) {
            return back()->withErrors(['target' => 'Bitte eine Zielmenge größer als 0 angeben, z. B. 1,5.']);
        }
        $existing = $this->builder->existingSelection($list, $recipe);
        if ($existing && ! isset($data['mode'])) {
            return view('shopping.confirm-add', compact('list', 'recipe', 'target', 'existing'));
        }
        if ($existing && $data['mode'] === 'update') {
            $this->builder->updateSelection($existing, $target);
            $msg = 'Auswahl für „'.$recipe->title.'“ auf '.Quantity::format($target).' '.$recipe->yield_unit.' aktualisiert.';
        } else {
            $this->builder->addRecipe($list, $recipe, $target);
            $msg = '„'.$recipe->title.'“ ('.Quantity::format($target).' '.$recipe->yield_unit.') zur Einkaufsliste hinzugefügt.';
        }

        return redirect()->route('shopping.show', $list)->with('status', $msg);
    }

    /** Auswahlseite für mehrere Rezepte mit individueller Zielmenge. */
    public function selectRecipes(Request $request)
    {
        $ids = array_map('intval', (array) $request->query('rezepte', []));
        $recipes = Recipe::query()->ownedBy($request->user())->whereIn('id', $ids)->orderBy('title')->get();
        if ($recipes->isEmpty()) {
            return redirect()->route('recipes.index')->with('warning', 'Bitte zuerst Rezepte auswählen.');
        }

        return view('shopping.select', [
            'recipes' => $recipes,
            'lists' => ShoppingList::query()->where('user_id', $request->user()->id)->orderBy('id')->get(),
            'default' => ShoppingList::defaultFor($request->user()),
        ]);
    }

    public function addRecipes(Request $request, ShoppingList $list)
    {
        $this->authorize('update', $list);
        $data = $request->validate([
            'items' => ['required', 'array', 'max:100'],
            'items.*.recipe_id' => ['required', 'integer'],
            'items.*.target' => ['required', 'string', 'max:20'],
            'items.*.include' => ['nullable', 'boolean'],
            'existing' => ['required', 'in:update,add'],
        ]);
        $count = 0;
        $errors = [];
        foreach ($data['items'] as $i => $row) {
            if (empty($row['include'])) {
                continue;
            }
            $recipe = Recipe::query()->ownedBy($request->user())->find($row['recipe_id']);
            $target = Quantity::parsePositive($row['target']);
            if (! $recipe) {
                continue;
            }
            if ($target === null) {
                $errors["items.$i.target"] = 'Zielmenge für „'.$recipe->title.'“ muss größer als 0 sein.';

                continue;
            }
            $existing = $this->builder->existingSelection($list, $recipe);
            if ($existing && $data['existing'] === 'update') {
                $this->builder->updateSelection($existing, $target);
            } else {
                $this->builder->addRecipe($list, $recipe, $target);
            }
            $count++;
        }
        if ($errors) {
            return back()->withInput()->withErrors($errors);
        }

        return redirect()->route('shopping.show', $list)->with('status', $count.' Rezept(e) zur Einkaufsliste übernommen.');
    }

    public function updateSelection(Request $request, ShoppingListRecipe $selection)
    {
        $this->authorize('update', $selection->shoppingList);
        $target = Quantity::parsePositive((string) $request->input('target'));
        if ($target === null) {
            return back()->withErrors(['target_'.$selection->id => 'Bitte eine Zielmenge größer als 0 angeben.']);
        }
        if (! $selection->recipe) {
            return back()->withErrors(['target_'.$selection->id => 'Das Rezept wurde gelöscht – die Menge kann nicht neu berechnet werden.']);
        }
        $this->builder->updateSelection($selection, $target);

        return back()->with('status', 'Menge aktualisiert und Zutaten neu berechnet.');
    }

    public function removeSelection(ShoppingListRecipe $selection)
    {
        $this->authorize('update', $selection->shoppingList);
        $this->builder->removeSelection($selection);

        return back()->with('status', '„'.$selection->recipe_title.'“ aus der Liste entfernt. Manuell bearbeitete Einträge bleiben erhalten.');
    }

    public function clearChecked(ShoppingList $list)
    {
        $this->authorize('update', $list);
        $n = $list->items()->where('is_checked', true)->delete();

        return back()->with('status', $n.' abgehakte Einträge entfernt.');
    }

    public function clearAll(ShoppingList $list)
    {
        $this->authorize('update', $list);
        $list->items()->delete();
        $list->selections()->delete();

        return back()->with('status', 'Einkaufsliste geleert.');
    }

    public function text(Request $request, ShoppingList $list)
    {
        $this->authorize('view', $list);

        return response($this->builder->toText($list, $request->boolean('alle')), 200, ['Content-Type' => 'text/plain; charset=UTF-8']);
    }

    public function print(Request $request, ShoppingList $list)
    {
        $this->authorize('view', $list);
        $list->load(['items', 'selections']);

        return view('shopping.print', ['list' => $list, 'pdf' => false, 'includeChecked' => $request->boolean('alle')]);
    }

    public function pdf(Request $request, ShoppingList $list, PdfRenderer $pdf)
    {
        $this->authorize('view', $list);
        $list->load(['items', 'selections']);
        $html = view('shopping.print', ['list' => $list, 'pdf' => true, 'includeChecked' => $request->boolean('alle')])->render();

        return response($pdf->render($html), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="'.PdfRenderer::filename($list->name).'"',
        ]);
    }
}
