import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { TargetAndTransition } from 'framer-motion';
import React, { useEffect, useId, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ReactComponent as Star2Svg } from '@assets/svgs/star_2.svg';
import { AnimatedVector, DottedHoverUnderline } from '@components';
import type { AnimatedVectorOptions } from '../../utils/animatedVector';
import { useTranslation } from '@i18n';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import { LocaleLink } from '@routing';
import { pathWithoutLocale, ROUTE_SEGMENTS, type RouteId } from '@routing/paths';

const NAV_ROUTES: {
  route: RouteId;
  labelKey:
    | 'navigation.welcomeParty'
    | 'navigation.faq'
    | 'navigation.map'
    | 'navigation.boatTour';
}[] = [
  { route: 'welcomeParty', labelKey: 'navigation.welcomeParty' },
  { route: 'faq', labelKey: 'navigation.faq' },
  { route: 'map', labelKey: 'navigation.map' },
  { route: 'boatTour', labelKey: 'navigation.boatTour' },
];

const NAV_LINK_CLASS =
  'group relative inline-block font-cardo text-link tracking-link no-underline';

const STAR_STROKE: AnimatedVectorOptions = {
  intensity: 'strong',
  effect: 'stroke',
  filterDisplayWidthPx: 3,
};

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_IN_OUT = [0.4, 0, 0.2, 1] as const;

const PANEL_OPEN_TRANSITION = {
  height: { duration: 0.55, ease: EASE_OUT },
  opacity: { duration: 0.45, ease: EASE_OUT, delay: 0.05 },
};

const PANEL_CLOSE_TRANSITION = {
  height: { duration: 0.42, ease: EASE_IN_OUT },
  opacity: { duration: 0.22, ease: EASE_IN_OUT },
};

const BACKDROP_OPEN_TRANSITION = {
  duration: 0.55,
  ease: EASE_OUT,
};

const BACKDROP_CLOSE_TRANSITION = {
  duration: 0.42,
  ease: EASE_IN_OUT,
};

const INSTANT = { duration: 0 };

const BACKDROP_BG = 'rgba(225, 219, 203, 0.35)';
const BACKDROP_BG_CLEAR = 'rgba(225, 219, 203, 0)';

const BACKDROP_STYLE = {
  backdropFilter: 'blur(var(--nav-backdrop-blur))',
  WebkitBackdropFilter: 'blur(var(--nav-backdrop-blur))',
} as React.CSSProperties;

const backdropHidden = {
  backgroundColor: BACKDROP_BG_CLEAR,
  '--nav-backdrop-blur': '0px',
} as TargetAndTransition;

const backdropVisible = {
  backgroundColor: BACKDROP_BG,
  '--nav-backdrop-blur': '4px',
} as TargetAndTransition;

function isRouteActive(pathname: string, route: RouteId): boolean {
  const suffix = pathWithoutLocale(pathname);
  const segment = ROUTE_SEGMENTS[route];
  return segment ? suffix === `/${segment}` : suffix === '/';
}

export type NavigationProps = {
  isVisible: boolean;
};

