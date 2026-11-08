<?php

namespace Tests\Feature;

use App\Models\Ingredient;
use App\Models\ShoppingList;
use App\Models\ShoppingListItem;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ShoppingListTest extends TestCase
{
    use RefreshDatabase;

    public function test_mehrere_rezepte_mit_zielmengen_und_zusammenfuehrung(): void
    {
        $user = $this->user();
        $this->actingAs($user);
        $brot = $this->bread(); // 1 Brot: 500 g Mehl, 350 ml Wasser, 10 g Salz, 1 Ei
        $kuchen = $this->bread(['title' => 'Kuchen', 'yield_quantity' => 12, 'yield_unit' => 'Stück', 'groups' => [['name' => null, 'items' => [
            ['quantity' => '1', 'unit' => 'kg', 'name' => 'Mehl'],
            ['quantity' => '200', 'unit' => 'g', 'name' => 'Wasser'],
            ['quantity' => '2', 'unit' => 'EL', 'name' => 'Zucker'],
        ]]]]);
        $list = ShoppingList::defaultFor($user);

        $this->post(route('shopping.add-recipes', $list), [
            'existing' => 'update',
            'items' => [
                ['recipe_id' => $brot->id, 'target' => '1', 'include' => '1'],
                ['recipe_id' => $kuchen->id, 'target' => '12', 'include' => '1'],
            ],
        ])->assertRedirect(route('shopping.show', $list));

        $mehl = ShoppingListItem::where('name', 'Mehl')->get();
        $this->assertCount(1, $mehl, '500 g und 1 kg Mehl werden zusammengeführt');
        $this->assertSame(1.5, $mehl[0]->quantity);
        $this->assertSame('kg', $mehl[0]->unit);

        $wasser = ShoppingListItem::where('name', 'Wasser')->get();
        $this->assertCount(2, $wasser, 'g und ml werden nicht zusammengeführt');
        foreach ($wasser as $w) {
            $this->assertStringContainsString('nicht automatisch zusammengeführt', $w->review_reason);
        }
        $this->get(route('shopping.show', $list))->assertSee('1,5 kg')->assertSee('prüfen')->assertSee('für: Bauernbrot, Kuchen');

        // Änderungen an der Liste ändern keine Rezepte
        $this->put(route('shopping.items.update', $mehl[0]), ['name' => 'Mehl Type 550', 'quantity' => '2']);
        $this->assertSame(500.0, Ingredient::where('recipe_id', $brot->id)->where('name', 'Mehl')->first()->quantity);
    }

    public function test_erneut_hinzufuegen_fragt_nach_und_aktualisiert_oder_ergaenzt(): void
    {
        $user = $this->user();
        $this->actingAs($user);
        $brot = $this->bread();
        $list = ShoppingList::defaultFor($user);
        $this->post(route('shopping.add-recipe', $list), ['recipe_id' => $brot->id, 'target' => '1,5']);
        $this->assertSame(750.0, ShoppingListItem::where('name', 'Mehl')->first()->quantity);

        $this->post(route('shopping.add-recipe', $list), ['recipe_id' => $brot->id, 'target' => '2'])
            ->assertOk()->assertSee('bereits auf der Liste')->assertSee('Vorhandene Auswahl aktualisieren')->assertSee('Zusätzlich aufnehmen');

        $this->post(route('shopping.add-recipe', $list), ['recipe_id' => $brot->id, 'target' => '2', 'mode' => 'update']);
        $this->assertSame(1, $list->selections()->count());
        $this->assertSame(1.0, ShoppingListItem::where('name', 'Mehl')->first()->quantity); // 1 kg
        $this->assertSame('kg', ShoppingListItem::where('name', 'Mehl')->first()->unit);

        $this->post(route('shopping.add-recipe', $list), ['recipe_id' => $brot->id, 'target' => '1', 'mode' => 'add']);
        $this->assertSame(2, $list->selections()->count());
        $this->assertSame(1.5, ShoppingListItem::where('name', 'Mehl')->first()->quantity);

        // Auswahl entfernen rechnet zurück
        $this->delete(route('shopping.selection.destroy', $list->selections()->reorder()->latest('id')->first()));
        $this->assertSame(1.0, ShoppingListItem::where('name', 'Mehl')->first()->quantity);
        $this->post(route('shopping.add-recipe', $list), ['recipe_id' => $brot->id, 'target' => '0'])->assertSessionHasErrors('target');
    }

    public function test_abhaken_manuelle_eintraege_und_teilen(): void
    {
        $user = $this->user();
        $this->actingAs($user);
        $list = ShoppingList::defaultFor($user);
        $this->post(route('shopping.items.store', $list), ['name' => 'Milch', 'quantity' => '1,5', 'unit' => 'l']);
        $item = ShoppingListItem::first();
        $this->assertSame(1.5, $item->quantity);
        $this->assertSame('Milch & Käse', $item->area);
        $this->patchJson(route('shopping.items.toggle', $item), ['checked' => true])->assertJson(['checked' => true]);
        $this->assertTrue($item->fresh()->is_checked);

        $this->post(route('shopping.items.store', $list), ['name' => 'Brot']);
        $text = $this->get(route('shopping.text', $list))->getContent();
        $this->assertStringContainsString('Brot', $text);
        $this->assertStringNotContainsString('Milch', $text, 'Abgehakte Einträge werden nicht geteilt');

        $this->get(route('shopping.print', $list))->assertOk();
        $pdf = $this->get(route('shopping.pdf', $list));
        $pdf->assertOk()->assertHeader('Content-Type', 'application/pdf');
        $this->assertStringStartsWith('%PDF', $pdf->getContent());

        $this->post(route('shopping.clear-checked', $list));
        $this->assertSame(1, $list->items()->count());
    }

    public function test_fremde_listen_geschuetzt(): void
    {
        $list = ShoppingList::defaultFor($this->user());
        $other = User::create(['name' => 'B', 'email' => 'b@example.org', 'password' => 'anderes-passwort']);
        $this->actingAs($other)->get(route('shopping.show', $list))->assertForbidden();
    }
}
