<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Services\Export\CollectionImporter;
use Illuminate\Console\Command;

class ImportCollection extends Command
{
    protected $signature = 'rezepte:sammlung-importieren {datei : Exportdatei (.zip)} {--email= : Konto (Standard: erstes Konto)} {--dubletten : Auch Rezepte mit bereits vorhandener Quell-URL importieren}';

    protected $description = 'Importiert einen Sammlungsexport (fügt Rezepte hinzu, löscht nichts)';

    public function handle(CollectionImporter $importer): int
    {
        $user = $this->option('email') ? User::where('email', $this->option('email'))->first() : User::orderBy('id')->first();
        if (! $user) {
            $this->error('Kein Benutzerkonto gefunden.');

            return self::FAILURE;
        }
        $r = $importer->import($user, $this->argument('datei'), ! $this->option('dubletten'));
        $this->info("{$r['imported']} Rezepte importiert, {$r['skipped']} übersprungen.");
        foreach ($r['warnings'] as $w) {
            $this->warn($w);
        }

        return self::SUCCESS;
    }
}
