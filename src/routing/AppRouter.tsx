import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { IntroRevealResetProvider } from '@components';
import {
  BoatTourPage,
  FaqPage,
  HomePage,
  MapPage,
  NotFoundPage,
  WelcomePartyPage,
} from '@pages';
import { useTranslation } from '@i18n';
import { LocaleLayout } from './LocaleLayout';
import { localizedPath } from './paths';
import { ScrollToTop } from './ScrollToTop';

const LegacyRsvpRedirect = () => {
  const { locale } = useTranslation();
  return <Navigate to={localizedPath(locale, 'boatTour')} replace />;
};

export const AppRouter = () => {
  return (
    <IntroRevealResetProvider>
      <ScrollToTop />
      <Routes>
        {/* `/` = English (default) */}
        <Route path="/" element={<LocaleLayout />}>
          <Route index element={<HomePage />} />
          <Route path="boat-tour" element={<BoatTourPage />} />
          <Route path="rsvp" element={<LegacyRsvpRedirect />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="welcome-party" element={<WelcomePartyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* `/en`, `/el`, `/lv`, and nested routes */}
        <Route path="/:locale" element={<LocaleLayout />}>
          <Route index element={<HomePage />} />
          <Route path="boat-tour" element={<BoatTourPage />} />
          <Route path="rsvp" element={<LegacyRsvpRedirect />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="welcome-party" element={<WelcomePartyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </IntroRevealResetProvider>
  );
};
