@php
    use App\Support\Quantity;
    use App\Support\Markdown;
    $o = $options;
    $nutrition = $o->nutrition && $recipe->nutrition && $recipe->nutrition->hasValues() ? $recipe->nutrition->present($factor) : null;
    $img = null;
    if ($o->image && $recipe->image) {
        $img = $pdf ? $recipe->image->absolutePath('display') : route('recipes.image', [$recipe, 'anzeige']);
    }
@endphp
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>{{ $recipe->title }}</title>
<style>
    @page { margin: 18mm 16mm 20mm 16mm; }
    body { font-family: 'DejaVu Sans', system-ui, sans-serif; font-size: 10.5pt; line-height: 1.45; color: #1c1917; margin: 0; }
    .wrap { max-width: 180mm; margin: 0 auto; padding: {{ $pdf ? '0' : '12px' }}; }
    h1 { font-size: 20pt; margin: 0 0 4pt; line-height: 1.2; }
    h2 { font-size: 13pt; margin: 14pt 0 6pt; border-bottom: 1px solid #d6d3d1; padding-bottom: 2pt; page-break-after: avoid; }
    h3 { font-size: 11pt; margin: 8pt 0 3pt; page-break-after: avoid; }
    .meta { color: #57534e; font-size: 9.5pt; margin: 2pt 0; }
    .desc { margin: 6pt 0; }
    img.cover { max-width: 100%; max-height: 85mm; margin: 6pt 0; }
    table.ing { border-collapse: collapse; width: 100%; }
    table.ing td { padding: 2pt 4pt; vertical-align: top; border-bottom: 1px solid #f5f5f4; }
    table.ing td.q { width: 28%; text-align: right; font-weight: bold; white-space: nowrap; }
    tr { page-break-inside: avoid; }
    ol.steps { padding-left: 16pt; margin: 0; }
    ol.steps li { margin-bottom: 6pt; }
    .md p { margin: 0 0 4pt; }
    .md ul, .md ol { margin: 2pt 0 4pt; padding-left: 14pt; }
    .md h1, .md h2, .md h3, .md h4 { font-size: 11pt; border: 0; margin: 6pt 0 2pt; padding: 0; }
    .md a { color: #33522e; }
    .notes { background: #fffbeb; border: 1px solid #fde68a; padding: 6pt 8pt; }
    table.nutri { border-collapse: collapse; }
    table.nutri td { padding: 1pt 10pt 1pt 0; }
    .src { margin-top: 14pt; font-size: 9pt; color: #57534e; word-wrap: break-word; }
    .toolbar { margin-bottom: 12px; display: flex; gap: 8px; }
    .toolbar button, .toolbar a { font: inherit; padding: 8px 14px; border: 1px solid #a8a29e; border-radius: 8px; background: #fff; color: #1c1917; text-decoration: none; cursor: pointer; }
    @media print { .toolbar { display: none; } .wrap { padding: 0; } }
</style>
</head>
<body>
<div class="wrap">
    @unless ($pdf)
        <div class="toolbar" x-data>
            <button type="button" x-on:click="window.print()">Drucken</button>
            <a href="{{ route('recipes.show', $recipe) }}">Zurück zum Rezept</a>
        </div>
        @vite(['resources/js/app.js'])
    @endunless

    <h1>{{ $recipe->title }}</h1>
    <p class="meta">
        Menge: <strong>{{ Quantity::format($o->target) }} {{ $recipe->yield_unit }}</strong>
        @if (abs($factor - 1) > 1e-9) (Original: {{ Quantity::format($recipe->yield_quantity) }} {{ $recipe->yield_unit }})@endif
        @if ($recipe->type) · {{ $recipe->type->name }}@endif
    </p>
    @if ($recipe->timeRows())
        <p class="meta">@foreach ($recipe->timeRows() as $row){{ $row['label'] }}: {{ $row['value'] }}@if (! $loop->last) · @endif @endforeach</p>
    @endif
    @if ($recipe->description)<div class="desc md">{!! Markdown::toHtml($recipe->description) !!}</div>@endif
    @if ($img)<img class="cover" src="{{ $img }}" alt="">@endif

    <h2>Zutaten</h2>
    @foreach ($recipe->ingredientGroups as $group)
        @if ($group->name)<h3>{{ $group->name }}</h3>@endif
        <table class="ing">
            @foreach ($group->ingredients as $ing)
                <tr><td class="q">{{ trim($ing->displayQuantity($factor).' '.$ing->unit) }}</td><td>{{ $ing->name }}@if ($ing->note){{ $ing->noteSeparator() }}{{ $ing->note }}@endif</td></tr>
            @endforeach
        </table>
    @endforeach

    <h2>Zubereitung</h2>
    <ol class="steps">
        @foreach ($recipe->steps as $step)
            <li class="md">{!! $step->html() !!}</li>
        @endforeach
    </ol>

    @if ($nutrition)
        <h2>Nährwerte <span style="font-weight: normal; font-size: 9.5pt;">({{ $nutrition['basis'] }})</span></h2>
        <table class="nutri">
            @foreach ($nutrition['rows'] as $row)<tr><td>{{ $row['label'] }}</td><td style="text-align:right">{{ $row['value'] }} {{ $row['unit'] }}</td></tr>@endforeach
        </table>
    @endif

    @if ($o->notes && $recipe->notes)
        <h2>Eigene Notizen</h2>
        <div class="notes md">{!! $recipe->notesHtml() !!}</div>
    @endif

    @if ($source)<p class="src">{!! nl2br(e($source)) !!}</p>@endif
</div>
</body>
</html>
