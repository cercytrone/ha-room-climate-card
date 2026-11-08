<?php

namespace App\Http\Controllers;

use App\Services\Backup\BackupService;
use App\Services\TaskRunLogger;

class BackupController extends Controller
{
    public function store(BackupService $backups, TaskRunLogger $logger)
    {
        try {
            $r = $logger->run('sicherung-manuell', fn () => $backups->create());
            $backups->prune();
        } catch (\Throwable $e) {
            return back()->with('warning', 'Die Sicherung ist fehlgeschlagen: '.$e->getMessage());
        }

        return back()->with('status', 'Sicherung '.$r['file'].' erstellt.');
    }

    public function download(string $name, BackupService $backups)
    {
        $path = $backups->path($name);
        abort_unless($path, 404);

        return response()->download($path, $name, ['Content-Type' => 'application/zip']);
    }

    public function destroy(string $name, BackupService $backups)
    {
        $path = $backups->path($name);
        abort_unless($path, 404);
        unlink($path);

        return back()->with('status', 'Sicherung '.$name.' gelöscht.');
    }
}
