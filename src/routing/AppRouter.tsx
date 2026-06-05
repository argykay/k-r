import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from '@pages';
import { LocaleLayout } from './LocaleLayout';

export const AppRouter = () => {
  return (
    <Routes>
      {/* `/` = English (default) */}
      <Route path="/" element={<LocaleLayout />}>
        <Route index element={<HomePage />} />
      </Route>

      {/* `/en`, `/el`, `/lv`, and nested routes */}
      <Route path="/:locale" element={<LocaleLayout />}>
        <Route index element={<HomePage />} />
        {/* Add more routes, e.g. <Route path="our-story" element={<OurStoryPage />} /> */}
      </Route>
    </Routes>
  );
}
