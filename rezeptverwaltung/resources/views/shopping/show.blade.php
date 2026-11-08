@extends('layouts.app', ['title' => $list->name])
@section('content')
@php
    $items = $list->items;
    $open = $items->where('is_checked', false);
    $groups = $list->group_by_area ? $items->groupBy(fn ($i) => $i->area ?: 'Sonstiges')->sortBy(fn ($g, $k) => array_search($k, $areas) === false ? 99 : array_search($k, $areas)) : collect(['' => $items]);
@endphp
<div class="mb-4 flex flex-wrap items-end justify-between gap-3">
    <div>
        <h1 class="font-serif text-2xl font-semibold sm:text-3xl">{{ $list->name }}</h1>
        <p class="text-sm text-stone-600">{{ $open->count() }} offen · {{ $items->count() - $open->count() }} erledigt</p>
    </div>
    @if ($lists->count() > 1)
        <form method="GET" x-data class="flex items-end gap-2" @change="window.location = $event.target.value">
            <label for="list-switch" class="label">Liste</label>
            <select id="list-switch" class="input">
                @foreach ($lists as $l)<option value="{{ route('shopping.show', $l) }}" @selected($l->id === $list->id)>{{ $l->name }}</option>@endforeach
            </select>
        </form>
    @endif
</div>

