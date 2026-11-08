@extends('layouts.app', ['title' => 'Kategorien'])
@section('content')
<h1 class="mb-1 font-serif text-2xl font-semibold sm:text-3xl">Kategorien, Rezeptarten und Schlagwörter</h1>
<p class="mb-5 max-w-3xl text-stone-600">Diese drei Ordnungen sind voneinander unabhängig: Ein Rezept hat höchstens <strong>eine Rezeptart</strong> (z. B. Brot), kann in <strong>mehreren Kategorien</strong> (hierarchisch, z. B. Brot › Sauerteig) liegen und beliebige <strong>Schlagwörter</strong> tragen.</p>

<div class="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
<section class="card p-4 sm:p-5" aria-labelledby="k-titel">
    <h2 id="k-titel" class="section-title">Kategorien</h2>
    <form method="POST" action="{{ route('categories.store') }}" class="mt-3 grid gap-2 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        @csrf
        <div><label for="new-cat" class="label">Neue Kategorie</label><input id="new-cat" name="name" required maxlength="100" class="input" value="{{ old('name') }}"></div>
        <div><label for="new-parent" class="label">innerhalb von</label>
            <select id="new-parent" name="parent_id" class="input"><option value="">– oberste Ebene –</option>
                @foreach ($tree as $row)<option value="{{ $row['category']->id }}">{{ str_repeat('— ', $row['depth']) }}{{ $row['category']->name }}</option>@endforeach
            </select></div>
        <button class="btn btn-primary"><x-icon name="plus"/> Anlegen</button>
    </form>

    @if (empty($tree))
        <p class="mt-4 text-stone-600">Noch keine Kategorien. Beispiel: „Brot“ mit Unterkategorien „No Knead“, „Küchenmaschine“, „Sauerteig“.</p>
    @else
        <ul class="mt-4 divide-y divide-stone-200">
            @foreach ($tree as $row)
                @php $c = $row['category']; @endphp
                <li class="py-2" style="padding-left: {{ $row['depth'] * 1.25 }}rem">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                        <div class="min-w-0">
                            <a href="{{ route('recipes.index', ['kategorie' => $c->id]) }}" class="font-medium hover:text-brand-700">{{ $row['depth'] ? '↳ ' : '' }}{{ $c->name }}</a>
                            <span class="text-sm text-stone-500">({{ $c->recipes_count }})</span>
                        </div>
                        <div class="flex items-center">
                            <form method="POST" action="{{ route('categories.move', $c) }}">@csrf<input type="hidden" name="richtung" value="hoch"><button class="btn-icon" aria-label="{{ $c->name }} nach oben"><x-icon name="up"/></button></form>
                            <form method="POST" action="{{ route('categories.move', $c) }}">@csrf<input type="hidden" name="richtung" value="runter"><button class="btn-icon" aria-label="{{ $c->name }} nach unten"><x-icon name="down"/></button></form>
                            <a href="{{ route('categories.delete', $c) }}" class="btn-icon text-red-700" aria-label="{{ $c->name }} löschen"><x-icon name="trash"/></a>
                        </div>
                    </div>
                    <details class="mt-1">
                        <summary class="cursor-pointer text-sm text-brand-700">Umbenennen / verschieben</summary>
                        <form method="POST" action="{{ route('categories.update', $c) }}" class="mt-2 grid gap-2 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                            @csrf @method('PUT')
                            <div><label class="label" for="cn-{{ $c->id }}">Name</label><input id="cn-{{ $c->id }}" name="name" value="{{ $c->name }}" required maxlength="100" class="input"></div>
                            <div><label class="label" for="cp-{{ $c->id }}">übergeordnet</label>
                                <select id="cp-{{ $c->id }}" name="parent_id" class="input"><option value="">– oberste Ebene –</option>
                                    @foreach ($tree as $opt)
                                        @if ($opt['category']->id !== $c->id)
                                            <option value="{{ $opt['category']->id }}" @selected($c->parent_id === $opt['category']->id)>{{ str_repeat('— ', $opt['depth']) }}{{ $opt['category']->name }}</option>
                                        @endif
                                    @endforeach
                                </select></div>
                            <button class="btn">Speichern</button>
                        </form>
                    </details>
                </li>
            @endforeach
        </ul>
    @endif
