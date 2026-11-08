<?php

namespace App\Services\Images;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Zwischenspeicher für Bilder, die noch keinem gespeicherten Rezept zugeordnet sind
 * (Importvorschau, Formular mit Validierungsfehlern). Liegt im privaten Speicher und
 * wird per Cronjob nach 24 Stunden gelöscht.
 */
final class PendingUpload
{
    private const DIR = 'tmp/uploads';

    public static function stash(string $sourcePath, ?string $originalName = null, ?string $sourceUrl = null, bool $move = false): string
    {
        $token = Str::random(40);
        $disk = Storage::disk('local');
        $disk->makeDirectory(self::DIR);
        $target = $disk->path(self::DIR.'/'.$token.'.bin');
        $ok = $move ? @rename($sourcePath, $target) : @copy($sourcePath, $target);
        if (! $ok) {
            throw new ImageException('Das Bild konnte nicht zwischengespeichert werden.');
        }
        $mime = (new \finfo(FILEINFO_MIME_TYPE))->file($target) ?: 'application/octet-stream';
        $disk->put(self::DIR.'/'.$token.'.json', json_encode([
            'original_name' => $originalName,
            'source_url' => $sourceUrl,
            'mime' => $mime,
            'created_at' => time(),
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

        return $token;
    }

    public static function valid(?string $token): bool
    {
        return $token !== null && preg_match('/^[A-Za-z0-9]{40}$/', $token) === 1
            && Storage::disk('local')->exists(self::DIR.'/'.$token.'.bin');
    }

    public static function path(string $token): string
    {
        return Storage::disk('local')->path(self::DIR.'/'.$token.'.bin');
    }

    /** @return array{original_name: ?string, source_url: ?string, mime: string} */
    public static function meta(string $token): array
    {
        $json = Storage::disk('local')->get(self::DIR.'/'.$token.'.json');
        $data = $json ? json_decode($json, true) : null;

        return is_array($data) ? $data + ['original_name' => null, 'source_url' => null, 'mime' => 'application/octet-stream']
            : ['original_name' => null, 'source_url' => null, 'mime' => 'application/octet-stream'];
    }

    public static function forget(string $token): void
    {
        if (preg_match('/^[A-Za-z0-9]{40}$/', $token)) {
            Storage::disk('local')->delete([self::DIR.'/'.$token.'.bin', self::DIR.'/'.$token.'.json']);
        }
    }
}
