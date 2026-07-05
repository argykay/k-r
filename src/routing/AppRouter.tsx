import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage, RsvpPage } from '@pages';
import { LocaleLayout } from './LocaleLayout';

export const AppRouter = () => {
  return (
    <Routes>
      {/* `/` = English (default) */}
      <Route path="/" element={<LocaleLayout />}>
        <Route index element={<HomePage />} />
        <Route path="rsvp" element={<RsvpPage />} />
      </Route>

      {/* `/en`, `/el`, `/lv`, and nested routes */}
      <Route path="/:locale" element={<LocaleLayout />}>
        <Route index element={<HomePage />} />
        <Route path="rsvp" element={<RsvpPage />} />
      </Route>
    </Routes>
  );
}
