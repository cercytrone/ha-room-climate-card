@if ($paginator->hasPages())
    <nav class="mt-6 flex items-center justify-between gap-2" aria-label="Seitennavigation">
        @if ($paginator->onFirstPage())
            <span class="btn opacity-50" aria-disabled="true">‹ Zurück</span>
        @else
            <a class="btn" href="{{ $paginator->previousPageUrl() }}" rel="prev">‹ Zurück</a>
        @endif
        <span class="text-sm text-stone-600">Seite {{ $paginator->currentPage() }} von {{ $paginator->lastPage() }}</span>
        @if ($paginator->hasMorePages())
            <a class="btn" href="{{ $paginator->nextPageUrl() }}" rel="next">Weiter ›</a>
        @else
            <span class="btn opacity-50" aria-disabled="true">Weiter ›</span>
        @endif
    </nav>
@endif
