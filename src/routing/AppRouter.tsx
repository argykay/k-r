import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { IntroRevealResetProvider } from '@components';
import {
  FaqPage,
  HomePage,
  MapPage,
  NotFoundPage,
  RsvpPage,
  WelcomePartyPage,
} from '@pages';
import { LocaleLayout } from './LocaleLayout';
import { ScrollToTop } from './ScrollToTop';

export const AppRouter = () => {
  return (
    <IntroRevealResetProvider>
      <ScrollToTop />
      <Routes>
        {/* `/` = English (default) */}
        <Route path="/" element={<LocaleLayout />}>
          <Route index element={<HomePage />} />
          <Route path="rsvp" element={<RsvpPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="welcome-party" element={<WelcomePartyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* `/en`, `/el`, `/lv`, and nested routes */}
        <Route path="/:locale" element={<LocaleLayout />}>
          <Route index element={<HomePage />} />
          <Route path="rsvp" element={<RsvpPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="welcome-party" element={<WelcomePartyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </IntroRevealResetProvider>
  );
};
