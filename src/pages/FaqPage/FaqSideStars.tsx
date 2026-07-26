import React from 'react';
import { DecorativeStar } from '@components';

/**
 * Hand-placed stars scattered across the left and right gutters (desktop only).
 * Positions are viewport-normalized so they stay put when the accordion expands.
 */
const SIDE_STARS: ReadonlyArray<{
  variant: 0 | 1;
  left: string;
  top: string;
  sizeClassName: string;
}> = [
  // Left gutter
  { variant: 0, left: '3%', top: '10%', sizeClassName: 'h-5 w-5' },
  { variant: 1, left: '14%', top: '15%', sizeClassName: 'h-8 w-8' },
  { variant: 0, left: '7%', top: '28%', sizeClassName: 'h-6 w-6' },
  { variant: 1, left: '16%', top: '38%', sizeClassName: 'h-8 w-8' },
  { variant: 0, left: '4%', top: '48%', sizeClassName: 'h-5 w-5' },
  { variant: 1, left: '12%', top: '58%', sizeClassName: 'h-8 w-8' },
  { variant: 0, left: '6%', top: '70%', sizeClassName: 'h-6 w-6' },
  { variant: 1, left: '15%', top: '82%', sizeClassName: 'h-5 w-5' },
  { variant: 0, left: '5%', top: '92%', sizeClassName: 'h-8 w-8' },
  // Right gutter
  { variant: 1, left: '94%', top: '11%', sizeClassName: 'h-8 w-8' },
  { variant: 0, left: '82%', top: '18%', sizeClassName: 'h-5 w-5' },
  { variant: 1, left: '90%', top: '30%', sizeClassName: 'h-8 w-8' },
  { variant: 0, left: '84%', top: '42%', sizeClassName: 'h-6 w-6' },
  { variant: 1, left: '93%', top: '52%', sizeClassName: 'h-5 w-5' },
  { variant: 0, left: '81%', top: '62%', sizeClassName: 'h-8 w-8' },
  { variant: 1, left: '91%', top: '74%', sizeClassName: 'h-8 w-8' },
  { variant: 0, left: '85%', top: '84%', sizeClassName: 'h-6 w-6' },
  { variant: 1, left: '95%', top: '93%', sizeClassName: 'h-5 w-5' },
];

export const FaqSideStars = () => (
  <div
    className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden md:block"
    aria-hidden
  >
    {SIDE_STARS.map((star, index) => (
      <div
        key={`faq-star-${index}`}
        className="absolute"
        style={{ left: star.left, top: star.top }}
      >
        <DecorativeStar
          variant={star.variant}
          className={star.sizeClassName}
          backgroundClassName=""
          svgClassName="block h-full w-full text-cream"
        />
      </div>
    ))}
  </div>
);