<div class="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
<div class="space-y-6">
    <section class="card p-4 sm:p-5" aria-labelledby="eintraege">
        <h2 id="eintraege" class="sr-only">Einträge</h2>
        <form method="POST" action="{{ route('shopping.items.store', $list) }}" class="mb-4 grid grid-cols-[5rem_5rem_1fr] gap-2 sm:grid-cols-[6rem_6rem_1fr_auto]">
            @csrf
            <label class="sr-only" for="ni-q">Menge</label><input id="ni-q" name="quantity" class="input" placeholder="Menge" inputmode="decimal">
            <label class="sr-only" for="ni-u">Einheit</label><input id="ni-u" name="unit" class="input" placeholder="Einh.">
            <label class="sr-only" for="ni-n">Artikel</label><input id="ni-n" name="name" class="input" placeholder="Artikel hinzufügen" required>
            <button class="btn btn-primary col-span-3 sm:col-span-1"><x-icon name="plus"/> Hinzufügen</button>
        </form>

        @if ($items->isEmpty())
            <div class="py-8 text-center text-stone-600">
                <x-icon name="cart" class="mx-auto h-10 w-10 text-stone-400"/>
                <p class="mt-2">Die Liste ist leer. Fügen Sie Artikel hinzu oder übernehmen Sie Zutaten aus einem Rezept.</p>
                <a href="{{ route('recipes.index') }}" class="btn mt-3">Zur Rezeptsammlung</a>
            </div>
        @endif

        @foreach ($groups as $area => $groupItems)
            @if ($area !== '')<h3 class="mt-4 text-sm font-semibold uppercase tracking-wide text-stone-500">{{ $area }}</h3>@endif
            <ul class="divide-y divide-stone-100">
                @foreach ($groupItems as $item)
                    <li class="py-1" x-data="shoppingItem({{ $item->is_checked ? 'true' : 'false' }}, @js(route('shopping.items.toggle', $item)))">
                        <div class="flex items-start gap-3">
                            <form method="POST" action="{{ route('shopping.items.toggle', $item) }}" @submit.prevent="toggle()" class="shrink-0">
                                @csrf @method('PATCH')
                                <button class="flex h-11 w-11 items-center justify-center" role="checkbox" :aria-checked="checked.toString()" aria-checked="{{ $item->is_checked ? 'true' : 'false' }}" aria-label="{{ $item->name }} als gekauft markieren">
                                    <span class="flex h-6 w-6 items-center justify-center rounded border-2" :class="checked ? 'border-brand-600 bg-brand-600 text-white' : 'border-stone-400 bg-white'">
                                        <x-icon name="check" class="h-4 w-4" x-show="checked"/>
                                    </span>
                                </button>
                            </form>
                            <div class="min-w-0 flex-1 py-2" :class="checked && 'text-stone-400 line-through'">
                                <span class="font-semibold tabular-nums">{{ trim($item->displayQuantity().' '.$item->unit) }}</span> {{ $item->name }}
                                @if ($item->note)<span class="text-stone-600">({{ $item->note }})</span>@endif
                                @if ($item->review_reason)
                                    <p class="mt-0.5 text-sm text-amber-800 no-underline"><span class="badge badge-warn">prüfen</span> {{ $item->review_reason }}</p>
                                @endif
                                @if ($item->sources->isNotEmpty())
                                    <p class="text-xs text-stone-500">für: {{ $item->sources->map(fn ($s) => $s->selection?->recipe_title)->filter()->unique()->implode(', ') }}@if ($item->is_manual) · manuell angepasst @endif</p>
                                @elseif ($item->is_manual)
                                    <p class="text-xs text-stone-500">manuell</p>
                                @endif
                            </div>
                            <details class="relative shrink-0">
                                <summary class="btn-icon cursor-pointer list-none" aria-label="{{ $item->name }} bearbeiten"><x-icon name="edit" class="h-4 w-4"/></summary>
                                <div class="absolute right-0 z-20 mt-1 w-80 rounded-xl border border-stone-200 bg-white p-3 shadow-lg">
                                    <form method="POST" action="{{ route('shopping.items.update', $item) }}" class="space-y-2">
                                        @csrf @method('PUT')
                                        <div class="grid grid-cols-2 gap-2">
                                            <div><label class="label" for="iq-{{ $item->id }}">Menge</label><input id="iq-{{ $item->id }}" name="quantity" value="{{ $item->quantity !== null ? \App\Support\Quantity::toInput($item->quantity) : $item->quantity_text }}" class="input"></div>
                                            <div><label class="label" for="iu-{{ $item->id }}">Einheit</label><input id="iu-{{ $item->id }}" name="unit" value="{{ $item->unit }}" class="input"></div>
                                        </div>
                                        <div><label class="label" for="in-{{ $item->id }}">Artikel</label><input id="in-{{ $item->id }}" name="name" value="{{ $item->name }}" required class="input"></div>
                                        <div><label class="label" for="inote-{{ $item->id }}">Notiz</label><input id="inote-{{ $item->id }}" name="note" value="{{ $item->note }}" class="input"></div>
                                        <div><label class="label" for="ia-{{ $item->id }}">Einkaufsbereich</label>
                                            <select id="ia-{{ $item->id }}" name="area" class="input"><option value="">– keiner –</option>
                                                @foreach ($areas as $a)<option @selected($item->area === $a)>{{ $a }}</option>@endforeach</select></div>
                                        <p class="hint">Bearbeitete Einträge werden bei Änderungen der Rezeptauswahl nicht mehr automatisch angepasst.</p>
                                        <button class="btn btn-primary w-full">Speichern</button>
                                    </form>
                                    <form method="POST" action="{{ route('shopping.items.destroy', $item) }}" class="mt-2">@csrf @method('DELETE')
                                        <button class="btn btn-danger w-full"><x-icon name="trash"/> Entfernen</button></form>
                                </div>
                            </details>
                        </div>
                    </li>
                @endforeach
            </ul>
        @endforeach

        @if ($items->isNotEmpty())
            <div class="mt-4 flex flex-wrap gap-2 border-t border-stone-200 pt-4">
                <form method="POST" action="{{ route('shopping.clear-checked', $list) }}">@csrf<button class="btn">Erledigte entfernen</button></form>
                <form method="POST" action="{{ route('shopping.update', $list) }}">@csrf @method('PUT')
                    <input type="hidden" name="group_by_area" value="{{ $list->group_by_area ? 0 : 1 }}">
                    <button class="btn btn-ghost">{{ $list->group_by_area ? 'Ohne Einkaufsbereiche anzeigen' : 'Nach Einkaufsbereichen gruppieren' }}</button></form>
                <form method="POST" action="{{ route('shopping.clear-all', $list) }}" x-data @submit="if (!confirm('Alle Einträge und die Rezeptauswahl dieser Liste entfernen? Rezepte bleiben unverändert.')) $event.preventDefault()">@csrf
                    <button class="btn btn-danger">Liste leeren</button></form>
            </div>
        @endif
    </section>
</div>

