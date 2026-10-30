import { LitElement, css, html, nothing, type TemplateResult } from 'lit';
import { CARD_TAG, EDITOR_TAG } from '../const';
import {
  DEFAULT_COLORS,
  asBoolean,
  asEntityId,
  asString,
  type RoomClimateCardConfig,
} from '../config';
import { baseLanguage } from '../localize';
import type { HomeAssistant } from '../types';
import { hexToRgbArray, rgbArrayToHex } from '../utils/format';

interface EditorText {
  general: string;
  sensors: string;
  typography: string;
  colors: string;
  window: string;
  motion: string;
  thermostat: string;
  chart: string;
  name: string;
  nameHelper: string;
  nameEntity: string;
  nameEntityHelper: string;
  icon: string;
  autoHeight: string;
  height: string;
  heightHelper: string;
  radius: string;
  theme: string;
  themeAuto: string;
  themeDark: string;
  themeLight: string;
  temperatureEntity: string;
  humidityEntity: string;
  temperatureDecimals: string;
  humidityDecimals: string;
  temperatureSize: string;
  temperatureFont: string;
  humiditySize: string;
  humidityFont: string;
  readingSizeHelper: string;
  showSeriesLabels: string;
  readingFontHelper: string;
  accentColor: string;
  secondaryColor: string;
  colorsHelper: string;
  showWindow: string;
  windowEntity: string;
  windowOpenStates: string;
  windowOpenStatesHelper: string;
  showMotion: string;
  motionEntity: string;
  motionLastChanged: string;
  showThermostat: string;
  climateEntity: string;
  showClimateRow: string;
  showSetpoint: string;
  showHvacStatus: string;
  showHvacMode: string;
  heatingColor: string;
  idleColor: string;
  offColor: string;
  showTemperatureChart: string;
  showHumidityChart: string;
  hours: string;
  chartHeight: string;
  curve: string;
  curveSmooth: string;
  curveLinear: string;
  gapMode: string;
  gapConnect: string;
  gapBreak: string;
  gapHelper: string;
  maxGap: string;
  gapStyle: string;
  gapStyleSolid: string;
  gapStyleDashed: string;
  humidityLine: string;
  humidityLineSolid: string;
  humidityLineDotted: string;
  humidityLineHelper: string;
  grid: string;
  points: string;
  missingEntity: string;
  loading: string;
  generalHelper: string;
}

