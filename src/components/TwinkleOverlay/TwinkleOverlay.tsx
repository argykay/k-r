import { motion, useReducedMotion } from 'framer-motion';
import React, { useMemo } from 'react';
import { TWINKLE_ASSETS, type TwinkleAsset } from '@assets/svgs/twinkles';

/** Reference viewport for normalizing sparkle sizes (layout only). */
const LAYOUT_VIEWPORT = { width: 390, height: 844 };

const MIN_SPARKLE_GAP_NORM = 0.012;
const EMPTY_ZONES: ExclusionRect[] = [];
const EMPTY_EXTRAS: TwinkleExtra[] = [];

export type ExclusionRect = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

export type TwinkleExtra = {
  assetIndex: number;
  normX: number;
  normY: number;
};

export type TwinkleOverlayProps = {
  /** Soft zones — sparkles are nudged away from these areas. */
  exclusionZones: ExclusionRect[];
  /** Hard zones — sparkles whose anchor or bounds fall here are dropped. */
  omitZones?: ExclusionRect[];
  extras?: ReadonlyArray<TwinkleExtra>;
  extraIdPrefix?: string;
  /** `fixed` anchors to the viewport so sparkles do not shift when page height changes. */
  position?: 'absolute' | 'fixed';
  /** When true, only {@link extras} are placed (skips the default twinkle manifest). */
  extrasOnly?: boolean;
  /** Minimum normalized distance between sparkles (higher = sparser). */
  minSparkleGapNorm?: number;
  className?: string;
};

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
  a: ExclusionRect,
  b: ExclusionRect
): boolean {
  return (
    a.xMin < b.xMax && a.xMax > b.xMin && a.yMin < b.yMax && a.yMax > b.yMin
  );
}

function sparkleBounds(x: number, y: number, sizePx: number): ExclusionRect {
  const radius = normRadius(sizePx);
  return {
    xMin: x - radius,
    xMax: x + radius,
    yMin: y - radius,
    yMax: y + radius,
  };
}

function isInZone(x: number, y: number, zone: ExclusionRect): boolean {
  return (
    x >= zone.xMin &&
    x <= zone.xMax &&
    y >= zone.yMin &&
    y <= zone.yMax
  );
}

function isInAnyZone(
  x: number,
  y: number,
  zones: ReadonlyArray<ExclusionRect>
): boolean {
  return zones.some((zone) => isInZone(x, y, zone));
}

function isInOmitZone(
  x: number,
  y: number,
  sizePx: number,
  zones: ReadonlyArray<ExclusionRect>
): boolean {
  const bounds = sparkleBounds(x, y, sizePx);
  return zones.some(
    (zone) => isInZone(x, y, zone) || rectsOverlap(bounds, zone)
  );
}

