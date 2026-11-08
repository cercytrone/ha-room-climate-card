<?php

namespace Tests\Feature;

use App\Models\ImportQueueItem;
use App\Models\Recipe;
use App\Services\Http\HostResolver;
use App\Services\Http\Transport;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Support\FakeHttp;
use Tests\Support\FakeResolver;
use Tests\TestCase;

class ImportTest extends TestCase
{
    use RefreshDatabase;

    private FakeHttp $http;

    private FakeResolver $dns;

    protected function setUp(): void
    {
        parent::setUp();
        $this->http = new FakeHttp;
        $this->dns = new FakeResolver;
        $this->app->instance(Transport::class, $this->http);
        $this->app->instance(HostResolver::class, $this->dns);
        $this->actingAs($this->user());
    }

    private function recipeJson(array $extra = []): array
    {
        return array_merge([
            '@context' => 'https://schema.org',
            '@type' => 'Recipe',
            'name' => 'Schnelles Weißbrot &amp; mehr',
            'description' => 'Ein <b>einfaches</b> Brot.',
            'image' => ['https://img.example.com/brot.jpg'],
            'author' => ['@type' => 'Person', 'name' => 'Erika Muster'],
            'recipeYield' => ['1', '1 Brot'],
            'prepTime' => 'PT15M',
            'cookTime' => 'PT45M',
            'totalTime' => 'PT13H',
            'recipeCategory' => 'Brot',
            'keywords' => 'einfach, Hefe',
            'recipeIngredient' => ['500 g Weizenmehl', '350 ml Wasser', '1 TL Salz', '2 x 250 g Quark', 'Öl nach Bedarf'],
            'recipeInstructions' => [
                ['@type' => 'HowToSection', 'name' => 'Teig', 'itemListElement' => [['@type' => 'HowToStep', 'text' => 'Alles mischen.'], ['@type' => 'HowToStep', 'text' => 'Gehen lassen.']]],
                ['@type' => 'HowToStep', 'text' => 'Backen.'],
            ],
            'nutrition' => ['@type' => 'NutritionInformation', 'calories' => '250 kcal', 'fatContent' => '2,5 g'],
        ], $extra);
    }

    private function page(array ...$recipes): string
    {
        $ld = count($recipes) === 1 ? $recipes[0] : ['@context' => 'https://schema.org', '@graph' => $recipes];

        return '<html><head><title>x</title><script type="application/ld+json">'.json_encode($ld).'</script></head><body>Text</body></html>';
    }

    public function test_import_mit_bearbeitbarer_vorschau_und_speichern(): void
    {
        $url = 'https://www.example.com/rezept/brot';
        $this->http->html($url, $this->page($this->recipeJson()));
        $img = file_get_contents($this->jpeg(640, 480));
        $this->http->responses['https://img.example.com/brot.jpg'] = ['status' => 200, 'headers' => ['content-type' => 'image/jpeg'], 'body' => $img];

        $resp = $this->post('/import/url', ['url' => $url]);
        $resp->assertRedirectContains('/vorschau/0');
        $preview = $this->get($resp->headers->get('Location'))->assertOk();
        $preview->assertSee('Vorschau – noch nicht gespeichert')
            ->assertSee('Schnelles Weißbrot & mehr')
            ->assertSee('Erika Muster')
            ->assertSee('Weizenmehl')
            ->assertSee('1 Zutat konnte nicht sicher zerlegt werden')
            ->assertSee('Die Quelle nennt keine Bezugsgröße')
            ->assertSee('Ruhe- oder Gehzeit')
            ->assertSee('Bild der Quelle wird übernommen');
        $this->assertSame(0, Recipe::count(), 'Vor Bestätigung wird nichts gespeichert');

        preg_match('/name="pending_cover" value="([A-Za-z0-9]{40})"/', $preview->getContent(), $m);
        $this->post('/rezepte', [
            'title' => 'Schnelles Weißbrot', 'yield_quantity' => '1', 'yield_unit' => 'Brot', 'source_url' => $url,
            'groups' => [['name' => null, 'items' => [['quantity' => '500', 'unit' => 'g', 'name' => 'Weizenmehl', 'original_text' => '500 g Weizenmehl']]]],
            'pending_cover' => $m[1],
        ])->assertRedirect();
        $recipe = Recipe::first();
        $this->assertNotNull($recipe->image);
        $this->assertSame('https://img.example.com/brot.jpg', $recipe->image->source_url);

        // Dublettenhinweis beim erneuten Import
        $resp = $this->post('/import/url', ['url' => $url.'?utm_source=x']);
        $this->http->html($url.'?utm_source=x', $this->page($this->recipeJson()));
        $resp = $this->post('/import/url', ['url' => $url.'?utm_source=x']);
        $this->get($resp->headers->get('Location'))->assertSee('Mögliche Dublette');
    }

    public function test_mehrere_rezepte_auswahl(): void
    {
        $url = 'https://example.com/zwei';
        $this->http->html($url, $this->page($this->recipeJson(['name' => 'Eins']), $this->recipeJson(['name' => 'Zwei', 'image' => null])));
        $resp = $this->post('/import/url', ['url' => $url]);
        $resp->assertRedirectContains('/auswahl');
        $this->get($resp->headers->get('Location'))->assertSee('Eins')->assertSee('Zwei')->assertSee('Mehrere Rezepte gefunden');
    }

