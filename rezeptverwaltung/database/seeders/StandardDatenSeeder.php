<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\RecipeType;
use Illuminate\Database\Seeder;

/**
 * Optionale Startstruktur: übliche Rezeptarten und eine Beispiel-Kategorienhierarchie.
 * Legt nur an, was noch fehlt. Aufruf: php artisan db:seed --class=StandardDatenSeeder --force
 */
class StandardDatenSeeder extends Seeder
{
    public function run(): void
    {
        foreach (['Brot', 'Brötchen', 'Hauptgericht', 'Beilage', 'Vorspeise', 'Salat', 'Suppe', 'Dessert', 'Kuchen & Torten', 'Gebäck', 'Frühstück', 'Snack', 'Getränk', 'Sauce & Dip', 'Eingemachtes'] as $i => $name) {
            RecipeType::query()->firstOrCreate(['name' => $name], ['sort_order' => $i + 1]);
        }
        $tree = [
            'Brot' => ['No Knead', 'Küchenmaschine', 'Sauerteig'],
            'Hauptgerichte' => ['Vegetarisch', 'Pasta'],
            'Desserts' => ['Kuchen', 'Cremes'],
        ];
        $i = 0;
        foreach ($tree as $parent => $children) {
            $p = Category::query()->firstOrCreate(['parent_id' => null, 'name' => $parent], ['sort_order' => ++$i]);
            foreach ($children as $j => $child) {
                Category::query()->firstOrCreate(['parent_id' => $p->id, 'name' => $child], ['sort_order' => $j + 1]);
            }
        }
    }
}
