<?php

namespace Tests\Unit;

use App\Services\Http\IpGuard;
use App\Support\Duration;
use App\Support\IngredientParser;
use App\Support\Markdown;
use App\Support\Quantity;
use App\Support\Units;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

class QuantityAndParserTest extends TestCase
{
    public static function numbers(): array
    {
        return [
            ['1,5', 1.5], ['1.5', 1.5], ['1/2', 0.5], ['1 1/2', 1.5], ['½', 0.5], ['1½', 1.5], ['¾', 0.75],
            ['1.000', 1000.0], [',5', 0.5], ['abc', null], ['', null], ['1/0', null],
        ];
    }

    #[DataProvider('numbers')]
    public function test_dezimalkomma_und_brueche(string $in, ?float $expected): void
    {
        $this->assertSame($expected, Quantity::parseNumber($in));
    }

    public function test_bereiche(): void
    {
        $this->assertSame([2.0, 3.0], Quantity::parseRange('2-3'));
        $this->assertSame([2.0, 3.0], Quantity::parseRange('2–3'));
        $this->assertSame([0.5, 1.0], Quantity::parseRange('1/2 bis 1'));
    }

    public function test_zielmenge_muss_groesser_null_sein(): void
    {
        $this->assertNull(Quantity::parsePositive('0'));
        $this->assertNull(Quantity::parsePositive('-1'));
        $this->assertSame(1.5, Quantity::parsePositive('1,5'));
    }

    public function test_anzeigerundung_ohne_aufrunden(): void
    {
        $this->assertSame('750', Quantity::format(500 * 1.5, 'g'));
        $this->assertSame('525', Quantity::format(350 * 1.5, 'ml'));
        $this->assertSame('15', Quantity::format(10 * 1.5, 'g'));
        $this->assertSame('1,5', Quantity::format(1.5)); // 1,5 Eier bleiben 1,5
        $this->assertSame('0,33', Quantity::format(1 / 3));
        $this->assertSame('1.500', Quantity::format(1500, 'g'));
        $this->assertSame('0,0004', Quantity::format(0.0004));
    }

    public function test_zutatenzeilen(): void
    {
        $p = IngredientParser::parse('200 g Butter, zimmerwarm');
        $this->assertSame([200.0, 'g', 'Butter', 'zimmerwarm', true], [$p['quantity'], $p['unit'], $p['name'], $p['note'], $p['scalable']]);

        $p = IngredientParser::parse('Salz nach Geschmack');
        $this->assertNull($p['quantity']);
        $this->assertSame('Salz', $p['name']);
        $this->assertSame('nach Geschmack', $p['note']);
        $this->assertFalse($p['scalable']);

        $p = IngredientParser::parse('etwas Öl');
        $this->assertSame('etwas', $p['quantity_text']);
        $this->assertSame('Öl', $p['name']);

        $p = IngredientParser::parse('1½ TL Salz');
        $this->assertSame(1.5, $p['quantity']);
        $this->assertSame('TL', $p['unit']);

        $p = IngredientParser::parse('2-3 Eier');
        $this->assertSame([2.0, 3.0], [$p['quantity'], $p['quantity_max']]);

        $p = IngredientParser::parse('2 x 250 g Quark');
        $this->assertTrue($p['uncertain'], 'Nicht eindeutig zerlegbare Zeilen werden markiert');
        $this->assertSame('2 x 250 g Quark', $p['original_text']);

        $p = IngredientParser::parse('500 g Weizenmehl Type 550');
        $this->assertFalse($p['uncertain']);
    }

    public function test_gruppen_aus_text(): void
    {
        $g = IngredientParser::parseBlock("Vorteig:\n100 g Mehl\n\nHauptteig:\n400 g Mehl\nWasser nach Bedarf");
        $this->assertCount(2, $g);
        $this->assertSame('Vorteig', $g[0]['name']);
        $this->assertSame('Hauptteig', $g[1]['name']);
        $this->assertCount(2, $g[1]['items']);
    }

    public function test_einheiten_nur_innerhalb_derselben_dimension(): void
    {
        $this->assertSame('mass', Units::dimension('kg'));
        $this->assertSame('volume', Units::dimension('ml'));
        $this->assertNull(Units::dimension('EL'));
        $this->assertSame(1000.0, Units::toBase(1, 'kg'));
        $this->assertNotSame(Units::dimension('g'), Units::dimension('ml'));
    }

    public function test_zeitangaben(): void
    {
        $this->assertSame(90, Duration::parse('90'));
        $this->assertSame(90, Duration::parse('1:30'));
        $this->assertSame(90, Duration::parse('1 h 30 min'));
        $this->assertSame(90, Duration::parse('1,5 Std.'));
        $this->assertSame(75, Duration::parseIso('PT1H15M'));
        $this->assertSame('1 Std. 30 Min.', Duration::format(90));
    }

    public function test_markdown_ist_sicher(): void
    {
        $html = Markdown::toHtml("<script>alert(1)</script>\n\n[x](javascript:alert(1)) <img src=x onerror=alert(1)> **fett**");
        $this->assertStringNotContainsString('<script', $html);
        $this->assertStringNotContainsString('javascript:', $html);
        $this->assertStringNotContainsString('<img', $html);
        $this->assertStringContainsString('<strong>fett</strong>', $html);
    }

    public function test_interne_adressen_werden_erkannt(): void
    {
        foreach (['127.0.0.1', '10.1.2.3', '192.168.0.1', '172.16.5.4', '169.254.169.254', '100.64.0.1', '0.0.0.0', '::1', 'fe80::1', 'fd00::1', '::ffff:127.0.0.1'] as $ip) {
            $this->assertFalse(IpGuard::isPublic($ip), $ip);
        }
        $this->assertTrue(IpGuard::isPublic('93.184.216.34'));
        $this->assertTrue(IpGuard::isPublic('2606:2800:220:1:248:1893:25c8:1946'));
    }
}
