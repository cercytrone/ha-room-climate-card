# Changelog

Alle nennenswerten Änderungen an diesem Projekt. Format orientiert sich an
[Keep a Changelog](https://keepachangelog.com/de/1.1.0/), Versionierung nach
[Semantic Versioning](https://semver.org/lang/de/).

## [2.18.0] – 2026-11-06

### Behoben

- **Zeitachse folgt jetzt den Home-Assistant-Einstellungen.** `locale.time_zone` ist in Home
  Assistant `local` oder `server`, keine Zeitzone; die Karte reichte den Wert direkt an `Intl`
  weiter, landete im Fallback und zeigte immer deutsche Wochentage, Browserzeit und 24 h.
  `server` nutzt jetzt die Zone der Instanz, `local` die des Browsers. Das 12-Stunden-Format
  (`time_format: "12"`) wird erkannt.
- **Sollwert bei Fahrenheit.** Die Systemeinheit wurde als `us_customary` erwartet, Home Assistant
  speichert dort aber `°F`. Ein 72-°F-Thermostat erschien als „72 °C“, die Soll-Linie im Verlauf
  lag weit daneben.
- **`tap_action` in Objektform.** `tap_action: { action: none }` schaltet das Antippen jetzt ab,
  wie bei anderen Karten. Der Editor zeigt den Wert korrekt an.
- **Keine Schriftverkleinerung bei automatischer Höhe.** Die Dichtestufen greifen nur noch bei
  fester `height`. Vorher rutschte eine Karte ohne Verlauf in die kleinste Stufe und blieb dort.
- **Keine Warnungen für `grid_options`, `layout_options`, `visibility` und `view_layout`.** Diese
  Schlüssel schreibt Home Assistant selbst.
- **Verlauf nach Reconnect wird neu geladen** statt aus dem Zwei-Minuten-Cache bedient.
- **Ein Verlaufs-Cache pro Verbindung.** Mehrere Karten mit denselben Sensoren stellen eine
  gemeinsame Anfrage statt einer pro Karte.
- **Veraltete Kurve wird markiert.** Schlägt eine Aktualisierung fehl, zeigt ein kleines Symbol in
  der Ecke des Verlaufs, dass die Daten nicht aktuell sind (Text bei Hover und für Screenreader).
- **Eigenes Icon für „keine Bewegung“.** Der Zustand hängt nicht mehr nur an der Farbe.
- **Hover der Heizzeile im hellen Theme sichtbar.** Die Tönung folgt jetzt der Textfarbe.
- **Farbwerte werden geprüft.** Werte mit `;`, Klammern `{}`, Anführungszeichen oder `<>` fallen auf
  den Standard zurück, damit sie keine weiteren CSS-Angaben ins `style`-Attribut schreiben können.

## [2.17.0] – 2026-11-06

### Hinzugefügt

- **`name_font_size`** – Schriftgröße des Raumnamens, im Editor unter *Allgemein* direkt unter dem
  Namensfeld (**Schriftgröße Raumname**, 11–32 px, Standard 15). Die Zeilenhöhe wächst im
  Verhältnis 4/3 mit (Standard 15 px Typ auf 20 px Zeile), das Raumicon auf das 16/15-fache –
  ein größerer Titel bekommt also ein größeres Icon statt eines verlorenen 16-px-Glyphs, und die
  Titelzeile der Karte wächst mit, statt den Namen abzuschneiden. Beide Werte sind reine Zahlen
  in `src/config.ts` (`nameLineHeight()`, `nameIconSize()`) und landen als CSS-Variablen
  (`--rcc-name-size`, `--rcc-name-line`, `--rcc-name-icon`) auf der Karte.

### Entfernt

- **`name_entity` / „Name aus Entität übernehmen“.** Der Raumname kommt nur noch aus dem
  Textfeld `name`; ist es leer, gilt der Friendly Name des Temperatursensors. Das
  Entitäts-Auswahlfeld im Editor ist entfallen, die Option wird nicht mehr abgefragt und nicht
  mehr beobachtet. Eine alte Konfiguration mit `name_entity` stürzt nicht ab, sondern meldet
  einmalig in der Konsole: `"name_entity" wird nicht mehr unterstützt. Der Raumname kommt nur
  noch aus \`name\` (Editor: Allgemein → Raumname); ohne Eintrag gilt der Name des
  Temperatursensors.`

### Geprüft

- `tests/editor.test.ts`: Feld **Schriftgröße Raumname** vorhanden (Standard 15), kein
  Entitätsfeld mehr, Wert außerhalb des Bereichs wird angezeigt, aber nicht übernommen, leeres
  Feld lässt den gespeicherten Wert stehen.
- `tests/card.test.ts`: CSS-Variablen für 15 px (20 px Zeile, 16 px Icon), 24 px (32/26), 11 px
  (12 px Icon) und 400 px → auf 32 px begrenzt; größerer Titel erhöht `getCardSize()`.
- `tests/config.test.ts`: `name_entity` aus alten Konfigurationen wird ignoriert und einmalig mit
  Hinweis gemeldet, `configEntityIds()` enthält es nicht mehr.

## [2.16.3] – 2026-11-03

### Behoben

- **Die Temperaturkurve trägt die Bereichsfarben jetzt auch in der Home Assistant App.** Bisher
  bekam die Linie ihre Farbe über `stroke: url(#…)` – ein Farbverlauf als *Linienfarbe*. Einige
  WebViews (unter anderem der der HA-App) zeichnen das nicht: die Fläche darunter verlief
  korrekt, die Kurve kam einfarbig heraus. Die Kurve wird jetzt in kurzen Stücken aus **soliden**
  Farben gezeichnet, die aus genau denselben Stopps gelesen werden wie der Flächenverlauf
  (`bandColorAtOffset()`, 32 Stufen). Benachbarte Stücke mit gleicher Stufe werden
  zusammengefasst, die Stöße überlappen um Bruchteile eines Pixels (keine Naht), sind stumpf
  verkappt (keine Punkte) und tragen ihre Deckkraft als **Gruppe**, damit die Überlappungen nicht
  dunkler werden. Ohne Farbbereiche bleibt es bei **einem** Pfad im Akzent.
- **Keine Trennlinie mehr, wenn die Zeitbeschriftung ausgeschaltet ist.** Die Haarlinie über der
  Zeitzeile blieb stehen und saß ohne Zeile direkt auf der Kartenkante – die Unterkante wirkte
  dicker als Seiten und Oben. Sie wird jetzt nur noch mit der Zeitzeile gezeichnet; die Fläche
  läuft bis 0,5 px an die Kante.
- **Der Chart steht links und rechts nicht mehr 1–2 px ab.** Der Plot begann bei `x = 1` und
  endete bei `width − 1` – auf einem großen Monitor als heller Saum neben der Fläche sichtbar.
  Jetzt `x = 0` bis `width`: der Chart sitzt innen auf der Haarlinie, ohne Zwischenraum.

### Geprüft

- `tests/chart.test.ts`: keine `url(…)`-Linienfarbe mehr, Kurve besteht aus mehreren soliden
  Stücken von kalt nach heiß, Stücke liegen in einer Gruppe mit einer Deckkraft, stumpfe Kappen
  innen und runde nur an den beiden Enden, Fläche beginnt bei 0 und endet auf der Kante, ohne
  Zeitzeile keine `.baseline` und Area-Unterkante bei `height − 0.5`.
- `tests/bands.test.ts`: Farbauslesen aus dem Verlauf (Stützstellen, Interpolation, Klemmen,
  unlesbare Farbe), Stückbildung (Zusammenfassen, Überlappung, Stufenanzahl).
- `tests/geometry.test.ts`: `seriesPieces()` ergibt zusammengesetzt **exakt** den Pfad von
  `seriesPath()` – die eingefärbte Kurve ist keine nachgezeichnete Näherung.
- Demo-Vorschauen (`docs/images/`) zeichnen Kurve, Kante und Haarlinie wie die Karte.

## [2.16.2] – 2026-11-02

### Behoben

- **Ohne Zeitangabe läuft der Verlauf bis zur unteren Kante.** Bisher blieb unter dem Plot ein
  2-px-Streifen plus der Innenabstand (12 px bei Standardwerten) als leerer Saum stehen, obwohl
  unter der Kurve keine Zeile mehr folgt. Jetzt gibt der Chart den Zeilenplatz komplett an die
  Kurve ab und die Karte hebt den unteren Innenabstand auf – dasselbe Muster wie links und
  rechts: `chartSlotBottomMargin()` in `src/config.ts` liefert `-card_padding`, die Karte schreibt
  den Wert als Inline-Rand `margin-bottom` auf den Chart-Slot. Gilt nur für
  `chart_show_axis: false` **und** bündigen Verlauf; mit Zeitzeile oder mit
  `chart_full_bleed: false` bleibt es bei 0.
- **Der rechte ungefüllte Streifen neben der „Jetzt“-Marke ist geschlossen.** Weil die
  Zeitachse 2,8 px vor der Außenkante endet, damit die Marke ganz bleibt, hörten Linie und Fläche
  dort ebenfalls auf – neben der Marke blieb ein leerer Saum bis zur Kante. Jetzt halten Kurve
  und Flächenverlauf den letzten Messwert flach bis zur echten Kante (`edgeRight = width − 1`);
  Gitterlinien, Achsen-Baseline, Achsenbeschriftung und die „Soll“-Beschriftung ziehen mit. Die
  Marke selbst bleibt unverändert auf dem gezeichneten Endpunkt sitzen und wird nicht
  beschnitten. Nur der bis „jetzt“ reichende Lauf bekommt die Verlängerung – ein historischer
  Abschnitt, der vorher endet, wird nicht künstlich fortgeschrieben.
- **Demo-Vorschau (`docs/images/`)** zeichnet Kante und Haltepunkt genauso wie die Karte.

### Geprüft

- `tests/chart.test.ts`: letzter Pfadpunkt liegt auf `width − 1`, der vorletzte 2,8 px davor,
  beide mit demselben y-Wert (flacher Abschluss); der Flächenverlauf erreicht dieselbe Kante;
  ohne Zeitachse liegt die Plot-Unterkante auf `height − 0.5` und die Fläche reicht dorthin;
  die „Jetzt“-Marke sitzt weiterhin auf einem Kurvenpunkt.
- `tests/card.test.ts`: `chartSlotBottomMargin()` und der Inline-Rand `margin-bottom` in allen
  vier Kombinationen aus Zeitzeile und bündigem Verlauf.

## [2.16.1] – 2026-11-02

### Intern

- **Die Breite des bündigen Charts ist jetzt eine prüfbare Zahl statt einer CSS-Regel:**
  `chartSlotMargin()` in `src/config.ts` liefert `-card_padding` (bündig) oder `0` (im Text), die
  Karte schreibt den Wert als Inline-Rand auf den Chart-Slot. Damit lässt sich die Geometrie ohne
  Layout-Engine nachrechnen: bündig = Kartenbreite − 2 px Haarlinie, nicht bündig = Breite des
  Textblocks. Die CSS-Regel `.chart-slot.is-full-bleed` ist entfallen.
- **Test für den Abstand nach unten mit Zeitangabe:** Achsen-Baseline liegt 6 px über der
  Chart-Unterkante, die Unterlängen der 10,5-px-Schrift bleiben im Kasten, die Zeitzeile sitzt
  unterhalb der Plotfläche (Plot endet 20 px über der Kante). Ohne Zeitangabe bekommt die
  Plotfläche diese 20 px zurück (Unterkante 2 px).

### Geprüft (Zahlen, Standard-Innenabstand 10 px)

- Abstand Kurvenende → Kartenunterkante: **2 px** (Chart) + 10 px (Innenabstand) = 12 px.
- Abstand Achsen-Baseline → Kartenunterkante: **6 px** + 10 px = **16 px**, tiefster
  Schriftpunkt ≈ **13,7 px**.
- Bei `card_padding: 0` bleiben davon 6 px bzw. 3,7 px – deshalb warnt der Editor unter 8 px.

## [2.16.0] – 2026-11-02

### Hinzugefügt

- **`chart_full_bleed`** (Standard `true`) – der bündige Verlauf aus 2.15.0 lässt sich abschalten.
  Mit `false` endet der Chart auf derselben Kante wie Titel und Messwerte, statt von der Rundung
  beschnitten zu werden. Im Editor: *Verlauf* → **Verlauf bündig zur Kartenkante** (ausgegraut,
  wenn keine Kurve gezeichnet wird; Beschreibung in der Hilfe darunter).
- **Warnung für zu knappen Innenabstand.** Im Editor erscheint unter *Allgemein* →
  **Innenabstand** ein amberfarbener Hinweis, sobald der Wert unter 8 px liegt („Unter 8 px klebt
  der Text an der Kante …“). Er reagiert live auf die Eingabe, nicht erst auf das Speichern.

### Geändert

- **Min/Max-Zahlen halten 6 px Abstand zur Kante** (bisher 2 px, was nur reichte, solange der
  Chart im Karten-Innenabstand lag). Der Abstand gilt auch nach einem Seitenwechsel der Zahl,
  etwa wenn sie der „Soll“-Beschriftung ausweicht.

## [2.15.0] – 2026-11-02

### Geändert

- **Der Verlauf schließt bündig mit der Außenkante ab.** Der Chart hebt den Innenabstand
  (`card_padding`) links und rechts auf, statt in einem 10-px-Rand zu enden: Kurven,
  Flächenverläufe und Grundlinie laufen bis an die Kante der Karte, die Rundung beschneidet sie.
  Titel, Messwerte und Heizzeile behalten ihren Innenabstand.
- **Die „Jetzt“-Marke bleibt vollständig sichtbar.** Sie saß am rechten Rand der Plotfläche und
  wäre mit dem bündigen Chart zur Hälfte in der Außenkante verschwunden. Die Plotfläche endet
  jetzt einen Markenradius (2,8 px) vor der Kante – die Marke sitzt weiterhin exakt auf dem
  gezeichneten Endpunkt (Variante A aus 2.9.1 bleibt gewahrt), beide Reihen teilen sich dieselbe
  x-Position.
- **„Soll“-Beschriftung mit Luft zur Kante:** Sie ist Text und rückt 3 px von der Außenkante ab,
  damit sie nicht am Rand klebt; die Kollisionsprüfung mit den Min/Max-Zahlen nutzt denselben
  Anker.
- Die Zeitachse behält ihren Sicherheitsabstand zum Eckenradius (28 px), damit auch bei
  `card_padding: 0` kein Achsenlabel in der Rundung verschwindet.

### Behoben

- Die Showcase-Vorschau zeichnete die Soll-Linie unter den Flächenverlauf (die Beschriftung wirkte
  dadurch abgeschnitten). Reihenfolge entspricht jetzt der Karte: Flächen, Soll-Linie, Kurven.

## [2.14.0] – 2026-11-02

### Geändert

- **Der Innenabstand der Karte ist jetzt 10 px statt 20 px** – der Inhalt rückt näher an die
  Außenkante, die Karte wirkt dadurch dichter und zeigt bei gleicher Höhe mehr Verlauf.
- **Der Abstand ist im Editor einstellbar:** *Allgemein* → **Innenabstand** (0–32 px, ein Feld
  mit Einheit `px`). Der Wert gilt für alle vier Seiten; Titel, Messwerte, Heizzeile und Verlauf
  teilen weiterhin dieselbe Kante. YAML: `card_padding`.

### Hinzugefügt

- **`card_padding`** (Standard `10`, Bereich 0–32) – Innenabstand zwischen Inhalt und
  Außenkante in Pixeln. Er zählt auch in `preferredCardHeight()` mit, damit `getCardSize()` und
  die Grid-Optionen zur tatsächlichen Höhe passen.
- Hinweis zur Gestaltung: Alle übrigen Abstände bleiben in 4-px-Schritten. Nur der Innenabstand
  ist bewusst frei wählbar – ein 10-px-Wert liegt außerhalb des 4-px-Rasters, ohne es zu
  verschieben.

## [2.13.0] – 2026-11-02

### Behoben

- **Ein Tippen auf die Kachel öffnet wieder den Thermostat-Dialog.** Die beiden Messwerte waren
  `<button>`s und fingen den Klick ab, bevor er die Karte erreichte – ausgerechnet dort, wo man
  auf eine Kachel tippt. Sie sind jetzt reiner Text, ein Tipp darauf gehört der Karte. Zwei
  weitere Stellen waren aus demselben Grund tot:
  - **Chart mit ausgeschalteter Wertanzeige.** Ohne `chart_show_tooltip` hat der Chart keine
    eigene Berührung mehr; bisher blieb die Fläche trotzdem ein totes Feld. Jetzt öffnet sie den
    Dialog. Mit eingeschalteter Wertanzeige behält der Chart seinen Tipp (Messwert ablesen).
  - **Ausgeblendete Statuszeile.** Ohne Statuszeile (`show_climate_row: false`) gab es **gar kein**
    Tippziel – wer die Zeile ausblendete, verlor den Dialog. Jetzt bleibt der Tipp bestehen; die
    Karte selbst wird zum Tastaturziel (`role="button"`, `tabindex="0"`, Enter/Leertaste), damit
    die Aktion nicht zeiger-only ist.
  - Dasselbe gilt, wenn alle drei Teile der Zeile (Sollwert, Statuswort, Modus) abgeschaltet sind
    und die Zeile deshalb nicht gerendert wird.

### Entfernt

- **Serie per Klick auf den Messwert aus- und einblenden.** Die Funktion war laut Rückmeldung
  nicht nötig und ist ersatzlos entfallen: kein `<button>` mehr, kein `aria-pressed`, kein
  Ausblenden per `localStorage` (die Datei `data/hidden-series.ts` und die Eigenschaft
  `hiddenSeries` des Charts sind gelöscht). Welche Kurven erscheinen, entscheiden weiterhin
  `show_temperature_chart` / `show_humidity_chart` – die Einzelkurve bekommt dabei wie seit
  2.11.0 die ganze Plotfläche. Ein Tipp auf den Wert öffnet den Thermostat-Dialog.
- Die Showcase-Vorschau zeigte eine per Klick ausgeblendete Feuchtekurve – dieses Beispiel ist
  entfallen, die Bilder sind neu gerendert.

## [2.12.0] – 2026-11-02

### Behoben

- **Minimum/Maximum fehlten, obwohl `chart_show_extremes: true` gesetzt war.** Drei Ursachen,
  alle nachgemessen:
  1. **Flache Kurve.** Standen Minimum und Maximum auf demselben Wert – der Normalfall in einem
     gut eingeregelten Raum –, verwarf die Karte beide Marken. Jetzt wird der eine Wert einmal
     angezeigt.
  2. **Schwelle zu hoch.** Unter 200 px Kartenbreite bzw. 18 px Bandhöhe entfielen die Zahlen
     ganz. Ein kompakter Chart (240 × 86 px) lag damit immer darunter. Jetzt gilt 150 px Breite
     und 14 px Bandhöhe – die Zahlen passen sich weiterhin an, statt zu verschwinden.
  3. **Stumm.** Fehlende Marken wurden ohne Hinweis weggelassen; das sah nach einem kaputten
     Schalter aus. Die Karte schreibt jetzt **einmal** in die Konsole, welcher Grund greift
     („schmale Karte“, „flaches Band“, „zu wenige Messwerte“).
- **Lesbarkeit der Zahlen.** 9 px bei 55 % Deckkraft verschwanden auf dunklen Karten fast
  vollständig. Jetzt 10 px, 80 % Deckkraft und ein breiterer Rand in Kartenfarbe.

### Hinzugefügt

- **`chart_show_setpoint`** (Standard `true`) – die gestrichelte Soll-Linie im Verlauf samt
  „Soll“-Beschriftung lässt sich abschalten. Im Editor unter *Verlauf* → **Soll-Linie im
  Verlauf** (ausgegraut, wenn keine Temperaturkurve gezeichnet wird). Das ist bewusst **nicht**
  dasselbe wie `show_setpoint`, das die Solltemperatur in der Statuszeile unter dem Messwert
  steuert. Soll-Linie aus heißt auch: „Soll“ steht nicht mehr in der Screenreader-Beschreibung –
  Bild und Beschreibung bleiben deckungsgleich.

## [2.11.0] – 2026-11-02

### Geändert

- **Eine einzelne Kurve nutzt jetzt die ganze Plotfläche.** Die Bänder waren feste Anteile der
  Höhe – Feuchte oberes Drittel, Temperatur untere Hälfte –, auch wenn eine der beiden Reihen gar
  nicht gezeichnet wurde. Bei Chart-Höhe 112 px blieben so **44 % der Fläche leer**, und die
  Temperatur bewegte sich in nur 48 von 86 px. Jetzt gilt: ist nur eine Reihe sichtbar, bekommt
  sie `top … bottom`, also das ganze Band; ihr Ausschlag wächst um rund 80 %. Sind beide Reihen
  an, bleibt die Aufteilung unverändert. Das gilt symmetrisch für Temperatur und Luftfeuchte.
- **Entschieden wird an der Konfiguration, nicht an den Daten.** Maßgeblich sind die
  Serien-Schalter (Tippen auf das Label, `show_temperature_chart` / `show_humidity_chart`) und
  nicht, ob gerade Werte vorliegen. Ein Sensor, der kurz `unavailable` meldet, lässt das Layout
  stehen – der Chart springt nicht bei jedem Ausfall um.
- Soll-Linie, Min/Max-Marken, Flächenverläufe, die Farbbereiche der Temperatur und die
  Trefferfläche des Tooltips hängen an denselben Bändern und wandern automatisch mit.

## [2.10.0] – 2026-11-02

### Hinzugefügt

- **Zeitangaben unter dem Verlauf abschaltbar.** `chart_show_axis` (Standard `true`) – im Editor
  unter *Verlauf* als Schalter **Zeitangaben unter dem Verlauf**, nur aktiv, solange eine Kurve
  gezeichnet wird. Ausgeschaltet entfällt die unterste Zeile (Start · Mitte · Jetzt) vollständig,
  und die Kurven bekommen die 20 px, die vorher für die Beschriftung reserviert waren – die
  Kartenhöhe selbst bleibt, wie sie eingestellt ist. Uhrzeit und Messwerte stehen weiterhin im
  Tooltip und in der Beschreibung für Screenreader; die Achse bleibt unabhängig davon bei zu
  wenig Platz automatisch weg.

## [2.9.2] – 2026-11-02

### Behoben

- **Die Glättungsstufen unterschieden sich kaum.** Zwei Ursachen, beide gemessen:
  1. Ein Zeitwächter begrenzte *jedes* Fenster auf Nachbarn innerhalb von 3 × Median-Abstand –
     also auf ±3 Messwerte. Konfiguriert waren aber 9 und 15: „Mittel“ und „Stark“ zeichneten
     **dieselbe Kurve** (nachgemessen: effektiv 6,9 vs. 6,9 Nachbarn bei 6 h, 7,0 vs. 7,0 bei
     24 h). Der Wächter wächst jetzt mit dem Fenster (`±Fenster/2 × Abstand`, mindestens zwei
     Minuten, höchstens 90 Minuten) – ein echter Stillstand von Stunden beendet das Mitteln
     weiterhin, ein gemessener Sprung bleibt also stehen.
  2. Der Mittelwert wurde auf die Nachkommastellen des Sensors gerundet (bei 0,1 °C-Sensoren
     also auf 0,1). Damit fielen die Restunterschiede zwischen den Stufen weg. Jetzt bleiben
     zwei Nachkommastellen erhalten – der gezeichnete Pfad rundet ohnehin auf zwei.

### Geändert

- **Glättungsstufen als Zeitfenster statt Punktzahl.** `light` mittelt über ±10 Minuten, `medium`
  über ±30, `strong` über ±60; daraus wird pro Reihe die passende Punktzahl (immer ungerade,
  höchstens 121, mindestens der direkte Nachbar). Vorher bedeutete dieselbe Punktzahl bei einem
  geschwätzigen Sensor 15 Minuten und bei einem ruhigen zwei Stunden. Gemessen an der
  Gesamtbewegung der gezeichneten Werte (6 h sichtbar, ±0,12 °C Rauschen, Rohwert 5,32 °C)
  ergibt sich jetzt eine klare Leiter – vorher waren „Mittel“ und „Stark“ deckungsgleich:
  **1,24 → 0,61 → 0,43 °C** statt 1,20 → 1,10 → 1,10 °C.
- **Editor-Hilfetext** nennt die Zeitfenster, die README-Tabelle ebenso.

## [2.9.1] – 2026-11-02

### Behoben

- **Endpunkt saß neben der Kurve, sobald geglättet wurde.** Der Punkt am Kurvenende
  (Temperatur und Luftfeuchte) wurde aus dem **rohen** letzten Messwert gesetzt, die Linie aber
  aus der geglätteten Reihe gezeichnet. Der gleitende Mittelwert ist zentriert und hat am Rand
  keine rechten Nachbarn mehr, deshalb weicht der letzte gezeichnete Wert vom letzten Messwert ab
  – bei „Stark“ um bis zu 0,2 °C (≈ 17 px). War der Raum am Ende warm im Aufheizen, schwebte der
  Punkt sichtbar über der Linie, beim Abkühlen darunter. Am deutlichsten bei 3 h und 6 h, weil
  dort das Fenster relativ zur sichtbaren Bewegung groß ist.
  Der Punkt kommt jetzt aus den **gezeichneten** Segmenten und sitzt damit genau auf dem letzten
  Scheitelpunkt der Kurve – samt Farbe (bei aktiven Farbbereichen) passend zur Höhe. Datenpunkte
  und Min/Max-Marken hatten dieses Problem nie, sie rechneten schon mit der gezeichneten Reihe.
  Zwei neue Tests prüfen, dass die Position des Endpunkts mit dem letzten Pfadpunkt übereinstimmt
  (mit und ohne Glättung).

## [2.9.0] – 2026-11-02

### Geändert

- **Weichere Übergänge – Farbe und Kurve.** Die Farbbereiche der Temperaturkurve hatten an jeder
  Grenze nur eine schmale Rampe (rund ein Zehntel der Bandhöhe, gemessen 1,2–1,6 °C): optisch
  eine Kante. Jetzt teilen sich zwei benachbarte Bereiche den ganzen Abstand zwischen ihren
  Grenzen – der kältere reicht bis zur Mitte hinauf, der wärmere bis zur Mitte hinunter –, sodass
  bei voller Weichheit **kein Plateau und keine Kante** mehr übrig bleibt und die Farbe über die
  gesamte Fläche fließt. Die äußeren Ränder bleiben rein (unter „kalt“ blau, über „heiß“ rot),
  damit keine der vier Farben verschwindet.
- **Kurvenform geglättet, ohne Spitzen zu bügeln.** Die Kubik setzte an jedem Wendepunkt die
  Steigung hart auf null; bei dichten Messreihen wurde daraus eine Kette flacher Stellen – der
  „harte“ Eindruck der Linie. Jetzt ist die Steigung der gedämpfte Mittelwert der beiden
  Nachbarsteigungen, zusätzlich einmal leicht über die Nachbarn gemittelt. Die Kurve darf die
  Messwerte dabei um höchstens 1 px verlassen: Ecken werden rund, echte Peaks, Sprünge und jeder
  einzelne Messpunkt bleiben exakt erhalten.
- **Bereichsfarben an den Achsenrändern.** Zeigt der Chart nur einen Ausschnitt (etwa nur warme
  Tage), beginnt der Verlauf mit der Farbe, die dort wirklich gilt – vorher konnte der untere
  Rand kaltblau eingefärbt sein, obwohl jeder sichtbare Wert im warmen Bereich lag.

### Hinzugefügt

- **`chart_band_transition`** (0–100 %, Standard 100) – im Editor unter *Verlauf* als Regler
  **Übergang zwischen den Bereichen**, nur aktiv, wenn die Farbbereiche eingeschaltet sind.
  `0` zeichnet harte Stufen genau an den Grenzen, `100` den durchgehenden Verlauf; jeder Wert
  dazwischen ist ein echter Zwischenzustand. Die Grenzen selbst bleiben unverändert die
  Einstellung dafür, *wo* ein Bereich beginnt.

## [2.8.0] – 2026-11-02

### Hinzugefügt

- **Stärke der Flächenverläufe, einzeln regelbar.** `chart_temperature_area_opacity` und
  `chart_humidity_area_opacity` (Editor: *Stärke des Flächenverlaufs (Temperatur)* bzw.
  *(Luftfeuchte)*, 10–300 %). 100 % ist der eingebaute Verlauf, 180–250 % machen die Fläche
  kräftiger, 30 % lassen sie fast verschwinden. Beide Regler sind unabhängig voneinander und
  wirken zusätzlich zur Deckkraft der Kurven (Faktor × Faktor); der oberste Stop wird bei voller
  Deckung gekappt, damit aus dem Verlauf kein Farbblock wird.
- **Deckkraft der Kurven im Editor.** `chart_opacity` (15–100 %) skaliert Linie, Flächen,
  Endpunkte und Datenpunkte gemeinsam; die Flächenverläufe behalten ihre relative Abstufung.
  Gitter, Achse und Soll-Linie bleiben unverändert – sie sind Orientierung, kein Datum.
- **Temperaturkurve nach Bereich einfärben** (`chart_temperature_bands`, im Editor unter
  *Verlauf*). Kalt / normal / warm / heiß als **ein** senkrechter Farbverlauf über der
  Temperaturfläche: jeder Punkt nimmt die Farbe seines eigenen Werts an, zwischen den Bereichen
  rampt es über wenige Zehntel Grad. Die Kurve bleibt dabei ein einziger SVG-Pfad – keine
  zusätzlichen Knoten, kein Leistungssprung.
- **Frei einstellbare Grenzen:** `chart_band_cold_below` (18 °C), `chart_band_warm_above`
  (24 °C), `chart_band_hot_above` (27 °C). Vertauschte Werte werden sortiert, zu eng gesetzte
  Grenzen auf mindestens 1 °C auseinandergezogen.
- **Farben aus der bestehenden Palette:** gedämpftes Blau `#7FA6D9` für kalt, der Akzent (Mint)
  im Normalbereich, das Amber des Fenster-Badges `#EFB35F` für warm, das Rot der Flamme
  `#D16A62` für heiß. Die Schwellen sind konfigurierbar, die Farben bewusst nicht – so bleibt
  die Palette ein Aussagesystem und wird keine Farbauswahl.
- **Screenreader-Text für die Bereiche:** die Beschreibung des Charts nennt den Bereich
  („Temperatur 16,9–28,9 °C (kalt – heiß)“), weil ein Farbverlauf allein nichts aussagt.
- **Fahrenheit-Umrechnung:** die Grenzen sind in °C hinterlegt und werden für Sensoren in °F
  umgerechnet, damit der Verlauf zur gezeichneten Kurve passt.
- **Neuer README-Abschnitt „Farbbereiche & Deckkraft“** mit Vorschaubild
  (`docs/images/showcase-bands.*`).

### Geändert

- Der Showcase-Renderer zeichnet Farbbereiche und Deckkraft mit denselben Funktionen wie die
  Karte (`src/chart/bands.ts`), damit das Vorschaubild nicht von der Implementierung abweichen
  kann. Das Editor-Bild zeigt jetzt den Abschnitt *Verlauf* mit den neuen Feldern.

## [2.7.2] – 2026-11-02

### Hinzugefügt

- **Abschnitt „Auf Tablets & schlanken Geräten“ in der README.** Gemessene Werte für ein
  Fire HD 10 Plus mit Fully Kiosk und acht gleichzeitigen Karten: Bundle-Größe, DOM-Knoten je
  Karte, SVG-Knoten je Chart, gespeicherte Messwerte, Zahl der History-Anfragen und Timer –
  dazu Empfehlungen zu `chart_hours`, Datenpunkten, WebView-Version und Neuladen.
- **Helle Vorschau** (`docs/images/showcase-light.*`) und **Editor-Ansicht**
  (`docs/images/editor.*`) für die README, jeweils als gerenderte Design-Vorschau mit
  Demo-Werten gekennzeichnet.

### Geändert

- Der Showcase-Renderer gibt drei Bilder aus (`npm run showcase`). Farben und Flächenverlauf
  liegen jetzt als Hell-/Dunkel-Palette vor und spiegeln die Theme-Tokens der Karte, sodass die
  helle Vorschau nicht mehr aus einer zweiten, abweichenden Farbtabelle stammt.

## [2.7.1] – 2026-10-31

### Geändert

- **Raum-Icon größer.** Es stand mit 14 px deutlich unter der Kapitalhöhe des Raumnamens (rund
  11 px bei 15 px Schrift). Jetzt sind es 16 px: Die Zeichen füllen ihre 24er-Zeichenfläche nicht
  ganz, dadurch landet das sichtbare Icon bei etwa 12,5 px – also ungefähr auf Höhe des ersten
  Buchstabens mit knapp einem Pixel Überstand nach oben und unten. Es passt weiterhin in die
  20-px-Zeile, die Kopfzeile wächst also nicht und die Karte behält ihre Höhe.
- **Raumname in der Farbe der Serien-Beschriftung.** Der Titel nutzt jetzt denselben Token
  (`--rcc-muted`) wie „TEMPERATUR“ / „LUFTFEUCHTE“ statt der vollen Textfarbe – die Hierarchie
  kommt damit aus Größe und Position, nicht aus Helligkeit.

## [2.7.0] – 2026-10-31

### Hinzugefügt

- **Tippen auf die Karte öffnet das Thermostat.** Ein Klick oder Touch auf die Karte (außerhalb
  der Messwerte und des Charts) öffnet den More-Info-Dialog der Climate-Entität – dort werden
  Solltemperatur und Modus eingestellt. Die Karte schickt dafür nur das `hass-more-info`-Event mit
  `entityId` nach oben (bubbles + composed), genau wie Home Assistants eigene Kacheln; es gibt
  keine eigene Heizungssteuerung und keine Navigation.
- **Tastatur-Pendant:** Ist ein Thermostat verknüpft, wird die Statuszeile ein echter
  `<button>` mit Fokusring, `title` und dem Zusatz „Thermostat öffnen“ im Namen; das Statuswort
  bleibt darin eine Live-Region.
- **Abschaltbar:** `tap_action: none` (Editor: *Tippen auf die Karte* → *Nichts*) schaltet das
  Tippziel ab; ohne sichtbare Statuszeile (`show_climate_row: false`) gibt es keines, damit kein
  Zeiger-Ziel ohne Tastatur-Pendant entsteht.

### Geändert

- Messwerte und Chart behalten ihre eigene Funktion: ein Klick auf einen Messwert blendet weiter
  die Serie aus, ein Tippen in den Chart zeigt die Wertanzeige. Beide stoppen das Karten-Tippziel.
- Der Schalter für die Extremwerte heißt im Editor jetzt **Minimum/Maximum im Chart anzeigen**
  (vorher „Minimum und Maximum markieren“) – an derselben Stelle unter *Verlauf*, weiterhin
  standardmäßig an.
- Der Editor-Abschnitt *Farben & Grenzwerte* heißt wieder **Farben**: Grenzwerte gibt es seit
  2.0.0 nicht mehr, dort stehen nur noch Akzent- und Sekundärfarbe.

## [2.6.0] – 2026-10-31

### Hinzugefügt

- **Wertanzeige im Chart.** Beim Zeigen auf die Fläche erscheint eine senkrechte Haarlinie mit
  Uhrzeit und den Werten beider Reihen. Die Suche läuft über die **gemessenen** Punkte, nicht
  über die gezeichneten Stützpunkte – die Kurve ist geglättet, dezimiert und enthält
  interpolierte Brückenpunkte, und keiner davon ist eine Messung. Angezeigt wird deshalb der
  echte Messwert mit der Einheit des Sensors. Die Ebene setzt `touch-action: pan-y`, damit ein
  senkrechter Wisch weiterhin das Dashboard scrollt; nach dem Abheben eines Fingers bleibt die
  Anzeige vier Sekunden stehen.
- **Minimum und Maximum** der sichtbaren Kurven als dezente Zahlen neben der Kurve. Liegen
  beide Zahlen auf demselben Fleck, rücken sie an die Ränder ihres Bandes, statt sich zu
  überlappen; unter 200 px Breite entfallen sie. Für Screenreader stehen beide Werte zusätzlich
  in der Beschreibung des Charts, zusammen mit dem Sollwert.
- Beide Funktionen sind im Editor schaltbar (`chart_show_tooltip`, `chart_show_extremes`,
  Standard jeweils an).

### Geändert

- **Beispiel-YAMLs aufgeräumt.** `examples/wohnzimmer.yaml` enthielt noch `chart_show_legend`
  und die 2.0.0-entfernten Temperaturschwellen `temperature_cool_below`,
  `temperature_warm_above`, `temperature_hot_above`; `examples/bad.yaml` ebenso die entfernten
  Feuchteschwellen. Sie wurden still ignoriert (seit 2.5.0 mit Warnung) – jetzt sind sie weg.
  Ein Test prüft die Beispiele gegen `KNOWN_CONFIG_KEYS`, damit das nicht zurückkommt.
- Die Beschreibung des Charts nennt zusätzlich den gemessenen Bereich („Temperatur 18,2–23,4 °C“).

### Nicht umgesetzt (geprüft)

- **Fenster-Marker im Chart.** Die Abfrage wäre billig, aber bei Tado ist der Fensterzustand eine
  Erkennung des Thermostats, keine gemessene Öffnung. Ein Marker würde diese Unsicherheit als
  Zeitpunkt behaupten. Die Karte zeigt den Zustand weiterhin nur als Badge; die Begründung steht
  in der README.

## [2.5.0] – 2026-10-31

### Behoben

- **Zeitachse zeigte die Zeitzone des Browsers.** Beschriftung und Datumszeile des Charts nutzten
  nur die Zone des Geräts; die Zeitzone und das Uhrzeitformat von Home Assistant wurden geprüft,
  aber nie angewendet. Jetzt folgt die Achse `hass.config.time_zone` und `hass.locale` – inklusive
  12-Stunden-Format bei `time_format: am_pm`. Ändert sich die Zone in der Konfiguration, wird die
  Achse neu gezeichnet.
- **Soll-Linie stand in der falschen Einheit.** Der Sollwert des Thermostats wurde unverändert vor
  die Temperaturkurve gelegt – bei einem Sensor in °F und einem Thermostat in °C lag die
  gestrichelte Linie rund 40 Einheiten daneben. Die Einheit kommt jetzt aus den Attributen der
  Climate-Entität (Systemstandard nur als Rückfall), der Sollwert wird in die Skala des Sensors
  umgerechnet. Sind die Einheiten unbekannt, entfällt die Linie bewusst – statt sie zu raten.
- **Der Sollwert war für Screenreader unsichtbar.** Die gestrichelte Linie ist rein dekorativ; die
  Beschreibung des Charts endet jetzt mit „Soll 22,0 °C“. Damit wird auch `setpointUnit` wieder
  verwendet, das vorher berechnet und nie gelesen wurde.
- **Dezimierung verlor echte Spitzen.** Bei langen Zeiträumen wurde jeder n-te Punkt behalten –
  eine kurze Temperaturspitze zwischen zwei Stichproben verschwand. Jetzt bleiben pro Abschnitt
  Minimum und Maximum (plus erster und letzter Wert) erhalten; die Kurve entspricht damit dem
  Verlauf, nicht einer beliebigen Stichprobe.
- **Karten außerhalb des Sichtfelds fragten weiter alle fünf Minuten ab.** Ein
  `IntersectionObserver` pausiert den Abruf, solange die Karte nicht sichtbar ist, und lädt beim
  Zurückscrollen sofort nach, wenn die Daten älter als das Aktualisierungsintervall sind.
- **Ausgeblendete Serien waren nach einem Reload wieder da.** Die Auswahl wird jetzt pro
  Entitäten-Paar im `localStorage` gemerkt (fehlertolerant: ohne Speicher gilt sie nur für die
  Sitzung) und von allen Karten desselben Raums geteilt.
- **Unbekannte YAML-Schlüssel verschwanden stillschweigend.** Ein Tippfehler wie
  `chart_shwo_grid` hatte keine Wirkung und keinen Hinweis. Jetzt warnt die Karte einmal pro
  Schlüssel in der Konsole.
- **`window` als Parametername** in `getStubConfig` verdeckte das globale `window` – umbenannt.
- **Doppeltes `getConfigElement`** (einmal statisch, einmal als Instanzmethode) – die
  Instanzmethode war toter Code und ist entfernt.
- **Farbverlauf der Temperaturlinie mit zwei identischen Stopps** – ein Gradient, der nichts
  bewirkte. Entfernt; die Linie zeichnet direkt die Akzentfarbe.

## [2.4.0] – 2026-10-31

### Behoben

- **Kurze Aussetzer nach ruhigen Phasen rissen die Kurve auf.** Die Ausfalllänge wurde ab dem
  letzten *gültigen* Messwert gemessen statt ab dem Beginn des Ausfalls. Nach einer ruhigen
  Nacht (letzter Wert 04:15, nächster 08:00) sah ein einminütiger Aussetzer um 07:59 deshalb wie
  ein 3¾-stündiger Ausfall aus, überschritt `chart_max_gap_minutes` und brach die Linie auf –
  obwohl der Sensor nur kurz weg war. Jetzt zählt ausschließlich die tatsächliche Ausfallzeit.
- **Ruhige Phasen wurden als Rampe gezeichnet.** Ohne neue Messwerte lief die Linie langsam
  zwischen zwei Stunden alten Werten – als hätte sich der Raum über Stunden gleichmäßig
  verändert. Sie wird jetzt als **Stufe** gezeichnet: alter Wert flach, Sprung eine Sekunde vor
  dem nächsten Messwert (wie die HA-eigene Chart).
- **`chart_gap_mode: break` brach auch ruhige Phasen.** Jetzt brechen nur noch echte
  `unavailable`/`unknown`-Phasen die Linie.
- **Der Startwert des Fensters konnte verloren gehen.** Der letzte Zustand *vor* dem Zeitfenster
  wird nun als Carry-in am Fensterbeginn übernommen (`include_start_time_state`) statt verworfen
  – nach einer ruhigen Nacht war er oft der einzige Wert für den Fensteranfang.
- **Ein fehlgeschlagener Abruf leerte das Diagramm.** Die zuletzt gültige Kurve bleibt jetzt
  stehen; der Abruf wird mit wachsendem Abstand wiederholt (15 s → 5 min), und während eines
  Backoffs startet keine Sensor-Änderung einen neuen Versuch.
- **`aria-label` beim Ein-/Ausblenden einer Serie war vertauscht** („Serie eingeblendet“ bei
  ausgeblendeter Serie). Die Texte sind jetzt in `localize.ts` und korrekt zugeordnet.

### Geändert

- **Zeitfenster und Live-Wert:** Das Diagramm endet bei „jetzt“ statt beim Zeitpunkt des letzten
  Abrufs (bis zu fünf Minuten älter) und hängt den aktuellen Sensorzustand an die Kurve. Die
  Kurve endet damit genau bei dem Wert, der oben groß steht.
- **Aufwachen:** Ein `visibilitychange`-Listener lädt die Daten neu, sobald die Seite wieder
  sichtbar wird (Wandtablets, schlafende Tabs); er wird mit der Karte entfernt.
- **Glättung greift vor der Segmentierung.** Vorher wurde nach dem Segmentieren gemittelt –
  dadurch wurde eine gerade gezeichnete Stufe wieder zur Rampe. Zusätzlich mittelt der Filter
  nur Nachbarn, die höchstens drei typische Messabstände entfernt sind.

## [2.3.0] – 2026-10-31

### Hinzugefügt

- **Glättung in vier Stufen, im visuellen Editor wählbar:** `chart_smoothing` mit
  `none` / `light` / `medium` / `strong` (Standard `light`) unter *Verlauf → Glättung der
  Kurven*. `none` zeichnet jeden Messwert, `light` nimmt nur das Sensor-Zittern, `medium` und
  `strong` beruhigen sehr unruhige Sensoren. Der Editor erklärt den Trade-off direkt am Feld
  und graut es aus, wenn `chart_curve: linear` gewählt ist.

  Mittelwertfenster je Stufe (kurze / dichte Reihen): `none` 1/1, `light` 3/5,
  `medium` 5/9, `strong` 9/15 Punkte.

### Geändert

- **Kurven wirken nicht mehr flach.** Drei Ursachen behoben:
  - Das vertikale Fenster war zu großzügig (mindestens 0,8 °C bzw. 6 %) und drückte ruhige
    Räume zur Geraden. Jetzt 0,4 °C bzw. 3 % mit etwas weniger Rand (0,15 statt 0,18/0,2).
  - Der Mittelwert rundete fest auf **eine** Nachkommastelle und verschluckte damit jede
    Bewegung unter 0,05. Er rundet jetzt auf die Genauigkeit des Sensors (mindestens eine,
    höchstens zwei Nachkommastellen).
  - Die Stufe ist wählbar (siehe oben), statt fest verdrahtet zu sein.

  Gemessener vertikaler Ausschlag im Temperaturband einer 360 × 130-Karte (27 Messwerte,
  mittlere Stufe):

  | Datenlage | vorher (2.2.0) | `none` | `light` | `medium` | `strong` |
  | --- | --- | --- | --- | --- | --- |
  | ruhiger Raum, 0,16 °C | 7,5 px | 17,9 px | 15,7 px | 13,4 px | 12,3 px |
  | unruhiger Sensor, 1,9 °C | 31,6 px | 44,8 px | 33,0 px | 28,3 px | 23,6 px |

## [2.2.0] – 2026-10-31

### Hinzugefügt

- **Farbverlauf auch unter der Feuchtekurve.** Die Feuchte bekam bisher nur eine Linie; jetzt
  liegt auch unter ihr ein Flächenverlauf in ihrer eigenen Farbe – ruhiger als der der
  Temperatur (20 % → 7 % → 0 % statt 22 % → 8 % → 0 %), damit sie den Helden nicht überstrahlt.
  Der Verlauf endet exakt an der Unterkante des Feuchtebandes und läuft nie in die
  Temperaturhälfte.
- **Beide Verläufe im Editor schaltbar:** `chart_temperature_gradient` und
  `chart_humidity_gradient` (Standard jeweils `true`) unter *Verlauf*. Aus bleibt die Kurve
  allein stehen – Fläche weg, Linie, Endpunkt und Soll-Referenz unverändert.

### Geändert

- **Mittelweg bei der Glättung.** Der zentrierte Mittelwert war zu breit (5/7/9 Punkte je nach
  Dichte) und bügelte echte Ausschläge platt. Er ist jetzt auf **3 Punkte** reduziert (bei sehr
  dichten Reihen 5): Das Sensor-Zittern verschwindet weiterhin, die Form der Messung bleibt aber
  erkennbar – spürbar mehr Kontur als in 2.1.x, deutlich ruhiger als die Rohdaten.
- README beschreibt die tatsächlichen Deckkraft-Werte der Verläufe (die alten 30 %/2 % waren
  seit dem Redesign nicht mehr korrekt).

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

