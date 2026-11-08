<?php

namespace App\Console\Commands;

use App\Services\Backup\BackupService;
use App\Services\TaskRunLogger;
use Illuminate\Console\Command;

class Backup extends Command
{
    protected $signature = 'rezepte:sicherung {--ohne-aufraeumen : Alte Sicherungen nicht löschen}';

    protected $description = 'Erstellt eine vollständige Sicherung (Datenbank + Bilder) und löscht alte Sicherungen gemäß Aufbewahrungsregel';

    public function handle(BackupService $backups, TaskRunLogger $logger): int
    {
        try {
            $result = $logger->run('sicherung', function () use ($backups) {
                $r = $backups->create();
                $deleted = $this->option('ohne-aufraeumen') ? [] : $backups->prune();

                return sprintf('%s erstellt (%s MB). %d alte Sicherung(en) gelöscht.', $r['file'], number_format($r['size'] / 1048576, 1, ',', '.'), count($deleted));
            });
            $this->info($result);

            return self::SUCCESS;
        } catch (\Throwable $e) {
            $this->error('Sicherung fehlgeschlagen: '.$e->getMessage());

            return self::FAILURE;
        }
    }
}
