<?php

namespace App\Http\Controllers;

use App\Services\Images\PendingUpload;
use App\Services\Import\SchemaRecipeMapper;
use App\Support\IngredientParser;
use App\Support\Markdown;
use Illuminate\Http\Request;

class HelperController extends Controller
{
    /** Markdown-Vorschau mit derselben (sicheren) Darstellung wie die Rezeptansicht. */
    public function markdown(Request $request)
    {
        $data = $request->validate(['text' => ['nullable', 'string', 'max:100000']]);

        return response()->json(['html' => Markdown::toHtml($data['text'] ?? '')]);
    }

    /** Zerlegt eingefügte Zutatenzeilen (für „Zutaten als Text einfügen“). */
    public function ingredients(Request $request)
    {
        $data = $request->validate(['text' => ['required', 'string', 'max:50000']]);
        $groups = [];
        foreach (IngredientParser::parseBlock($data['text']) as $g) {
            $groups[] = ['name' => $g['name'], 'items' => array_map(fn ($p) => SchemaRecipeMapper::itemToForm($p), $g['items'])];
        }

        return response()->json(['groups' => $groups]);
    }

    /** Vorschau eines zwischengespeicherten Bildes (nur angemeldet). */
    public function pendingImage(string $token)
    {
        abort_unless(PendingUpload::valid($token), 404);
        $meta = PendingUpload::meta($token);
        abort_unless(in_array($meta['mime'], config('rezepte.images.mimes'), true), 404);

        return response()->file(PendingUpload::path($token), [
            'Content-Type' => $meta['mime'],
            'Content-Disposition' => 'inline',
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }
}
