# Installation, Betrieb und Updates auf netcup Webhosting 4000

> **Alle Pfade, Domains, Benutzernamen und Panel-Menüpunkte in dieser Anleitung sind Beispiele.**
> Sie müssen an Ihr Kundenkonto angepasst werden. Platzhalter sind in `<SPITZEN_KLAMMERN>` geschrieben.
> Die Bezeichnungen im Hosting-Panel (netcup Webhosting wird mit Plesk verwaltet) können je nach Version abweichen.
> Passwörter und Schlüssel werden **nie** in den Chat, in Git oder in diese Dokumentation geschrieben, sondern nur auf dem Server in die Datei `.env` bzw. im Panel eingetragen.

Beispielwerte, die Sie ersetzen:

| Platzhalter | Bedeutung | Beispiel |
|---|---|---|
| `<SUBDOMAIN>` | Adresse der Anwendung | `rezepte.example.org` |
| `<APP_DIR>` | Anwendungsverzeichnis auf dem Webspace | `/var/www/vhosts/example.org/rezepte` |
| `<PHP83>` | PHP-8.3-Kommandozeile | `/opt/plesk/php/8.3/bin/php` (prüfen!) |
| `<DB_NAME>`, `<DB_USER>` | Datenbank und Benutzer | im Panel angelegt |

---

## 0. Ressourcen: garantierter RAM ≠ PHP-Speicherlimit

* **6 GB garantierter RAM** gelten für das gesamte Hosting-Paket (alle Prozesse zusammen).
* **`memory_limit = 512M`** begrenzt *jede einzelne PHP-Anfrage*. Danach richtet sich die Anwendung:
  * Bilder werden **vor** dem Dekodieren auf Abmessungen, Gesamtpixel und voraussichtlichen Speicherbedarf geprüft (Standard: max. 15 MB, 12 000 px Kante, 50 Megapixel).
  * Es wird immer nur **ein** Bild gleichzeitig verarbeitet (Sperre über den Datenbank-Cache).
  * PDF-Erzeugung, Export und Sicherung arbeiten dateibasiert und streamen große Daten.
* **`max_execution_time = 180 s`**: Importabrufe sind auf 5 s Verbindungs- und 15 s Gesamtzeit begrenzt; Sicherung/Export setzen ihr Limit auf 170 s. Sehr große Sammlungen sichert man per SSH/Cronjob (CLI-PHP hat i. d. R. kein Zeitlimit – im Konto prüfen).

## 1. Vorab prüfen (per SSH)

```bash
ssh <SSH_BENUTZER>@<SSH_HOST>
```

```bash
# Welche PHP-Versionen gibt es? (Pfade sind Beispiele)
ls -1 /opt/plesk/php/*/bin/php /usr/bin/php* 2>/dev/null
php -v
```

```bash
# Den passenden PHP-8.3-Interpreter verwenden und merken:
<PHP83> -v
<PHP83> -m
```

```bash
composer --version || echo "Composer nicht vorhanden"
node -v || echo "Node.js nicht im PATH"
```

Wird `php` ohne Pfad aufgerufen, ist es oft **nicht** PHP 8.3. In allen folgenden Befehlen deshalb `<PHP83>` verwenden.
Nach dem Hochladen der Dateien (Schritt 4) prüft dieses Skript Version, Erweiterungen, Limits und Schreibrechte – ohne dass Composer-Pakete installiert sein müssen:

```bash
cd <APP_DIR>
<PHP83> scripts/check-environment.php
```

**Benötigte PHP-Erweiterungen:** ctype, curl, dom, fileinfo, filter, gd (mit JPEG, PNG, WebP), hash, iconv, json, libxml, mbstring, openssl, pcre, pdo_mysql, session, tokenizer, xml, zip, zlib.
Optional: exif (sonst eingebauter Parser für die Bildausrichtung), OPcache.
Fehlende Erweiterungen werden im Panel bei den PHP-Einstellungen der Domain aktiviert (sofern angeboten).

**Composer fehlt?** Im eigenen Home-Verzeichnis installieren – Prüfsumme nach der Anleitung auf getcomposer.org/download kontrollieren:

