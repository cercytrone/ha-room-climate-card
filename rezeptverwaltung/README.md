# Rezeptverwaltung

Selbst gehostete, deutschsprachige Webanwendung für die persönliche Rezeptsammlung – ausgelegt für **netcup Webhosting 4000** (Shared Hosting, PHP 8.3, MySQL 8.4, ohne Root, ohne Dauerprozesse).

* Rezepte mit Zutatengruppen, strukturierten Mengen, Markdown-Zubereitung, Notizen, Nährwerten mit Bezugsgröße, Cover-Bild
* Mengenanpassung (Dezimalkomma, Brüche, ohne Aufrunden; Originalwerte bleiben unverändert)
* Import von Webseiten (Schema.org/JSON-LD, Microdata) mit bearbeitbarer Vorschau, Text-Import, Stapel-Warteschlange
* Hierarchische Kategorien, Rezeptarten, Schlagwörter; Suche und Filter
* Einkaufslisten mit Zusammenführung kompatibler Einheiten, Abhaken, Einkaufsbereichen, Teilen, Druck und PDF
* Teilen per E-Mail-Programm, WhatsApp, nativer Teilen-Funktion, Text, PDF, Druck; optional SMTP; widerrufbare Freigabelinks
* Eigene Sicherungen (Datenbank + Bilder), Export/Import in dokumentiertem Format, Cron-Scheduler

## Technische Grundlage und Begründung

| Komponente | Version | Begründung |
|---|---|---|
| PHP | 8.3 (vorgegeben) | Laravel 13 verlangt PHP ≥ 8.3; `composer.json` fixiert die Plattform auf 8.3.0, damit die Lock-Datei auf dem Hosting installierbar ist. |
| Laravel | **13.x** (Lock: 13.40.0) | Aktuelle, gepflegte Hauptversion; ausdrücklich PHP-8.3-kompatibel. Nach der Laravel-Supportrichtlinie erhält eine Hauptversion 18 Monate Fehlerbehebungen und 2 Jahre Sicherheitsupdates (Termine unter laravel.com/docs/13.x/releases prüfen). Laravel 12 wäre ebenfalls lauffähig, erreicht aber früher das Supportende. |
| MySQL | 8.4 LTS (Hosting: 8.4.13) | Migrationen nutzen nur Standardfunktionen (InnoDB, utf8mb4, Fremdschlüssel). |
| PDF | dompdf 3.1 | Reines PHP, kein Headless-Browser; DejaVu-Schrift für Umlaute/Sonderzeichen. |
| Bilder | PHP-GD (ohne Zusatzbibliothek) | Volle Kontrolle über Speicherbedarf; EXIF-Ausrichtung auch ohne ext-exif. |
| Markdown | league/commonmark (über Laravel) | HTML-Eingaben werden maskiert, unsichere Links entfernt. |
| Oberfläche | Blade + Alpine.js + Tailwind CSS 4 | Serverseitig gerendert; gezielte Interaktivität (Mengenrechner, Formulare, Einkaufsliste). Node.js nur zum Bauen. |

Hinweis: PHP 8.3 erhält laut php.net Sicherheitsupdates bis Ende 2027. Ein späterer Wechsel auf PHP 8.4 ist mit Laravel 13 möglich, wird hier aber nicht ungefragt vorgenommen.

Keine Voraussetzungen: kein Redis, kein Elasticsearch, kein Queue-Worker, kein Node.js im Betrieb, keine Cloud-/KI-Dienste.

## Dokumentation

* [docs/INSTALLATION.md](docs/INSTALLATION.md) – Einrichtung auf netcup (Subdomain, HTTPS, Datenbank, Git oder Upload-Paket, Rechte, Cronjob, SMTP, Prüfung, Updates mit Rückweg)
* [docs/BACKUP.md](docs/BACKUP.md) – Sicherung, Aufbewahrung, externe Ablage, Wiederherstellung
* [docs/DATENMODELL.md](docs/DATENMODELL.md) – Tabellen, Beziehungen, Löschregeln, Seiten und Abläufe
* [docs/EXPORTFORMAT.md](docs/EXPORTFORMAT.md) – maschinenlesbares Exportformat
* [docs/GRENZEN.md](docs/GRENZEN.md) – bekannte Grenzen, insbesondere beim Import

## Cronjob (ein Eintrag genügt)

```bash
cd <APP_DIR> && <PHP83> artisan schedule:run >> /dev/null 2>&1
```

