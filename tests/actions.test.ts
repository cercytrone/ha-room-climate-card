import { describe, expect, it, vi } from 'vitest';
import { isActionable, parseAction, resolveActions, runAction } from '../src/actions';
import { createHass } from './helpers';

const options = { confirmText: 'Wirklich ausführen?' };

describe('parseAction', () => {
  it('reads the short and the object form', () => {
    expect(parseAction('none', null)).toEqual({ action: 'none' });
    expect(parseAction({ action: 'more-info', entity: 'sensor.t' }, null)).toEqual({
      action: 'more-info',
      entity: 'sensor.t',
    });
  });

  it('maps the old call-service spelling', () => {
    expect(
      parseAction(
        { action: 'call-service', service: 'light.toggle', service_data: { entity_id: 'light.a' } },
        null
      )
    ).toEqual({ action: 'perform-action', perform_action: 'light.toggle', data: { entity_id: 'light.a' } });
  });

  it('falls back on anything unusable', () => {
    const fallback = { action: 'more-info' as const };
    expect(parseAction({ action: 'teleport' }, fallback)).toBe(fallback);
    expect(parseAction({ action: 'navigate' }, fallback)).toBe(fallback);
    expect(parseAction({ action: 'perform-action', perform_action: 'nonsense' }, fallback)).toBe(fallback);
    expect(parseAction(undefined, null)).toBeNull();
  });

  it('keeps a confirmation question', () => {
    expect(parseAction({ action: 'toggle', confirmation: { text: 'Sicher?' } }, null)).toEqual({
      action: 'toggle',
      confirmation: { text: 'Sicher?' },
    });
  });

  it('defaults to more-info on tap and nothing on hold or double tap', () => {
    expect(resolveActions({})).toEqual({ tap: { action: 'more-info' }, hold: null, doubleTap: null });
  });
});

describe('runAction', () => {
  it('opens more-info for the given or the default entity', () => {
    const node = document.createElement('div');
    const opened: string[] = [];
    node.addEventListener('hass-more-info', (event) =>
      opened.push((event as CustomEvent<{ entityId: string }>).detail.entityId)
    );
    runAction(node, createHass(), { action: 'more-info' }, 'climate.a', options);
    runAction(node, createHass(), { action: 'more-info', entity: 'sensor.b' }, 'climate.a', options);
    expect(opened).toEqual(['climate.a', 'sensor.b']);
    expect(isActionable({ action: 'more-info' }, undefined)).toBe(false);
    expect(runAction(node, createHass(), { action: 'none' }, 'climate.a', options)).toBe(false);
  });

  it('navigates through the history API and tells the frontend', () => {
    const pushState = vi.spyOn(window.history, 'pushState');
    const changed = vi.fn();
    window.addEventListener('location-changed', changed);
    try {
      runAction(
        document.createElement('div'),
        createHass(),
        { action: 'navigate', navigation_path: '/lovelace/bad' },
        undefined,
        options
      );
      expect(pushState).toHaveBeenCalledWith(null, '', '/lovelace/bad');
      expect(changed).toHaveBeenCalledTimes(1);
    } finally {
      window.removeEventListener('location-changed', changed);
      pushState.mockRestore();
    }
  });

  it('toggles and calls services through hass', () => {
    const hass = createHass();
    const callService = vi.fn(async () => undefined);
    hass.callService = callService;
    const node = document.createElement('div');
    runAction(node, hass, { action: 'toggle' }, 'switch.fan', options);
    runAction(
      node,
      hass,
      { action: 'perform-action', perform_action: 'climate.set_hvac_mode', data: { hvac_mode: 'off' } },
      undefined,
      options
    );
    expect(callService).toHaveBeenNthCalledWith(1, 'homeassistant', 'toggle', { entity_id: 'switch.fan' });
    expect(callService).toHaveBeenNthCalledWith(2, 'climate', 'set_hvac_mode', { hvac_mode: 'off' }, undefined);
  });

  it('asks first when a confirmation is set', () => {
    const hass = createHass();
    const callService = vi.fn(async () => undefined);
    hass.callService = callService;
    const confirm = vi.fn(() => false);
    const ran = runAction(
      document.createElement('div'),
      hass,
      { action: 'toggle', confirmation: true },
      'switch.fan',
      { ...options, confirm }
    );
    expect(confirm).toHaveBeenCalledWith('Wirklich ausführen?');
    expect(ran).toBe(false);
    expect(callService).not.toHaveBeenCalled();
  });
});