    public function test_nicht_unterstuetzte_seite_wird_verstaendlich_erklaert(): void
    {
        $url = 'https://example.com/blog';
        $this->http->html($url, '<html><body><h1>Mein Kuchen</h1><p>Zutaten: ...</p></body></html>');
        $this->from('/import')->post('/import/url', ['url' => $url])
            ->assertRedirect('/import')
            ->assertSessionHas('import_error', fn ($m) => str_contains($m, 'keine strukturierten Rezeptdaten') && str_contains($m, 'Text einfügen'));
        $this->assertSame($url, session()->getOldInput('url'));

        $this->http->html('https://example.com/paywall', 'nope', 403);
        $this->post('/import/url', ['url' => 'https://example.com/paywall'])->assertSessionHas('import_error', fn ($m) => str_contains($m, 'Bezahlschranken'));
    }

    public function test_ssrf_schutz_auch_nach_weiterleitung(): void
    {
        $this->dns->map['intern.example.com'] = ['10.0.0.5'];
        $this->post('/import/url', ['url' => 'https://intern.example.com/x'])->assertSessionHas('import_error', fn ($m) => str_contains($m, 'Interne oder reservierte'));
        $this->post('/import/url', ['url' => 'http://127.0.0.1/admin'])->assertSessionHas('import_error', fn ($m) => str_contains($m, 'Interne oder reservierte'));
        $this->post('/import/url', ['url' => 'http://localhost/'])->assertSessionHas('import_error');
        $this->post('/import/url', ['url' => 'file:///etc/passwd'])->assertSessionHas('import_error');
        $this->post('/import/url', ['url' => 'https://example.com:8080/x'])->assertSessionHas('import_error', fn ($m) => str_contains($m, 'Port'));

        // Öffentliche Seite leitet auf Metadatendienst weiter -> blockiert, Ziel wird nie abgerufen
        $this->http->responses['https://example.com/weiter'] = ['status' => 302, 'headers' => ['location' => 'http://169.254.169.254/latest/meta-data'], 'body' => ''];
        $this->post('/import/url', ['url' => 'https://example.com/weiter'])->assertSessionHas('import_error', fn ($m) => str_contains($m, 'Interne oder reservierte'));
        $this->assertNotContains('http://169.254.169.254/latest/meta-data', array_column($this->http->requests, 'url'));
        // Verbindung erfolgt nur zur geprüften IP
        foreach ($this->http->requests as $r) {
            $this->assertSame('93.184.216.34', $r['ip']);
        }
    }

    public function test_weiterleitungen_sind_begrenzt(): void
    {
        for ($i = 0; $i < 10; $i++) {
            $this->http->responses["https://example.com/r$i"] = ['status' => 301, 'headers' => ['location' => '/r'.($i + 1)], 'body' => ''];
        }
        $this->post('/import/url', ['url' => 'https://example.com/r0'])->assertSessionHas('import_error', fn ($m) => str_contains($m, 'Zu viele Weiterleitungen'));
    }

    public function test_zu_grosse_antwort(): void
    {
        config(['rezepte.import.max_html_bytes' => 100]);
        $this->http->html('https://example.com/gross', str_repeat('x', 500));
        $this->post('/import/url', ['url' => 'https://example.com/gross'])->assertSessionHas('import_error', fn ($m) => str_contains($m, 'zu groß'));
    }

    public function test_text_einfuegen(): void
    {
        $text = "Omas Apfelkuchen\nFür 12 Stück\nBackzeit: 45 Min.\n\nZutaten\nFür den Teig:\n250 g Mehl\n125 g Butter\nBelag:\n1 kg Äpfel\nZimt nach Geschmack\n\nZubereitung\n1. Teig kneten.\n2. Äpfel schälen.\n3. Backen.";
        $resp = $this->post('/import/text', ['text' => $text]);
        $this->get($resp->headers->get('Location'))->assertOk()
            ->assertSee('Omas Apfelkuchen')->assertSee('Für den Teig', false)->assertSee('Äpfel schälen.')->assertSee('value="12"', false)
            ->assertSee('value="45"', false);
    }

    public function test_warteschlange_verarbeitet_zeitlich_begrenzt(): void
    {
        $this->http->html('https://example.com/a', $this->page($this->recipeJson(['image' => null])));
        $this->post('/import/warteschlange', ['urls' => "https://example.com/a\nhttps://example.com/fehlt\nkein-link"])->assertSessionHasNoErrors();
        $this->artisan('rezepte:import-verarbeiten', ['--max-seconds' => 120])->assertSuccessful();
        $items = ImportQueueItem::orderBy('id')->get();
        $this->assertSame('ready', $items[0]->status);
        $this->assertSame('failed', $items[1]->status);
        $this->get(route('import.queue.review', $items[0]))->assertOk()->assertSee('Vorschau – noch nicht gespeichert');
        $this->post('/rezepte', ['title' => 'Q', 'yield_quantity' => '1', 'yield_unit' => 'Brot', 'import_queue_item_id' => $items[0]->id]);
        $this->assertSame('saved', $items[0]->fresh()->status);
    }
}
