/**
 * Smoke test for the development playground: it must build its DOM without
 * runtime errors, register its mock elements and render every demo card.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';

function buildShell(): void {
  document.body.innerHTML = `
    <select id="theme"><option value="dark">dark</option></select>
    <select id="height"><option value="auto">auto</option></select>
    <select id="hours"><option value="6">6</option></select>
    <button id="reload"></button>
    <section id="cards"></section>
    <room-climate-card-editor id="editor"></room-climate-card-editor>
    <room-climate-card id="preview"></room-climate-card>
    <pre id="yaml"></pre>
  `;
}

describe('dev playground', () => {
  beforeAll(async () => {
    buildShell();
    await import('../dev/main');
    await new Promise((resolve) => setTimeout(resolve, 150));
  });

  it('registers mock Home Assistant elements', () => {
    expect(customElements.get('ha-icon')).toBeDefined();
    expect(customElements.get('ha-selector')).toBeDefined();
  });

  it('renders all demo cards', () => {
    const cards = document.querySelectorAll('#cards room-climate-card');
    expect(cards.length).toBe(7);
  });

  it('wires the editor to the preview card', async () => {
    const editor = document.querySelector('#editor') as HTMLElement & {
      shadowRoot: ShadowRoot;
    };
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(editor.shadowRoot.querySelectorAll('details').length).toBe(8);

    const nameSelector = Array.from(editor.shadowRoot.querySelectorAll('ha-selector')).find(
      (element) => (element as unknown as { label: string }).label === 'Raumname'
    ) as HTMLElement;
    nameSelector.dispatchEvent(
      new CustomEvent('value-changed', { detail: { value: 'Testraum' }, bubbles: true, composed: true })
    );
    await new Promise((resolve) => setTimeout(resolve, 50));

    const preview = document.querySelector('#preview') as HTMLElement & { shadowRoot: ShadowRoot };
    await (preview as unknown as { updateComplete: Promise<unknown> }).updateComplete;
    expect(preview.shadowRoot.querySelector('.name')?.textContent?.trim()).toBe('Testraum');
    expect(document.querySelector('#yaml')?.textContent).toContain("name: 'Testraum'");
  });

  it('labels the playground page as demo data', () => {
    const html = readFileSync(resolve(process.cwd(), 'dev/index.html'), 'utf8');
    expect(html).toContain('demo-banner');
    expect(html).toContain('simulierte Testdaten');
    expect(html).not.toContain('cdn.tailwindcss.com');
  });
});
