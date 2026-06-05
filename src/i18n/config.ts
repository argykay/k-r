/** Supported locales. Greek uses ISO 639-1 code `el` in URLs. */
export const LOCALES = ['en', 'el', 'lv'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  el: 'Ελληνικά',
  lv: 'Latviešu',
};

export function isLocale(value: string | undefined): value is Locale {
  return LOCALES.includes(value as Locale);
}

/** Map browser language tags to app locales. */
export function localeFromBrowserLanguage(language: string): Locale | null {
  const base = language.split('-')[0]?.toLowerCase();
  if (base === 'gr') return 'el';
  if (isLocale(base)) return base;
  return null;
}
