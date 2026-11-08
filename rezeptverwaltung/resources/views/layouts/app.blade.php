<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="robots" content="noindex, nofollow">
    <meta name="theme-color" content="#33522e">
    <title>{{ isset($title) ? $title.' – ' : '' }}{{ config('app.name') }}</title>
    <link rel="icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script type="application/json" id="app-routes">{!! json_encode(['markdown' => route('helpers.markdown'), 'ingredients' => route('helpers.ingredients')], JSON_HEX_TAG | JSON_UNESCAPED_SLASHES) !!}</script>
    <script src="{{ asset('js/routes.js') }}"></script>
</head>
<body class="min-h-screen">
<a href="#inhalt" class="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">Zum Inhalt springen</a>

@php
    $nav = [
        ['route' => 'recipes.index', 'match' => ['recipes.index', 'recipes.show', 'recipes.edit'], 'label' => 'Rezeptsammlung', 'icon' => 'book'],
        ['route' => 'recipes.create', 'match' => ['recipes.create'], 'label' => 'Rezept hinzufügen', 'icon' => 'plus'],
        ['route' => 'import.index', 'match' => ['import.*'], 'label' => 'Rezept importieren', 'icon' => 'download'],
        ['route' => 'shopping.current', 'match' => ['shopping.*'], 'label' => 'Einkaufsliste', 'icon' => 'cart'],
        ['route' => 'categories.index', 'match' => ['categories.*'], 'label' => 'Kategorien', 'icon' => 'folder'],
        ['route' => 'settings.index', 'match' => ['settings.*'], 'label' => 'Einstellungen', 'icon' => 'settings'],
    ];
@endphp

<header class="no-print sticky top-0 z-30 border-b border-stone-200 bg-white/95 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
        <a href="{{ route('recipes.index') }}" class="flex min-h-11 items-center gap-2 font-serif text-lg font-semibold text-brand-800">
            <img src="{{ asset('favicon.svg') }}" alt="" class="h-7 w-7"> {{ config('app.name') }}
        </a>
        <nav aria-label="Hauptnavigation" class="hidden xl:block">
            <ul class="flex items-center gap-1">
                @foreach ($nav as $item)
                    @php $active = request()->routeIs(...$item['match']); @endphp
                    <li><a href="{{ route($item['route']) }}" @if($active) aria-current="page" @endif
                           class="flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 text-sm font-medium {{ $active ? 'bg-brand-50 text-brand-800' : 'text-stone-700 hover:bg-stone-100' }}">
                            <x-icon :name="$item['icon']" class="h-4 w-4"/> {{ $item['label'] }}</a></li>
                @endforeach
                <li>
                    <form method="POST" action="{{ route('logout') }}">@csrf
                        <button class="btn-icon" title="Abmelden" aria-label="Abmelden"><x-icon name="logout"/></button>
                    </form>
                </li>
            </ul>
        </nav>
        <details class="relative xl:hidden">
            <summary class="btn-icon cursor-pointer list-none" aria-label="Menü öffnen"><x-icon name="menu" class="h-6 w-6"/></summary>
            <nav aria-label="Hauptnavigation" class="absolute right-0 mt-2 w-72 rounded-xl border border-stone-200 bg-white p-2 shadow-lg">
                <ul>
                    @foreach ($nav as $item)
                        @php $active = request()->routeIs(...$item['match']); @endphp
                        <li><a href="{{ route($item['route']) }}" @if($active) aria-current="page" @endif
                               class="flex min-h-12 items-center gap-3 rounded-lg px-3 text-base {{ $active ? 'bg-brand-50 font-semibold text-brand-800' : 'text-stone-800 hover:bg-stone-100' }}">
                                <x-icon :name="$item['icon']"/> {{ $item['label'] }}</a></li>
                    @endforeach
                    <li class="mt-1 border-t border-stone-200 pt-1">
                        <form method="POST" action="{{ route('logout') }}">@csrf
                            <button class="flex min-h-12 w-full items-center gap-3 rounded-lg px-3 text-base text-stone-800 hover:bg-stone-100"><x-icon name="logout"/> Abmelden</button>
                        </form>
                    </li>
                </ul>
            </nav>
        </details>
    </div>
</header>

<main id="inhalt" class="mx-auto max-w-6xl px-4 py-6">
    @include('partials.flash')
    @yield('content')
</main>
</body>
</html>
