import React from 'react';

export type GridContainerProps = {
  children: React.ReactNode;
  /** Applied to the outer margin wrapper */
  className?: string;
  /** Applied to the inner column grid */
  gridClassName?: string;
};

/**
 * Page-level grid lives here, not on the page root, so siblings can be full-bleed.
 *
 * | Breakpoint | Columns | Gutters | Margins |
 * |------------|---------|---------|---------|
 * | default    | 4       | 8px     | 8px     |
 * | md         | 6       | 24px    | 24px    |
 * | lg         | 12      | 24px    | 24px    |
 *
 * Children span columns with `col-span-*` / `col-start-*` (e.g. `col-span-4 md:col-span-6`).
 */
export const GridContainer = ({
  children,
  className = '',
  gridClassName = '',
}: GridContainerProps) => {
  const marginClasses = 'w-full px-6';
  const gridClasses =
    'grid w-full grid-cols-4 gap-2 md:grid-cols-6 md:gap-6 lg:grid-cols-12 lg:gap-6';

  return (
    <div className={[marginClasses, className].filter(Boolean).join(' ')}>
      <div className={[gridClasses, gridClassName].filter(Boolean).join(' ')}>
        {children}
      </div>
    </div>
  );
}
