import { beforeEach, describe, expect, it } from 'vitest';
import '../src/editor/room-climate-editor';
import type { RoomClimateCardConfig } from '../src/config';
import type { RoomClimateCardEditor } from '../src/editor/room-climate-editor';
import { createHass, entity } from './helpers';

/** Minimal stand-in for the Home Assistant `ha-selector` element. */
class StubSelector extends HTMLElement {
  hass?: unknown;
  selector: Record<string, any> = { text: {} };
  label = '';
  value: unknown = undefined;
  disabled = false;

  get type(): string {
    return Object.keys(this.selector)[0] ?? 'text';
  }

  emit(value: unknown): void {
    this.dispatchEvent(
      new CustomEvent('value-changed', { detail: { value }, bubbles: true, composed: true })
    );
  }
}

if (!customElements.get('ha-selector')) {
  customElements.define('ha-selector', StubSelector);
}

const hass = createHass({
  states: [
    entity('sensor.temp', { state: '21', attributes: { device_class: 'temperature' } }),
    entity('sensor.humidity', { state: '50', attributes: { device_class: 'humidity' } }),
    entity('binary_sensor.window', { state: 'off', attributes: { device_class: 'window' } }),
    entity('climate.thermostat', { state: 'heat' }),
  ],
});

async function mountEditor(config: unknown): Promise<RoomClimateCardEditor> {
  const editor = document.createElement('room-climate-card-editor') as RoomClimateCardEditor;
  editor.hass = hass;
  editor.setConfig(config);
  document.body.append(editor);
  await editor.updateComplete;
  return editor;
}

function selectors(editor: RoomClimateCardEditor): StubSelector[] {
  return Array.from(editor.shadowRoot!.querySelectorAll('ha-selector')) as StubSelector[];
}

function selectorByLabel(editor: RoomClimateCardEditor, label: string): StubSelector {
  const found = selectors(editor).find((element) => element.label === label);
  if (!found) throw new Error(`selector "${label}" not found`);
  return found;
}

function openAll(editor: RoomClimateCardEditor): void {
  for (const section of editor.shadowRoot!.querySelectorAll('details')) {
    section.open = true;
  }
}

const baseConfig: RoomClimateCardConfig = {
  type: 'custom:room-climate-card',
  name: 'Wohnzimmer',
  temperature_entity: 'sensor.temp',
  humidity_entity: 'sensor.humidity',
  window_entity: 'binary_sensor.window',
  climate_entity: 'climate.thermostat',
  custom_key: 42,
};

