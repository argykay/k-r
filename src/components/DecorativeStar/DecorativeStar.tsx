import React from 'react';
import { ReactComponent as Star1Svg } from '@assets/svgs/star_1.svg';
import { ReactComponent as Star2Svg } from '@assets/svgs/star_2.svg';
import { AnimatedVector } from '../AnimatedVector/AnimatedVector';
import type { AnimatedVectorOptions } from '../../utils/animatedVector';

const STAR_SVGS = [Star1Svg, Star2Svg] as const;

const STAR_ANIMATION: AnimatedVectorOptions = {
  intensity: 'medium',
  effect: 'stroke',
  filterDisplayWidthPx: 130,
};

export type DecorativeStarProps = {
  variant?: 0 | 1;
  starRef?: React.Ref<HTMLDivElement>;
  className?: string;
  backgroundClassName?: string;
  svgClassName?: string;
};

export const DecorativeStar = ({
  variant = 0,
  starRef,
  className = 'timeline-star-slot',
  backgroundClassName = 'bg-cream',
  svgClassName = 'block h-full w-full text-blood-orange',
}: DecorativeStarProps) => {
  const Star = STAR_SVGS[variant];

  return (
    <div
      ref={starRef}
      className={['relative z-10 shrink-0', backgroundClassName, className].join(' ')}
      aria-hidden
    >
      <AnimatedVector
        Svg={Star}
        className="h-full w-full"
        svgClassName={svgClassName}
        animationOptions={STAR_ANIMATION}
      />
    </div>
  );
};

export type StarListProps = {
  items: { key: string; label: string }[];
  starClassName?: string;
  itemClassName?: string;
};

export const StarList = ({
  items,
  starClassName = 'mt-1 h-5 w-5 md:h-6 md:w-6',
  itemClassName = 'text-style-paragraph-3 leading-relaxed min-w-0',
}: StarListProps) => (
  <ul className="flex flex-col gap-3">
    {items.map(({ key, label }, index) => (
      <li key={key} className="flex items-start gap-3">
        <DecorativeStar variant={index % 2 === 0 ? 0 : 1} className={starClassName} />
        <span className={itemClassName}>{label}</span>
      </li>
    ))}
  </ul>
);
