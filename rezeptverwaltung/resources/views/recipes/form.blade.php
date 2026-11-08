@php
    $importMode = $importMode ?? false;
    $isEdit = $recipe->exists;
    $state = $draft;
    if (session()->hasOldInput()) {
        $old = session()->getOldInput();
        $state = array_merge($draft, $old);
        $state['categories'] = isset($old['categories_present']) ? ($old['categories'] ?? []) : ($draft['categories'] ?? []);
        $pendingCover = $old['pending_cover'] ?? ($pendingCover ?? null);
    }
    $pendingCover = $pendingCover ?? null;
    if ($pendingCover && ! \App\Services\Images\PendingUpload::valid($pendingCover)) { $pendingCover = null; }
    $warnings = $draft['warnings'] ?? [];
    $title = $isEdit ? 'Rezept bearbeiten' : ($importMode ? 'Import prüfen' : 'Rezept hinzufügen');
    $formState = ['groups' => array_values($state['groups'] ?? []), 'steps' => array_values($state['steps'] ?? [])];
    $selectedCats = array_map('intval', (array) ($state['categories'] ?? []));
    $nutri = is_array($state['nutrition'] ?? null) ? $state['nutrition'] : [];
    $err = fn ($key) => $errors->has($key) ? 'input-error' : '';
@endphp
@extends('layouts.app', ['title' => $title])
@section('content')
<h1 class="mb-4 font-serif text-2xl font-semibold sm:text-3xl">{{ $title }}</h1>

@if ($importMode)
    <div class="mb-4 rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sky-900">
        <p class="font-semibold">Vorschau – noch nicht gespeichert.</p>
        <p class="text-sm">Bitte alle Angaben prüfen und bei Bedarf korrigieren. Das Rezept wird erst mit „Rezept speichern“ angelegt.</p>
    </div>
    @if (! empty($duplicates))
        <div class="mb-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900" role="alert">
            <p class="font-semibold">Mögliche Dublette: Diese Quelle ist bereits in Ihrer Sammlung.</p>
            <ul class="mt-1 list-disc pl-5 text-sm">
                @foreach ($duplicates as $dup)
                    <li><a href="{{ route('recipes.show', $dup->id) }}" class="underline" target="_blank">{{ $dup->title }}</a> (angelegt am {{ $dup->created_at->format('d.m.Y') }})</li>
                @endforeach
            </ul>
            <p class="mt-1 text-sm">Sie können trotzdem speichern – es entsteht dann ein weiteres Rezept.</p>
        </div>
    @endif
    @if ($warnings)
        <div class="mb-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900">
            <p class="font-semibold">Bitte prüfen:</p>
            <ul class="mt-1 list-disc pl-5 text-sm">@foreach ($warnings as $w)<li>{{ $w }}</li>@endforeach</ul>
        </div>
    @endif
@endif

<script type="application/json" id="form-data">{!! json_encode($formState, JSON_HEX_TAG | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE) !!}</script>

