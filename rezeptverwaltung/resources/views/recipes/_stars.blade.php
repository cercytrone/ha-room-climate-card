@if ($rating)
    <span class="inline-flex items-center gap-0.5 text-amber-600" title="{{ $rating }} von 5 Sternen">
        <span class="sr-only">{{ $rating }} von 5 Sternen</span>
        @for ($i = 1; $i <= 5; $i++)
            <x-icon name="star" class="h-4 w-4 {{ $i <= $rating ? 'fill-current' : 'text-stone-300' }}"/>
        @endfor
    </span>
@endif
