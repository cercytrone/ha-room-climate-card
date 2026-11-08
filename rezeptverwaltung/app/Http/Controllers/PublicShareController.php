<?php

namespace App\Http\Controllers;

use App\Models\RecipeShare;
use App\Support\Quantity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

/**
 * Nur-Lese-Ansicht für ausdrücklich freigegebene Rezepte. Liefert ausschließlich das
 * freigegebene Rezept und – falls erlaubt – dessen Bild. Kein Zugriff auf andere Inhalte.
 */
class PublicShareController extends Controller
{
    public function show(Request $request, string $token)
    {
        $share = RecipeShare::findActive($token);
        abort_unless($share, 404);
        $share->forceFill(['last_accessed_at' => now()])->saveQuietly();
        $recipe = $share->recipe->load(['type', 'ingredientGroups.ingredients', 'steps', 'nutrition', 'image']);
        $target = Quantity::parsePositive((string) $request->query('menge', '')) ?? $recipe->yield_quantity;

        return response()->view('share.public', ['share' => $share, 'recipe' => $recipe, 'target' => $target])
            ->header('X-Robots-Tag', 'noindex, nofollow')
            ->header('Referrer-Policy', 'no-referrer');
    }

    public function image(string $token)
    {
        $share = RecipeShare::findActive($token);
        abort_unless($share && $share->include_image && $share->recipe->image, 404);
        $path = $share->recipe->image->path;
        abort_unless(Storage::disk('local')->exists($path), 404);

        return response()->file(Storage::disk('local')->path($path), [
            'Content-Type' => 'image/jpeg',
            'Cache-Control' => 'private, max-age=3600',
            'X-Robots-Tag' => 'noindex',
        ]);
    }
}
