<?php

namespace App\Http\Controllers;

use App\Models\ImportQueueItem;
use App\Models\Recipe;
use App\Services\Import\ImportException;
use App\Services\Import\RecipeImporter;
use App\Services\Import\TextRecipeParser;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

/**
 * Import-Ablauf: URL eingeben -> serverseitig abrufen -> Rezeptdaten auslesen ->
 * ggf. Auswahl -> bearbeitbare Vorschau (Rezeptformular) -> erst beim Speichern anlegen.
 */
class ImportController extends Controller
{
    private const SESSION = 'import_drafts';

    public function index(Request $request)
    {
        return view('import.index', [
            'queue' => ImportQueueItem::query()->where('user_id', $request->user()->id)->orderByDesc('id')->limit(100)->get(),
        ]);
    }

    public function fromUrl(Request $request, RecipeImporter $importer)
    {
        $data = $request->validate(['url' => ['required', 'string', 'max:2048']], [], ['url' => 'Adresse']);
        $url = trim($data['url']);
        if (! preg_match('#^https?://#i', $url)) {
            $url = 'https://'.$url;
        }
        @set_time_limit(60);
        try {
            $drafts = $importer->fromUrl($url);
        } catch (ImportException $e) {
            return back()->withInput()->with('import_error', $e->getMessage());
        }

        $key = $this->storeDrafts($request, $drafts);
        if (count($drafts) > 1) {
            return redirect()->route('import.choose', $key);
        }

        return redirect()->route('import.preview', [$key, 0]);
    }

    public function fromText(Request $request, TextRecipeParser $parser)
    {
        $data = $request->validate([
            'text' => ['required', 'string', 'max:100000'],
            'title' => ['nullable', 'string', 'max:255'],
            'source' => ['nullable', 'string', 'max:2048'],
        ], [], ['text' => 'Rezepttext', 'title' => 'Titel', 'source' => 'Quelle']);
        $draft = $parser->parse($data['text'], $data['title'] ?? null);
        if (! empty($data['source'])) {
            if (preg_match('#^https?://#i', trim($data['source']))) {
                $draft['source_url'] = trim($data['source']);
            } else {
                $draft['source_text'] = mb_substr(trim($data['source']), 0, 500);
            }
        }
        $key = $this->storeDrafts($request, [$draft]);

        return redirect()->route('import.preview', [$key, 0]);
    }

    public function choose(Request $request, string $key)
    {
        $drafts = $this->drafts($request, $key);

        return view('import.choose', ['key' => $key, 'drafts' => $drafts]);
    }

    public function preview(Request $request, string $key, int $index, RecipeImporter $importer)
    {
        $drafts = $this->drafts($request, $key);
        abort_unless(isset($drafts[$index]), 404);
        $draft = $drafts[$index];

        // Bild der Quelle einmalig in den Zwischenspeicher laden (nur Anzeige nach Anmeldung)
        if (! empty($draft['image_url']) && ! array_key_exists('pending_cover', $draft)) {
            $r = $importer->fetchImage($draft['image_url']);
            $draft['pending_cover'] = $r['token'];
            if ($r['error']) {
                $draft['warnings']['image'] = $r['error'];
            }
            $drafts[$index] = $draft;
            $request->session()->put(self::SESSION.'.'.$key, $drafts);
        }

        return $this->renderPreview($request, $draft, null);
    }

    /** Gemeinsame Darstellung der Vorschau (auch für Warteschlange). */
    public function renderPreview(Request $request, array $draft, ?int $queueItemId)
    {
        $duplicates = app(RecipeImporter::class)->duplicatesFor($draft['source_url'] ?? null, $request->user()->id);
        $data = app(RecipeController::class)->formData(new Recipe, $draft + ['rating' => null, 'is_favorite' => false, 'notes' => null]);

        return view('recipes.form', $data + [
            'importMode' => true,
            'duplicates' => $duplicates,
            'pendingCover' => $draft['pending_cover'] ?? null,
            'queueItemId' => $queueItemId,
        ]);
    }

    private function storeDrafts(Request $request, array $drafts): string
    {
        $key = Str::random(16);
        // Nur die letzten 5 Importvorgänge in der Sitzung behalten
        $all = $request->session()->get(self::SESSION, []);
        $all = array_slice($all, -4, null, true);
        $all[$key] = $drafts;
        $request->session()->put(self::SESSION, $all);

        return $key;
    }

    private function drafts(Request $request, string $key): array
    {
        abort_unless(preg_match('/^[A-Za-z0-9]{16}$/', $key), 404);
        $drafts = $request->session()->get(self::SESSION.'.'.$key);
        if (! is_array($drafts)) {
            abort(redirect()->route('import.index')->with('import_error', 'Dieser Importvorgang ist abgelaufen. Bitte die Adresse erneut eingeben.'));
        }

        return $drafts;
    }
}