</section>

<div class="space-y-6">
<section class="card p-4 sm:p-5" aria-labelledby="t-titel">
    <h2 id="t-titel" class="section-title">Rezeptarten</h2>
    <form method="POST" action="{{ route('types.store') }}" class="mt-3 flex gap-2">
        @csrf
        <label for="new-type" class="sr-only">Neue Rezeptart</label>
        <input id="new-type" name="name" required maxlength="100" class="input" placeholder="z. B. Hauptgericht">
        <button class="btn btn-primary shrink-0">Anlegen</button>
    </form>
    <ul class="mt-3 divide-y divide-stone-200">
        @forelse ($types as $t)
            <li class="py-2">
                <div class="flex items-center justify-between gap-2">
                    <span>{{ $t->name }} <span class="text-sm text-stone-500">({{ $t->recipes_count }})</span></span>
                    <form method="POST" action="{{ route('types.destroy', $t) }}" x-data @submit="if (!confirm(@js('Rezeptart „'.$t->name.'“ löschen? '.$t->recipes_count.' Rezept(e) behalten ihren Inhalt, haben danach aber keine Rezeptart mehr.'))) $event.preventDefault()">
                        @csrf @method('DELETE')<button class="btn-icon text-red-700" aria-label="{{ $t->name }} löschen"><x-icon name="trash"/></button>
                    </form>
                </div>
                <details><summary class="cursor-pointer text-sm text-brand-700">Umbenennen</summary>
                    <form method="POST" action="{{ route('types.update', $t) }}" class="mt-2 flex gap-2">@csrf @method('PUT')
                        <label class="sr-only" for="tn-{{ $t->id }}">Name</label><input id="tn-{{ $t->id }}" name="name" value="{{ $t->name }}" class="input" required maxlength="100">
                        <button class="btn shrink-0">Speichern</button></form>
                </details>
            </li>
        @empty
            <li class="py-2 text-stone-600">Noch keine Rezeptarten.</li>
        @endforelse
    </ul>
</section>

<section class="card p-4 sm:p-5" aria-labelledby="s-titel">
    <h2 id="s-titel" class="section-title">Schlagwörter</h2>
    <p class="mt-1 text-sm text-stone-600">Schlagwörter entstehen beim Bearbeiten eines Rezepts. Umbenennen in einen vorhandenen Namen führt beide zusammen.</p>
    <ul class="mt-3 divide-y divide-stone-200">
        @forelse ($tags as $tag)
            <li class="py-2">
                <div class="flex items-center justify-between gap-2">
                    <a href="{{ route('recipes.index', ['q' => $tag->name]) }}" class="hover:text-brand-700">#{{ $tag->name }} <span class="text-sm text-stone-500">({{ $tag->recipes_count }})</span></a>
                    <form method="POST" action="{{ route('tags.destroy', $tag) }}">@csrf @method('DELETE')<button class="btn-icon text-red-700" aria-label="{{ $tag->name }} entfernen"><x-icon name="trash"/></button></form>
                </div>
                <details><summary class="cursor-pointer text-sm text-brand-700">Umbenennen</summary>
                    <form method="POST" action="{{ route('tags.update', $tag) }}" class="mt-2 flex gap-2">@csrf @method('PUT')
                        <label class="sr-only" for="tg-{{ $tag->id }}">Name</label><input id="tg-{{ $tag->id }}" name="name" value="{{ $tag->name }}" class="input" required maxlength="100">
                        <button class="btn shrink-0">Speichern</button></form>
                </details>
            </li>
        @empty
            <li class="py-2 text-stone-600">Noch keine Schlagwörter.</li>
        @endforelse
    </ul>
</section>
</div>
</div>
@endsection
