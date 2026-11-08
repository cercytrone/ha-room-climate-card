<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Support\Facades\Storage;

/** Liefert Rezeptbilder aus dem privaten Speicher – nur nach Anmeldung und Berechtigungsprüfung. */
class RecipeImageController extends Controller
{
    public function show(Recipe $recipe, string $variant)
    {
        $this->authorize('view', $recipe);
        $image = $recipe->image;
        abort_unless($image, 404);
        $path = $variant === 'vorschau' ? $image->thumb_path : $image->path;
        abort_unless($path && Storage::disk('local')->exists($path), 404);

        return response()->file(Storage::disk('local')->path($path), [
            'Content-Type' => 'image/jpeg',
            'Cache-Control' => 'private, max-age=86400',
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }
}
