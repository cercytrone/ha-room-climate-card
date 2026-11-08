@extends('layouts.app', ['title' => 'Rezeptsammlung'])
@section('content')
@php $f = $filters; $active = $f['q'] !== '' || $f['typeId'] || $f['categoryId'] || $f['favorites'] || $f['minRating']; @endphp
<div class="mb-4 flex flex-wrap items-end justify-between gap-3">
    <h1 class="font-serif text-2xl font-semibold sm:text-3xl">Rezeptsammlung</h1>
    <div class="flex gap-2">
        <a href="{{ route('recipes.create') }}" class="btn btn-primary"><x-icon name="plus"/> Rezept hinzufügen</a>
    </div>
</div>

<form method="GET" action="{{ route('recipes.index') }}" class="card mb-5 p-4" role="search">
    <input type="hidden" name="ansicht" value="{{ $view }}">
    <label for="q" class="label">Suche</label>
    <div class="flex gap-2">
        <input id="q" type="search" name="q" value="{{ $f['q'] }}" class="input" placeholder="Titel, Zutat, Kategorie, Schlagwort, Notiz …">
        <button class="btn btn-primary shrink-0" aria-label="Suchen"><x-icon name="search"/><span class="hidden sm:inline">Suchen</span></button>
    </div>
    <details class="mt-3" @if($f['typeId'] || $f['categoryId'] || $f['favorites'] || $f['minRating'] || $f['sort'] !== 'name') open @endif>
        <summary class="cursor-pointer py-2 text-sm font-medium text-brand-700">Filter und Sortierung</summary>
        <div class="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div>
                <label for="art" class="label">Rezeptart</label>
                <select id="art" name="art" class="input">
                    <option value="">Alle</option>
                    @foreach ($types as $t)<option value="{{ $t->id }}" @selected($f['typeId'] == $t->id)>{{ $t->name }}</option>@endforeach
                </select>
            </div>
            <div>
                <label for="kategorie" class="label">Kategorie <span class="font-normal text-stone-500">(inkl. Unterkategorien)</span></label>
                <select id="kategorie" name="kategorie" class="input">
                    <option value="">Alle</option>
                    @foreach ($categoryTree as $row)
                        <option value="{{ $row['category']->id }}" @selected($f['categoryId'] == $row['category']->id)>{{ str_repeat('— ', $row['depth']) }}{{ $row['category']->name }}</option>
                    @endforeach
                </select>
            </div>
            <div>
                <label for="bewertung" class="label">Bewertung</label>
                <select id="bewertung" name="bewertung" class="input">
                    <option value="">Alle</option>
                    @for ($i = 5; $i >= 1; $i--)<option value="{{ $i }}" @selected($f['minRating'] == $i)>mind. {{ $i }} {{ $i === 1 ? 'Stern' : 'Sterne' }}</option>@endfor
                </select>
            </div>
            <div>
                <label for="sortierung" class="label">Sortierung</label>
                <select id="sortierung" name="sortierung" class="input">
                    <option value="name" @selected($f['sort'] === 'name')>Name (A–Z)</option>
                    <option value="neu" @selected($f['sort'] === 'neu')>Neueste zuerst</option>
                    <option value="geaendert" @selected($f['sort'] === 'geaendert')>Zuletzt geändert</option>
                    <option value="bewertung" @selected($f['sort'] === 'bewertung')>Beste Bewertung</option>
                </select>
            </div>
            <label class="flex min-h-11 items-center gap-3 self-end text-sm">
                <input type="checkbox" name="favoriten" value="1" class="checkbox" @checked($f['favorites'])> Nur Favoriten
            </label>
        </div>
        <div class="mt-3 flex flex-wrap gap-2">
            <button class="btn btn-primary">Anwenden</button>
            @if ($active)<a href="{{ route('recipes.index', ['ansicht' => $view]) }}" class="btn btn-ghost">Filter zurücksetzen</a>@endif
        </div>
    </details>
</form>

@if (! $hasAny)
    <div class="card p-8 text-center">
        <x-icon name="book" class="mx-auto h-10 w-10 text-stone-400"/>
        <h2 class="mt-3 text-lg font-semibold">Noch keine Rezepte</h2>
        <p class="mt-1 text-stone-600">Legen Sie Ihr erstes Rezept an oder importieren Sie eines von einer Webseite.</p>
        <div class="mt-4 flex flex-wrap justify-center gap-2">
            <a href="{{ route('recipes.create') }}" class="btn btn-primary"><x-icon name="plus"/> Rezept hinzufügen</a>
            <a href="{{ route('import.index') }}" class="btn"><x-icon name="download"/> Rezept importieren</a>
        </div>
    </div>
@elseif ($recipes->isEmpty())
    <div class="card p-8 text-center">
        <h2 class="text-lg font-semibold">Keine passenden Rezepte gefunden</h2>
        <p class="mt-1 text-stone-600">Bitte Suchbegriff oder Filter ändern.</p>
        <a href="{{ route('recipes.index') }}" class="btn mt-4">Alle Rezepte anzeigen</a>
    </div>
