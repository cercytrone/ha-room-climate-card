<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Recipe;
use App\Models\RecipeType;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    use RefreshDatabase;

    private function tree(): array
    {
        $brot = Category::create(['name' => 'Brot']);
        $sauer = Category::create(['name' => 'Sauerteig', 'parent_id' => $brot->id]);
        $roggen = Category::create(['name' => 'Roggen', 'parent_id' => $sauer->id]);
        $nk = Category::create(['name' => 'No Knead', 'parent_id' => $brot->id]);

        return compact('brot', 'sauer', 'roggen', 'nk');
    }

    public function test_filter_beruecksichtigt_unterkategorien(): void
    {
        $this->actingAs($this->user());
        $c = $this->tree();
        $this->bread(['title' => 'Roggensauer', 'categories' => [$c['roggen']->id]]);
        $this->bread(['title' => 'Faulenzerbrot', 'categories' => [$c['nk']->id]]);
        $this->bread(['title' => 'Pasta']);

        $this->get('/rezepte?kategorie='.$c['brot']->id)->assertSee('Roggensauer')->assertSee('Faulenzerbrot')->assertDontSee('>Pasta<', false);
        $this->get('/rezepte?kategorie='.$c['sauer']->id)->assertSee('Roggensauer')->assertDontSee('Faulenzerbrot');
        $this->get('/kategorien')->assertOk()->assertSee('Sauerteig');
    }

    public function test_anlegen_umbenennen_verschieben(): void
    {
        $this->actingAs($this->user());
        $c = $this->tree();
        $this->post('/kategorien', ['name' => 'Desserts'])->assertSessionHasNoErrors();
        $this->post('/kategorien', ['name' => 'Sauerteig', 'parent_id' => $c['brot']->id])->assertSessionHasErrors('name');
        $desserts = Category::where('name', 'Desserts')->first();
        $this->put(route('categories.update', $c['nk']), ['name' => 'Ohne Kneten', 'parent_id' => $desserts->id]);
        $this->assertSame($desserts->id, $c['nk']->fresh()->parent_id);
        $this->assertSame('Ohne Kneten', $c['nk']->fresh()->name);
        // Nicht in eigene Unterkategorie verschieben
        $this->put(route('categories.update', $c['brot']), ['name' => 'Brot', 'parent_id' => $c['roggen']->id])->assertSessionHasErrors('parent_id');
        $this->assertNull($c['brot']->fresh()->parent_id);
    }

    public function test_loeschen_verschiebt_unterkategorien_und_behaelt_rezepte(): void
    {
        $this->actingAs($this->user());
        $c = $this->tree();
        $r = $this->bread(['categories' => [$c['sauer']->id]]);
        $this->get(route('categories.delete', $c['sauer']))->assertOk()->assertSee('Rezepte werden nie gelöscht');
        $this->delete(route('categories.destroy', $c['sauer']), ['children' => 'move_up', 'reassign' => '1'])->assertRedirect('/kategorien');
        $this->assertNull(Category::find($c['sauer']->id));
        $this->assertSame($c['brot']->id, $c['roggen']->fresh()->parent_id);
        $this->assertTrue(Recipe::whereKey($r->id)->exists());
        $this->assertSame([$c['brot']->id], $r->fresh()->categories->pluck('id')->all());
    }

    public function test_loeschen_mit_unterkategorien(): void
    {
        $this->actingAs($this->user());
        $c = $this->tree();
        $r = $this->bread(['categories' => [$c['roggen']->id]]);
        $this->delete(route('categories.destroy', $c['brot']), ['children' => 'delete']);
        $this->assertSame(0, Category::count());
        $this->assertTrue(Recipe::whereKey($r->id)->exists());
        $this->assertCount(0, $r->fresh()->categories);
    }

    public function test_rezeptart_loeschen_behaelt_rezepte(): void
    {
        $this->actingAs($this->user());
        $type = RecipeType::create(['name' => 'Brot']);
        $r = $this->bread(['recipe_type_id' => $type->id]);
        $this->delete(route('types.destroy', $type));
        $this->assertNull($r->fresh()->recipe_type_id);
    }
}
