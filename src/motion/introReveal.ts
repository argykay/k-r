import type { UseInViewOptions } from 'framer-motion';

/** Shared easing for section intro reveals (matches countdown). */
export const INTRO_EASE = [0.22, 1, 0.36, 1] as const;

export const INTRO_STAGGER_STEP = 0.12;

/**
 * How far past the viewport bottom the top of a target must travel before
 * reveal. Fixed px (not %) so tall sections don’t wait for a height fraction.
 */
const INTRO_ENTER_OFFSET_PX = 72;

/** Section-level observer (optional — prefer per-element via IntroReveal). */
export const INTRO_VIEW_OPTIONS: UseInViewOptions = {
  once: true,
  amount: 'some',
  margin: `0px 0px -${INTRO_ENTER_OFFSET_PX}px 0px`,
};

/** Default observer for a single IntroReveal target. */
export const INTRO_ELEMENT_VIEW_OPTIONS: UseInViewOptions = {
  once: true,
  amount: 'some',
  margin: `0px 0px -${INTRO_ENTER_OFFSET_PX}px 0px`,
};
