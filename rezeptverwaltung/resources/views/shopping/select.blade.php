@extends('layouts.app', ['title' => 'Rezepte zur Einkaufsliste'])
@section('content')
@php use App\Support\Quantity; @endphp
<h1 class="mb-4 font-serif text-2xl font-semibold">Rezepte zur Einkaufsliste hinzufügen</h1>
<form method="POST" x-data="{ url: @js(route('shopping.add-recipes', $default)) }" :action="url" action="{{ route('shopping.add-recipes', $default) }}" class="card space-y-4 p-5">
    @csrf
    @if ($lists->count() > 1)
        <div><label class="label" for="target-list">Einkaufsliste</label>
            <select id="target-list" class="input" x-model="url">@foreach ($lists as $l)<option value="{{ route('shopping.add-recipes', $l) }}" @selected($l->id === $default->id)>{{ $l->name }}</option>@endforeach</select></div>
    @endif
    <ul class="divide-y divide-stone-200">
        @foreach ($recipes as $i => $r)
            <li class="flex flex-wrap items-center gap-3 py-3">
                <input type="hidden" name="items[{{ $i }}][recipe_id]" value="{{ $r->id }}">
                <input type="hidden" name="items[{{ $i }}][include]" value="0">
                <label class="flex min-h-11 min-w-0 flex-1 items-center gap-3"><input type="checkbox" class="checkbox" name="items[{{ $i }}][include]" value="1" checked> <span class="font-medium">{{ $r->title }}</span></label>
                <div class="flex items-center gap-2">
                    <label class="sr-only" for="t-{{ $i }}">Zielmenge für {{ $r->title }}</label>
                    <input id="t-{{ $i }}" name="items[{{ $i }}][target]" value="{{ old('items.'.$i.'.target', Quantity::format($r->yield_quantity)) }}" class="input w-24" inputmode="decimal">
                    <span class="text-sm">{{ $r->yield_unit }}</span>
                </div>
                @error('items.'.$i.'.target')<p class="error w-full">{{ $message }}</p>@enderror
            </li>
        @endforeach
    </ul>
    <fieldset class="space-y-1">
        <legend class="label">Wenn ein Rezept schon auf der Liste ist</legend>
        <label class="flex min-h-10 items-center gap-3"><input type="radio" name="existing" value="update" class="checkbox" checked> Vorhandene Auswahl auf die neue Menge aktualisieren</label>
        <label class="flex min-h-10 items-center gap-3"><input type="radio" name="existing" value="add" class="checkbox"> Zusätzlich aufnehmen</label>
    </fieldset>
    <div class="flex gap-2"><button class="btn btn-primary"><x-icon name="cart"/> Übernehmen</button><a href="{{ route('recipes.index') }}" class="btn btn-ghost">Abbrechen</a></div>
</form>
@endsection
