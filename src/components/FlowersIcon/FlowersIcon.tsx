import React, { useLayoutEffect, useState } from 'react';
import { ReactComponent as FlowersSvg } from '@assets/svgs/flowers.svg';
import { useAnimatedVector } from '../../utils/animatedVector';
import type { AnimatedVectorOptions } from '../../utils/animatedVector';

/** Default icon width — edit here to change size site-wide. */
export const FLOWERS_ICON_SIZES = {
  width: 140,
  widthMd: 280,
  mdBreakpointPx: 768,
} as const;

export type FlowersIconProps = {
  /**
   * Width of the icon.
   * Omit to use {@link FLOWERS_ICON_SIZES}.
   * Or pass pixels: `100`, `"120px"`, or Tailwind classes: `"w-24 md:w-32"`.
   */
  size?: string | number;
  /** Extra classes on the wrapper (margins, alignment, etc.) */
  className?: string;
  /** Color via `currentColor` on the SVG, e.g. `text-white` */
  colorClassName?: string;
  /** Hand-drawn edge animation (respects reduced motion). */
  animated?: boolean;
  /** Passed through when `animated` is true. */
  animationOptions?: AnimatedVectorOptions;
};

const useMinWidth = (minWidthPx: number): boolean => {
  const query = `(min-width: ${minWidthPx}px)`;
  const [matches, setMatches] = useState(
    () =>
      typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  useLayoutEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);

  return matches;
};

const parseWidth = (
  size: string | number
): { widthClasses: string; widthStyle?: React.CSSProperties } => {
  if (typeof size === 'number') {
    return { widthClasses: '', widthStyle: { width: size } };
  }
  const pxMatch = size.trim().match(/^(\d+(?:\.\d+)?)(px)?$/);
  if (pxMatch) {
    return { widthClasses: '', widthStyle: { width: Number(pxMatch[1]) } };
  }
  return { widthClasses: size };
};

export const FlowersIcon = ({
  size,
  className = '',
  colorClassName = 'text-white',
  animated = true,
  animationOptions,
}: FlowersIconProps) => {
  const isMdUp = useMinWidth(FLOWERS_ICON_SIZES.mdBreakpointPx);

  const { widthClasses, widthStyle } =
    size !== undefined
      ? parseWidth(size)
      : {
          widthClasses: '',
          widthStyle: {
            width: isMdUp
              ? FLOWERS_ICON_SIZES.widthMd
              : FLOWERS_ICON_SIZES.width,
          },
        };

  const containerRef = useAnimatedVector({
    effect: 'stroke',
    ...animationOptions,
    enabled: animated && animationOptions?.enabled !== false,
  });

  return (
    <div
      ref={containerRef}
      className={['shrink-0', widthClasses, className].filter(Boolean).join(' ')}
      style={widthStyle}
    >
      <FlowersSvg
        aria-hidden
        className={`block h-auto w-full ${colorClassName}`.trim()}
      />
    </div>
  );
};
