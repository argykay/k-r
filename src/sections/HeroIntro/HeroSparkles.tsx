import { motion, useReducedMotion } from 'framer-motion';
import React, { useMemo } from 'react';
import { TWINKLE_ASSETS, type TwinkleAsset } from '@assets/svgs/twinkles';

/** Reference viewport for normalizing sparkle sizes (layout only). */
const LAYOUT_VIEWPORT = { width: 390, height: 844 };

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

const MIN_SPARKLE_GAP_NORM = 0.012;

function clampNorm(value: number): number {
  return Math.min(0.97, Math.max(0.03, value));
}

function normRadius(sizePx: number, scale = 1.1): number {
  const radius = (sizePx * scale) / 2;
  return Math.max(
    radius / LAYOUT_VIEWPORT.width,
    radius / LAYOUT_VIEWPORT.height
  );
}

function rectsOverlap(
  a: { xMin: number; xMax: number; yMin: number; yMax: number },
  b: { xMin: number; xMax: number; yMin: number; yMax: number }
): boolean {
  return (
    a.xMin < b.xMax && a.xMax > b.xMin && a.yMin < b.yMax && a.yMax > b.yMin
  );
}

function sparkleBounds(x: number, y: number, sizePx: number) {
  const radius = normRadius(sizePx);
  return {
    xMin: x - radius,
    xMax: x + radius,
    yMin: y - radius,
    yMax: y + radius,
  };
}

function isInTextZone(x: number, y: number): boolean {
  return (
    x >= TEXT_EXCLUSION.xMin &&
    x <= TEXT_EXCLUSION.xMax &&
    y >= TEXT_EXCLUSION.yMin &&
    y <= TEXT_EXCLUSION.yMax
  );
}

function isInButtonZone(x: number, y: number, sizePx: number): boolean {
  const centerInButtonCorner =
    x >= BUTTON_CENTER_EXCLUSION.xMin &&
    x <= BUTTON_CENTER_EXCLUSION.xMax &&
    y >= BUTTON_CENTER_EXCLUSION.yMin &&
    y <= BUTTON_CENTER_EXCLUSION.yMax;

  return (
    centerInButtonCorner ||
    rectsOverlap(sparkleBounds(x, y, sizePx), BUTTON_BOUNDS_EXCLUSION)
  );
}

function isExcluded(x: number, y: number): boolean {
  return isInTextZone(x, y);
}

function resolvePosition(normX: number, normY: number) {
  let x = normX;
  let y = normY;

  if (isExcluded(x, y)) {
    const dx = x - 0.5;
    const dy = y - 0.5;
    x = 0.5 + dx * 1.45;
    y = 0.5 + dy * 1.45;
  }

  if (isInTextZone(x, y)) {
    y = y < 0.5 ? TEXT_EXCLUSION.yMin - 0.05 : TEXT_EXCLUSION.yMax + 0.05;
  }

  return {
    x: clampNorm(x),
    y: clampNorm(y),
  };
}

function overlapsPlaced(
  x: number,
  y: number,
  sizePx: number,
  placed: ReadonlyArray<{ x: number; y: number; size: number }>
): boolean {
  const radius = normRadius(sizePx);

  return placed.some((other) => {
    const dist = Math.hypot(x - other.x, y - other.y);
    return dist < radius + normRadius(other.size) + MIN_SPARKLE_GAP_NORM;
  });
}

function isValidPosition(
  x: number,
  y: number,
  sizePx: number,
  placed: ReadonlyArray<{ x: number; y: number; size: number }>
): boolean {
  return (
    !isInTextZone(x, y) &&
    !isInButtonZone(x, y, sizePx) &&
    !overlapsPlaced(x, y, sizePx, placed)
  );
}