const TEXT: Record<'de' | 'en', EditorText> = {
  de: {
    general: 'Allgemein',
    sensors: 'Sensoren',
    typography: 'Messwerte (Schrift)',
    colors: 'Farben & Grenzwerte',
    window: 'Fenster',
    motion: 'Bewegung',
    thermostat: 'Thermostat',
    chart: 'Verlauf',
    name: 'Raumname',
    nameHelper: 'Leer lassen, um den Namen der Temperatur-Entität zu verwenden.',
    nameEntity: 'Name aus Entität übernehmen',
    nameEntityHelper: 'Optional: Der Anzeigename dieser Entität wird als Raumname verwendet.',
    icon: 'Raumicon',
    autoHeight: 'Höhe automatisch (Inhalt)',
    height: 'Kartenhöhe',
    heightHelper: 'Feste Höhe in Pixeln. Die Karte komprimiert ihren Inhalt automatisch.',
    radius: 'Eckenradius',
    theme: 'Darstellung',
    themeAuto: 'Automatisch (Home-Assistant-Theme)',
    themeDark: 'Dunkel',
    themeLight: 'Hell',
    temperatureEntity: 'Temperatursensor',
    humidityEntity: 'Luftfeuchtesensor',
    temperatureDecimals: 'Dezimalstellen Temperatur',
    humidityDecimals: 'Dezimalstellen Luftfeuchte',
    temperatureSize: 'Schriftgröße Temperatur',
    temperatureFont: 'Schriftart Temperatur',
    humiditySize: 'Schriftgröße Luftfeuchte',
    humidityFont: 'Schriftart Luftfeuchte',
    readingSizeHelper:
      'Wirkt nur auf diesen Messwert. Bei sehr kleinen Kartenhöhen wird die Größe automatisch mitskaliert.',
    showSeriesLabels: 'Beschriftung über den Werten (TEMPERATUR / LUFTFEUCHTE) anzeigen',
    readingFontHelper:
      'Leer lassen für die Schrift des Home-Assistant-Themes. Beispiele: Inter, „Roboto, sans-serif“, var(--ha-font-family-body).',
    accentColor: 'Akzentfarbe (Temperatur)',
    secondaryColor: 'Sekundärfarbe (Luftfeuchte)',
    colorsHelper:
      'Die Akzentfarbe markiert nur den Primärwert: Punkt am Messwert und Temperaturkurve. Die Sekundärfarbe erscheint ausschließlich am Feuchtepunkt und an der Feuchtekurve.',
    showWindow: 'Fensterstatus anzeigen',
    windowEntity: 'Fensterkontakt',
    windowOpenStates: 'Zustände für „offen“',
    windowOpenStatesHelper: 'Mehrfachauswahl. Übliche Zustände: on, open, tilted.',
    showMotion: 'Bewegung anzeigen',
    motionEntity: 'Bewegungsmelder',
    motionLastChanged: 'Ruhe-Dauer anzeigen',
    showThermostat: 'Thermostat anzeigen',
    climateEntity: 'Thermostat-Entität',
    showClimateRow: 'Statuszeile unter dem Messwert (Heizstatus & Solltemperatur) anzeigen',
    showSetpoint: 'Solltemperatur in der Statuszeile anzeigen',
    showHvacStatus: 'Heizstatus (Flamme + Statuswort) anzeigen',
    showHvacMode: 'Betriebsmodus anzeigen',
    heatingColor: 'Icon-Farbe Heizen (z. B. Rot)',
    idleColor: 'Icon-Farbe Ruhe (z. B. Grün)',
    offColor: 'Icon-Farbe ausgeschaltet (z. B. Grau)',
    showTemperatureChart: 'Temperaturverlauf anzeigen',
    showHumidityChart: 'Luftfeuchteverlauf anzeigen',
    hours: 'Zeitraum',
    chartHeight: 'Chart-Höhe',
    curve: 'Kurvenverlauf',
    curveSmooth: 'Geglättet',
    curveLinear: 'Direkt verbunden',
    gapMode: 'Datenlücken',
    gapConnect: 'Kurze Ausfälle überbrücken',
    gapBreak: 'Ausfälle sichtbar unterbrechen',
    gapHelper:
      'Konstante Phasen zeichnet die Karte immer durchgehend. Diese Option betrifft nur echte Ausfälle (unavailable/unknown).',
    maxGap: 'Maximal überbrückte Ausfallzeit',
    gapStyle: 'Darstellung überbrückter Abschnitte',
    gapStyleSolid: 'Durchgezogen (empfohlen)',
    gapStyleDashed: 'Gestrichelt',
    humidityLine: 'Linienart Luftfeuchte',
    humidityLineSolid: 'Durchgezogen',
    humidityLineDotted: 'Gepunktet',
    humidityLineHelper:
      'Nur die Feuchtekurve. Die Temperaturkurve bleibt unverändert; Fläche, Endpunkt und Farben gelten weiter.',
    grid: 'Gitternetz',
    points: 'Datenpunkte',
    missingEntity: 'Bitte eine Entität auswählen.',
    loading: 'Editor wird geladen …',
    generalHelper: 'Alle Werte sind optional – die Karte funktioniert auch mit Teilkonfiguration.',
  },
  en: {
    general: 'General',
    sensors: 'Sensors',
    typography: 'Readings (font)',
    colors: 'Colours & thresholds',
    window: 'Window',
    motion: 'Motion',
    thermostat: 'Thermostat',
    chart: 'History',
    name: 'Room name',
    nameHelper: 'Leave empty to use the temperature entity name.',
    nameEntity: 'Take name from entity',
    nameEntityHelper: 'Optional: this entity’s friendly name is used as the room name.',
    icon: 'Room icon',
    autoHeight: 'Automatic height (content)',
    height: 'Card height',
    heightHelper: 'Fixed height in pixels. The card compresses itself automatically.',
    radius: 'Corner radius',
    theme: 'Appearance',
    themeAuto: 'Automatic (Home Assistant theme)',
    themeDark: 'Dark',
    themeLight: 'Light',
    temperatureEntity: 'Temperature sensor',
    humidityEntity: 'Humidity sensor',
    temperatureDecimals: 'Temperature decimals',
    humidityDecimals: 'Humidity decimals',
    temperatureSize: 'Temperature font size',
    temperatureFont: 'Temperature font family',
    humiditySize: 'Humidity font size',
    humidityFont: 'Humidity font family',
    readingSizeHelper:
      'Applies to this reading only. Very small card heights scale the size down automatically.',
    showSeriesLabels: 'Show captions above the values (TEMPERATURE / HUMIDITY)',
    readingFontHelper:
      'Leave empty to use the Home Assistant theme font. Examples: Inter, "Roboto, sans-serif", var(--ha-font-family-body).',
    accentColor: 'Accent colour (temperature)',
    secondaryColor: 'Secondary colour (humidity)',
    colorsHelper:
      'The accent marks the primary value only: the dot next to it and the temperature curve. The secondary colour is used exclusively for the humidity dot and curve.',
    showWindow: 'Show window status',
    windowEntity: 'Window contact',
    windowOpenStates: 'States considered open',
    windowOpenStatesHelper: 'Multiple selection. Common states: on, open, tilted.',
    showMotion: 'Show motion',
    motionEntity: 'Motion sensor',
    motionLastChanged: 'Show quiet duration',
    showThermostat: 'Show thermostat',
    climateEntity: 'Climate entity',
    showClimateRow: 'Show the status row (heating state & target temperature)',
    showSetpoint: 'Show target temperature in the status row',
    showHvacStatus: 'Show heating state (flame + wording)',
    showHvacMode: 'Show HVAC mode',
    heatingColor: 'Heating icon colour (e.g. red)',
    idleColor: 'Idle icon colour (e.g. green)',
    offColor: 'Off icon colour (e.g. grey)',
    showTemperatureChart: 'Show temperature history',
    showHumidityChart: 'Show humidity history',
    hours: 'Period',
    chartHeight: 'Chart height',
    curve: 'Curve',
    curveSmooth: 'Smoothed',
    curveLinear: 'Straight',
    gapMode: 'Data gaps',
    gapConnect: 'Bridge short outages',
    gapBreak: 'Show outages as broken',
    gapHelper:
      'Constant phases are always drawn continuously. This option only affects real outages (unavailable/unknown).',
    maxGap: 'Largest bridged outage',
    gapStyle: 'Style of bridged parts',
    gapStyleSolid: 'Solid (recommended)',
    gapStyleDashed: 'Dashed',
    humidityLine: 'Humidity line style',
    humidityLineSolid: 'Solid',
    humidityLineDotted: 'Dotted',
    humidityLineHelper:
      'Humidity curve only. The temperature curve is unchanged; area, end marker and colours still apply.',
    grid: 'Grid lines',
    points: 'Data points',
    missingEntity: 'Please select an entity.',
    loading: 'Loading editor …',
    generalHelper: 'Everything is optional – the card also works with a partial configuration.',
  },
};

