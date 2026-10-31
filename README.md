# Room Climate Card

[![HACS Custom](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://hacs.xyz)
[![Build](https://github.com/cercytrone/ha-room-climate-card/actions/workflows/build.yml/badge.svg)](https://github.com/cercytrone/ha-room-climate-card/actions/workflows/build.yml)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](LICENSE)

Eine eigenständige Lovelace-Karte für Home Assistant, die das Raumklima auf einen Blick zeigt:
Temperatur, Luftfeuchte, Fensterstatus, Bewegung, Thermostat/Heizstatus und einen **echten
Verlaufs-Chart** aus der Home-Assistant-Historie.

![Vorschau der Karte](docs/images/showcase.png)

> Das Bild oben ist eine **Design-Vorschau**, gerendert aus dem Chart-Modul der Karte mit
> **simulierten Demo-Messwerten** (`dev/`, `scripts/showcase.ts`). Es sind keine Live-Daten.
> Nach der Installation in Home Assistant zeigt die Karte ausschließlich echte Entitäts- und
> Historienwerte.

---

## Inhalt

- [Funktionen](#funktionen)
- [Installation](#installation)
  - [Über HACS als benutzerdefiniertes Repository](#über-hacs-als-benutzerdefiniertes-repository)
  - [Manuell](#manuell)
  - [Ressource prüfen / Browser-Cache leeren](#ressource-prüfen--browser-cache-leeren)
- [Schnellstart](#schnellstart)
- [Konfiguration](#konfiguration)
- [Optik](#optik)
- [Visueller Editor](#visueller-editor)
- [Verlaufs-Chart](#verlaufs-chart)
- [Kartenhöhe & responsive Darstellung](#kartenhöhe--responsive-darstellung)
- [Heizstatus: was die Karte wirklich anzeigt](#heizstatus-was-die-karte-wirklich-anzeigt)
- [Barrierefreiheit](#barrierefreiheit)
- [Fehlerbehebung](#fehlerbehebung)
- [Entwicklung](#entwicklung)
- [Tests](#tests)
- [Projektstruktur](#projektstruktur)
- [Bekannte Einschränkungen](#bekannte-einschränkungen)
- [Lizenz](#lizenz)

---

## Funktionen

| Bereich | Details |
| --- | --- |
| **Raumname** | Frei konfigurierbar, optional aus einer Entität (`name_entity`) oder dem Friendly Name des Temperatursensors, optionales Icon. Lange Namen werden zweizeilig gekürzt. |
| **Temperatur** | Der Held der Karte: 42 px, neutrales Weiß, enges Tracking (−0,035 em), Tabellenziffern. Einheit als eigene, kleinere Sekundärschrift. Schriftgröße und Schriftart im Editor frei einstellbar. |
| **Luftfeuchte** | Folgt rechtsbündig auf **derselben Grundlinie**, halb so groß (20 px). Eigene Schriftgröße und -art im Editor. Über der Zeile steht die Deklaration mit farbigem Punkt; ein Klick auf den Wert blendet die zugehörige Kurve ein und aus. |
| **Fenster** | Optional. Icon-Badge, offen = Amber-Warnung, geschlossen = neutral. Unterstützt `on/off`, `open/closed`, `tilted`, eigene Zustände. Bei Deaktivierung verschwindet das Element vollständig. |
| **Bewegung** | Optional. Dezenter Badge, aktiv = hervorgehoben, plus „Ruhe seit 12 Min.“ aus `last_changed`. |
| **Heizzeile** | Unter dem Messwert eine ruhige Textzeile: gedämpfte Flamme (Rot nur beim tatsächlichen Heizen, Grün des Verlaufs = bereit, Farbe des Soll-Werts = aus), der aktuelle Modus als Wort und die Solltemperatur – optional der HVAC-Modus statt des Statusworts. |
| **Verlauf** | Echte HA-Historie (WebSocket `history/history_during_period`, REST-Fallback), 1–168 h. Kurzer gleitender Mittelwert plus monotone Glättung, 1,9 px Linie ohne Leuchten, je ein dezenter Flächenverlauf für Temperatur und Feuchte (einzeln abschaltbar), Feuchte als feines Band im oberen Drittel, gestrichelte Soll-Referenz, drei sprechende Achsenlabels. |
| **Layout** | Automatische oder feste Höhe, konfigurierbarer Chart-Bereich, drei Dichte-Stufen, funktioniert auf Desktop, Tablet und Smartphone. |
| **Optik** | Ruhige Kachel mit 26 px Radius und Haarlinie, Lichtverlauf von oben links, ein Akzent pro Aussage – vollständig in Hell und Dunkel. |
| **Editor** | Vollständiger visueller Editor mit nativen `ha-selector`-Feldern, abhängig deaktivierten Feldern und Live-Vorschau. |
| **Robustheit** | `unavailable`/`unknown`/fehlende Entitäten, fehlende Attribute, kaputtes YAML – die Karte stürzt nicht ab. |

---

## Installation

> Dieses Projekt wird **ausschließlich als benutzerdefiniertes Repository** über HACS
> eingebunden. Es ist nicht für die Aufnahme in die HACS-Standardliste (`hacs/default`)
> vorgesehen; eine Validierung gegen die Default-Repository-Anforderungen findet nicht statt.

### Über HACS als benutzerdefiniertes Repository

1. HACS öffnen → **Dashboard** (in älteren Versionen „Frontend“).
2. Oben rechts **⋮ → Benutzerdefinierte Repositories**.
3. Repository `cercytrone/ha-room-climate-card` eintragen, Kategorie **Dashboard**, bestätigen.
4. Das Repository erscheint anschließend in der HACS-Suche: nach **Room Climate Card** suchen →
   **Herunterladen**.
5. **Ressource prüfen** (je nach HACS-Version wird sie nicht immer automatisch angelegt):
   **Einstellungen → Dashboards → ⋮ → Ressourcen**. Fehlt der Eintrag, *Ressource hinzufügen*:
   - URL: `/hacsfiles/ha-room-climate-card/ha-room-climate-card.js`
   - Typ: **JavaScript-Modul**
6. Browser-Cache leeren bzw. die Seite neu laden (siehe unten).

HACS lädt dabei die gebaute Datei `ha-room-climate-card.js` aus dem Repository (bzw. aus dem
letzten Release). Updates laufen danach ganz normal über HACS → **Dashboard → Aktualisierungen**.

### Manuell

1. Die Datei `ha-room-climate-card.js` aus dem [letzten Release](https://github.com/cercytrone/ha-room-climate-card/releases/latest)
   herunterladen.
2. Nach `config/www/` kopieren, z. B. `config/www/ha-room-climate-card.js`.
3. **Einstellungen → Dashboards → ⋮ → Ressourcen → Ressource hinzufügen**
   - URL: `/local/ha-room-climate-card.js`
   - Typ: **JavaScript-Modul**
4. Seite neu laden.

### Ressource prüfen / Browser-Cache leeren

- Nach Updates hilft ein Hard-Reload: `Strg/Cmd + Shift + R` (Desktop) bzw. Cache der
  Companion-App leeren.
- Alternativ in der Ressourcen-URL eine Versionsangabe ergänzen:
  `/hacsfiles/ha-room-climate-card/ha-room-climate-card.js?v=1.0.0`
- In der Browser-Konsole sollte beim Laden stehen:
  `ROOM-CLIMATE-CARD v2.2.0`.

---

## Schnellstart

Karte zu einem Dashboard hinzufügen → **Karte hinzufügen** → nach *Room Climate Card* suchen.
Der Editor schlägt automatisch passende Entitäten vor (Temperatur-, Feuchte-, Fenster-,
Bewegungs- und Climate-Entitäten). Alternativ per YAML:

```yaml
type: custom:room-climate-card
name: Wohnzimmer
temperature_entity: sensor.wohnzimmer_temperature
humidity_entity: sensor.wohnzimmer_humidity
window_entity: binary_sensor.wohnzimmer_fenster
motion_entity: binary_sensor.wohnzimmer_bewegung
climate_entity: climate.wohnzimmer
```

Mehr Beispiele: [examples/](examples/).

---

## Konfiguration

Alle Schlüssel sind optional. Fehlt ein Sensor, wird der zugehörige Bereich nicht gerendert.
Optionale Bereiche sind aktiv, sobald eine Entität gesetzt ist – oder explizit über
`show_*`-Schalter.

### Allgemein

| Option | Typ | Standard | Beschreibung |
| --- | --- | --- | --- |
| `name` | string | – | Raumname. Ohne Angabe wird der Friendly Name des Temperatursensors verwendet. |
| `name_entity` | entity | – | Entität, deren Friendly Name als Raumname dient (hat Vorrang vor dem Sensor-Namen). |
| `icon` | string | `mdi:home-thermometer-outline` | Raum-Icon (MDI). |
| `height` | number \| `auto` | `auto` | Feste Kartenhöhe in px (140–900) oder automatische Höhe. |
| `border_radius` | number | `18` | Eckenradius in px (0–40). |
| `theme` | `auto` \| `dark` \| `light` | `auto` | `auto` folgt dem Home-Assistant-Theme, `dark`/`light` erzwingen eine Optik. |

### Sensoren

| Option | Typ | Standard | Beschreibung |
| --- | --- | --- | --- |
| `temperature_entity` | entity | – | Temperatursensor. |
| `humidity_entity` | entity | – | Luftfeuchtesensor. |
| `temperature_decimals` | number | `1` | Dezimalstellen Temperatur (0–3). |
| `humidity_decimals` | number | `0` | Dezimalstellen Luftfeuchte (0–3). |

### Messwerte (Schrift)

Temperatur und Luftfeuchte sind die Blickfänge der Karte und lassen sich **unabhängig
voneinander** gestalten – Größe und Schriftart jeweils getrennt:

| Option | Typ | Standard | Beschreibung |
| --- | --- | --- | --- |
| `temperature_font_size` | number (px) | `42` | Schriftgröße der Temperatur (14–96). |
| `temperature_font_family` | string | Theme | CSS-Schriftart der Temperatur, z. B. `Inter` oder `"Roboto Mono", monospace`. |
| `humidity_font_size` | number (px) | `20` | Schriftgröße der Luftfeuchte (14–96). |
| `humidity_font_family` | string | Theme | CSS-Schriftart der Luftfeuchte. |
| `show_series_labels` | boolean | `true` | Beschriftungszeile über den Werten („TEMPERATUR“ / „LUFTFEUCHTE“) mit den Farbpunkten. Aus = nur die Werte, ohne Lücke. |

- Einheiten (`°C`, `%`) und das Tropfen-Icon skalieren automatisch mit ihrem eigenen Messwert.
- Bei sehr kleinen Kartenhöhen (`density-sm`/`density-xs`) werden beide Größen anteilig
  verkleinert, statt umzubrechen.
- Leere Schriftart = Schrift des Home-Assistant-Themes. Ungültige Werte (z. B. mit `;`) werden
  verworfen, damit nichts aus der CSS-Deklaration ausbricht.

### Farben: eine Akzentfarbe, eine Sekundärfarbe

| Option | Typ | Standard | Wo sie erscheint |
| --- | --- | --- | --- |
| `accent_color` | color | `#4FD1A5` (Mint) | Nur Primärgröße: Punkt über der Temperatur, Temperaturkurve, Soll-Referenzlinie |
| `humidity_color` | color | `#8B86D6` (gedämpftes Indigo) | Ausschließlich Feuchtepunkt und Feuchtekurve |
| `temperature_comfort_color` | color | – | **Veralteter Alias** für `accent_color`; wirkt nur, solange `accent_color` nicht gesetzt ist |

Eine Farbe pro Aussage: Die Akzentfarbe ist der einzige Signalton der Karte, die Sekundärfarbe
tritt nur an der Feuchte auf. Beide Werte selbst bleiben neutral – die Farbe tragen die Punkte
und die Kurven.

`temperature_cool_below/-color`, `temperature_warm_above/-color`, `temperature_hot_above/-color`,
`humidity_low_threshold/-color` und `humidity_high_threshold/-color` gibt es seit 2.0.0 nicht
mehr.

### Fenster

| Option | Typ | Standard | Beschreibung |
| --- | --- | --- | --- |
| `show_window` | boolean | automatisch | Fensterstatus anzeigen. Ohne `window_entity` ist der Bereich aus. |
| `window_entity` | entity | – | Kontaktsensor. |
| `window_open_states` | list \| string | `on, open, opening, tilted, gekippt` | Zustände, die als „offen“ gelten. |

### Bewegung

| Option | Typ | Standard | Beschreibung |
| --- | --- | --- | --- |
| `show_motion` | boolean | automatisch | Bewegungsanzeige. |
| `motion_entity` | entity | – | Bewegungsmelder. |
| `motion_show_last_changed` | boolean | `true` | „Ruhe seit …“ anzeigen (aus `last_changed`). |

### Thermostat

| Option | Typ | Standard | Beschreibung |
| --- | --- | --- | --- |
| `show_thermostat` | boolean | automatisch | Thermostatzeile anzeigen. |
| `climate_entity` | entity | – | Climate-Entität. |
| `show_climate_row` | boolean | `true` | Die gesamte Statuszeile unter dem Messwert (Flamme, Statuswort, Solltemperatur) anzeigen. Aus = die Zeile verschwindet samt Abstand. |
| `show_setpoint` | boolean | `true` | Solltemperatur in der Statuszeile anzeigen. |
| `show_hvac_status` | boolean | `true` | Flamme samt Statuswort anzeigen (Farbe = Zustand). |
| `show_hvac_mode` | boolean | `false` | Statt des Statusworts den HVAC-Modus („Automatik“) in derselben Zeile anzeigen. |
| `heating_color` | color | `#d16a62` (gedämpftes Rot) | Flammenfarbe – **nur** solange tatsächlich geheizt wird (`hvac_action: heating`). |
| `heating_idle_color` | color | Akzentfarbe (`#4FD1A5`) | Flammenfarbe beim Warten/Bereitstehen – standardmäßig exakt das Grün des Verlaufs. |
| `heating_off_color` | color | Farbe des Soll-Werts (`--rcc-muted`) | Flammenfarbe bei ausgeschaltetem oder nicht verfügbarem Thermostat. |

Das Status-Icon ersetzt eine zusätzliche Textzeile: Die Farbe trägt die Information, der
Statusname bleibt als Titel und für Screenreader (`aria-label`) erhalten.

### Verlauf

| Option | Typ | Standard | Beschreibung |
| --- | --- | --- | --- |
| `show_temperature_chart` | boolean | automatisch | Temperaturkurve anzeigen. |
| `show_humidity_chart` | boolean | automatisch | Feuchtekurve anzeigen. |
| `chart_hours` | number | `6` | Zeitraum in Stunden (1–168; Editor bietet 3/6/12/24/48). |
| `chart_height` | number | `112` | Höhe des Chart-Bereichs in px (bei automatischer Kartenhöhe). |
| `chart_curve` | `smooth` \| `linear` | `smooth` | Geglättete (überschwingungsfreie) oder direkt verbundene Linien. |
| `chart_humidity_line_style` | `solid` \| `dotted` | `solid` | Feuchtekurve durchgezogen oder **gepunktet** zeichnen. Betrifft nur die Feuchte; Fläche, Endpunkt und Farben bleiben. |
| `chart_gap_mode` | `connect` \| `break` | `connect` | Echte Ausfälle (`unavailable`/`unknown`) überbrücken oder sichtbar unterbrechen. Konstante Phasen ohne HA-Samples werden **immer** durchgehend gezeichnet. |
| `chart_max_gap_minutes` | number | `120` | Längste Ausfallzeit (Minuten), die noch überbrückt wird; längere bleiben offen. |
| `chart_gap_style` | `solid` \| `dashed` | `solid` | Überbrückte Abschnitte wie gemessene zeichnen oder gestrichelt markieren. |
| `chart_temperature_gradient` | boolean | `true` | Sanfter Farbverlauf unter der Temperaturkurve. Aus = nur die Linie. |
| `chart_humidity_gradient` | boolean | `true` | Sanfter Farbverlauf unter der Feuchtekurve, begrenzt auf deren eigenes Band. Aus = nur die Linie. |
| `chart_show_points` | boolean | `false` | Dezente Datenpunkte. |
| `chart_show_grid` | boolean | `false` | Feine gestrichelte Hilfslinien – standardmäßig aus, die Achse bleibt eine Haarlinie. |

---

## Visueller Editor

Der Editor ist in acht Abschnitte gegliedert und nutzt ausschließlich native
Home-Assistant-Selektoren (Entität, Zahl, Auswahl, Schalter, Farbe, Icon, Zustand):

| Abschnitt | Felder |
| --- | --- |
| **Allgemein** | Raumname, Name aus Entität, Icon, automatische Höhe, Kartenhöhe, Eckenradius, Darstellung |
| **Sensoren** | Temperatursensor, Luftfeuchtesensor, Dezimalstellen |
| **Messwerte (Schrift)** | Schriftgröße und Schriftart für Temperatur und Luftfeuchte – jeweils getrennt; Beschriftungszeile („TEMPERATUR“ / „LUFTFEUCHTE“) ein-/ausschaltbar |
| **Farben & Grenzwerte** | Temperaturgrenzen (kühl/warm/heiß), vier Temperaturfarben, Feuchtefarbe, Feuchte-Grenzwerte und -Farben |
| **Fenster** | Ein/Aus, Kontaktsensor, Zustände für „offen“ (State-Selector) |
| **Bewegung** | Ein/Aus, Bewegungsmelder, Ruhe-Dauer |
| **Thermostat** | Ein/Aus, Climate-Entität, Statuszeile komplett, Solltemperatur, Heizstatus (Flamme + Wort), HVAC-Modus, drei Flammenfarben (Heizen / Ruhe / aus) |
| **Verlauf** | Temperatur-/Feuchteverlauf Ein/Aus, Farbverlauf je Kurve, Zeitraum, Chart-Höhe, Kurvenverlauf, Linienart Luftfeuchte (durchgezogen/gepunktet), Ausfälle (überbrücken/unterbrechen), maximale Ausfallzeit, Stil überbrückter Abschnitte, Gitter, Datenpunkte |

Zahlen- und Textfelder arbeiten mit einem lokalen Entwurf: Ein Feld darf leer sein, ohne dass
die Konfiguration verändert wird. Erst ein vollständiger, gültiger Wert wird übernommen –
dadurch springt der Schalter „Höhe automatisch“ nicht mehr um, wenn das Höhenfeld beim Tippen
kurz leer ist, und Felder lassen sich vollständig leeren.

Nicht benötigte Felder werden automatisch deaktiviert (z. B. Farben ohne Thermostat,
Chart-Optionen ohne aktive Kurve). Jede Änderung löst sofort `config-changed` aus; die
Konfiguration bleibt beim erneuten Öffnen vollständig erhalten. Unbekannte Schlüssel aus
YAML bleiben unangetastet.

---

## Optik

Die Karte folgt dem modernen Layout der Wetterkarte aus dem eigenen Dashboard:

- **Tiefe statt Rahmen:** 26 px Radius, 1 px Haarlinie bei 7 % Weiß und ein kaum sichtbarer
  Lichtverlauf von oben links. Die Fläche ist `#0E1013` – OLED-freundlich, aber kein
  Reinschwarz.
- **Nur ein großer Wert:** Temperatur 42 px in neutralem Weiß mit −0,035 em Tracking wird der
  Held; die Luftfeuchte steht rechtsbündig auf derselben Grundlinie bei 20 px.
- **Ein 4-px-Raster:** 20 px Innenabstand rundum, alle Abstände in 4-px-Schritten, eine
  gemeinsame optische Kante für Titel, Werte und Verlauf.
- **Tabellenziffern:** `tnum` plus negatives Tracking – der große Wert springt bei
  Aktualisierungen nicht mehr. Einheiten sind eigene, kleinere Sekundärschrift, Labels stehen
  in Versalien mit 0,09 em Laufweite.
- **Ruhiger Verlauf:** kurzer gleitender Mittelwert (3–5 Punkte) plus monotone Glättung,
  1,9 px Linie ohne Leuchten, je ein sehr dezenter Flächenverlauf für beide Kurven; die Feuchte
  bekommt ein eigenes Band im oberen Drittel, statt die Temperaturkurve zu kreuzen.
- **Reduzierte Achse:** eine Haarlinie als Basis, drei Labels in 10,5 px bei 32 % Deckkraft –
  „Sa 05:40 · So 05:40 · Jetzt“.
- **Hell und dunkel:** beide Varianten sind vollständig ausgestaltet und respektieren
  `theme: auto` (HA-Theme).

Alle Farben lassen sich über die vorhandenen Farboptionen bzw. HA-Theme-Variablen
(`--ha-card-background`, `--primary-text-color`, `--divider-color`) überschreiben.

## Verlaufs-Chart

- **Datenquelle:** `connection.sendMessagePromise({ type: 'history/history_during_period', … })`
  – der dokumentierte Weg des Home-Assistant-Frontends. Schlägt er fehl (ältere Version,
  Berechtigungen), wird die authentifizierte REST-Route
  `history/period/<start>?filter_entity_id=…&end_time=…&minimal_response&no_attributes`
  verwendet.
- **Caching:** Antworten werden 2 Minuten pro Entität + Zeitraum im Speicher gehalten; ein
  Karten-Resize oder Theme-Wechsel erzeugt keine neuen Requests. Aktualisierung alle 5 Minuten
  und sofort, wenn die Verbindung zurückkehrt.
- **Aufbereitung:** Nur nicht numerische Zustände (`unavailable`, `unknown`, Text) sind eine
  echte Lücke. Fehlende Zeilen zwischen zwei Messwerten bedeuten dagegen „Wert unverändert“
  (HA schreibt nur Änderungen). Samples außerhalb des Zeitfensters werden verworfen, Dubletten
  zusammengefasst – so entstehen keine Spitzen oder Flächen an den Rändern.
- **Konstante Phasen:** Home Assistant speichert nur Zustands*änderungen*. Bleibt ein Wert
  stundenlang gleich (nachts häufig), gibt es **keine** Samples – das ist aber keine fehlende
  Messung, sondern eine bekannte Konstante. Solche Stellen werden immer linear und durchgezogen
  gezeichnet, wie in der HA-eigenen Chart. Ein `max_gap_minutes`-Limit gilt hier bewusst nicht.
- **Echte Ausfälle:** `unavailable`/`unknown` sind echte Information. Ausfälle bis
  `chart_max_gap_minutes` werden überbrückt (`chart_gap_style: solid`, Standard; optional
  `dashed`), längere bleiben sichtbar offen. Es werden keine Stunden erfunden.
- **Kanten:** Der erste und letzte Messwert werden bis an die Fensterkanten gehalten, weil ein
  HA-Zustand bis zur nächsten Änderung gilt; Samples außerhalb des Fensters (z. B. aus
  `include_start_time_state`) werden verworfen, Dubletten zusammengefasst.
- **Fläche:** Alle Teilflächen einer Reihe liegen in einem einzigen `<path>` – so kann der
  Farbverlauf an einer echten Unterbrechung keine Naht zeigen. Jede Reihe hat ihren eigenen
  Verlauf; der der Feuchte endet exakt an der Unterkante ihres Bandes und läuft nie in die
  Temperaturhälfte. Beide Verläufe lassen sich im Editor einzeln abschalten
  (`chart_temperature_gradient`, `chart_humidity_gradient`).
- **Linienart der Feuchte:** Mit `chart_humidity_line_style: dotted` wird die Feuchtekurve als
  Punktreihe gezeichnet (`stroke-dasharray: 0.1 5.5` mit runden Kappen, dadurch echte runde
  Punkte in jedem Browser). Die Temperaturkurve, die Flächen, der Endpunkt und die Farben
  bleiben unverändert.
- **Glättung:** Zwei milde Stufen. Ein kurzer zentrierter Mittelwert (3 Punkte, bei dichten
  Reihen 5 – nicht mehr 7/9) nimmt das Sensor-Zittern, danach interpoliert eine monotone
  kubische Kurve (Fritsch–Carlson), die nicht überschwingt und innerhalb der Messwerte bleibt.
  Die erste Fassung glättete zu stark und bügelte echte Ausschläge platt; die aktuelle Fenster-
  breite ist der Mittelweg: ruhig, aber in der Form noch klar die Messung.
- **Farben:** Beide Kurven nutzen einen vertikalen Verlauf, der exakt an ihrem Band ausgerichtet
  ist. Die Temperaturfläche blendet von 22 % über 8 % auf 0 % Deckkraft aus, die Feuchtefläche
  entsprechend ruhiger von 18 % über 6 % auf 0 % – dieselbe Bauart, aber sichtbar leiser, damit
  sie die Temperatur nie überstrahlt. Die Feuchtekurve behält ihre eigene Farbe.
- **Skalierung:** Beide Reihen werden unabhängig skaliert, damit unterschiedliche Wertebereiche
  lesbar bleiben – die Feuchte lebt im oberen Drittel, die Temperatur in der unteren Hälfte.
  Die beiden Kurven kreuzen sich dadurch nie.
- **Responsiv:** Die Chart zeichnet neu auf Basis der gemessenen Pixelgröße
  (`ResizeObserver`), Achsenbeschriftungen entfallen bei zu wenig Platz, unter
  40 × 34 px wird nichts gezeichnet statt zu verzerren. Die Zeitbeschriftung wird um den
  Karten-Eckenradius eingerückt, damit erstes und letztes Label nicht im abgerundeten Eck
  verschwinden.
- **Fallbacks:** Ladezustand („Verlauf wird geladen …“), leerer Zeitraum („Keine
  Verlaufsdaten“) und Fehler („Verlauf konnte nicht geladen werden“).

---

## Kartenhöhe & responsive Darstellung

- `height: auto` (Standard): Die Karte wächst mit ihrem Inhalt; `chart_height` bestimmt die
  Höhe des Diagramms.
- `height: 240` (o. ä.): Die Karte nutzt genau diese Höhe. Kopfbereich und Messwerte bleiben
  immer sichtbar, der Chart-Bereich nimmt den verbleibenden Platz ein.
- Drei Dichte-Stufen passen Schriftgrößen, Abstände und Badges an:
  - `< 168 px` kompakt (kleinere Messwerte, keine Ruhe-Dauer),
  - `< 232 px` reduziert,
  - darüber voll.
- `getGridOptions()` liefert sinnvolle Werte für das Sections-Layout (6 Spalten,
  Mindestbreite 4, Höhe abhängig von der Konfiguration).

---

## Heizstatus: was die Karte wirklich anzeigt

Die Heizzeile steht unter dem Messwert und ist bewusst reiner Text: Flamme, Statuswort und
Solltemperatur auf einer Linie („🔥 Heizt · Soll 22,0 °C“). Keine Badges, keine Grundlinien-
Tricks – eine Zeile, eine Schriftgröße, alles auf dem 4-px-Raster.

Die Flamme ist das einzige farbige Element der Zeile – und deshalb bewusst gedämpft: kein
Signalrot, sondern ein zurückgenommenes Rot, das Grün des Verlaufs und die Textfarbe des
Soll-Werts. Nur der Zustand färbt, alles andere bleibt in der ruhigen Palette:

| Icon | Bedeutung | Bedingung | Farbe |
| --- | --- | --- | --- |
| Flamme | Heizt | `hvac_action == heating` | gedämpftes Rot `#d16a62` |
| Flamme | **Bereit** (aktiv, keine Heizanforderung) | `hvac_action == idle` | Grün des Verlaufs (Akzent) |
| Flamme | Aus | HVAC-Modus `off` oder `hvac_action == off` | Farbe des Soll-Werts (`--rcc-muted`) |
| Schneeflocke / Ventilator / Tropfen | Kühlt / Lüftet / Trocknet | entsprechender `hvac_action` | Grün des Verlaufs – **nie** Rot |
| Flamme | Status unbekannt | Modus ist aktiv, aber die Entität liefert **kein** `hvac_action` | Farbe des Soll-Werts (`--rcc-muted`) |

Ein eingeschaltetes Thermostat gilt bewusst **nicht** als „Heizt“. Fehlt `hvac_action`, bleibt
die Flamme neutral und es steht „Status unbekannt“ da, statt einen Zustand zu erfinden.
Kühlen, Lüften und Trocknen sind ebenfalls kein Heizen und tragen deshalb nie Rot.

Beispiel:

```yaml
type: custom:room-climate-card
climate_entity: climate.wohnzimmer
show_setpoint: true
show_hvac_status: true
heating_color: '#d16a62'        # gedämpftes Rot, nur wenn wirklich geheizt wird
heating_idle_color: '#4FD1A5'   # Grün des Verlaufs, wenn das Thermostat nur bereitsteht
heating_off_color: '#94a3b8'    # Farbe des Soll-Werts, wenn ausgeschaltet ist
```

---

## Barrierefreiheit

- Messwerte melden sich als „Temperatur: 21,8 °C“ bzw. „Luftfeuchte: 50 %“.
- Jeder Messwert ist ein `<button>` mit `aria-pressed`, sobald seine Kurve gezeichnet wird:
  Ein Klick blendet die Serie aus, ein zweiter wieder ein. Das Tap-Ziel ist mindestens 36 px
  hoch, der Fokusring ist sichtbar.
- Die Heizzeile hat `role="status"` und benennt den Zustand im `aria-label` („Heizt“,
  „Bereit“, „Aus“, „Status unbekannt“); die Flamme selbst ist `aria-hidden`.
- Fenster- und Bewegungs-Badges haben `role="img"` plus sprechende `aria-label`
  („Fenster offen“, „Keine Bewegung“, „Nicht verfügbar“).
- Der Chart hat `role="img"` und eine Beschreibung inklusive Zeitraum.
- Statusfarben werden immer durch Text bzw. Icon ergänzt (Farbe ist nie die einzige Information).
- Animationen respektieren `prefers-reduced-motion`.
- Der Editor ist per Tastatur bedienbar (`details`/`summary` mit Fokus-Ring).

---

## Fehlerbehebung

| Problem | Ursache / Lösung |
| --- | --- |
| „Custom element doesn't exist: room-climate-card“ | Ressource fehlt oder wurde als *JavaScript-Modul* nicht registriert. URL prüfen, Typ auf „JavaScript-Modul“ stellen, Seite neu laden. |
| Karte zeigt „–“ | Entität ist `unavailable`/`unknown` oder liefert keinen numerischen Zustand. In *Entwicklerwerkzeuge → Zustände* prüfen. |
| Kein Verlaufsdatum | Der Recorder ist deaktiviert, die Entität wird nicht aufgezeichnet, oder der Zeitraum liegt vor dem Retention-Zeitfenster (`recorder: purge_keep_days`). |
| Chart zeigt Lücken | Echter Ausfall (`unavailable`/`unknown`) länger als `chart_max_gap_minutes` – oder bewusst `chart_gap_mode: break`. Konstante Phasen brechen die Linie nie. |
| Chart zeigt Aussetzer, HA-Chart nicht | Seit 1.1.2 behoben: früher galten konstante Phasen als Datenlücke. Prüfen, ob die Ressource wirklich auf 1.1.2 zeigt. |
| Linie wirkt an einer Stelle „gerade“ | Dort wurde ein kurzer Ausfall überbrückt (Standard: durchgezogen). Mit `chart_gap_style: dashed` wird der Abschnitt als überbrückt markiert. |
| Thermostat-Icon bleibt grau/gestrichelt | Die Integration liefert kein `hvac_action`. Bewusst kein erfundenes „Heizt“ – der Tooltip nennt den Grund. |
| Icon-Farbe passt nicht | `heating_color`, `heating_idle_color`, `heating_off_color` im Editor setzen. |
| Feld im Editor lässt sich nicht leeren / Schalter springt um | Behoben in 1.1.3: Eingaben sind jetzt Entwürfe, leere Zwischenstände ändern die Konfiguration nicht. |
| Änderungen im Editor erscheinen nicht | Browser-Cache: Hard-Reload; Versionsparameter an der Ressourcen-URL ergänzen. |
| Karte nach Update unverändert | HACS-Update durchführen, danach HA-Frontend neu laden und Browser-Cache leeren. |

Debug-Ausgaben: Die Karte loggt bewusst nur ihre Version in der Browser-Konsole. Für die
Fehlersuche ist die Konfiguration der Karte (Dashboard → Karte bearbeiten → YAML anzeigen) und
der Zustand der Entität unter *Entwicklerwerkzeuge → Zustände* maßgeblich.

---

## Entwicklung

Voraussetzungen: Node.js ≥ 20.

```bash
npm install
npm run dev        # Entwicklungsumgebung mit simulierten Testdaten (http://localhost:5173)
npm run typecheck  # TypeScript
npm test           # Vitest (jsdom)
npm run build      # erzeugt dist/ha-room-climate-card.js (+ Sourcemap)
npm run showcase   # rendert docs/images/showcase.{svg,png} neu
```

Die Entwicklungsumgebung in `dev/` ist ein reiner Mock: `dev/mock-hass.ts` erzeugt
Entitäten und Historien, `dev/mock-elements.ts` ersetzt `ha-icon`/`ha-selector`. Diese Dateien
landen **nicht** im Bundle. Die Demo-Seite trägt einen sichtbaren Hinweis „DEMO – simulierte
Testdaten“, und der Mock wirft bei echten API-Aufrufen einen Fehler.

---

## Tests

`npm test` führt 249 Tests in 11 Dateien aus (Stand 2.2.0):

| Datei | Prüft unter anderem |
| --- | --- |
| `tests/config.test.ts` | Standardwerte, kaputte Eingaben, optionale Bereiche, Grenzwerte, Namensauflösung, Schriftgrößen-Clamping und Schriftart-Validierung |
| `tests/states.test.ts` | Sensor-/Fenster-/Bewegungs-/Thermostat-Auswertung inkl. `unavailable`, `unknown`, fehlendem `hvac_action` |
| `tests/history.test.ts` | WebSocket- und REST-Parsing, Lücken, Sortierung, Caching, parallele Requests, Fehler |
| `tests/geometry.test.ts` | Skalen, Aufbereitung/Clipping, Ausfall-Erkennung, Interpolation überbrückter Abschnitte, Kantenverlängerung, Aufteilen an Brücken, Pfade, Überschwingfreiheit, Farbverläufe, Achsen, Dezimierung |
| `tests/chart.test.ts` | Leer-/Lade-/Fehlerzustand, gepunktete Feuchtekurve, SVG-Größe, Resize ohne Verzerrung, durchgehende Linie bei konstanten Phasen und kurzen Ausfällen, `break`-Modus, maximale Brücke, eine Fläche trotz echtem Loch, gestrichelte Brücken, Label-Abstand zu den Ecken, Soll-Referenzlinie, Feuchteband, Serien-Ausblendung, Achsenbeschriftung, Punkte, Gitter |
| `tests/card.test.ts` | Rendering, Formatierung, Akzent-/Sekundärfarbe, unabhängige Schriftgrößen/-arten je Messwert, 4-px-Raster, Heizzeile (rot/grün/grau/unbekannt), Klick-Toggle der Serien, alle optionalen Bereiche an/aus, Höhe/Dichte, Historien-Laden, Fehlerfälle, Aufräumen der Observer |
| `tests/editor.test.ts` | Abschnitte, Selektoren (inkl. Linienart Feuchte), Werte, `config-changed`, deaktivierte Felder, Persistenz, getrennte Typografie-Felder, Entwürfe für leere/unvollständige Eingaben, Farb-/Zahlen-Konvertierung, EN-Lokalisierung |
| `tests/registration.test.ts` | Custom-Element-Registrierung, Karten-Picker, `getConfigElement`, `getStubConfig` |
| `tests/demo.test.ts` | Demo-Szenarien rendern, Testdaten klar gekennzeichnet, keine echten API-Aufrufe |
| `tests/dev-playground.test.ts` | Entwicklungsumgebung inkl. Editor↔Vorschau-Verdrahtung |
| `tests/version.test.ts` | Release-Metadaten: CHANGELOG streng absteigend, Kopf = `package.json`, Version im Bundle und in der README |

---

## Projektstruktur

```
src/
  main.ts                  Registrierung von Karte, Editor und Karten-Picker-Eintrag
  room-climate-card.ts     Die Lovelace-Karte (Layout, Statuslogik, Lifecycle)
  config.ts                Typen, Normalisierung, Standardwerte, Farbbänder
  const.ts                 Konstanten (Tags, Intervalle, Cache-Zeiten)
  localize.ts              DE/EN-Texte
  types.ts                 Minimale HA-Typen
  data/states.ts           Auswertung von Sensoren, Fenster, Bewegung, Thermostat
  data/history.ts          History-Abfrage (WebSocket + REST) und Cache
  chart/geometry.ts        Reine Geometrie: Skalen, Pfade, Lücken, Verläufe
  chart/climate-chart.ts   Chart-Web-Component (SVG, ResizeObserver)
  editor/room-climate-editor.ts  Visueller Editor (ha-selector)
  ui/icons.ts              Inline-SVG-Icons
  utils/format.ts          Zahlen-/Zeitformatierung, Farb-Helfer
dev/                       Entwicklungsumgebung mit MOCK-Daten (nicht im Bundle)
tests/                     Vitest-Tests
scripts/                   Showcase-Renderer (SVG/PNG für die README)
dist/                      Gebautes Bundle (HACS-Download)
```

---

## Bekannte Einschränkungen

- Es gibt **keine** interaktive Bedienung des Thermostats (kein Sollwert-Schieber). Die Karte
  ist eine Anzeige; zum Ändern die Climate-Karte von Home Assistant verwenden.
- Die Historie wird über die bestehende HA-Verbindung geladen; ohne Recorder-Daten bleibt der
  Chart leer (mit Hinweistext).
- Bei sehr hohen Punktzahlen (24 h mit sekündlicher Aktualisierung) wird für die Darstellung
  dezimiert – die Kurve entspricht dann einer Stichprobe, nicht jedem Einzelwert.
- HACS-Einbindung bewusst nur als *benutzerdefiniertes Repository*; eine Aufnahme in
  `hacs/default` ist nicht vorgesehen und wird nicht angestrebt.
- Die README-Vorschau ist gerendert (Demo-Daten), kein Screenshot einer echten Installation.

---

## Lizenz

[GNU General Public License v3.0](LICENSE).