function findOpenPosition(
  normX: number,
  normY: number,
  sizePx: number,
  placed: ReadonlyArray<{ x: number; y: number; size: number }>
): { x: number; y: number } | null {
  const initial = resolvePosition(normX, normY);

  if (isValidPosition(initial.x, initial.y, sizePx, placed)) {
    return initial;
  }

  const step = 0.018;
  const angles = 16;

  for (let ring = 1; ring <= 24; ring += 1) {
    for (let i = 0; i < angles; i += 1) {
      const angle = (i / angles) * Math.PI * 2;
      const x = clampNorm(initial.x + Math.cos(angle) * step * ring);
      const y = clampNorm(initial.y + Math.sin(angle) * step * ring);

      if (isValidPosition(x, y, sizePx, placed)) {
        return { x, y };
      }
    }
  }

  return null;
}

function displaySize(width: number, height: number) {
  const maxDim = Math.max(width, height);

  if (maxDim >= 100) return 36;
  if (maxDim >= 60) return 26;
  if (maxDim >= 28) return 16;
  return 10;
}

type PlacedTwinkle = TwinkleAsset & {
  id: string;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
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

type SparkleCandidate = {
  id: string;
  asset: TwinkleAsset;
  normX: number;
  normY: number;
  animationIndex: number;
};

function buildSparkleCandidates(): SparkleCandidate[] {
  const candidates: SparkleCandidate[] = TWINKLE_ASSETS.map((asset, index) => ({
    id: asset.id,
    asset,
    normX: asset.normX,
    normY: asset.normY,
    animationIndex: index,
  }));

  TOP_LEFT_EXTRAS.forEach((extra, index) => {
    const asset = TWINKLE_ASSETS[extra.assetIndex];
    if (!asset) {
      return;
    }

    candidates.push({
      id: `hero-sparkle-top-left-${String(index + 1).padStart(2, '0')}`,
      asset,
      normX: extra.normX,
      normY: extra.normY,
      animationIndex: TWINKLE_ASSETS.length + index,
    });
  });

  return candidates;
}

function buildPlacedTwinkles(): PlacedTwinkle[] {
  const placed: Array<{ x: number; y: number; size: number }> = [];
  const result: PlacedTwinkle[] = [];

  buildSparkleCandidates().forEach((candidate) => {
    const { id, asset, normX, normY, animationIndex } = candidate;
    const size = displaySize(asset.width, asset.height);

    if (isInButtonZone(normX, normY, size)) {
      return;
    }

    const position = findOpenPosition(normX, normY, size, placed);
    if (!position) {
      return;
    }

    placed.push({ ...position, size });
    result.push({
      ...asset,
      id,
      x: position.x,
      y: position.y,
      size,
      delay: (animationIndex * 0.19) % 3.8,
      duration: 2.1 + (animationIndex % 7) * 0.35,
      rotation: ((animationIndex * 37) % 50) - 25,
    });
  });

  return result;
}

type SparkleProps = {
  twinkle: PlacedTwinkle;
  animate: boolean;
};

const Sparkle = ({ twinkle, animate }: SparkleProps) => {
  const { Svg, x, y, size, delay, duration, rotation } = twinkle;

  return (
    <motion.div
      className="pointer-events-none absolute text-cream"
      style={{
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        width: size,
        height: size,
        x: '-50%',
        y: '-50%',
      }}
      initial={{
        opacity: 1,
        scale: 0.5,
        rotate: rotation,
      }}
      animate={
        animate
          ? {
              scale: [0.5, 1.1, 0.5],
              rotate: [rotation - 8, rotation + 8, rotation - 8],
            }
          : { scale: 1, rotate: rotation }
      }
      transition={
        animate
          ? {
              duration,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          : undefined
      }
    >
      <Svg className="block h-full w-full" aria-hidden />
    </motion.div>
  );
};

export const HeroSparkles = () => {
  const prefersReducedMotion = useReducedMotion();
  const animate = prefersReducedMotion !== true;
  const twinkles = useMemo(() => buildPlacedTwinkles(), []);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {twinkles.map((twinkle) => (
        <Sparkle key={twinkle.id} twinkle={twinkle} animate={animate} />
      ))}
    </div>
  );
};
