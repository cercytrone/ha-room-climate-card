@extends('layouts.app', ['title' => 'Kategorie löschen'])
@section('content')
<div class="mx-auto max-w-2xl">
<h1 class="mb-4 font-serif text-2xl font-semibold">Kategorie „{{ $category->pathName() }}“ löschen</h1>
<div class="card space-y-4 p-5">
    <div class="rounded-lg bg-brand-50 p-3 text-brand-900">
        <p class="font-semibold">Rezepte werden nie gelöscht.</p>
        <p class="text-sm">Es wird nur die Zuordnung zu dieser Kategorie entfernt. {{ $recipeCount }} Rezept(e) sind direkt dieser Kategorie zugeordnet.</p>
    </div>
    <form method="POST" action="{{ route('categories.destroy', $category) }}" class="space-y-4">
        @csrf @method('DELETE')
        @if ($childCount > 0)
            <fieldset class="space-y-2">
                <legend class="label">Was soll mit den {{ $descendantCount }} Unterkategorien geschehen?</legend>
                <label class="flex items-start gap-3 rounded-lg border border-stone-200 p-3">
                    <input type="radio" name="children" value="move_up" class="checkbox mt-0.5" checked>
                    <span><strong>Eine Ebene nach oben verschieben</strong> (empfohlen)<br><span class="text-sm text-stone-600">Die {{ $childCount }} direkten Unterkategorien werden {{ $parent ? 'unter „'.$parent->name.'“' : 'auf die oberste Ebene' }} verschoben und behalten ihre Rezepte und eigenen Unterkategorien.</span></span>
                </label>
                <label class="flex items-start gap-3 rounded-lg border border-red-200 p-3">
                    <input type="radio" name="children" value="delete" class="checkbox mt-0.5">
                    <span><strong>Ebenfalls löschen</strong><br><span class="text-sm text-stone-600">Alle {{ $descendantCount }} Unterkategorien werden gelöscht. Deren Rezepte ({{ $descendantRecipeCount }}) bleiben erhalten, verlieren aber diese Zuordnungen.</span></span>
                </label>
            </fieldset>
        @else
            <input type="hidden" name="children" value="move_up">
            <p class="text-stone-700">Diese Kategorie hat keine Unterkategorien.</p>
        @endif
        @if ($parent)
            <label class="flex items-start gap-3">
                <input type="checkbox" name="reassign" value="1" class="checkbox mt-0.5" checked>
                <span>Betroffene Rezepte stattdessen der übergeordneten Kategorie „{{ $parent->name }}“ zuordnen</span>
            </label>
        @endif
        <div class="flex flex-wrap gap-2">
            <button class="btn btn-danger"><x-icon name="trash"/> Kategorie löschen</button>
            <a href="{{ route('categories.index') }}" class="btn btn-ghost">Abbrechen</a>
        </div>
    </form>
</div>
</div>
@endsection
