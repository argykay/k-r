import type { UseInViewOptions } from 'framer-motion';

/** Shared easing for section intro reveals (matches countdown). */
export const INTRO_EASE = [0.22, 1, 0.36, 1] as const;

export const INTRO_STAGGER_STEP = 0.12;

/** Section-level observer (optional — prefer per-element via IntroReveal). */
export const INTRO_VIEW_OPTIONS: UseInViewOptions = {
  once: true,
  amount: 0.45,
  margin: '0px 0px -8% 0px',
};

/** Default observer for a single IntroReveal target. */
export const INTRO_ELEMENT_VIEW_OPTIONS: UseInViewOptions = {
  once: true,
  amount: 0.35,
  margin: '0px 0px -6% 0px',
};
