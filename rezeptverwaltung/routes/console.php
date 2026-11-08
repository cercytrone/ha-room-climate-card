<?php

use App\Models\Setting;
use Illuminate\Support\Facades\Schedule;

/*
 * Zentraler Scheduler. Auf dem Webspace genügt EIN Cronjob, z. B. alle 5 Minuten:
 *   /PFAD/ZU/php83 /PFAD/ZUR/APP/artisan schedule:run
 * (Pfade sind Beispiele – siehe docs/INSTALLATION.md.)
 *
 * Alle Aufgaben sind zeitlich begrenzt und gegen Überlappung gesichert (withoutOverlapping).
 * Die Zeitpunkte sind so gewählt, dass sie auch bei einem 5-, 10- oder 15-Minuten-Intervall
 * des Cronjobs erreicht werden.
 */

// Lebenszeichen für die Systemprüfung
Schedule::call(fn () => Setting::put('scheduler_last_run', (string) time()))
    ->name('scheduler-heartbeat')->everyMinute();

Schedule::command('rezepte:aufraeumen')->hourly()->withoutOverlapping(30);

Schedule::command('rezepte:sicherung')
    ->dailyAt(substr((string) config('rezepte.backup.time', '03:17'), 0, 2).':00')
    ->when(fn () => Setting::get('backup_enabled', '1') === '1')
    ->withoutOverlapping(60);

Schedule::command('rezepte:import-verarbeiten', ['--max-seconds' => 50, '--limit' => 5])
    ->everyFiveMinutes()->withoutOverlapping(10);
