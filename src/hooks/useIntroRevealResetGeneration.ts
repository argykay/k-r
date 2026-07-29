import { useEffect, useRef, useState } from 'react';

/** Scroll position (px) treated as “at top” for intro replay. */
export const INTRO_RESET_TOP_THRESHOLD_PX = 8;

/**
 * Increments when the user scrolls back to the top after leaving it — used to
 * remount IntroReveal targets and replay their entrance animations.
 */
export const useIntroRevealResetGeneration = () => {
  const [generation, setGeneration] = useState(0);
  const wasAtTopRef = useRef(
    typeof window !== 'undefined' &&
      window.scrollY <= INTRO_RESET_TOP_THRESHOLD_PX
  );

  useEffect(() => {
    const onScroll = () => {
      const atTop = window.scrollY <= INTRO_RESET_TOP_THRESHOLD_PX;

      if (atTop && !wasAtTopRef.current) {
        setGeneration((current) => current + 1);
      }

      wasAtTopRef.current = atTop;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return generation;
};
