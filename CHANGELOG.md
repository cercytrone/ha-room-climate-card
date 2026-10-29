# Changelog

Alle nennenswerten Änderungen an diesem Projekt. Format orientiert sich an
[Keep a Changelog](https://keepachangelog.com/de/1.1.0/), Versionierung nach
[Semantic Versioning](https://semver.org/lang/de/).

## [1.2.0] – 2026-10-29

### Geändert

- **Neue Optik nach dem modernen Layout der Dashboard-Wetterkarte:** flächiger Verlauf
  (Blau → Indigo im Dunkelmodus, Weiß → kühles Grau im Hellmodus), zwei radiale Farbschleier,
  eingesetzte Hairline über dem Verlauf, weichere Schatten mit innerem Lichtreflex.
- **Badges als Kacheln:** transluzente Fläche, farbiger Ring und dezenter Glow statt dünner
  Rahmen – Fenster offen (Amber), Bewegung erkannt (Mint), inaktiv neutral.
- **Typografie:** Raumname größer und halbfett, Isttemperatur standardmäßig **42 px**
  (vorher ≈ 30 px), Luftfeuchte **28 px** (vorher ≈ 21 px), Einheiten und Tropfen-Icon
  skalieren in `em` mit.
- **Verlauf:** 2,1 px Linie, etwas kräftigere Verlaufsfläche, Halo-Punkt am aktuellen Wert,
  feineres Gitter, weitere Laufweite bei den Zeitlabels.

### Hinzugefügt

- **Messwerte unabhängig gestaltbar:** `temperature_font_size`, `temperature_font_family`,
  `humidity_font_size`, `humidity_font_family` (14–96 px bzw. freie CSS-Schriftartliste).
  Eigener Editor-Abschnitt **Messwerte (Schrift)** mit je zwei Feldern pro Messwert.
- Schriftarten werden validiert (keine `;`/Klammern-Ausbrüche), leere Werte erben die
  Theme-Schrift; die Kartenhöhe wächst mit der gewählten Schriftgröße.
- README: neuer Abschnitt **Optik**, Optionstabelle für die Messwerte, Beispiele ergänzt.

## [1.1.2] – 2026-10-29

### Behoben

- **Kurvenaussetzer im Verlauf (Ursache gefunden):** 1.1.1 hat „seit N Minuten kein Sample“ als
  fehlende Messung gewertet. Home Assistant schreibt aber nur Zustands*änderungen* – bleibt die
  Temperatur nachts stundenlang konstant, gibt es korrekt keine Zeilen. Diese Stellen wurden
  deshalb fälschlich interpoliert oder abgerissen. Neue Regel: **ein fehlendes Sample bedeutet
  „Wert unverändert“ und bricht die Linie nie** (wie im HA-Frontend). Nur ein expliziter
  `unavailable`/`unknown`-Abschnitt ist eine echte Lücke und wird ab
  `chart_max_gap_minutes` sichtbar unterbrochen.
- **Flächen-/Spitzen-Artefakte am Rand („Aussetzer unten“):** Live-History liefert durch
  `include_start_time_state`, späte REST-Antworten oder veralteten Cache auch Samples außerhalb
  des Zeitfensters. Diese wurden bisher mitprojiziert (`y < 0`, `x < 0`) und erschienen als
  Zacken und als große Fläche unter der Kurve. Neue Funktion `prepareSamples()` sortiert,
  entfernt Dubletten-Zeitstempel, verwirft nicht-numerische Werte und schneidet exakt auf das
  Fenster zu, bevor Geometrie entsteht.
- **Nähte im Farbverlauf:** Alle Teilflächen einer Reihe werden jetzt als **ein** `<path>` mit
  mehreren Subpfaden gerendert. Auch bei einer echten Unterbrechung kann der Gradient dadurch
  keine sichtbare Kante mehr zeigen.

### Geändert

- Editor-Texte präzisiert: „Kurze Ausfälle überbrücken“ / „Ausfälle sichtbar unterbrechen“,
  „Maximal überbrückte Ausfallzeit“; der Hilfetext erklärt, dass konstante Phasen immer
  durchgehend gezeichnet werden.
- README: Abschnitt „Datenaufbereitung“ neu strukturiert (konstante Phasen, echte Ausfälle,
  Kanten, Fläche) und Fehlerbehebungstabelle ergänzt.

## [1.1.1] – 2026-10-28

### Behoben

- **Zeitleiste an den Kartenrändern:** Das erste und das letzte Zeitlabel lagen im Bereich der
  abgerundeten Ecken und wurden abgeschnitten. Die Beschriftung wird jetzt um den Eckenradius
  eingerückt, die Grundlinie sitzt 5 px über der Unterkante (Platz für Unterlängen), und die
  Karte hat 2 px Bodenfreiheit. Die Kurven selbst laufen weiterhin randlos.
- **Unterbrochene Kurven und Gradienten:** Home Assistant speichert nur Zustandsänderungen,
  deshalb entstehen auch bei konstanten Werten Lücken. Diese werden jetzt standardmäßig linear
  interpoliert (durchgezogene Linie) und die Fläche wird pro Segment am Stück gefüllt – keine
  vertikalen Schnitte im Farbverlauf mehr.
  - Lücken bis `chart_max_gap_minutes` (Standard 120) werden überbrückt, längere bleiben offen.
  - Erster und letzter Messwert werden bis an die Fensterkanten gehalten (ein HA-Zustand gilt
    bis zur nächsten Änderung) – keine 10–20 px fehlende Kurve mehr am Rand.
  - Die Lückenerkennung richtet sich nach dem Median-Meldeintervall mit sinnvoller Untergrenze
    statt nach einer festen 3-Minuten-Grenze.

### Hinzugefügt

- Optionen `chart_gap_mode` (`connect`/`break`), `chart_max_gap_minutes` und `chart_gap_style`
  (`solid`/`dashed`) inklusive Editor-Feldern.

## [1.1.0] – 2026-10-28

### Geändert

- **Solltemperatur steht jetzt über der Isttemperatur** (eigene Zeile direkt unter dem Raumnamen)
  statt unterhalb der Messwerte.
- **Heizstatus nur noch als farbiges Icon** vor der Solltemperatur: Flamme rot = heizt,
  grün = ruht, grau = aus, grau mit gestricheltem Rahmen = Status unbekannt. Die bisherige
  Text-Pill entfällt; der Statusname bleibt als Tooltip und `aria-label` erhalten.
- **Neue Standardfarben** für das Status-Icon: `heating_color` `#ef4444` (rot),
  `heating_idle_color` `#34d399` (grün), `heating_off_color` `#64748b` (grau).
- **Luftfeuchte größer dargestellt** (1,3 rem statt 0,9 rem, mit größerem Tropfen-Icon und
  Einheit) – bleibt aber deutlich kleiner als die Temperatur (1,85 rem).
- Editor-Labels für den Thermostat-Abschnitt präzisiert (Icon-Farben, Solltemperatur über Istwert).
- HACS-Einbindung ist bewusst **nur als benutzerdefiniertes Repository** (Kategorie *Dashboard*)
  dokumentiert; die Installationsanleitung weist darauf hin, die Frontend-Ressource nach dem
  Download zu prüfen.

### Entfernt

- GitHub-Workflow `HACS validation` (`.github/workflows/hacs.yml`). Er prüfte ausschließlich die
  Anforderungen für HACS-Default-Repositories und schlug daher ohne Repository-Topics fehl. Die
  Workflows *Build & Test* und *Release* bleiben unverändert.

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
