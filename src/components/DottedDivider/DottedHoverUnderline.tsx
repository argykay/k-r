type DottedHoverUnderlineProps = {
  className?: string;
  /** Tailwind text color class applied via `currentColor` on the stroke. */
  color?: string;
  /** When true, the underline stays visible (not only on hover/focus). */
  forceVisible?: boolean;
};

/**
 * Animated dotted underline for hover/focus.
 * Place inside a `group relative` parent (typically a link).
 */
export const DottedHoverUnderline = ({
  className,
  color = 'text-current',
  forceVisible = false,
}: DottedHoverUnderlineProps) => (
  <svg
    className={[
      'pointer-events-none absolute left-0 top-full mt-0.5 h-[3px] w-full overflow-visible transition-opacity duration-200',
      forceVisible
        ? 'opacity-100'
        : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    height="3"
    width="100%"
    preserveAspectRatio="none"
    aria-hidden
  >
    <line
      x1="0"
      y1="1.5"
      x2="100%"
      y2="1.5"
      className={['dotted-divider-line animate-timeline-dash', color].join(' ')}
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);
