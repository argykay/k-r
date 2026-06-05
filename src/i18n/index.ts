export {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_LABELS,
  LOCALES,
  localeFromBrowserLanguage,
} from './config';
export type { Locale } from './config';
export { default as copy } from './copy.json';
export { LocaleProvider } from './LocaleContext';
export { useTranslation } from './useTranslation';
export type { TranslationKey } from './types';
