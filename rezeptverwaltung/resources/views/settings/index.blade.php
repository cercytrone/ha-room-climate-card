@extends('layouts.app', ['title' => 'Einstellungen'])
@section('content')
<div class="mb-4 flex flex-wrap items-end justify-between gap-3">
    <h1 class="font-serif text-2xl font-semibold sm:text-3xl">Einstellungen</h1>
    <a href="{{ route('settings.system') }}" class="btn">Systemprüfung</a>
</div>

<div class="grid gap-6 lg:grid-cols-2">
<section class="card space-y-4 p-4 sm:p-5" aria-labelledby="konto">
    <h2 id="konto" class="section-title">Konto</h2>
    <form method="POST" action="{{ route('settings.account') }}" class="space-y-3">@csrf @method('PUT')
        <div><label class="label" for="name">Name</label><input id="name" name="name" value="{{ old('name', $user->name) }}" required class="input"></div>
        <div><label class="label" for="email">E-Mail-Adresse (Anmeldename)</label><input id="email" name="email" type="email" value="{{ old('email', $user->email) }}" required class="input"></div>
        <button class="btn">Speichern</button>
    </form>
    <form method="POST" action="{{ route('settings.password') }}" class="space-y-3 border-t border-stone-200 pt-4">@csrf @method('PUT')
        <h3 class="font-semibold">Passwort ändern</h3>
        <div><label class="label" for="current_password">Aktuelles Passwort</label><input id="current_password" name="current_password" type="password" autocomplete="current-password" required class="input @error('current_password') input-error @enderror">
            @error('current_password')<p class="error">{{ $message }}</p>@enderror</div>
        <div><label class="label" for="password">Neues Passwort (mind. 12 Zeichen)</label><input id="password" name="password" type="password" autocomplete="new-password" required class="input @error('password') input-error @enderror">
            @error('password')<p class="error">{{ $message }}</p>@enderror</div>
        <div><label class="label" for="password_confirmation">Neues Passwort wiederholen</label><input id="password_confirmation" name="password_confirmation" type="password" autocomplete="new-password" required class="input"></div>
        <button class="btn">Passwort ändern</button>
    </form>
</section>

<section class="card space-y-4 p-4 sm:p-5" aria-labelledby="darstellung">
    <h2 id="darstellung" class="section-title">Darstellung</h2>
    <form method="POST" action="{{ route('settings.display') }}" class="space-y-3">@csrf @method('PUT')
        <fieldset><legend class="label">Standardansicht der Rezeptsammlung</legend>
            <label class="flex min-h-10 items-center gap-3"><input type="radio" name="default_view" value="karten" class="checkbox" @checked($settings['default_view'] === 'karten')> Karten</label>
            <label class="flex min-h-10 items-center gap-3"><input type="radio" name="default_view" value="liste" class="checkbox" @checked($settings['default_view'] === 'liste')> Kompakte Liste</label>
        </fieldset>
        <button class="btn">Speichern</button>
    </form>
    <div class="border-t border-stone-200 pt-4 text-sm text-stone-700">
        <h3 class="font-semibold text-stone-900">E-Mail-Versand</h3>
        @if ($mailEnabled)
            <p>Direkter Versand per SMTP ist eingerichtet.</p>
        @else
            <p>Direkter Versand ist nicht eingerichtet. Teilen per E-Mail-Programm funktioniert trotzdem. Einrichtung: SMTP-Zugangsdaten in der <code>.env</code> auf dem Server eintragen (siehe Installationsanleitung).</p>
        @endif
        <h3 class="mt-3 font-semibold text-stone-900">Bilder</h3>
        <p>Maximal {{ config('rezepte.images.max_mb') }} MB, {{ config('rezepte.images.max_side') }} px Kantenlänge, {{ config('rezepte.images.max_megapixels') }} Megapixel (änderbar in der <code>.env</code>).</p>
    </div>
</section>

<section class="card space-y-4 p-4 sm:p-5 lg:col-span-2" aria-labelledby="sicherung">
    <h2 id="sicherung" class="section-title">Sicherungen</h2>
    <p class="text-sm text-stone-600">Eine Sicherung enthält die komplette Datenbank und alle hochgeladenen Bilder. Sie liegt geschützt außerhalb des öffentlichen Verzeichnisses. Bitte zusätzlich regelmäßig herunterladen und auf einem getrennten Speichermedium aufbewahren.</p>
    <div class="grid gap-6 md:grid-cols-2">
        <form method="POST" action="{{ route('settings.backup') }}" class="space-y-3">@csrf @method('PUT')
            <input type="hidden" name="backup_enabled" value="0">
            <label class="flex min-h-10 items-center gap-3"><input type="checkbox" name="backup_enabled" value="1" class="checkbox" @checked($settings['backup_enabled'])> Tägliche Sicherung per Cronjob (gegen {{ substr(config('rezepte.backup.time'), 0, 2) }}:00 Uhr)</label>
            <div><label class="label" for="backup_keep">Anzahl aufbewahrter Sicherungen</label><input id="backup_keep" name="backup_keep" type="number" min="1" max="365" value="{{ $settings['backup_keep'] }}" class="input w-32"></div>
            <div><label class="label" for="backup_max_age_days">Ältere Sicherungen löschen nach (Tagen, 0 = nie)</label><input id="backup_max_age_days" name="backup_max_age_days" type="number" min="0" max="3650" value="{{ $settings['backup_max_age_days'] }}" class="input w-32"></div>
            <p class="hint">Die jeweils neueste Sicherung wird nie automatisch gelöscht.</p>
            <button class="btn">Speichern</button>
        </form>
        <div class="space-y-3">
            <form method="POST" action="{{ route('backups.store') }}" x-data="{ busy: false }" @submit="busy = true">@csrf
                <button class="btn btn-primary" :disabled="busy" x-text="busy ? 'Sicherung läuft …' : 'Jetzt sichern'">Jetzt sichern</button></form>
            @if (empty($backups))
                <p class="text-sm text-stone-600">Noch keine Sicherungen vorhanden.</p>
            @else
                <ul class="divide-y divide-stone-200">
                    @foreach ($backups as $b)
                        <li class="flex flex-wrap items-center justify-between gap-2 py-2">
                            <span class="text-sm"><span class="font-mono">{{ $b['name'] }}</span> · {{ number_format($b['size'] / 1048576, 1, ',', '.') }} MB</span>
                            <span class="flex gap-1">
                                <a class="btn" href="{{ route('backups.download', $b['name']) }}"><x-icon name="download"/> Laden</a>
                                <form method="POST" action="{{ route('backups.destroy', $b['name']) }}" x-data @submit="if (!confirm('Sicherung löschen?')) $event.preventDefault()">@csrf @method('DELETE')
                                    <button class="btn-icon text-red-700" aria-label="Sicherung löschen"><x-icon name="trash"/></button></form>
                            </span>
                        </li>
                    @endforeach
                </ul>
            @endif
            <p class="hint">Wiederherstellung per SSH: <code>php artisan rezepte:sicherung-wiederherstellen &lt;Datei&gt;</code> (siehe docs/BACKUP.md).</p>
        </div>
    </div>
