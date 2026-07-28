import { useEffect, useRef, useState } from 'react';

const SCROLL_THRESHOLD = 48;

export type NavigationVisibilityOptions = {
  /** When true, nav stays visible at the top of the page (non-home pages). */
  visibleAtTop?: boolean;
};

/** Show nav while scrolling down; hide while scrolling up. Home also hides at top. */
export function useNavigationVisibility(
  options: NavigationVisibilityOptions = {},
): boolean {
  const { visibleAtTop = false } = options;
  const [visible, setVisible] = useState(visibleAtTop);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY <= SCROLL_THRESHOLD) {
        setVisible(visibleAtTop);
      } else if (scrollY > lastScrollY.current) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      lastScrollY.current = scrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleAtTop]);

  return visible;
}
