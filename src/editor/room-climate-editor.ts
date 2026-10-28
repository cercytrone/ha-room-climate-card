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
  coolBelow: string;
  warmAbove: string;
  hotAbove: string;
  coolColor: string;
  comfortColor: string;
  warmColor: string;
  hotColor: string;
  humidityColor: string;
  humidityLow: string;
  humidityHigh: string;
  humidityLowColor: string;
  humidityHighColor: string;
  showWindow: string;
  windowEntity: string;
  windowOpenStates: string;
  windowOpenStatesHelper: string;
  showMotion: string;
  motionEntity: string;
  motionLastChanged: string;
  showThermostat: string;
  climateEntity: string;
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
  grid: string;
  legend: string;
  points: string;
  missingEntity: string;
  loading: string;
  generalHelper: string;
}

const TEXT: Record<'de' | 'en', EditorText> = {
  de: {
    general: 'Allgemein',
    sensors: 'Sensoren',
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
    coolBelow: 'Kühl unter',
    warmAbove: 'Warm ab',
    hotAbove: 'Heiß ab',
    coolColor: 'Farbe kühl',
    comfortColor: 'Farbe angenehm',
    warmColor: 'Farbe warm',
    hotColor: 'Farbe heiß',
    humidityColor: 'Farbe Luftfeuchte',
    humidityLow: 'Trocken unter (%)',
    humidityHigh: 'Feucht über (%)',
    humidityLowColor: 'Farbe trocken',
    humidityHighColor: 'Farbe feucht',
    showWindow: 'Fensterstatus anzeigen',
    windowEntity: 'Fensterkontakt',
    windowOpenStates: 'Zustände für „offen“',
    windowOpenStatesHelper: 'Mehrfachauswahl. Übliche Zustände: on, open, tilted.',
    showMotion: 'Bewegung anzeigen',
    motionEntity: 'Bewegungsmelder',
    motionLastChanged: 'Ruhe-Dauer anzeigen',
    showThermostat: 'Thermostat anzeigen',
    climateEntity: 'Thermostat-Entität',
    showSetpoint: 'Solltemperatur anzeigen (über Istwert)',
    showHvacStatus: 'Heizstatus-Icon anzeigen',
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
    gapConnect: 'Durchgehend interpolieren',
    gapBreak: 'Unterbrochen darstellen',
    gapHelper:
      'Home Assistant speichert nur Änderungen – Lücken entstehen auch bei konstanten Werten.',
    maxGap: 'Maximal interpolierte Lücke',
    gapStyle: 'Darstellung interpolierter Abschnitte',
    gapStyleSolid: 'Durchgezogen (empfohlen)',
    gapStyleDashed: 'Gestrichelt',
    grid: 'Gitternetz',
    legend: 'Legende',
    points: 'Datenpunkte',
    missingEntity: 'Bitte eine Entität auswählen.',
    loading: 'Editor wird geladen …',
    generalHelper: 'Alle Werte sind optional – die Karte funktioniert auch mit Teilkonfiguration.',
  },
  en: {
    general: 'General',
    sensors: 'Sensors',
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
    coolBelow: 'Cool below',
    warmAbove: 'Warm above',
    hotAbove: 'Hot above',
    coolColor: 'Cool colour',
    comfortColor: 'Comfort colour',
    warmColor: 'Warm colour',
    hotColor: 'Hot colour',
    humidityColor: 'Humidity colour',
    humidityLow: 'Dry below (%)',
    humidityHigh: 'Humid above (%)',
    humidityLowColor: 'Dry colour',
    humidityHighColor: 'Humid colour',
    showWindow: 'Show window status',
    windowEntity: 'Window contact',
    windowOpenStates: 'States considered open',
    windowOpenStatesHelper: 'Multiple selection. Common states: on, open, tilted.',
    showMotion: 'Show motion',
    motionEntity: 'Motion sensor',
    motionLastChanged: 'Show quiet duration',
    showThermostat: 'Show thermostat',
    climateEntity: 'Climate entity',
    showSetpoint: 'Show target temperature (above current)',
    showHvacStatus: 'Show heating status icon',
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
    gapConnect: 'Interpolate continuously',
    gapBreak: 'Show as broken',
    gapHelper:
      'Home Assistant only stores changes – gaps also appear while values stay constant.',
    maxGap: 'Largest interpolated gap',
    gapStyle: 'Style of interpolated parts',
    gapStyleSolid: 'Solid (recommended)',
    gapStyleDashed: 'Dashed',
    grid: 'Grid lines',
    legend: 'Legend',
    points: 'Data points',
    missingEntity: 'Please select an entity.',
    loading: 'Loading editor …',
    generalHelper: 'Everything is optional – the card also works with a partial configuration.',
  },
};

type SectionId = 'general' | 'sensors' | 'colors' | 'window' | 'motion' | 'thermostat' | 'chart';

interface FieldOptions {
  key: string;
  label: string;
  selector: Record<string, unknown>;
  value: unknown;
  disabled?: boolean;
  helper?: string;
  warning?: string;
  onChange?: (value: unknown) => void;
}

