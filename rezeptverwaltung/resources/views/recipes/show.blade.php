@extends('layouts.app', ['title' => $recipe->title])
@section('content')
@php use App\Support\Quantity; @endphp
<div x-data="scaler('scaler-data')">
    <div class="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div class="min-w-0">
            <a href="{{ route('recipes.index') }}" class="text-sm text-brand-700 hover:underline">‹ Rezeptsammlung</a>
            <h1 class="mt-1 font-serif text-2xl font-semibold leading-tight sm:text-3xl">{{ $recipe->title }}</h1>
            <div class="mt-2 flex flex-wrap items-center gap-2 text-sm text-stone-700">
                @if ($recipe->type)<span class="badge bg-brand-100 text-brand-800">{{ $recipe->type->name }}</span>@endif
                @foreach ($recipe->categories as $c)
                    <a href="{{ route('recipes.index', ['kategorie' => $c->id]) }}" class="badge hover:bg-stone-200">{{ $c->pathName() }}</a>
                @endforeach
                @foreach ($recipe->tags as $t)
                    <a href="{{ route('recipes.index', ['q' => $t->name]) }}" class="text-stone-600 hover:underline">#{{ $t->name }}</a>
                @endforeach
                @include('recipes._stars', ['rating' => $recipe->rating])
            </div>
        </div>
        <div class="no-print flex flex-wrap gap-2">
            <form method="POST" action="{{ route('recipes.favorite', $recipe) }}">@csrf
                <button class="btn {{ $recipe->is_favorite ? 'text-rose-700' : '' }}" aria-pressed="{{ $recipe->is_favorite ? 'true' : 'false' }}">
                    <x-icon name="heart" class="h-5 w-5 {{ $recipe->is_favorite ? 'fill-current' : '' }}"/> {{ $recipe->is_favorite ? 'Favorit' : 'Merken' }}
                </button>
            </form>
            <a href="{{ route('recipes.edit', $recipe) }}" class="btn"><x-icon name="edit"/> Bearbeiten</a>
        </div>
    </div>

    @if ($recipe->description)
        <div class="prose-recipe mb-4 max-w-3xl text-stone-700">{!! $recipe->descriptionHtml() !!}</div>
    @endif

    <div class="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        @foreach ($recipe->timeRows() as $row)
            <div><span class="text-stone-600">{{ $row['label'] }}:</span> <span class="font-medium">{{ $row['value'] }}</span></div>
        @endforeach
        @if ($recipe->source_url || $recipe->source_text)
            <div class="min-w-0"><span class="text-stone-600">Quelle:</span>
                @if ($recipe->sourceIsUrl())
                    <a href="{{ $recipe->source_url }}" class="break-all text-brand-700 underline" rel="noopener noreferrer nofollow" target="_blank">{{ $recipe->source_text ?: parse_url($recipe->source_url, PHP_URL_HOST) }}</a>
                @else
                    {{ $recipe->source_text }}
                @endif
            </div>
        @endif
        @if ($recipe->author)<div><span class="text-stone-600">Urheber:</span> {{ $recipe->author }}</div>@endif
    </div>

    {{-- Aktionen --}}
    <div class="no-print mb-6 flex flex-wrap gap-2" x-data="shareDialog({ title: @js($recipe->title), original: @js(Quantity::toInput($recipe->yield_quantity)), textUrl: @js(route('recipes.text', $recipe)), pdfUrl: @js(route('recipes.pdf', $recipe)), printUrl: @js(route('recipes.print', $recipe)), pdfName: @js(\App\Services\Share\PdfRenderer::filename($recipe->title)) })">
        <button type="button" class="btn btn-primary" @click="useTarget = isScaled; open()"><x-icon name="share"/> Teilen · Drucken · PDF</button>
        <div x-data="wakeLock" x-show="supported" x-cloak>
            <button type="button" class="btn" @click="toggle()" :aria-pressed="active.toString()"><x-icon name="sun"/> <span x-text="active ? 'Bildschirm bleibt an' : 'Bildschirm anlassen'"></span></button>
        </div>

        <dialog x-ref="dialog" class="m-auto w-[min(36rem,calc(100vw-2rem))] rounded-xl p-0 shadow-xl" aria-labelledby="share-title">
            <div class="p-5">
                <div class="flex items-start justify-between gap-2">
                    <h2 id="share-title" class="section-title">Teilen, Drucken, PDF</h2>
                    <button type="button" class="btn-icon" @click="close()" aria-label="Schließen"><x-icon name="x"/></button>
                </div>
                <fieldset class="mt-3 space-y-1">
                    <legend class="label">Menge</legend>
                    <label class="flex min-h-10 items-center gap-3"><input type="radio" class="checkbox" :value="false" x-model.boolean="useTarget" name="share_qty"> Originalmenge ({{ Quantity::format($recipe->yield_quantity) }} {{ $recipe->yield_unit }})</label>
                    <label class="flex min-h-10 items-center gap-3"><input type="radio" class="checkbox" :value="true" x-model.boolean="useTarget" name="share_qty"> Aktuelle Menge (<span x-text="targetInput"></span> {{ $recipe->yield_unit }})</label>
                </fieldset>
                <fieldset class="mt-3 space-y-1">
                    <legend class="label">Inhalt</legend>
                    @if ($recipe->image)<label class="flex min-h-10 items-center gap-3"><input type="checkbox" class="checkbox" x-model="image"> Mit Bild (Druck/PDF)</label>@endif
                    @if ($recipe->nutrition)<label class="flex min-h-10 items-center gap-3"><input type="checkbox" class="checkbox" x-model="nutrition"> Mit Nährwerten</label>@endif
                    @if ($recipe->notes)<label class="flex min-h-10 items-center gap-3"><input type="checkbox" class="checkbox" x-model="notes"> Mit persönlichen Notizen <span class="text-sm text-stone-500">(standardmäßig aus)</span></label>@endif
                </fieldset>
                <div class="mt-4 grid gap-2 sm:grid-cols-2">
                    <button type="button" class="btn" @click="mail($data)">Per E-Mail-Programm</button>
                    <button type="button" class="btn" @click="whatsapp($data)">Per WhatsApp</button>
                    <button type="button" class="btn" @click="copy($data)">Als Text kopieren</button>
                    <button type="button" class="btn" x-show="canNativeShare" @click="nativeShare($data)" :disabled="busy">Teilen … (Gerät)</button>
                    <a class="btn" :href="printHref($data)" target="_blank" rel="noopener"><x-icon name="print"/> Druckansicht</a>
                    <a class="btn" :href="pdfHref($data)"><x-icon name="download"/> PDF herunterladen</a>
                    <button type="button" class="btn sm:col-span-2" x-show="canNativeShare" @click="nativeShare($data, true)" :disabled="busy">PDF teilen … (Gerät)</button>
                </div>
                <p class="mt-3 text-sm text-brand-800" role="status" x-text="message"></p>

                @if ($mailEnabled)
                    <details class="mt-4 border-t border-stone-200 pt-3">
                        <summary class="cursor-pointer py-2 font-medium">Direkt per E-Mail senden (SMTP)</summary>
                        <form method="POST" :action="@js(route('recipes.mail', $recipe)) + '?' + query($data)" class="mt-2 space-y-3">
                            @csrf
                            <div><label class="label" for="recipient">Empfänger (eine Adresse)</label><input id="recipient" type="email" name="recipient" required class="input"></div>
                            <div><label class="label" for="mail-message">Persönliche Nachricht (optional)</label><textarea id="mail-message" name="message" rows="2" class="input"></textarea></div>
                            <label class="flex min-h-10 items-center gap-3"><input type="checkbox" name="attach_pdf" value="1" class="checkbox" checked> PDF anhängen</label>
                            <p class="hint" x-show="notes">Achtung: Die persönlichen Notizen werden mitgesendet.</p>
                            <button class="btn btn-primary">Senden</button>
                        </form>
                    </details>
                @endif
            </div>
        </dialog>
    </div>

    @include('recipes._body', ['showNotes' => true, 'showNutrition' => true, 'imageUrl' => $recipe->image ? route('recipes.image', [$recipe, 'anzeige']) : null])

    {{-- Einkaufsliste --}}
    <section class="no-print card mt-6 p-4 sm:p-5" aria-labelledby="einkauf-titel">
        <h2 id="einkauf-titel" class="section-title">Zur Einkaufsliste</h2>
        @php $defaultListUrl = route('shopping.add-recipe', $lists->first() ?? \App\Models\ShoppingList::defaultFor(auth()->user())); @endphp
        <form method="POST" x-data="{ listUrl: @js($defaultListUrl) }" :action="listUrl" action="{{ $defaultListUrl }}" class="mt-3 flex flex-wrap items-end gap-3">
            @csrf
            <input type="hidden" name="recipe_id" value="{{ $recipe->id }}">
            <div>
                <label class="label" for="sl-target">Zielmenge ({{ $recipe->yield_unit }})</label>
                <input id="sl-target" name="target" type="text" inputmode="decimal" class="input w-28" :value="targetInput" value="{{ Quantity::format($target) }}">
            </div>
            @if ($lists->count() > 1)
                <div>
                    <label class="label" for="sl-list">Liste</label>
                    <select id="sl-list" x-model="listUrl" class="input">
                        @foreach ($lists as $l)<option value="{{ route('shopping.add-recipe', $l) }}">{{ $l->name }}</option>@endforeach
                    </select>
                </div>
            @endif
            <button class="btn btn-primary"><x-icon name="cart"/> Zutaten übernehmen</button>
        </form>
        <p class="hint">Ist das Rezept bereits auf der Liste, werden Sie gefragt, ob die vorhandene Auswahl aktualisiert oder zusätzlich aufgenommen werden soll.</p>
    </section>

    {{-- Öffentliche Freigabe (optional) --}}
    <section class="no-print card mt-6 p-4 sm:p-5" aria-labelledby="freigabe-titel">
        <h2 id="freigabe-titel" class="section-title">Öffentlicher Freigabelink</h2>
        <p class="mt-1 text-sm text-stone-600">Standardmäßig ist jedes Rezept privat. Ein Freigabelink erlaubt das Lesen <em>nur dieses Rezepts</em> ohne Anmeldung und kann jederzeit widerrufen werden.</p>
        @if (session('new_share_url'))
            <div class="mt-3 rounded-lg border border-brand-200 bg-brand-50 p-3" x-data="copyField">
                <label class="label" for="new-share">Neuer Link</label>
                <div class="flex gap-2"><input id="new-share" readonly class="input" value="{{ session('new_share_url') }}"><button type="button" class="btn" @click="copy(@js(session('new_share_url')))" x-text="copied ? 'Kopiert' : 'Kopieren'">Kopieren</button></div>
            </div>
        @endif
        @if ($recipe->shares->isNotEmpty())
            <ul class="mt-3 divide-y divide-stone-200">
                @foreach ($recipe->shares as $share)
                    <li class="flex flex-wrap items-center justify-between gap-2 py-2" x-data="copyField">
                        <div class="text-sm">
                            <span class="font-mono">…/r/{{ \App\Models\RecipeShare::maskedToken($share->token) }}</span>
                            <span class="text-stone-600">· erstellt {{ $share->created_at->format('d.m.Y') }}
                                · {{ $share->include_notes ? 'mit Notizen' : 'ohne Notizen' }}{{ $share->include_image ? ', mit Bild' : '' }}
                                @if ($share->last_accessed_at) · zuletzt aufgerufen {{ $share->last_accessed_at->format('d.m.Y H:i') }}@endif</span>
                        </div>
                        <div class="flex gap-2">
                            <button type="button" class="btn" @click="copy(@js($share->url()))" x-text="copied ? 'Kopiert' : 'Link kopieren'">Link kopieren</button>
                            <form method="POST" action="{{ route('shares.destroy', $share) }}">@csrf @method('DELETE')
                                <button class="btn btn-danger">Widerrufen</button>
                            </form>
                        </div>
                    </li>
                @endforeach
            </ul>
        @endif
        <details class="mt-3">
            <summary class="cursor-pointer py-2 font-medium text-brand-700">Neuen Freigabelink erstellen</summary>
            <form method="POST" action="{{ route('recipes.shares.store', $recipe) }}" class="mt-2 space-y-1">
                @csrf
                <label class="flex min-h-10 items-center gap-3"><input type="checkbox" name="include_image" value="1" class="checkbox" checked> Bild freigeben</label>
                <label class="flex min-h-10 items-center gap-3"><input type="checkbox" name="include_nutrition" value="1" class="checkbox" checked> Nährwerte freigeben</label>
                <label class="flex min-h-10 items-center gap-3"><input type="checkbox" name="include_notes" value="1" class="checkbox"> Persönliche Notizen freigeben</label>
                <button class="btn mt-2"><x-icon name="link"/> Link erstellen</button>
            </form>
        </details>
    </section>

    <section class="no-print mt-6 flex justify-end">
        <form method="POST" action="{{ route('recipes.destroy', $recipe) }}"
              x-data @submit="if (!confirm(@js('Rezept „'.$recipe->title.'“ endgültig löschen?'."\n\n".'Gelöscht werden auch: Bild, Zutaten, Schritte, Nährwerte und Freigabelinks. Einkaufslisten behalten ihre bereits übernommenen Einträge; die Rezeptauswahl verliert nur den Verweis.'))) $event.preventDefault()">
            @csrf @method('DELETE')
            <button class="btn btn-danger"><x-icon name="trash"/> Rezept löschen</button>
        </form>
    </section>
</div>
@endsection
