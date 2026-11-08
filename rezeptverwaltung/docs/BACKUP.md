# Sicherung, Export und Wiederherstellung

Verlassen Sie sich **nicht ausschließlich** auf Sicherungen des Hosters: Laut Tarifbeschreibung sind dessen regelmäßige Sicherungen freiwillig, eine Wiederherstellung ist (bei Verfügbarkeit) kostenpflichtig über den Support. Die Anwendung bringt deshalb eigene Sicherungen mit.

## Zwei Mechanismen

| | Sicherung (`.zip`) | Export der Sammlung (`.zip`) |
|---|---|---|
| Inhalt | komplette Datenbank (alle Tabellen inkl. Einkaufslisten, Einstellungen, Konten) + alle Bilddateien | Rezepte inkl. Kategorien, Rezeptarten, Schlagwörter, Zutaten, Schritte, Nährwerte, Bilder; Notizen optional |
| Zweck | Notfall-Wiederherstellung **desselben** Systems | Archiv, Übertragung in eine andere Installation, maschinenlesbar |
| Format | `database.sql.gz` (eine SQL-Anweisung pro Zeile), `files/recipe-images/…`, `manifest.json` | dokumentiert in [EXPORTFORMAT.md](EXPORTFORMAT.md) |
| Wiederherstellen | ersetzt **alles** (per SSH) | fügt Rezepte **hinzu** (Weboberfläche oder SSH) |

Beide liegen unter `storage/app/private/…` – außerhalb des öffentlichen Verzeichnisses. Download nur nach Anmeldung.

## Sicherung erstellen

* Automatisch: täglich gegen 03:00 Uhr durch den Cronjob (abschaltbar unter *Einstellungen › Sicherungen*).
* Manuell: *Einstellungen › Sicherungen › Jetzt sichern* oder per SSH:

```bash
cd <APP_DIR> && <PHP83> artisan rezepte:sicherung
```

Ablage: `<APP_DIR>/storage/app/private/backups/sicherung-JJJJ-MM-TT_HHMMSS.zip`
Fehlgeschlagene Sicherungen erscheinen im *Protokoll geplanter Aufgaben* (Einstellungen) und im Log `storage/logs/`.

## Aufbewahrung

* *Anzahl aufbewahrter Sicherungen* (Standard 7) und *Löschen nach X Tagen* (Standard 60) unter Einstellungen.
* Die neueste Sicherung wird nie automatisch gelöscht.
* Die 250 GB des Tarifs gelten für **Web und Mail gemeinsam**. Die tatsächliche Aufteilung bzw. Belegung bitte in der Kontingentanzeige des Kundenkontos prüfen. Sicherungen wachsen durch die Aufbewahrungsregel nicht unbegrenzt.

## Auf ein getrenntes Speichermedium übertragen

Eine Sicherung auf demselben Webspace schützt nicht vor Verlust des Webspace. Mindestens eine der folgenden Varianten nutzen:

1. **Herunterladen** unter *Einstellungen › Sicherungen › Laden* und auf einer externen Festplatte/NAS ablegen.
2. **Vom eigenen Rechner/NAS abholen** (zieht per SSH, Beispiel):

```bash
rsync -av --ignore-existing <SSH_BENUTZER>@<SSH_HOST>:<APP_DIR>/storage/app/private/backups/ /pfad/zur/externen/sicherung/
```

3. **Automatische Sicherung des Hosters auf einen externen FTP-Server**, die der Tarif anbietet – im Panel einrichten; sie sichert den Webspace (inkl. `storage/app/private/backups`).

Sicherungsdateien enthalten alle persönlichen Daten (inkl. Passwort-Hashes). Extern bitte verschlüsselt aufbewahren.

## Vollständige Wiederherstellung (Datenbank **und** Bilder)

```bash
cd <APP_DIR>
<PHP83> artisan rezepte:sicherung-wiederherstellen sicherung-2026-11-08_031700.zip
# oder mit vollständigem Pfad zu einer heruntergeladenen Datei:
<PHP83> artisan rezepte:sicherung-wiederherstellen /pfad/zur/sicherung.zip
```

Der Befehl fragt nach, schaltet die Anwendung währenddessen in den Wartungsmodus, spielt die Datenbank ein und ersetzt das Bildverzeichnis. Stammt die Sicherung aus einer älteren Programmversion, danach `<PHP83> artisan migrate --force` ausführen. Alle Sitzungen werden dabei beendet (erneut anmelden).

**Auf einem neuen Webspace:** Installation nach [INSTALLATION.md](INSTALLATION.md) bis einschließlich `migrate` durchführen (kein Konto anlegen), Sicherung hochladen, Wiederherstellung ausführen – die Konten sind in der Sicherung enthalten.

Diese Wiederherstellung wird durch den automatisierten Test `BackupExportTest::test_vollstaendige_sicherung_und_wiederherstellung_inklusive_bildern` geprüft.

## Export der Sammlung

* Web: *Einstellungen › Export der Sammlung* (mit/ohne Notizen, optional Originalbilder).
* SSH: `<PHP83> artisan rezepte:sammlung-exportieren /pfad/export.zip [--ohne-notizen] [--mit-originalbildern]`

Wiederimport (fügt hinzu, Dubletten nach Quell-URL werden standardmäßig übersprungen):

* Web: *Einstellungen › Export wieder einlesen* (bis ca. 120 MB wegen Upload-Limit 128 MB)
* SSH für größere Dateien: `<PHP83> artisan rezepte:sammlung-importieren /pfad/export.zip`
