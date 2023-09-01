export enum Language {
  En = 'en',
  Ru = 'ru',
}

export type LocalizationDictionary = typeof import('./en').default;
