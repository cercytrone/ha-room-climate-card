<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RecipeType extends Model
{
    protected $fillable = ['name', 'sort_order'];

    public function recipes(): HasMany
    {
        return $this->hasMany(Recipe::class);
    }

    public static function ordered()
    {
        return static::query()->orderBy('sort_order')->orderBy('name');
    }
}