describe('room climate card editor', () => {
  beforeEach(() => {
    document.body.replaceChildren();
  });

  it('renders every configuration section', async () => {
    const editor = await mountEditor(baseConfig);
    const titles = Array.from(editor.shadowRoot!.querySelectorAll('.section-title')).map(
      (element) => element.textContent?.trim()
    );
    expect(titles).toEqual([
      'Allgemein',
      'Sensoren',
      'Messwerte (Schrift)',
      'Farben & Grenzwerte',
      'Fenster',
      'Bewegung',
      'Thermostat',
      'Verlauf',
    ]);
  });

  it('uses native entity selectors filtered by domain', async () => {
    const editor = await mountEditor(baseConfig);
    openAll(editor);
    expect(selectorByLabel(editor, 'Temperatursensor').selector).toEqual({
      entity: { domain: 'sensor', multiple: false },
    });
    expect(selectorByLabel(editor, 'Fensterkontakt').selector).toEqual({
      entity: { domain: ['binary_sensor', 'input_boolean', 'sensor'], multiple: false },
    });
    expect(selectorByLabel(editor, 'Thermostat-Entität').selector).toEqual({
      entity: { domain: 'climate', multiple: false },
    });
  });

  it('shows the stored configuration', async () => {
    const editor = await mountEditor(baseConfig);
    openAll(editor);
    expect(selectorByLabel(editor, 'Raumname').value).toBe('Wohnzimmer');
    expect(selectorByLabel(editor, 'Temperatursensor').value).toBe('sensor.temp');
    expect(selectorByLabel(editor, 'Kartenhöhe').value).toBe(240);
    expect((selectorByLabel(editor, 'Höhe automatisch (Inhalt)') as StubSelector).value).toBe(true);
  });

  it('emits config-changed with the merged configuration', async () => {
    const editor = await mountEditor(baseConfig);
    let detail: { config: RoomClimateCardConfig } | undefined;
    editor.addEventListener('config-changed', (event) => {
      detail = (event as CustomEvent<{ config: RoomClimateCardConfig }>).detail;
    });

    selectorByLabel(editor, 'Raumname').emit('Küche');

    expect(detail?.config.name).toBe('Küche');
    expect(detail?.config.temperature_entity).toBe('sensor.temp');
    expect(detail?.config.custom_key).toBe(42);
    expect(detail?.config.type).toBe('custom:room-climate-card');
    expect(editor.config.name).toBe('Küche');
  });

  it('keeps the selected values after being reconfigured', async () => {
    const editor = await mountEditor(baseConfig);
    let emitted: RoomClimateCardConfig | undefined;
    editor.addEventListener('config-changed', (event) => {
      emitted = (event as CustomEvent<{ config: RoomClimateCardConfig }>).detail.config;
    });
    selectorByLabel(editor, 'Raumname').emit('Küche');

    editor.setConfig(emitted);
    await editor.updateComplete;
    openAll(editor);
    expect(selectorByLabel(editor, 'Raumname').value).toBe('Küche');
  });

  it('disables window fields when the window section is off', async () => {
    const editor = await mountEditor(baseConfig);
    openAll(editor);
    expect(selectorByLabel(editor, 'Fensterkontakt').disabled).toBe(false);

    selectorByLabel(editor, 'Fensterstatus anzeigen').emit(false);
    await editor.updateComplete;
    openAll(editor);
    expect(selectorByLabel(editor, 'Fensterkontakt').disabled).toBe(true);
    expect(selectorByLabel(editor, 'Zustände für „offen“').disabled).toBe(true);
  });

  it('disables thermostat colours when the thermostat is off', async () => {
    const editor = await mountEditor(baseConfig);
    openAll(editor);
    selectorByLabel(editor, 'Thermostat anzeigen').emit(false);
    await editor.updateComplete;
    openAll(editor);
    expect(selectorByLabel(editor, 'Icon-Farbe Heizen (z. B. Rot)').disabled).toBe(true);
    expect(selectorByLabel(editor, 'Solltemperatur anzeigen (über Istwert)').disabled).toBe(true);
  });

  it('offers independent font size and family for temperature and humidity', async () => {
    const editor = await mountEditor(baseConfig);
    openAll(editor);

    expect(selectorByLabel(editor, 'Schriftgröße Temperatur').value).toBe(42);
    expect(selectorByLabel(editor, 'Schriftart Temperatur').value).toBe('');
    expect(selectorByLabel(editor, 'Schriftgröße Luftfeuchte').value).toBe(28);
    expect(selectorByLabel(editor, 'Schriftart Luftfeuchte').value).toBe('');

    selectorByLabel(editor, 'Schriftgröße Temperatur').emit(56);
    await editor.updateComplete;
    openAll(editor);
    expect(editor.config.temperature_font_size).toBe(56);
    expect(editor.config.humidity_font_size).toBeUndefined();

    selectorByLabel(editor, 'Schriftart Luftfeuchte').emit('Inter');
    await editor.updateComplete;
    openAll(editor);
    expect(editor.config.humidity_font_family).toBe('Inter');
    expect(editor.config.temperature_font_family).toBeUndefined();
  });

  it('disables chart options when no chart series is enabled', async () => {
    const editor = await mountEditor(baseConfig);
    openAll(editor);
    selectorByLabel(editor, 'Temperaturverlauf anzeigen').emit(false);
    await editor.updateComplete;
    openAll(editor);
    selectorByLabel(editor, 'Luftfeuchteverlauf anzeigen').emit(false);
    await editor.updateComplete;
    openAll(editor);
    expect(selectorByLabel(editor, 'Zeitraum').disabled).toBe(true);
    expect(selectorByLabel(editor, 'Chart-Höhe').disabled).toBe(true);
  });

  it('offers the data gap options and disables them in break mode', async () => {
    const editor = await mountEditor(baseConfig);
    openAll(editor);
    expect(selectorByLabel(editor, 'Datenlücken').value).toBe('connect');
    expect(selectorByLabel(editor, 'Maximal überbrückte Ausfallzeit').value).toBe(120);
    expect(selectorByLabel(editor, 'Darstellung überbrückter Abschnitte').value).toBe('solid');

    selectorByLabel(editor, 'Datenlücken').emit('break');
    await editor.updateComplete;
    openAll(editor);
    expect(editor.config.chart_gap_mode).toBe('break');
    expect(selectorByLabel(editor, 'Maximal überbrückte Ausfallzeit').disabled).toBe(true);
    expect(selectorByLabel(editor, 'Darstellung überbrückter Abschnitte').disabled).toBe(true);
  });

  it('enables the fixed height field when automatic height is switched off', async () => {
    const editor = await mountEditor(baseConfig);
    openAll(editor);
    expect(selectorByLabel(editor, 'Kartenhöhe').disabled).toBe(true);
    selectorByLabel(editor, 'Höhe automatisch (Inhalt)').emit(false);
    await editor.updateComplete;
    openAll(editor);
    expect(editor.config.height).toBe(240);
    expect(selectorByLabel(editor, 'Kartenhöhe').disabled).toBe(false);
  });

  it('keeps manual height when the height field is cleared', async () => {
    const editor = await mountEditor({ ...baseConfig, height: 320 });
    openAll(editor);
    expect(selectorByLabel(editor, 'Höhe automatisch (Inhalt)').value).toBe(false);

    // The user selects the value and deletes it completely.
    selectorByLabel(editor, 'Kartenhöhe').emit(undefined);
    await editor.updateComplete;
    openAll(editor);

    expect(editor.config.height).toBe(320);
    expect(selectorByLabel(editor, 'Höhe automatisch (Inhalt)').value).toBe(false);
    expect(selectorByLabel(editor, 'Kartenhöhe').value).toBe('');

    // Same for an empty string, which some selector versions emit.
    selectorByLabel(editor, 'Kartenhöhe').emit('');
    await editor.updateComplete;
    openAll(editor);
    expect(editor.config.height).toBe(320);
    expect(selectorByLabel(editor, 'Höhe automatisch (Inhalt)').value).toBe(false);
  });

  it('does not commit partial numbers but keeps them visible', async () => {
    const editor = await mountEditor({ ...baseConfig, height: 300 });
    openAll(editor);

    // Typing "2" on the way to "260" must not clamp to 140 and must not commit.
    selectorByLabel(editor, 'Kartenhöhe').emit(2);
    await editor.updateComplete;
    openAll(editor);
    expect(editor.config.height).toBe(300);
    expect(selectorByLabel(editor, 'Kartenhöhe').value).toBe(2);

    // A complete, in-range number is committed and the draft is dropped.
    selectorByLabel(editor, 'Kartenhöhe').emit(260);
    await editor.updateComplete;
    openAll(editor);
    expect(editor.config.height).toBe(260);
    expect(selectorByLabel(editor, 'Kartenhöhe').value).toBe(260);
  });

  it('accepts decimal commas from the number field', async () => {
    const editor = await mountEditor(baseConfig);
    openAll(editor);
    selectorByLabel(editor, 'Warm ab').emit('24,5');
    await editor.updateComplete;
    expect(editor.config.temperature_warm_above).toBe(24.5);
  });

  it('never drops a stored value when a field is emptied', async () => {
    const editor = await mountEditor({ ...baseConfig, border_radius: 22, humidity_decimals: 2 });
    openAll(editor);
    selectorByLabel(editor, 'Eckenradius').emit(undefined);
    selectorByLabel(editor, 'Dezimalstellen Luftfeuchte').emit('');
    await editor.updateComplete;
    openAll(editor);
    expect(editor.config.border_radius).toBe(22);
    expect(editor.config.humidity_decimals).toBe(2);
    expect(selectorByLabel(editor, 'Eckenradius').value).toBe('');
  });

  it('removes text keys when a text field is cleared', async () => {
    const editor = await mountEditor({
      ...baseConfig,
      name: 'Wohnzimmer',
      temperature_font_family: 'Inter',
    });
    openAll(editor);
    selectorByLabel(editor, 'Raumname').emit('');
    selectorByLabel(editor, 'Schriftart Temperatur').emit(undefined);
    await editor.updateComplete;
    openAll(editor);
    expect(editor.config.name).toBeUndefined();
    expect(editor.config.temperature_font_family).toBeUndefined();
    expect(selectorByLabel(editor, 'Raumname').value).toBe('');
  });

  it('restores the last manual height when automatic height is switched off', async () => {
    const editor = await mountEditor(baseConfig);
    openAll(editor);
    selectorByLabel(editor, 'Höhe automatisch (Inhalt)').emit(false);
    await editor.updateComplete;
    openAll(editor);
    expect(editor.config.height).toBe(240);

    selectorByLabel(editor, 'Kartenhöhe').emit(380);
    await editor.updateComplete;
    openAll(editor);
    expect(editor.config.height).toBe(380);

    selectorByLabel(editor, 'Höhe automatisch (Inhalt)').emit(true);
    await editor.updateComplete;
    openAll(editor);
    expect(editor.config.height).toBe('auto');

    selectorByLabel(editor, 'Höhe automatisch (Inhalt)').emit(false);
    await editor.updateComplete;
    openAll(editor);
    expect(editor.config.height).toBe(380);
  });

  it('converts colour selector values to hex strings', async () => {
    const editor = await mountEditor(baseConfig);
    openAll(editor);
    let emitted: RoomClimateCardConfig | undefined;
    editor.addEventListener('config-changed', (event) => {
      emitted = (event as CustomEvent<{ config: RoomClimateCardConfig }>).detail.config;
    });
    selectorByLabel(editor, 'Icon-Farbe Heizen (z. B. Rot)').emit([255, 128, 0]);
    expect(emitted?.heating_color).toBe('#ff8000');
  });

  it('converts the chart period select to a number', async () => {
    const editor = await mountEditor(baseConfig);
    openAll(editor);
    let emitted: RoomClimateCardConfig | undefined;
    editor.addEventListener('config-changed', (event) => {
      emitted = (event as CustomEvent<{ config: RoomClimateCardConfig }>).detail.config;
    });
    selectorByLabel(editor, 'Zeitraum').emit('24');
    expect(emitted?.chart_hours).toBe(24);
  });

  it('provides a state selector for window open states', async () => {
    const editor = await mountEditor(baseConfig);
    openAll(editor);
    expect(selectorByLabel(editor, 'Zustände für „offen“').selector).toEqual({
      state: { entity_id: 'binary_sensor.window', multiple: true },
    });
  });

  it('falls back to a text field for open states without an entity', async () => {
    const editor = await mountEditor({ type: 'custom:room-climate-card', show_window: true });
    openAll(editor);
    const field = selectorByLabel(editor, 'Zustände für „offen“');
    expect(field.selector).toEqual({ text: {} });
    field.emit('on, tilted');
    await editor.updateComplete;
    expect(editor.config.window_open_states).toEqual(['on', 'tilted']);
  });

  it('uses english labels for english locales', async () => {
    const editor = document.createElement('room-climate-card-editor') as RoomClimateCardEditor;
    editor.hass = createHass({ language: 'en' });
    editor.setConfig(baseConfig);
    document.body.append(editor);
    await editor.updateComplete;
    const titles = Array.from(editor.shadowRoot!.querySelectorAll('.section-title')).map(
      (element) => element.textContent?.trim()
    );
    expect(titles[0]).toBe('General');
  });

  it('survives an empty configuration', async () => {
    const editor = await mountEditor(undefined);
    expect(editor.shadowRoot!.querySelectorAll('.section').length).toBe(8);
    expect(editor.config.type).toBe('custom:room-climate-card');
  });
});
