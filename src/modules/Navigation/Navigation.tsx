import { motion, useReducedMotion } from 'framer-motion';
import React, { useEffect, useId, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DottedHoverUnderline } from '@components';
import { useTranslation } from '@i18n';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import { LocaleLink } from '@routing';
import type { RouteId } from '@routing/paths';

const NAV_ROUTES: {
  route: RouteId;
  labelKey:
    | 'navigation.welcomeParty'
    | 'navigation.faq'
    | 'navigation.map'
    | 'navigation.rsvp';
}[] = [
  { route: 'welcomeParty', labelKey: 'navigation.welcomeParty' },
  { route: 'faq', labelKey: 'navigation.faq' },
  { route: 'map', labelKey: 'navigation.map' },
  { route: 'rsvp', labelKey: 'navigation.rsvp' },
];

const NAV_LINK_CLASS =
  'group relative inline-block pb-1 font-cardo text-link tracking-link text-white no-underline';

export type NavigationProps = {
  isVisible: boolean;
};

export const Navigation = ({ isVisible }: NavigationProps) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

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
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isVisible) setMenuOpen(false);
  }, [isVisible]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const linkTabIndex = isVisible ? 0 : -1;

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
      <div className="flex items-center justify-between gap-4 px-4 py-5 md:px-6 md:py-6">
        <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:gap-8">
          <LocaleLink
            route="home"
            className="group relative inline-block shrink-0 pb-1 text-style-caption text-white no-underline"
            tabIndex={linkTabIndex}
            onClick={() => setMenuOpen(false)}
          >
            {t('meta.siteTitle')}
            <DottedHoverUnderline color="text-white" />
          </LocaleLink>
          <span className="hidden text-style-caption text-white sm:inline">
            {t('navigation.date')}
          </span>
        </div>

        <nav
          className="hidden items-center gap-6 md:flex lg:gap-10"
          aria-label={t('navigation.label')}
        >
          {NAV_ROUTES.map(({ route, labelKey }) => (
            <LocaleLink
              key={route}
              route={route}
              className={NAV_LINK_CLASS}
              tabIndex={linkTabIndex}
            >
              {t(labelKey)}
              <DottedHoverUnderline color="text-white" />
            </LocaleLink>
          ))}
          <LanguageSwitcher
            className="ml-2 border-l border-white/30 pl-6 lg:ml-4 lg:pl-10"
            linkClassName="text-white"
            tabIndex={linkTabIndex}
          />
        </nav>

        <button
          type="button"
          className="relative flex h-10 w-10 shrink-0 items-center justify-center text-white md:hidden"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={
            menuOpen ? t('navigation.closeMenu') : t('navigation.openMenu')
          }
          tabIndex={linkTabIndex}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden className="flex w-5 flex-col gap-1.5">
            <span
              className={[
                'block h-0.5 w-full origin-center bg-current transition-transform duration-200',
                menuOpen ? 'translate-y-2 rotate-45' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block h-0.5 w-full bg-current transition-opacity duration-200',
                menuOpen ? 'opacity-0' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block h-0.5 w-full origin-center bg-current transition-transform duration-200',
                menuOpen ? '-translate-y-2 -rotate-45' : '',
              ].join(' ')}
            />
          </span>
        </button>
      </div>

      <div
        id={menuId}
        className={[
          'overflow-hidden border-t border-white/15 md:hidden',
          menuOpen ? 'block' : 'hidden',
        ].join(' ')}
      >
        <nav
          className="flex flex-col gap-5 px-4 py-6"
          aria-label={t('navigation.label')}
        >
          {NAV_ROUTES.map(({ route, labelKey }) => (
            <LocaleLink
              key={route}
              route={route}
              className={`${NAV_LINK_CLASS} self-start text-left`}
              tabIndex={menuOpen && isVisible ? 0 : -1}
              onClick={() => setMenuOpen(false)}
            >
              {t(labelKey)}
              <DottedHoverUnderline color="text-white" />
            </LocaleLink>
          ))}
          <LanguageSwitcher
            className="border-t border-white/15 pt-5"
            linkClassName="text-white"
            tabIndex={menuOpen && isVisible ? 0 : -1}
          />
        </nav>
      </div>
    </motion.header>
  );
};
