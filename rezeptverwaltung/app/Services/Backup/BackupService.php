<?php

namespace App\Services\Backup;

use App\Models\Setting;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Vollständige Sicherung: Datenbank (SQL, gzip) + hochgeladene Bilder in einer ZIP-Datei.
 * Sicherungen liegen im privaten Speicher (storage/app/private/backups) und sind
 * nur nach Anmeldung bzw. per SSH erreichbar.
 */
class BackupService
{
    public const DIR = 'backups';

    public const FORMAT = 'rezeptverwaltung-sicherung';

    public function __construct(private readonly DatabaseDumper $dumper) {}

    public function directory(): string
    {
        $dir = Storage::disk('local')->path(self::DIR);
        if (! is_dir($dir)) {
            mkdir($dir, 0750, true);
        }

        return $dir;
    }

    /** @return array{file: string, size: int, counts: array<string, int>} */
    public function create(): array
    {
        if (! class_exists(\ZipArchive::class)) {
            throw new \RuntimeException('Die PHP-Erweiterung „zip“ ist nicht verfügbar.');
        }
        @set_time_limit(170);
        $dir = $this->directory();
        $name = 'sicherung-'.now()->format('Y-m-d_His').'.zip';
        $partial = $dir.'/.'.$name.'.partial';
        $sqlGz = $dir.'/.'.Str::random(16).'.sql.gz';

        try {
            $counts = $this->dumper->dump($sqlGz);

            $zip = new \ZipArchive;
            if ($zip->open($partial, \ZipArchive::CREATE | \ZipArchive::OVERWRITE) !== true) {
                throw new \RuntimeException('ZIP-Datei konnte nicht angelegt werden.');
            }
            $imagesRoot = Storage::disk('local')->path('recipe-images');
            $files = 0;
            if (is_dir($imagesRoot)) {
                foreach (File::allFiles($imagesRoot) as $file) {
                    $zip->addFile($file->getPathname(), 'files/recipe-images/'.str_replace('\\', '/', $file->getRelativePathname()));
                    $zip->setCompressionName('files/recipe-images/'.str_replace('\\', '/', $file->getRelativePathname()), \ZipArchive::CM_STORE);
                    $files++;
                }
            }
            $zip->addFile($sqlGz, 'database.sql.gz');
            $zip->addFromString('manifest.json', json_encode([
                'format' => self::FORMAT,
                'version' => 1,
                'created_at' => now()->toIso8601String(),
                'app' => config('app.name'),
                'tables' => $counts,
                'files' => $files,
            ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
            if (! $zip->close()) {
                throw new \RuntimeException('ZIP-Datei konnte nicht geschrieben werden (Speicherplatz prüfen).');
            }
            rename($partial, $dir.'/'.$name);
        } finally {
            @unlink($sqlGz);
            @unlink($partial);
        }

        return ['file' => $name, 'size' => filesize($dir.'/'.$name) ?: 0, 'counts' => $counts];
    }

    /** @return array<int, array{name: string, size: int, time: int}> neueste zuerst */
    public function list(): array
    {
        $out = [];
        foreach (glob($this->directory().'/sicherung-*.zip') ?: [] as $f) {
            $out[] = ['name' => basename($f), 'size' => filesize($f) ?: 0, 'time' => filemtime($f) ?: 0];
        }
        usort($out, fn ($a, $b) => strcmp($b['name'], $a['name']));

        return $out;
    }

    public function path(string $name): ?string
    {
        if (! preg_match('/^sicherung-\d{4}-\d{2}-\d{2}_\d{6}\.zip$/', $name)) {
            return null;
        }
        $p = $this->directory().'/'.$name;

        return is_file($p) ? $p : null;
    }

    /**
     * Aufbewahrung: die neuesten $keep Sicherungen bleiben; ältere als $maxAgeDays werden gelöscht.
     * Die neueste Sicherung wird nie automatisch gelöscht.
     *
     * @return array<int, string> gelöschte Dateien
     */
    public function prune(?int $keep = null, ?int $maxAgeDays = null): array
    {
        $keep ??= (int) Setting::get('backup_keep', config('rezepte.backup.keep'));
        $maxAgeDays ??= (int) Setting::get('backup_max_age_days', config('rezepte.backup.max_age_days'));
        $keep = max(1, $keep);
        $deleted = [];
        foreach ($this->list() as $i => $b) {
            if ($i === 0) {
                continue;
            }
            $tooMany = $i >= $keep;
            $tooOld = $maxAgeDays > 0 && $b['time'] < time() - $maxAgeDays * 86400;
            if ($tooMany || $tooOld) {
                @unlink($this->directory().'/'.$b['name']);
                $deleted[] = $b['name'];
            }
        }

        return $deleted;
    }

    /**
     * Stellt eine Sicherung vollständig wieder her (Datenbank UND Bilder).
     *
     * @return array{statements: int, files: int}
     */
    public function restore(string $zipPath): array
    {
        $zip = new \ZipArchive;
        if ($zip->open($zipPath) !== true) {
            throw new \RuntimeException('Die Sicherungsdatei kann nicht geöffnet werden.');
        }
        $manifest = json_decode((string) $zip->getFromName('manifest.json'), true);
        if (! is_array($manifest) || ($manifest['format'] ?? null) !== self::FORMAT) {
            $zip->close();
            throw new \RuntimeException('Die Datei ist keine Sicherung dieser Anwendung.');
        }
        $work = Storage::disk('local')->path('tmp/restore-'.Str::random(12));
        mkdir($work, 0750, true);
        try {
            // Nur erwartete Pfade entpacken (Schutz vor „../“ in Archiven)
            $entries = [];
            for ($i = 0; $i < $zip->numFiles; $i++) {
                $n = (string) $zip->getNameIndex($i);
                if ($n === 'database.sql.gz' || (str_starts_with($n, 'files/recipe-images/') && ! str_contains($n, '..') && ! str_ends_with($n, '/'))) {
                    $entries[] = $n;
                }
            }
            if (! in_array('database.sql.gz', $entries, true)) {
                throw new \RuntimeException('Die Sicherung enthält keine Datenbank.');
            }
            if (! $zip->extractTo($work, $entries)) {
                throw new \RuntimeException('Die Sicherung konnte nicht entpackt werden (Speicherplatz prüfen).');
            }
            $zip->close();

            $statements = $this->dumper->restore($work.'/database.sql.gz');

            $target = Storage::disk('local')->path('recipe-images');
            $newImages = $work.'/files/recipe-images';
            $old = null;
            if (is_dir($target)) {
                $old = $target.'.alt-'.date('YmdHis');
                rename($target, $old);
            }
            if (is_dir($newImages)) {
                rename($newImages, $target);
            } else {
                mkdir($target, 0750, true);
            }
            if ($old) {
                File::deleteDirectory($old);
            }
            $files = count(File::allFiles($target));
        } finally {
            if (is_dir($work)) {
                File::deleteDirectory($work);
            }
        }

        return ['statements' => $statements, 'files' => $files];
    }
}
