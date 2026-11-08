<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $fillable = ['parent_id', 'name', 'sort_order'];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id')->orderBy('sort_order')->orderBy('name');
    }

    public function recipes(): BelongsToMany
    {
        return $this->belongsToMany(Recipe::class);
    }

    /**
     * Alle Kategorien als flache, baumartig sortierte Liste mit Tiefe und Pfad.
     *
     * @return array<int, array{category: Category, depth: int, path: string}>
     */
    public static function flatTree(?Collection $all = null): array
    {
        $all ??= static::query()->withCount('recipes')->orderBy('sort_order')->orderBy('name')->get();
        $byParent = $all->groupBy(fn ($c) => $c->parent_id ?? 0);
        $out = [];
        $walk = function (int $parentId, int $depth, string $prefix) use (&$walk, &$out, $byParent): void {
            foreach ($byParent->get($parentId, collect()) as $cat) {
                $path = $prefix === '' ? $cat->name : $prefix.' › '.$cat->name;
                $out[] = ['category' => $cat, 'depth' => $depth, 'path' => $path];
                if ($depth < 20) {
                    $walk($cat->id, $depth + 1, $path);
                }
            }
        };
        $walk(0, 0, '');

        return $out;
    }

    /** IDs dieser Kategorie und aller Unterkategorien. @return array<int, int> */
    public static function descendantIds(int $id): array
    {
        $all = static::query()->get(['id', 'parent_id'])->groupBy(fn ($c) => $c->parent_id ?? 0);
        $ids = [$id];
        $stack = [$id];
        while ($stack) {
            $current = array_pop($stack);
            foreach ($all->get($current, collect()) as $child) {
                if (! in_array($child->id, $ids, true)) {
                    $ids[] = $child->id;
                    $stack[] = $child->id;
                }
            }
        }

        return $ids;
    }

    public function pathName(): string
    {
        $names = [$this->name];
        $p = $this->parent;
        $guard = 0;
        while ($p && $guard++ < 20) {
            array_unshift($names, $p->name);
            $p = $p->parent;
        }

        return implode(' › ', $names);
    }

    /** Pfad als Liste der Namen (für Export). @return array<int, string> */
    public function pathNames(): array
    {
        return explode(' › ', $this->pathName());
    }
}
