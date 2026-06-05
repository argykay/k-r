import React from 'react';
import { TwinkleOverlay } from '@components/TwinkleOverlay/TwinkleOverlay';

/** Center column — whimsical art, title, and accordion. */
const CONTENT_EXCLUSION = {
  xMin: 0.16,
  xMax: 0.84,
  yMin: 0.08,
  yMax: 0.96,
};

/** Hand-placed sparkles in the side and corner margins. */
const MARGIN_EXTRAS: ReadonlyArray<{
  assetIndex: number;
  normX: number;
  normY: number;
}> = [
  { assetIndex: 10, normX: 0.05, normY: 0.06 },
  { assetIndex: 5, normX: 0.94, normY: 0.08 },
  { assetIndex: 28, normX: 0.04, normY: 0.22 },
  { assetIndex: 27, normX: 0.96, normY: 0.2 },
  { assetIndex: 4, normX: 0.06, normY: 0.42 },
  { assetIndex: 25, normX: 0.95, normY: 0.44 },
  { assetIndex: 9, normX: 0.05, normY: 0.62 },
  { assetIndex: 14, normX: 0.94, normY: 0.64 },
  { assetIndex: 18, normX: 0.07, normY: 0.82 },
  { assetIndex: 22, normX: 0.93, normY: 0.86 },
];

export const FaqSparkles = () => (
  <TwinkleOverlay
    exclusionZones={[CONTENT_EXCLUSION]}
    extras={MARGIN_EXTRAS}
    extraIdPrefix="faq-sparkle-margin"
  />
);
