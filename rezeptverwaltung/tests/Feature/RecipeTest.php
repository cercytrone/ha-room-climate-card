<?php

namespace Tests\Feature;

use App\Models\Ingredient;
use App\Models\Recipe;
use App\Models\RecipeImage;
use App\Models\RecipeShare;
use App\Models\ShoppingList;
use App\Models\User;
use App\Services\Images\ImageService;
use App\Services\Shopping\ShoppingListBuilder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class RecipeTest extends TestCase
{
    use RefreshDatabase;

    public function test_gaeste_werden_zur_anmeldung_umgeleitet_und_es_gibt_keine_registrierung(): void
    {
        $this->get('/rezepte')->assertRedirect('/anmelden');
        $this->get('/registrieren')->assertNotFound();
        $this->get('/register')->assertNotFound();
    }

    public function test_anmeldung_und_begrenzung_der_versuche(): void
    {
        $this->user();
        for ($i = 0; $i < 5; $i++) {
            $this->post('/anmelden', ['email' => 'koch@example.org', 'password' => 'falsch'])->assertSessionHasErrors('email');
        }
        $this->post('/anmelden', ['email' => 'koch@example.org', 'password' => 'geheimes-passwort'])->assertSessionHasErrors('email');
        $this->assertStringStartsWith('Zu viele Anmeldeversuche', session('errors')->first('email'));
        $this->assertGuest();
    }

    public function test_anmeldung_erfolgreich(): void
    {
        $this->user();
        $this->post('/anmelden', ['email' => 'Koch@Example.org', 'password' => 'geheimes-passwort'])->assertRedirect('/rezepte');
        $this->assertAuthenticated();
    }

    public function test_rezept_anlegen_mit_gruppen_schritten_und_bild(): void
    {
        $this->actingAs($this->user());
        $cover = new UploadedFile($this->jpeg(1200, 900), 'brot.jpg', 'image/jpeg', null, true);
        $resp = $this->post('/rezepte', [
            'title' => 'Dinkelbrot',
            'yield_quantity' => '1,5',
            'yield_unit' => 'Brote',
            'prep_minutes' => '0:20',
            'rest_minutes' => '12 Std.',
            'cook_minutes' => '45',
            'total_minutes' => '',
            'rating' => '4',
            'tags' => 'Wochenende, rustikal',
            'new_type' => 'Brot',
            'groups' => [
                ['name' => 'Vorteig', 'items' => [['quantity' => '1/2', 'unit' => 'TL', 'name' => 'Hefe', 'scalable' => '1'], ['quantity' => '', 'unit' => '', 'name' => '', 'note' => '']]],
                ['name' => 'Hauptteig', 'items' => [['quantity' => '500', 'unit' => 'g', 'name' => 'Dinkelmehl', 'scalable' => '1'], ['quantity' => 'etwas', 'unit' => '', 'name' => 'Öl', 'scalable' => '1']]],
            ],
            'steps' => [['body' => 'Schritt **eins**'], ['body' => ''], ['body' => 'Schritt zwei']],
            'nutrition' => ['basis' => '100g', 'energy_kcal' => '245,5', 'fat' => ''],
            'cover' => $cover,
        ]);
        $recipe = Recipe::first();
        $resp->assertRedirect(route('recipes.show', $recipe));
        $this->assertSame(1.5, $recipe->yield_quantity);
        $this->assertSame([20, 720, 45, null], [$recipe->prep_minutes, $recipe->rest_minutes, $recipe->cook_minutes, $recipe->total_minutes]);
        $this->assertSame('Brot', $recipe->type->name);
        $this->assertSame(['rustikal', 'Wochenende'], $recipe->tags->pluck('name')->all());
        $this->assertSame(['Vorteig', 'Hauptteig'], $recipe->ingredientGroups->pluck('name')->all());
        $this->assertSame(3, $recipe->ingredients()->count()); // leere Zeile verworfen
        $this->assertSame(2, $recipe->steps()->count());
        $oel = Ingredient::where('name', 'Öl')->first();
        $this->assertNull($oel->quantity);
        $this->assertSame('etwas', $oel->quantity_text);
        $this->assertFalse($oel->scalable);
        $this->assertSame(245.5, $recipe->nutrition->energy_kcal);
        $this->assertNull($recipe->nutrition->fat);

        $image = $recipe->image;
        $this->assertNotNull($image);
        $this->assertSame(1200, $image->width);
        Storage::disk('local')->assertExists([$image->path, $image->thumb_path, $image->original_path]);
        $this->assertStringNotContainsString('brot', $image->path, 'Zufällige interne Dateinamen');
        $this->get(route('recipes.image', [$recipe, 'vorschau']))->assertOk()->assertHeader('Content-Type', 'image/jpeg');
    }

    public function test_rezept_ohne_bild_bewertung_und_naehrwerte(): void
    {
        $this->actingAs($this->user());
        $r = $this->bread(['notes' => null]);
        $this->get(route('recipes.show', $r))->assertOk()->assertSee('Bauernbrot')->assertDontSee('naehrwerte-titel')->assertDontSee('von 5 Sternen');
        $this->get(route('recipes.image', [$r, 'anzeige']))->assertNotFound();
        $this->get(route('recipes.index'))->assertOk()->assertSee('Bauernbrot');
    }

    public function test_eingaben_bleiben_bei_fehlern_erhalten_und_bild_wird_zwischengespeichert(): void
    {
        $this->actingAs($this->user());
        $cover = new UploadedFile($this->jpeg(), 'foto.jpg', 'image/jpeg', null, true);
        $resp = $this->from('/rezepte/neu')->post('/rezepte', [
            'title' => 'Halb fertig',
            'yield_quantity' => '0',
            'yield_unit' => 'Portionen',
            'groups' => [['name' => 'A', 'items' => [['quantity' => '200', 'unit' => 'g', 'name' => 'Zucker']]]],
            'notes' => 'Wichtige Notiz',
            'cover' => $cover,
        ]);
        $resp->assertRedirect('/rezepte/neu')->assertSessionHasErrors(['yield_quantity' => 'Die Rezeptmenge muss größer als 0 sein.']);
        $this->assertSame('Halb fertig', session()->getOldInput('title'));
        $this->assertSame('Zucker', session()->getOldInput('groups.0.items.0.name'));
        $token = session()->getOldInput('pending_cover');
        $this->assertMatchesRegularExpression('/^[A-Za-z0-9]{40}$/', $token);

        // Formular zeigt die Eingaben wieder an
        $this->get('/rezepte/neu')->assertSee('Halb fertig')->assertSee('Wichtige Notiz')->assertSee('Zucker');

        // Speichern mit zwischengespeichertem Bild
        $this->post('/rezepte', ['title' => 'Halb fertig', 'yield_quantity' => '2', 'yield_unit' => 'Portionen', 'pending_cover' => $token]);
        $this->assertNotNull(Recipe::first()->image);
        $this->assertSame(0, Recipe::count() - 1);
    }

    public function test_ungueltige_und_zu_grosse_bilder_werden_abgelehnt(): void
    {
        $this->actingAs($this->user());
        $fake = UploadedFile::fake()->createWithContent('boese.jpg', "<?php echo 'x';");
        $this->post('/rezepte', ['title' => 'X', 'yield_quantity' => '1', 'yield_unit' => 'Stück', 'cover' => $fake])
            ->assertSessionHasErrors('cover');

        config(['rezepte.images.max_side' => 500]);
        $big = new UploadedFile($this->jpeg(800, 600), 'gross.jpg', 'image/jpeg', null, true);
        $this->post('/rezepte', ['title' => 'X', 'yield_quantity' => '1', 'yield_unit' => 'Stück', 'cover' => $big])
            ->assertSessionHasErrors(['cover' => 'Das Bild ist mit 800 × 600 Pixeln zu groß. Erlaubt sind höchstens 500 Pixel Kantenlänge.']);
        $this->assertSame(0, Recipe::count());
    }

    public function test_bild_austauschen_und_entfernen(): void
    {
        $this->actingAs($this->user());
        $r = $this->bread();
        app(ImageService::class)->attachToRecipe($r, $this->jpeg());
        $old = $r->image()->first();
        $payload = ['title' => 'Bauernbrot', 'yield_quantity' => '1', 'yield_unit' => 'Brote'];
        $this->put(route('recipes.update', $r), $payload + ['cover' => new UploadedFile($this->jpeg(400, 300), 'neu.jpg', 'image/jpeg', null, true)]);
        Storage::disk('local')->assertMissing($old->path);
        $this->assertSame(400, $r->image()->first()->width);
        $this->put(route('recipes.update', $r), $payload + ['remove_cover' => '1']);
        $this->assertNull($r->image()->first());
        $this->assertSame(0, RecipeImage::count());
    }

    public function test_loeschen_entfernt_bild_und_freigaben_aber_einkaufsliste_bleibt(): void
    {
        $user = $this->user();
        $this->actingAs($user);
        $r = $this->bread();
        app(ImageService::class)->attachToRecipe($r, $this->jpeg());
        $path = $r->image->path;
        $r->shares()->create(['token' => RecipeShare::newToken()]);
        $list = ShoppingList::defaultFor($user);
        app(ShoppingListBuilder::class)->addRecipe($list, $r, 1);

        $this->delete(route('recipes.destroy', $r))->assertRedirect(route('recipes.index'));
        Storage::disk('local')->assertMissing($path);
        $this->assertDatabaseCount('recipe_shares', 0);
        $this->assertDatabaseCount('ingredients', 0);
        $sel = $list->selections()->first();
        $this->assertNull($sel->recipe_id);
        $this->assertSame('Bauernbrot', $sel->recipe_title);
        $this->assertGreaterThan(0, $list->items()->count());
    }

    public function test_fremde_rezepte_und_bilder_sind_nicht_zugreifbar(): void
    {
        $r = $this->bread();
        $other = User::create(['name' => 'B', 'email' => 'b@example.org', 'password' => 'anderes-passwort']);
        $this->actingAs($other)->get(route('recipes.show', $r))->assertForbidden();
        $this->actingAs($other)->get(route('recipes.pdf', $r))->assertForbidden();
        $this->actingAs($other)->get(route('recipes.image', [$r, 'anzeige']))->assertForbidden();
    }

    public function test_suche_und_filter(): void
    {
        $this->actingAs($this->user());
        $this->bread(['title' => 'Roggenbrot', 'tags' => 'herzhaft', 'rating' => 5, 'is_favorite' => true]);
        $this->bread(['title' => 'Apfelkuchen', 'notes' => 'Zimt nicht vergessen', 'rating' => 3,
            'groups' => [['name' => null, 'items' => [['quantity' => '3', 'unit' => '', 'name' => 'Äpfel']]]]]);

        $this->get('/rezepte?q=zimt')->assertSee('Apfelkuchen')->assertDontSee('Roggenbrot');      // Notizen
        $this->get('/rezepte?q=äpfel')->assertSee('Apfelkuchen')->assertDontSee('Roggenbrot');     // Zutaten
        $this->get('/rezepte?q=herzhaft')->assertSee('Roggenbrot')->assertDontSee('Apfelkuchen');  // Schlagwort
        $this->get('/rezepte?favoriten=1')->assertSee('Roggenbrot')->assertDontSee('Apfelkuchen');
        $this->get('/rezepte?bewertung=4')->assertSee('Roggenbrot')->assertDontSee('Apfelkuchen');
        $this->get('/rezepte?q=50%25')->assertOk();
        $resp = $this->get('/rezepte?sortierung=bewertung')->getContent();
        $this->assertLessThan(strpos($resp, 'Apfelkuchen'), strpos($resp, 'Roggenbrot'));
    }
}
