<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class RecipeImage extends Model
{
    protected $fillable = ['recipe_id', 'path', 'thumb_path', 'original_path', 'mime', 'width', 'height', 'size_bytes', 'original_name', 'source_url'];

    protected static function booted(): void
    {
        static::deleted(function (RecipeImage $image): void {
            $image->deleteFiles();
        });
    }

    public function recipe(): BelongsTo
    {
        return $this->belongsTo(Recipe::class);
    }

    public function deleteFiles(): void
    {
        Storage::disk('local')->delete(array_filter([$this->path, $this->thumb_path, $this->original_path]));
    }

    public function absolutePath(string $variant = 'display'): ?string
    {
        $rel = $variant === 'thumb' ? $this->thumb_path : $this->path;

        return $rel ? Storage::disk('local')->path($rel) : null;
    }
}
