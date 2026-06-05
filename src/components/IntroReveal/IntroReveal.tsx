import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type UseInViewOptions,
} from 'framer-motion';
import React, { createContext, useContext, useRef } from 'react';
import { useSectionIntro } from '@hooks';
import {
  INTRO_EASE,
  INTRO_ELEMENT_VIEW_OPTIONS,
  INTRO_STAGGER_STEP,
} from '../../motion/introReveal';

export type IntroRevealVariant = 'fadeUp' | 'fadeScale';

const VARIANTS: Record<
  IntroRevealVariant,
  {
    hidden: { opacity: number; y?: number; scale?: number };
    visible: { opacity: number; y?: number; scale?: number };
  }
> = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  fadeScale: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
};

const motionTags = {
  div: motion.div,
  p: motion.p,
  h2: motion.h2,
  h3: motion.h3,
  span: motion.span,
} as const;

export type IntroRevealTag = keyof typeof motionTags;

const IntroRevealInViewContext = createContext(false);

/** Whether the nearest IntroReveal ancestor has entered the viewport. */
export const useIntroRevealInView = () => useContext(IntroRevealInViewContext);

export type IntroRevealProps = {
  children: React.ReactNode;
  className?: string;
  /**
   * Override viewport detection. By default each IntroReveal observes itself
   * with its own ref so slow scrolling still plays every animation.
   */
  isInView?: boolean;
  viewOptions?: UseInViewOptions;
  /** Stagger delay after this element enters view (× {@link INTRO_STAGGER_STEP}s). */
  staggerIndex?: number;
  delay?: number;
  variant?: IntroRevealVariant;
  duration?: number;
  as?: IntroRevealTag;
} & Pick<HTMLMotionProps<'div'>, 'aria-hidden' | 'aria-live' | 'id' | 'role'>;

export const IntroReveal = ({
  children,
  className,
  isInView: isInViewOverride,
  viewOptions,
  staggerIndex = 0,
  delay,
  variant = 'fadeUp',
  duration = 0.65,
  as = 'div',
  ...aria
}: IntroRevealProps) => {
  const ref = useRef(null);
  const observedInView = useSectionIntro(ref, {
    ...INTRO_ELEMENT_VIEW_OPTIONS,
    ...viewOptions,
  });
  const isInView = isInViewOverride ?? observedInView;
  const prefersReducedMotion = useReducedMotion();
  const { hidden: hiddenVariant, visible: visibleVariant } = VARIANTS[variant];
  const hidden = prefersReducedMotion ? false : hiddenVariant;
  const visible = visibleVariant;
  const resolvedDelay =
    delay !== undefined
      ? delay
      : isInView
        ? staggerIndex * INTRO_STAGGER_STEP
        : 0;
  const Component = motionTags[as];

  return (
    <IntroRevealInViewContext.Provider value={isInView}>
      <Component
        ref={ref}
        className={className}
        initial={hidden}
        animate={isInView ? visible : hidden}
        transition={{
          duration,
          ease: INTRO_EASE,
          delay: resolvedDelay,
        }}
        {...aria}
      >
        {children}
      </Component>
    </IntroRevealInViewContext.Provider>
  );
};
