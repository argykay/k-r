import { useInView, type UseInViewOptions } from 'framer-motion';
import type { RefObject } from 'react';
import { INTRO_VIEW_OPTIONS } from '../motion/introReveal';

/**
 * Fires once when a section enters the viewport — used for first-visit intro
 * stagger animations (Welcome, countdown, etc.).
 */
export const useSectionIntro = (
  ref: RefObject<Element | null>,
  options?: UseInViewOptions
) => useInView(ref, { ...INTRO_VIEW_OPTIONS, ...options });