Intervall: jede Minute oder alle 5 Minuten. Pfade sind Beispiele (siehe INSTALLATION.md).

## Lokale Entwicklung

```bash
composer install
cp .env.example .env   # APP_ENV=local, APP_DEBUG=true, DB_* für eine lokale MySQL-Datenbank
php artisan key:generate
php artisan migrate --seed
php artisan rezepte:benutzer-anlegen
npm ci && npm run build   # oder: npm run dev
php artisan serve
```

## Tests

```bash
# PHP-Tests gegen eine MySQL-Testdatenbank „rezepte_test“ (Zugang per Umgebungsvariablen)
DB_USERNAME=<benutzer> DB_PASSWORD=<passwort> php artisan test
# JavaScript-Mengenlogik
npm test
# Code-Stil
vendor/bin/pint --test
```

Die GitHub-Actions-Pipeline `.github/workflows/rezeptverwaltung.yml` (im übergeordneten Repository) führt Migrationen (hin, zurück, hin) und alle Tests gegen `mysql:8.4` aus.

## Umsetzungsstand

| Bereich | Status | Automatisch getestet |
|---|---|---|
| Anmeldung, keine Registrierung, Begrenzung der Versuche, sichere Ersteinrichtung | umgesetzt | ja |
| Rezepte inkl. Gruppen, Mengen ohne Zahl, Schritte (Markdown, Vorschau, Reihenfolge), Notizen, Nährwerte | umgesetzt | ja |
| Skalierung 1 → 1,5 Brote, Dezimalkomma/Brüche, „nach Geschmack“, Nährwert-Bezugsgröße | umgesetzt | ja (PHP + JS) |
| Bilder: Typprüfung am Inhalt, Größen-/Pixel-/Speicherprüfung, Ausrichtung, Vorschaubilder, privat | umgesetzt | ja |
| Eingaben bleiben bei Fehlern erhalten (inkl. zwischengespeichertem Bild) | umgesetzt | ja |
| Hierarchische Kategorien inkl. Lösch-Dialog, Rezeptarten, Schlagwörter | umgesetzt | ja |
| Suche (Titel, Zutaten, Art, Kategorien, Schlagwörter, Notizen), Filter, Sortierung, Karten/Liste | umgesetzt | ja |
| Import von Webseiten mit Vorschau, Auswahl, Dubletten, Fehlermeldungen, SSRF-Schutz | umgesetzt | ja (simulierte Webseiten) |
| Text-Import, Stapel-Warteschlange per Cron | umgesetzt | ja |
| Einkaufsliste: Zielmengen, Zusammenführung g/kg, keine Zusammenführung g/ml, Rückfrage, Abhaken | umgesetzt | ja |
| Teilen (Text, mailto, WhatsApp, native Funktion, Druck, PDF, SMTP), Notizen standardmäßig aus | umgesetzt | serverseitig ja; Browser-Teilen manuell geprüft |
| Öffentliche Freigabelinks (widerrufbar, nur dieses Rezept) | umgesetzt | ja |
| PDF mit Umlauten und langen Rezepten | umgesetzt | ja (pdftotext) |
| Sicherung/Wiederherstellung inkl. Bildern, Aufbewahrung, Export/Wiederimport | umgesetzt | ja |
| Bedienbarkeit Telefon/Tablet/Desktop | umgesetzt | manuell (Playwright-Screenshots 390 px und 1280 px) |
| Migrationen gegen MySQL 8.4 | vorbereitet | lokal gegen MySQL 8.0.46; MySQL 8.4 über CI-Pipeline |

## Offene Punkte für die Inbetriebnahme

Bitte vor bzw. bei der Installation klären (keine Passwörter in den Chat!):

1. Welche **Domain/Subdomain** soll verwendet werden? (In der Doku als `rezepte.example.org` bzw. `<SUBDOMAIN>` geführt.)
2. Welche **PHP-Erweiterungen** sind aktiv? → `<PHP83> scripts/check-environment.php` ausführen.
3. Welche **PHP-, Composer- und Node.js-Aufrufe** gibt es per SSH (Pfad des PHP-8.3-Binarys)?
4. Welche **Cronjob-Intervalle und Laufzeitgrenzen** gelten im Konto?
5. Soll **direkter E-Mail-Versand per SMTP** eingerichtet werden? (Zugangsdaten nur in `.env` auf dem Server.)
