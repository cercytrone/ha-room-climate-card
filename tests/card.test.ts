import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import '../src/main';
import type { RoomClimateCard } from '../src/room-climate-card';
import type { RoomClimateCardConfig } from '../src/config';
import type { HomeAssistant } from '../src/types';
import { createHass, entity, flush, resizeTo } from './helpers';

const now = Date.now();

function baseStates() {
  return [
    entity('sensor.temp', {
      state: '21.78',
      attributes: { unit_of_measurement: '°C', friendly_name: 'Wohnzimmer' },
    }),
    entity('sensor.humidity', {
      state: '50.4',
      attributes: { unit_of_measurement: '%', friendly_name: 'Wohnzimmer Feuchte' },
    }),
    entity('binary_sensor.window', { state: 'off', attributes: { device_class: 'window' } }),
    entity('binary_sensor.motion', {
      state: 'off',
      lastChanged: new Date(now - 12 * 60 * 1000).toISOString(),
    }),
    entity('climate.thermostat', {
      state: 'heat',
      attributes: { temperature: 22, hvac_action: 'heating', friendly_name: 'Wohnzimmer Thermostat' },
    }),
  ];
}

function historyFor(entityIds: string[]) {
  const history: Record<string, Array<{ s: string; lu: number }>> = {};
  for (const id of entityIds) {
    history[id] = Array.from({ length: 20 }, (_, index) => ({
      s: (21 + Math.sin(index / 3)).toFixed(2),
      lu: Math.floor((now - (20 - index) * 10 * 60 * 1000) / 1000),
    }));
  }
  return history;
}

function mount(
  config: RoomClimateCardConfig,
  hass: HomeAssistant,
  size?: { width: number; height: number }
): RoomClimateCard {
  const card = document.createElement('room-climate-card') as RoomClimateCard;
  card.setConfig(config);
  card.hass = hass;
  document.body.append(card);
  if (size) resizeTo(card, size.width, size.height);
  return card;
}

function q(card: RoomClimateCard, selector: string): Element | null {
  return card.shadowRoot!.querySelector(selector);
}

function qa(card: RoomClimateCard, selector: string): Element[] {
  return Array.from(card.shadowRoot!.querySelectorAll(selector));
}

function text(card: RoomClimateCard, selector: string): string {
  return q(card, selector)?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
}

const fullConfig: RoomClimateCardConfig = {
  type: 'custom:room-climate-card',
  name: 'Wohnzimmer',
  temperature_entity: 'sensor.temp',
  humidity_entity: 'sensor.humidity',
  window_entity: 'binary_sensor.window',
  motion_entity: 'binary_sensor.motion',
  climate_entity: 'climate.thermostat',
  humidity_decimals: 1,
};

