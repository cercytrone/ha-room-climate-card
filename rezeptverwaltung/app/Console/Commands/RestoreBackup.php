<?php

namespace App\Console\Commands;

use App\Services\Backup\BackupService;
use Illuminate\Console\Command;

class RestoreBackup extends Command
{
    protected $signature = 'rezepte:sicherung-wiederherstellen {datei : Pfad zur ZIP-Datei oder Dateiname in storage/app/private/backups} {--force : Ohne Rückfrage}';

    protected $description = 'Stellt eine Sicherung vollständig wieder her (ERSETZT alle aktuellen Daten und Bilder)';

    public function handle(BackupService $backups): int
    {
        $file = $this->argument('datei');
        $path = is_file($file) ? $file : $backups->path($file);
        if (! $path) {
            $this->error('Sicherungsdatei nicht gefunden: '.$file);

            return self::FAILURE;
        }
        $this->warn('ACHTUNG: Alle aktuellen Rezepte, Einstellungen, Einkaufslisten und Bilder werden durch den Stand der Sicherung ersetzt.');
        if (! $this->option('force') && ! $this->confirm('Wirklich wiederherstellen?')) {
            return self::FAILURE;
        }
        $this->call('down', ['--retry' => 60]);
        try {
            $r = $backups->restore($path);
            $this->info(sprintf('Wiederhergestellt: %d SQL-Anweisungen, %d Bilddateien.', $r['statements'], $r['files']));
        } catch (\Throwable $e) {
            $this->error('Wiederherstellung fehlgeschlagen: '.$e->getMessage());

            return self::FAILURE;
        } finally {
            $this->call('up');
        }
        $this->line('Hinweis: Falls die Sicherung aus einer älteren Programmversion stammt, anschließend „php artisan migrate --force“ ausführen.');

        return self::SUCCESS;
    }
}
