import { CARD_DESCRIPTION, CARD_NAME, CARD_TAG, CARD_VERSION, EDITOR_TAG } from './const';
import { RoomClimateCard } from './room-climate-card';
import { RoomClimateCardEditor } from './editor/room-climate-editor';

/* eslint-disable no-console */
console.info(
  `%c ROOM-CLIMATE-CARD %c v${CARD_VERSION} `,
  'color:#0b1120;background:#38bdf8;font-weight:600;border-radius:3px 0 0 3px;padding:2px 4px',
  'color:#38bdf8;background:#0b1120;font-weight:600;border-radius:0 3px 3px 0;padding:2px 4px'
);

if (!customElements.get(CARD_TAG)) {
  customElements.define(CARD_TAG, RoomClimateCard);
}

if (!customElements.get(EDITOR_TAG)) {
  customElements.define(EDITOR_TAG, RoomClimateCardEditor);
}

const customCards = (window.customCards = window.customCards ?? []);
if (!customCards.some((card) => card.type === CARD_TAG)) {
  customCards.push({
    type: CARD_TAG,
    name: CARD_NAME,
    description: CARD_DESCRIPTION,
    preview: true,
    documentationURL: 'https://github.com/cercytrone/ha-room-climate-card',
  });
}

export { RoomClimateCard, RoomClimateCardEditor, CARD_TAG, CARD_VERSION };
