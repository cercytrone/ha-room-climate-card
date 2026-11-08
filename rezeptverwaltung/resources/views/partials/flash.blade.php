@if (session('status'))
    <div role="status" class="no-print mb-4 flex items-start gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-brand-800">
        <x-icon name="check" class="mt-0.5 h-5 w-5 shrink-0"/> <div>{{ session('status') }}</div>
    </div>
@endif
@if (session('warning'))
    <div role="alert" class="no-print mb-4 flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900">
        <x-icon name="alert" class="mt-0.5 h-5 w-5 shrink-0"/> <div>{{ session('warning') }}</div>
    </div>
@endif
@if ($errors->any())
    <div role="alert" class="no-print mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-900">
        <p class="font-semibold">Bitte die markierten Angaben prüfen:</p>
        <ul class="mt-1 list-disc pl-5 text-sm">
            @foreach ($errors->all() as $e)<li>{{ $e }}</li>@endforeach
        </ul>
    </div>
@endif
