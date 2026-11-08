<?php

namespace App\Services\Shopping;

use App\Models\IngredientArea;

/** Ordnet Zutaten optional einem Einkaufsbereich zu (gemerkte Zuordnung vor Stichwortliste). */
final class AreaGuesser
{
    public const AREAS = [
        'Obst & Gemüse', 'Brot & Backwaren', 'Milch & Käse', 'Fleisch & Fisch', 'Backen', 'Vorrat & Konserven',
        'Gewürze & Öle', 'Tiefkühl', 'Getränke', 'Sonstiges',
    ];

    private const KEYWORDS = [
        'Obst & Gemüse' => ['apfel', 'äpfel', 'birne', 'banane', 'zitrone', 'limette', 'orange', 'beere', 'tomate', 'gurke', 'paprika', 'zwiebel', 'knoblauch', 'kartoffel', 'karotte', 'möhre', 'lauch', 'porree', 'sellerie', 'salat', 'spinat', 'zucchini', 'aubergine', 'kürbis', 'pilz', 'champignon', 'petersilie', 'schnittlauch', 'basilikum', 'dill', 'koriander', 'minze', 'rosmarin', 'thymian', 'ingwer', 'kohl', 'brokkoli', 'blumenkohl', 'avocado', 'mango', 'trauben', 'rhabarber', 'radieschen', 'rote bete', 'frühlingszwiebel', 'schalotte', 'chili'],
        'Brot & Backwaren' => ['brot', 'brötchen', 'toast', 'baguette', 'semmel', 'tortilla', 'wrap'],
        'Milch & Käse' => ['milch', 'butter', 'sahne', 'schmand', 'quark', 'joghurt', 'käse', 'parmesan', 'mozzarella', 'frischkäse', 'crème fraîche', 'creme fraiche', 'mascarpone', 'ricotta', 'buttermilch', 'ei', 'eier', 'eigelb', 'eiweiß'],
        'Fleisch & Fisch' => ['hähnchen', 'huhn', 'pute', 'rind', 'schwein', 'hackfleisch', 'speck', 'schinken', 'wurst', 'lachs', 'thunfisch', 'garnele', 'fisch', 'lamm', 'kalb', 'salami'],
        'Backen' => ['mehl', 'zucker', 'hefe', 'backpulver', 'natron', 'vanille', 'stärke', 'speisestärke', 'kakao', 'schokolade', 'kuvertüre', 'puderzucker', 'gelatine', 'sauerteig', 'roggen', 'dinkel', 'grieß', 'mandel', 'haselnuss', 'walnuss', 'rosine', 'backmalz'],
        'Vorrat & Konserven' => ['nudel', 'pasta', 'spaghetti', 'reis', 'linsen', 'bohnen', 'kichererbsen', 'dose', 'passata', 'tomatenmark', 'brühe', 'fond', 'honig', 'marmelade', 'haferflocken', 'couscous', 'bulgur', 'polenta', 'senf', 'ketchup', 'sojasauce', 'saaten', 'kerne'],
        'Gewürze & Öle' => ['salz', 'pfeffer', 'öl', 'essig', 'paprikapulver', 'curry', 'kreuzkümmel', 'kümmel', 'zimt', 'muskat', 'oregano', 'lorbeer', 'nelke', 'kardamom', 'anis', 'fenchelsamen', 'gewürz'],
        'Tiefkühl' => ['tiefkühl', 'tk-', 'erbsen tk', 'eis'],
        'Getränke' => ['wein', 'bier', 'saft', 'mineralwasser', 'sekt', 'rum', 'likör'],
    ];

    public static function key(string $name): string
    {
        return mb_substr(mb_strtolower(trim(preg_replace('/\s+/u', ' ', $name) ?? $name)), 0, 191);
    }

    public function guess(string $name): ?string
    {
        $key = self::key($name);
        $remembered = IngredientArea::query()->where('name_key', $key)->value('area');
        if ($remembered) {
            return $remembered;
        }
        $words = preg_split('/[\s,()-]+/u', $key) ?: [];
        foreach (self::KEYWORDS as $area => $keywords) {
            foreach ($keywords as $kw) {
                if (in_array($kw, $words, true)) {
                    return $area;
                }
            }
        }
        // Teilwortsuche (z. B. „Weizenmehl“), aber nur für Schlüsselwörter ab 4 Zeichen
        foreach (self::KEYWORDS as $area => $keywords) {
            foreach ($keywords as $kw) {
                if (mb_strlen($kw) >= 4 && str_contains($key, $kw)) {
                    return $area;
                }
            }
        }

        return null;
    }

    public function remember(string $name, ?string $area): void
    {
        $key = self::key($name);
        if ($area === null || $area === '') {
            IngredientArea::query()->where('name_key', $key)->delete();

            return;
        }
        IngredientArea::query()->updateOrCreate(['name_key' => $key], ['area' => $area]);
    }
}
