<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Services\Export\CollectionExporter;
use Illuminate\Console\Command;

class ExportCollection extends Command
{
    protected $signature = 'rezepte:sammlung-exportieren {ziel : Zieldatei (.zip)} {--email= : Konto (Standard: erstes Konto)} {--ohne-notizen} {--mit-originalbildern}';

    protected $description = 'Exportiert die Rezeptsammlung in das dokumentierte ZIP/JSON-Format';

    public function handle(CollectionExporter $exporter): int
    {
        $user = $this->option('email') ? User::where('email', $this->option('email'))->first() : User::orderBy('id')->first();
        if (! $user) {
            $this->error('Kein Benutzerkonto gefunden.');

            return self::FAILURE;
        }
        $tmp = $exporter->export($user, ! $this->option('ohne-notizen'), (bool) $this->option('mit-originalbildern'));
        rename($tmp, $this->argument('ziel'));
        $this->info('Export gespeichert: '.$this->argument('ziel'));

        return self::SUCCESS;
    }
}
