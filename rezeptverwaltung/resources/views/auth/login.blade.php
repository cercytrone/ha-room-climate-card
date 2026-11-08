@extends('layouts.guest', ['title' => 'Anmelden'])
@section('content')
<div class="mx-auto mt-8 max-w-sm">
    <div class="mb-6 flex items-center gap-3">
        <img src="{{ asset('favicon.svg') }}" alt="" class="h-10 w-10">
        <h1 class="font-serif text-2xl font-semibold text-brand-800">{{ config('app.name') }}</h1>
    </div>
    @if (session('status'))
        <p role="status" class="mb-4 rounded-lg bg-brand-50 px-4 py-3 text-brand-800">{{ session('status') }}</p>
    @endif
    @if ($noUser)
        <div class="mb-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Es ist noch kein Benutzerkonto eingerichtet. Bitte per SSH im Anwendungsverzeichnis ausführen:<br>
            <code class="mt-1 inline-block rounded bg-white px-1">php artisan rezepte:benutzer-anlegen</code>
        </div>
    @endif
    <form method="POST" action="{{ route('login.attempt') }}" class="card space-y-4 p-6">
        @csrf
        <div>
            <label for="email" class="label">E-Mail-Adresse</label>
            <input id="email" name="email" type="email" autocomplete="username" required autofocus value="{{ old('email') }}"
                   class="input @error('email') input-error @enderror" @error('email') aria-invalid="true" aria-describedby="email-error" @enderror>
            @error('email')<p id="email-error" class="error">{{ $message }}</p>@enderror
        </div>
        <div>
            <label for="password" class="label">Passwort</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required class="input @error('password') input-error @enderror">
            @error('password')<p class="error">{{ $message }}</p>@enderror
        </div>
        <label class="flex min-h-11 items-center gap-3 text-sm">
            <input type="checkbox" name="remember" value="1" class="checkbox"> Angemeldet bleiben (auf diesem Gerät)
        </label>
        <button class="btn btn-primary w-full">Anmelden</button>
    </form>
</div>
@endsection
