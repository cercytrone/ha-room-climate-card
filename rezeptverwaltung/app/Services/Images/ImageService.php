<?php

namespace App\Services\Images;

use App\Models\Recipe;
use App\Models\RecipeImage;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Bildverarbeitung mit GD (ohne Zusatzdienste).
 *
 * Ablauf: Typ/Größe am echten Dateiinhalt prüfen -> Abmessungen und Speicherbedarf
 * prüfen -> unter Sperre (nur eine Verarbeitung gleichzeitig) dekodieren, drehen,
 * verkleinern -> als JPEG im privaten Speicher ablegen.
 */
class ImageService
{
    private const DIR = 'recipe-images';

    /** @return array{mime: string, width: int, height: int, size: int} */
    public function inspect(string $path): array
    {
        $cfg = config('rezepte.images');
        if (! is_file($path) || ! is_readable($path)) {
            throw new ImageException('Die Bilddatei konnte nicht gelesen werden.');
        }
        $size = filesize($path) ?: 0;
        if ($size === 0) {
            throw new ImageException('Die Bilddatei ist leer.');
        }
        if ($size > $cfg['max_mb'] * 1024 * 1024) {
            throw new ImageException(sprintf('Das Bild ist zu groß (%s MB). Erlaubt sind höchstens %d MB.', number_format($size / 1048576, 1, ',', '.'), $cfg['max_mb']));
        }
        $mime = (new \finfo(FILEINFO_MIME_TYPE))->file($path) ?: '';
        if (! in_array($mime, $cfg['mimes'], true)) {
            throw new ImageException('Dieses Dateiformat wird nicht unterstützt. Erlaubt sind JPEG, PNG und WebP.');
        }
        $info = @getimagesize($path);
        if (! $info || empty($info[0]) || empty($info[1])) {
            throw new ImageException('Die Datei ist kein gültiges Bild oder beschädigt.');
        }
        [$w, $h] = $info;
        if ($w > $cfg['max_side'] || $h > $cfg['max_side']) {
            throw new ImageException(sprintf('Das Bild ist mit %d × %d Pixeln zu groß. Erlaubt sind höchstens %d Pixel Kantenlänge.', $w, $h, $cfg['max_side']));
        }
        if ($w * $h > $cfg['max_megapixels'] * 1_000_000) {
            throw new ImageException(sprintf('Das Bild hat zu viele Pixel (%s Megapixel). Erlaubt sind höchstens %d Megapixel.', number_format($w * $h / 1e6, 1, ',', '.'), $cfg['max_megapixels']));
        }
        $this->assertMemory($w, $h);

        return ['mime' => $mime, 'width' => $w, 'height' => $h, 'size' => $size];
    }

    /** Prüft vor dem Dekodieren, ob das PHP-Memory-Limit ausreicht. */
    public function assertMemory(int $w, int $h): void
    {
        $limit = self::memoryLimitBytes();
        if ($limit <= 0) {
            return;
        }
        // GD benötigt ca. 5 Byte je Pixel (truecolor + Verwaltung); dazu Platz für Anzeigeversion und Drehung.
        $needed = (int) ($w * $h * 5 * 2.1) + 16 * 1024 * 1024;
        $available = $limit - memory_get_usage(true);
        if ($needed > $available) {
            throw new ImageException(sprintf(
                'Das Bild ist zu groß für die Verarbeitung auf dem Server (benötigt ca. %d MB Arbeitsspeicher, verfügbar ca. %d MB). Bitte ein kleineres Bild verwenden.',
                (int) ceil($needed / 1048576), max(0, (int) floor($available / 1048576))
            ));
        }
    }

    public static function memoryLimitBytes(): int
    {
        $v = trim((string) ini_get('memory_limit'));
        if ($v === '' || $v === '-1') {
            return -1;
        }
        $num = (int) $v;

        return match (strtolower(substr($v, -1))) {
            'g' => $num * 1024 ** 3,
            'm' => $num * 1024 ** 2,
            'k' => $num * 1024,
            default => $num,
        };
    }

    /**
     * Verarbeitet eine Bilddatei und setzt sie als Cover des Rezepts (ersetzt ein vorhandenes).
     */
    public function attachToRecipe(Recipe $recipe, string $path, ?string $originalName = null, ?string $sourceUrl = null): RecipeImage
    {
        $attrs = $this->process($path, $originalName, $sourceUrl);
        $old = $recipe->image()->first();
        try {
            $image = DB::transaction(function () use ($recipe, $old, $attrs) {
                if ($old) {
                    RecipeImage::query()->whereKey($old->id)->delete(); // ohne Events, Dateien erst nach Erfolg löschen
                }

                return $recipe->image()->create($attrs);
            });
        } catch (\Throwable $e) {
            Storage::disk('local')->delete(array_filter([$attrs['path'], $attrs['thumb_path'], $attrs['original_path']]));
            throw $e;
        }
        $old?->deleteFiles();
        $recipe->setRelation('image', $image);

        return $image;
    }

