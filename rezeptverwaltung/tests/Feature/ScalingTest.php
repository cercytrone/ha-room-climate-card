<?php

namespace Tests\Feature;

use App\Models\Ingredient;
use App\Models\RecipeNutrition;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ScalingTest extends TestCase
{
    use RefreshDatabase;

    public function test_skalierung_von_1_auf_1_5_brote(): void
    {
        $this->actingAs($this->user());
        $r = $this->bread();
        $html = $this->get(route('recipes.show', [$r, 'menge' => '1,5']))->assertOk()->getContent();
        foreach (['>750<', '>525<', '>15<', '>1,5<'] as $needle) {
            $this->assertStringContainsString($needle, $html);
        }
        $this->assertStringContainsString('nach Geschmack', $html);

        // Originalwerte unverändert gespeichert
        $this->assertSame(500.0, Ingredient::where('name', 'Mehl')->first()->quantity);
        $this->assertSame(1.0, $r->fresh()->yield_quantity);
    }

    public function test_brueche_als_zielmenge_und_ungueltige_werte(): void
    {
        $this->actingAs($this->user());
        $r = $this->bread();
        $this->get(route('recipes.show', [$r, 'menge' => '1/2']))->assertSee('>250<', false);
        // 0 oder Unsinn -> Originalmenge
        $this->get(route('recipes.show', [$r, 'menge' => '0']))->assertSee('>500<', false);
        $this->get(route('recipes.show', [$r, 'menge' => 'abc']))->assertSee('>500<', false);
    }

    public function test_druck_und_text_uebernehmen_zielmenge(): void
    {
        $this->actingAs($this->user());
        $r = $this->bread();
        $text = $this->get(route('recipes.text', [$r, 'menge' => '1,5']))->getContent();
        $this->assertStringContainsString('750 g Mehl', $text);
        $this->assertStringContainsString('1,5 Ei', $text);
        $this->assertStringContainsString('Salz nach Geschmack', $text);
        $this->assertStringContainsString('Original: 1 Brote', $text);
        $this->get(route('recipes.print', [$r, 'menge' => '1,5']))->assertSee('750 g');
    }

    public function test_naehrwerte_beachten_ihre_bezugsgroesse(): void
    {
        $r = $this->bread();
        $n = RecipeNutrition::create(['recipe_id' => $r->id, 'basis' => '100g', 'energy_kcal' => 250, 'salt' => 1.2]);
        $p = $n->present(1.5);
        $this->assertSame('250', $p['rows'][0]['value'], 'pro 100 g bleibt unverändert');
        $this->assertFalse($p['scaled']);

        $n->update(['basis' => 'serving']);
        $this->assertSame('250', $n->fresh()->present(3)['rows'][0]['value'], 'pro Portion bleibt unverändert');

        $n->update(['basis' => 'recipe']);
        $p = $n->fresh()->present(1.5);
        $this->assertSame('375', $p['rows'][0]['value'], 'gesamtes Rezept wird umgerechnet');
        $this->assertTrue($p['scaled']);

        $this->actingAs($this->user());
        $n->update(['basis' => '100g']);
        $this->get(route('recipes.show', [$r, 'menge' => '2']))->assertSee('pro 100 g')->assertSee('unabhängig von der Rezeptmenge');
    }

    public function test_nicht_skalierbare_menge_bleibt(): void
    {
        $this->actingAs($this->user());
        $r = $this->bread(['groups' => [['name' => null, 'items' => [['quantity' => '1', 'unit' => 'Prise', 'name' => 'Muskat', 'scalable' => false]]]]]);
        $this->assertStringContainsString('1 Prise Muskat', $this->get(route('recipes.text', [$r, 'menge' => '3']))->getContent());
    }
}
