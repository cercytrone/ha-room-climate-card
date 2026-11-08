<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class RecipeShare extends Model
{
    protected $fillable = ['recipe_id', 'token', 'include_notes', 'include_image', 'include_nutrition', 'revoked_at', 'last_accessed_at'];

    protected function casts(): array
    {
        return [
            'include_notes' => 'boolean',
            'include_image' => 'boolean',
            'include_nutrition' => 'boolean',
            'revoked_at' => 'datetime',
            'last_accessed_at' => 'datetime',
        ];
    }

    public function recipe(): BelongsTo
    {
        return $this->belongsTo(Recipe::class);
    }

    /** 256 Bit Zufall, URL-sicher kodiert – nicht erratbar. */
    public static function newToken(): string
    {
        return rtrim(strtr(base64_encode(random_bytes(32)), '+/', '-_'), '=');
    }

    public function isActive(): bool
    {
        return $this->revoked_at === null;
    }

    public function url(): string
    {
        return route('public.recipe', $this->token);
    }

    public static function findActive(string $token): ?self
    {
        if (! preg_match('/^[A-Za-z0-9_-]{40,64}$/', $token)) {
            return null;
        }

        return static::query()->where('token', $token)->whereNull('revoked_at')->first();
    }

    public static function maskedToken(string $token): string
    {
        return Str::limit($token, 6, '…');
    }
}
