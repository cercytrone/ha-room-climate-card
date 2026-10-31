const DE = {
  roomClimate: 'Raumklima',
  noEntities: 'Keine Sensoren konfiguriert',
  noEntitiesHint: 'Über den Karteneditor Temperatur- und Luftfeuchtesensor auswählen.',
  temperature: 'Temperatur',
  humidity: 'Luftfeuchte',
  windowOpen: 'Fenster offen',
  windowClosed: 'Fenster geschlossen',
  windowUnknown: 'Fensterstatus unbekannt',
  motionDetected: 'Bewegung erkannt',
  motionIdle: 'Keine Bewegung',
  motionUnknown: 'Bewegungsstatus unbekannt',
  quietSince: 'Ruhe seit',
  justNow: 'gerade eben',
  heating: 'Heizt',
  idle: 'Bereit',
  off: 'Aus',
  statusUnknown: 'Status unbekannt',
  unavailable: 'Nicht verfügbar',
  unknown: 'Unbekannt',
  setpoint: 'Soll',
  mode: 'Modus',
  openThermostat: 'Thermostat öffnen',
  noHistory: 'Keine Verlaufsdaten',
  noHistoryHint: 'Für den gewählten Zeitraum liegen keine Messwerte vor.',
  loadingHistory: 'Verlauf wird geladen …',
  historyError: 'Verlauf konnte nicht geladen werden',
  seriesShown: 'Serie eingeblendet',
  seriesHidden: 'Serie ausgeblendet',
  showSeries: 'Serie einblenden',
  hideSeries: 'Serie ausblenden',
  celsius: '°C',
  now: 'Jetzt',
  minutesShort: 'Min.',
  hoursShort: 'Std.',
  daysShort: 'Tg.',
  hoursRange: (hours: number) => `letzte ${hours} Std.`,
  chartAria: (hours: number) => `Verlaufsdiagramm der letzten ${hours} Stunden`,
  hvacAction: {
    heating: 'Heizt',
    idle: 'Bereit',
    off: 'Aus',
    cooling: 'Kühlt',
    fan: 'Lüftet',
    drying: 'Trocknet',
    preheating: 'Vorheizen',
    defrosting: 'Abtau',
    idle_unknown: 'Status unbekannt',
  },
  hvacMode: {
    off: 'Aus',
    heat: 'Heizen',
    cool: 'Kühlen',
    auto: 'Automatik',
    heat_cool: 'Automatik',
    dry: 'Trocknen',
    fan_only: 'Lüften',
  },
} as const;

type Dictionary = {
  [K in keyof typeof DE]: (typeof DE)[K] extends string
    ? string
    : (typeof DE)[K] extends Record<string, string>
      ? Record<string, string>
      : (arg: never) => string;
};

const EN: Dictionary = {
  roomClimate: 'Room climate',
  noEntities: 'No sensors configured',
  noEntitiesHint: 'Choose a temperature and humidity sensor in the card editor.',
  temperature: 'Temperature',
  humidity: 'Humidity',
  windowOpen: 'Window open',
  windowClosed: 'Window closed',
  windowUnknown: 'Window state unknown',
  motionDetected: 'Motion detected',
  motionIdle: 'No motion',
  motionUnknown: 'Motion state unknown',
  quietSince: 'Quiet for',
  justNow: 'just now',
  heating: 'Heating',
  idle: 'Ready',
  off: 'Off',
  statusUnknown: 'Status unknown',
  unavailable: 'Unavailable',
  unknown: 'Unknown',
  setpoint: 'Set',
  mode: 'Mode',
  openThermostat: 'Open thermostat',
  noHistory: 'No history data',
  noHistoryHint: 'There are no measurements for the selected period.',
  loadingHistory: 'Loading history …',
  historyError: 'History could not be loaded',
  seriesShown: 'Series shown',
  seriesHidden: 'Series hidden',
  showSeries: 'Show series',
  hideSeries: 'Hide series',
  celsius: '°C',
  now: 'Now',
  minutesShort: 'min',
  hoursShort: 'h',
  daysShort: 'd',
  hoursRange: (hours: number) => `last ${hours} h`,
  chartAria: (hours: number) => `History chart of the last ${hours} hours`,
  hvacAction: {
    heating: 'Heating',
    idle: 'Ready',
    off: 'Off',
    cooling: 'Cooling',
    fan: 'Fan',
    drying: 'Drying',
    preheating: 'Preheating',
    defrosting: 'Defrosting',
    idle_unknown: 'Status unknown',
  },
  hvacMode: {
    off: 'Off',
    heat: 'Heat',
    cool: 'Cool',
    auto: 'Auto',
    heat_cool: 'Auto',
    dry: 'Dry',
    fan_only: 'Fan only',
  },
};

const DE_DICT: Dictionary = DE as unknown as Dictionary;

export type Translator = ReturnType<typeof createTranslator>;

export function baseLanguage(language?: string): 'de' | 'en' {
  return (language ?? 'en').toLowerCase().startsWith('de') ? 'de' : 'en';
}

export function createTranslator(language?: string) {
  const dict = baseLanguage(language) === 'de' ? DE_DICT : EN;
  return {
    language: baseLanguage(language),
    t(key: Exclude<keyof Dictionary, 'hoursRange' | 'chartAria' | 'hvacAction' | 'hvacMode'>): string {
      return dict[key] as string;
    },
    hoursRange: (hours: number) => (dict.hoursRange as (h: number) => string)(hours),
    chartAria: (hours: number) => (dict.chartAria as (h: number) => string)(hours),
    action: (action: string): string => {
      const map = dict.hvacAction as Record<string, string>;
      return map[action] ?? map.idle_unknown ?? action;
    },
    mode: (mode: string): string => {
      const map = dict.hvacMode as Record<string, string>;
      return map[mode] ?? mode;
    },
  };
}
