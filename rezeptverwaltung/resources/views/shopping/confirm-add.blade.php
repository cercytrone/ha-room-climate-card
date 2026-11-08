@extends('layouts.app', ['title' => 'Rezept bereits auf der Liste'])
@section('content')
@php use App\Support\Quantity; @endphp
<div class="mx-auto max-w-2xl">
    <h1 class="mb-4 font-serif text-2xl font-semibold">„{{ $recipe->title }}“ ist bereits auf der Liste</h1>
    <div class="card space-y-4 p-5">
        <p>In „{{ $list->name }}“ ist dieses Rezept bereits mit <strong>{{ Quantity::format($existing->target_quantity) }} {{ $existing->yield_unit }}</strong> enthalten (hinzugefügt am {{ $existing->created_at->format('d.m.Y H:i') }}).</p>
        <p>Was soll mit der neuen Menge von <strong>{{ Quantity::format($target) }} {{ $recipe->yield_unit }}</strong> geschehen?</p>
        <div class="grid gap-3 sm:grid-cols-2">
            <form method="POST" action="{{ route('shopping.add-recipe', $list) }}">@csrf
                <input type="hidden" name="recipe_id" value="{{ $recipe->id }}"><input type="hidden" name="target" value="{{ Quantity::toInput($target) }}"><input type="hidden" name="mode" value="update">
                <button class="btn btn-primary h-full w-full flex-col items-start text-left"><span class="font-semibold">Vorhandene Auswahl aktualisieren</span><span class="text-sm font-normal opacity-90">Menge wird auf {{ Quantity::format($target) }} {{ $recipe->yield_unit }} geändert (nicht addiert).</span></button>
            </form>
            <form method="POST" action="{{ route('shopping.add-recipe', $list) }}">@csrf
                <input type="hidden" name="recipe_id" value="{{ $recipe->id }}"><input type="hidden" name="target" value="{{ Quantity::toInput($target) }}"><input type="hidden" name="mode" value="add">
                <button class="btn h-full w-full flex-col items-start text-left"><span class="font-semibold">Zusätzlich aufnehmen</span><span class="text-sm font-normal">Insgesamt dann {{ Quantity::format($existing->target_quantity + $target) }} {{ $recipe->yield_unit }} (zweiter Eintrag).</span></button>
            </form>
        </div>
        <a href="{{ route('recipes.show', $recipe) }}" class="btn btn-ghost">Abbrechen</a>
    </div>
</div>
@endsection
