<?php

namespace App\Models;

use App\Support\Quantity;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ShoppingListRecipe extends Model
{
    protected $fillable = ['shopping_list_id', 'recipe_id', 'recipe_title', 'target_quantity', 'yield_unit'];

    protected function casts(): array
    {
        return ['target_quantity' => 'float'];
    }

    public function shoppingList(): BelongsTo
    {
        return $this->belongsTo(ShoppingList::class);
    }

    public function recipe(): BelongsTo
    {
        return $this->belongsTo(Recipe::class);
    }

    public function sources(): HasMany
    {
        return $this->hasMany(ShoppingListItemSource::class);
    }

    public function label(): string
    {
        return $this->recipe_title.' ('.Quantity::format($this->target_quantity).' '.$this->yield_unit.')';
    }
}
