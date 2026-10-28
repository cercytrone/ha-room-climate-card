import { describe, expect, it } from 'vitest';
import { CARD_NAME, CARD_TAG, CARD_VERSION, EDITOR_TAG } from '../src/const';
import '../src/main';

describe('card registration', () => {
  it('registers the custom card element', () => {
    const ctor = customElements.get(CARD_TAG);
    expect(ctor).toBeTypeOf('function');
    expect(document.createElement(CARD_TAG)).toBeInstanceOf(ctor as CustomElementConstructor);
  });

  it('registers the editor element', () => {
    const editor = document.createElement(EDITOR_TAG);
    expect(editor).toBeInstanceOf(customElements.get(EDITOR_TAG) as CustomElementConstructor);
    expect(typeof (editor as unknown as { setConfig: () => void }).setConfig).toBe('function');
  });

  it('adds itself to the card picker metadata', () => {
    const entry = (window.customCards ?? []).find((card) => card.type === CARD_TAG);
    expect(entry).toBeDefined();
    expect(entry?.name).toBe(CARD_NAME);
    expect(entry?.description).toContain('Raumklima');
    expect(entry?.preview).toBe(true);
    expect(entry?.documentationURL).toContain('github.com');
  });

  it('does not duplicate the metadata when the module is loaded twice', async () => {
    await import('../src/main');
    const matches = (window.customCards ?? []).filter((card) => card.type === CARD_TAG);
    expect(matches).toHaveLength(1);
  });

  it('exposes the version from the build', () => {
    expect(CARD_VERSION).toBe('test');
  });

  it('returns a usable config element from the instance and the class', () => {
    const card = document.createElement(CARD_TAG) as HTMLElement & {
      getConfigElement: () => HTMLElement;
    };
    const instanceEditor = card.getConfigElement();
    expect(instanceEditor.tagName.toLowerCase()).toBe(EDITOR_TAG);

    const ctor = customElements.get(CARD_TAG) as unknown as {
      getConfigElement: () => HTMLElement;
    };
    expect(ctor.getConfigElement().tagName.toLowerCase()).toBe(EDITOR_TAG);
  });

  it('exposes the picker stub config', () => {
    const ctor = customElements.get(CARD_TAG) as unknown as {
      getStubConfig: (hass?: unknown) => { type?: string };
    };
    expect(ctor.getStubConfig().type).toBe(`custom:${CARD_TAG}`);
  });
});
