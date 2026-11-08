<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShoppingListItemSource extends Model
{
    public $timestamps = false;

    protected $fillable = ['shopping_list_item_id', 'shopping_list_recipe_id', 'quantity', 'unit', 'original_text'];

    protected function casts(): array
    {
        return ['quantity' => 'float'];
    }

    public function item(): BelongsTo
    {
        return $this->belongsTo(ShoppingListItem::class, 'shopping_list_item_id');
    }

    public function selection(): BelongsTo
    {
        return $this->belongsTo(ShoppingListRecipe::class, 'shopping_list_recipe_id');
    }
}
