import React from 'react';
import { useAnimatedVector } from '../../utils/animatedVector';
import type { AnimatedVectorOptions } from '../../utils/animatedVector';

export type AnimatedVectorProps = {
  Svg: React.FC<React.SVGProps<SVGSVGElement>>;
  className?: string;
  svgClassName?: string;
  animated?: boolean;
  animationOptions?: AnimatedVectorOptions;
};

/** Wraps any SVGR icon with optional hand-drawn or drift animation. */
export const AnimatedVector = ({
  Svg,
  className = '',
  svgClassName = '',
  animated = true,
  animationOptions,
}: AnimatedVectorProps) => {
  const containerRef = useAnimatedVector({
    ...animationOptions,
    enabled: animated && animationOptions?.enabled !== false,
  });

  return (
    <div ref={containerRef} className={className}>
      <Svg aria-hidden className={svgClassName} />
    </div>
  );
};
