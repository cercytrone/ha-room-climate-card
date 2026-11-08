<?php

namespace App\Http\Requests;

use App\Models\RecipeNutrition;
use App\Services\Images\ImageException;
use App\Services\Images\ImageService;
use App\Services\Images\PendingUpload;
use App\Support\Duration;
use App\Support\Quantity;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RecipeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    protected function prepareForValidation(): void
    {
        $in = $this->input();

        $in['yield_quantity'] = Quantity::normalizeDecimalInput($in['yield_quantity'] ?? null);
        foreach (['prep_minutes', 'rest_minutes', 'cook_minutes', 'total_minutes'] as $f) {
            $raw = $in[$f] ?? null;
            if (is_string($raw) && trim($raw) !== '') {
                $parsed = Duration::parse($raw);
                $in[$f] = $parsed ?? $raw; // ungültig -> Validierungsfehler
            } else {
                $in[$f] = null;
            }
        }
        $in['rating'] = isset($in['rating']) && $in['rating'] !== '' && $in['rating'] !== '0' ? $in['rating'] : null;
        $in['is_favorite'] = filter_var($in['is_favorite'] ?? false, FILTER_VALIDATE_BOOLEAN);

        // Leere Zutatenzeilen und Gruppen entfernen, Reihenfolge neu durchnummerieren
        $groups = [];
        foreach ((array) ($in['groups'] ?? []) as $g) {
            if (! is_array($g)) {
                continue;
            }
            $items = [];
            foreach ((array) ($g['items'] ?? []) as $it) {
                if (! is_array($it)) {
                    continue;
                }
                $filled = trim((string) ($it['quantity'] ?? '')).trim((string) ($it['unit'] ?? '')).trim((string) ($it['name'] ?? '')).trim((string) ($it['note'] ?? ''));
                if ($filled === '') {
                    continue;
                }
                $it['scalable'] = filter_var($it['scalable'] ?? false, FILTER_VALIDATE_BOOLEAN);
                $items[] = $it;
            }
            if ($items !== [] || trim((string) ($g['name'] ?? '')) !== '') {
                $groups[] = ['name' => $g['name'] ?? null, 'items' => $items];
            }
        }
        $in['groups'] = $groups;

        $steps = [];
        foreach ((array) ($in['steps'] ?? []) as $s) {
            $body = is_array($s) ? trim((string) ($s['body'] ?? '')) : trim((string) $s);
            if ($body !== '') {
                $steps[] = ['body' => $body];
            }
        }
        $in['steps'] = $steps;

        if (isset($in['nutrition']) && is_array($in['nutrition'])) {
            foreach (array_keys(RecipeNutrition::FIELDS) as $f) {
                $in['nutrition'][$f] = Quantity::normalizeDecimalInput($in['nutrition'][$f] ?? null);
            }
        }

        $this->replace($in);
    }

    public function rules(): array
    {
        $maxKb = config('rezepte.images.max_mb') * 1024;

        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'recipe_type_id' => ['nullable', 'integer', Rule::exists('recipe_types', 'id')],
            'new_type' => ['nullable', 'string', 'max:100'],
            'categories' => ['nullable', 'array'],
            'categories.*' => ['integer', Rule::exists('categories', 'id')],
            'tags' => ['nullable', 'string', 'max:1000'],
            'source_url' => ['nullable', 'string', 'max:2048', 'url:http,https'],
            'source_text' => ['nullable', 'string', 'max:500'],
            'author' => ['nullable', 'string', 'max:255'],
            'yield_quantity' => ['required', 'numeric', 'gt:0', 'max:100000'],
            'yield_unit' => ['required', 'string', 'max:50'],
            'prep_minutes' => ['nullable', 'integer', 'min:0', 'max:100000'],
            'rest_minutes' => ['nullable', 'integer', 'min:0', 'max:100000'],
            'cook_minutes' => ['nullable', 'integer', 'min:0', 'max:100000'],
            'total_minutes' => ['nullable', 'integer', 'min:0', 'max:100000'],
            'rating' => ['nullable', 'integer', 'between:1,5'],
            'is_favorite' => ['boolean'],
            'notes' => ['nullable', 'string', 'max:100000'],

            'groups' => ['array', 'max:50'],
            'groups.*.name' => ['nullable', 'string', 'max:150'],
            'groups.*.items' => ['array', 'max:200'],
            'groups.*.items.*.quantity' => ['nullable', 'string', 'max:60'],
            'groups.*.items.*.unit' => ['nullable', 'string', 'max:40'],
            'groups.*.items.*.name' => ['required', 'string', 'max:255'],
            'groups.*.items.*.note' => ['nullable', 'string', 'max:255'],
            'groups.*.items.*.scalable' => ['boolean'],
            'groups.*.items.*.original_text' => ['nullable', 'string', 'max:500'],

            'steps' => ['array', 'max:200'],
            'steps.*.body' => ['required', 'string', 'max:20000'],

            'nutrition' => ['nullable', 'array'],
            'nutrition.basis' => ['nullable', Rule::in(array_keys(RecipeNutrition::BASES))],
            'nutrition.basis_label' => ['nullable', 'string', 'max:100'],
            ...collect(array_keys(RecipeNutrition::FIELDS))->mapWithKeys(fn ($f) => ["nutrition.$f" => ['nullable', 'numeric', 'min:0', 'max:1000000']])->all(),

            'cover' => ['nullable', 'file', 'max:'.$maxKb, 'mimetypes:'.implode(',', config('rezepte.images.mimes'))],
            'remove_cover' => ['nullable', 'boolean'],
            'pending_cover' => ['nullable', 'string', 'regex:/^[A-Za-z0-9]{40}$/'],
            'import_queue_item_id' => ['nullable', 'integer'],
        ];
    }

    public function messages(): array
    {
        return [
            'yield_quantity.gt' => 'Die Rezeptmenge muss größer als 0 sein.',
            'yield_quantity.numeric' => 'Bitte die Rezeptmenge als Zahl angeben, z. B. 1,5 oder 1/2.',
            'groups.*.items.*.name.required' => 'Bei jeder Zutat mit Menge oder Einheit muss ein Zutatenname angegeben werden.',
            'prep_minutes.integer' => 'Bitte die Arbeitszeit in Minuten angeben, z. B. 90 oder 1:30.',
            'rest_minutes.integer' => 'Bitte die Ruhe-/Gehzeit in Minuten angeben, z. B. 90 oder 1:30.',
            'cook_minutes.integer' => 'Bitte die Koch-/Backzeit in Minuten angeben, z. B. 90 oder 1:30.',
            'total_minutes.integer' => 'Bitte die Gesamtzeit in Minuten angeben, z. B. 90 oder 1:30.',
            'source_url.url' => 'Die Quell-URL muss mit http:// oder https:// beginnen. Für Bücher o. Ä. bitte das Feld „Quelle als Text“ verwenden.',
            'cover.max' => 'Das Bild ist zu groß. Erlaubt sind höchstens '.config('rezepte.images.max_mb').' MB.',
            'cover.mimetypes' => 'Dieses Bildformat wird nicht unterstützt. Erlaubt sind JPEG, PNG und WebP.',
            'cover.uploaded' => 'Das Bild konnte nicht hochgeladen werden. Möglicherweise ist es größer als das Upload-Limit des Servers.',
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $v): void {
            $file = $this->file('cover');
            if ($file && $file->isValid() && ! $v->errors()->has('cover')) {
                try {
                    app(ImageService::class)->inspect($file->getRealPath());
                } catch (ImageException $e) {
                    $v->errors()->add('cover', $e->getMessage());
                }
            }
        });
    }

    /** Bei Fehlern ein gültiges hochgeladenes Bild zwischenspeichern, damit es nicht erneut gewählt werden muss. */
    protected function failedValidation(Validator $validator): void
    {
        $file = $this->file('cover');
        if ($file && $file->isValid() && ! $validator->errors()->has('cover')) {
            try {
                $token = PendingUpload::stash($file->getRealPath(), $file->getClientOriginalName());
                $this->merge(['pending_cover' => $token]);
                app('request')->merge(['pending_cover' => $token]);
            } catch (\Throwable) {
                // Zwischenspeichern ist eine Komfortfunktion – Fehler hier nicht weitergeben.
            }
        }
        parent::failedValidation($validator);
    }
}
