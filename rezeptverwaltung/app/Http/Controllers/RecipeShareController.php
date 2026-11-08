<?php

namespace App\Http\Controllers;

use App\Mail\RecipeMail;
use App\Models\Recipe;
use App\Models\RecipeShare;
use App\Services\Share\PdfRenderer;
use App\Services\Share\RecipeTextRenderer;
use App\Services\Share\ShareOptions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class RecipeShareController extends Controller
{
    /** Rezept als Text – Grundlage für E-Mail-Programm, WhatsApp, Zwischenablage und native Teilen-Funktion. */
    public function text(Request $request, Recipe $recipe, RecipeTextRenderer $renderer)
    {
        $this->authorize('view', $recipe);

        return response($renderer->render($recipe, ShareOptions::fromRequest($request, $recipe)), 200, ['Content-Type' => 'text/plain; charset=UTF-8']);
    }

    public function print(Request $request, Recipe $recipe)
    {
        $this->authorize('view', $recipe);

        return view('recipes.print', $this->printData($request, $recipe) + ['pdf' => false]);
    }

    public function pdf(Request $request, Recipe $recipe, PdfRenderer $pdf)
    {
        $this->authorize('view', $recipe);

        return response($this->renderPdf($request, $recipe, $pdf), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => ($request->boolean('inline') ? 'inline' : 'attachment').'; filename="'.PdfRenderer::filename($recipe->title).'"',
        ]);
    }

    /** Optionaler Direktversand per SMTP (nur wenn eingerichtet). Ein Empfänger, kein Massenversand. */
    public function mail(Request $request, Recipe $recipe, RecipeTextRenderer $renderer, PdfRenderer $pdf)
    {
        $this->authorize('view', $recipe);
        if (config('mail.default') !== 'smtp') {
            return back()->with('warning', 'Der direkte E-Mail-Versand ist nicht eingerichtet. Bitte „Per E-Mail-Programm“ verwenden.');
        }
        $data = $request->validate([
            'recipient' => ['required', 'email:rfc', 'max:255'],
            'message' => ['nullable', 'string', 'max:2000'],
            'attach_pdf' => ['nullable', 'boolean'],
        ], [], ['recipient' => 'Empfänger', 'message' => 'Nachricht']);
        $options = ShareOptions::fromRequest($request, $recipe);
        $text = $renderer->render($recipe, $options);
        $pdfData = ! empty($data['attach_pdf']) ? $this->renderPdf($request, $recipe, $pdf) : null;
        try {
            Mail::to($data['recipient'])->send(new RecipeMail($recipe->title, $text, $data['message'] ?? null, $pdfData, PdfRenderer::filename($recipe->title)));
        } catch (\Throwable $e) {
            // Keine Zugangsdaten protokollieren – nur Fehlerart
            Log::warning('E-Mail-Versand fehlgeschlagen', ['exception' => $e::class]);

            return back()->with('warning', 'Die E-Mail konnte nicht gesendet werden. Bitte die SMTP-Einstellungen prüfen oder das Rezept über das E-Mail-Programm teilen.');
        }

        return back()->with('status', 'E-Mail an '.$data['recipient'].' gesendet.'.($options->notes ? ' (mit persönlichen Notizen)' : ''));
    }

    /** Öffentlichen Freigabelink erstellen (ausdrücklich je Rezept). */
    public function createLink(Request $request, Recipe $recipe)
    {
        $this->authorize('update', $recipe);
        $data = $request->validate([
            'include_notes' => ['nullable', 'boolean'],
            'include_image' => ['nullable', 'boolean'],
            'include_nutrition' => ['nullable', 'boolean'],
        ]);
        $share = $recipe->shares()->create([
            'token' => RecipeShare::newToken(),
            'include_notes' => (bool) ($data['include_notes'] ?? false),
            'include_image' => (bool) ($data['include_image'] ?? false),
            'include_nutrition' => (bool) ($data['include_nutrition'] ?? false),
        ]);

        return redirect()->route('recipes.show', $recipe)->with('status', 'Freigabelink erstellt. Jeder mit diesem Link kann das Rezept lesen, bis Sie ihn widerrufen.')
            ->with('new_share_url', $share->url());
    }

    public function revokeLink(Request $request, RecipeShare $share)
    {
        $this->authorize('update', $share->recipe);
        $share->update(['revoked_at' => now()]);

        return back()->with('status', 'Freigabelink widerrufen. Er funktioniert ab sofort nicht mehr.');
    }

    private function printData(Request $request, Recipe $recipe): array
    {
        $recipe->load(['type', 'categories', 'tags', 'ingredientGroups.ingredients', 'steps', 'nutrition', 'image']);
        $o = ShareOptions::fromRequest($request, $recipe);

        return ['recipe' => $recipe, 'options' => $o, 'factor' => $o->factor($recipe), 'source' => app(RecipeTextRenderer::class)->sourceLine($recipe)];
    }

    private function renderPdf(Request $request, Recipe $recipe, PdfRenderer $pdf): string
    {
        @set_time_limit(120);
        $html = view('recipes.print', $this->printData($request, $recipe) + ['pdf' => true])->render();

        return $pdf->render($html);
    }
}
