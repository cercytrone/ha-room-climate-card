<?php

namespace App\Console\Commands;

use App\Services\SystemCheck;
use Illuminate\Console\Command;

class SystemCheckCommand extends Command
{
    protected $signature = 'rezepte:systempruefung';

    protected $description = 'Prüft PHP-Version, Erweiterungen, Limits, Datenbank und Schreibrechte';

    public function handle(SystemCheck $check): int
    {
        $failed = 0;
        $rows = [];
        foreach ($check->run() as $r) {
            $status = $r['ok'] === true ? 'OK' : ($r['ok'] === false ? 'FEHLER' : 'Info');
            $failed += $r['ok'] === false ? 1 : 0;
            $rows[] = [$status, $r['label'], $r['value'], $r['hint'] ?? ''];
        }
        $this->table(['Status', 'Prüfung', 'Wert', 'Hinweis'], $rows);
        $this->line('PHP-Binary dieser Prüfung: '.PHP_BINARY);
        if ($failed) {
            $this->error($failed.' Prüfung(en) fehlgeschlagen.');

            return self::FAILURE;
        }
        $this->info('Alle Pflichtprüfungen bestanden.');

        return self::SUCCESS;
    }
}