</section>

<section class="card space-y-4 p-4 sm:p-5" aria-labelledby="export">
    <h2 id="export" class="section-title">Export der Sammlung</h2>
    <p class="text-sm text-stone-600">ZIP-Datei mit allen Rezepten (JSON, dokumentiertes Format) und Bildern – zum Archivieren oder Übertragen in eine andere Installation.</p>
    <form method="POST" action="{{ route('export.download') }}" class="space-y-2">@csrf
        <input type="hidden" name="notes" value="0">
        <label class="flex min-h-10 items-center gap-3"><input type="checkbox" name="notes" value="1" class="checkbox" checked> Persönliche Notizen einschließen</label>
        <label class="flex min-h-10 items-center gap-3"><input type="checkbox" name="originals" value="1" class="checkbox"> Originalbilder einschließen (größere Datei)</label>
        <button class="btn btn-primary"><x-icon name="download"/> Export herunterladen</button>
    </form>
</section>

<section class="card space-y-4 p-4 sm:p-5" aria-labelledby="reimport">
    <h2 id="reimport" class="section-title">Export wieder einlesen</h2>
    <p class="text-sm text-stone-600">Rezepte aus einer Exportdatei werden <strong>hinzugefügt</strong>; vorhandene Rezepte bleiben unverändert.</p>
    <form method="POST" action="{{ route('export.import') }}" enctype="multipart/form-data" class="space-y-2" x-data="{ busy: false }" @submit="busy = true">@csrf
        <label class="label" for="file">Exportdatei (.zip)</label>
        <input id="file" type="file" name="file" accept=".zip,application/zip" required class="block w-full text-sm file:mr-3 file:min-h-11 file:rounded-lg file:border file:border-stone-300 file:bg-white file:px-4">
        @error('file')<p class="error">{{ $message }}</p>@enderror
        <input type="hidden" name="skip_duplicates" value="0">
        <label class="flex min-h-10 items-center gap-3"><input type="checkbox" name="skip_duplicates" value="1" class="checkbox" checked> Rezepte mit bereits vorhandener Quell-URL überspringen</label>
        <button class="btn" :disabled="busy" x-text="busy ? 'Import läuft …' : 'Importieren'">Importieren</button>
    </form>
    @if (session('import_warnings'))
        <ul class="list-disc pl-5 text-sm text-amber-900">@foreach (session('import_warnings') as $w)<li>{{ $w }}</li>@endforeach</ul>
    @endif
</section>

<section class="card p-4 sm:p-5 lg:col-span-2" aria-labelledby="aufgaben">
    <h2 id="aufgaben" class="section-title">Protokoll geplanter Aufgaben</h2>
    @if ($runs->isEmpty())
        <p class="mt-2 text-sm text-stone-600">Noch keine Einträge. Läuft der Cronjob? (siehe Systemprüfung)</p>
    @else
        <div class="mt-2 overflow-x-auto">
            <table class="w-full text-left text-sm">
                <thead><tr class="border-b border-stone-200 text-stone-600"><th class="py-2 pr-3">Zeit</th><th class="py-2 pr-3">Aufgabe</th><th class="py-2 pr-3">Status</th><th class="py-2">Meldung</th></tr></thead>
                <tbody>
                @foreach ($runs as $run)
                    <tr class="border-b border-stone-100 align-top">
                        <td class="py-2 pr-3 whitespace-nowrap">{{ $run->started_at->format('d.m.Y H:i') }}</td>
                        <td class="py-2 pr-3">{{ $run->task }}</td>
                        <td class="py-2 pr-3">@if ($run->status === 'failed')<span class="badge bg-red-100 text-red-800">Fehler</span>@elseif ($run->status === 'success')<span class="badge bg-brand-100 text-brand-800">OK</span>@else<span class="badge">läuft</span>@endif</td>
                        <td class="py-2">{{ $run->message }}</td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    @endif
</section>
</div>
@endsection
