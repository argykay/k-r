import React from 'react';
import { TwinkleOverlay } from '@components/TwinkleOverlay/TwinkleOverlay';

/** Keep sparkles off centered hero copy and subtitle flourish. */
const TEXT_EXCLUSION = { xMin: 0.2, xMax: 0.8, yMin: 0.36, yMax: 0.7 };

/**
 * Bottom-right play/pause control plus surrounding clearance.
 * Drops sparkles in this corner instead of relocating them.
 */
const BUTTON_CENTER_EXCLUSION = {
  xMin: 0.78,
  yMin: 0.72,
  xMax: 1,
  yMax: 1,
};

const BUTTON_BOUNDS_EXCLUSION = {
  xMin: 0.82,
  yMin: 0.86,
  xMax: 1,
  yMax: 1,
};

/** Extra sparkles hand-placed in the top-left corner (asset index + target position). */
const TOP_LEFT_EXTRAS: ReadonlyArray<{
  assetIndex: number;
  normX: number;
  normY: number;
}> = [
  { assetIndex: 10, normX: 0.08, normY: 0.06 },
  { assetIndex: 5, normX: 0.17, normY: 0.1 },
  { assetIndex: 28, normX: 0.05, normY: 0.19 },
  { assetIndex: 27, normX: 0.13, normY: 0.22 },
  { assetIndex: 4, normX: 0.21, normY: 0.05 },
  { assetIndex: 25, normX: 0.1, normY: 0.28 },
  { assetIndex: 9, normX: 0.19, normY: 0.26 },
];

export const HeroSparkles = () => (
  <TwinkleOverlay
    exclusionZones={[TEXT_EXCLUSION]}
    omitZones={[BUTTON_CENTER_EXCLUSION, BUTTON_BOUNDS_EXCLUSION]}
    extras={TOP_LEFT_EXTRAS}
    extraIdPrefix="hero-sparkle-top-left"
  />
);
