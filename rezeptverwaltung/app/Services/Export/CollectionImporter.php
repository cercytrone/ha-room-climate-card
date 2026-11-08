<?php

namespace App\Services\Export;

use App\Models\Category;
use App\Models\Recipe;
use App\Models\RecipeImage;
use App\Models\RecipeType;
use App\Models\User;
use App\Services\Images\ImageException;
use App\Services\Images\ImageService;
use App\Services\RecipeSaver;
use App\Support\Quantity;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Wiederimport einer mit CollectionExporter erzeugten ZIP-Datei.
 * Rezepte werden als NEUE Datensätze angelegt; Kategorien werden über ihren Pfad,
 * Rezeptarten und Schlagwörter über den Namen zugeordnet (fehlende werden angelegt).
 */
class CollectionImporter
{
    public function __construct(private readonly RecipeSaver $saver, private readonly ImageService $images) {}

    /** @return array{imported: int, skipped: int, warnings: array<int, string>} */
    public function import(User $user, string $zipPath, bool $skipDuplicates = true): array
    {
        @set_time_limit(170);
        $zip = new \ZipArchive;
        if ($zip->open($zipPath) !== true) {
            throw new \RuntimeException('Die Datei ist keine gültige ZIP-Datei.');
        }
        try {
            $manifest = json_decode((string) $zip->getFromName('manifest.json'), true);
            if (! is_array($manifest) || ($manifest['format'] ?? null) !== config('rezepte.export.format')) {
                throw new \RuntimeException('Die Datei ist kein Export dieser Rezeptverwaltung.');
            }
            if ((int) ($manifest['version'] ?? 0) > (int) config('rezepte.export.version')) {
                throw new \RuntimeException('Die Exportdatei stammt aus einer neueren Programmversion und kann nicht gelesen werden.');
            }
            $stat = $zip->statName('rezepte.json');
            if (! $stat || $stat['size'] > 200 * 1024 * 1024) {
                throw new \RuntimeException('rezepte.json fehlt oder ist zu groß.');
            }
            $data = json_decode((string) $zip->getFromName('rezepte.json'), true, 64);
            if (! is_array($data) || ! isset($data['recipes']) || ! is_array($data['recipes'])) {
                throw new \RuntimeException('rezepte.json ist beschädigt.');
            }

            foreach ($data['recipe_types'] ?? [] as $t) {
                if (! empty($t['name'])) {
                    RecipeType::query()->firstOrCreate(['name' => mb_substr($t['name'], 0, 100)], ['sort_order' => (int) ($t['sort_order'] ?? 0)]);
                }
            }
            foreach ($data['categories'] ?? [] as $c) {
                $this->categoryByPath((array) ($c['path'] ?? []), (int) ($c['sort_order'] ?? 0));
            }

            $work = Storage::disk('local')->path('tmp/import-'.Str::random(12));
            mkdir($work, 0750, true);
            $imported = 0;
            $skipped = 0;
            $warnings = [];
            try {
                foreach ($data['recipes'] as $r) {
                    if (! is_array($r) || empty($r['title'])) {
                        $skipped++;

                        continue;
                    }
                    if ($skipDuplicates && ! empty($r['source_url'])
                        && Recipe::query()->where('user_id', $user->id)->where('source_url_hash', Recipe::hashSourceUrl($r['source_url']))->exists()) {
                        $skipped++;

                        continue;
                    }
                    $recipe = $this->saver->save($user, $this->toFormData($r));
                    if (! empty($r['created_at'])) {
                        try {
                            $recipe->timestamps = false;
                            $recipe->forceFill(['created_at' => Carbon::parse($r['created_at'])])->saveQuietly();
                        } catch (\Throwable) {
                        }
                    }
                    if (is_array($r['image'] ?? null)) {
                        $w = $this->attachImage($zip, $recipe, $r['image'], $work);
                        if ($w) {
                            $warnings[] = '„'.$recipe->title.'“: '.$w;
                        }
                    }
                    $imported++;
                }
            } finally {
                File::deleteDirectory($work);
            }

            return ['imported' => $imported, 'skipped' => $skipped, 'warnings' => $warnings];
        } finally {
            @$zip->close();
        }
    }

