import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { FaqPage, HomePage } from '@pages';
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
        <Route path="faq" element={<FaqPage />} />
      </Route>

      {/* `/en`, `/el`, `/lv`, and nested routes */}
      <Route path="/:locale" element={<LocaleLayout />}>
        <Route index element={<HomePage />} />
        <Route path="faq" element={<FaqPage />} />
      </Route>
      </Routes>
    </>
  );
}
