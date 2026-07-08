import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { FaqPage, HomePage, MapPage, RsvpPage } from '@pages';
import { LocaleLayout } from './LocaleLayout';
import { ScrollToTop } from './ScrollToTop';

export const AppRouter = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
      {/* `/` = English (default) */}
      <Route path="/" element={<LocaleLayout />}>
        <Route index element={<HomePage />} />
        <Route path="rsvp" element={<RsvpPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="map" element={<MapPage />} />
      </Route>

      {/* `/en`, `/el`, `/lv`, and nested routes */}
      <Route path="/:locale" element={<LocaleLayout />}>
        <Route index element={<HomePage />} />
        <Route path="rsvp" element={<RsvpPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="map" element={<MapPage />} />
      </Route>
      </Routes>
    </>
  );
}