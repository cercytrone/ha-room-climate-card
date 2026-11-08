@extends('layouts.app', ['title' => 'Systemprüfung'])
@section('content')
<a href="{{ route('settings.index') }}" class="text-sm text-brand-700 hover:underline">‹ Einstellungen</a>
<h1 class="mb-4 mt-1 font-serif text-2xl font-semibold">Systemprüfung</h1>
<div class="card overflow-x-auto">
    <table class="w-full text-left text-sm">
        <thead><tr class="border-b border-stone-200 text-stone-600"><th class="p-3">Status</th><th class="p-3">Prüfung</th><th class="p-3">Wert</th><th class="p-3">Hinweis</th></tr></thead>
        <tbody>
        @foreach ($rows as $r)
            <tr class="border-b border-stone-100 align-top">
                <td class="p-3">@if ($r['ok'] === true)<span class="badge bg-brand-100 text-brand-800">OK</span>@elseif ($r['ok'] === false)<span class="badge bg-red-100 text-red-800">Problem</span>@else<span class="badge">Info</span>@endif</td>
                <td class="p-3 font-medium">{{ $r['label'] }}</td>
                <td class="p-3 break-all">{{ $r['value'] }}</td>
                <td class="p-3 text-stone-600">{{ $r['hint'] ?? '' }}</td>
            </tr>
        @endforeach
        </tbody>
    </table>
</div>
<p class="mt-4 max-w-3xl text-sm text-stone-600">Hinweis zu HTTPS hinter einem Proxy: Wird die Seite per https:// aufgerufen, aber hier „HTTPS erkannt: nein“ angezeigt, und steht bei „X-Forwarded-Proto“ der Wert „https“, dann die angezeigte Absender-IP (REMOTE_ADDR) in der <code>.env</code> als <code>TRUSTED_PROXIES</code> eintragen. Niemals „*“ verwenden.</p>
@endsection
