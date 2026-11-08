<?php

namespace App\Models;

use App\Support\Duration;
use App\Support\Markdown;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Recipe extends Model
{
    protected $fillable = [
        'user_id', 'title', 'description', 'recipe_type_id', 'source_url', 'source_text', 'author',
        'yield_quantity', 'yield_unit', 'prep_minutes', 'rest_minutes', 'cook_minutes', 'total_minutes',
        'rating', 'is_favorite', 'notes',
    ];

    protected function casts(): array
    {
        return [
            'yield_quantity' => 'float',
            'is_favorite' => 'boolean',
            'rating' => 'integer',
            'prep_minutes' => 'integer',
            'rest_minutes' => 'integer',
            'cook_minutes' => 'integer',
            'total_minutes' => 'integer',
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (Recipe $recipe): void {
            $recipe->source_url_hash = $recipe->source_url ? self::hashSourceUrl($recipe->source_url) : null;
        });
        static::deleting(function (Recipe $recipe): void {
            // Bilddateien entfernen (Datensatz selbst wird per CASCADE gelöscht).
            $recipe->image?->deleteFiles();
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function type(): BelongsTo
    {
        return $this->belongsTo(RecipeType::class, 'recipe_type_id');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class)->orderBy('name');
    }

    public function ingredientGroups(): HasMany
    {
        return $this->hasMany(IngredientGroup::class)->orderBy('position');
    }

    public function ingredients(): HasMany
    {
        return $this->hasMany(Ingredient::class)->orderBy('position');
    }

    public function steps(): HasMany
    {
        return $this->hasMany(RecipeStep::class)->orderBy('position');
    }

    public function nutrition(): HasOne
    {
        return $this->hasOne(RecipeNutrition::class);
    }

    public function image(): HasOne
    {
        return $this->hasOne(RecipeImage::class);
    }

    public function shares(): HasMany
    {
        return $this->hasMany(RecipeShare::class);
    }

    public function scopeOwnedBy(Builder $q, User $user): Builder
    {
        return $q->where('user_id', $user->id);
    }

    /** Normalisierte Quell-URL für die Dublettenprüfung. */
    public static function normalizeSourceUrl(string $url): string
    {
        $url = trim($url);
        $parts = parse_url($url);
        if (! $parts || empty($parts['host'])) {
            return mb_strtolower($url);
        }
        $host = mb_strtolower(preg_replace('/^www\./i', '', $parts['host']) ?? $parts['host']);
        $path = rtrim($parts['path'] ?? '', '/');
        $query = '';
        if (! empty($parts['query'])) {
            parse_str($parts['query'], $q);
            // Tracking-Parameter ignorieren
            $q = array_filter($q, fn ($k) => ! preg_match('/^(utm_|fbclid|gclid|mc_|ref$)/i', (string) $k), ARRAY_FILTER_USE_KEY);
            ksort($q);
            $query = $q ? '?'.http_build_query($q) : '';
        }

        return $host.$path.$query;
    }

    public static function hashSourceUrl(string $url): string
    {
        return hash('sha256', self::normalizeSourceUrl($url));
    }

    public function computedTotalMinutes(): ?int
    {
        $sum = (int) $this->prep_minutes + (int) $this->rest_minutes + (int) $this->cook_minutes;

        return $sum > 0 ? $sum : null;
    }

    public function totalMinutes(): ?int
    {
        return $this->total_minutes ?? $this->computedTotalMinutes();
    }

    public function totalIsExplicit(): bool
    {
        return $this->total_minutes !== null;
    }

    /** @return array<int, array{label: string, value: string}> */
    public function timeRows(): array
    {
        $rows = [];
        foreach (['prep_minutes' => 'Arbeitszeit', 'rest_minutes' => 'Ruhe-/Gehzeit', 'cook_minutes' => 'Koch-/Backzeit'] as $f => $label) {
            if ($this->{$f}) {
                $rows[] = ['label' => $label, 'value' => Duration::format($this->{$f})];
            }
        }
        if ($this->totalMinutes()) {
            $rows[] = ['label' => 'Gesamtzeit', 'value' => Duration::format($this->totalMinutes()).($this->totalIsExplicit() ? '' : ' (Summe)')];
        }

        return $rows;
    }

    public function notesHtml(): string
    {
        return Markdown::toHtml($this->notes);
    }

    public function descriptionHtml(): string
    {
        return Markdown::toHtml($this->description);
    }

    public function sourceIsUrl(): bool
    {
        return $this->source_url !== null && preg_match('#^https?://#i', $this->source_url) === 1;
    }

    /** Suchtext neu aufbauen (Titel, Beschreibung, Zutaten, Rezeptart, Kategorien, Schlagwörter, Notizen). */
    public function refreshSearchText(): void
    {
        $this->loadMissing(['type', 'categories', 'tags', 'ingredients']);
        $parts = [$this->title, $this->description, $this->type?->name, $this->author];
        foreach ($this->categories as $c) {
            $parts[] = $c->name;
        }
        foreach ($this->tags as $t) {
            $parts[] = $t->name;
        }
        foreach ($this->ingredients as $i) {
            $parts[] = $i->name;
            $parts[] = $i->note;
        }
        $parts[] = $this->notes;
        $text = implode("\n", array_filter($parts, fn ($p) => $p !== null && $p !== ''));
        $this->forceFill(['search_text' => mb_substr($text, 0, 1000000)])->saveQuietly();
    }

    /** Suchtext für Rezepte mit einer bestimmten Kategorie/Rezeptart/Schlagwort neu aufbauen. */
    public static function refreshSearchTextFor(Builder $query): void
    {
        $query->with(['type', 'categories', 'tags', 'ingredients'])->chunkById(100, function ($recipes): void {
            foreach ($recipes as $r) {
                $r->refreshSearchText();
            }
        });
    }
}
