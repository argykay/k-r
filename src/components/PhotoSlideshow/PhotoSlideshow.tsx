import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import { ReactComponent as Frame2Svg } from '@assets/svgs/frame_2.svg';
import {
  WELCOME_PARTY_SLIDESHOW_INTERVAL_MS,
  WELCOME_PARTY_SLIDESHOW_SLIDES,
  type SlideshowSlide,
} from '@constants/welcomePartySlideshow';
import { AnimatedVector } from '../AnimatedVector/AnimatedVector';
import { MediaPlaybackToggle } from '../MediaPlaybackToggle/MediaPlaybackToggle';

const SLIDE_SIZES = '700px';

const MORPH_EASE = [0.4, 0, 0.2, 1] as const;
const MORPH_DURATION_S = 1;

const morphVariants = {
  initial: {
    opacity: 0,
    scale: 1.02,
    filter: 'blur(5px)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: {
    opacity: 0,
    scale: 1.01,
    filter: 'blur(4px)',
  },
};

export type PhotoSlideshowProps = {
  slides?: SlideshowSlide[];
  intervalMs?: number;
  alt: string;
  pauseLabel: string;
  playLabel: string;
  ariaLabel: string;
};

export const PhotoSlideshow = ({
  slides = WELCOME_PARTY_SLIDESHOW_SLIDES,
  intervalMs = WELCOME_PARTY_SLIDESHOW_INTERVAL_MS,
  alt,
  pauseLabel,
  playLabel,
  ariaLabel,
}: PhotoSlideshowProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slide = slides[currentIndex];

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsPaused(true);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (isPaused || prefersReducedMotion || slides.length < 2) {
      return undefined;
    }

    const id = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % slides.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [intervalMs, isPaused, prefersReducedMotion, slides.length]);

  useEffect(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    const nextSlide = slides[nextIndex];
    const img = new Image();
    img.sizes = SLIDE_SIZES;
    img.srcset = nextSlide.srcSet;
    img.src = nextSlide.src;
  }, [currentIndex, slides]);

  const togglePlayback = useCallback(() => {
    setIsPaused((paused) => !paused);
  }, []);

  if (!slide) {
    return null;
  }

  const instant = { duration: 0 };

  return (
    <div
      className="relative mx-auto w-full max-w-[700px]"
      aria-label={ariaLabel}
      aria-roledescription="carousel"
    >
      <div className="relative w-full" style={{ aspectRatio: '3 / 2' }}>
        <div className="absolute inset-0 overflow-hidden p-12 sm:p-14 md:p-16">
          <div className="relative h-full w-full overflow-hidden rounded bg-moss-green">
            <AnimatePresence initial={false}>
              <motion.div
                key={slide.id}
                className="absolute inset-0 overflow-hidden rounded-xl will-change-[transform,opacity,filter]"
                variants={morphVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={
                  prefersReducedMotion
                    ? instant
                    : { duration: MORPH_DURATION_S, ease: MORPH_EASE }
                }
              >
                <img
                  src={slide.src}
                  srcSet={slide.srcSet}
                  sizes={SLIDE_SIZES}
                  alt={alt}
                  width={700}
                  height={467}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <MediaPlaybackToggle
              isPaused={isPaused}
              onToggle={togglePlayback}
              pauseLabel={pauseLabel}
              playLabel={playLabel}
            />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-10">
          <div
            className="absolute left-1/2 top-1/2 text-moss-green"
            style={{
              width: '74%',
              height: '166%',
              transform: 'translate(-50%, -50%) rotate(90deg)',
              transformOrigin: 'center center',
            }}
          >
            <AnimatedVector
              Svg={Frame2Svg}
              className="pointer-events-none box-border h-full w-full max-h-full max-w-full p-1 text-moss-green sm:p-2"
              svgClassName="block h-full w-full text-moss-green"
              animationOptions={{
                intensity: 'strong',
                effect: 'stroke',
              }}
            />
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {currentIndex + 1} / {slides.length}
      </p>
    </div>
  );
};
