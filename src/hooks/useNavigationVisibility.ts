import { useEffect, useRef, useState } from 'react';

const SCROLL_THRESHOLD = 48;

/** Show nav while scrolling down; hide at top or when scrolling up. */
export function useNavigationVisibility(): boolean {
  const [visible, setVisible] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY <= SCROLL_THRESHOLD) {
        setVisible(false);
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
  }, []);

  return visible;
}
