<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('shopping_lists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name', 150);
            $table->boolean('group_by_area')->default(true);
            $table->timestamps();
        });

        // Rezeptauswahl einer Einkaufsliste (welches Rezept in welcher Zielmenge).
        Schema::create('shopping_list_recipes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shopping_list_id')->constrained()->cascadeOnDelete();
            $table->foreignId('recipe_id')->nullable()->constrained()->nullOnDelete();
            $table->string('recipe_title', 255)->comment('Schnappschuss, bleibt nach Löschen des Rezepts erhalten');
            $table->decimal('target_quantity', 10, 3);
            $table->string('yield_unit', 50);
            $table->timestamps();
            $table->index(['shopping_list_id', 'recipe_id']);
        });

        Schema::create('shopping_list_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shopping_list_id')->constrained()->cascadeOnDelete();
            $table->string('name', 255);
            $table->decimal('quantity', 14, 4)->nullable();
            $table->string('quantity_text', 60)->nullable();
            $table->string('unit', 40)->nullable();
            $table->string('note', 255)->nullable();
            $table->string('area', 60)->nullable()->comment('Einkaufsbereich');
            $table->string('merge_key', 191)->nullable()->comment('normierter Name + Einheitendimension');
            $table->boolean('is_checked')->default(false);
            $table->boolean('is_manual')->default(false)->comment('Manuell angelegt oder bearbeitet: wird nicht automatisch neu berechnet');
            $table->string('review_reason', 255)->nullable()->comment('Gesetzt, wenn der Eintrag geprüft werden sollte');
            $table->unsignedInteger('position')->default(0);
            $table->timestamps();
            $table->index(['shopping_list_id', 'merge_key']);
        });

        // Herkunft eines Listeneintrags (für Anzeige „für Rezept X“ und Neuberechnung).
        Schema::create('shopping_list_item_sources', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shopping_list_item_id')->constrained()->cascadeOnDelete();
            $table->foreignId('shopping_list_recipe_id')->constrained()->cascadeOnDelete();
            $table->decimal('quantity', 14, 4)->nullable()->comment('in Basiseinheit (g, ml) oder Originaleinheit');
            $table->string('unit', 40)->nullable();
            $table->string('original_text', 500)->nullable();
        });

        // Gemerkte Zuordnung Zutat -> Einkaufsbereich.
        Schema::create('ingredient_areas', function (Blueprint $table) {
            $table->id();
            $table->string('name_key', 191)->unique();
            $table->string('area', 60);
            $table->timestamps();
        });

        // Warteschlange für optionale Stapelimporte (Verarbeitung per Cronjob, zeitbegrenzt).
        Schema::create('import_queue_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('url', 2048);
            $table->string('status', 20)->default('pending')->index()->comment('pending|processing|ready|failed|saved');
            $table->unsignedTinyInteger('attempts')->default(0);
            $table->json('payload')->nullable();
            $table->string('error', 500)->nullable();
            $table->foreignId('recipe_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamp('locked_until')->nullable();
            $table->timestamps();
        });

        Schema::create('task_runs', function (Blueprint $table) {
            $table->id();
            $table->string('task', 100)->index();
            $table->string('status', 20)->comment('running|success|failed');
            $table->text('message')->nullable();
            $table->timestamp('started_at');
            $table->timestamp('finished_at')->nullable();
            $table->index('started_at');
        });

        Schema::create('settings', function (Blueprint $table) {
            $table->string('key', 100)->primary();
            $table->text('value')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
        Schema::dropIfExists('task_runs');
        Schema::dropIfExists('import_queue_items');
        Schema::dropIfExists('ingredient_areas');
        Schema::dropIfExists('shopping_list_item_sources');
        Schema::dropIfExists('shopping_list_items');
        Schema::dropIfExists('shopping_list_recipes');
        Schema::dropIfExists('shopping_lists');
    }
};
