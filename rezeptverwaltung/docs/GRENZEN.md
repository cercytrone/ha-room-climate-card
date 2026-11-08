# Bekannte Grenzen

## Webseiten-Import

* Es gibt **keine Importgarantie**. Zuverlässig funktionieren Seiten mit strukturierten Rezeptdaten nach Schema.org (JSON-LD, ersatzweise Microdata) – das bieten viele große Rezeptportale und Blogs mit gängigen Rezept-Plugins.
* Seiten ohne strukturierte Daten werden nicht „geraten“, sondern mit verständlicher Meldung abgelehnt; als Alternative steht „Text einfügen“ bereit.
* Seiten hinter Anmeldung, Bezahlschranke, Bot-Schutz (z. B. JavaScript-Challenges) oder mit reinem JavaScript-Rendering können nicht importiert werden. Zugangsbeschränkungen werden bewusst nicht umgangen.
* Zutatenzeilen werden heuristisch zerlegt. Was nicht sicher erkennbar ist (z. B. „2 x 250 g Quark“), bleibt als Originaltext erhalten und wird markiert.
* Nährwerte werden nur übernommen, wenn sie angegeben sind. Fehlt die Bezugsgröße, wird „pro Portion“ angenommen **und markiert** (Schema.org-Konvention). Natrium wird nicht in Salz umgerechnet.
* Bilder werden nur übernommen, wenn sie technisch abrufbar sind (öffentliche Adresse, JPEG/PNG/WebP, Größenlimits). Ob die Übernahme rechtlich zulässig ist (Urheberrecht), liegt in Ihrer Verantwortung; die Anwendung ist für die private Nutzung gedacht und speichert die Quelle.
* Zeitlimits: 5 s Verbindungsaufbau, 15 s gesamt je Abruf, max. 5 MB HTML, max. 5 Weiterleitungen.
* Zeichensätze außer UTF-8 werden konvertiert, exotische Kodierungen können fehlerhaft sein.

## Mengen und Einheiten

* Gewicht wird nie in Volumen umgerechnet (und umgekehrt); Löffel/Tassen werden nicht in ml umgerechnet.
* Bei Bereichen („2–3 Eier“) übernimmt die Einkaufsliste die Obergrenze und markiert den Eintrag.
* Zusammengeführt werden nur Zutaten mit (nach Groß-/Kleinschreibung und Leerzeichen) **gleichem Namen**. „Mehl“ und „Weizenmehl Type 550“ bleiben getrennt.
* Die Anzeige rundet (g/ml ganzzahlig ab 10, sonst bis 2 Nachkommastellen); gespeichert wird mit 4 Nachkommastellen.

## Sonstiges

* Ausgelegt für **eine Person** (bzw. wenige Konten). Kategorien, Rezeptarten und Schlagwörter sind kontoübergreifend gemeinsam; Rezepte und Einkaufslisten sind je Konto geschützt.
* Es gibt keine E-Mail-basierte Passwortrücksetzung; das Passwort wird per SSH neu gesetzt (`rezepte:passwort-setzen`).
* Die Suche nutzt MySQL `LIKE` über einen vorberechneten Suchtext (Teilwörter, Umlaut-tolerant durch die Kollation). Für einige tausend Rezepte ausreichend; keine Relevanzsortierung.
* Content-Security-Policy erlaubt `unsafe-eval`, weil Alpine.js Ausdrücke so auswertet. Inline-Skripte sind nicht erlaubt; Benutzerinhalte werden immer maskiert bzw. als bereinigtes Markdown dargestellt.
* PDF: dompdf unterstützt nicht alle CSS-Funktionen; das Layout ist bewusst einfach (Tabellen, Seitenumbrüche zwischen Zutaten/Schritten). Sehr lange einzelne Schritte werden über Seiten umbrochen.
* Wiederherstellung einer Sicherung ist nur per SSH möglich (bewusst, da sie alle Daten ersetzt).
* Sicherung/Export über die Weboberfläche sind an `max_execution_time` (180 s) gebunden. Bei sehr vielen bzw. großen Bildern die SSH-/Cron-Variante nutzen.
* Lokal wurden Migrationen und Tests gegen MySQL **8.0.46** ausgeführt (MySQL-8.4-Pakete waren in der Entwicklungsumgebung nicht installierbar). Die mitgelieferte GitHub-Actions-Pipeline testet gegen das offizielle Image `mysql:8.4`. Auf dem Webspace zusätzlich `php artisan rezepte:systempruefung` ausführen.
