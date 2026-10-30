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
    expect(text(card, '.reading.temperature .reading-value')).toBe('21,8');
    expect(text(card, '.reading.temperature .reading-unit')).toBe('°C');
    expect(text(card, '.reading.humidity .reading-value')).toBe('50,4');
    expect(text(card, '.reading.humidity .reading-unit')).toBe('%');
  });

  it('formats numbers for english locales', async () => {
    const card = mount(fullConfig, createHass({ states: baseStates(), language: 'en' }));
    await card.updateComplete;
    expect(text(card, '.reading.temperature .reading-value')).toBe('21.8');
  });

  it('declares each series with its colour dot directly above the value', async () => {
    const card = mount(fullConfig, createHass({ states: baseStates() }));
    await card.updateComplete;

    const labels = qa(card, '.reading-labels .series-label');
    expect(labels.map((label) => label.textContent?.trim())).toEqual([
      'Temperatur',
      'Luftfeuchte',
    ]);
    const dots = qa(card, '.series-dot') as HTMLElement[];
    expect(dots).toHaveLength(2);
    // One accent for the hero, one subdued indigo for the humidity.
    expect(dots[0].style.background).toBe('rgb(79, 209, 165)');
    expect(dots[1].style.background).toBe('rgb(139, 134, 214)');
    // The caption row sits above the values, not below the chart.
    const labelsRow = q(card, '.reading-labels')!;
    const valuesRow = q(card, '.reading-values')!;
    expect(labelsRow.compareDocumentPosition(valuesRow) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // No legend anywhere: the chart is plain.
    expect(q(card, '.legend')).toBeNull();
  });

  it('uses the accent only for the primary value and the humidity colour only for its series', async () => {
    const card = mount(fullConfig, createHass({ states: baseStates() }));
    await card.updateComplete;
    const container = q(card, '.card') as HTMLElement;
    expect(container.style.getPropertyValue('--rcc-accent').trim()).toBe('#4FD1A5');
    expect(container.style.getPropertyValue('--rcc-secondary').trim()).toBe('#8B86D6');

    // Neither reading is tinted: the values stay neutral, the dots carry colour.
    const temperature = q(card, '.reading.temperature .reading-value') as HTMLElement;
    const humidity = q(card, '.reading.humidity .reading-value') as HTMLElement;
    expect(temperature.style.color).toBe('');
    expect(humidity.style.color).toBe('');
  });

  it('lets the colours be changed from the configuration', async () => {
    const card = mount(
      { ...fullConfig, accent_color: '#ff8800', humidity_color: '#0088ff' },
      createHass({ states: baseStates() })
    );
    await card.updateComplete;
    const container = q(card, '.card') as HTMLElement;
    expect(container.style.getPropertyValue('--rcc-accent').trim()).toBe('#ff8800');
    expect(container.style.getPropertyValue('--rcc-secondary').trim()).toBe('#0088ff');
    const dots = qa(card, '.series-dot') as HTMLElement[];
    expect(dots[0].style.background).toBe('rgb(255, 136, 0)');
    expect(dots[1].style.background).toBe('rgb(0, 136, 255)');
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

    expect(text(card, '.reading.temperature .reading-value')).toBe('–');
    expect(text(card, '.reading.humidity .reading-value')).toBe('–');
    expect(q(card, '.reading.temperature')?.getAttribute('aria-label')).toContain('Nicht verfügbar');
    expect(q(card, '.badge.window')?.getAttribute('aria-label')).toBe('Nicht verfügbar');
    expect(q(card, '.climate-row')?.getAttribute('aria-label')).toBe('Nicht verfügbar');
    expect(q(card, '.flame')?.classList.contains('status-unavailable')).toBe(true);
    expect(q(card, '.climate-setpoint')).toBeNull();
  });

  it('shows the window badge only when enabled and reflects the state', async () => {
    const hass = createHass({ states: baseStates() });
    const closed = mount(fullConfig, hass);
    await closed.updateComplete;
    expect(q(closed, '.badge.window')).not.toBeNull();
    expect(qa(closed, '.badge.window.is-open')).toHaveLength(0);

    const open = mount(
      { ...fullConfig },
      createHass({
        states: baseStates().map((state) =>
          state.entity_id === 'binary_sensor.window' ? entity('binary_sensor.window', { state: 'on' }) : state
        ),
      })
    );
    await open.updateComplete;
    expect(qa(open, '.badge.window.is-open')).toHaveLength(1);
  });

  it('removes the window badge completely when disabled', async () => {
    const card = mount({ ...fullConfig, show_window: false }, createHass({ states: baseStates() }));
    await card.updateComplete;
    expect(q(card, '.badge.window')).toBeNull();
  });

  it('shows motion state and the quiet duration', async () => {
    const card = mount(fullConfig, createHass({ states: baseStates() }));
    await card.updateComplete;
    expect(qa(card, '.badge.motion.is-idle')).toHaveLength(1);
    expect(text(card, '.subtle')).toContain('Ruhe seit');
    expect(text(card, '.subtle')).toContain('12');
  });

  it('hides the motion badge when disabled', async () => {
    const card = mount({ ...fullConfig, show_motion: false }, createHass({ states: baseStates() }));
    await card.updateComplete;
    expect(q(card, '.badge.motion')).toBeNull();
  });

  it('puts the heating row below the readings with flame, state and setpoint', async () => {
    const card = mount(fullConfig, createHass({ states: baseStates() }));
    await card.updateComplete;
    const row = q(card, '.climate-row');
    const readings = q(card, '.readings');
    expect(row).not.toBeNull();
    // The row follows the values …
    expect(readings!.compareDocumentPosition(row!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // … and precedes the chart.
    const chart = q(card, '.chart-slot') ?? q(card, 'room-climate-chart');
    if (chart) {
      expect(row!.compareDocumentPosition(chart) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
    expect(text(card, '.climate-state')).toBe('Heizt');
    expect(text(card, '.climate-setpoint')).toBe('Soll 22,0 °C');
    expect(q(card, '.climate-sep')?.textContent?.trim()).toBe('·');
    expect(q(card, '.flame svg')).not.toBeNull();
  });

  it('conveys the heating state through flame colour and wording', async () => {
    const heating = mount(fullConfig, createHass({ states: baseStates() }));
    await heating.updateComplete;
    const flame = q(heating, '.flame') as HTMLElement;
    expect(flame.classList.contains('status-heating')).toBe(true);
    expect(flame.style.color).toBe('rgb(239, 68, 68)');
    expect(flame.getAttribute('aria-hidden')).toBe('true');
    expect(text(heating, '.climate-state')).toBe('Heizt');

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
    const idleFlame = q(idle, '.flame') as HTMLElement;
    expect(idleFlame.classList.contains('status-idle')).toBe(true);
    expect(idleFlame.style.color).toBe('rgb(52, 211, 153)');
    // Idle reads as "ready", not as "off" and not as "heating".
    expect(text(idle, '.climate-state')).toBe('Bereit');

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
    expect((q(off, '.flame') as HTMLElement).classList.contains('status-off')).toBe(true);
    expect(text(off, '.climate-state')).toBe('Aus');
    expect(text(off, '.climate-setpoint')).toBe('Soll 18,0 °C');
  });

  it('uses custom flame colours from the configuration', async () => {
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
    expect((q(card, '.flame') as HTMLElement).style.color).toBe('rgb(255, 0, 0)');
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
    const flame = q(card, '.flame') as HTMLElement;
    expect(flame.classList.contains('status-unknown')).toBe(true);
    expect(text(card, '.climate-state')).toBe('Status unbekannt');
    // The setpoint is still known and stays visible.
    expect(text(card, '.climate-setpoint')).toBe('Soll 21,0 °C');
  });

  it('respects thermostat sub-options', async () => {
    const both = mount(
      { ...fullConfig, show_setpoint: false, show_hvac_status: false, show_hvac_mode: false },
      createHass({ states: baseStates() })
    );
    await both.updateComplete;
    expect(q(both, '.climate-row')).toBeNull();

    const stateOnly = mount(
      { ...fullConfig, show_setpoint: false },
      createHass({ states: baseStates() })
    );
    await stateOnly.updateComplete;
    expect(q(stateOnly, '.flame')).not.toBeNull();
    expect(q(stateOnly, '.climate-setpoint')).toBeNull();

    const setpointOnly = mount(
      { ...fullConfig, show_hvac_status: false },
      createHass({ states: baseStates() })
    );
    await setpointOnly.updateComplete;
    expect(q(setpointOnly, '.flame')).toBeNull();
    expect(text(setpointOnly, '.climate-setpoint')).toBe('Soll 22,0 °C');
  });

  it('omits the whole heating row when the thermostat is disabled', async () => {
    const card = mount({ ...fullConfig, show_thermostat: false }, createHass({ states: baseStates() }));
    await card.updateComplete;
    expect(q(card, '.climate-row')).toBeNull();
    expect(q(card, '.flame')).toBeNull();
  });

  it('sizes both readings from CSS variables and keeps humidity at half size', async () => {
    const card = mount(fullConfig, createHass({ states: baseStates() }));
    await card.updateComplete;
    const container = q(card, '.card') as HTMLElement;
    expect(container.style.getPropertyValue('--rcc-temp-size').trim()).toBe('42px');
    expect(container.style.getPropertyValue('--rcc-hum-size').trim()).toBe('20px');
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
    expect(styleText).toMatch(/\.reading\.temperature\s*\{[^}]*font-size:\s*var\(--rcc-temp-size/);
    expect(styleText).toMatch(/\.reading\.humidity\s*\{[^}]*font-size:\s*var\(--rcc-hum-size/);
    // Values share one baseline, so the hero and the secondary value line up.
    expect(styleText).toMatch(/\.reading-values\s*\{[^}]*align-items:\s*baseline/);
    // Tabular figures keep the number from jittering on every update.
    expect(styleText).toMatch(/\.reading-number\s*\{[^}]*tabular-nums/);
    expect(styleText).toMatch(/\.reading-number\s*\{[^}]*letter-spacing:\s*-0\.035em/);
    // Labels in versals with 0.09 em tracking.
    expect(styleText).toMatch(/\.series-label\s*\{[^}]*letter-spacing:\s*0\.09em/);
    expect(styleText).toMatch(/\.series-label\s*\{[^}]*text-transform:\s*uppercase/);
    expect(text(card, '.reading.humidity .reading-value')).toBe('50,4');
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

  it('keeps the whole card on one 4 px grid with a single 20 px inset', async () => {
    const card = mount(fullConfig, createHass({ states: baseStates() }));
    await card.updateComplete;
    const styleText = Array.from(
      (
        card.constructor as unknown as { elementStyles?: ArrayLike<{ cssText?: string }> }
      ).elementStyles ?? []
    )
      .map((sheet) => sheet.cssText ?? '')
      .join('\n');
    // One inset for title, values and chart – no 13/16 px mix any more.
    expect(styleText).toMatch(/\.card\s*\{[^}]*padding:\s*var\(--rcc-space-5\)/);
    expect(styleText).toMatch(/--rcc-space-5:\s*20px/);
    // Every gap and margin is a multiple of 4 px.
    const lengths = Array.from(
      styleText.matchAll(/(?:padding|margin|gap)(?:-top|-bottom|-left|-right)?:\s*([^;]+);/g)
    ).map((match) => match[1]);
    for (const value of lengths) {
      for (const px of Array.from(value.matchAll(/(-?\d+)px/g)).map((m) => Number(m[1]))) {
        expect(Math.abs(px % 4)).toBe(0);
      }
    }
  });

  it('draws depth with a hairline and a soft light gradient instead of a hard frame', async () => {
    const card = mount({ ...fullConfig, theme: 'dark' }, createHass({ states: baseStates() }));
    await card.updateComplete;
    const styleText = Array.from(
      (
        card.constructor as unknown as { elementStyles?: ArrayLike<{ cssText?: string }> }
      ).elementStyles ?? []
    )
      .map((sheet) => sheet.cssText ?? '')
      .join('\n');
    expect(styleText).toContain('#0e1013');
    expect(styleText).toContain('rgba(255, 255, 255, 0.07)');
    expect(styleText).toMatch(/--rcc-radius:\s*26px/);
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
    expect(container.classList.contains('density-xs')).toBe(true);
  });

  it('uses automatic height by default', async () => {
    const card = mount(fullConfig, createHass({ states: baseStates() }));
    await card.updateComplete;
    const container = q(card, '.card') as HTMLElement;
    expect(container.classList.contains('auto-height')).toBe(true);
    expect(container.style.getPropertyValue('--rcc-height')).toBe('');
    // The reference sheet uses a 112 px chart.
    expect(container.style.getPropertyValue('--rcc-chart-height')).toBe('112px');
  });

  it('supports theme overrides', async () => {
    const card = mount({ ...fullConfig, theme: 'light' }, createHass({ states: baseStates() }));
    await card.updateComplete;
    expect(q(card, '.card')?.classList.contains('theme-light')).toBe(true);
  });

  it('toggles a series by clicking its value', async () => {
    const card = mount(fullConfig, createHass({ states: baseStates() }));
    await card.updateComplete;

    const chart = () => q(card, 'room-climate-chart') as HTMLElement & { hiddenSeries: string[] };
    const temperature = q(card, '.reading.temperature') as HTMLButtonElement;
    const humidity = q(card, '.reading.humidity') as HTMLButtonElement;

    // Both series are visible and announced as pressed.
    expect(temperature.tagName).toBe('BUTTON');
    expect(temperature.getAttribute('aria-pressed')).toBe('true');
    expect(chart().hiddenSeries).toEqual([]);

    temperature.click();
    await card.updateComplete;
    expect(temperature.getAttribute('aria-pressed')).toBe('false');
    expect(temperature.classList.contains('is-hidden')).toBe(true);
    expect(chart().hiddenSeries).toEqual(['temperature']);
    // The caption dot of that series dims with it.
    expect(q(card, '.reading-labels .series-label')?.classList.contains('is-hidden')).toBe(true);

    humidity.click();
    await card.updateComplete;
    expect(chart().hiddenSeries).toEqual(['temperature', 'humidity']);

    temperature.click();
    await card.updateComplete;
    expect(chart().hiddenSeries).toEqual(['humidity']);
    expect(temperature.getAttribute('aria-pressed')).toBe('true');
  });

  it('offers no toggle when the series is not drawn in the chart', async () => {
    const card = mount(
      { ...fullConfig, show_temperature_chart: false, show_humidity_chart: false },
      createHass({ states: baseStates() })
    );
    await card.updateComplete;
    expect(q(card, 'button.reading')).toBeNull();
    expect(q(card, '.reading.temperature')?.tagName).toBe('SPAN');
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
    const chart = q(card, 'room-climate-chart') as HTMLElement & {
      gapMode: string;
      gapStyle: string;
      humidityLineStyle: string;
    };
    expect(chart.gapMode).toBe('connect');
    expect(chart.gapStyle).toBe('solid');
    expect(chart.humidityLineStyle).toBe('solid');
  });

  it('forwards the dotted humidity line style to the chart', async () => {
    const card = mount(
      { ...fullConfig, chart_humidity_line_style: 'dotted' },
      createHass({ states: baseStates() })
    );
    await card.updateComplete;
    const chart = q(card, 'room-climate-chart') as HTMLElement & { humidityLineStyle: string };
    expect(chart.humidityLineStyle).toBe('dotted');
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
    expect(text(card, '.reading.temperature .reading-value')).toBe('–');
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
    // Only window + motion are badges now; the heating row is plain text.
    expect(qa(card, '.badge').length).toBe(2);
    expect(q(card, '.climate-row')).not.toBeNull();
  });
});