<div class="space-y-6">
    <section class="card p-4 sm:p-5" aria-labelledby="rezepte-titel">
        <h2 id="rezepte-titel" class="section-title">Rezepte in dieser Liste</h2>
        @if ($list->selections->isEmpty())
            <p class="mt-2 text-sm text-stone-600">Noch keine Rezepte. Öffnen Sie ein Rezept und wählen Sie „Zutaten übernehmen“ – oder wählen Sie in der Sammlung mehrere Rezepte aus.</p>
        @else
            <ul class="mt-2 divide-y divide-stone-200">
                @foreach ($list->selections as $sel)
                    <li class="py-2">
                        <div class="flex items-start justify-between gap-2">
                            <div class="min-w-0">
                                @if ($sel->recipe)<a href="{{ route('recipes.show', [$sel->recipe, 'menge' => \App\Support\Quantity::toInput($sel->target_quantity)]) }}" class="font-medium hover:text-brand-700">{{ $sel->recipe_title }}</a>
                                @else<span class="font-medium">{{ $sel->recipe_title }}</span> <span class="badge">Rezept gelöscht</span>@endif
                                <p class="text-xs text-stone-500">hinzugefügt {{ $sel->created_at->format('d.m.Y H:i') }}</p>
                            </div>
                            <form method="POST" action="{{ route('shopping.selection.destroy', $sel) }}">@csrf @method('DELETE')
                                <button class="btn-icon" aria-label="{{ $sel->recipe_title }} aus der Liste entfernen"><x-icon name="x"/></button></form>
                        </div>
                        @if ($sel->recipe)
                            <form method="POST" action="{{ route('shopping.selection.update', $sel) }}" class="mt-1 flex items-end gap-2">
                                @csrf @method('PUT')
                                <div><label class="sr-only" for="st-{{ $sel->id }}">Zielmenge</label>
                                    <input id="st-{{ $sel->id }}" name="target" value="{{ \App\Support\Quantity::format($sel->target_quantity) }}" class="input w-24" inputmode="decimal"></div>
                                <span class="pb-2 text-sm">{{ $sel->yield_unit }}</span>
                                <button class="btn">Ändern</button>
                            </form>
                            @error('target_'.$sel->id)<p class="error">{{ $message }}</p>@enderror
                        @else
                            <p class="text-sm text-stone-600">{{ \App\Support\Quantity::format($sel->target_quantity) }} {{ $sel->yield_unit }}</p>
                        @endif
                    </li>
                @endforeach
            </ul>
        @endif
    </section>

    <section class="card p-4 sm:p-5" aria-labelledby="teilen-titel" x-data="textShare({ title: @js($list->name), textUrl: @js(route('shopping.text', $list)) })">
        <h2 id="teilen-titel" class="section-title">Teilen und Drucken</h2>
        <p class="mt-1 text-sm text-stone-600">Geteilt werden die noch offenen Einträge.</p>
        <div class="mt-3 grid grid-cols-2 gap-2">
            <button type="button" class="btn" @click="copy()">Als Text kopieren</button>
            <button type="button" class="btn" @click="whatsapp()">WhatsApp</button>
            <button type="button" class="btn" @click="mail()">E-Mail-Programm</button>
            <button type="button" class="btn" x-show="canNativeShare" @click="share()">Teilen …</button>
            <a class="btn" href="{{ route('shopping.print', $list) }}" target="_blank" rel="noopener"><x-icon name="print"/> Drucken</a>
            <a class="btn" href="{{ route('shopping.pdf', $list) }}"><x-icon name="download"/> PDF</a>
        </div>
        <p class="mt-2 text-sm text-brand-800" role="status" x-text="message"></p>
    </section>

    <section class="card p-4 sm:p-5" aria-labelledby="listen-titel">
        <h2 id="listen-titel" class="section-title">Listen verwalten</h2>
        <form method="POST" action="{{ route('shopping.update', $list) }}" class="mt-3 flex gap-2">@csrf @method('PUT')
            <label for="list-name" class="sr-only">Name dieser Liste</label><input id="list-name" name="name" value="{{ $list->name }}" class="input" required maxlength="150">
            <button class="btn shrink-0">Umbenennen</button></form>
        <form method="POST" action="{{ route('shopping.store') }}" class="mt-3 flex gap-2">@csrf
            <label for="new-list" class="sr-only">Neue Liste</label><input id="new-list" name="name" class="input" placeholder="Neue Liste, z. B. Wochenmarkt" required maxlength="150">
            <button class="btn shrink-0"><x-icon name="plus"/> Anlegen</button></form>
        @if ($lists->count() > 1)
            <form method="POST" action="{{ route('shopping.destroy', $list) }}" class="mt-3" x-data @submit="if (!confirm('Diese Einkaufsliste löschen?')) $event.preventDefault()">@csrf @method('DELETE')
                <button class="btn btn-danger">Diese Liste löschen</button></form>
        @endif
    </section>
</div>
</div>
@endsection
