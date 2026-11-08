@php $items = $list->items->filter(fn ($i) => $includeChecked || ! $i->is_checked); @endphp
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex">
<title>{{ $list->name }}</title>
<style>
    @page { margin: 16mm; }
    body { font-family: 'DejaVu Sans', system-ui, sans-serif; font-size: 11pt; color: #1c1917; margin: 0; }
    .wrap { max-width: 180mm; margin: 0 auto; padding: {{ $pdf ? '0' : '12px' }}; }
    h1 { font-size: 18pt; margin: 0 0 8pt; }
    h2 { font-size: 11pt; text-transform: uppercase; color: #57534e; margin: 12pt 0 4pt; page-break-after: avoid; }
    table { border-collapse: collapse; width: 100%; }
    td { padding: 3pt 4pt; border-bottom: 1px solid #e7e5e4; vertical-align: top; }
    td.box { width: 14pt; } .sq { display: inline-block; width: 9pt; height: 9pt; border: 1px solid #57534e; }
    td.q { width: 25%; font-weight: bold; white-space: nowrap; }
    tr { page-break-inside: avoid; }
    .muted { color: #78716c; font-size: 9pt; }
    .toolbar { margin-bottom: 12px; } .toolbar button, .toolbar a { font: inherit; padding: 8px 14px; border: 1px solid #a8a29e; border-radius: 8px; background: #fff; color: #1c1917; text-decoration: none; }
    @media print { .toolbar { display: none; } }
</style>
</head>
<body>
<div class="wrap">
    @unless ($pdf)
        <div class="toolbar" x-data><button type="button" x-on:click="window.print()">Drucken</button> <a href="{{ route('shopping.show', $list) }}">Zurück</a></div>
        @vite(['resources/js/app.js'])
    @endunless
    <h1>{{ $list->name }}</h1>
    @php $grouped = $list->group_by_area ? $items->groupBy(fn ($i) => $i->area ?: 'Sonstiges')->sortKeys() : collect(['' => $items]); @endphp
    @forelse ($grouped as $area => $group)
        @if ($area !== '')<h2>{{ $area }}</h2>@endif
        <table>
            @foreach ($group as $i)
                <tr><td class="box"><span class="sq"></span></td><td class="q">{{ trim($i->displayQuantity().' '.$i->unit) }}</td><td>{{ $i->name }}@if ($i->note) <span class="muted">({{ $i->note }})</span>@endif</td></tr>
            @endforeach
        </table>
    @empty
        <p>Keine offenen Einträge.</p>
    @endforelse
    @if ($list->selections->isNotEmpty())
        <p class="muted" style="margin-top: 12pt">Für: {{ $list->selections->map->label()->implode('; ') }}</p>
    @endif
</div>
</body>
</html>