type SectionId =
  | 'general'
  | 'sensors'
  | 'typography'
  | 'colors'
  | 'window'
  | 'motion'
  | 'thermostat'
  | 'chart';

interface FieldOptions {
  key: string;
  label: string;
  selector: Record<string, unknown>;
  value: unknown;
  disabled?: boolean;
  helper?: string;
  warning?: string;
  /** Reset an unfinished draft when focus leaves the field. */
  revertOnLeave?: boolean;
  onChange?: (value: unknown) => void;
}

/**
 * Parses what a Home Assistant number selector hands back. Returns `null` for
 * "nothing usable right now" – an empty field, a lone minus sign or the value
 * `undefined` that `ha-selector` emits while the user is still typing.
 */
export function parseEditorNumber(raw: unknown): number | null {
  if (typeof raw === 'number') return Number.isFinite(raw) ? raw : null;
  if (typeof raw === 'string') {
    const trimmed = raw.trim().replace(',', '.');
    if (!trimmed || trimmed === '-' || trimmed === '.') return null;
    const parsed = Number(trimmed);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

export class RoomClimateCardEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _selectorsReady: { state: true },
    _drafts: { state: true },
  };

  hass?: HomeAssistant;
  _config: RoomClimateCardConfig = { type: `custom:${CARD_TAG}` };
  _selectorsReady = false;
  /**
   * Values the user is currently typing. A field may show `''` (or a partial
   * number) without that ever reaching the configuration – clearing a field
   * must not delete the stored value or flip a related switch.
   */
  _drafts: Record<string, unknown> = {};

  private openSections = new Set<SectionId>(['general', 'sensors']);
  /** Remembers the last manual height so "auto off" can restore it. */
  private lastManualHeight = 240;

  connectedCallback(): void {
    super.connectedCallback();
    this._selectorsReady = typeof customElements !== 'undefined' && Boolean(customElements.get('ha-selector'));
    if (!this._selectorsReady && typeof customElements !== 'undefined') {
      customElements
        .whenDefined('ha-selector')
        .then(() => {
          this._selectorsReady = true;
        })
        .catch(() => undefined);
    }
  }

  setConfig(config: unknown): void {
    // A fresh configuration (e.g. YAML edited outside the editor) wins over
    // half-typed drafts.
    this._drafts = {};
    this._config =
      config && typeof config === 'object'
        ? ({ ...(config as RoomClimateCardConfig), type: (config as RoomClimateCardConfig).type ?? `custom:${CARD_TAG}` })
        : { type: `custom:${CARD_TAG}` };
  }

  get config(): RoomClimateCardConfig {
    return this._config;
  }

  private get text(): EditorText {
    const language = baseLanguage(this.hass?.locale?.language ?? this.hass?.language);
    return TEXT[language];
  }

  /** Value shown in a field: the draft while editing, otherwise the config. */
  private shownValue(key: string, fallbackValue: unknown): unknown {
    return Object.prototype.hasOwnProperty.call(this._drafts, key)
      ? this._drafts[key]
      : fallbackValue;
  }

  private setDraft(key: string, value: unknown): void {
    if (Object.prototype.hasOwnProperty.call(this._drafts, key) && this._drafts[key] === value) {
      return;
    }
    this._drafts = { ...this._drafts, [key]: value };
  }

  private clearDraft(key: string): void {
    if (!Object.prototype.hasOwnProperty.call(this._drafts, key)) return;
    const next = { ...this._drafts };
    delete next[key];
    this._drafts = next;
  }

  private patch(patch: Record<string, unknown>): void {
    const next: RoomClimateCardConfig = { ...this._config, ...patch };
    for (const key of Object.keys(next)) {
      if (next[key] === undefined) delete next[key];
    }
    next.type = this._config.type ?? `custom:${CARD_TAG}`;
    this._config = next;
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: next },
        bubbles: true,
        composed: true,
      })
    );
  }

  private rawBoolean(key: string): boolean | undefined {
    return asBoolean(this._config[key]);
  }

  private showFlag(showKey: string, entityKey: string): boolean {
    return this.rawBoolean(showKey) ?? Boolean(asEntityId(this._config[entityKey]));
  }

  /**
   * Height to use when "automatic height" is switched off again: the value the
   * user last entered, or the stored manual height, or a sensible default.
   */
  private manualHeight(): number {
    const stored = this._config.height;
    const parsed = typeof stored === 'number' ? stored : Number(stored);
    if (Number.isFinite(parsed) && parsed > 0) this.lastManualHeight = parsed;
    return this.lastManualHeight;
  }

  private numberValue(key: string, fallback: number): number {
    const value = this._config[key];
    const parsed = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  private stringValue(key: string, fallback = ''): string {
    return asString(this._config[key]) ?? fallback;
  }

  private colorValue(key: string, fallback: string): [number, number, number] {
    const raw = asString(this._config[key]) ?? fallback;
    return hexToRgbArray(raw) ?? hexToRgbArray(fallback) ?? [148, 163, 184];
  }

  private renderColor(options: {
    key: string;
    label: string;
    fallback: string;
    disabled?: boolean;
  }): TemplateResult {
    return this.renderField({
      key: options.key,
      label: options.label,
      selector: { color_rgb: {} },
      value: this.colorValue(options.key, options.fallback),
      disabled: options.disabled,
      onChange: (value) => {
        if (Array.isArray(value) && value.length >= 3) {
          this.patch({ [options.key]: rgbArrayToHex(value as [number, number, number]) });
        }
      },
    });
  }

  private renderField(options: FieldOptions): TemplateResult {
    return html`<div
      class="field ${options.disabled ? 'is-disabled' : ''}"
      @focusout=${() => {
        // Leaving the field with an empty or incomplete draft: show the stored
        // value again instead of an input that looks broken forever.
        if (options.revertOnLeave) this.clearDraft(options.key);
      }}
    >
      <ha-selector
        .hass=${this.hass}
        .selector=${options.selector}
        .label=${options.label}
        .value=${this.shownValue(options.key, options.value)}
        .disabled=${Boolean(options.disabled)}
        @value-changed=${(event: CustomEvent<{ value: unknown }>) => {
          event.stopPropagation();
          if (options.disabled) return;
          if (options.onChange) options.onChange(event.detail.value);
          else this.patch({ [options.key]: event.detail.value });
        }}
      ></ha-selector>
      ${options.helper ? html`<span class="helper">${options.helper}</span>` : nothing}
      ${options.warning ? html`<span class="helper warning">${options.warning}</span>` : nothing}
    </div>`;
  }

  private renderSwitch(options: {
    key: string;
    label: string;
    value: boolean;
    disabled?: boolean;
    helper?: string;
    onChange?: (value: boolean) => void;
  }): TemplateResult {
    return this.renderField({
      key: options.key,
      label: options.label,
      selector: { boolean: {} },
      value: options.value,
      disabled: options.disabled,
      helper: options.helper,
      onChange: (value) => {
        if (options.onChange) options.onChange(Boolean(value));
        else this.patch({ [options.key]: Boolean(value) });
      },
    });
  }

  /**
   * Numeric field. Intermediate states stay local (`_drafts`) instead of being
   * written to the configuration:
   *
   * - clearing the field keeps the stored value and never flips a related switch
   * - typing "2" on the way to "260" does not commit an out-of-range value
   * - only a complete, in-range number is committed
   */
  private renderNumber(options: {
    key: string;
    label: string;
    min: number;
    max: number;
    step: number;
    unit?: string;
    fallback: number;
    disabled?: boolean;
    helper?: string;
    onChange?: (value: number) => void;
  }): TemplateResult {
    return this.renderField({
      key: options.key,
      label: options.label,
      selector: {
        number: {
          min: options.min,
          max: options.max,
          step: options.step,
          mode: 'box',
          ...(options.unit ? { unit_of_measurement: options.unit } : {}),
        },
      },
      value: this.numberValue(options.key, options.fallback),
      disabled: options.disabled,
      helper: options.helper,
      revertOnLeave: true,
      onChange: (raw) => {
        const parsed = parseEditorNumber(raw);
        if (parsed === null) {
          // Empty or partial input: keep it visible, change nothing in the config.
          this.setDraft(options.key, raw === undefined || raw === null ? '' : raw);
          return;
        }
        if (parsed < options.min || parsed > options.max) {
          this.setDraft(options.key, raw);
          return;
        }
        this.clearDraft(options.key);
        if (options.onChange) options.onChange(parsed);
        else this.patch({ [options.key]: parsed });
      },
    });
  }

  /** Text field. Clearing it removes the key so the card default applies. */
  private renderText(options: {
    key: string;
    label: string;
    fallback?: string;
    helper?: string;
    disabled?: boolean;
  }): TemplateResult {
    return this.renderField({
      key: options.key,
      label: options.label,
      selector: { text: {} },
      value: this.stringValue(options.key, options.fallback ?? ''),
      disabled: options.disabled,
      helper: options.helper,
      onChange: (raw) => {
        const text = typeof raw === 'string' ? raw : '';
        if (text.trim().length) {
          this.clearDraft(options.key);
          this.patch({ [options.key]: text });
        } else {
          // Keep the empty draft visible while typing, drop the key itself.
          this.setDraft(options.key, '');
          this.patch({ [options.key]: undefined });
        }
      },
    });
  }

  private renderSection(id: SectionId, title: string, content: TemplateResult): TemplateResult {
    const open = this.openSections.has(id);
    return html`<details class="section" ?open=${open} @toggle=${(event: Event) => this.onToggle(id, event)}>
      <summary>
        <span class="section-title">${title}</span>
        <span class="chevron" aria-hidden="true"></span>
      </summary>
      <div class="fields">${content}</div>
    </details>`;
  }

  private onToggle(id: SectionId, event: Event): void {
    const target = event.currentTarget as HTMLDetailsElement;
    if (target.open) this.openSections.add(id);
    else this.openSections.delete(id);
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._selectorsReady) {
      return html`<div class="loading">${this.text.loading}</div>`;
    }
    const t = this.text;
    return html`<div class="editor">
      ${this.renderSection('general', t.general, this.renderGeneral(t))}
      ${this.renderSection('sensors', t.sensors, this.renderSensors(t))}
      ${this.renderSection('typography', t.typography, this.renderTypography(t))}
      ${this.renderSection('colors', t.colors, this.renderColors(t))}
      ${this.renderSection('window', t.window, this.renderWindow(t))}
      ${this.renderSection('motion', t.motion, this.renderMotion(t))}
      ${this.renderSection('thermostat', t.thermostat, this.renderThermostat(t))}
      ${this.renderSection('chart', t.chart, this.renderChart(t))}
    </div>`;
  }

  private renderGeneral(t: EditorText): TemplateResult {
    const autoHeight = !this._config.height || this._config.height === 'auto';
    return html`<div class="hint">${t.generalHelper}</div>
      ${this.renderText({ key: 'name', label: t.name, helper: t.nameHelper })}
      ${this.renderField({
        key: 'name_entity',
        label: t.nameEntity,
        selector: { entity: { multiple: false } },
        value: this.stringValue('name_entity'),
        helper: t.nameEntityHelper,
      })}
      ${this.renderField({
        key: 'icon',
        label: t.icon,
        selector: { icon: {} },
        value: this.stringValue('icon', 'mdi:home-thermometer-outline'),
      })}
      ${this.renderSwitch({
        key: 'auto_height',
        label: t.autoHeight,
        value: autoHeight,
        onChange: (value) => {
          // The switch alone decides between automatic and manual height; the
          // number field never turns "auto" back on while it is being edited.
          this.clearDraft('height');
          this.patch({ height: value ? 'auto' : this.manualHeight() });
        },
      })}
      ${this.renderNumber({
        key: 'height',
        label: t.height,
        min: 140,
        max: 900,
        step: 4,
        unit: 'px',
        fallback: 240,
        disabled: autoHeight,
        helper: t.heightHelper,
        onChange: (value) => {
          this.lastManualHeight = value;
          this.patch({ height: value });
        },
      })}
      ${this.renderNumber({
        key: 'border_radius',
        label: t.radius,
        min: 0,
        max: 40,
        step: 1,
        unit: 'px',
        fallback: 26,
      })}
      ${this.renderField({
        key: 'theme',
        label: t.theme,
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: 'auto', label: t.themeAuto },
              { value: 'dark', label: t.themeDark },
              { value: 'light', label: t.themeLight },
            ],
          },
        },
        value: this.stringValue('theme', 'auto'),
      })}`;
  }

  private renderSensors(t: EditorText): TemplateResult {
    return html`${this.renderField({
        key: 'temperature_entity',
        label: t.temperatureEntity,
        selector: { entity: { domain: 'sensor', multiple: false } },
        value: this.stringValue('temperature_entity'),
      })}
      ${this.renderField({
        key: 'humidity_entity',
        label: t.humidityEntity,
        selector: { entity: { domain: 'sensor', multiple: false } },
        value: this.stringValue('humidity_entity'),
      })}
      ${this.renderNumber({
        key: 'temperature_decimals',
        label: t.temperatureDecimals,
        min: 0,
        max: 3,
        step: 1,
        fallback: 1,
      })}
      ${this.renderNumber({
        key: 'humidity_decimals',
        label: t.humidityDecimals,
        min: 0,
        max: 3,
        step: 1,
        fallback: 0,
      })}`;
  }

  /**
   * Independent typography for temperature and humidity – the two values are
   * the visual anchor of the card, so font family and size are separate.
   */
  private renderTypography(t: EditorText): TemplateResult {
    return html`<div class="hint">${t.readingSizeHelper}</div>
      ${this.renderSwitch({
        key: 'show_series_labels',
        label: t.showSeriesLabels,
        value: this.rawBoolean('show_series_labels') ?? true,
      })}
      ${this.renderNumber({
        key: 'temperature_font_size',
        label: t.temperatureSize,
        min: 14,
        max: 96,
        step: 1,
        unit: 'px',
        fallback: 42,
      })}
      ${this.renderText({
        key: 'temperature_font_family',
        label: t.temperatureFont,
        helper: t.readingFontHelper,
      })}
      ${this.renderNumber({
        key: 'humidity_font_size',
        label: t.humiditySize,
        min: 14,
        max: 96,
        step: 1,
        unit: 'px',
        fallback: 20,
      })}
      ${this.renderText({
        key: 'humidity_font_family',
        label: t.humidityFont,
        helper: t.readingFontHelper,
      })}`;
  }

  /** Two colours, one job each: accent for the hero, secondary for humidity. */
  /** The row switch disables everything that only lives inside that row. */
  private get rowVisible(): boolean {
    return this.rawBoolean('show_climate_row') ?? true;
  }

  private renderColors(t: EditorText): TemplateResult {
    return html`<div class="hint">${t.colorsHelper}</div>
      ${this.renderColor({
        key: 'accent_color',
        label: t.accentColor,
        fallback: DEFAULT_COLORS.accent,
      })}
      ${this.renderColor({
        key: 'humidity_color',
        label: t.secondaryColor,
        fallback: DEFAULT_COLORS.humidity,
      })}`;
  }

  private renderWindow(t: EditorText): TemplateResult {
    const enabled = this.showFlag('show_window', 'window_entity');
    const entity = asEntityId(this._config.window_entity);
    return html`${this.renderSwitch({
        key: 'show_window',
        label: t.showWindow,
        value: enabled,
        onChange: (value) =>
          this.patch({ show_window: value, ...(value ? {} : { window_entity: undefined }) }),
      })}
      ${this.renderField({
        key: 'window_entity',
        label: t.windowEntity,
        selector: { entity: { domain: ['binary_sensor', 'input_boolean', 'sensor'], multiple: false } },
        value: entity ?? '',
        disabled: !enabled,
        warning: enabled && !entity ? t.missingEntity : undefined,
      })}
      ${entity
        ? this.renderField({
            key: 'window_open_states',
            label: t.windowOpenStates,
            selector: { state: { entity_id: entity, multiple: true } },
            value: this._config.window_open_states ?? [],
            disabled: !enabled,
            helper: t.windowOpenStatesHelper,
          })
        : this.renderField({
            key: 'window_open_states',
            label: t.windowOpenStates,
            selector: { text: {} },
            value: (this._config.window_open_states ?? []).join(', '),
            disabled: !enabled,
            helper: t.windowOpenStatesHelper,
            onChange: (value) => {
              const list = String(value ?? '')
                .split(',')
                .map((item) => item.trim().toLowerCase())
                .filter(Boolean);
              this.patch({ window_open_states: list.length ? list : undefined });
            },
          })}`;
  }

  private renderMotion(t: EditorText): TemplateResult {
    const enabled = this.showFlag('show_motion', 'motion_entity');
    return html`${this.renderSwitch({
        key: 'show_motion',
        label: t.showMotion,
        value: enabled,
        onChange: (value) =>
          this.patch({ show_motion: value, ...(value ? {} : { motion_entity: undefined }) }),
      })}
      ${this.renderField({
        key: 'motion_entity',
        label: t.motionEntity,
        selector: { entity: { domain: ['binary_sensor', 'input_boolean', 'sensor'], multiple: false } },
        value: this.stringValue('motion_entity'),
        disabled: !enabled,
        warning: enabled && !asEntityId(this._config.motion_entity) ? t.missingEntity : undefined,
      })}
      ${this.renderSwitch({
        key: 'motion_show_last_changed',
        label: t.motionLastChanged,
        value: this.rawBoolean('motion_show_last_changed') ?? true,
        disabled: !enabled,
      })}`;
  }

  private renderThermostat(t: EditorText): TemplateResult {
    const enabled = this.showFlag('show_thermostat', 'climate_entity');
    return html`${this.renderSwitch({
        key: 'show_thermostat',
        label: t.showThermostat,
        value: enabled,
        onChange: (value) =>
          this.patch({ show_thermostat: value, ...(value ? {} : { climate_entity: undefined }) }),
      })}
      ${this.renderField({
        key: 'climate_entity',
        label: t.climateEntity,
        selector: { entity: { domain: 'climate', multiple: false } },
        value: this.stringValue('climate_entity'),
        disabled: !enabled,
        warning: enabled && !asEntityId(this._config.climate_entity) ? t.missingEntity : undefined,
      })}
      ${this.renderSwitch({
        key: 'show_climate_row',
        label: t.showClimateRow,
        value: this.rawBoolean('show_climate_row') ?? true,
        disabled: !enabled,
      })}
      ${this.renderSwitch({
        key: 'show_setpoint',
        label: t.showSetpoint,
        value: this.rawBoolean('show_setpoint') ?? true,
        disabled: !enabled || !this.rowVisible,
      })}
      ${this.renderSwitch({
        key: 'show_hvac_status',
        label: t.showHvacStatus,
        value: this.rawBoolean('show_hvac_status') ?? true,
        disabled: !enabled || !this.rowVisible,
      })}
      ${this.renderSwitch({
        key: 'show_hvac_mode',
        label: t.showHvacMode,
        value: this.rawBoolean('show_hvac_mode') ?? false,
        disabled: !enabled || !this.rowVisible,
      })}
      ${this.renderColor({
        key: 'heating_color',
        label: t.heatingColor,
        fallback: DEFAULT_COLORS.heating,
        disabled: !enabled,
      })}
      ${this.renderColor({
        key: 'heating_idle_color',
        label: t.idleColor,
        fallback: DEFAULT_COLORS.idle,
        disabled: !enabled,
      })}
      ${this.renderColor({
        key: 'heating_off_color',
        label: t.offColor,
        fallback: DEFAULT_COLORS.off,
        disabled: !enabled,
      })}`;
  }

  private renderChart(t: EditorText): TemplateResult {
    const showTemperature = this.showFlag('show_temperature_chart', 'temperature_entity');
    const showHumidity = this.showFlag('show_humidity_chart', 'humidity_entity');
    const anyChart = showTemperature || showHumidity;
    const hourOptions = [3, 6, 12, 24, 48].map((hours) => ({ value: String(hours), label: `${hours} h` }));
    return html`${this.renderSwitch({
        key: 'show_temperature_chart',
        label: t.showTemperatureChart,
        value: showTemperature,
        onChange: (value) => this.patch({ show_temperature_chart: value }),
      })}
      ${this.renderSwitch({
        key: 'show_humidity_chart',
        label: t.showHumidityChart,
        value: showHumidity,
        onChange: (value) => this.patch({ show_humidity_chart: value }),
      })}
      ${this.renderField({
        key: 'chart_hours',
        label: t.hours,
        selector: { select: { mode: 'dropdown', options: hourOptions } },
        value: String(this.numberValue('chart_hours', 6)),
        disabled: !anyChart,
        onChange: (value) => {
          const hours = Number(value);
          this.patch({ chart_hours: Number.isFinite(hours) ? hours : 6 });
        },
      })}
      ${this.renderNumber({
        key: 'chart_height',
        label: t.chartHeight,
        min: 40,
        max: 240,
        step: 4,
        unit: 'px',
        fallback: 84,
        disabled: !anyChart,
      })}
      ${this.renderField({
        key: 'chart_curve',
        label: t.curve,
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: 'smooth', label: t.curveSmooth },
              { value: 'linear', label: t.curveLinear },
            ],
          },
        },
        value: this.stringValue('chart_curve', 'smooth'),
        disabled: !anyChart,
      })}
      ${this.renderField({
        key: 'chart_humidity_line_style',
        label: t.humidityLine,
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: 'solid', label: t.humidityLineSolid },
              { value: 'dotted', label: t.humidityLineDotted },
            ],
          },
        },
        value: this.stringValue('chart_humidity_line_style', 'solid'),
        disabled: !showHumidity,
        helper: t.humidityLineHelper,
        onChange: (value) => this.patch({ chart_humidity_line_style: String(value) }),
      })}
      ${this.renderField({
        key: 'chart_gap_mode',
        label: t.gapMode,
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: 'connect', label: t.gapConnect },
              { value: 'break', label: t.gapBreak },
            ],
          },
        },
        value: this.stringValue('chart_gap_mode', 'connect'),
        disabled: !anyChart,
        helper: t.gapHelper,
        onChange: (value) => this.patch({ chart_gap_mode: String(value) }),
      })}
      ${this.renderNumber({
        key: 'chart_max_gap_minutes',
        label: t.maxGap,
        min: 5,
        max: 720,
        step: 5,
        unit: 'min',
        fallback: 120,
        disabled: !anyChart || this.stringValue('chart_gap_mode', 'connect') === 'break',
      })}
      ${this.renderField({
        key: 'chart_gap_style',
        label: t.gapStyle,
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: 'solid', label: t.gapStyleSolid },
              { value: 'dashed', label: t.gapStyleDashed },
            ],
          },
        },
        value: this.stringValue('chart_gap_style', 'solid'),
        disabled: !anyChart || this.stringValue('chart_gap_mode', 'connect') === 'break',
      })}
      ${this.renderSwitch({
        key: 'chart_show_grid',
        label: t.grid,
        value: this.rawBoolean('chart_show_grid') ?? false,
        disabled: !anyChart,
      })}
      ${this.renderSwitch({
        key: 'chart_show_points',
        label: t.points,
        value: this.rawBoolean('chart_show_points') ?? false,
        disabled: !anyChart,
      })}`;
  }

  static styles = css`
    :host {
      display: block;
      color: var(--primary-text-color);
      font-family: var(--ha-font-family-body, inherit);
    }
    .editor {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 2px 0 16px;
    }
    .section {
      border: 1px solid var(--divider-color, rgba(148, 163, 184, 0.28));
      border-radius: 12px;
      background: var(--card-background-color, transparent);
      overflow: hidden;
    }
    summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 11px 13px;
      cursor: pointer;
      list-style: none;
      font-size: 0.9rem;
      font-weight: 600;
      user-select: none;
    }
    summary::-webkit-details-marker {
      display: none;
    }
    summary:focus-visible {
      outline: 2px solid var(--primary-color, #38bdf8);
      outline-offset: -2px;
    }
    .chevron {
      width: 7px;
      height: 7px;
      border-right: 2px solid var(--secondary-text-color);
      border-bottom: 2px solid var(--secondary-text-color);
      transform: rotate(45deg);
      transition: transform 0.18s ease;
      flex: none;
      margin-top: -3px;
    }
    .section[open] .chevron {
      transform: rotate(-135deg);
      margin-top: 3px;
    }
    .fields {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 4px 13px 14px;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .field.is-disabled {
      opacity: 0.55;
    }
    .helper {
      font-size: 11px;
      line-height: 1.4;
      color: var(--secondary-text-color);
    }
    .helper.warning {
      color: var(--warning-color, #f59e0b);
    }
    .hint {
      font-size: 11.5px;
      line-height: 1.4;
      color: var(--secondary-text-color);
    }
    .loading {
      padding: 16px 4px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    @media (prefers-reduced-motion: reduce) {
      .chevron {
        transition: none;
      }
    }
  `;
}

if (typeof customElements !== 'undefined' && !customElements.get(EDITOR_TAG)) {
  customElements.define(EDITOR_TAG, RoomClimateCardEditor);
}
