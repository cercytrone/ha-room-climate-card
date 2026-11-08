<?php

namespace App\Models;

use App\Support\Quantity;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ShoppingListItem extends Model
{
    protected $fillable = ['shopping_list_id', 'name', 'quantity', 'quantity_text', 'unit', 'note', 'area', 'merge_key',
        'is_checked', 'is_manual', 'review_reason', 'position'];

    protected function casts(): array
    {
        return ['quantity' => 'float', 'is_checked' => 'boolean', 'is_manual' => 'boolean'];
    }

    public function shoppingList(): BelongsTo
    {
        return $this->belongsTo(ShoppingList::class);
    }

    public function sources(): HasMany
    {
        return $this->hasMany(ShoppingListItemSource::class);
    }

    public function displayQuantity(): string
    {
        if ($this->quantity === null) {
            return (string) ($this->quantity_text ?? '');
        }

        return Quantity::format($this->quantity, $this->unit);
    }

    public function toLine(): string
    {
        $line = trim(implode(' ', array_filter([$this->displayQuantity(), $this->unit, $this->name], fn ($p) => $p !== null && $p !== '')));
        if ($this->note) {
            $line .= ' ('.$this->note.')';
        }

        return $line;
    }
}
