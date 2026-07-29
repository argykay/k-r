import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { DecorativeStar } from '../DecorativeStar/DecorativeStar';

type PatternStar = {
  variant: 0 | 1;
  left: string;
  top: string;
  sizeClassName: string;
  mdOnly?: boolean;
  mobileOnly?: boolean;
};

type Visibility = 'all' | 'md' | 'mobile';

type StarCoord = {
  left: number;
  top: number;
  size: string;
  visibility: Visibility;
};

/**
 * Rectangular star frame — tidy rows with a slight alternating vertical offset.
 * Desktop adds a second inner frame closer to the content.
 */
const buildTidyStars = (): StarCoord[] => {
  const stars: StarCoord[] = [];
  const seen = new Set<string>();

  const push = (left: number, top: number, size: string, visibility: Visibility) => {
    const key = `${Math.round(left * 10) / 10}:${Math.round(top * 10) / 10}:${visibility}`;
    if (seen.has(key)) return;
    seen.add(key);
    stars.push({ left, top, size, visibility });
  };

  /** Horizontal row with alternating ±nudge for light variation. */
  const pushRow = (
    xs: number[],
    top: number,
    size: string,
    visibility: Visibility,
    nudge = 1.5,
  ) => {
    xs.forEach((x, i) => {
      const offset = i % 2 === 0 ? -nudge : nudge;
      push(x, top + offset, size, visibility);
    });
  };

  /** Vertical column with alternating ±nudge. */
  const pushColumn = (
    x: number,
    ys: number[],
    size: string,
    visibility: Visibility,
    nudge = 1.5,
  ) => {
    ys.forEach((y, i) => {
      const offset = i % 2 === 0 ? -nudge : nudge;
      push(x + offset, y, size, visibility);
    });
  };

  // Outer frame — mobile keeps 3 on top/bottom; desktop fills in the gaps
  pushRow([8, 50, 92], 7, 'h-7 w-7', 'all');
  pushRow([28, 72], 7, 'h-7 w-7', 'md');
  pushRow([8, 50, 92], 93, 'h-7 w-7', 'all');
  pushRow([28, 72], 93, 'h-7 w-7', 'md');
  pushColumn(8, [28, 50, 72], 'h-7 w-7', 'all');
  pushColumn(92, [28, 50, 72], 'h-7 w-7', 'all');

  // Mobile: extra top & bottom rows closer to content (thinner than desktop)
  pushRow([30, 70], 18, 'h-6 w-6', 'mobile');
  pushRow([30, 70], 82, 'h-6 w-6', 'mobile');

  // Desktop: inner frame nearer the content
  pushRow([20, 40, 60, 80], 16, 'h-7 w-7', 'md');
  pushRow([20, 40, 60, 80], 84, 'h-7 w-7', 'md');
  pushColumn(20, [32, 50, 68], 'h-7 w-7', 'md');
  pushColumn(80, [32, 50, 68], 'h-7 w-7', 'md');

  return stars;
};

const PATTERN_STARS: ReadonlyArray<PatternStar> = buildTidyStars().map(
  (star, index) => ({
    variant: (index % 2 === 0 ? 0 : 1) as 0 | 1,
    left: `${star.left}%`,
    top: `${star.top}%`,
    sizeClassName: star.size,
    mdOnly: star.visibility === 'md',
    mobileOnly: star.visibility === 'mobile',
  }),
);

const STAR_FADE_DURATION_S = 0.45;
const STAR_STAGGER_S = 0.07;

/** Stable shuffled reveal order for this page load. */
const shuffleOrder = (length: number): number[] => {
  const order = Array.from({ length }, (_, i) => i);
  for (let i = length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = order[i];
    order[i] = order[j];
    order[j] = tmp;
  }
  return order;
};

export const StarField = () => {
  const prefersReducedMotion = useReducedMotion();
  const delayByIndex = useMemo(() => {
    const order = shuffleOrder(PATTERN_STARS.length);
    const delays = new Array<number>(PATTERN_STARS.length);
    order.forEach((starIndex, step) => {
      delays[starIndex] = step * STAR_STAGGER_S;
    });
    return delays;
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {PATTERN_STARS.map((star, index) => (
        <motion.div
          key={`pattern-star-${index}`}
          className={[
            'absolute -translate-x-1/2 -translate-y-1/2',
            star.mdOnly ? 'hidden md:block' : undefined,
            star.mobileOnly ? 'md:hidden' : undefined,
          ]
            .filter(Boolean)
            .join(' ')}
          style={{ left: star.left, top: star.top }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: STAR_FADE_DURATION_S,
                  delay: delayByIndex[index],
                  ease: 'easeOut',
                }
          }
        >
          <DecorativeStar
            variant={star.variant}
            className={star.sizeClassName}
            backgroundClassName=""
            svgClassName="block h-full w-full text-cream"
          />
        </motion.div>
      ))}
    </div>
  );
};
