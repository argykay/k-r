import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { DEFAULT_LOCALE, isLocale, LocaleProvider } from '@i18n';
import { Footer, SiteAccessGate } from '@modules';
import { NotFoundPage } from '@pages';

export const LocaleLayout = () => {
  const { locale: localeParam } = useParams<{ locale: string }>();
  const localeValid = !localeParam || isLocale(localeParam);
  const locale = isLocale(localeParam) ? localeParam : DEFAULT_LOCALE;

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleProvider locale={locale}>
      <div className="site-shell">
        <SiteAccessGate>
          {localeValid ? <Outlet /> : <NotFoundPage />}
        </SiteAccessGate>
        <Footer />
      </div>
    </LocaleProvider>
  );
};
