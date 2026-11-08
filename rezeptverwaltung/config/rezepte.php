<?php

/*
 * Anwendungsspezifische Einstellungen. Alle Werte lassen sich über die .env
 * anpassen. Die Grenzwerte sind auf das PHP-Memory-Limit von 512 MB und die
 * maximale Ausführungszeit von 180 Sekunden des Hostings abgestimmt.
 */
return [
    'force_https' => (bool) env('FORCE_HTTPS', false),

    // Kommagetrennte Liste vertrauenswürdiger Proxy-Adressen. Leer = keinem Proxy vertrauen.
    'trusted_proxies' => env('TRUSTED_PROXIES', ''),

    'images' => [
        // Maximale Dateigröße eines hochgeladenen Bildes in MB (Hosting-Upload-Limit: 128 MB).
        'max_mb' => (int) env('IMAGE_MAX_MB', 15),
        // Maximale Kantenlänge und Gesamtpixelzahl des Originals.
        'max_side' => (int) env('IMAGE_MAX_SIDE', 12000),
        'max_megapixels' => (int) env('IMAGE_MAX_MEGAPIXELS', 50),
        // Größe der gespeicherten Anzeigeversion und des Vorschaubilds (längste Kante).
        'display_side' => 1600,
        'thumb_side' => 640,
        'quality' => 82,
        'keep_original' => (bool) env('IMAGE_KEEP_ORIGINAL', true),
        // Nur diese Formate werden angenommen (geprüft am tatsächlichen Dateiinhalt).
        'mimes' => ['image/jpeg', 'image/png', 'image/webp'],
        // Wie lange auf die Bildverarbeitungssperre gewartet wird (Sekunden).
        'lock_wait' => 20,
    ],

    'import' => [
        'connect_timeout' => (int) env('IMPORT_CONNECT_TIMEOUT', 5),
        'timeout' => (int) env('IMPORT_TIMEOUT', 15),
        'max_html_bytes' => (int) env('IMPORT_MAX_HTML_MB', 5) * 1024 * 1024,
        'max_redirects' => (int) env('IMPORT_MAX_REDIRECTS', 5),
        'allowed_ports' => [80, 443],
        'user_agent' => 'Mozilla/5.0 (compatible; Rezeptverwaltung/1.0; privater Rezeptimport)',
        // Nur für Entwicklungsumgebungen: Proxy aus Umgebungsvariablen verwenden.
        'use_env_proxy' => (bool) env('IMPORT_USE_ENV_PROXY', false),
        'queue_batch_limit' => 5,
        'queue_max_urls' => 50,
    ],

    'backup' => [
        'keep' => (int) env('BACKUP_KEEP', 7),
        'max_age_days' => (int) env('BACKUP_MAX_AGE_DAYS', 60),
        'time' => env('BACKUP_TIME', '03:17'),
        // Tabellen, deren Inhalt nicht gesichert wird (nur Struktur).
        'skip_data' => ['sessions', 'cache', 'cache_locks'],
    ],

    'cleanup' => [
        'tmp_max_age_hours' => 24,
        'task_runs_days' => 90,
    ],

    'export' => [
        'format' => 'rezeptverwaltung-export',
        'version' => 1,
        'max_upload_mb' => 120,
    ],
];
