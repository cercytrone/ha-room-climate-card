# Exportformat `rezeptverwaltung-export`, Version 1

Eine ZIP-Datei mit folgendem Inhalt:

```
manifest.json
rezepte.json
images/<id>.jpg             Anzeigeversion (max. 1600 px, JPEG)
images/<id>_thumb.jpg       Vorschaubild (max. 640 px, JPEG)
images/<id>_original.<ext>  optional: Originaldatei (jpg|png|webp)
```

Alle Texte sind UTF-8. Zahlen verwenden den Dezimalpunkt (JSON), Zeitangaben sind ganze Minuten, Zeitstempel ISO 8601.

## manifest.json

```json
{
  "format": "rezeptverwaltung-export",
  "version": 1,
  "exported_at": "2026-11-08T10:00:00+01:00",
  "recipes": 42,
  "includes_notes": true,
  "includes_original_images": false
}
```

Ein Importer muss `format` prüfen und Versionen größer als die eigene ablehnen.

## rezepte.json

```json
{
  "recipe_types": [ { "name": "Brot", "sort_order": 1 } ],
  "categories":   [ { "path": ["Brot"], "sort_order": 1 }, { "path": ["Brot", "Sauerteig"], "sort_order": 3 } ],
  "tags":         [ "rustikal" ],
  "recipes": [
    {
      "id": 7,
      "title": "Bauernbrot",
      "description": "Markdown oder null",
      "type": "Brot",
      "categories": [ ["Brot", "Sauerteig"] ],
      "tags": ["rustikal"],
      "source_url": "https://…", "source_text": null, "author": null,
      "yield_quantity": 1.0, "yield_unit": "Brote",
      "prep_minutes": 20, "rest_minutes": 720, "cook_minutes": 45, "total_minutes": null,
      "rating": 4, "is_favorite": true,
      "notes": "Markdown oder null (null, wenn ohne Notizen exportiert)",
      "created_at": "…", "updated_at": "…",
      "ingredient_groups": [
        { "name": "Vorteig", "items": [
          { "quantity": 500.0, "quantity_max": null, "quantity_text": null, "unit": "g",
            "name": "Mehl", "note": "Type 550", "scalable": true, "original_text": "500 g Mehl Type 550" },
          { "quantity": null, "quantity_max": null, "quantity_text": "etwas", "unit": null,
            "name": "Öl", "note": null, "scalable": false, "original_text": null }
        ] }
      ],
      "steps": [ "Markdown-Text Schritt 1", "Schritt 2" ],
      "nutrition": { "basis": "serving|100g|recipe", "basis_label": null, "energy_kcal": 250.0, "energy_kj": null,
                     "fat": 2.5, "saturated_fat": null, "carbohydrates": null, "sugar": null,
                     "protein": null, "salt": null, "fiber": null },
      "image": { "file": "images/7.jpg", "thumb": "images/7_thumb.jpg", "original": null,
                 "original_name": "brot.jpg", "source_url": null, "width": 1600, "height": 1200 }
    }
  ]
}
```

### Bedeutung einzelner Felder

* `categories` / `recipes[].categories`: Kategorien werden über ihren **Pfad** (Liste der Namen von oben nach unten) identifiziert, nicht über IDs.
* `quantity`/`quantity_max`: Zahl bzw. Bereich (2–3). `quantity_text`: nicht numerische Angabe („etwas“). Beides `null` = keine Menge.
* `scalable`: ob die Menge beim Ändern der Rezeptmenge umgerechnet wird.
* `total_minutes`: ausdrücklich hinterlegte Gesamtzeit; `null` bedeutet „Summe der Einzelzeiten anzeigen“.
* `nutrition.basis`: `serving` = pro Portion/Einheit der Rezeptmenge, `100g` = pro 100 g, `recipe` = gesamtes Rezept. Nur `recipe` wird beim Skalieren umgerechnet. Fehlende Werte sind `null` (nicht 0).
* `id`: ID in der exportierenden Installation (nur zur Zuordnung der Bilddateien).
