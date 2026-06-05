import React, { createContext, useContext, useMemo } from 'react';
import type { Locale } from './config';
import { translate } from './translate';
import type { TranslationKey } from './types';

export type LocaleContextValue = {
  locale: Locale;
  t: (key: TranslationKey) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export type LocaleProviderProps = {
  locale: Locale;
  children: React.ReactNode;
};

export const LocaleProvider = ({ locale, children }: LocaleProviderProps) => {
  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      t: (key) => translate(locale, key),
    }),
    [locale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocaleContext(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocaleContext must be used within LocaleProvider');
  }
  return context;
}
