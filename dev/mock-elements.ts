/**
 * DEMO ONLY: minimal stand-ins for the Home Assistant frontend elements used by
 * the card and the editor. In a real Home Assistant these are provided by the
 * frontend itself.
 */
import type { HomeAssistant } from '../src/types';

type Selector = Record<string, any>;

class MockHaIcon extends HTMLElement {
  private _icon = '';

  set icon(value: string) {
    this._icon = value;
    this.render();
  }

  get icon(): string {
    return this._icon;
  }

  connectedCallback(): void {
    this.render();
  }

  private render(): void {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-flex; align-items: center; justify-content: center; }
        svg { width: var(--mdc-icon-size, 16px); height: var(--mdc-icon-size, 16px); }
      </style>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
        <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1Z" />
      </svg>`;
    this.title = this._icon;
  }
}

class MockHaSelector extends HTMLElement {
  private _hass?: HomeAssistant;
  private _selector: Selector = { text: {} };
  private _label = '';
  private _value: unknown = undefined;
  private _disabled = false;

  set hass(value: HomeAssistant | undefined) {
    this._hass = value;
    this.render();
  }

  get hass(): HomeAssistant | undefined {
    return this._hass;
  }

  set selector(value: Selector) {
    this._selector = value;
    this.render();
  }

  get selector(): Selector {
    return this._selector;
  }

  set label(value: string) {
    this._label = value;
    this.render();
  }

  get label(): string {
    return this._label;
  }

  set value(value: unknown) {
    this._value = value;
    this.render();
  }

  get value(): unknown {
    return this._value;
  }

  set disabled(value: boolean) {
    this._disabled = Boolean(value);
    this.render();
  }

  get disabled(): boolean {
    return this._disabled;
  }

  connectedCallback(): void {
    this.render();
  }

  private emit(value: unknown): void {
    if (this._disabled) return;
    this.dispatchEvent(
      new CustomEvent('value-changed', { detail: { value }, bubbles: true, composed: true })
    );
  }

  private render(): void {
    if (!this.isConnected) return;
    const type = Object.keys(this._selector ?? { text: {} })[0] ?? 'text';
    const options = this._selector?.select?.options ?? [];
    const wrapper = document.createElement('label');
    wrapper.style.cssText = 'display:flex;flex-direction:column;gap:4px;font-size:12px;';

    const caption = document.createElement('span');
    caption.textContent = this._label;
    caption.style.cssText = 'font-size:11px;color:var(--demo-muted);';
    wrapper.append(caption);

    const element = this.buildControl(type, options);
    element.style.cssText =
      'background:var(--demo-input-bg,#1b2436);border:1px solid var(--demo-border,#2b3a52);border-radius:8px;color:var(--demo-text,#e6edf9);padding:5px 7px;font-size:12px;font-family:inherit;';
    wrapper.append(element);
    this.replaceChildren(wrapper);
  }

  private buildControl(type: string, options: Array<{ value: unknown; label?: string }>): HTMLElement {
    if (type === 'boolean') {
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = Boolean(this._value);
      input.disabled = this._disabled;
      input.addEventListener('change', () => this.emit(input.checked));
      return input;
    }
    if (type === 'select') {
      const select = document.createElement('select');
      select.disabled = this._disabled;
      for (const option of options) {
        const item = document.createElement('option');
        item.value = String(option.value);
        item.textContent = option.label ?? String(option.value);
        select.append(item);
      }
      select.value = String(this._value ?? '');
      select.addEventListener('change', () => this.emit(select.value));
      return select;
    }
    if (type === 'entity') {
      const select = document.createElement('select');
      select.disabled = this._disabled;
      const empty = document.createElement('option');
      empty.value = '';
      empty.textContent = '–';
      select.append(empty);
      const domains = this._selector?.entity?.domain;
      const allowed = Array.isArray(domains) ? domains : domains ? [domains] : null;
      const ids = Object.keys(this._hass?.states ?? {})
        .filter((id) => !allowed || allowed.includes(id.split('.')[0]))
        .sort();
      for (const id of ids) {
        const item = document.createElement('option');
        item.value = id;
        item.textContent = id;
        select.append(item);
      }
      select.value = String(this._value ?? '');
      select.addEventListener('change', () => this.emit(select.value));
      return select;
    }
    if (type === 'color_rgb') {
      const current = Array.isArray(this._value) ? (this._value as number[]) : [148, 163, 184];
      const input = document.createElement('input');
      input.type = 'color';
      input.disabled = this._disabled;
      input.value = `#${current
        .slice(0, 3)
        .map((channel) => Number(channel).toString(16).padStart(2, '0'))
        .join('')}`;
      input.addEventListener('change', () => {
        const hex = input.value;
        this.emit([
          parseInt(hex.slice(1, 3), 16),
          parseInt(hex.slice(3, 5), 16),
          parseInt(hex.slice(5, 7), 16),
        ]);
      });
      return input;
    }
    if (type === 'state') {
      const entityId = String(this._selector?.state?.entity_id ?? '');
      const select = document.createElement('select');
      select.multiple = true;
      select.disabled = this._disabled;
      const states = [this._hass?.states[entityId]?.state, 'on', 'off', 'open', 'closed', 'tilted']
        .filter((state): state is string => Boolean(state))
        .filter((state, index, all) => all.indexOf(state) === index);
      const selected = new Set(Array.isArray(this._value) ? (this._value as string[]) : []);
      for (const state of states) {
        const item = document.createElement('option');
        item.value = state;
        item.textContent = state;
        item.selected = selected.has(state);
        select.append(item);
      }
      select.addEventListener('change', () => {
        this.emit(Array.from(select.selectedOptions).map((option) => option.value));
      });
      return select;
    }
    const input = document.createElement('input');
    input.type = type === 'number' ? 'number' : 'text';
    if (type === 'number') {
      const config = this._selector?.number ?? {};
      input.min = String(config.min ?? '');
      input.max = String(config.max ?? '');
      input.step = String(config.step ?? 1);
      if (config.mode === 'box') input.style.maxWidth = '140px';
    }
    if (type === 'icon') input.placeholder = 'mdi:home';
    input.value = this._value === undefined ? '' : String(this._value);
    input.disabled = this._disabled;
    input.addEventListener('change', () => {
      this.emit(type === 'number' ? (input.value === '' ? undefined : Number(input.value)) : input.value);
    });
    return input;
  }
}

export function registerMockElements(): void {
  if (!customElements.get('ha-icon')) {
    customElements.define('ha-icon', MockHaIcon);
  }
  if (!customElements.get('ha-selector')) {
    customElements.define('ha-selector', MockHaSelector);
  }
}
