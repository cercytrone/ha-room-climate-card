# Changelog

Alle nennenswerten Änderungen an diesem Projekt. Format orientiert sich an
[Keep a Changelog](https://keepachangelog.com/de/1.1.0/), Versionierung nach
[Semantic Versioning](https://semver.org/lang/de/).

## [2.1.1] – 2026-10-30

### Geändert

- **Gedämpfte Flamme, Rot nur beim echten Heizen.** Die Flamme ist jetzt das einzige farbige
  Element der Zeile, also färbt sie leiser:
  - **Heizen** (`hvac_action: heating`): gedämpftes Rot `#d16a62` statt des grellen `#ef4444`.
  - **Bereit / Warten** (`hvac_action: idle`): das Grün des Verlaufs, also die Akzentfarbe
    (standardmäßig `#4FD1A5`). Ändert man `accent_color`, wandert das Grün automatisch mit;
    `heating_idle_color` überschreibt es weiterhin.
  - **Aus / nicht verfügbar / Status unbekannt**: exakt die Farbe des Soll-Werts
    (`--rcc-muted`), also dieselbe gedämpfte Textfarbe wie das Wort daneben.
  - **Kühlen, Lüften, Trocknen**: Grün des Verlaufs – Rot bleibt ausschließlich einer echten
    Heizanforderung vorbehalten.
- Die zusätzliche Abdunklung (Opacity 0,5) für unbekannte Zustände entfällt, weil die Farbe
  schon gedämpft ist – das winzige Icon war sonst im dunklen Theme kaum noch zu sehen.
- Die Farbwähler im Editor zeigen konkrete Vorschaufarben (Rot/Grün/Grau) und schreiben erst
  beim Anfassen einen Wert in die Konfiguration; unberührt bleiben die Theme-Token aktiv.
- Editor-Beschriftungen benennen die Zustände jetzt genauer („nur bei aktiver
  Heizanforderung“, „Standard: Grün des Verlaufs“, „Standard: Farbe des Soll-Werts“).

## [2.1.0] – 2026-10-30

### Hinzugefügt

- **Beschriftungszeile abschaltbar:** `show_series_labels: false` blendet „TEMPERATUR“ /
  „LUFTFEUCHTE“ samt Farbpunkten aus. Die Werte bleiben an ihrem Platz (kein Sprung), nur der
  obere Abstand wird um 4 px reduziert. Im visuellen Editor unter **Messwerte (Schrift)**.
- **Statuszeile abschaltbar:** `show_climate_row: false` entfernt die komplette Zeile
  (Flamme, Statuswort, Solltemperatur) inklusive ihres Abstands. Die drei Unteroptionen
  (`show_setpoint`, `show_hvac_status`, `show_hvac_mode`) sind im Editor deaktiviert, solange
  die Zeile aus ist. Auch die Kartenhöhe reserviert dann keinen Platz mehr.

### Geändert

- **Fenster- und Bewegungsicon minimal kleiner:** 15 px statt 16 px (Dichte `xs`: 12 statt
  13 px). Die Badge-Kachel bleibt 28 px groß, das Tap-Ziel ändert sich also nicht.
- **Kräftigerer Temperaturverlauf:** Der Flächenverlauf startet bei 22 % statt 16 % Deckkraft
  (Mitte 8 % statt 5 %, unten weiterhin transparent) – sichtbarer, aber weiterhin eine ruhige
  Fläche und kein Farbblock.

## [2.0.1] – 2026-10-30

### Geändert

- **Heizstatus in der Farbe der Solltemperatur:** Das Statuswort („Heizt“, „Bereit“, „Aus“)
  bzw. der HVAC-Modus („Automatik“) stand in voller Textfarbe und zog den Blick von der
  Primärgröße ab. Statuswort und Sollwert teilen sich jetzt dieselbe gedämpfte Textfarbe – die
  Zeile ist ein zusammenhängender Kontext, Farbe trägt nur die Flamme.
- **Kleinere Serien-Labels:** „TEMPERATUR“ und „LUFTFEUCHTE“ über den Werten waren 10,5 px groß
  und damit fast so präsent wie der Kontext. Sie stehen jetzt bei 9,5 px; die 0,09 em
  Laufweite bleibt, damit die Versalien lesbar bleiben.

## [2.0.0] – 2026-10-30

Komplettes Redesign der Kartenoptik. Die Karte ist ruhiger, strenger gerastert und zeigt
weniger gleichzeitig. **Breaking:** mehrere Farb- und Grenzwert-Optionen entfallen.

### Geändert

- **Eine Akzentfarbe statt vier Bandfarben.** Mint (`#4FD1A5`) ist der einzige Signalton und
  markiert nur die Primärgröße: Punkt am Messwert, Temperaturkurve, Soll-Referenzlinie. Die
  Luftfeuchte bekommt ein zurückgenommenes Indigo (`#8B86D6`), das ausschließlich in Punkt und
  Kurve auftaucht. Beide Farben bleiben im visuellen Editor anpassbar (`accent_color`,
  `humidity_color`); `temperature_comfort_color` wirkt als veralteter Alias weiter.
- **Nur ein Wert ist groß.** Die Temperatur ist der Held (42 px, neutrales Weiß, −0,035 em
  Tracking), die Luftfeuchte folgt rechtsbündig auf derselben Grundlinie bei 20 px. Beide
  Größen bleiben im Editor getrennt einstellbar.
- **Legendenzeile ersatzlos gestrichen.** Der farbige Punkt wandert direkt an den Messwert:
  über der Zahl steht die Deklaration („TEMPERATUR“, „LUFTFEUCHTE“) mit ihrem Punkt. Ein Klick
  auf den Wert blendet die zugehörige Serie aus und wieder ein (`aria-pressed`).
- **Heizzeile statt Badges.** Unter dem Messwert steht eine Zeile mit Flamme, aktuellem Modus
  („Heizt“ / „Bereit“ / „Aus“) und Solltemperatur. `hvac_action: idle` heißt jetzt „Bereit“
  statt „Ruht“.
- **Ein Raster für alles.** 20 px Innenabstand rundum, alle Abstände in 4-px-Schritten, eine
  gemeinsame optische Kante für Titel, Werte und Verlauf. Der Titel sitzt nicht mehr weiter
  links als die Werte.
- **Kurve entrauscht.** Gleitender Mittelwert (`movingAverage`, Fenster 3–9 Samples, zentriert)
  plus monotone Glättung, 1,9 px Linie ohne Leuchten, ein einziger dezenter Flächenverlauf.
  Die Luftfeuchte bekommt ein eigenes Band im oberen Drittel und kreuzt die Temperaturkurve
  nicht mehr; ihre Fläche entfällt.
- **Sollwert in der Kurve.** Eine dezent gestrichelte Referenzlinie mit Mini-Label „SOLL“
  zeigt, wie weit der Raum vom Ziel entfernt ist; der Zielwert fließt in die Skalierung ein.
- **Achse auf das Nötige gekürzt.** Eine Haarlinie als Basis, drei Labels in 10,5 px bei 32 %
  Deckkraft, sprechend statt kryptisch („Sa 05:40 · So 05:40 · Jetzt“). Die gestrichelten
  Hilfslinien sind jetzt standardmäßig **aus** (`chart_show_grid: true` schaltet sie ein).
- **Tiefe statt Rahmen.** 26 px Radius, 1 px Haarlinie bei 7 % Weiß, kaum sichtbarer
  Lichtverlauf von oben links, Fläche `#0E1013` (OLED-freundlich, kein Reinschwarz).
- **Zahlen, die nicht zappeln.** Tabellenziffern (`tnum`), negatives Tracking für große Zahlen,
  Einheiten als eigenständige kleinere Sekundärschrift, Labels in Versalien mit 0,09 em
  Laufweite.
- Standard-Chart-Höhe 84 → 112 px, Standard-Eckenradius 18 → 26 px.

### Entfernt

- `temperature_cool_below`, `temperature_warm_above`, `temperature_hot_above`,
  `temperature_cool_color`, `temperature_warm_color`, `temperature_hot_color`
- `humidity_low_threshold`, `humidity_high_threshold`, `humidity_low_color`,
  `humidity_high_color`
- `chart_show_legend` (es gibt keine Legende mehr)

## [1.3.0] – 2026-10-29

### Geändert

- **Weiche Übergänge zwischen den Temperaturstufen:** Der Farbverlauf wechselte an jeder
  Bandgrenze (kühl/komfort/warm/heiß) innerhalb von 3 px die Farbe. Auf der Fläche war das als
  harte horizontale Naht zu sehen. Die Blende ist jetzt breit und skaliert mit der
  Diagrammhöhe (Standard ein Drittel der Höhe, begrenzt auf 14–46 px). Liegen zwei Schwellen
  dicht beieinander, nutzt jeder Übergang höchstens 45 % des Abstands – so bleiben beide
  Stufen erkennbar, statt sich gegenseitig aufzufressen.
- **Zwischenfarben in OKLab:** Die Rampe wird nicht mehr vom Renderer in sRGB interpoliert,
  sondern in OKLab vorgemischt (8 Zwischenstufen je Übergang). Das sRGB-Mittel von Amber und
  Grün liegt dunkler als beide Endfarben – der alte Verlauf bekam dadurch einen graugrünen
  Knick. Für Farben, die kein Hexwert sind (z. B. `rgb(…)` oder Farbnamen), fällt die Karte
  sauber auf zwei Stützstellen zurück.
- **Feuchtefläche läuft weicher aus:** Statt zwei Stützstellen mit linearer Deckkraft läuft
  der Verlauf über sieben Stützstellen mit Smoothstep-Kurve aus – dichter an der Kurve,
  früher transparent zum Grund hin, ohne sichtbare Kante.

## [1.2.3] – 2026-10-29

### Behoben

- **Einheit im Sollwert-Badge saß zu tief:** Wert und Einheit teilten sich eine Grundlinie
  (`align-items: baseline`). Bei 17 px Zahl und 10,9 px Einheit liegt das kleine `°C` dadurch
  rund 2,2 px unter der optischen Mitte der Zahl – es wirkte „nach unten gerutscht“. Wert und
  Einheit werden jetzt an ihrer eigenen optischen Mitte ausgerichtet (`align-items: center`),
  der Abstand kommt aus einem echten `gap` statt aus einem negativen Margin.

## [1.2.2] – 2026-10-29

### Behoben

- **Sollwert-Badge saß zu hoch:** Das Badge richtete seinen Inhalt an der Grundlinie aus
  (`align-items: baseline`). In der festen 30-px-Höhe wanderte die Zeile dadurch an die obere
  Kante – „SOLL“ wirkte mittig, die Temperatur klebte direkt unter dem Rand. Jetzt wird der
  Inhalt mittig zentriert; Wert und Einheit bilden eine eigene Gruppe, die untereinander die
  Grundlinie teilt, sodass `22,0` und `°C` gemeinsam auf der Mittellinie sitzen.

### Geändert

- **Legende ohne doppelte Werte:** Unter dem Verlauf wurden Temperatur und Luftfeuchte erneut mit
  ihrem aktuellen Wert aufgeführt (`Temperatur · 21,8 °C`). Diese Werte stehen bereits groß über
  dem Chart. Die Legende zeigt jetzt nur noch die Reihennamen mit ihrem Farbpunkt.

## [1.2.1] – 2026-10-29

### Behoben

- **Versionsnummern liefen rückwärts:** `1.1.3` und `1.1.4` wurden *nach* `1.2.0` veröffentlicht.
  Jedes Release war für sich korrekt, aber HACS vergleicht **Versionsnummern**, nicht
  Veröffentlichungsdaten – angeboten wurde deshalb weiterhin `1.2.0`. In dieser Fassung fehlten
  die Badges für Solltemperatur und Heizmodus, die Editor-Korrekturen und die punktierte
  Feuchtekurve, obwohl alle drei bereits veröffentlicht waren. `1.2.1` führt alle Stände wieder
  zusammen und ist die höchste Version.

### Enthalten (aus den zuvor getrennt veröffentlichten Ständen)

- Moderne Optik mit Farbverläufen, Badge-Kacheln und **unabhängigen Schriftgrößen/-arten** für
  Temperatur und Luftfeuchte (`temperature_font_size`, `humidity_font_size`, …) – aus 1.2.0.
- **Solltemperatur und Heizstatus-Icon als Badges** sowie die Editor-Korrekturen für leere
  Eingabefelder und unvollständige Zahlen – aus 1.1.3.
- **Punktierte Feuchtekurve** über `chart_humidity_line_style: dotted` – aus 1.1.4.

### Technisch

- Neuer Wächter `tests/version.test.ts`: Die CHANGELOG-Reihenfolge muss streng absteigend sein,
  der oberste Eintrag muss zu `package.json` passen, die Version muss im ausgelieferten Bundle
  und in der README stehen. Genau diese Prüfung hätte die falsche Reihenfolge verhindert.

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

## [1.1.4] – 2026-10-29

### Hinzugefügt

- **Gepunktete Feuchtekurve:** Neue Option `chart_humidity_line_style` (`solid` |
  `dotted`, Standard `solid`) mit eigenem Feld **Linienart Luftfeuchte** im Editor-Abschnitt
  *Verlauf*. Nur die Feuchtekurve wird zur Punktreihe; Temperaturkurve, Flächen, Endpunkt und
  Farben bleiben unverändert. Das Feld ist deaktiviert, solange kein Feuchteverlauf aktiv ist.

### Technisch

- Punkte entstehen über `stroke-dasharray: 0.1 5.5` mit runden Kappen – dadurch echte runde
  Punkte statt Striche, konsistent in allen Rendering-Engines (eine Dash-Länge von 0 wird nicht
  überall gleich behandelt). Die Punktlinie ist mit 2,4 px etwas kräftiger als die
  durchgezogene 1,8-px-Linie.
- Showcase-Vorschau zeigt die Variante in der Küche.

## [1.1.3] – 2026-10-29

### Behoben

- **Leere Eingabefelder im visuellen Editor:** Wurde ein Zahlenfeld vollständig geleert, schrieb
  der Editor sofort `undefined` in die Konfiguration. Bei der Kartenhöhe fiel sie dadurch auf
  „automatisch“ zurück – der Schalter sprang um. Alle Zahlen- und Textfelder arbeiten jetzt mit
  einem lokalen Entwurf: Ein leeres oder unvollständiges Feld bleibt sichtbar, ohne die
  Konfiguration zu verändern (Feld verlassen setzt den gespeicherten Wert zurück).
- **Unvollständige Zahlen wurden übernommen:** Beim Tippen von „260“ wurde die Zwischenstufe „2“
  auf den Mindestwert geklemmt und gespeichert. Jetzt wird nur ein vollständiger, gültiger Wert
  übernommen; Dezimalkommas (`24,5`) werden akzeptiert.
- **„Höhe automatisch“ merkt sich den manuellen Wert:** Beim Zurückschalten wird die zuletzt
  eingegebene Höhe wiederhergestellt statt eines festen 240-px-Werts.
- **Textfelder lassen sich leeren:** Ein geleertes Textfeld (Raumname, Schriftart) entfernt den
  Schlüssel, statt den alten Wert zu behalten.

### Geändert

- **Solltemperatur und Heizstatus-Icon als Badges:** Beide sitzen jetzt in derselben Optik wie
  Fenster- und Bewegungs-Badge (30 px, Radius 11, transluzente Fläche, farbiger Ring,
  Lichtreflex). Das Sollwert-Badge fasst `SOLL`, Wert und Einheit zu einer Kachel zusammen; der
  optionale HVAC-Modus erscheint als Chip in derselben Zeile. Die Information bleibt unverändert
  im Icon-Farbcode (rot/grün/grau).
- Dichte-Stufe `xs` skaliert die Badges auf 24 px; `preferredCardHeight` berücksichtigt die
  höhere Statuszeile.

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

