{{-- Gemeinsamer Rezeptinhalt (angemeldete Ansicht und öffentliche Freigabe). Erwartet $recipe, $target, $showNotes, $showNutrition, $imageUrl --}}
@php
    use App\Support\Quantity;
    $factor = $recipe->yield_quantity > 0 ? $target / $recipe->yield_quantity : 1;
    $lines = [];
    foreach ($recipe->ingredientGroups as $g) { foreach ($g->ingredients as $i) { $lines[$i->id] = $i->toScalerArray(); } }
    $nutrition = $showNutrition && $recipe->nutrition && $recipe->nutrition->hasValues() ? $recipe->nutrition : null;
    $nPresent = $nutrition?->present($factor);
    $scalerData = [
        'original' => $recipe->yield_quantity,
        'initial' => $target,
        'unit' => $recipe->yield_unit,
        'lines' => (object) $lines,
        'nutrition' => $nutrition ? ['basis' => $nutrition->basis, 'rows' => collect($nPresent['rows'])->map(fn ($r) => ['key' => $r['field'], 'raw' => $r['raw']])->values()] : null,
    ];
@endphp
<script type="application/json" id="scaler-data">{!! json_encode($scalerData, JSON_HEX_TAG | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE) !!}</script>

<div class="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
    <div class="space-y-6">
        @if ($imageUrl)
            <img src="{{ $imageUrl }}" alt="Foto: {{ $recipe->title }}" class="w-full rounded-xl object-cover shadow-sm" style="aspect-ratio: {{ $recipe->image->width }} / {{ $recipe->image->height }}">
        @endif

        {{-- Zutaten mit Mengenanpassung --}}
        <section class="card p-4 sm:p-5" aria-labelledby="zutaten-titel">
            <h2 id="zutaten-titel" class="section-title">Zutaten</h2>
            <div class="mt-3 rounded-lg bg-stone-50 p-3">
                <label for="zielmenge" class="label">Menge (Original: {{ Quantity::format($recipe->yield_quantity) }} {{ $recipe->yield_unit }})</label>
                <div class="flex items-center gap-2">
                    <button type="button" class="btn-icon border border-stone-300 bg-white" @click="step(-1)" aria-label="Menge verringern">−</button>
                    <input id="zielmenge" type="text" inputmode="decimal" x-model="targetInput" @change="apply()" @keydown.enter.prevent="apply()"
                           value="{{ Quantity::format($target) }}" class="input w-24 text-center text-lg font-semibold" aria-describedby="menge-hinweis">
                    <button type="button" class="btn-icon border border-stone-300 bg-white" @click="step(1)" aria-label="Menge erhöhen">+</button>
                    <span class="text-stone-700">{{ $recipe->yield_unit }}</span>
                </div>
                <div class="mt-2 flex flex-wrap gap-2 text-sm">
                    <button type="button" class="btn min-h-9 px-3 py-1" @click="times(0.5)">½×</button>
                    <button type="button" class="btn min-h-9 px-3 py-1" @click="times(2)">2×</button>
                    <button type="button" class="btn min-h-9 px-3 py-1" @click="times(3)">3×</button>
                    <button type="button" class="btn btn-ghost min-h-9 px-3 py-1" @click="reset()" x-show="isScaled" x-cloak>Zurücksetzen</button>
                </div>
                <p id="menge-hinweis" class="hint" x-show="!error">Dezimalkomma und Brüche möglich (1,5 · 1/2). Gespeicherte Mengen bleiben unverändert.</p>
                <p class="error" x-show="error" x-text="error" x-cloak role="alert"></p>
            </div>

            @forelse ($recipe->ingredientGroups as $group)
                @if ($group->name)<h3 class="mt-4 font-semibold text-stone-900">{{ $group->name }}</h3>@endif
                <ul class="mt-2 divide-y divide-stone-100">
                    @foreach ($group->ingredients as $ing)
                        <li class="flex gap-3 py-2 text-base">
                            <span class="w-24 shrink-0 text-right font-semibold tabular-nums text-stone-900">
                                <span x-text="qty({{ $ing->id }})">{{ $ing->displayQuantity($factor) }}</span>@if ($ing->unit) {{ $ing->unit }}@endif
                            </span>
                            <span class="min-w-0">
                                {{ $ing->name }}@if ($ing->note)<span class="text-stone-600">{{ $ing->noteSeparator() }}{{ $ing->note }}</span>@endif
                                @if (! $ing->scalable && $ing->quantity !== null)<span class="badge ml-1" title="Diese Menge wird beim Anpassen nicht verändert">fest</span>@endif
                            </span>
                        </li>
                    @endforeach
                </ul>
            @empty
                <p class="mt-3 text-stone-600">Keine Zutaten erfasst.</p>
            @endforelse
        </section>

        @if ($nutrition)
            <section class="card p-4 sm:p-5" aria-labelledby="naehrwerte-titel">
                <h2 id="naehrwerte-titel" class="section-title">Nährwerte</h2>
                <p class="mt-1 text-sm text-stone-600">
                    <span x-text="nutrition && nutrition.basis === 'recipe' && isScaled ? 'gesamtes Rezept (angepasste Menge)' : @js($nutrition->basisText())">{{ $nPresent['basis'] }}</span>
                    @if ($nutrition->basis !== 'recipe') – {{ $nPresent['hint'] }}@endif
                </p>
                <dl class="mt-3 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1">
                    @foreach ($nPresent['rows'] as $row)
                        <dt class="text-stone-700">{{ $row['label'] }}</dt>
                        <dd class="text-right tabular-nums"><span x-text="nutri('{{ $row['field'] }}')">{{ $row['value'] }}</span> {{ $row['unit'] }}</dd>
                    @endforeach
                </dl>
            </section>
        @endif
    </div>

    <div class="space-y-6">
        <section class="card p-4 sm:p-5" aria-labelledby="zubereitung-titel">
            <h2 id="zubereitung-titel" class="section-title">Zubereitung</h2>
            @if ($recipe->steps->isEmpty())
                <p class="mt-3 text-stone-600">Keine Zubereitungsschritte erfasst.</p>
            @else
                <ol class="mt-3 space-y-4">
                    @foreach ($recipe->steps as $i => $step)
                        <li class="flex gap-3" x-data="{ done: false }">
                            <button type="button" @click="done = !done" :aria-pressed="done.toString()"
                                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold"
                                    :class="done ? 'border-brand-600 bg-brand-600 text-white' : 'border-brand-600 text-brand-700'"
                                    aria-label="Schritt {{ $i + 1 }} als erledigt markieren">{{ $i + 1 }}</button>
                            <div class="prose-recipe min-w-0 flex-1 text-[1.05rem]" :class="done && 'opacity-50'">{!! $step->html() !!}</div>
                        </li>
                    @endforeach
                </ol>
            @endif
        </section>

        @if ($showNotes && $recipe->notes)
            <section class="card border-amber-200 bg-amber-50/50 p-4 sm:p-5" aria-labelledby="notizen-titel">
                <h2 id="notizen-titel" class="section-title">Eigene Notizen</h2>
                <div class="prose-recipe mt-2">{!! $recipe->notesHtml() !!}</div>
            </section>
        @endif
    </div>
</div>
