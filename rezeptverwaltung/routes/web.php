<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\BackupController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\HelperController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\ImportQueueController;
use App\Http\Controllers\PublicShareController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\RecipeImageController;
use App\Http\Controllers\RecipeShareController;
use App\Http\Controllers\RecipeTypeController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\ShoppingListController;
use App\Http\Controllers\ShoppingListItemController;
use App\Http\Controllers\TagController;
use Illuminate\Support\Facades\Route;

// Anmeldung (keine öffentliche Registrierung)
Route::middleware('guest')->group(function () {
    Route::get('/anmelden', [LoginController::class, 'show'])->name('login');
    Route::post('/anmelden', [LoginController::class, 'login'])->name('login.attempt');
});
Route::post('/abmelden', [LoginController::class, 'logout'])->middleware('auth')->name('logout');

// Öffentliche, ausdrücklich freigegebene Rezeptansicht (nur lesend)
Route::middleware('throttle:public')->group(function () {
    Route::get('/r/{token}', [PublicShareController::class, 'show'])->name('public.recipe');
    Route::get('/r/{token}/bild', [PublicShareController::class, 'image'])->name('public.image');
});

Route::middleware('auth')->group(function () {
    Route::redirect('/', '/rezepte');

    // Rezepte
    Route::get('/rezepte', [RecipeController::class, 'index'])->name('recipes.index');
    Route::get('/rezepte/neu', [RecipeController::class, 'create'])->name('recipes.create');
    Route::post('/rezepte', [RecipeController::class, 'store'])->middleware('throttle:uploads')->name('recipes.store');
    Route::get('/rezepte/{recipe}', [RecipeController::class, 'show'])->name('recipes.show');
    Route::get('/rezepte/{recipe}/bearbeiten', [RecipeController::class, 'edit'])->name('recipes.edit');
    Route::put('/rezepte/{recipe}', [RecipeController::class, 'update'])->middleware('throttle:uploads')->name('recipes.update');
    Route::delete('/rezepte/{recipe}', [RecipeController::class, 'destroy'])->name('recipes.destroy');
    Route::post('/rezepte/{recipe}/favorit', [RecipeController::class, 'toggleFavorite'])->name('recipes.favorite');
    Route::get('/rezepte/{recipe}/bild/{variant}', [RecipeImageController::class, 'show'])->whereIn('variant', ['anzeige', 'vorschau'])->name('recipes.image');

    // Teilen, Drucken, PDF, Freigaben
    Route::get('/rezepte/{recipe}/text', [RecipeShareController::class, 'text'])->name('recipes.text');
    Route::get('/rezepte/{recipe}/drucken', [RecipeShareController::class, 'print'])->name('recipes.print');
    Route::get('/rezepte/{recipe}/pdf', [RecipeShareController::class, 'pdf'])->name('recipes.pdf');
    Route::post('/rezepte/{recipe}/email', [RecipeShareController::class, 'mail'])->middleware('throttle:mail')->name('recipes.mail');
    Route::post('/rezepte/{recipe}/freigaben', [RecipeShareController::class, 'createLink'])->name('recipes.shares.store');
    Route::delete('/freigaben/{share}', [RecipeShareController::class, 'revokeLink'])->name('shares.destroy');

    // Hilfsfunktionen für Formulare
    Route::post('/markdown-vorschau', [HelperController::class, 'markdown'])->name('helpers.markdown');
    Route::post('/zutaten-analysieren', [HelperController::class, 'ingredients'])->name('helpers.ingredients');
    Route::get('/zwischenspeicher/{token}', [HelperController::class, 'pendingImage'])->name('helpers.pending-image');

    // Import
    Route::get('/import', [ImportController::class, 'index'])->name('import.index');
    Route::post('/import/url', [ImportController::class, 'fromUrl'])->middleware('throttle:import')->name('import.url');
    Route::post('/import/text', [ImportController::class, 'fromText'])->name('import.text');
    Route::get('/import/{key}/auswahl', [ImportController::class, 'choose'])->name('import.choose');
    Route::get('/import/{key}/vorschau/{index}', [ImportController::class, 'preview'])->whereNumber('index')->name('import.preview');
    Route::post('/import/warteschlange', [ImportQueueController::class, 'store'])->name('import.queue.store');
    Route::post('/import/warteschlange/verarbeiten', [ImportQueueController::class, 'process'])->middleware('throttle:import')->name('import.queue.process');
    Route::get('/import/warteschlange/{item}/pruefen', [ImportQueueController::class, 'review'])->name('import.queue.review');
    Route::delete('/import/warteschlange/{item}', [ImportQueueController::class, 'destroy'])->name('import.queue.destroy');
    Route::post('/import/warteschlange/aufraeumen', [ImportQueueController::class, 'clear'])->name('import.queue.clear');

    // Kategorien, Rezeptarten, Schlagwörter
    Route::get('/kategorien', [CategoryController::class, 'index'])->name('categories.index');
    Route::post('/kategorien', [CategoryController::class, 'store'])->name('categories.store');
    Route::put('/kategorien/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::post('/kategorien/{category}/position', [CategoryController::class, 'move'])->name('categories.move');
    Route::get('/kategorien/{category}/loeschen', [CategoryController::class, 'confirmDelete'])->name('categories.delete');
    Route::delete('/kategorien/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
    Route::post('/rezeptarten', [RecipeTypeController::class, 'store'])->name('types.store');
    Route::put('/rezeptarten/{type}', [RecipeTypeController::class, 'update'])->name('types.update');
    Route::delete('/rezeptarten/{type}', [RecipeTypeController::class, 'destroy'])->name('types.destroy');
    Route::put('/schlagwoerter/{tag}', [TagController::class, 'update'])->name('tags.update');
    Route::delete('/schlagwoerter/{tag}', [TagController::class, 'destroy'])->name('tags.destroy');

    // Einkaufslisten
    Route::get('/einkaufsliste', [ShoppingListController::class, 'current'])->name('shopping.current');
    Route::get('/einkaufsliste/rezepte-hinzufuegen', [ShoppingListController::class, 'selectRecipes'])->name('shopping.select');
    Route::post('/einkaufslisten', [ShoppingListController::class, 'store'])->name('shopping.store');
    Route::get('/einkaufslisten/{list}', [ShoppingListController::class, 'show'])->name('shopping.show');
    Route::put('/einkaufslisten/{list}', [ShoppingListController::class, 'update'])->name('shopping.update');
    Route::delete('/einkaufslisten/{list}', [ShoppingListController::class, 'destroy'])->name('shopping.destroy');
    Route::post('/einkaufslisten/{list}/rezepte', [ShoppingListController::class, 'addRecipe'])->name('shopping.add-recipe');
    Route::post('/einkaufslisten/{list}/mehrere-rezepte', [ShoppingListController::class, 'addRecipes'])->name('shopping.add-recipes');
    Route::put('/einkaufslisten/auswahl/{selection}', [ShoppingListController::class, 'updateSelection'])->name('shopping.selection.update');
    Route::delete('/einkaufslisten/auswahl/{selection}', [ShoppingListController::class, 'removeSelection'])->name('shopping.selection.destroy');
    Route::post('/einkaufslisten/{list}/erledigte-entfernen', [ShoppingListController::class, 'clearChecked'])->name('shopping.clear-checked');
    Route::post('/einkaufslisten/{list}/leeren', [ShoppingListController::class, 'clearAll'])->name('shopping.clear-all');
    Route::get('/einkaufslisten/{list}/text', [ShoppingListController::class, 'text'])->name('shopping.text');
    Route::get('/einkaufslisten/{list}/drucken', [ShoppingListController::class, 'print'])->name('shopping.print');
    Route::get('/einkaufslisten/{list}/pdf', [ShoppingListController::class, 'pdf'])->name('shopping.pdf');
    Route::post('/einkaufslisten/{list}/eintraege', [ShoppingListItemController::class, 'store'])->name('shopping.items.store');
    Route::put('/eintraege/{item}', [ShoppingListItemController::class, 'update'])->name('shopping.items.update');
    Route::patch('/eintraege/{item}/abhaken', [ShoppingListItemController::class, 'toggle'])->name('shopping.items.toggle');
    Route::delete('/eintraege/{item}', [ShoppingListItemController::class, 'destroy'])->name('shopping.items.destroy');

    // Einstellungen, Sicherung, Export
    Route::get('/einstellungen', [SettingsController::class, 'index'])->name('settings.index');
    Route::put('/einstellungen/konto', [SettingsController::class, 'updateAccount'])->name('settings.account');
    Route::put('/einstellungen/passwort', [SettingsController::class, 'updatePassword'])->name('settings.password');
    Route::put('/einstellungen/darstellung', [SettingsController::class, 'updateDisplay'])->name('settings.display');
    Route::put('/einstellungen/sicherung', [SettingsController::class, 'updateBackup'])->name('settings.backup');
    Route::get('/einstellungen/system', [SettingsController::class, 'system'])->name('settings.system');
    Route::post('/einstellungen/sicherungen', [BackupController::class, 'store'])->name('backups.store');
    Route::get('/einstellungen/sicherungen/{name}', [BackupController::class, 'download'])->name('backups.download');
    Route::delete('/einstellungen/sicherungen/{name}', [BackupController::class, 'destroy'])->name('backups.destroy');
    Route::post('/einstellungen/export', [ExportController::class, 'export'])->name('export.download');
    Route::post('/einstellungen/import', [ExportController::class, 'import'])->name('export.import');
});
