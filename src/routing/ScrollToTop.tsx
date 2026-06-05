import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Reset scroll position when navigating between pages. */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
