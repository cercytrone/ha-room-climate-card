/**
 * Guards the development playground: every demo scenario must render and the
 * mock data must stay clearly marked as synthetic.
 */
import { beforeEach, describe, expect, it } from 'vitest';
import '../src/main';
import type { RoomClimateCard } from '../src/room-climate-card';
import { createMockHass } from '../dev/mock-hass';
import { demoScenarios } from '../dev/scenarios';

const hass = createMockHass();

describe('demo environment', () => {
  beforeEach(() => {
    document.body.replaceChildren();
  });

  it('marks all entities as demo data', () => {
    const ids = Object.keys(hass.states);
    expect(ids.length).toBeGreaterThan(10);
    expect(ids.every((id) => id.includes('.demo_'))).toBe(true);
  });

  it('cannot silently reach a real API', async () => {
    await expect(hass.callApi('GET', 'history/period/2024')).rejects.toThrow(/Demo/);
  });

  it.each(demoScenarios.map((scenario) => [scenario.title, scenario] as const))(
    'renders the scenario %s',
    async (_title, scenario) => {
      const card = document.createElement('room-climate-card') as RoomClimateCard;
      card.hass = hass;
      card.setConfig(scenario.config);
      document.body.append(card);
      await card.updateComplete;
      await new Promise((resolve) => setTimeout(resolve, 80));
      await card.updateComplete;
      expect(card.shadowRoot!.querySelector('.card')).not.toBeNull();
      expect(card.getConfig()).toBeDefined();
    }
  );

  it('serves synthetic history for the demo sensors', async () => {
    const result = await hass.connection!.sendMessagePromise({
      type: 'history/history_during_period',
      start_time: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
      end_time: new Date().toISOString(),
      entity_ids: ['sensor.demo_living_temperature'],
    });
    const samples = (result as Record<string, Array<{ s: string }>>)['sensor.demo_living_temperature'];
    expect(samples.length).toBeGreaterThan(10);
  });
});