function resolvePosition(
  normX: number,
  normY: number,
  exclusionZones: ReadonlyArray<ExclusionRect>
) {
  let x = normX;
  let y = normY;

  if (isInAnyZone(x, y, exclusionZones)) {
    const dx = x - 0.5;
    const dy = y - 0.5;
    x = 0.5 + dx * 1.45;
    y = 0.5 + dy * 1.45;
  }

  const primary = exclusionZones[0];
  if (primary && isInAnyZone(x, y, exclusionZones)) {
    y = y < 0.5 ? primary.yMin - 0.05 : primary.yMax + 0.05;
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
  placed: ReadonlyArray<{ x: number; y: number; size: number }>,
  minGapNorm: number
): boolean {
  const radius = normRadius(sizePx);

  return placed.some((other) => {
    const dist = Math.hypot(x - other.x, y - other.y);
    return dist < radius + normRadius(other.size) + minGapNorm;
  });
}

function isValidPosition(
  x: number,
  y: number,
  sizePx: number,
  exclusionZones: ReadonlyArray<ExclusionRect>,
  omitZones: ReadonlyArray<ExclusionRect>,
  placed: ReadonlyArray<{ x: number; y: number; size: number }>,
  minGapNorm: number
): boolean {
  return (
    !isInAnyZone(x, y, exclusionZones) &&
    !isInOmitZone(x, y, sizePx, omitZones) &&
    !overlapsPlaced(x, y, sizePx, placed, minGapNorm)
  );
}

function findOpenPosition(
  normX: number,
  normY: number,
  sizePx: number,
  exclusionZones: ReadonlyArray<ExclusionRect>,
  omitZones: ReadonlyArray<ExclusionRect>,
  placed: ReadonlyArray<{ x: number; y: number; size: number }>,
  minGapNorm: number
): { x: number; y: number } | null {
  const initial = resolvePosition(normX, normY, exclusionZones);

  if (
    isValidPosition(
      initial.x,
      initial.y,
      sizePx,
      exclusionZones,
      omitZones,
      placed,
      minGapNorm
    )
  ) {
    return initial;
  }

  const step = 0.018;
  const angles = 16;

  for (let ring = 1; ring <= 24; ring += 1) {
    for (let i = 0; i < angles; i += 1) {
      const angle = (i / angles) * Math.PI * 2;
      const x = clampNorm(initial.x + Math.cos(angle) * step * ring);
      const y = clampNorm(initial.y + Math.sin(angle) * step * ring);

      if (
        isValidPosition(x, y, sizePx, exclusionZones, omitZones, placed, minGapNorm)
      ) {
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

type SparkleCandidate = {
  id: string;
  asset: TwinkleAsset;
  normX: number;
  normY: number;
  animationIndex: number;
};

function buildSparkleCandidates(
  extras: ReadonlyArray<TwinkleExtra>,
  extraIdPrefix: string,
  extrasOnly: boolean
): SparkleCandidate[] {
  const candidates: SparkleCandidate[] = extrasOnly
    ? []
    : TWINKLE_ASSETS.map((asset, index) => ({
        id: asset.id,
        asset,
        normX: asset.normX,
        normY: asset.normY,
        animationIndex: index,
      }));

  extras.forEach((extra, index) => {
    const asset = TWINKLE_ASSETS[extra.assetIndex];
    if (!asset) {
      return;
    }

    candidates.push({
      id: `${extraIdPrefix}-${String(index + 1).padStart(2, '0')}`,
      asset,
      normX: extra.normX,
      normY: extra.normY,
      animationIndex: TWINKLE_ASSETS.length + index,
    });
  });

  return candidates;
}

function buildPlacedTwinkles(
  exclusionZones: ReadonlyArray<ExclusionRect>,
  omitZones: ReadonlyArray<ExclusionRect>,
  extras: ReadonlyArray<TwinkleExtra>,
  extraIdPrefix: string,
  extrasOnly: boolean,
  minGapNorm: number
): PlacedTwinkle[] {
  const placed: Array<{ x: number; y: number; size: number }> = [];
  const result: PlacedTwinkle[] = [];

  buildSparkleCandidates(extras, extraIdPrefix, extrasOnly).forEach((candidate) => {
    const { id, asset, normX, normY, animationIndex } = candidate;
    const size = displaySize(asset.width, asset.height);

    if (isInOmitZone(normX, normY, size, omitZones)) {
      return;
    }

    const position = findOpenPosition(
      normX,
      normY,
      size,
      exclusionZones,
      omitZones,
      placed,
      minGapNorm
    );
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
        scale: 0.3,
        rotate: rotation,
      }}
      animate={
        animate
          ? {
              scale: [0.3, 1, 0.3],
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

export const TwinkleOverlay = ({
  exclusionZones,
  omitZones = EMPTY_ZONES,
  extras = EMPTY_EXTRAS,
  extraIdPrefix = 'twinkle-extra',
  position = 'absolute',
  extrasOnly = false,
  minSparkleGapNorm = MIN_SPARKLE_GAP_NORM,
  className = '',
}: TwinkleOverlayProps) => {
  const prefersReducedMotion = useReducedMotion();
  const animate = prefersReducedMotion !== true;
  const twinkles = useMemo(
    () =>
      buildPlacedTwinkles(
        exclusionZones,
        omitZones,
        extras,
        extraIdPrefix,
        extrasOnly,
        minSparkleGapNorm
      ),
    [
      exclusionZones,
      omitZones,
      extras,
      extraIdPrefix,
      extrasOnly,
      minSparkleGapNorm,
    ]
  );

  return (
    <div
      className={[
        'pointer-events-none inset-0 overflow-hidden',
        position === 'fixed' ? 'fixed' : 'absolute',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden
    >
      {twinkles.map((twinkle) => (
        <Sparkle key={twinkle.id} twinkle={twinkle} animate={animate} />
      ))}
    </div>
  );
};
