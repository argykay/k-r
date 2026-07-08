import { motion, useReducedMotion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from '@i18n';
import { LocaleLink } from '@routing';
import type { RouteId } from '@routing/paths';

const NAV_ROUTES: { route: RouteId; labelKey: 'navigation.home' | 'navigation.faq' | 'navigation.map' | 'navigation.rsvp' }[] = [
  { route: 'home', labelKey: 'navigation.home' },
  { route: 'faq', labelKey: 'navigation.faq' },
  { route: 'map', labelKey: 'navigation.map' },
  { route: 'rsvp', labelKey: 'navigation.rsvp' },
];

export type NavigationProps = {
  isVisible: boolean;
};

export const Navigation = ({ isVisible }: NavigationProps) => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const syncHeaderHeight = () => {
      document.documentElement.style.setProperty(
        '--header-height',
        `${header.getBoundingClientRect().height}px`,
      );
    };

    syncHeaderHeight();

    const observer = new ResizeObserver(syncHeaderHeight);
    observer.observe(header);

    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      ref={headerRef}
      className="fixed left-0 right-0 top-0 z-50 bg-background-moss-green shadow-md"
      initial={false}
      animate={{ y: isVisible ? 0 : '-100%' }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
      }
      aria-hidden={!isVisible}
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      <div className="flex items-center justify-between px-2 py-6 md:px-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-8">
          <span className="text-style-caption text-white">{t('meta.siteTitle')}</span>
          <span className="text-style-caption text-white">{t('navigation.date')}</span>
        </div>

        <nav
          className="flex flex-wrap items-center justify-end gap-4 md:gap-8 lg:gap-16"
          aria-label={t('navigation.label')}
        >
          {NAV_ROUTES.map(({ route, labelKey }) => (
            <LocaleLink
              key={route}
              route={route}
              className="text-style-link text-white underline-offset-4 hover:underline"
              tabIndex={isVisible ? 0 : -1}
            >
              {t(labelKey)}
            </LocaleLink>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
