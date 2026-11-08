<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <meta name="referrer" content="no-referrer">
    <title>{{ $recipe->title }}</title>
    <link rel="icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="min-h-screen">
<main class="mx-auto max-w-6xl px-4 py-6" x-data="scaler('scaler-data')">
    <p class="mb-2 text-sm text-stone-600">Geteiltes Rezept (nur lesen)</p>
    <h1 class="font-serif text-2xl font-semibold sm:text-3xl">{{ $recipe->title }}</h1>
    @if ($recipe->description)<div class="prose-recipe mt-2 max-w-3xl text-stone-700">{!! $recipe->descriptionHtml() !!}</div>@endif
    <div class="mb-6 mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        @foreach ($recipe->timeRows() as $row)<div><span class="text-stone-600">{{ $row['label'] }}:</span> <span class="font-medium">{{ $row['value'] }}</span></div>@endforeach
        @if ($recipe->source_url || $recipe->source_text)
            <div><span class="text-stone-600">Quelle:</span>
                @if ($recipe->sourceIsUrl())<a href="{{ $recipe->source_url }}" class="break-all text-brand-700 underline" rel="noopener noreferrer nofollow" target="_blank">{{ $recipe->source_text ?: parse_url($recipe->source_url, PHP_URL_HOST) }}</a>
                @else{{ $recipe->source_text }}@endif
            </div>
        @endif
        @if ($recipe->author)<div><span class="text-stone-600">Urheber:</span> {{ $recipe->author }}</div>@endif
    </div>
    @include('recipes._body', [
        'showNotes' => $share->include_notes,
        'showNutrition' => $share->include_nutrition,
        'imageUrl' => $share->include_image && $recipe->image ? route('public.image', $share->token) : null,
    ])
</main>
</body>
</html>