    private function toFormData(array $r): array
    {
        $categoryIds = [];
        foreach ((array) ($r['categories'] ?? []) as $path) {
            $c = $this->categoryByPath((array) $path);
            if ($c) {
                $categoryIds[] = $c->id;
            }
        }
        $typeId = null;
        if (! empty($r['type'])) {
            $typeId = RecipeType::query()->firstOrCreate(['name' => mb_substr($r['type'], 0, 100)])->id;
        }
        $groups = [];
        foreach ((array) ($r['ingredient_groups'] ?? []) as $g) {
            $items = [];
            foreach ((array) ($g['items'] ?? []) as $i) {
                if (empty($i['name'])) {
                    continue;
                }
                $qty = '';
                if (isset($i['quantity']) && $i['quantity'] !== null) {
                    $qty = Quantity::toInput((float) $i['quantity']).(isset($i['quantity_max']) && $i['quantity_max'] !== null ? '–'.Quantity::toInput((float) $i['quantity_max']) : '');
                } elseif (! empty($i['quantity_text'])) {
                    $qty = (string) $i['quantity_text'];
                }
                $items[] = [
                    'quantity' => $qty, 'unit' => $i['unit'] ?? null, 'name' => (string) $i['name'], 'note' => $i['note'] ?? null,
                    'scalable' => (bool) ($i['scalable'] ?? true), 'original_text' => $i['original_text'] ?? null,
                ];
            }
            $groups[] = ['name' => $g['name'] ?? null, 'items' => $items];
        }
        $yield = isset($r['yield_quantity']) && (float) $r['yield_quantity'] > 0 ? (float) $r['yield_quantity'] : 1.0;
        $int = fn ($v) => $v === null || $v === '' ? null : max(0, (int) $v);

        return [
            'title' => mb_substr((string) $r['title'], 0, 255),
            'description' => $r['description'] ?? null,
            'recipe_type_id' => $typeId,
            'categories' => array_values(array_unique($categoryIds)),
            'tags' => (array) ($r['tags'] ?? []),
            'source_url' => $r['source_url'] ?? null,
            'source_text' => $r['source_text'] ?? null,
            'author' => $r['author'] ?? null,
            'yield_quantity' => $yield,
            'yield_unit' => mb_substr((string) ($r['yield_unit'] ?? 'Portionen'), 0, 50) ?: 'Portionen',
            'prep_minutes' => $int($r['prep_minutes'] ?? null),
            'rest_minutes' => $int($r['rest_minutes'] ?? null),
            'cook_minutes' => $int($r['cook_minutes'] ?? null),
            'total_minutes' => $int($r['total_minutes'] ?? null),
            'rating' => isset($r['rating']) && $r['rating'] >= 1 && $r['rating'] <= 5 ? (int) $r['rating'] : null,
            'is_favorite' => (bool) ($r['is_favorite'] ?? false),
            'notes' => $r['notes'] ?? null,
            'groups' => $groups,
            'steps' => array_map(fn ($b) => ['body' => (string) $b], (array) ($r['steps'] ?? [])),
            'nutrition' => is_array($r['nutrition'] ?? null) ? $r['nutrition'] : null,
        ];
    }

    private function attachImage(\ZipArchive $zip, Recipe $recipe, array $img, string $work): ?string
    {
        $entries = ['file' => $img['file'] ?? null, 'thumb' => $img['thumb'] ?? null, 'original' => $img['original'] ?? null];
        foreach ($entries as $k => $e) {
            if ($e !== null && ! preg_match('#^images/[A-Za-z0-9_]+\.(jpg|jpeg|png|webp)$#', $e)) {
                $entries[$k] = null;
            }
        }
        if (! $entries['file']) {
            return null;
        }
        try {
            $disk = Storage::disk('local');
            $dir = 'recipe-images/'.date('Y');
            $disk->makeDirectory($dir);
            $base = $dir.'/'.Str::random(40);
            $paths = [];
            foreach (['file' => '.jpg', 'thumb' => '_thumb.jpg', 'original' => '_original'] as $k => $suffix) {
                if (! $entries[$k]) {
                    continue;
                }
                $stream = $zip->getStream($entries[$k]);
                if (! $stream) {
                    continue;
                }
                $tmp = $work.'/'.Str::random(12);
                file_put_contents($tmp, $stream);
                fclose($stream);
                $meta = $this->images->inspect($tmp); // echte Typ-/Größenprüfung
                if ($k === 'original') {
                    $suffix .= '.'.['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'][$meta['mime']];
                } elseif ($meta['mime'] !== 'image/jpeg') {
                    throw new ImageException('Unerwartetes Bildformat im Export.');
                }
                rename($tmp, $disk->path($base.$suffix));
                $paths[$k] = ['path' => $base.$suffix, 'meta' => $meta];
            }
            if (! isset($paths['file'])) {
                return 'Bild fehlt im Export.';
            }
            if (! isset($paths['thumb'])) {
                $disk->copy($paths['file']['path'], $base.'_thumb.jpg');
                $paths['thumb'] = ['path' => $base.'_thumb.jpg'];
            }
            RecipeImage::create([
                'recipe_id' => $recipe->id,
                'path' => $paths['file']['path'],
                'thumb_path' => $paths['thumb']['path'],
                'original_path' => $paths['original']['path'] ?? null,
                'mime' => 'image/jpeg',
                'width' => $paths['file']['meta']['width'],
                'height' => $paths['file']['meta']['height'],
                'size_bytes' => $paths['file']['meta']['size'],
                'original_name' => isset($img['original_name']) ? mb_substr((string) $img['original_name'], 0, 255) : null,
                'source_url' => isset($img['source_url']) ? mb_substr((string) $img['source_url'], 0, 2048) : null,
            ]);

            return null;
        } catch (ImageException $e) {
            return 'Bild übersprungen: '.$e->getMessage();
        }
    }

    private function categoryByPath(array $path, int $sortOrder = 0): ?Category
    {
        $parent = null;
        $cat = null;
        foreach (array_slice($path, 0, 10) as $name) {
            $name = mb_substr(trim((string) $name), 0, 100);
            if ($name === '') {
                return $cat;
            }
            $cat = Category::query()->where('parent_id', $parent?->id)->where('name', $name)->first()
                ?? Category::create(['parent_id' => $parent?->id, 'name' => $name, 'sort_order' => $sortOrder]);
            $parent = $cat;
        }

        return $cat;
    }
}