@else
<form method="GET" action="{{ route('shopping.select') }}" x-data="{ selecting: false, count: 0 }" @change="count = $el.querySelectorAll('input[name=\'rezepte[]\']:checked').length">
    <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p class="text-sm text-stone-600">{{ $recipes->total() }} {{ $recipes->total() === 1 ? 'Rezept' : 'Rezepte' }}</p>
        <div class="flex flex-wrap items-center gap-2">
            <button type="button" class="btn" @click="selecting = !selecting" :aria-pressed="selecting.toString()">
                <x-icon name="cart"/> <span x-text="selecting ? 'Auswahl beenden' : 'Mehrere zur Einkaufsliste'">Mehrere zur Einkaufsliste</span>
            </button>
            <div class="flex rounded-lg border border-stone-300 bg-white" role="group" aria-label="Ansicht">
                <a href="{{ request()->fullUrlWithQuery(['ansicht' => 'karten']) }}" class="btn-icon {{ $view === 'karten' ? 'bg-stone-200' : '' }}" aria-label="Kartenansicht" @if($view === 'karten') aria-current="true" @endif><x-icon name="grid"/></a>
                <a href="{{ request()->fullUrlWithQuery(['ansicht' => 'liste']) }}" class="btn-icon {{ $view === 'liste' ? 'bg-stone-200' : '' }}" aria-label="Listenansicht" @if($view === 'liste') aria-current="true" @endif><x-icon name="list"/></a>
            </div>
        </div>
    </div>
    <div x-show="selecting" x-cloak class="sticky top-16 z-20 mb-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-brand-200 bg-brand-50 p-3">
        <span class="text-sm"><span x-text="count"></span> ausgewählt – Zielmengen im nächsten Schritt festlegen.</span>
        <button class="btn btn-primary" :disabled="count === 0">Weiter zur Einkaufsliste</button>
    </div>

    @if ($view === 'liste')
        <ul class="card divide-y divide-stone-200">
            @foreach ($recipes as $r)
                <li class="flex items-center gap-3 p-3">
                    <input type="checkbox" name="rezepte[]" value="{{ $r->id }}" class="checkbox" x-show="selecting" x-cloak aria-label="{{ $r->title }} auswählen">
                    @if ($r->image)
                        <img src="{{ route('recipes.image', [$r, 'vorschau']) }}" alt="" class="h-14 w-14 shrink-0 rounded-lg object-cover" loading="lazy">
                    @else
                        <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-400"><x-icon name="image"/></div>
                    @endif
                    <div class="min-w-0 flex-1">
                        <a href="{{ route('recipes.show', $r) }}" class="block truncate font-medium text-stone-900 hover:text-brand-700">{{ $r->title }}</a>
                        <div class="flex flex-wrap items-center gap-2 text-sm text-stone-600">
                            @if ($r->type)<span>{{ $r->type->name }}</span>@endif
                            @if ($r->totalMinutes())<span class="inline-flex items-center gap-1"><x-icon name="clock" class="h-4 w-4"/>{{ \App\Support\Duration::format($r->totalMinutes()) }}</span>@endif
                            @include('recipes._stars', ['rating' => $r->rating])
                        </div>
                    </div>
                    @if ($r->is_favorite)<x-icon name="heart" class="h-5 w-5 shrink-0 fill-current text-rose-600"/><span class="sr-only">Favorit</span>@endif
                </li>
            @endforeach
        </ul>
    @else
        <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            @foreach ($recipes as $r)
                <li class="card relative flex flex-col overflow-hidden">
                    <label class="absolute left-2 top-2 z-10 rounded-lg bg-white/90 p-2" x-show="selecting" x-cloak>
                        <input type="checkbox" name="rezepte[]" value="{{ $r->id }}" class="checkbox"><span class="sr-only">{{ $r->title }} auswählen</span>
                    </label>
                    <a href="{{ route('recipes.show', $r) }}" class="group flex flex-1 flex-col">
                        @if ($r->image)
                            <img src="{{ route('recipes.image', [$r, 'vorschau']) }}" alt="" class="aspect-[4/3] w-full object-cover" loading="lazy">
                        @else
                            <div class="flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br from-stone-100 to-brand-50 text-stone-400">
                                <x-icon name="image" class="h-10 w-10"/>
                            </div>
                        @endif
                        <div class="flex flex-1 flex-col gap-1 p-4">
                            <h2 class="font-serif text-lg font-semibold leading-snug group-hover:text-brand-700">{{ $r->title }}</h2>
                            <div class="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-sm text-stone-600">
                                @if ($r->type)<span class="badge">{{ $r->type->name }}</span>@endif
                                @if ($r->totalMinutes())<span class="inline-flex items-center gap-1"><x-icon name="clock" class="h-4 w-4"/>{{ \App\Support\Duration::format($r->totalMinutes()) }}</span>@endif
                                @include('recipes._stars', ['rating' => $r->rating])
                                @if ($r->is_favorite)<span class="inline-flex items-center gap-1 text-rose-700"><x-icon name="heart" class="h-4 w-4 fill-current"/><span class="sr-only">Favorit</span></span>@endif
                            </div>
                        </div>
                    </a>
                </li>
            @endforeach
        </ul>
    @endif
</form>
{{ $recipes->links('partials.pagination') }}
@endif
@endsection
