@extends('layouts.app', ['title' => 'Rezept auswählen'])
@section('content')
<h1 class="mb-2 font-serif text-2xl font-semibold">Mehrere Rezepte gefunden</h1>
<p class="mb-4 text-stone-600">Die Seite enthält {{ count($drafts) }} Rezepte. Welches soll importiert werden?</p>
<ul class="space-y-2">
    @foreach ($drafts as $i => $d)
        <li class="card flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
                <p class="font-semibold">{{ $d['title'] ?: '(ohne Titel)' }}</p>
                <p class="text-sm text-stone-600">{{ collect($d['groups'])->sum(fn ($g) => count($g['items'])) }} Zutaten · {{ count($d['steps']) }} Schritte</p>
            </div>
            <a href="{{ route('import.preview', [$key, $i]) }}" class="btn btn-primary">Auswählen</a>
        </li>
    @endforeach
</ul>
@endsection
