@extends('layouts.app', ['title' => 'Rezept importieren'])
@section('content')
@php $tab = request('tab', session('import_tab', $errors->has('text') ? 'text' : ($errors->has('urls') ? 'stapel' : 'url'))); @endphp
<h1 class="mb-4 font-serif text-2xl font-semibold sm:text-3xl">Rezept importieren</h1>

<div x-data="{ tab: @js($tab) }">
    <div class="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Importart">
        <button type="button" role="tab" class="btn" :class="tab === 'url' && 'btn-primary'" :aria-selected="(tab === 'url').toString()" @click="tab = 'url'">Von Webseite</button>
        <button type="button" role="tab" class="btn" :class="tab === 'text' && 'btn-primary'" :aria-selected="(tab === 'text').toString()" @click="tab = 'text'">Text einfügen</button>
        <button type="button" role="tab" class="btn" :class="tab === 'stapel' && 'btn-primary'" :aria-selected="(tab === 'stapel').toString()" @click="tab = 'stapel'">Mehrere Adressen</button>
    </div>

    <section x-show="tab === 'url'" class="card space-y-4 p-4 sm:p-5" role="tabpanel">
        <h2 class="section-title">Von einer Webseite</h2>
        @if (session('import_error'))
            <div role="alert" class="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-900">
                <p class="font-semibold">Import nicht möglich</p>
                <p class="text-sm">{{ session('import_error') }}</p>
                <button type="button" class="mt-2 text-sm font-medium underline" @click="tab = 'text'">Stattdessen Text einfügen</button>
            </div>
        @endif
        <form method="POST" action="{{ route('import.url') }}" class="space-y-3" x-data="{ busy: false }" @submit="busy = true">
            @csrf
            <div>
                <label for="url" class="label">Adresse der Rezeptseite</label>
                <input id="url" name="url" type="url" inputmode="url" required value="{{ old('url') }}" class="input @error('url') input-error @enderror" placeholder="https://www.beispiel.de/rezept/…">
                @error('url')<p class="error">{{ $message }}</p>@enderror
            </div>
            <button class="btn btn-primary" :disabled="busy"><x-icon name="download"/> <span x-text="busy ? 'Wird abgerufen …' : 'Rezept abrufen'">Rezept abrufen</span></button>
        </form>
        <div class="text-sm text-stone-600">
            <p>So funktioniert es: Die Seite wird vom Server abgerufen, strukturierte Rezeptdaten (Schema.org/JSON-LD) werden ausgelesen und als <strong>bearbeitbare Vorschau</strong> angezeigt. Gespeichert wird erst nach Ihrer Bestätigung.</p>
            <p class="mt-2">Nicht jede Seite lässt sich importieren: Seiten ohne strukturierte Rezeptdaten, mit Anmeldung oder Bezahlschranke werden nicht unterstützt. In diesem Fall den Text kopieren und „Text einfügen“ verwenden.</p>
        </div>
    </section>

    <section x-show="tab === 'text'" x-cloak class="card space-y-4 p-4 sm:p-5" role="tabpanel">
        <h2 class="section-title">Rezepttext einfügen</h2>
        <form method="POST" action="{{ route('import.text') }}" class="space-y-3">
            @csrf
            <div>
                <label for="t-title" class="label">Titel <span class="font-normal text-stone-500">(optional – sonst erste Zeile)</span></label>
                <input id="t-title" name="title" value="{{ old('title') }}" class="input">
            </div>
            <div>
                <label for="t-text" class="label">Rezepttext</label>
                <textarea id="t-text" name="text" rows="14" required class="input font-mono text-sm @error('text') input-error @enderror" placeholder="Rustikales Bauernbrot&#10;Für 1 Brot&#10;&#10;Zutaten&#10;500 g Mehl&#10;350 ml Wasser&#10;10 g Salz&#10;&#10;Zubereitung&#10;1. Alles verkneten.&#10;2. Über Nacht gehen lassen.">{{ old('text') }}</textarea>
                @error('text')<p class="error">{{ $message }}</p>@enderror
                <p class="hint">Tipp: Zeilen „Zutaten“ und „Zubereitung“ helfen bei der Erkennung. Angaben wie „Für 4 Portionen“, „Arbeitszeit: 20 Min.“ oder „Backzeit: 45 Min.“ werden erkannt.</p>
            </div>
            <div>
                <label for="t-source" class="label">Quelle <span class="font-normal text-stone-500">(URL oder Text, optional)</span></label>
                <input id="t-source" name="source" value="{{ old('source') }}" class="input">
            </div>
            <button class="btn btn-primary">Vorschau erstellen</button>
        </form>
    </section>

    <section x-show="tab === 'stapel'" x-cloak class="card space-y-4 p-4 sm:p-5" role="tabpanel">
        <h2 class="section-title">Mehrere Adressen (Warteschlange)</h2>
        <p class="text-sm text-stone-600">Die Adressen werden in kleinen Paketen abgerufen – automatisch per Cronjob oder mit „Jetzt verarbeiten“. Jedes Ergebnis wird anschließend als Vorschau geprüft und erst dann gespeichert.</p>
        <form method="POST" action="{{ route('import.queue.store') }}" class="space-y-3">
            @csrf
            <label for="urls" class="label">Eine Adresse pro Zeile (max. {{ config('rezepte.import.queue_max_urls') }})</label>
            <textarea id="urls" name="urls" rows="5" class="input font-mono text-sm @error('urls') input-error @enderror">{{ old('urls') }}</textarea>
            @error('urls')<p class="error">{{ $message }}</p>@enderror
            <button class="btn btn-primary">Zur Warteschlange hinzufügen</button>
        </form>

        @if ($queue->isNotEmpty())
            <div class="flex flex-wrap gap-2 border-t border-stone-200 pt-4">
                <form method="POST" action="{{ route('import.queue.process') }}">@csrf<button class="btn">Jetzt verarbeiten</button></form>
                <form method="POST" action="{{ route('import.queue.clear') }}">@csrf<button class="btn btn-ghost">Erledigte und fehlgeschlagene entfernen</button></form>
            </div>
            <ul class="divide-y divide-stone-200">
                @foreach ($queue as $item)
                    <li class="flex flex-wrap items-center justify-between gap-2 py-2">
                        <div class="min-w-0">
                            <p class="truncate text-sm font-medium">{{ $item->url }}</p>
                            <p class="text-sm {{ $item->status === 'failed' ? 'text-red-700' : 'text-stone-600' }}">
                                {{ \App\Models\ImportQueueItem::STATUS_LABELS[$item->status] ?? $item->status }}
                                @if ($item->status === 'ready' && isset($item->payload['drafts'][0]['title'])) – „{{ $item->payload['drafts'][0]['title'] }}“@endif
                                @if ($item->error) – {{ $item->error }}@endif
                            </p>
                        </div>
                        <div class="flex gap-2">
                            @if ($item->status === 'ready')<a class="btn btn-primary" href="{{ route('import.queue.review', $item) }}">Prüfen und speichern</a>@endif
                            @if ($item->status === 'saved' && $item->recipe_id)<a class="btn" href="{{ route('recipes.show', $item->recipe_id) }}">Ansehen</a>@endif
                            <form method="POST" action="{{ route('import.queue.destroy', $item) }}">@csrf @method('DELETE')<button class="btn-icon" aria-label="Eintrag entfernen"><x-icon name="trash"/></button></form>
                        </div>
                    </li>
                @endforeach
            </ul>
        @endif
    </section>
</div>
@endsection
