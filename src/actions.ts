import type { HomeAssistant } from './types';

/**
 * Card actions in the shape every Home Assistant card understands
 * (`tap_action`, `hold_action`, `double_tap_action`).
 */
export type ActionKind = 'more-info' | 'navigate' | 'url' | 'perform-action' | 'toggle' | 'none';

export interface CardAction {
  action: ActionKind;
  /** Entity for `more-info` / `toggle`; default: the card's main entity. */
  entity?: string;
  navigation_path?: string;
  navigation_replace?: boolean;
  url_path?: string;
  /** `domain.service`, e.g. `climate.set_temperature`. */
  perform_action?: string;
  data?: Record<string, unknown>;
  target?: Record<string, unknown>;
  /** Ask before running; `true` uses the card's default question. */
  confirmation?: boolean | { text?: string };
}

export interface ResolvedActions {
  tap: CardAction;
  /** `null` = no hold action configured (a long press is an ordinary tap). */
  hold: CardAction | null;
  /** `null` = no double tap configured (a tap fires without waiting). */
  doubleTap: CardAction | null;
}

const KINDS: readonly ActionKind[] = [
  'more-info',
  'navigate',
  'url',
  'perform-action',
  'toggle',
  'none',
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function text(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim().length ? value.trim() : undefined;
}

/**
 * Reads one action. Accepts the short strings of earlier versions
 * (`tap_action: none`), the object form (`{ action: navigate, … }`) and the old
 * `call-service` / `service` / `service_data` spelling. Anything unusable falls
 * back to `fallback` – a typo must not silently kill the tap.
 */
export function parseAction(value: unknown, fallback: CardAction | null): CardAction | null {
  if (value === undefined || value === null || value === '') return fallback;
  const raw = isRecord(value) ? value : { action: value };
  let kind = text(raw.action)?.toLowerCase();
  if (kind === 'call-service') kind = 'perform-action';
  if (!kind || !KINDS.includes(kind as ActionKind)) return fallback;

  const action: CardAction = { action: kind as ActionKind };
  const entity = text(raw.entity);
  if (entity) action.entity = entity;
  switch (action.action) {
    case 'navigate': {
      const path = text(raw.navigation_path);
      if (!path) return fallback;
      action.navigation_path = path;
      if (raw.navigation_replace === true) action.navigation_replace = true;
      break;
    }
    case 'url': {
      const url = text(raw.url_path);
      if (!url) return fallback;
      action.url_path = url;
      break;
    }
    case 'perform-action': {
      const service = text(raw.perform_action) ?? text(raw.service);
      if (!service || !/^[a-z0-9_]+\.[a-z0-9_]+$/.test(service)) return fallback;
      action.perform_action = service;
      const data = isRecord(raw.data) ? raw.data : isRecord(raw.service_data) ? raw.service_data : undefined;
      if (data) action.data = { ...data };
      if (isRecord(raw.target)) action.target = { ...raw.target };
      break;
    }
    default:
      break;
  }
  if (raw.confirmation === true) action.confirmation = true;
  else if (isRecord(raw.confirmation)) {
    const question = text(raw.confirmation.text);
    action.confirmation = question ? { text: question } : true;
  }
  return action;
}

export function resolveActions(config: Record<string, unknown>): ResolvedActions {
  return {
    tap: parseAction(config.tap_action, { action: 'more-info' }) ?? { action: 'more-info' },
    hold: parseAction(config.hold_action, null),
    doubleTap: parseAction(config.double_tap_action, null),
  };
}

/** Entity the action works on: its own, or the card's main entity. */
export function actionEntity(action: CardAction, defaultEntity?: string): string | undefined {
  return action.entity ?? defaultEntity;
}

/** Whether running the action would do anything at all. */
export function isActionable(action: CardAction | null, defaultEntity?: string): boolean {
  if (!action || action.action === 'none') return false;
  if (action.action === 'more-info' || action.action === 'toggle') {
    return Boolean(actionEntity(action, defaultEntity));
  }
  return true;
}

export interface RunOptions {
  /** Question for `confirmation: true`. */
  confirmText: string;
  /** Replaceable for tests; defaults to `window.confirm`. */
  confirm?: (question: string) => boolean;
}

/**
 * Runs an action the way the Home Assistant frontend does: more-info through
 * the `hass-more-info` event, navigation through the history API plus
 * `location-changed`, services through `hass.callService`.
 */
export function runAction(
  node: HTMLElement,
  hass: HomeAssistant | undefined,
  action: CardAction | null,
  defaultEntity: string | undefined,
  options: RunOptions
): boolean {
  if (!isActionable(action, defaultEntity) || !action) return false;
  if (action.confirmation) {
    const question =
      typeof action.confirmation === 'object' && action.confirmation.text
        ? action.confirmation.text
        : options.confirmText;
    const ask = options.confirm ?? ((q: string) => window.confirm(q));
    if (!ask(question)) return false;
  }
  const fire = (type: string, detail: unknown): void => {
    node.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
  };
  switch (action.action) {
    case 'more-info':
      fire('hass-more-info', { entityId: actionEntity(action, defaultEntity) });
      return true;
    case 'navigate': {
      const path = action.navigation_path as string;
      if (action.navigation_replace) window.history.replaceState(null, '', path);
      else window.history.pushState(null, '', path);
      window.dispatchEvent(
        new CustomEvent('location-changed', { detail: { replace: Boolean(action.navigation_replace) } })
      );
      return true;
    }
    case 'url':
      window.open(action.url_path, '_blank', 'noopener');
      return true;
    case 'toggle': {
      if (!hass) return false;
      void Promise.resolve(
        hass.callService('homeassistant', 'toggle', { entity_id: actionEntity(action, defaultEntity) })
      ).catch(() => undefined);
      return true;
    }
    case 'perform-action': {
      if (!hass) return false;
      const [domain, service] = (action.perform_action as string).split('.', 2);
      void Promise.resolve(
        hass.callService(domain, service, action.data ?? {}, action.target)
      ).catch(() => undefined);
      return true;
    }
    default:
      return false;
  }
}
