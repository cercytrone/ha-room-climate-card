<?php

namespace App\Http\Controllers;

use App\Models\ImportQueueItem;
use App\Services\Import\ImportQueueProcessor;
use App\Services\Import\RecipeImporter;
use Illuminate\Http\Request;

/** Optionale Stapelimporte: Adressen werden gesammelt und zeitlich begrenzt verarbeitet. */
class ImportQueueController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate(['urls' => ['required', 'string', 'max:100000']], [], ['urls' => 'Adressen']);
        $max = (int) config('rezepte.import.queue_max_urls');
        $urls = [];
        foreach (preg_split('/\s+/u', $data['urls']) ?: [] as $u) {
            $u = trim($u);
            if ($u === '') {
                continue;
            }
            if (! preg_match('#^https?://#i', $u)) {
                $u = 'https://'.$u;
            }
            if (filter_var($u, FILTER_VALIDATE_URL) && strlen($u) <= 2048) {
                $urls[$u] = $u;
            }
        }
        if ($urls === []) {
            return back()->withInput()->withErrors(['urls' => 'Es wurde keine gültige Adresse gefunden (eine Adresse pro Zeile).']);
        }
        if (count($urls) > $max) {
            return back()->withInput()->withErrors(['urls' => "Bitte höchstens {$max} Adressen auf einmal eintragen."]);
        }
        foreach ($urls as $u) {
            ImportQueueItem::create(['user_id' => $request->user()->id, 'url' => $u, 'status' => 'pending']);
        }

        return redirect()->route('import.index', ['tab' => 'stapel'])->with('status', count($urls).' Adresse(n) zur Warteschlange hinzugefügt. Sie werden per Cronjob oder über „Jetzt verarbeiten“ abgerufen.');
    }

    public function process(ImportQueueProcessor $processor)
    {
        @set_time_limit(90);
        $s = $processor->process(45, 3);

        return redirect()->route('import.index', ['tab' => 'stapel'])->with('status', "{$s['processed']} Adresse(n) verarbeitet: {$s['ready']} bereit zur Prüfung, {$s['failed']} fehlgeschlagen.");
    }

    public function review(Request $request, ImportQueueItem $item, RecipeImporter $importer)
    {
        abort_unless($item->user_id === $request->user()->id, 403);
        abort_unless($item->status === 'ready' && isset($item->payload['drafts'][0]), 404);
        $index = max(0, min((int) $request->query('nr', 0), count($item->payload['drafts']) - 1));
        $draft = $item->payload['drafts'][$index];
        if (! empty($draft['image_url'])) {
            $r = $importer->fetchImage($draft['image_url']);
            $draft['pending_cover'] = $r['token'];
            if ($r['error']) {
                $draft['warnings']['image'] = $r['error'];
            }
        }
        if (count($item->payload['drafts']) > 1) {
            $draft['warnings']['multiple'] = 'Die Seite enthält '.count($item->payload['drafts']).' Rezepte. Angezeigt wird Nr. '.($index + 1).'. Andere über die Warteschlange mit „?nr=“ wählbar.';
        }

        return app(ImportController::class)->renderPreview($request, $draft, $item->id);
    }

    public function destroy(Request $request, ImportQueueItem $item)
    {
        abort_unless($item->user_id === $request->user()->id, 403);
        $item->delete();

        return redirect()->route('import.index', ['tab' => 'stapel'])->with('status', 'Eintrag entfernt.');
    }

    public function clear(Request $request)
    {
        $n = ImportQueueItem::query()->where('user_id', $request->user()->id)->whereIn('status', ['saved', 'failed'])->delete();

        return redirect()->route('import.index', ['tab' => 'stapel'])->with('status', "{$n} erledigte bzw. fehlgeschlagene Einträge entfernt.");
    }
}
