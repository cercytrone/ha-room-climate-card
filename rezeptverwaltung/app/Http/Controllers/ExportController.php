<?php

namespace App\Http\Controllers;

use App\Services\Export\CollectionExporter;
use App\Services\Export\CollectionImporter;
use Illuminate\Http\Request;

class ExportController extends Controller
{
    public function export(Request $request, CollectionExporter $exporter)
    {
        $path = $exporter->export($request->user(), $request->boolean('notes', true), $request->boolean('originals'));

        return response()->download($path, 'rezepte-export-'.now()->format('Y-m-d').'.zip', ['Content-Type' => 'application/zip'])
            ->deleteFileAfterSend();
    }

    public function import(Request $request, CollectionImporter $importer)
    {
        $max = (int) config('rezepte.export.max_upload_mb') * 1024;
        $request->validate([
            'file' => ['required', 'file', 'max:'.$max, 'mimetypes:application/zip,application/x-zip-compressed,application/octet-stream'],
            'skip_duplicates' => ['nullable', 'boolean'],
        ], [
            'file.max' => 'Die Datei ist zu groß für den Upload. Größere Exporte bitte per SSH mit „php artisan rezepte:sammlung-importieren“ einspielen.',
            'file.uploaded' => 'Die Datei konnte nicht hochgeladen werden (Upload-Limit des Servers: '.ini_get('upload_max_filesize').').',
        ], ['file' => 'Exportdatei']);
        try {
            $r = $importer->import($request->user(), $request->file('file')->getRealPath(), $request->boolean('skip_duplicates', true));
        } catch (\RuntimeException $e) {
            return back()->with('warning', 'Import nicht möglich: '.$e->getMessage());
        }

        return back()->with('status', "{$r['imported']} Rezept(e) importiert, {$r['skipped']} übersprungen.")
            ->with('import_warnings', $r['warnings']);
    }
}
