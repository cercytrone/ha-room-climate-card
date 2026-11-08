<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    protected $fillable = ['name'];

    public function recipes(): BelongsToMany
    {
        return $this->belongsToMany(Recipe::class);
    }

    /** @param  array<int, string>  $names  @return array<int, int> */
    public static function idsFor(array $names): array
    {
        $ids = [];
        foreach ($names as $name) {
            $name = trim(preg_replace('/\s+/u', ' ', $name) ?? '');
            if ($name === '') {
                continue;
            }
            $name = mb_substr($name, 0, 100);
            $tag = static::query()->where('name', $name)->first() ?? static::create(['name' => $name]);
            $ids[$tag->id] = $tag->id;
        }

        return array_values($ids);
    }
}