<form method="POST" enctype="multipart/form-data" novalidate
      action="{{ $isEdit ? route('recipes.update', $recipe) : route('recipes.store') }}"
      x-data="recipeForm('form-data')" class="space-y-6">
    @csrf
    @if ($isEdit) @method('PUT') @endif
    @if (! empty($queueItemId))<input type="hidden" name="import_queue_item_id" value="{{ $queueItemId }}">@endif
    <input type="hidden" name="categories_present" value="1">

    {{-- Grunddaten --}}
    <section class="card space-y-4 p-4 sm:p-5" aria-labelledby="s-grund">
        <h2 id="s-grund" class="section-title">Grunddaten</h2>
        <div>
            <label for="title" class="label">Titel <span class="text-red-700" aria-hidden="true">*</span></label>
            <input id="title" name="title" required maxlength="255" value="{{ $state['title'] ?? '' }}" class="input {{ $err('title') }}" @error('title') aria-invalid="true" @enderror>
            @error('title')<p class="error">{{ $message }}</p>@enderror
            @if (isset($warnings['title']))<p class="hint text-amber-800">{{ $warnings['title'] }}</p>@endif
        </div>
        <div x-data="markdownField(@js($state['description'] ?? ''))">
            <div class="flex items-center justify-between"><label for="description" class="label">Kurzbeschreibung <span class="font-normal text-stone-500">(optional, Markdown)</span></label>
                <button type="button" class="text-sm text-brand-700 underline" @click="preview ? preview = false : showPreview()" x-text="preview ? 'Bearbeiten' : 'Vorschau'">Vorschau</button></div>
            <textarea id="description" name="description" rows="3" x-model="text" x-show="!preview" class="input {{ $err('description') }}">{{ $state['description'] ?? '' }}</textarea>
            <div x-show="preview" x-cloak class="prose-recipe min-h-20 rounded-lg border border-stone-200 bg-stone-50 p-3" x-html="html"></div>
            @error('description')<p class="error">{{ $message }}</p>@enderror
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
            <div>
                <label for="recipe_type_id" class="label">Rezeptart</label>
                <select id="recipe_type_id" name="recipe_type_id" class="input {{ $err('recipe_type_id') }}">
                    <option value="">– keine –</option>
                    @foreach ($types as $t)<option value="{{ $t->id }}" @selected(($state['recipe_type_id'] ?? null) == $t->id)>{{ $t->name }}</option>@endforeach
                </select>
                <label for="new_type" class="mt-2 block text-sm text-stone-700">oder neue Rezeptart anlegen:</label>
                <input id="new_type" name="new_type" maxlength="100" value="{{ $state['new_type'] ?? '' }}" class="input mt-1" placeholder="z. B. Brot, Hauptgericht, Dessert">
                @if (isset($warnings['type']))<p class="hint text-amber-800">{{ $warnings['type'] }}</p>@endif
            </div>
            <div>
                <label for="tags" class="label">Schlagwörter <span class="font-normal text-stone-500">(durch Komma getrennt)</span></label>
                <input id="tags" name="tags" value="{{ is_array($state['tags'] ?? '') ? implode(', ', $state['tags']) : ($state['tags'] ?? '') }}" class="input {{ $err('tags') }}" placeholder="z. B. schnell, Sommer, Party">
                @error('tags')<p class="error">{{ $message }}</p>@enderror
            </div>
        </div>
        <fieldset>
            <legend class="label">Kategorien</legend>
            @if (empty($categoryTree))
                <p class="text-sm text-stone-600">Noch keine Kategorien vorhanden. <a href="{{ route('categories.index') }}" class="text-brand-700 underline" target="_blank">Kategorien anlegen</a></p>
            @else
                <div class="max-h-64 overflow-y-auto rounded-lg border border-stone-200 p-2">
                    @foreach ($categoryTree as $row)
                        <label class="flex min-h-10 items-center gap-3 rounded px-2 hover:bg-stone-50" style="padding-left: {{ 0.5 + $row['depth'] * 1.5 }}rem">
                            <input type="checkbox" name="categories[]" value="{{ $row['category']->id }}" class="checkbox" @checked(in_array($row['category']->id, $selectedCats, true))>
                            <span>{{ $row['category']->name }}</span>
                        </label>
                    @endforeach
                </div>
            @endif
            @error('categories.*')<p class="error">{{ $message }}</p>@enderror
        </fieldset>
        <div class="grid gap-4 sm:grid-cols-2">
            <fieldset>
                <legend class="label">Eigene Bewertung</legend>
                <div class="flex flex-wrap gap-1">
                    <label class="flex min-h-11 items-center gap-1 rounded-lg border border-stone-300 px-3"><input type="radio" name="rating" value="" class="checkbox" @checked(empty($state['rating']))> keine</label>
                    @for ($i = 1; $i <= 5; $i++)
                        <label class="flex min-h-11 items-center gap-1 rounded-lg border border-stone-300 px-3"><input type="radio" name="rating" value="{{ $i }}" class="checkbox" @checked(($state['rating'] ?? null) == $i)> {{ $i }} <x-icon name="star" class="h-4 w-4 fill-current text-amber-600"/><span class="sr-only">Sterne</span></label>
                    @endfor
                </div>
            </fieldset>
            <div class="flex items-end">
                <input type="hidden" name="is_favorite" value="0">
                <label class="flex min-h-11 items-center gap-3"><input type="checkbox" name="is_favorite" value="1" class="checkbox" @checked(! empty($state['is_favorite']))> Als Favorit markieren</label>
            </div>
        </div>
    </section>

    {{-- Bild --}}
    <section class="card space-y-3 p-4 sm:p-5" aria-labelledby="s-bild">
        <h2 id="s-bild" class="section-title">Rezeptfoto</h2>
        <div class="flex flex-wrap items-start gap-4">
            <div class="w-48">
                <template x-if="coverPreview"><img :src="coverPreview" alt="Vorschau des gewählten Bildes" class="aspect-[4/3] w-48 rounded-lg object-cover"></template>
                <template x-if="!coverPreview">
                    <div>
                        @if ($pendingCover)
                            <img src="{{ route('helpers.pending-image', $pendingCover) }}" alt="Übernommenes Bild" class="aspect-[4/3] w-48 rounded-lg object-cover" :class="removeCover && 'opacity-30'">
                        @elseif ($isEdit && $recipe->image)
                            <img src="{{ route('recipes.image', [$recipe, 'vorschau']) }}" alt="Aktuelles Bild" class="aspect-[4/3] w-48 rounded-lg object-cover" :class="removeCover && 'opacity-30'">
                        @else
                            <div class="flex aspect-[4/3] w-48 items-center justify-center rounded-lg bg-stone-100 text-stone-400"><x-icon name="image" class="h-10 w-10"/></div>
                        @endif
                    </div>
                </template>
            </div>
            <div class="min-w-0 flex-1 space-y-2">
                @if ($pendingCover)
                    <input type="hidden" name="pending_cover" value="{{ $pendingCover }}" :disabled="removeCover">
                    <p class="text-sm text-stone-700">{{ $importMode ? 'Bild der Quelle wird übernommen.' : 'Ihr zuvor gewähltes Bild wurde zwischengespeichert.' }}</p>
                @endif
                <label for="cover" class="label">{{ ($isEdit && $recipe->image) || $pendingCover ? 'Bild ersetzen' : 'Bild hochladen' }}</label>
                <input id="cover" name="cover" type="file" accept="image/jpeg,image/png,image/webp" @change="onCover" class="block w-full text-sm file:mr-3 file:min-h-11 file:rounded-lg file:border file:border-stone-300 file:bg-white file:px-4 file:font-medium">
                <p class="hint">JPEG, PNG oder WebP, höchstens {{ config('rezepte.images.max_mb') }} MB.</p>
                @error('cover')<p class="error">{{ $message }}</p>@enderror
                @if (isset($warnings['image']))<p class="hint text-amber-800">{{ $warnings['image'] }}</p>@endif
                @if (($isEdit && $recipe->image) || $pendingCover)
                    <label class="flex min-h-11 items-center gap-3"><input type="checkbox" name="remove_cover" value="1" class="checkbox" x-model="removeCover"> {{ $pendingCover && ! ($isEdit && $recipe->image) ? 'Bild nicht übernehmen' : 'Bild entfernen' }}</label>
                @endif
            </div>
        </div>
    </section>

    {{-- Menge und Zeiten --}}
    <section class="card space-y-4 p-4 sm:p-5" aria-labelledby="s-menge">
        <h2 id="s-menge" class="section-title">Menge und Zeiten</h2>
        <div class="grid gap-4 sm:grid-cols-2">
            <div>
                <label for="yield_quantity" class="label">Originalmenge <span class="text-red-700" aria-hidden="true">*</span></label>
                <input id="yield_quantity" name="yield_quantity" inputmode="decimal" required value="{{ $state['yield_quantity'] ?? '' }}" class="input {{ $err('yield_quantity') }}" placeholder="z. B. 1 oder 1,5">
                @error('yield_quantity')<p class="error">{{ $message }}</p>@enderror
            </div>
            <div>
                <label for="yield_unit" class="label">Mengeneinheit <span class="text-red-700" aria-hidden="true">*</span></label>
                <input id="yield_unit" name="yield_unit" required maxlength="50" list="yield-units" value="{{ $state['yield_unit'] ?? '' }}" class="input {{ $err('yield_unit') }}" placeholder="Portionen, Brote, Stück, Gläser …">
                <datalist id="yield-units"><option value="Portionen"><option value="Brote"><option value="Brot"><option value="Stück"><option value="Gläser"><option value="Kuchen"><option value="Bleche"><option value="Personen"></datalist>
                @error('yield_unit')<p class="error">{{ $message }}</p>@enderror
                @if (isset($warnings['yield']))<p class="hint text-amber-800">{{ $warnings['yield'] }}</p>@endif
            </div>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            @foreach (['prep_minutes' => 'Arbeitszeit', 'rest_minutes' => 'Ruhe-/Gehzeit', 'cook_minutes' => 'Koch-/Backzeit', 'total_minutes' => 'Gesamtzeit (optional)'] as $f => $label)
                <div>
                    <label for="{{ $f }}" class="label">{{ $label }}</label>
                    <input id="{{ $f }}" name="{{ $f }}" value="{{ $state[$f] ?? '' }}" class="input {{ $err($f) }}" placeholder="z. B. 90 oder 1:30">
                    @error($f)<p class="error">{{ $message }}</p>@enderror
                </div>
            @endforeach
        </div>
        <p class="hint">Zeiten in Minuten oder als Std:Min. Die Gesamtzeit nur angeben, wenn sie von der Summe abweicht (z. B. weil Schritte parallel laufen) – sonst wird die Summe angezeigt.</p>
        @if (isset($warnings['times']))<p class="hint text-amber-800">{{ $warnings['times'] }}</p>@endif
    </section>

    {{-- Zutaten --}}
    <section class="card space-y-4 p-4 sm:p-5" aria-labelledby="s-zutaten">
        <div class="flex flex-wrap items-center justify-between gap-2">
            <h2 id="s-zutaten" class="section-title">Zutaten</h2>
            <button type="button" class="btn" @click="pasteOpen = !pasteOpen" :aria-expanded="pasteOpen.toString()">Zutaten als Text einfügen</button>
        </div>
        @if (isset($warnings['ingredients']))<p class="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">{{ $warnings['ingredients'] }}</p>@endif
        @error('groups.*')<p class="error">{{ $message }}</p>@enderror
        <div x-show="pasteOpen" x-cloak class="rounded-lg border border-stone-200 bg-stone-50 p-3">
            <label for="paste" class="label">Eine Zutat pro Zeile. Zeilen wie „Für den Teig:“ starten eine neue Gruppe.</label>
            <textarea id="paste" rows="6" x-model="pasteText" class="input" placeholder="500 g Mehl&#10;350 ml Wasser&#10;10 g Salz&#10;Salz nach Geschmack"></textarea>
            <p class="error" x-show="pasteError" x-text="pasteError"></p>
            <button type="button" class="btn btn-primary mt-2" @click="pasteIngredients()">Übernehmen</button>
        </div>

        <template x-for="(group, gi) in groups" :key="group._k">
            <fieldset class="rounded-lg border border-stone-200 p-3" :data-group="gi">
                <legend class="sr-only" x-text="'Zutatengruppe ' + (gi + 1)"></legend>
                <div class="flex flex-wrap items-end gap-2">
                    <div class="min-w-0 flex-1">
                        <label class="label" :for="'g-' + gi">Gruppenname <span class="font-normal text-stone-500">(optional, z. B. Vorteig, Füllung)</span></label>
                        <input class="input" :id="'g-' + gi" :name="'groups[' + gi + '][name]'" x-model="group.name" maxlength="150">
                    </div>
                    <div class="flex">
                        <button type="button" class="btn-icon" @click="moveGroup(gi, -1)" :disabled="gi === 0" aria-label="Gruppe nach oben"><x-icon name="up"/></button>
                        <button type="button" class="btn-icon" @click="moveGroup(gi, 1)" :disabled="gi === groups.length - 1" aria-label="Gruppe nach unten"><x-icon name="down"/></button>
                        <button type="button" class="btn-icon text-red-700" @click="removeGroup(gi)" aria-label="Gruppe entfernen"><x-icon name="trash"/></button>
                    </div>
                </div>
                <div class="mt-3 hidden grid-cols-[6rem_6rem_1fr_1fr_auto] gap-2 px-1 text-xs font-medium text-stone-600 md:grid" aria-hidden="true">
                    <span>Menge</span><span>Einheit</span><span>Zutat</span><span>Ergänzung</span><span class="w-44">Skalieren · Reihenfolge</span>
                </div>
                <ul class="mt-1 space-y-2">
                    <template x-for="(item, ii) in group.items" :key="item._k">
                        <li class="rounded-lg p-1" :class="item.uncertain ? 'bg-amber-50 ring-1 ring-amber-300' : ''">
                            <div class="grid grid-cols-2 gap-2 md:grid-cols-[6rem_6rem_1fr_1fr_auto]">
                                <div><label class="sr-only md:not-sr-only md:hidden" :for="'q-'+gi+'-'+ii">Menge</label>
                                    <input class="input" :id="'q-'+gi+'-'+ii" :name="'groups['+gi+'][items]['+ii+'][quantity]'" x-model="item.quantity" placeholder="Menge" aria-label="Menge" inputmode="decimal"></div>
                                <div><input class="input" :name="'groups['+gi+'][items]['+ii+'][unit]'" x-model="item.unit" placeholder="Einheit" aria-label="Einheit" list="units"></div>
                                <div class="col-span-2 md:col-span-1"><input class="input" data-item-name :name="'groups['+gi+'][items]['+ii+'][name]'" x-model="item.name" placeholder="Zutat" aria-label="Zutat"
                                    @keydown.enter.prevent="addItem(gi)"></div>
                                <div class="col-span-2 md:col-span-1"><input class="input" :name="'groups['+gi+'][items]['+ii+'][note]'" x-model="item.note" placeholder="Ergänzung, z. B. zimmerwarm" aria-label="Ergänzung"></div>
                                <div class="col-span-2 flex items-center justify-between gap-1 md:col-span-1 md:w-44">
                                    <input type="hidden" :name="'groups['+gi+'][items]['+ii+'][scalable]'" value="0">
                                    <label class="flex min-h-11 items-center gap-2 text-sm" title="Menge beim Anpassen der Rezeptmenge umrechnen">
                                        <input type="checkbox" class="checkbox" value="1" :name="'groups['+gi+'][items]['+ii+'][scalable]'" x-model="item.scalable"> skalieren</label>
                                    <div class="flex">
                                        <button type="button" class="btn-icon h-10 w-10" @click="moveItem(gi, ii, -1)" aria-label="Zutat nach oben"><x-icon name="up"/></button>
                                        <button type="button" class="btn-icon h-10 w-10" @click="moveItem(gi, ii, 1)" aria-label="Zutat nach unten"><x-icon name="down"/></button>
                                        <button type="button" class="btn-icon h-10 w-10 text-red-700" @click="removeItem(gi, ii)" aria-label="Zutat entfernen"><x-icon name="x"/></button>
                                    </div>
                                </div>
                            </div>
                            <input type="hidden" :name="'groups['+gi+'][items]['+ii+'][original_text]'" :value="item.original_text">
                            <p class="mt-1 px-1 text-xs text-stone-600" x-show="item.original_text" x-cloak>
                                <span x-show="item.uncertain" class="font-semibold text-amber-800">Bitte prüfen – </span>Original: „<span x-text="item.original_text"></span>“</p>
                        </li>
                    </template>
                </ul>
                <button type="button" class="btn btn-ghost mt-2" @click="addItem(gi)"><x-icon name="plus"/> Zutat hinzufügen</button>
            </fieldset>
        </template>
        <datalist id="units"><option value="g"><option value="kg"><option value="ml"><option value="l"><option value="EL"><option value="TL"><option value="Prise"><option value="Pck."><option value="Stück"><option value="Bund"><option value="Dose"><option value="Becher"><option value="Zehen"><option value="Scheiben"></datalist>
        <button type="button" class="btn" @click="addGroup()"><x-icon name="plus"/> Zutatengruppe hinzufügen</button>
        <p class="hint">Menge leer lassen oder Text verwenden (z. B. „etwas“), wenn es keine konkrete Menge gibt – z. B. „Salz“ mit Ergänzung „nach Geschmack“. Bereiche wie „2–3“ sind möglich.</p>
    </section>

    {{-- Zubereitung --}}
    <section class="card space-y-4 p-4 sm:p-5" aria-labelledby="s-zubereitung">
        <h2 id="s-zubereitung" class="section-title">Zubereitung</h2>
        @if (isset($warnings['steps']))<p class="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">{{ $warnings['steps'] }}</p>@endif
        @error('steps.*')<p class="error">{{ $message }}</p>@enderror
        <ol class="space-y-3">
            <template x-for="(step, si) in steps" :key="step._k">
                <li class="rounded-lg border border-stone-200 p-3">
                    <div class="flex items-center justify-between gap-2">
                        <label class="font-semibold" :for="'s-'+si" x-text="'Schritt ' + (si + 1)"></label>
                        <div class="flex items-center">
                            <button type="button" class="mr-2 text-sm text-brand-700 underline" @click="previewStep(si)" x-text="step.preview ? 'Bearbeiten' : 'Vorschau'"></button>
                            <button type="button" class="btn-icon" @click="moveStep(si, -1)" :disabled="si === 0" aria-label="Schritt nach oben"><x-icon name="up"/></button>
                            <button type="button" class="btn-icon" @click="moveStep(si, 1)" :disabled="si === steps.length - 1" aria-label="Schritt nach unten"><x-icon name="down"/></button>
                            <button type="button" class="btn-icon text-red-700" @click="removeStep(si)" aria-label="Schritt entfernen"><x-icon name="trash"/></button>
                        </div>
                    </div>
                    <textarea class="input mt-2" rows="4" data-step-body :id="'s-'+si" :name="'steps['+si+'][body]'" x-model="step.body" x-show="!step.preview"></textarea>
                    <div class="prose-recipe mt-2 rounded-lg bg-stone-50 p-3" x-show="step.preview" x-html="step.html"></div>
                </li>
            </template>
        </ol>
        <button type="button" class="btn" @click="addStep()"><x-icon name="plus"/> Schritt hinzufügen</button>
        <p class="hint">Markdown möglich: <code>**fett**</code>, <code>*kursiv*</code>, <code>- Liste</code>, <code>### Überschrift</code>, <code>[Link](https://…)</code>. HTML und Skripte werden nicht ausgeführt.</p>
    </section>

    {{-- Notizen --}}
    <section class="card space-y-2 p-4 sm:p-5" aria-labelledby="s-notizen" x-data="markdownField(@js($state['notes'] ?? ''))">
        <div class="flex items-center justify-between">
            <h2 id="s-notizen" class="section-title">Eigene Notizen</h2>
            <button type="button" class="text-sm text-brand-700 underline" @click="preview ? preview = false : showPreview()" x-text="preview ? 'Bearbeiten' : 'Vorschau'">Vorschau</button>
        </div>
        <label for="notes" class="sr-only">Eigene Notizen</label>
        <textarea id="notes" name="notes" rows="5" x-model="text" x-show="!preview" class="input" placeholder="Erfahrungen, Varianten, Hinweise …">{{ $state['notes'] ?? '' }}</textarea>
        <div x-show="preview" x-cloak class="prose-recipe min-h-20 rounded-lg border border-stone-200 bg-stone-50 p-3" x-html="html"></div>
        <p class="hint">Persönliche Notizen werden beim Teilen standardmäßig nicht mitgesendet.</p>
    </section>

    {{-- Quelle --}}
    <section class="card space-y-4 p-4 sm:p-5" aria-labelledby="s-quelle">
        <h2 id="s-quelle" class="section-title">Quelle</h2>
        <div class="grid gap-4 sm:grid-cols-2">
            <div>
                <label for="source_url" class="label">Quell-URL</label>
                <input id="source_url" name="source_url" type="url" inputmode="url" value="{{ $state['source_url'] ?? '' }}" class="input {{ $err('source_url') }}" placeholder="https://…">
                @error('source_url')<p class="error">{{ $message }}</p>@enderror
            </div>
            <div>
                <label for="source_text" class="label">Quelle als Text</label>
                <input id="source_text" name="source_text" maxlength="500" value="{{ $state['source_text'] ?? '' }}" class="input" placeholder="z. B. Buchtitel, Seite 42">
            </div>
            <div>
                <label for="author" class="label">Urheber</label>
                <input id="author" name="author" maxlength="255" value="{{ $state['author'] ?? '' }}" class="input">
            </div>
        </div>
    </section>

    {{-- Nährwerte --}}
    <section class="card p-4 sm:p-5" aria-labelledby="s-naehrwerte">
        <details @if(array_filter(array_intersect_key($nutri, \App\Models\RecipeNutrition::FIELDS), fn ($v) => $v !== null && $v !== '') || $errors->has('nutrition.*')) open @endif>
            <summary class="cursor-pointer"><h2 id="s-naehrwerte" class="section-title inline">Nährwerte <span class="text-base font-normal text-stone-500">(optional)</span></h2></summary>
            @if (isset($warnings['nutrition']))<p class="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">{{ $warnings['nutrition'] }}</p>@endif
            <div class="mt-3 grid gap-4 sm:grid-cols-2">
                <div>
                    <label for="n-basis" class="label">Bezugsgröße</label>
                    <select id="n-basis" name="nutrition[basis]" class="input">
                        @foreach (\App\Models\RecipeNutrition::BASES as $k => $l)<option value="{{ $k }}" @selected(($nutri['basis'] ?? 'serving') === $k)>{{ $l }}</option>@endforeach
                    </select>
                </div>
                <div>
                    <label for="n-label" class="label">Bezeichnung der Bezugsgröße <span class="font-normal text-stone-500">(optional)</span></label>
                    <input id="n-label" name="nutrition[basis_label]" maxlength="100" value="{{ $nutri['basis_label'] ?? '' }}" class="input" placeholder="z. B. pro Scheibe (50 g)">
                </div>
            </div>
            <div class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                @foreach (\App\Models\RecipeNutrition::FIELDS as $f => [$l, $u])
                    <div>
                        <label for="n-{{ $f }}" class="label">{{ $l }} ({{ $u }})</label>
                        <input id="n-{{ $f }}" name="nutrition[{{ $f }}]" inputmode="decimal" value="{{ $nutri[$f] ?? '' }}" class="input {{ $err('nutrition.'.$f) }}">
                        @error('nutrition.'.$f)<p class="error">{{ $message }}</p>@enderror
                    </div>
                @endforeach
            </div>
            <p class="hint">Nur tatsächlich bekannte Werte eintragen. Leere Felder werden nicht angezeigt. Werte „pro Portion“ und „pro 100 g“ bleiben beim Anpassen der Rezeptmenge unverändert; Werte für das gesamte Rezept werden umgerechnet.</p>
        </details>
    </section>

    <div class="sticky bottom-0 z-20 -mx-4 flex flex-wrap gap-2 border-t border-stone-200 bg-white/95 px-4 py-3 backdrop-blur">
        <button class="btn btn-primary">Rezept speichern</button>
        <a href="{{ $isEdit ? route('recipes.show', $recipe) : ($importMode ? route('import.index') : route('recipes.index')) }}" class="btn btn-ghost">Abbrechen</a>
    </div>
</form>
@endsection
