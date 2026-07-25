type DottedDividerProps = {
  className?: string;
  /** Tailwind text color class applied via `currentColor` on the stroke. */
  color?: string;
};

export const DottedDivider = ({
  className,
  color = 'text-cream',
}: DottedDividerProps) => (
  <svg
    className={['h-2 w-full overflow-visible', className].filter(Boolean).join(' ')}
    height="2"
    width="100%"
    preserveAspectRatio="none"
    aria-hidden
  >
    <line
      x1="0"
      y1="1"
      x2="100%"
      y2="1"
      className={['dotted-divider-line animate-timeline-dash', color].join(' ')}
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);
