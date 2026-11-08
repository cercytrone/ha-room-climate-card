<?php

namespace App\Console\Commands;

use App\Models\ImportQueueItem;
use App\Services\Import\ImportQueueProcessor;
use App\Services\TaskRunLogger;
use Illuminate\Console\Command;

class ProcessImportQueue extends Command
{
    protected $signature = 'rezepte:import-verarbeiten {--max-seconds=50 : Maximale Laufzeit} {--limit=5 : Maximale Anzahl Adressen je Lauf}';

    protected $description = 'Verarbeitet wartende Stapelimporte zeitlich begrenzt (für Cronjob)';

    public function handle(ImportQueueProcessor $processor, TaskRunLogger $logger): int
    {
        if (! ImportQueueItem::query()->where('status', 'pending')->exists()) {
            return self::SUCCESS; // nichts zu tun – kein Protokolleintrag
        }
        $msg = $logger->run('import-warteschlange', function () use ($processor) {
            $s = $processor->process((int) $this->option('max-seconds'), (int) $this->option('limit'));

            return "{$s['processed']} verarbeitet, {$s['ready']} bereit, {$s['failed']} fehlgeschlagen.";
        });
        $this->info($msg);

        return self::SUCCESS;
    }
}
