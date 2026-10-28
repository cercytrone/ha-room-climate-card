# Changelog

Alle nennenswerten Änderungen an diesem Projekt. Format orientiert sich an
[Keep a Changelog](https://keepachangelog.com/de/1.1.0/), Versionierung nach
[Semantic Versioning](https://semver.org/lang/de/).

## [1.0.0] – 2026-10-28

Erste stabile Version.

### Hinzugefügt

- Lovelace-Karte `custom:room-climate-card` als Lit-Web-Component mit TypeScript.
- Raumname inkl. optionaler Übernahme aus einer Entität und MDI-Icon.
- Temperatur- und Luftfeuchteanzeige mit Einheiten aus der Entität, konfigurierbaren
  Dezimalstellen und Farbcodierung nach vier Temperaturbereichen.
- Optionale Fensterstatus-Anzeige mit konfigurierbaren Offen-Zuständen.
- Optionale Bewegungsanzeige inklusive „Ruhe seit …“ aus `last_changed`.
- Optionale Thermostatzeile mit Solltemperatur, HVAC-Modus und ehrlichem Heizstatus
  (`hvac_action`-basiert, „Status unbekannt“ statt geratener Zustände).
- Echter Verlaufs-Chart auf Basis von `history/history_during_period` (REST-Fallback),
  mit Caching, Datenlücken-Erkennung, überschwingungsfreier Glättung, Farbverläufen nach
  Temperaturbändern, Achsenbeschriftung, Legende, Gitternetz und Datenpunkten.
- Automatische oder feste Kartenhöhe mit drei Dichte-Stufen und separat konfigurierbarer
  Chart-Höhe.
- Vollständiger visueller Editor mit nativen `ha-selector`-Feldern, abhängig deaktivierten
  Feldern und Live-Vorschau.
- Barrierefreiheits-Features (ARIA-Labels, reduzierte Bewegung, Tastaturbedienung im Editor).
- Entwicklungsumgebung mit klar gekennzeichneten Testdaten, Showcase-Renderer für die README.
- 156 automatisierte Tests (Vitest/jsdom), Typecheck und Produktionsbuild.
- GitHub-Actions-Workflows für Build/Test und Release, HACS-Validierung.
