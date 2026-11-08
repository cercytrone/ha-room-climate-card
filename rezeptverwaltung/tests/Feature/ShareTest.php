<?php

namespace Tests\Feature;

use App\Mail\RecipeMail;
use App\Models\RecipeNutrition;
use App\Models\RecipeShare;
use App\Services\Images\ImageService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ShareTest extends TestCase
{
    use RefreshDatabase;

    public function test_notizen_sind_beim_teilen_standardmaessig_ausgeschlossen(): void
    {
        $this->actingAs($this->user());
        $r = $this->bread();
        $this->assertStringNotContainsString('Geheimtipp', $this->get(route('recipes.text', $r))->getContent());
        $this->assertStringContainsString('Geheimtipp', $this->get(route('recipes.text', [$r, 'notizen' => '1']))->getContent());
        $this->get(route('recipes.print', $r))->assertDontSee('Geheimtipp');
        $this->get(route('recipes.print', [$r, 'notizen' => 1]))->assertSee('Geheimtipp');
    }

    public function test_naehrwerte_abwaehlbar(): void
    {
        $this->actingAs($this->user());
        $r = $this->bread();
        RecipeNutrition::create(['recipe_id' => $r->id, 'basis' => 'serving', 'energy_kcal' => 321]);
        $this->assertStringContainsString('321', $this->get(route('recipes.text', $r))->getContent());
        $this->assertStringNotContainsString('321', $this->get(route('recipes.text', [$r, 'naehrwerte' => '0']))->getContent());
    }

    public function test_e_mail_versand_nur_mit_smtp_und_ohne_notizen(): void
    {
        $this->actingAs($this->user());
        $r = $this->bread();
        $this->post(route('recipes.mail', $r), ['recipient' => 'a@example.org'])->assertSessionHas('warning');

        config(['mail.default' => 'smtp']);
        Mail::fake();
        $this->post(route('recipes.mail', $r), ['recipient' => 'a@example.org', 'attach_pdf' => '1'])->assertSessionHas('status');
        Mail::assertSent(RecipeMail::class, fn ($m) => ! str_contains($m->bodyText, 'Geheimtipp') && $m->pdfData !== null);
        $this->post(route('recipes.mail', $r), ['recipient' => 'a@example.org, b@example.org'])->assertSessionHasErrors('recipient');
    }

    public function test_oeffentlicher_link_nur_lesend_und_widerrufbar(): void
    {
        $user = $this->user();
        $this->actingAs($user);
        $r = $this->bread();
        $other = $this->bread(['title' => 'Anderes Rezept']);
        app(ImageService::class)->attachToRecipe($r, $this->jpeg());
        app(ImageService::class)->attachToRecipe($other, $this->jpeg());

        $this->post(route('recipes.shares.store', $r), ['include_image' => '1']);
        $share = RecipeShare::first();
        $this->assertGreaterThanOrEqual(43, strlen($share->token));
        $this->assertFalse($share->include_notes);
        auth()->logout();

        $this->get('/r/'.$share->token)->assertOk()->assertSee('Bauernbrot')->assertDontSee('Geheimtipp')
            ->assertDontSee('Bearbeiten')->assertHeader('X-Robots-Tag', 'noindex, nofollow');
        $this->get('/r/'.$share->token.'/bild')->assertOk();
        // Kein Zugriff auf andere Inhalte
        $this->get(route('recipes.image', [$other, 'anzeige']))->assertRedirect('/anmelden');
        $this->get(route('recipes.show', $other))->assertRedirect('/anmelden');
        $this->get('/r/falsch-geratenes-token-'.str_repeat('a', 30))->assertNotFound();

        $this->actingAs($user)->delete(route('shares.destroy', $share));
        auth()->logout();
        $this->get('/r/'.$share->token)->assertNotFound();
        $this->get('/r/'.$share->token.'/bild')->assertNotFound();
    }

    public function test_notizen_nur_nach_ausdruecklicher_freigabe(): void
    {
        $this->actingAs($this->user());
        $r = $this->bread();
        $this->post(route('recipes.shares.store', $r), ['include_notes' => '1']);
        auth()->logout();
        $this->get(RecipeShare::first()->url())->assertSee('Geheimtipp');
        $this->get('/r/'.RecipeShare::first()->token.'/bild')->assertNotFound(); // Bild nicht freigegeben
    }

    public function test_pdf_mit_umlauten_und_langem_rezept(): void
    {
        $this->actingAs($this->user());
        $steps = [];
        for ($i = 1; $i <= 60; $i++) {
            $steps[] = ['body' => "Schritt $i: Größere Äpfel schälen, Öl erhitzen, Süßes rühren – „Grüße“ ½ € ß. ".str_repeat('Langer Text zum Umbrechen. ', 12)];
        }
        $r = $this->bread(['title' => 'Käsespätzle für Groß & Klein', 'steps' => $steps]);
        app(ImageService::class)->attachToRecipe($r, $this->jpeg(1600, 1200));
        $resp = $this->get(route('recipes.pdf', [$r, 'menge' => '1,5']));
        $resp->assertOk()->assertHeader('Content-Type', 'application/pdf');
        $pdf = $resp->getContent();
        $this->assertStringStartsWith('%PDF', $pdf);

        if (trim((string) shell_exec('command -v pdftotext'))) {
            $file = tempnam(sys_get_temp_dir(), 'pdf');
            file_put_contents($file, $pdf);
            $text = shell_exec('pdftotext -enc UTF-8 '.escapeshellarg($file).' -');
            $info = shell_exec('pdfinfo '.escapeshellarg($file));
            unlink($file);
            $this->assertStringContainsString('Käsespätzle für Groß & Klein', $text);
            $this->assertStringContainsString('Größere Äpfel schälen, Öl erhitzen, Süßes', $text);
            $this->assertStringContainsString('750 g', $text);
            $this->assertStringContainsString('Schritt 60', $text, 'Langes Rezept wird vollständig ausgegeben');
            preg_match('/Pages:\s+(\d+)/', $info, $m);
            $this->assertGreaterThan(3, (int) $m[1]);
        }
    }
}
