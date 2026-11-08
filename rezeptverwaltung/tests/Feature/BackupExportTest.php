<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Recipe;
use App\Models\RecipeImage;
use App\Models\RecipeType;
use App\Models\User;
use App\Services\Backup\BackupService;
use App\Services\Export\CollectionExporter;
use App\Services\Images\ImageService;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class BackupExportTest extends TestCase
{
    use DatabaseMigrations; // Wiederherstellung enthält DDL, daher keine Transaktion

    public function test_vollstaendige_sicherung_und_wiederherstellung_inklusive_bildern(): void
    {
        $this->actingAs($this->user());
        $r = $this->bread(['title' => 'Zwiebelkuchen „Spezial“', 'notes' => "Zeile 1\nZeile 2 mit 'Anführung' und \\Backslash"]);
        app(ImageService::class)->attachToRecipe($r, $this->jpeg());
        $imagePath = $r->image->path;
        $imageBytes = Storage::disk('local')->get($imagePath);

        $this->artisan('rezepte:sicherung')->assertSuccessful();
        $backups = app(BackupService::class)->list();
        $this->assertCount(1, $backups);
        $this->assertDatabaseHas('task_runs', ['task' => 'sicherung', 'status' => 'success']);

        // Alles „verlieren“
        $r->delete();
        DB::table('users')->delete();
        $this->assertSame(0, Recipe::count());
        Storage::disk('local')->assertMissing($imagePath);

        $this->artisan('rezepte:sicherung-wiederherstellen', ['datei' => $backups[0]['name'], '--force' => true])->assertSuccessful();

        $restored = Recipe::first();
        $this->assertSame('Zwiebelkuchen „Spezial“', $restored->title);
        $this->assertSame("Zeile 1\nZeile 2 mit 'Anführung' und \\Backslash", $restored->notes);
        $this->assertSame(5, $restored->ingredients()->count());
        $this->assertSame($imageBytes, Storage::disk('local')->get(RecipeImage::first()->path));
        $this->assertSame(1, User::count());
    }

    public function test_aufbewahrung_alter_sicherungen(): void
    {
        $svc = app(BackupService::class);
        $dir = $svc->directory();
        foreach (['2026-01-01_030000', '2026-01-02_030000', '2026-01-03_030000', '2026-01-04_030000'] as $i => $d) {
            file_put_contents("$dir/sicherung-$d.zip", 'x');
            touch("$dir/sicherung-$d.zip", time() - (4 - $i) * 86400);
        }
        $deleted = $svc->prune(2, 0);
        $this->assertCount(2, $deleted);
        $this->assertCount(2, $svc->list());
        $deleted = $svc->prune(10, 1); // älter als 1 Tag – neueste bleibt trotzdem
        $this->assertCount(1, $svc->list());
    }

    public function test_sicherungen_und_exporte_nur_angemeldet_und_nicht_oeffentlich(): void
    {
        $this->actingAs($this->user());
        $this->post(route('backups.store'))->assertSessionHas('status');
        $name = app(BackupService::class)->list()[0]['name'];
        $this->get(route('backups.download', $name))->assertOk();
        $this->get(route('backups.download', '../../.env'))->assertNotFound();
        auth()->logout();
        $this->get(route('backups.download', $name))->assertRedirect('/anmelden');
        $this->post(route('export.download'))->assertRedirect('/anmelden');
        // Private Dateien liegen außerhalb von public/
        $this->assertStringStartsNotWith(public_path(), Storage::disk('local')->path(''));
        $this->assertFileDoesNotExist(public_path('storage'));
        $this->assertFileDoesNotExist(public_path('.env'));
    }

    public function test_export_und_wiederimport_mit_bildern_und_beziehungen(): void
    {
        $user = $this->user();
        $this->actingAs($user);
        $cat = Category::create(['name' => 'Brot']);
        $sub = Category::create(['name' => 'Sauerteig', 'parent_id' => $cat->id]);
        $type = RecipeType::create(['name' => 'Brot']);
        $r = $this->bread(['categories' => [$sub->id], 'recipe_type_id' => $type->id, 'tags' => 'rustikal', 'source_url' => 'https://example.com/brot',
            'nutrition' => ['basis' => '100g', 'energy_kcal' => 240]]);
        app(ImageService::class)->attachToRecipe($r, $this->jpeg());

        $path = app(CollectionExporter::class)->export($user, includeNotes: false);
        $zip = new \ZipArchive;
        $zip->open($path);
        $json = json_decode($zip->getFromName('rezepte.json'), true);
        $zip->close();
        $this->assertSame(['Brot', 'Sauerteig'], $json['recipes'][0]['categories'][0]);
        $this->assertNull($json['recipes'][0]['notes']);
        $this->assertSame(500.0, $json['recipes'][0]['ingredient_groups'][0]['items'][0]['quantity']);

        // Leere Installation simulieren
        Recipe::query()->each(fn ($x) => $x->delete());
        Category::query()->whereNotNull('parent_id')->delete();
        Category::query()->delete();
        RecipeType::query()->delete();

        $file = new UploadedFile($path, 'export.zip', 'application/zip', null, true);
        $this->post(route('export.import'), ['file' => $file, 'skip_duplicates' => '1'])->assertSessionHas('status', '1 Rezept(e) importiert, 0 übersprungen.');
        $imp = Recipe::first();
        $this->assertSame('Bauernbrot', $imp->title);
        $this->assertSame('Brot › Sauerteig', $imp->categories->first()->pathName());
        $this->assertSame('Brot', $imp->type->name);
        $this->assertSame(['rustikal'], $imp->tags->pluck('name')->all());
        $this->assertSame(240.0, $imp->nutrition->energy_kcal);
        $this->assertNotNull($imp->image);
        Storage::disk('local')->assertExists($imp->image->thumb_path);

        // Dubletten werden übersprungen
        $path2 = app(CollectionExporter::class)->export($user);
        $this->post(route('export.import'), ['file' => new UploadedFile($path2, 'e.zip', 'application/zip', null, true), 'skip_duplicates' => '1'])
            ->assertSessionHas('status', '0 Rezept(e) importiert, 1 übersprungen.');
    }
}
