import type { Locale } from './config';
import copy from './copy.json';
import type { TranslationKey } from './types';

export function translate(locale: Locale, key: TranslationKey): string {
  const dot = key.indexOf('.');
  if (dot === -1) {
    return key;
  }

  const section = key.slice(0, dot);
  const item = key.slice(dot + 1);
  const entry = copy[section as keyof typeof copy]?.[
    item as keyof (typeof copy)[keyof typeof copy]
  ] as Record<Locale, string> | undefined;

  const value = entry?.[locale];
  if (value === undefined && process.env.NODE_ENV === 'development') {
    console.warn(`Missing translation: ${key} [${locale}]`);
  }

  return value ?? key;
}
