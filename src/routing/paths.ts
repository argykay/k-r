import { DEFAULT_LOCALE, type Locale } from '@i18n';

/** Path segments after the locale prefix (no leading slash). */
export const ROUTE_SEGMENTS = {
  home: '',
  faq: 'faq',
  details: 'details',
  rsvp: 'rsvp',
} as const;

export type RouteId = keyof typeof ROUTE_SEGMENTS;

/** Path-based URL: `/` = English home, `/el`, `/lv`, `/en` also works. */
export function localizedPath(
  locale: Locale,
  route: RouteId = 'home'
): string {
  const segment = ROUTE_SEGMENTS[route];
  const prefix =
    locale === DEFAULT_LOCALE && route === 'home' ? '' : `/${locale}`;

  return segment ? `${prefix}/${segment}` : prefix || '/';
}

/** Strip locale from pathname → route suffix (`/` = home). */
export function pathWithoutLocale(pathname: string): string {
  if (pathname === '/' || pathname === '') {
    return '/';
  }

  const match = pathname.match(/^\/(en|el|lv)(\/.*)?$/);
  if (!match) return '/';
  const rest = match[2] ?? '';
  return rest || '/';
}

export function localeFromPathname(pathname: string): Locale | null {
  if (pathname === '/' || pathname === '') {
    return DEFAULT_LOCALE;
  }

  const match = pathname.match(/^\/(en|el|lv)(\/|$)/);
  return match ? (match[1] as Locale) : null;
}

export function switchLocalePath(pathname: string, nextLocale: Locale): string {
  const suffix = pathWithoutLocale(pathname);
  if (suffix === '/') {
    return localizedPath(nextLocale, 'home');
  }

  const segment = suffix.replace(/^\//, '');
  const route = (Object.entries(ROUTE_SEGMENTS).find(
    ([, value]) => value === segment
  )?.[0] ?? 'home') as RouteId;

  return localizedPath(nextLocale, route);
}

export { DEFAULT_LOCALE };