export class RoomClimateCardEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _selectorsReady: { state: true },
  };

  hass?: HomeAssistant;
  _config: RoomClimateCardConfig = { type: `custom:${CARD_TAG}` };
  _selectorsReady = false;

  private openSections = new Set<SectionId>(['general', 'sensors']);

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
    return html`<div class="field ${options.disabled ? 'is-disabled' : ''}">
      <ha-selector
        .hass=${this.hass}
        .selector=${options.selector}
        .label=${options.label}
        .value=${options.value}
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
      ${this.renderField({
        key: 'name',
        label: t.name,
        selector: { text: {} },
        value: this.stringValue('name'),
        helper: t.nameHelper,
      })}
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
        onChange: (value) => this.patch({ height: value ? 'auto' : 240 }),
      })}
      ${this.renderField({
        key: 'height',
        label: t.height,
        selector: { number: { min: 140, max: 900, step: 4, mode: 'box', unit_of_measurement: 'px' } },
        value: this.numberValue('height', 240),
        disabled: autoHeight,
        helper: t.heightHelper,
      })}
      ${this.renderField({
        key: 'border_radius',
        label: t.radius,
        selector: { number: { min: 0, max: 40, step: 1, mode: 'box', unit_of_measurement: 'px' } },
        value: this.numberValue('border_radius', 18),
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
      ${this.renderField({
        key: 'temperature_decimals',
        label: t.temperatureDecimals,
        selector: { number: { min: 0, max: 3, step: 1, mode: 'box' } },
        value: this.numberValue('temperature_decimals', 1),
      })}
      ${this.renderField({
        key: 'humidity_decimals',
        label: t.humidityDecimals,
        selector: { number: { min: 0, max: 3, step: 1, mode: 'box' } },
        value: this.numberValue('humidity_decimals', 0),
      })}`;
  }

  private renderColors(t: EditorText): TemplateResult {
    return html`${this.renderField({
        key: 'temperature_cool_below',
        label: t.coolBelow,
        selector: { number: { min: -30, max: 50, step: 0.5, mode: 'box', unit_of_measurement: '°C' } },
        value: this.numberValue('temperature_cool_below', 19),
      })}
      ${this.renderField({
        key: 'temperature_warm_above',
        label: t.warmAbove,
        selector: { number: { min: -20, max: 60, step: 0.5, mode: 'box', unit_of_measurement: '°C' } },
        value: this.numberValue('temperature_warm_above', 25),
      })}
      ${this.renderField({
        key: 'temperature_hot_above',
        label: t.hotAbove,
        selector: { number: { min: -10, max: 70, step: 0.5, mode: 'box', unit_of_measurement: '°C' } },
        value: this.numberValue('temperature_hot_above', 28),
      })}
      ${this.renderColor({ key: 'temperature_cool_color', label: t.coolColor, fallback: DEFAULT_COLORS.cool })}
      ${this.renderColor({
        key: 'temperature_comfort_color',
        label: t.comfortColor,
        fallback: DEFAULT_COLORS.comfort,
      })}
      ${this.renderColor({ key: 'temperature_warm_color', label: t.warmColor, fallback: DEFAULT_COLORS.warm })}
      ${this.renderColor({ key: 'temperature_hot_color', label: t.hotColor, fallback: DEFAULT_COLORS.hot })}
      ${this.renderColor({ key: 'humidity_color', label: t.humidityColor, fallback: DEFAULT_COLORS.humidity })}
      ${this.renderField({
        key: 'humidity_low_threshold',
        label: t.humidityLow,
        selector: { number: { min: 0, max: 100, step: 1, mode: 'box', unit_of_measurement: '%' } },
        value: this.numberValue('humidity_low_threshold', 35),
      })}
      ${this.renderField({
        key: 'humidity_high_threshold',
        label: t.humidityHigh,
        selector: { number: { min: 0, max: 100, step: 1, mode: 'box', unit_of_measurement: '%' } },
        value: this.numberValue('humidity_high_threshold', 65),
      })}
      ${this.renderColor({
        key: 'humidity_low_color',
        label: t.humidityLowColor,
        fallback: DEFAULT_COLORS.humidityLow,
      })}
      ${this.renderColor({
        key: 'humidity_high_color',
        label: t.humidityHighColor,
        fallback: DEFAULT_COLORS.humidityHigh,
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
        key: 'show_setpoint',
        label: t.showSetpoint,
        value: this.rawBoolean('show_setpoint') ?? true,
        disabled: !enabled,
      })}
      ${this.renderSwitch({
        key: 'show_hvac_status',
        label: t.showHvacStatus,
        value: this.rawBoolean('show_hvac_status') ?? true,
        disabled: !enabled,
      })}
      ${this.renderSwitch({
        key: 'show_hvac_mode',
        label: t.showHvacMode,
        value: this.rawBoolean('show_hvac_mode') ?? false,
        disabled: !enabled,
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
      ${this.renderField({
        key: 'chart_height',
        label: t.chartHeight,
        selector: { number: { min: 40, max: 240, step: 4, mode: 'box', unit_of_measurement: 'px' } },
        value: this.numberValue('chart_height', 84),
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
      ${this.renderField({
        key: 'chart_max_gap_minutes',
        label: t.maxGap,
        selector: { number: { min: 5, max: 720, step: 5, mode: 'box', unit_of_measurement: 'min' } },
        value: this.numberValue('chart_max_gap_minutes', 120),
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
        value: this.rawBoolean('chart_show_grid') ?? true,
        disabled: !anyChart,
      })}
      ${this.renderSwitch({
        key: 'chart_show_legend',
        label: t.legend,
        value: this.rawBoolean('chart_show_legend') ?? false,
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