    /** @return array<string, mixed> Attribute für RecipeImage */
    public function process(string $path, ?string $originalName = null, ?string $sourceUrl = null): array
    {
        $meta = $this->inspect($path);
        $lock = Cache::lock('rezepte:image-processing', 120);
        if (! $lock->block((int) config('rezepte.images.lock_wait', 20))) {
            throw new ImageException('Es wird gerade ein anderes Bild verarbeitet. Bitte in einigen Sekunden erneut versuchen.');
        }
        try {
            return $this->doProcess($path, $meta, $originalName, $sourceUrl);
        } finally {
            $lock->release();
        }
    }

    /** @param array{mime: string, width: int, height: int, size: int} $meta */
    private function doProcess(string $path, array $meta, ?string $originalName, ?string $sourceUrl): array
    {
        $src = match ($meta['mime']) {
            'image/jpeg' => @imagecreatefromjpeg($path),
            'image/png' => @imagecreatefrompng($path),
            'image/webp' => @imagecreatefromwebp($path),
            default => false,
        };
        if (! $src) {
            throw new ImageException('Das Bild konnte nicht verarbeitet werden. Möglicherweise ist die Datei beschädigt.');
        }

        if ($meta['mime'] === 'image/jpeg') {
            $src = $this->applyOrientation($src, ExifOrientation::read($path));
        }

        $disk = Storage::disk('local');
        $dir = self::DIR.'/'.date('Y');
        $disk->makeDirectory($dir);
        $base = $dir.'/'.Str::random(40);
        $cfg = config('rezepte.images');

        try {
            $display = $this->resize($src, $cfg['display_side']);
            $this->writeJpeg($display['img'], $disk->path($base.'.jpg'), $cfg['quality']);
            $width = $display['w'];
            $height = $display['h'];
            if ($display['img'] !== $src) {
                imagedestroy($display['img']);
            }
            unset($display);

            $thumb = $this->resize($src, $cfg['thumb_side']);
            $this->writeJpeg($thumb['img'], $disk->path($base.'_thumb.jpg'), $cfg['quality']);
            if ($thumb['img'] !== $src) {
                imagedestroy($thumb['img']);
            }
        } finally {
            imagedestroy($src);
        }

        $originalPath = null;
        if ($cfg['keep_original']) {
            $ext = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'][$meta['mime']];
            $originalPath = $base.'_original.'.$ext;
            copy($path, $disk->path($originalPath));
        }

        return [
            'path' => $base.'.jpg',
            'thumb_path' => $base.'_thumb.jpg',
            'original_path' => $originalPath,
            'mime' => 'image/jpeg',
            'width' => $width,
            'height' => $height,
            'size_bytes' => filesize($disk->path($base.'.jpg')) ?: 0,
            'original_name' => $originalName ? mb_substr(basename($originalName), 0, 255) : null,
            'source_url' => $sourceUrl ? mb_substr($sourceUrl, 0, 2048) : null,
        ];
    }

    /** @return array{img: \GdImage, w: int, h: int} */
    private function resize(\GdImage $src, int $maxSide): array
    {
        $w = imagesx($src);
        $h = imagesy($src);
        $scale = min(1.0, $maxSide / max($w, $h));
        $nw = max(1, (int) round($w * $scale));
        $nh = max(1, (int) round($h * $scale));
        $dst = imagecreatetruecolor($nw, $nh);
        // Transparenz auf weißen Hintergrund legen (JPEG kennt keine Transparenz)
        imagefill($dst, 0, 0, imagecolorallocate($dst, 255, 255, 255));
        imagecopyresampled($dst, $src, 0, 0, 0, 0, $nw, $nh, $w, $h);

        return ['img' => $dst, 'w' => $nw, 'h' => $nh];
    }

    private function writeJpeg(\GdImage $img, string $target, int $quality): void
    {
        imageinterlace($img, true);
        if (! imagejpeg($img, $target, $quality)) {
            throw new ImageException('Das Bild konnte nicht gespeichert werden. Bitte Schreibrechte des Speicherverzeichnisses prüfen.');
        }
    }

    private function applyOrientation(\GdImage $img, int $orientation): \GdImage
    {
        if ($orientation <= 1 || $orientation > 8) {
            return $img;
        }
        if (in_array($orientation, [2, 4, 5, 7], true)) {
            imageflip($img, IMG_FLIP_HORIZONTAL);
        }
        $angle = match ($orientation) {
            3, 4 => 180,
            5, 6 => 270,
            7, 8 => 90,
            default => 0,
        };
        if ($angle !== 0) {
            $rotated = imagerotate($img, $angle, 0);
            if ($rotated) {
                imagedestroy($img);

                return $rotated;
            }
        }

        return $img;
    }
}
