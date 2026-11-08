<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ShoppingList extends Model
{
    protected $fillable = ['user_id', 'name', 'group_by_area'];

    protected function casts(): array
    {
        return ['group_by_area' => 'boolean'];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function selections(): HasMany
    {
        return $this->hasMany(ShoppingListRecipe::class)->orderBy('created_at');
    }

    public function items(): HasMany
    {
        return $this->hasMany(ShoppingListItem::class)->orderBy('position')->orderBy('id');
    }

    public static function defaultFor(User $user): self
    {
        return static::query()->where('user_id', $user->id)->orderBy('id')->first()
            ?? static::create(['user_id' => $user->id, 'name' => 'Einkaufsliste']);
    }
}
