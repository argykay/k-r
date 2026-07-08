import React, { useEffect } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { DEFAULT_LOCALE, isLocale, LocaleProvider } from '@i18n';
import { Footer } from '@modules';

export const LocaleLayout = () => {
  const { locale: localeParam } = useParams<{ locale: string }>();

  const locale = isLocale(localeParam) ? localeParam : DEFAULT_LOCALE;

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  if (localeParam && !isLocale(localeParam)) {
    return <Navigate to="/" replace />;
  }

  return (
    <LocaleProvider locale={locale}>
      <Outlet />
      <Footer />
    </LocaleProvider>
  );
}
