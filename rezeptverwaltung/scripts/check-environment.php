<?php

/*
 * Vorab-Prüfung VOR „composer install“ (benötigt nur PHP):
 *   /PFAD/ZU/php83 scripts/check-environment.php
 * Prüft PHP-Version, Erweiterungen und Limits. Gibt keine Zugangsdaten aus.
 */
$ok = true;
$line = function (string $status, string $label, string $value) {
    printf("%-7s %-34s %s\n", $status, $label, $value);
};
echo "PHP-Binary: ".PHP_BINARY."\n\n";
$v = version_compare(PHP_VERSION, '8.3.0', '>=') && version_compare(PHP_VERSION, '8.4.0', '<');
$line($v ? 'OK' : 'FEHLER', 'PHP-Version (erwartet 8.3.x)', PHP_VERSION);
$ok = $ok && $v;
foreach (['ctype', 'curl', 'dom', 'fileinfo', 'filter', 'gd', 'hash', 'iconv', 'json', 'libxml', 'mbstring', 'openssl', 'pcre', 'pdo_mysql', 'session', 'tokenizer', 'xml', 'zip', 'zlib'] as $ext) {
    $has = extension_loaded($ext);
    $line($has ? 'OK' : 'FEHLER', 'Erweiterung '.$ext, $has ? 'aktiv' : 'fehlt');
    $ok = $ok && $has;
}
foreach (['exif', 'Zend OPcache'] as $ext) {
    $line(extension_loaded($ext) ? 'OK' : 'Info', 'Optional: '.$ext, extension_loaded($ext) ? 'aktiv' : 'nicht aktiv');
}
if (extension_loaded('gd')) {
    $gd = gd_info();
    $w = ! empty($gd['WebP Support']);
    $line($w ? 'OK' : 'Info', 'GD WebP-Unterstützung', $w ? 'ja' : 'nein (WebP-Uploads nicht möglich)');
}
foreach (['memory_limit', 'max_execution_time', 'max_input_time', 'post_max_size', 'upload_max_filesize', 'opcache.enable'] as $ini) {
    $line('Info', $ini, (string) ini_get($ini));
}
$base = dirname(__DIR__);
foreach (['storage', 'bootstrap/cache'] as $dir) {
    $w = is_writable($base.'/'.$dir);
    $line($w ? 'OK' : 'FEHLER', 'Schreibrecht '.$dir, $w ? 'ja' : 'nein');
    $ok = $ok && $w;
}
echo "\n".($ok ? "Alle Pflichtprüfungen bestanden.\n" : "Es fehlen Voraussetzungen – siehe FEHLER.\n");
exit($ok ? 0 : 1);
