import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DottedHoverUnderline } from '@components';
import { LOCALES, LOCALE_LABELS, useTranslation } from '@i18n';
import { switchLocalePath } from '@routing/paths';

export type LanguageSwitcherProps = {
  className?: string;
  /** Color class for the inactive locale links. */
  linkClassName?: string;
  /** Color class for the active locale link. */
  activeClassName?: string;
  /** Keep the dotted underline visible on the active locale. */
  underlineActive?: boolean;
  tabIndex?: number;
};

export const LanguageSwitcher = ({
  className,
  linkClassName = 'text-moss-green',
  activeClassName = 'text-blood-orange',
  underlineActive = false,
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
        const colorClass = isActive ? activeClassName : linkClassName;
        return (
          <Link
            key={code}
            to={switchLocalePath(pathname, code)}
            className={[
              'group relative inline-block font-cardo text-link tracking-link no-underline',
              colorClass,
            ]
              .filter(Boolean)
              .join(' ')}
            aria-current={isActive ? 'page' : undefined}
            lang={code}
            tabIndex={tabIndex}
          >
            {LOCALE_LABELS[code]}
            <DottedHoverUnderline
              color={colorClass}
              forceVisible={underlineActive && isActive}
            />
          </Link>
        );
      })}
    </nav>
  );
};
