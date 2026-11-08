<?php

namespace App\Services;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/** Prüft die Laufzeitumgebung (für Einstellungen › System und „php artisan rezepte:systempruefung“). */
class SystemCheck
{
    public const REQUIRED_EXTENSIONS = ['pdo_mysql', 'mbstring', 'openssl', 'tokenizer', 'xml', 'ctype', 'fileinfo', 'curl', 'gd', 'zip', 'zlib', 'dom', 'iconv', 'session', 'filter'];

    public const OPTIONAL_EXTENSIONS = ['exif' => 'Bildausrichtung wird sonst über einen eingebauten Parser gelesen', 'opcache' => 'Leistung'];

    /** @return array<int, array{label: string, ok: bool|null, value: string, hint?: string}> */
    public function run(?Request $request = null): array
    {
        $rows = [];
        $rows[] = ['label' => 'PHP-Version', 'ok' => version_compare(PHP_VERSION, '8.3.0', '>=') && version_compare(PHP_VERSION, '8.4.0', '<'), 'value' => PHP_VERSION, 'hint' => 'Erwartet: PHP 8.3.x'];
        foreach (self::REQUIRED_EXTENSIONS as $ext) {
            $ok = extension_loaded($ext);
            $rows[] = ['label' => 'Erweiterung '.$ext, 'ok' => $ok, 'value' => $ok ? 'aktiv' : 'FEHLT'];
        }
        foreach (self::OPTIONAL_EXTENSIONS as $ext => $why) {
            $ok = extension_loaded($ext) || ($ext === 'opcache' && extension_loaded('Zend OPcache'));
            $rows[] = ['label' => 'Optional: '.$ext, 'ok' => $ok ? true : null, 'value' => $ok ? 'aktiv' : 'nicht aktiv', 'hint' => $why];
        }
        if (extension_loaded('gd')) {
            $gd = gd_info();
            $rows[] = ['label' => 'GD: JPEG/PNG/WebP', 'ok' => ! empty($gd['JPEG Support']) && ! empty($gd['PNG Support']) && ! empty($gd['WebP Support']),
                'value' => sprintf('JPEG %s, PNG %s, WebP %s', ! empty($gd['JPEG Support']) ? 'ja' : 'nein', ! empty($gd['PNG Support']) ? 'ja' : 'nein', ! empty($gd['WebP Support']) ? 'ja' : 'nein')];
        }
        foreach (['memory_limit', 'max_execution_time', 'max_input_time', 'post_max_size', 'upload_max_filesize'] as $ini) {
            $rows[] = ['label' => $ini, 'ok' => null, 'value' => (string) ini_get($ini)];
        }
        $rows[] = ['label' => 'opcache.enable', 'ok' => null, 'value' => ini_get('opcache.enable') ? 'on' : 'off'];

        try {
            $version = (string) DB::selectOne('SELECT VERSION() AS v')->v;
            $charset = (string) DB::selectOne('SELECT @@character_set_database AS c')->c;
            $rows[] = ['label' => 'MySQL-Version', 'ok' => version_compare($version, '8.0.0', '>='), 'value' => $version, 'hint' => 'Zielumgebung: MySQL 8.4'];
            $rows[] = ['label' => 'Datenbank-Zeichensatz', 'ok' => $charset === 'utf8mb4', 'value' => $charset];
        } catch (\Throwable $e) {
            $rows[] = ['label' => 'Datenbankverbindung', 'ok' => false, 'value' => 'fehlgeschlagen', 'hint' => 'Zugangsdaten in .env prüfen'];
        }

        foreach (['storage/app/private', 'storage/framework/cache', 'storage/framework/sessions', 'storage/framework/views', 'storage/logs', 'bootstrap/cache'] as $dir) {
            $path = base_path($dir);
            $ok = is_dir($path) && is_writable($path);
            $rows[] = ['label' => 'Schreibrecht '.$dir, 'ok' => $ok, 'value' => $ok ? 'ja' : 'NEIN'];
        }
        $publicStorage = public_path('storage');
        $rows[] = ['label' => 'Kein öffentlicher Storage-Link', 'ok' => ! file_exists($publicStorage), 'value' => file_exists($publicStorage) ? 'public/storage existiert – entfernen!' : 'ok'];

        $rows[] = ['label' => 'APP_DEBUG', 'ok' => ! config('app.debug') || app()->environment('local', 'testing'), 'value' => config('app.debug') ? 'an' : 'aus', 'hint' => 'Im Produktivbetrieb muss APP_DEBUG=false sein'];
        $rows[] = ['label' => 'APP_ENV', 'ok' => null, 'value' => (string) config('app.env')];
        $rows[] = ['label' => 'APP_KEY gesetzt', 'ok' => (string) config('app.key') !== '', 'value' => (string) config('app.key') !== '' ? 'ja' : 'NEIN'];

        if ($request) {
            $rows[] = ['label' => 'HTTPS erkannt', 'ok' => $request->isSecure(), 'value' => $request->isSecure() ? 'ja' : 'nein',
                'hint' => $request->isSecure() ? '' : 'Falls die Seite per https:// aufgerufen wurde, sitzt ein Proxy davor: TRUSTED_PROXIES gezielt auf dessen Adresse setzen (siehe unten).'];
            $rows[] = ['label' => 'Absender-IP (REMOTE_ADDR)', 'ok' => null, 'value' => (string) $request->server('REMOTE_ADDR')];
            $rows[] = ['label' => 'X-Forwarded-Proto', 'ok' => null, 'value' => (string) ($request->headers->get('X-Forwarded-Proto') ?? '–')];
            $rows[] = ['label' => 'TRUSTED_PROXIES', 'ok' => config('rezepte.trusted_proxies') !== '*', 'value' => config('rezepte.trusted_proxies') ?: '(leer – keinem Proxy vertrauen)'];
        }

        $mailer = (string) config('mail.default');
        $rows[] = ['label' => 'E-Mail-Versand (SMTP)', 'ok' => null, 'value' => $mailer === 'smtp' ? 'eingerichtet ('.config('mail.mailers.smtp.host').')' : 'nicht eingerichtet (Teilen über E-Mail-Programm)'];

        $last = Setting::get('scheduler_last_run');
        $lastTs = $last ? (int) $last : null;
        $rows[] = ['label' => 'Letzter Cronjob-Lauf', 'ok' => $lastTs ? $lastTs > time() - 7200 : null,
            'value' => $lastTs ? date('d.m.Y H:i', $lastTs) : 'noch nie', 'hint' => 'Der Cronjob ruft „php artisan schedule:run“ auf.'];

        $free = @disk_free_space(storage_path());
        if ($free !== false) {
            $rows[] = ['label' => 'Freier Speicher (laut Dateisystem)', 'ok' => null, 'value' => number_format($free / 1073741824, 1, ',', '.').' GB',
                'hint' => 'Auf Shared Hosting maßgeblich ist die Kontingentanzeige im Kundenkonto.'];
        }

        return $rows;
    }
}
