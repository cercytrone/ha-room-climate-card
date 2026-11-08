<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Kernschema der Rezeptverwaltung.
 *
 * Löschregeln (siehe docs/DATENMODELL.md):
 * - Rezept gelöscht  => Zutatengruppen, Zutaten, Schritte, Nährwerte, Bild-Metadaten,
 *   Freigaben, Kategorie- und Schlagwortzuordnungen werden mitgelöscht (CASCADE).
 *   Bilddateien entfernt das Model-Event. Einkaufslisten behalten ihre Einträge,
 *   die Rezeptauswahl verliert nur den Verweis (SET NULL).
 * - Rezeptart gelöscht => Rezepte bleiben, recipe_type_id wird NULL.
 * - Kategorie gelöscht => wird in der Anwendung behandelt (Unterkategorien verschieben
 *   oder löschen); der Fremdschlüssel verhindert verwaiste Unterkategorien (RESTRICT).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recipe_types', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100)->unique();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_id')->nullable()->constrained('categories')->restrictOnDelete();
            $table->string('name', 100);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            $table->unique(['parent_id', 'name']);
        });

        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100)->unique();
            $table->timestamps();
        });

        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title', 255);
            $table->text('description')->nullable();
            $table->foreignId('recipe_type_id')->nullable()->constrained()->nullOnDelete();
            $table->string('source_url', 2048)->nullable();
            $table->char('source_url_hash', 64)->nullable()->index();
            $table->string('source_text', 500)->nullable();
            $table->string('author', 255)->nullable();
            $table->decimal('yield_quantity', 10, 3)->default(1);
            $table->string('yield_unit', 50)->default('Portionen');
            $table->unsignedInteger('prep_minutes')->nullable();
            $table->unsignedInteger('rest_minutes')->nullable();
            $table->unsignedInteger('cook_minutes')->nullable();
            $table->unsignedInteger('total_minutes')->nullable()->comment('Ausdrücklich hinterlegte Gesamtzeit; NULL = Summe anzeigen');
            $table->unsignedTinyInteger('rating')->nullable();
            $table->boolean('is_favorite')->default(false)->index();
            $table->mediumText('notes')->nullable()->comment('Persönliche Notizen (Markdown)');
            $table->mediumText('search_text')->nullable()->comment('Denormalisierter Suchtext');
            $table->timestamps();

            $table->index('title');
            $table->index('rating');
            $table->index('created_at');
            $table->index('updated_at');
        });

        Schema::create('category_recipe', function (Blueprint $table) {
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->foreignId('recipe_id')->constrained()->cascadeOnDelete();
            $table->primary(['category_id', 'recipe_id']);
            $table->index('recipe_id');
        });

        Schema::create('recipe_tag', function (Blueprint $table) {
            $table->foreignId('recipe_id')->constrained()->cascadeOnDelete();
            $table->foreignId('tag_id')->constrained()->cascadeOnDelete();
            $table->primary(['recipe_id', 'tag_id']);
            $table->index('tag_id');
        });

        Schema::create('ingredient_groups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recipe_id')->constrained()->cascadeOnDelete();
            $table->string('name', 150)->nullable();
            $table->unsignedInteger('position')->default(0);
            $table->index(['recipe_id', 'position']);
        });

        Schema::create('ingredients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recipe_id')->constrained()->cascadeOnDelete();
            $table->foreignId('ingredient_group_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('position')->default(0);
            $table->decimal('quantity', 14, 4)->nullable();
            $table->decimal('quantity_max', 14, 4)->nullable()->comment('Obergrenze bei Bereichen wie 2–3');
            $table->string('quantity_text', 60)->nullable()->comment('Nicht numerische Menge, z. B. „etwas“');
            $table->string('unit', 40)->nullable();
            $table->string('name', 255);
            $table->string('note', 255)->nullable();
            $table->boolean('scalable')->default(true);
            $table->string('original_text', 500)->nullable();
            $table->index(['ingredient_group_id', 'position']);
            $table->index('recipe_id');
        });

        Schema::create('recipe_steps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recipe_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('position')->default(0);
            $table->text('body');
            $table->index(['recipe_id', 'position']);
        });

        Schema::create('recipe_nutrition', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recipe_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('basis', 20)->comment('serving | 100g | recipe');
            $table->string('basis_label', 100)->nullable()->comment('z. B. „pro Scheibe (50 g)“');
            $table->decimal('energy_kcal', 10, 2)->nullable();
            $table->decimal('energy_kj', 10, 2)->nullable();
            $table->decimal('fat', 10, 2)->nullable();
            $table->decimal('saturated_fat', 10, 2)->nullable();
            $table->decimal('carbohydrates', 10, 2)->nullable();
            $table->decimal('sugar', 10, 2)->nullable();
            $table->decimal('protein', 10, 2)->nullable();
            $table->decimal('salt', 10, 2)->nullable();
            $table->decimal('fiber', 10, 2)->nullable();
            $table->timestamps();
        });

        Schema::create('recipe_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recipe_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('path', 255)->comment('Anzeigeversion, privater Speicher');
            $table->string('thumb_path', 255);
            $table->string('original_path', 255)->nullable();
            $table->string('mime', 50);
            $table->unsignedInteger('width');
            $table->unsignedInteger('height');
            $table->unsignedBigInteger('size_bytes');
            $table->string('original_name', 255)->nullable();
            $table->string('source_url', 2048)->nullable();
            $table->timestamps();
        });

        Schema::create('recipe_shares', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recipe_id')->constrained()->cascadeOnDelete();
            $table->string('token', 64)->unique();
            $table->boolean('include_notes')->default(false);
            $table->boolean('include_image')->default(true);
            $table->boolean('include_nutrition')->default(true);
            $table->timestamp('revoked_at')->nullable();
            $table->timestamp('last_accessed_at')->nullable();
            $table->timestamps();
            $table->index(['recipe_id', 'revoked_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recipe_shares');
        Schema::dropIfExists('recipe_images');
        Schema::dropIfExists('recipe_nutrition');
        Schema::dropIfExists('recipe_steps');
        Schema::dropIfExists('ingredients');
        Schema::dropIfExists('ingredient_groups');
        Schema::dropIfExists('recipe_tag');
        Schema::dropIfExists('category_recipe');
        Schema::dropIfExists('recipes');
        Schema::dropIfExists('tags');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('recipe_types');
    }
};
