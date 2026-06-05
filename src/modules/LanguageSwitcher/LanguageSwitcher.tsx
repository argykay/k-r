import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LOCALES,
  useTranslation,
  type Locale,
  type TranslationKey,
} from '@i18n';
import { switchLocalePath } from '@routing/paths';

const LANGUAGE_LABEL_KEYS: Record<Locale, TranslationKey> = {
  en: 'languages.en',
  el: 'languages.el',
  lv: 'languages.lv',
};

export const LanguageSwitcher = () => {
  const { locale, t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <nav aria-label={t('languages.label')} className="flex gap-4">
      {LOCALES.map((code) => {
        const isActive = code === locale;
        return (
          <Link
            key={code}
            to={switchLocalePath(pathname, code)}
            className={[
              'text-style-link',
              isActive ? 'font-semibold' : 'opacity-70',
            ].join(' ')}
            aria-current={isActive ? 'page' : undefined}
            lang={code}
          >
            {t(LANGUAGE_LABEL_KEYS[code])}
          </Link>
        );
      })}
    </nav>
  );
}
