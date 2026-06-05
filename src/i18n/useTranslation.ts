import { useLocaleContext } from './LocaleContext';
import type { TranslationKey } from './types';

export function useTranslation() {
  const { locale, t } = useLocaleContext();
  return { locale, t };
}

export type { TranslationKey };
