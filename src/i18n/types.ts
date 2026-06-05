import type { Locale } from './config';
import copy from './copy.json';

export type Copy = typeof copy;

export type LocaleStrings = Record<Locale, string>;

/** Dot-notation keys: `section.item` (e.g. `navigation.home`). */
export type TranslationKey = {
  [Section in keyof Copy]: {
    [Item in keyof Copy[Section]]: `${Section & string}.${Item & string}`;
  }[keyof Copy[Section]];
}[keyof Copy];