```bash
mkdir -p ~/bin && cd ~/bin
<PHP83> -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
# Prüfsumme gemäß getcomposer.org vergleichen, dann:
<PHP83> composer-setup.php --filename=composer
rm composer-setup.php
```

Composer dann immer so aufrufen: `<PHP83> ~/bin/composer …`

## 2. Subdomain und HTTPS

1. Im Panel eine **Subdomain** anlegen, z. B. `<SUBDOMAIN>` (Platzhalter – tatsächliche Adresse bitte festlegen).
2. **Document Root** der Subdomain auf `<APP_DIR>/public` setzen (Hosting-Einstellungen der Subdomain). Nur dieses Verzeichnis ist öffentlich.
3. **SSL/TLS-Zertifikat** (z. B. Let's Encrypt) für die Subdomain ausstellen.
4. **Dauerhafte 301-Weiterleitung von HTTP auf HTTPS** in den Hosting-Einstellungen aktivieren (bevorzugt gegenüber `.htaccess`).
5. PHP-Version der Subdomain auf **8.3** stellen (nicht ändern, falls bereits 8.3).

> **Falls das Document Root ausnahmsweise nicht auf `public/` gesetzt werden kann:** die Datei
> `deploy/htaccess-fallback-ohne-document-root` als `.htaccess` in `<APP_DIR>` ablegen. Sie leitet intern nach `public/` um und sperrt alle anderen Pfade. Danach unbedingt Abschnitt 10 („Prüfung“) durchführen. Die Variante mit Document Root ist sicherer und vorzuziehen.

## 3. Datenbank anlegen

Im Panel unter *Datenbanken*:

1. Neue MySQL-Datenbank `<DB_NAME>` anlegen.
2. Eigenen Datenbankbenutzer `<DB_USER>` mit starkem, zufälligem Passwort anlegen und nur dieser Datenbank zuordnen.
3. Zeichensatz: **utf8mb4** (Kollation `utf8mb4_unicode_ci`; die Anwendung legt alle Tabellen damit an).
4. Host notieren (meist `localhost`).

## 4. Dateien bereitstellen

### Weg A: SSH und Git (empfohlen, wenn Git und Composer verfügbar)

```bash
cd <ÜBERGEORDNETES_VERZEICHNIS>
git clone <REPOSITORY_URL> <APP_DIR_NAME>
cd <APP_DIR>
<PHP83> ~/bin/composer install --no-dev --prefer-dist --optimize-autoloader
```

Der Frontend-Build (`public/build`) ist im Repository enthalten. **Node.js wird auf dem Server nicht benötigt.**
Nur wenn Sie die Oberfläche selbst ändern und auf dem Server bauen möchten, muss eine passende Node.js-Version (22) per SSH verfügbar sein:

```bash
node -v
npm ci --ignore-scripts
npm run build
```

> Hinweis: Liegt die Anwendung in einem Unterordner eines größeren Repositorys (wie derzeit `rezeptverwaltung/`), entweder das Repository klonen und das Document Root auf `…/rezeptverwaltung/public` setzen, oder die Anwendung in ein eigenes Repository verschieben.

### Weg B: Lokal erstelltes Deployment-Paket hochladen

Lokal (mit PHP 8.3, Composer, Node.js 22):

```bash
bash scripts/build-deploy-package.sh
```

Das ZIP enthält produktive PHP-Abhängigkeiten (`vendor/`) und den Frontend-Build, aber keine `.env`. Per SFTP nach `<APP_DIR>` hochladen und per SSH entpacken (`unzip`) oder im Datei-Manager des Panels entpacken.

## 5. Konfiguration (.env)

```bash
cd <APP_DIR>
cp .env.example .env
chmod 600 .env
<PHP83> artisan key:generate
```

Dann `.env` mit einem Editor (z. B. `nano .env`) bearbeiten und **dort** eintragen:

* `APP_URL=https://<SUBDOMAIN>`
* `APP_ENV=production`, `APP_DEBUG=false` (niemals `true` im Betrieb – sonst werden interne Fehlermeldungen angezeigt)
* `DB_HOST`, `DB_DATABASE=<DB_NAME>`, `DB_USERNAME=<DB_USER>`, `DB_PASSWORD=` (Passwort nur hier)
* `SESSION_SECURE_COOKIE=true`, `FORCE_HTTPS=true`
* `TRUSTED_PROXIES` zunächst **leer** lassen (siehe Abschnitt 8).

`.env` liegt außerhalb von `public/` und ist dadurch nicht über die Domain erreichbar; zusätzlich sperrt `public/.htaccess` alle versteckten Dateien.

## 6. Dateirechte (ohne 777)

```bash
cd <APP_DIR>
find . -type d -exec chmod 750 {} \;
find . -type f -exec chmod 640 {} \;
chmod 600 .env
chmod 750 artisan
chmod -R u+rwX,g+rwX storage bootstrap/cache
```

Auf Shared Hosting läuft PHP üblicherweise unter Ihrem eigenen Systembenutzer; dann genügen Rechte für den Eigentümer. Liefert der Webserver danach Fehler 403 für `public/`, bitte prüfen, ob er die Gruppe/andere Rechte für `public/` benötigt (`chmod 755` für Verzeichnisse und `644` für Dateien **nur in `public/`**). Niemals 777 verwenden.

## 7. Datenbank migrieren und erstes Konto anlegen

```bash
<PHP83> artisan migrate --force
<PHP83> artisan db:seed --class=StandardDatenSeeder --force   # optional: übliche Rezeptarten + Beispielkategorien
<PHP83> artisan rezepte:benutzer-anlegen
```

Das Passwort wird **verdeckt** abgefragt (mind. 12 Zeichen). Es gibt kein Standardpasswort und keine öffentliche Registrierung. Ein vergessenes Passwort setzt man per SSH neu:

```bash
<PHP83> artisan rezepte:passwort-setzen <IHRE_E-MAIL>
```

Für bessere Leistung im Betrieb:

```bash
<PHP83> artisan config:cache
<PHP83> artisan route:cache
<PHP83> artisan view:cache
```

(Nach jeder Änderung an `.env` erneut `config:cache` ausführen.)

## 8. HTTPS hinter einem Proxy richtig erkennen

netcup bietet optional einen vorgeschalteten nginx-Proxy an. Ob die Anwendung HTTPS korrekt erkennt, zeigt **Einstellungen › Systemprüfung**:

* „HTTPS erkannt: ja“ → nichts zu tun.
* „HTTPS erkannt: nein“, obwohl die Seite per `https://` geöffnet ist, und „X-Forwarded-Proto: https“ → die angezeigte **Absender-IP (REMOTE_ADDR)** gehört zum Proxy. Genau diese Adresse in `.env` eintragen:
  `TRUSTED_PROXIES=<ANGEZEIGTE_IP>` und `artisan config:cache` ausführen.
* **Niemals** `TRUSTED_PROXIES=*` setzen (wird von der Anwendung ignoriert): Sonst könnte jeder Besucher gefälschte Proxy-Header senden.

Es sind keine Änderungen an einer nginx-Systemkonfiguration nötig. Die Rewrite-Regeln liefert `public/.htaccess` (Apache). Wird der Webspace ausschließlich über nginx ohne `.htaccess` betrieben, im Panel die Option zur Verarbeitung von `.htaccess` bzw. die Weiterleitung aller Anfragen an `index.php` aktivieren.

## 9. Cronjob (ein zentraler Scheduler)

Im Panel unter *Geplante Aufgaben* (bzw. *Cronjobs*) **einen** Eintrag anlegen:

* Intervall: jede Minute, falls erlaubt; sonst alle 5 Minuten (oder das kleinste erlaubte Intervall).
* Befehl (Beispiel – Pfade anpassen):

```bash
cd <APP_DIR> && <PHP83> artisan schedule:run >> /dev/null 2>&1
```

Der Scheduler führt aus (siehe `routes/console.php`):

| Aufgabe | Zeitpunkt | Zweck |
|---|---|---|
| `rezepte:aufraeumen` | stündlich | temporäre PDFs, Exporte, Uploads (>24 h) und alte Protokolle löschen |
| `rezepte:sicherung` | täglich um 03:00 (`BACKUP_TIME`) | vollständige Sicherung + Aufbewahrungsregel |
| `rezepte:import-verarbeiten` | alle 5 Minuten | wartende Stapelimporte, max. 50 s und 5 Adressen je Lauf |

Alle Aufgaben sind mit `withoutOverlapping` gegen überlappende Ausführung gesichert. Die Zeitpunkte funktionieren auch bei 5-, 10- oder 15-Minuten-Intervallen. Bitte die im Konto zulässigen **Intervalle und Laufzeitgrenzen** prüfen; ist die Laufzeit stark begrenzt, die Sicherung alternativ als eigener Cronjob in einer ruhigen Stunde einrichten (`<PHP83> artisan rezepte:sicherung`).

Die normale Rezeptverwaltung und der Einzelimport benötigen **keinen** Cronjob und keinen Hintergrunddienst.

## 10. Prüfung der Installation

```bash
<PHP83> artisan rezepte:systempruefung
```

Im Browser: `https://<SUBDOMAIN>` → Anmeldeseite. Danach **Einstellungen › Systemprüfung**.

Diese Adressen dürfen **nicht** abrufbar sein (erwartet: 403 oder 404):

```bash
for p in .env composer.json artisan storage/logs/ ../.env vendor/autoload.php .git/config; do
  printf "%-22s " "$p"; curl -s -o /dev/null -w "%{http_code}\n" "https://<SUBDOMAIN>/$p"
done
```

Außerdem prüfen: `http://<SUBDOMAIN>` leitet auf `https://` um; ein Rezeptbild-Link (`/rezepte/<ID>/bild/anzeige`) liefert ohne Anmeldung nur eine Umleitung zur Anmeldeseite.

## 11. E-Mail per SMTP (optional)

Ohne SMTP bleibt `MAIL_MAILER=log`; Teilen über das E-Mail-Programm funktioniert trotzdem. Für den Direktversand ein eigenes Postfach im Panel anlegen und in `.env` eintragen:

```dotenv
MAIL_MAILER=smtp
MAIL_SCHEME=smtps
MAIL_HOST=<SMTP_SERVER_LAUT_PANEL>
MAIL_PORT=465
MAIL_USERNAME=<POSTFACH_ADRESSE>
MAIL_PASSWORD=<NUR_HIER_EINTRAGEN>
MAIL_FROM_ADDRESS=<POSTFACH_ADRESSE>
```

Danach `artisan config:cache`. Die Anwendung sendet nur an **einen** Empfänger je Vorgang (kein Massenversand), protokolliert keine Zugangsdaten und sendet persönliche Notizen nur, wenn sie ausdrücklich ausgewählt wurden.

## 12. Updates mit Sicherung und Rückweg

```bash
cd <APP_DIR>
# 1. Sicherung (Datenbank + Bilder)
<PHP83> artisan rezepte:sicherung
# 2. Aktuellen Stand merken
git rev-parse HEAD > ../rezepte-vorher.txt
# 3. Wartungsmodus und Update
<PHP83> artisan down
git pull
<PHP83> ~/bin/composer install --no-dev --prefer-dist --optimize-autoloader
<PHP83> artisan migrate --force
<PHP83> artisan config:cache && <PHP83> artisan route:cache && <PHP83> artisan view:cache
<PHP83> artisan up
```

**Rückweg bei Fehlern:**

```bash
<PHP83> artisan down
git checkout "$(cat ../rezepte-vorher.txt)"
<PHP83> ~/bin/composer install --no-dev --prefer-dist --optimize-autoloader
<PHP83> artisan rezepte:sicherung-wiederherstellen <NAME_DER_SICHERUNG_VON_SCHRITT_1>.zip
<PHP83> artisan config:cache && <PHP83> artisan up
```

Bei Weg B (Paket-Upload): neues Paket in ein **neues** Verzeichnis entpacken, `.env` und `storage/app/private` übernehmen (kopieren), Migrationen ausführen und dann das Document Root umstellen. Der Rückweg ist das Zurückstellen des Document Root plus ggf. Wiederherstellung der Sicherung.

Siehe auch [BACKUP.md](BACKUP.md).