describe('room climate card', () => {
  beforeEach(() => {
    document.body.replaceChildren();
  });

  afterEach(() => {
    document.body.replaceChildren();
    vi.useRealTimers();
  });

  it('renders name, temperature and humidity with locale formatting', async () => {
    const card = mount(fullConfig, createHass({ states: baseStates() }));
    await card.updateComplete;

    expect(text(card, '.name')).toBe('Wohnzimmer');
    expect(text(card, '.temperature .value')).toBe('21,8');
    expect(text(card, '.temperature .unit')).toBe('°C');
    expect(text(card, '.humidity-value')).toBe('50,4');
    expect(text(card, '.humidity-unit')).toBe('%');
  });

  it('formats numbers for english locales', async () => {
    const card = mount(fullConfig, createHass({ states: baseStates(), language: 'en' }));
    await card.updateComplete;
    expect(text(card, '.temperature .value')).toBe('21.8');
  });

  it('colours the temperature by band', async () => {
    const card = mount(
      { ...fullConfig, temperature_cool_below: 30, temperature_warm_above: 31, temperature_hot_above: 32 },
      createHass({ states: baseStates() })
    );
    await card.updateComplete;
    const value = q(card, '.temperature .value') as HTMLElement;
    expect(value.style.color).toBe('rgb(56, 189, 248)');
  });

  it('handles unavailable sensors without crashing', async () => {
    const hass = createHass({
      states: [
        entity('sensor.temp', { state: 'unavailable' }),
        entity('sensor.humidity', { state: 'unknown' }),
        entity('binary_sensor.window', { state: 'unavailable' }),
        entity('binary_sensor.motion', { state: 'unavailable' }),
        entity('climate.thermostat', { state: 'unavailable' }),
      ],
    });
    const card = mount(fullConfig, hass);
    await card.updateComplete;

    expect(text(card, '.temperature .value')).toBe('–');
    expect(text(card, '.humidity-value')).toBe('–');
    expect(q(card, '.temperature')?.getAttribute('aria-label')).toContain('Nicht verfügbar');
    expect(q(card, '.badge.window')?.getAttribute('aria-label')).toBe('Nicht verfügbar');
    const icon = q(card, '.hvac-icon');
    expect(icon?.getAttribute('aria-label')).toBe('Nicht verfügbar');
    expect(icon?.classList.contains('is-unknown')).toBe(true);
    expect(q(card, '.setpoint')).toBeNull();
  });

  it('shows the window badge only when enabled and reflects the state', async () => {
    const hass = createHass({ states: baseStates() });
    const card = mount(fullConfig, hass);
    await card.updateComplete;
    const badge = q(card, '.badge.window');
    expect(badge).not.toBeNull();
    expect(badge?.classList.contains('is-open')).toBe(false);
    expect(badge?.getAttribute('aria-label')).toBe('Fenster geschlossen');

    card.hass = createHass({
      states: baseStates().map((state) =>
        state.entity_id === 'binary_sensor.window' ? entity('binary_sensor.window', { state: 'on' }) : state
      ),
    });
    await card.updateComplete;
    expect(q(card, '.badge.window')?.classList.contains('is-open')).toBe(true);
    expect(q(card, '.badge.window')?.getAttribute('aria-label')).toBe('Fenster offen');
  });

  it('removes the window badge completely when disabled', async () => {
    const card = mount({ ...fullConfig, show_window: false }, createHass({ states: baseStates() }));
    await card.updateComplete;
    expect(q(card, '.badge.window')).toBeNull();
    expect(q(card, '.badges')?.children.length).toBeGreaterThanOrEqual(0);
  });

  it('shows motion state and the quiet duration', async () => {
    const hass = createHass({ states: baseStates() });
    const card = mount(fullConfig, hass);
    await card.updateComplete;
    expect(q(card, '.badge.motion')?.classList.contains('is-active')).toBe(false);
    expect(text(card, '.subtle')).toContain('Ruhe seit');
    expect(text(card, '.subtle')).toContain('12 Min.');

    card.hass = createHass({
      states: baseStates().map((state) =>
        state.entity_id === 'binary_sensor.motion' ? entity('binary_sensor.motion', { state: 'on' }) : state
      ),
    });
    await card.updateComplete;
    expect(q(card, '.badge.motion')?.classList.contains('is-active')).toBe(true);
    expect(q(card, '.badge.motion')?.getAttribute('aria-label')).toBe('Bewegung erkannt');
    expect(text(card, '.subtle')).toBe('');
  });

  it('hides the motion badge when disabled', async () => {
    const card = mount({ ...fullConfig, show_motion: false }, createHass({ states: baseStates() }));
    await card.updateComplete;
    expect(q(card, '.badge.motion')).toBeNull();
  });

  it('shows the setpoint above the current temperature', async () => {
    const card = mount(fullConfig, createHass({ states: baseStates() }));
    await card.updateComplete;
    const row = q(card, '.setpoint-row');
    const metrics = q(card, '.metrics');
    expect(row).not.toBeNull();
    expect(metrics).not.toBeNull();
    // The setpoint row must come before the metrics in document order.
    expect(row!.compareDocumentPosition(metrics!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(text(card, '.setpoint')).toContain('Soll');
    expect(text(card, '.setpoint-value')).toBe('22,0');
    expect(text(card, '.setpoint-unit')).toBe('°C');
    expect(text(card, '.temperature .value')).toBe('21,8');
  });

  it('conveys the heating state only through the icon colour', async () => {
    const heating = mount(fullConfig, createHass({ states: baseStates() }));
    await heating.updateComplete;
    const heatingIcon = q(heating, '.hvac-icon') as HTMLElement;
    expect(heatingIcon.classList.contains('is-heating')).toBe(true);
    expect(heatingIcon.style.getPropertyValue('--hvac-color')).toBe('#ef4444');
    expect(heatingIcon.getAttribute('aria-label')).toBe('Heizt');
    expect(heatingIcon.querySelector('svg')).not.toBeNull();
    // No textual status label next to the setpoint any more.
    expect(text(heating, '.setpoint-row')).not.toContain('Heizt');
    expect(q(heating, '.pill')).toBeNull();

    const idle = mount(
      { ...fullConfig, name: 'Küche' },
      createHass({
        states: [
          ...baseStates().filter((state) => state.entity_id !== 'climate.thermostat'),
          entity('climate.thermostat', {
            state: 'heat',
            attributes: { temperature: 21, hvac_action: 'idle' },
          }),
        ],
      })
    );
    await idle.updateComplete;
    const idleIcon = q(idle, '.hvac-icon') as HTMLElement;
    expect(idleIcon.classList.contains('is-idle')).toBe(true);
    expect(idleIcon.style.getPropertyValue('--hvac-color')).toBe('#34d399');
    expect(idleIcon.getAttribute('aria-label')).toBe('Ruht');

    const off = mount(
      { ...fullConfig, name: 'Bad' },
      createHass({
        states: [
          ...baseStates().filter((state) => state.entity_id !== 'climate.thermostat'),
          entity('climate.thermostat', { state: 'off', attributes: { temperature: 18 } }),
        ],
      })
    );
    await off.updateComplete;
    const offIcon = q(off, '.hvac-icon') as HTMLElement;
    expect(offIcon.classList.contains('is-off')).toBe(true);
    expect(offIcon.style.getPropertyValue('--hvac-color')).toBe('#64748b');
    expect(offIcon.getAttribute('aria-label')).toBe('Aus');
    expect(text(off, '.setpoint-value')).toBe('18,0');
  });

  it('uses custom icon colours from the configuration', async () => {
    const card = mount(
      {
        ...fullConfig,
        heating_color: '#ff0000',
        heating_idle_color: '#00ff00',
        heating_off_color: '#0000ff',
      },
      createHass({ states: baseStates() })
    );
    await card.updateComplete;
    expect(
      (q(card, '.hvac-icon') as HTMLElement).style.getPropertyValue('--hvac-color')
    ).toBe('#ff0000');
  });

  it('does not claim heating when hvac_action is missing', async () => {
    const card = mount(
      fullConfig,
      createHass({
        states: [
          ...baseStates().filter((state) => state.entity_id !== 'climate.thermostat'),
          entity('climate.thermostat', { state: 'heat', attributes: { temperature: 21 } }),
        ],
      })
    );
    await card.updateComplete;
    const icon = q(card, '.hvac-icon') as HTMLElement;
    expect(icon.classList.contains('is-unknown')).toBe(true);
    expect(icon.getAttribute('aria-label')).toBe('Status unbekannt');
    expect(icon.style.getPropertyValue('--hvac-color')).toContain('--rcc-neutral');
    expect(text(card, '.setpoint-row')).not.toContain('Heizt');
  });

  it('respects thermostat sub-options', async () => {
    const both = mount(
      { ...fullConfig, show_setpoint: false, show_hvac_status: false, show_hvac_mode: false },
      createHass({ states: baseStates() })
    );
    await both.updateComplete;
    expect(q(both, '.setpoint-row')).toBeNull();

    const iconOnly = mount(
      { ...fullConfig, show_setpoint: false },
      createHass({ states: baseStates() })
    );
    await iconOnly.updateComplete;
    expect(q(iconOnly, '.hvac-icon')).not.toBeNull();
    expect(q(iconOnly, '.setpoint')).toBeNull();

    const setpointOnly = mount(
      { ...fullConfig, show_hvac_status: false },
      createHass({ states: baseStates() })
    );
    await setpointOnly.updateComplete;
    expect(q(setpointOnly, '.hvac-icon')).toBeNull();
    expect(text(setpointOnly, '.setpoint-value')).toBe('22,0');
  });

  it('omits the thermostat row when disabled', async () => {
    const card = mount({ ...fullConfig, show_thermostat: false }, createHass({ states: baseStates() }));
    await card.updateComplete;
    expect(q(card, '.setpoint-row')).toBeNull();
    expect(q(card, '.hvac-icon')).toBeNull();
  });

  it('sizes both readings from CSS variables and keeps humidity smaller by default', async () => {
    const card = mount(fullConfig, createHass({ states: baseStates() }));
    await card.updateComplete;
    const container = q(card, '.card') as HTMLElement;
    expect(container.style.getPropertyValue('--rcc-temp-size').trim()).toBe('42px');
    expect(container.style.getPropertyValue('--rcc-hum-size').trim()).toBe('28px');
    // No custom family configured -> the element keeps inheriting the theme font.
    expect(container.style.getPropertyValue('--rcc-temp-font')).toBe('');
    expect(container.style.getPropertyValue('--rcc-hum-font')).toBe('');

    const styleText = Array.from(
      (
        card.constructor as unknown as { elementStyles?: ArrayLike<{ cssText?: string }> }
      ).elementStyles ?? []
    )
      .map((sheet) => sheet.cssText ?? '')
      .join('\n');
    expect(styleText).toMatch(/\.temperature\s*\{[^}]*font-size:\s*var\(--rcc-temp-size/);
    expect(styleText).toMatch(/\.humidity\s*\{[^}]*font-size:\s*var\(--rcc-hum-size/);
    expect(styleText).toMatch(
      /\.density-xs \.temperature\s*\{[^}]*calc\(var\(--rcc-temp-size[^}]*\) \* 0\.6\)/
    );
    expect(text(card, '.humidity-value')).toBe('50,4');
  });

  it('applies independent font sizes and families per reading', async () => {
    const card = mount(
      {
        ...fullConfig,
        temperature_font_size: 64,
        temperature_font_family: 'Inter, sans-serif',
        humidity_font_size: 33,
        humidity_font_family: 'Roboto Mono',
      },
      createHass({ states: baseStates() })
    );
    await card.updateComplete;
    const container = q(card, '.card') as HTMLElement;
    expect(container.style.getPropertyValue('--rcc-temp-size').trim()).toBe('64px');
    expect(container.style.getPropertyValue('--rcc-hum-size').trim()).toBe('33px');
    expect(container.style.getPropertyValue('--rcc-temp-font').trim()).toBe('Inter, sans-serif');
    expect(container.style.getPropertyValue('--rcc-hum-font').trim()).toBe('Roboto Mono');
  });

  it('applies a fixed height and density classes', async () => {
    const card = mount({ ...fullConfig, height: 200 }, createHass({ states: baseStates() }));
    await card.updateComplete;
    const container = q(card, '.card') as HTMLElement;
    expect(container.classList.contains('fixed-height')).toBe(true);
    expect(container.style.getPropertyValue('--rcc-height')).toBe('200px');
    expect(container.classList.contains('density-sm')).toBe(true);

    resizeTo(card, 320, 150);
    await card.updateComplete;
    expect((q(card, '.card') as HTMLElement).classList.contains('density-xs')).toBe(true);
  });

  it('uses automatic height by default', async () => {
    const card = mount(fullConfig, createHass({ states: baseStates() }));
    await card.updateComplete;
    const container = q(card, '.card') as HTMLElement;
    expect(container.classList.contains('auto-height')).toBe(true);
    expect(container.style.getPropertyValue('--rcc-height')).toBe('');
    expect(container.style.getPropertyValue('--rcc-chart-height')).toBe('84px');
  });

  it('supports theme overrides', async () => {
    const card = mount({ ...fullConfig, theme: 'light' }, createHass({ states: baseStates() }));
    await card.updateComplete;
    expect(q(card, '.card')?.classList.contains('theme-light')).toBe(true);
  });

  it('loads real history through the websocket API', async () => {
    const hass = createHass({
      states: baseStates(),
      history: historyFor(['sensor.temp', 'sensor.humidity']),
    });
    const card = mount(fullConfig, hass);
    await flush();
    await new Promise((resolve) => setTimeout(resolve, 100));
    await card.updateComplete;

    const chart = q(card, 'room-climate-chart') as HTMLElement & {
      temperature?: Array<{ t: number; v: number | null }>;
      humidity?: Array<{ t: number; v: number | null }>;
    };
    expect(chart).not.toBeNull();
    expect(chart.temperature?.length).toBe(20);
    expect(chart.humidity?.length).toBe(20);
  });

  it('shows a fallback when history is unavailable', async () => {
    const hass = createHass({ states: baseStates(), history: {} });
    const card = mount(fullConfig, hass);
    await new Promise((resolve) => setTimeout(resolve, 100));
    await card.updateComplete;
    const chart = q(card, 'room-climate-chart') as HTMLElement & {
      setSize: (width: number, height: number) => void;
      updateComplete: Promise<unknown>;
      shadowRoot: ShadowRoot;
    };
    chart.setSize(320, 90);
    await chart.updateComplete;
    expect(chart.shadowRoot.querySelector('.state-title')?.textContent?.trim()).toBe(
      'Keine Verlaufsdaten'
    );
  });

  it('forwards the gap configuration to the chart', async () => {
    const card = mount(
      {
        ...fullConfig,
        chart_gap_mode: 'break',
        chart_gap_style: 'dashed',
        chart_max_gap_minutes: 45,
        border_radius: 6,
      },
      createHass({ states: baseStates() })
    );
    await card.updateComplete;
    const chart = q(card, 'room-climate-chart') as HTMLElement & {
      gapMode: string;
      gapStyle: string;
      maxGapMinutes: number;
      cornerRadius: number;
    };
    expect(chart.gapMode).toBe('break');
    expect(chart.gapStyle).toBe('dashed');
    expect(chart.maxGapMinutes).toBe(45);
    expect(chart.cornerRadius).toBe(6);
  });

  it('defaults to a continuous solid chart', async () => {
    const card = mount(fullConfig, createHass({ states: baseStates() }));
    await card.updateComplete;
    const chart = q(card, 'room-climate-chart') as HTMLElement & { gapMode: string; gapStyle: string };
    expect(chart.gapMode).toBe('connect');
    expect(chart.gapStyle).toBe('solid');
  });

  it('hides the chart when both chart series are disabled', async () => {
    const card = mount(
      { ...fullConfig, show_temperature_chart: false, show_humidity_chart: false },
      createHass({ states: baseStates() })
    );
    await card.updateComplete;
    expect(q(card, 'room-climate-chart')).toBeNull();
    expect(q(card, '.chart-slot')).toBeNull();
  });

  it('renders a hint when no entities are configured', async () => {
    const card = mount({ type: 'custom:room-climate-card', name: 'Leer' }, createHass());
    await card.updateComplete;
    expect(text(card, '.empty-title')).toBe('Keine Sensoren konfiguriert');
    expect(q(card, '.temperature')).toBeNull();
  });

  it('never crashes on invalid configuration or missing hass', async () => {
    const card = document.createElement('room-climate-card') as RoomClimateCard;
    card.setConfig(undefined as never);
    document.body.append(card);
    await card.updateComplete;
    expect(card.shadowRoot!.querySelector('.card')).not.toBeNull();

    card.setConfig({ type: 'custom:room-climate-card', temperature_entity: 'nonsense', height: 'abc' });
    await card.updateComplete;
    expect(card.shadowRoot!.querySelector('.card')).not.toBeNull();

    card.hass = createHass({ states: [entity('sensor.temp', { state: 'broken' })] });
    card.setConfig({ type: 'custom:room-climate-card', temperature_entity: 'sensor.temp' });
    await card.updateComplete;
    expect(text(card, '.temperature .value')).toBe('–');
  });

  it('only re-renders when a referenced entity changes', async () => {
    const hass = createHass({ states: baseStates() });
    const card = mount(fullConfig, hass);
    await card.updateComplete;

    const renderSpy = vi.spyOn(card as unknown as { render: () => unknown }, 'render');
    // Same entity objects, one extra unrelated entity.
    card.hass = {
      ...hass,
      states: { ...hass.states, 'light.unrelated': entity('light.unrelated', { state: 'on' }) },
    };
    await card.updateComplete;
    expect(renderSpy).not.toHaveBeenCalled();

    card.hass = {
      ...hass,
      states: { ...hass.states, 'sensor.temp': entity('sensor.temp', { state: '19.5' }) },
    };
    await card.updateComplete;
    expect(renderSpy).toHaveBeenCalled();
  });

  it('cleans up observers when removed from the document', async () => {
    const card = mount(fullConfig, createHass({ states: baseStates() }));
    await card.updateComplete;
    card.remove();
    const observers = (
      globalThis as unknown as { TestResizeObserver: { instances: Array<{ targets: Set<Element> }> } }
    ).TestResizeObserver.instances;
    expect(observers.some((observer) => observer.targets.has(card))).toBe(false);
  });

  it('exposes card size and grid options for the dashboard', async () => {
    const card = mount(fullConfig, createHass({ states: baseStates() }));
    await card.updateComplete;
    expect(card.getCardSize()).toBeGreaterThanOrEqual(2);
    const grid = card.getGridOptions();
    expect(grid.columns).toBe(6);
    expect(grid.rows).toBeGreaterThanOrEqual(2);
  });

  it('provides a usable stub config from the available entities', () => {
    const config = (
      document.createElement('room-climate-card').constructor as typeof RoomClimateCard
    ).getStubConfig(
      createHass({
        states: [
          entity('sensor.t', { state: '21', attributes: { device_class: 'temperature' } }),
          entity('sensor.h', { state: '40', attributes: { device_class: 'humidity' } }),
          entity('binary_sensor.w', { state: 'off', attributes: { device_class: 'window' } }),
        ],
      })
    );
    expect(config.temperature_entity).toBe('sensor.t');
    expect(config.humidity_entity).toBe('sensor.h');
    expect(config.window_entity).toBe('binary_sensor.w');
    expect(config.type).toBe('custom:room-climate-card');
  });

  it('renders long room names without breaking the layout', async () => {
    const card = mount(
      { ...fullConfig, name: 'Wohnzimmer mit sehr langem Namen und Erker' },
      createHass({ states: baseStates() })
    );
    await card.updateComplete;
    const name = q(card, '.name') as HTMLElement;
    expect(name.getAttribute('title')).toBe('Wohnzimmer mit sehr langem Namen und Erker');
    expect(qa(card, '.badge').length).toBe(2);
  });
});
