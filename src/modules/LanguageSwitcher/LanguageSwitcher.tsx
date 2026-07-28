import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DottedHoverUnderline } from '@components';
import { LOCALES, LOCALE_LABELS, useTranslation } from '@i18n';
import { switchLocalePath } from '@routing/paths';

export type LanguageSwitcherProps = {
  className?: string;
  linkClassName?: string;
  tabIndex?: number;
};

export const LanguageSwitcher = ({
  className,
  linkClassName,
  tabIndex,
}: LanguageSwitcherProps) => {
  const { locale, t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <nav
      aria-label={t('languages.label')}
      className={['flex flex-wrap gap-3', className].filter(Boolean).join(' ')}
    >
      {LOCALES.map((code) => {
        const isActive = code === locale;
        return (
          <Link
            key={code}
            to={switchLocalePath(pathname, code)}
            className={[
              'group relative inline-block font-cardo text-link tracking-link no-underline',
              linkClassName,
              isActive ? 'text-blood-orange' : 'text-moss-green',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-current={isActive ? 'page' : undefined}
            lang={code}
            tabIndex={tabIndex}
          >
            {LOCALE_LABELS[code]}
            <DottedHoverUnderline
              color={isActive ? 'text-blood-orange' : 'text-moss-green'}
            />
          </Link>
        );
      })}
    </nav>
  );
};
