import type { HassEntity, HomeAssistant } from '../src/types';

export interface EntityInit {
  state: string;
  attributes?: Record<string, unknown>;
  lastChanged?: string;
  lastUpdated?: string;
}

export function entity(id: string, init: EntityInit): HassEntity {
  const timestamp = new Date().toISOString();
  return {
    entity_id: id,
    state: init.state,
    attributes: init.attributes ?? {},
    last_changed: init.lastChanged ?? timestamp,
    last_updated: init.lastUpdated ?? init.lastChanged ?? timestamp,
  };
}

export interface HassInit {
  states?: HassEntity[];
  language?: string;
  history?: Record<string, Array<{ s: string; lu: number }>>;
  historyDelayMs?: number;
  onCallApi?: (path: string) => unknown;
  connected?: boolean;
}

export function createHass(init: HassInit = {}): HomeAssistant {
  const states: Record<string, HassEntity> = {};
  for (const state of init.states ?? []) states[state.entity_id] = state;
  return {
    states,
    connected: init.connected ?? true,
    locale: { language: init.language ?? 'de' },
    config: { unit_system: { temperature: '°C' }, time_zone: 'Europe/Berlin' },
    themes: { darkMode: true },
    callService: async () => undefined,
    callApi: async (method: string, path: string) => {
      void method;
      if (init.onCallApi) return init.onCallApi(path);
      throw new Error('callApi not stubbed');
    },
    connection: {
      connected: true,
      sendMessagePromise: async (message: Record<string, unknown>) => {
        if (init.historyDelayMs) {
          await new Promise((resolve) => setTimeout(resolve, init.historyDelayMs));
        }
        if (message.type !== 'history/history_during_period') {
          throw new Error(`unexpected message ${String(message.type)}`);
        }
        return init.history ?? {};
      },
    },
  };
}

export function resizeObservers(): Array<{ trigger: (w: number, h: number) => void; targets: Set<Element> }> {
  return (
    globalThis as unknown as {
      TestResizeObserver: { instances: Array<{ trigger: (w: number, h: number) => void; targets: Set<Element> }> };
    }
  ).TestResizeObserver.instances;
}

/** Triggers the most recently created observer for a specific element. */
export function resizeTo(element: Element, width: number, height: number): void {
  const observers = resizeObservers();
  for (let i = observers.length - 1; i >= 0; i--) {
    if (observers[i].targets.has(element)) {
      observers[i].trigger(width, height);
      return;
    }
  }
  const last = observers[observers.length - 1];
  last?.trigger(width, height);
}

export async function flush(times = 3): Promise<void> {
  for (let i = 0; i < times; i++) {
    await Promise.resolve();
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
}

/** Triggers the most recently created IntersectionObserver for an element. */
export function setVisible(element: Element, visible: boolean): void {
  const observers = (
    globalThis as unknown as {
      TestIntersectionObserver: {
        instances: Array<{ targets: Set<Element>; trigger: (visible: boolean) => void }>;
      };
    }
  ).TestIntersectionObserver.instances;
  for (let i = observers.length - 1; i >= 0; i--) {
    if (observers[i].targets.has(element)) {
      observers[i].trigger(visible);
      return;
    }
  }
  observers[observers.length - 1]?.trigger(visible);
}
