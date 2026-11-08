<?php

namespace App\Services\Import;

use App\Models\ImportQueueItem;

/**
 * Verarbeitet die Import-Warteschlange in kleinen, zeitlich begrenzten Paketen
 * (per Cronjob oder per Knopfdruck). Es läuft kein dauerhafter Hintergrundprozess.
 * Ergebnisse werden als Entwurf gespeichert und erst nach Prüfung übernommen.
 */
class ImportQueueProcessor
{
    public function __construct(private readonly RecipeImporter $importer) {}

    /** @return array{processed: int, ready: int, failed: int} */
    public function process(int $maxSeconds = 50, int $limit = 5): array
    {
        $deadline = microtime(true) + $maxSeconds;
        $stats = ['processed' => 0, 'ready' => 0, 'failed' => 0];
        $perFetch = (int) config('rezepte.import.timeout') + (int) config('rezepte.import.connect_timeout');

        // Hängengebliebene Einträge (z. B. nach Abbruch) wieder freigeben
        ImportQueueItem::query()->where('status', 'processing')->where('locked_until', '<', now())->update(['status' => 'pending']);

        while ($stats['processed'] < $limit && microtime(true) + $perFetch < $deadline) {
            $item = ImportQueueItem::query()->where('status', 'pending')->orderBy('id')->first();
            if (! $item) {
                break;
            }
            $claimed = ImportQueueItem::query()->whereKey($item->id)->where('status', 'pending')
                ->update(['status' => 'processing', 'locked_until' => now()->addMinutes(5), 'attempts' => $item->attempts + 1]);
            if (! $claimed) {
                continue; // von paralleler Verarbeitung übernommen
            }
            $stats['processed']++;
            try {
                $drafts = $this->importer->fromUrl($item->url);
                $item->update(['status' => 'ready', 'payload' => ['drafts' => $drafts], 'error' => null, 'locked_until' => null]);
                $stats['ready']++;
            } catch (ImportException $e) {
                $item->update(['status' => 'failed', 'error' => mb_substr($e->getMessage(), 0, 500), 'locked_until' => null]);
                $stats['failed']++;
            } catch (\Throwable $e) {
                report($e);
                $item->update(['status' => 'failed', 'error' => 'Unerwarteter Fehler beim Import.', 'locked_until' => null]);
                $stats['failed']++;
            }
        }

        return $stats;
    }
}
