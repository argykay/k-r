import React from 'react';
import { TwinkleOverlay } from '@components/TwinkleOverlay/TwinkleOverlay';

/**
 * Content column on lg (`col-start-4` + `col-span-6` of 12).
 * Full viewport height — sparkles fill the side gutters only.
 */
const CONTENT_COLUMN = {
  xMin: 0.24,
  xMax: 0.76,
  yMin: 0,
  yMax: 1,
};

/** Sparse hand-placed sparkles along left and right margins, full height. */
const SIDE_EXTRAS: ReadonlyArray<{
  assetIndex: number;
  normX: number;
  normY: number;
}> = [
  { assetIndex: 3, normX: 0.1, normY: 0.12 },
  { assetIndex: 8, normX: 0.9, normY: 0.22 },
  { assetIndex: 14, normX: 0.12, normY: 0.34 },
  { assetIndex: 20, normX: 0.88, normY: 0.42 },
  { assetIndex: 11, normX: 0.09, normY: 0.54 },
  { assetIndex: 16, normX: 0.91, normY: 0.62 },
  { assetIndex: 6, normX: 0.11, normY: 0.74 },
  { assetIndex: 21, normX: 0.89, normY: 0.82 },
];

export const FaqSparkles = () => (
  <TwinkleOverlay
    className="hidden md:block"
    exclusionZones={[CONTENT_COLUMN]}
    omitZones={[CONTENT_COLUMN]}
    extras={SIDE_EXTRAS}
    extraIdPrefix="faq-sparkle-side"
    position="fixed"
    extrasOnly
    minSparkleGapNorm={0.028}
  />
);
