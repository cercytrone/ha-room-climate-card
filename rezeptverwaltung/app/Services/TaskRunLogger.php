<?php

namespace App\Services;

use App\Models\TaskRun;
use Illuminate\Support\Facades\Log;

/** Protokolliert geplante Aufgaben (Erfolg/Fehler) in der Datenbank und im Log. */
class TaskRunLogger
{
    /**
     * @template T
     *
     * @param  callable(): T  $callback  Rückgabe als Meldung (string) oder beliebig
     * @return T
     */
    public function run(string $task, callable $callback): mixed
    {
        $run = TaskRun::create(['task' => $task, 'status' => 'running', 'started_at' => now()]);
        try {
            $result = $callback();
            $run->update([
                'status' => 'success',
                'message' => is_string($result) ? mb_substr($result, 0, 2000) : null,
                'finished_at' => now(),
            ]);

            return $result;
        } catch (\Throwable $e) {
            $run->update(['status' => 'failed', 'message' => mb_substr($e->getMessage(), 0, 2000), 'finished_at' => now()]);
            Log::error('Geplante Aufgabe fehlgeschlagen: '.$task, ['exception' => $e::class, 'message' => $e->getMessage()]);
            throw $e;
        }
    }
}
