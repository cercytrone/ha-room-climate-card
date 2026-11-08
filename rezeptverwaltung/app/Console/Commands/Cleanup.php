<?php

namespace App\Console\Commands;

use App\Models\TaskRun;
use App\Services\TaskRunLogger;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class Cleanup extends Command
{
    protected $signature = 'rezepte:aufraeumen';

    protected $description = 'Entfernt temporäre Exporte, PDF-Zwischendateien und Uploads sowie alte Protokolleinträge';

    public function handle(TaskRunLogger $logger): int
    {
        $logger->run('aufraeumen', function () {
            $maxAge = time() - (int) config('rezepte.cleanup.tmp_max_age_hours') * 3600;
            $root = Storage::disk('local')->path('tmp');
            $deleted = 0;
            if (is_dir($root)) {
                foreach (File::allFiles($root, true) as $file) {
                    if ($file->getMTime() < $maxAge) {
                        @unlink($file->getPathname());
                        $deleted++;
                    }
                }
                foreach (File::directories($root) as $dir) {
                    // leere bzw. alte Arbeitsverzeichnisse (restore-*, import-*) entfernen
                    if (preg_match('#/(restore|import)-[A-Za-z0-9]+$#', $dir) && filemtime($dir) < $maxAge) {
                        File::deleteDirectory($dir);
                    }
                }
            }
            $runs = TaskRun::query()->where('started_at', '<', now()->subDays((int) config('rezepte.cleanup.task_runs_days')))->delete();

            return "{$deleted} temporäre Dateien und {$runs} alte Protokolleinträge entfernt.";
        });
        $this->info('Aufräumen abgeschlossen.');

        return self::SUCCESS;
    }
}
