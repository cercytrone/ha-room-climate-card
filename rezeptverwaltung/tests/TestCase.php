<?php

namespace Tests;

use App\Models\Recipe;
use App\Models\Setting;
use App\Models\User;
use App\Services\RecipeSaver;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        // Privater Speicher in ein Testverzeichnis umleiten
        $root = storage_path('framework/testing/private-'.getmypid());
        config(['filesystems.disks.local.root' => $root]);
        Storage::forgetDisk('local');
        Setting::flushCache();
    }

    protected function tearDown(): void
    {
        File::deleteDirectory(storage_path('framework/testing/private-'.getmypid()));
        parent::tearDown();
    }

    protected function user(): User
    {
        return User::query()->first() ?? User::create(['name' => 'Test', 'email' => 'koch@example.org', 'password' => 'geheimes-passwort']);
    }

    /** Standard-Testrezept: 1 Brot mit 500 g Mehl, 350 ml Wasser, 10 g Salz, 1 Ei, Salz nach Geschmack. */
    protected function bread(array $overrides = []): Recipe
    {
        $data = array_replace([
            'title' => 'Bauernbrot',
            'yield_quantity' => 1,
            'yield_unit' => 'Brote',
            'groups' => [[
                'name' => 'Teig',
                'items' => [
                    ['quantity' => '500', 'unit' => 'g', 'name' => 'Mehl'],
                    ['quantity' => '350', 'unit' => 'ml', 'name' => 'Wasser'],
                    ['quantity' => '10', 'unit' => 'g', 'name' => 'Salz'],
                    ['quantity' => '1', 'unit' => '', 'name' => 'Ei'],
                    ['quantity' => '', 'unit' => '', 'name' => 'Salz', 'note' => 'nach Geschmack'],
                ],
            ]],
            'steps' => [['body' => 'Alles verkneten.'], ['body' => 'Backen.']],
            'notes' => 'Geheimtipp: mehr Wasser',
        ], $overrides);

        return app(RecipeSaver::class)->save($this->user(), $data);
    }

    /** Erzeugt ein echtes JPEG für Upload-Tests. */
    protected function jpeg(int $w = 800, int $h = 600): string
    {
        $img = imagecreatetruecolor($w, $h);
        imagefill($img, 0, 0, imagecolorallocate($img, 200, 120, 40));
        $path = tempnam(sys_get_temp_dir(), 'img').'.jpg';
        imagejpeg($img, $path, 80);

        return $path;
    }
}
