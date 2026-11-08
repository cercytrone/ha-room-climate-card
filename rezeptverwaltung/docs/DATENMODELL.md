# Datenmodell, Seitenstruktur und Abläufe

Alle Tabellen: InnoDB, `utf8mb4` / `utf8mb4_unicode_ci`. Migrationen: `database/migrations/`.

## Tabellen und Beziehungen

```
users ─┬─< recipes >── recipe_types              (n:1, optional)
       │      ├──< category_recipe >── categories ──┐ (n:m; categories.parent_id -> categories, hierarchisch)
       │      ├──< recipe_tag >── tags               (n:m)
       │      ├──< ingredient_groups ──< ingredients (Gruppen + Zeilen, sortiert über position)
       │      ├──< recipe_steps                       (sortiert über position, Markdown)
       │      ├──── recipe_nutrition                  (1:1, optional, mit Bezugsgröße)
       │      ├──── recipe_images                     (1:1, optional, Dateien im privaten Speicher)
       │      └──< recipe_shares                      (öffentliche Freigabelinks, widerrufbar)
       ├─< shopping_lists ─┬─< shopping_list_recipes (Rezeptauswahl + Zielmenge, Titel-Schnappschuss)
       │                   └─< shopping_list_items ──< shopping_list_item_sources >── shopping_list_recipes
       └─< import_queue_items                          (optionale Stapelimporte)
ingredient_areas (gemerkte Zuordnung Zutat -> Einkaufsbereich)
task_runs (Protokoll geplanter Aufgaben)   settings (Schlüssel/Wert)   sessions, cache, cache_locks (Laravel)
```

### Wichtige Felder

| Tabelle | Felder (Auszug) | Hinweise |
|---|---|---|
| `recipes` | title, description, recipe_type_id, source_url (+ `source_url_hash` für Dublettenprüfung), source_text, author, `yield_quantity DECIMAL(10,3)`, yield_unit, prep/rest/cook_minutes, `total_minutes` (ausdrücklich, sonst NULL), rating 1–5, is_favorite, notes, `search_text` | Indizes auf title, rating, created_at, updated_at, is_favorite, source_url_hash |
| `categories` | parent_id, name, sort_order | eindeutig je Ebene (`parent_id, name`) |
| `ingredients` | `quantity DECIMAL(14,4)`, `quantity_max` (Bereich), `quantity_text` („etwas“), unit, name, note („zimmerwarm“), scalable, original_text | Originaltext bleibt bei Importen erhalten |
| `recipe_nutrition` | basis (`serving`/`100g`/`recipe`), basis_label, energy_kcal, energy_kj, fat, saturated_fat, carbohydrates, sugar, protein, salt, fiber | alle Werte optional (NULL = unbekannt) |
| `recipe_images` | path, thumb_path, original_path, mime, width, height, size_bytes, original_name, source_url | Dateien unter `storage/app/private/recipe-images/JJJJ/<zufall>.jpg` |
| `recipe_shares` | token (256 Bit Zufall), include_notes/image/nutrition, revoked_at, last_accessed_at | Standard: Notizen **nicht** freigegeben |
| `shopping_list_items` | name, quantity, quantity_text, unit, note, area, merge_key, is_checked, is_manual, review_reason | `review_reason` = Grund für Kennzeichnung „prüfen“ |

## Löschregeln

| Gelöscht wird … | Folge |
|---|---|
| **Rezept** | Zutatengruppen, Zutaten, Schritte, Nährwerte, Bild-Datensatz, Freigabelinks, Kategorie- und Schlagwortzuordnungen werden gelöscht (CASCADE). Bilddateien entfernt das Model-Ereignis. **Einkaufslisten** behalten ihre bereits übernommenen Einträge; die Rezeptauswahl behält den Titel, verliert aber den Verweis (SET NULL) und kann nicht mehr neu berechnet werden. |
| **Rezeptart** | Rezepte bleiben, ihre Rezeptart wird leer (SET NULL). |
| **Kategorie** | Dialog mit Erklärung: Unterkategorien eine Ebene nach oben verschieben (Standard) **oder** mitlöschen; Zuordnungen werden entfernt, optional der übergeordneten Kategorie zugeordnet. **Rezepte werden nie gelöscht.** Der Fremdschlüssel `parent_id` ist RESTRICT, damit keine verwaisten Unterkategorien entstehen. |
| **Schlagwort** | nur die Zuordnung verschwindet. Umbenennen in einen vorhandenen Namen führt beide zusammen. |
| **Einkaufsliste / Eintrag** | betrifft nie ein Rezept. |
| **Benutzer** | (nur per Datenbank) löscht dessen Rezepte und Listen (CASCADE). |

## Seitenstruktur

| Bereich | Adresse | Inhalt |
|---|---|---|
| Rezeptsammlung | `/rezepte` | Suche, Filter (Rezeptart, Kategorie inkl. Unterkategorien, Favoriten, Bewertung), Sortierung, Karten-/Listenansicht, Mehrfachauswahl für die Einkaufsliste |
| Rezept | `/rezepte/{id}` | Mengenanpassung, Zutaten, Zubereitung, Notizen, Nährwerte, Teilen/Drucken/PDF, Einkaufsliste, Freigabelinks, Löschen |
| Rezept hinzufügen/bearbeiten | `/rezepte/neu`, `/rezepte/{id}/bearbeiten` | Formular (auch Importvorschau) |
| Rezept importieren | `/import` | Webseite, Text einfügen, Warteschlange |
| Einkaufsliste | `/einkaufsliste` | aktuelle Liste, Rezeptauswahl, Teilen, Druck/PDF, mehrere Listen |
| Kategorien | `/kategorien` | Kategorien (Baum), Rezeptarten, Schlagwörter |
| Einstellungen | `/einstellungen` | Konto, Passwort, Darstellung, Sicherungen, Export/Import, Protokoll, Systemprüfung |
| Öffentliche Freigabe | `/r/{token}` | nur lesend, nur dieses Rezept |

## Nutzerabläufe (Kurzfassung)

* **Mengenanpassung:** Zielmenge eingeben (Dezimalkomma/Brüche) → Faktor = Ziel / Original → Anzeige im Browser; Speicherwerte bleiben unverändert; `?menge=` wird an Druck/PDF/Text/Einkaufsliste weitergegeben.
* **Import:** URL → serverseitiger Abruf (SSRF-geschützt) → Schema.org/JSON-LD, sonst Microdata → ggf. Auswahl → bearbeitbare Vorschau mit Markierungen → Speichern.
* **Einkaufsliste:** Rezept + Zielmenge → Zutaten skaliert übernehmen → gleiche Namen + kompatible Einheit werden zusammengeführt → bei erneutem Hinzufügen Rückfrage „aktualisieren“ oder „zusätzlich“.
