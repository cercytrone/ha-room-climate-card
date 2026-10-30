/** DEMO ONLY: development playground, not part of the published bundle. */
import '../src/main';
import { RoomClimateCard } from '../src/room-climate-card';
import { RoomClimateCardEditor } from '../src/editor/room-climate-editor';
import type { RoomClimateCardConfig } from '../src/config';
import { createMockHass } from './mock-hass';
import { demoScenarios } from './scenarios';
import { registerMockElements } from './mock-elements';

registerMockElements();

const hass = createMockHass();

const cardsContainer = document.querySelector<HTMLElement>('#cards');
const preview = document.querySelector<RoomClimateCard>('#preview');
const editor = document.querySelector<RoomClimateCardEditor>('#editor');
const yamlOutput = document.querySelector<HTMLElement>('#yaml');

let heightSetting: 'auto' | number = 'auto';
let hoursSetting = 6;

function renderCards(): void {
  if (!cardsContainer) return;
  cardsContainer.replaceChildren();
  for (const scenario of demoScenarios) {
    const card = document.createElement('room-climate-card') as RoomClimateCard;
    card.hass = hass;
    card.setConfig({
      ...scenario.config,
      height: heightSetting,
      chart_hours: hoursSetting,
    });
    card.setAttribute('title', scenario.title);
    card.style.minHeight = '0';
    cardsContainer.append(card);
  }
}

function configToYaml(config: RoomClimateCardConfig): string {
  const lines = Object.entries(config).map(([key, value]) => {
    if (Array.isArray(value)) return `${key}: [${value.map((item) => `'${String(item)}'`).join(', ')}]`;
    if (typeof value === 'string') return `${key}: '${value}'`;
    return `${key}: ${String(value)}`;
  });
  return lines.join('\n');
}

const initialEditorConfig: RoomClimateCardConfig = {
  ...demoScenarios[0].config,
};

if (editor && preview) {
  editor.hass = hass;
  editor.setConfig(initialEditorConfig);
  preview.hass = hass;
  preview.setConfig(initialEditorConfig);
  editor.addEventListener('config-changed', (event) => {
    const detail = (event as CustomEvent<{ config: RoomClimateCardConfig }>).detail;
    if (!detail?.config) return;
    preview.setConfig({ ...detail.config, height: heightSetting });
    if (yamlOutput) yamlOutput.textContent = configToYaml(detail.config);
    event.stopPropagation();
  });
}

const themeSelect = document.querySelector<HTMLSelectElement>('#theme');
themeSelect?.addEventListener('change', () => {
  document.documentElement.dataset.theme = themeSelect.value;
  if (hass.themes) hass.themes.darkMode = themeSelect.value === 'dark';
  // Force every card to re-render with the new theme.
  for (const card of document.querySelectorAll<RoomClimateCard>('room-climate-card')) {
    card.requestUpdate();
  }
});

document.querySelector<HTMLSelectElement>('#height')?.addEventListener('change', (event) => {
  const value = (event.target as HTMLSelectElement).value;
  heightSetting = value === 'auto' ? 'auto' : Number(value);
  renderCards();
  if (preview && editor) {
    preview.setConfig({ ...editor.config, height: heightSetting });
  }
});

document.querySelector<HTMLSelectElement>('#hours')?.addEventListener('change', (event) => {
  hoursSetting = Number((event.target as HTMLSelectElement).value);
  renderCards();
});

document.querySelector<HTMLButtonElement>('#reload')?.addEventListener('click', () => {
  window.location.reload();
});

renderCards();
if (yamlOutput) yamlOutput.textContent = configToYaml(initialEditorConfig);