export const Navigation = ({ isVisible }: NavigationProps) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  // Measure the top bar only — expanding the menu must not thrash --header-height.
  useEffect(() => {
    const topBar = topBarRef.current;
    if (!topBar) return;

    const syncHeaderHeight = () => {
      document.documentElement.style.setProperty(
        '--header-height',
        `${topBar.getBoundingClientRect().height}px`,
      );
    };

    syncHeaderHeight();

    const observer = new ResizeObserver(syncHeaderHeight);
    observer.observe(topBar);

    return () => observer.disconnect();
  }, []);

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

  useEffect(() => {
    if (!menuOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [menuOpen]);

  const linkTabIndex = isVisible ? 0 : -1;
  const homeActive = isRouteActive(pathname, 'home');
  const panelTransition = prefersReducedMotion ? INSTANT : undefined;
  const iconTransition = prefersReducedMotion
    ? INSTANT
    : menuOpen
      ? { duration: 0.55, ease: EASE_OUT }
      : { duration: 0.42, ease: EASE_IN_OUT };

  return (
    <>
      <AnimatePresence>
        {menuOpen ? (
          <motion.button
            key="nav-backdrop"
            type="button"
            className="fixed inset-0 z-40 md:hidden"
            aria-label={t('navigation.closeMenu')}
            style={BACKDROP_STYLE}
            initial={backdropHidden}
            animate={{
              ...backdropVisible,
              transition: prefersReducedMotion
                ? INSTANT
                : BACKDROP_OPEN_TRANSITION,
            }}
            exit={{
              ...backdropHidden,
              transition: prefersReducedMotion
                ? INSTANT
                : BACKDROP_CLOSE_TRANSITION,
            }}
            onClick={() => setMenuOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      <motion.header
        ref={headerRef}
        className="fixed left-0 right-0 top-0 z-50 border-b border-moss-green bg-cream"
        initial={false}
        animate={{ y: isVisible ? 0 : '-100%' }}
        transition={
          prefersReducedMotion
            ? INSTANT
            : { duration: 0.45, ease: EASE_OUT }
        }
        aria-hidden={!isVisible}
        style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
      >
        <div
          ref={topBarRef}
          className="flex items-center justify-between gap-4 px-4 py-5 md:px-6 md:py-6"
        >
          <div className="flex min-w-0 flex-col gap-1 pt-2 sm:flex-row sm:items-center sm:gap-8">
            <LocaleLink
              route="home"
              className={[
                'group relative inline-block shrink-0 font-cursive font-normal text-caption tracking-caption no-underline',
                homeActive ? 'text-blood-orange' : 'text-moss-green',
              ].join(' ')}
              tabIndex={linkTabIndex}
              onClick={() => setMenuOpen(false)}
            >
              {t('navigation.home')}
              <DottedHoverUnderline
                color={homeActive ? 'text-blood-orange' : 'text-moss-green'}
              />
            </LocaleLink>
          </div>

          <nav
            className="hidden items-center gap-6 md:flex lg:gap-10"
            aria-label={t('navigation.label')}
          >
            {NAV_ROUTES.map(({ route, labelKey }) => {
              const active = isRouteActive(pathname, route);
              return (
                <LocaleLink
                  key={route}
                  route={route}
                  className={[
                    NAV_LINK_CLASS,
                    active ? 'text-blood-orange' : 'text-moss-green',
                  ].join(' ')}
                  tabIndex={linkTabIndex}
                  aria-current={active ? 'page' : undefined}
                >
                  {t(labelKey)}
                  <DottedHoverUnderline
                    color={active ? 'text-blood-orange' : 'text-moss-green'}
                  />
                </LocaleLink>
              );
            })}
            <span className="ml-2 flex items-center gap-6 lg:ml-4 lg:gap-10">
              <span className="h-4 w-4 shrink-0 lg:h-5 lg:w-5" aria-hidden>
                <AnimatedVector
                  Svg={Star2Svg}
                  className="h-full w-full"
                  svgClassName="block h-full w-full text-blood-orange"
                  animationOptions={STAR_STROKE}
                />
              </span>
              <LanguageSwitcher
                linkClassName="text-moss-green"
                tabIndex={linkTabIndex}
              />
            </span>
          </nav>

          <button
            type="button"
            className="relative flex h-10 w-10 shrink-0 items-center justify-center text-moss-green md:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={
              menuOpen ? t('navigation.closeMenu') : t('navigation.openMenu')
            }
            tabIndex={linkTabIndex}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              aria-hidden
              className="flex h-3.5 w-5 flex-col justify-between"
            >
              <motion.span
                className="block h-0.5 w-full origin-center bg-current"
                initial={false}
                animate={
                  menuOpen ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }
                }
                transition={iconTransition}
              />
              <motion.span
                className="block h-0.5 w-full bg-current"
                initial={false}
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={iconTransition}
              />
              <motion.span
                className="block h-0.5 w-full origin-center bg-current"
                initial={false}
                animate={
                  menuOpen ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }
                }
                transition={iconTransition}
              />
            </span>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {menuOpen ? (
            <motion.div
              key="mobile-menu"
              id={menuId}
              className="overflow-hidden md:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: 'auto',
                opacity: 1,
                transition: panelTransition ?? PANEL_OPEN_TRANSITION,
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: panelTransition ?? PANEL_CLOSE_TRANSITION,
              }}
            >
              <nav
                className="flex flex-col gap-5 px-4 py-6"
                aria-label={t('navigation.label')}
              >
                {NAV_ROUTES.map(({ route, labelKey }) => {
                  const active = isRouteActive(pathname, route);
                  return (
                    <LocaleLink
                      key={route}
                      route={route}
                      className={[
                        NAV_LINK_CLASS,
                        'self-start text-left',
                        active ? 'text-blood-orange' : 'text-moss-green',
                      ].join(' ')}
                      tabIndex={menuOpen && isVisible ? 0 : -1}
                      aria-current={active ? 'page' : undefined}
                      onClick={() => setMenuOpen(false)}
                    >
                      {t(labelKey)}
                      <DottedHoverUnderline
                        color={
                          active ? 'text-blood-orange' : 'text-moss-green'
                        }
                      />
                    </LocaleLink>
                  );
                })}
                <LanguageSwitcher
                  className="pt-5"
                  linkClassName="text-moss-green"
                  tabIndex={menuOpen && isVisible ? 0 : -1}
                />
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.header>
    </>
  );
};
