<?php

namespace App\Services\Export;

use App\Models\Category;
use App\Models\Recipe;
use App\Models\RecipeType;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Export der Rezeptsammlung als ZIP (Format beschrieben in docs/EXPORTFORMAT.md):
 *   manifest.json, rezepte.json, images/<id>.jpg, images/<id>_thumb.jpg [, images/<id>_original.<ext>]
 */
class CollectionExporter
{
    public function export(User $user, bool $includeNotes = true, bool $includeOriginals = false): string
    {
        @set_time_limit(170);
        $dir = Storage::disk('local')->path('tmp/exports');
        if (! is_dir($dir)) {
            mkdir($dir, 0750, true);
        }
        $path = $dir.'/export-'.Str::random(24).'.zip';
        $zip = new \ZipArchive;
        if ($zip->open($path, \ZipArchive::CREATE | \ZipArchive::OVERWRITE) !== true) {
            throw new \RuntimeException('Exportdatei konnte nicht angelegt werden.');
        }

        $data = [
            'recipe_types' => RecipeType::ordered()->get()->map(fn ($t) => ['name' => $t->name, 'sort_order' => $t->sort_order])->all(),
            'categories' => array_map(fn ($row) => [
                'path' => $row['category']->pathNames(),
                'sort_order' => $row['category']->sort_order,
            ], Category::flatTree()),
            'tags' => Tag::query()->orderBy('name')->pluck('name')->all(),
            'recipes' => [],
        ];

        $disk = Storage::disk('local');
        Recipe::query()->ownedBy($user)->with(['type', 'categories.parent', 'tags', 'ingredientGroups.ingredients', 'steps', 'nutrition', 'image'])
            ->orderBy('id')->chunk(100, function ($recipes) use (&$data, $zip, $disk, $includeNotes, $includeOriginals) {
                foreach ($recipes as $r) {
                    $image = null;
                    if ($r->image && $disk->exists($r->image->path)) {
                        $image = [
                            'file' => 'images/'.$r->id.'.jpg',
                            'thumb' => 'images/'.$r->id.'_thumb.jpg',
                            'original' => null,
                            'original_name' => $r->image->original_name,
                            'source_url' => $r->image->source_url,
                            'width' => $r->image->width,
                            'height' => $r->image->height,
                        ];
                        $zip->addFile($disk->path($r->image->path), $image['file']);
                        $zip->setCompressionName($image['file'], \ZipArchive::CM_STORE);
                        if ($disk->exists($r->image->thumb_path)) {
                            $zip->addFile($disk->path($r->image->thumb_path), $image['thumb']);
                            $zip->setCompressionName($image['thumb'], \ZipArchive::CM_STORE);
                        }
                        if ($includeOriginals && $r->image->original_path && $disk->exists($r->image->original_path)) {
                            $image['original'] = 'images/'.$r->id.'_original.'.pathinfo($r->image->original_path, PATHINFO_EXTENSION);
                            $zip->addFile($disk->path($r->image->original_path), $image['original']);
                            $zip->setCompressionName($image['original'], \ZipArchive::CM_STORE);
                        }
                    }
                    $data['recipes'][] = [
                        'id' => $r->id,
                        'title' => $r->title,
                        'description' => $r->description,
                        'type' => $r->type?->name,
                        'categories' => $r->categories->map(fn ($c) => $c->pathNames())->values()->all(),
                        'tags' => $r->tags->pluck('name')->all(),
                        'source_url' => $r->source_url,
                        'source_text' => $r->source_text,
                        'author' => $r->author,
                        'yield_quantity' => $r->yield_quantity,
                        'yield_unit' => $r->yield_unit,
                        'prep_minutes' => $r->prep_minutes,
                        'rest_minutes' => $r->rest_minutes,
                        'cook_minutes' => $r->cook_minutes,
                        'total_minutes' => $r->total_minutes,
                        'rating' => $r->rating,
                        'is_favorite' => $r->is_favorite,
                        'notes' => $includeNotes ? $r->notes : null,
                        'created_at' => $r->created_at?->toIso8601String(),
                        'updated_at' => $r->updated_at?->toIso8601String(),
                        'ingredient_groups' => $r->ingredientGroups->map(fn ($g) => [
                            'name' => $g->name,
                            'items' => $g->ingredients->map(fn ($i) => [
                                'quantity' => $i->quantity,
                                'quantity_max' => $i->quantity_max,
                                'quantity_text' => $i->quantity_text,
                                'unit' => $i->unit,
                                'name' => $i->name,
                                'note' => $i->note,
                                'scalable' => $i->scalable,
                                'original_text' => $i->original_text,
                            ])->values()->all(),
                        ])->values()->all(),
                        'steps' => $r->steps->pluck('body')->all(),
                        'nutrition' => $r->nutrition ? $r->nutrition->only(['basis', 'basis_label', 'energy_kcal', 'energy_kj', 'fat', 'saturated_fat', 'carbohydrates', 'sugar', 'protein', 'salt', 'fiber']) : null,
                        'image' => $image,
                    ];
                }
            });

        $zip->addFromString('rezepte.json', json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRESERVE_ZERO_FRACTION));
        $zip->addFromString('manifest.json', json_encode([
            'format' => config('rezepte.export.format'),
            'version' => config('rezepte.export.version'),
            'exported_at' => now()->toIso8601String(),
            'recipes' => count($data['recipes']),
            'includes_notes' => $includeNotes,
            'includes_original_images' => $includeOriginals,
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
        if (! $zip->close()) {
            @unlink($path);
            throw new \RuntimeException('Exportdatei konnte nicht geschrieben werden (Speicherplatz prüfen).');
        }

        return $path;
    }
}
