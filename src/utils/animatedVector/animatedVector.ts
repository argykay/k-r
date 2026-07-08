import type {
  AnimatedVectorIntensity,
  AnimatedVectorOptions,
} from './types';

const SVG_NS = 'http://www.w3.org/2000/svg';

let handDrawnFilterCounter = 0;

export const DEFAULT_ANIMATED_VECTOR_SELECTORS =
  'path, line, polyline, polygon, circle, ellipse';

/** Deterministic 0–1 value from path index (stable across renders). */
export const animatedVectorSeed = (index: number, salt: number): number => {
  const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type HandDrawnFilterConfig = {
  baseFrequency: string;
  scaleMin: number;
  scaleMax: number;
  seedMin: number;
  seedMax: number;
  /** Radians; offsets seed vs scale so they do not pause together. */
  seedPhaseOffset: number;
  cycleDurationSec: number;
};

const HAND_DRAWN_FILTER_CONFIG: Record<
  AnimatedVectorIntensity,
  HandDrawnFilterConfig
> = {
  subtle: {
    baseFrequency: '0.032 0.036',
    scaleMin: 1.5,
    scaleMax: 2.7,
    seedMin: 0,
    seedMax: 28,
    seedPhaseOffset: Math.PI * 0.4,
    cycleDurationSec: 18,
  },
  medium: {
    baseFrequency: '0.038 0.042',
    scaleMin: 1.6,
    scaleMax: 3.4,
    seedMin: 0,
    seedMax: 24,
    seedPhaseOffset: Math.PI * 0.35,
    cycleDurationSec: 14,
  },
  strong: {
    baseFrequency: '0.024 0.028',
    scaleMin: 4.8,
    scaleMax: 10,
    seedMin: 0,
    seedMax: 32,
    seedPhaseOffset: Math.PI * 0.28,
    cycleDurationSec: 22,
  },
};

const DISPLAY_MULTIPLIER_FLOOR: Record<AnimatedVectorIntensity, number> = {
  subtle: 0.22,
  medium: 0.22,
  strong: 0.68,
};

type HandDrawnRuntime = {
  frameId: number;
  start: number;
  turbulence: SVGFETurbulenceElement;
  displacement: SVGFEDisplacementMapElement;
  filter: SVGFilterElement;
  config: HandDrawnFilterConfig;
};

const handDrawnRuntimeBySvg = new WeakMap<SVGSVGElement, HandDrawnRuntime>();

/** Hand-drawn filter is calibrated near this on-screen width (px). */
const REFERENCE_DISPLAY_PX = 200;

type HandDrawnDisplayTuning = {
  config: HandDrawnFilterConfig;
  numOctaves: number;
  preBlurStdDev: number;
};

/**
 * Scales turbulence/displacement down as artwork grows so edges stay smooth,
 * not grainy (large SVGs were using full medium intensity before).
 */
const tuneHandDrawnConfigForDisplaySize = (
  config: HandDrawnFilterConfig,
  displayWidthPx: number,
  intensity: AnimatedVectorIntensity
): HandDrawnDisplayTuning => {
  const width = Math.max(1, displayWidthPx);
  const sizeRatio = REFERENCE_DISPLAY_PX / width;
  const multiplier = Math.max(
    DISPLAY_MULTIPLIER_FLOOR[intensity],
    Math.min(1, sizeRatio ** 0.9)
  );

  const [bfX, bfY] = config.baseFrequency.split(/\s+/).map(Number);

  return {
    config: {
      ...config,
      baseFrequency: `${(bfX * multiplier).toFixed(4)} ${(bfY * multiplier).toFixed(4)}`,
      scaleMin: config.scaleMin * multiplier,
      scaleMax:
        config.scaleMin + (config.scaleMax - config.scaleMin) * multiplier,
      seedMax:
        config.seedMin +
        (config.seedMax - config.seedMin) * (0.45 + 0.55 * multiplier),
    },
    numOctaves: 1,
    preBlurStdDev: width >= 240 ? Math.min(0.45, 120 / width) : 0,
  };
};

const stopHandDrawnRuntime = (svg: SVGSVGElement): void => {
  const runtime = handDrawnRuntimeBySvg.get(svg);
  if (!runtime) {
    return;
  }
  cancelAnimationFrame(runtime.frameId);
  runtime.filter.remove();
  handDrawnRuntimeBySvg.delete(svg);
};

/** 0–1 cycle position → -1..1 with constant velocity between turnarounds. */
const triangleWave = (cycleProgress: number): number => {
  const p = cycleProgress - Math.floor(cycleProgress);
  return p < 0.5 ? 4 * p - 1 : 3 - 4 * p;
};

const startHandDrawnLoop = (svg: SVGSVGElement, runtime: HandDrawnRuntime): void => {
  const { config, displacement, turbulence } = runtime;
  const periodMs = config.cycleDurationSec * 1000;
  const scaleMid = (config.scaleMin + config.scaleMax) / 2;
  const scaleAmp = (config.scaleMax - config.scaleMin) / 2;
  const seedMid = (config.seedMin + config.seedMax) / 2;
  const seedAmp = (config.seedMax - config.seedMin) / 2;
  const seedCycleOffset = config.seedPhaseOffset / (Math.PI * 2);

  const tick = (now: number) => {
    if (!handDrawnRuntimeBySvg.has(svg)) {
      return;
    }

    const cycleProgress = ((now - runtime.start) % periodMs) / periodMs;
    const scale = scaleMid + scaleAmp * triangleWave(cycleProgress);
    const seed = seedMid + seedAmp * triangleWave(cycleProgress + seedCycleOffset);

    displacement.setAttribute('scale', scale.toFixed(2));
    turbulence.setAttribute('seed', String(Math.round(seed)));

    runtime.frameId = requestAnimationFrame(tick);
  };

  runtime.frameId = requestAnimationFrame(tick);
};

/**
 * Hand-drawn edge shimmer: triangle-wave loop for steady, visible motion.
 */
const attachHandDrawnAnimation = (
  svg: SVGSVGElement,
  intensity: AnimatedVectorIntensity,
  filterDisplayWidthPx?: number
): (() => void) => {
  stopHandDrawnRuntime(svg);

  const displayWidth =
    filterDisplayWidthPx ?? svg.getBoundingClientRect().width;
  const { config, numOctaves, preBlurStdDev } = tuneHandDrawnConfigForDisplaySize(
    HAND_DRAWN_FILTER_CONFIG[intensity],
    displayWidth,
    intensity
  );
  const filterId = `av-hand-drawn-${handDrawnFilterCounter++}`;

  svg.style.shapeRendering = 'geometricPrecision';
  Array.from(svg.querySelectorAll<SVGGeometryElement>(DEFAULT_ANIMATED_VECTOR_SELECTORS)).forEach(
    (element) => {
      element.style.shapeRendering = 'geometricPrecision';
    }
  );

  let defs = svg.querySelector('defs');
  if (!defs) {
    defs = document.createElementNS(SVG_NS, 'defs');
    svg.insertBefore(defs, svg.firstChild);
  }

  const filter = document.createElementNS(SVG_NS, 'filter');
  filter.setAttribute('id', filterId);
  filter.setAttribute('x', '-6%');
  filter.setAttribute('y', '-6%');
  filter.setAttribute('width', '112%');
  filter.setAttribute('height', '112%');
  filter.setAttribute('color-interpolation-filters', 'sRGB');

  const turbulence = document.createElementNS(SVG_NS, 'feTurbulence');
  turbulence.setAttribute('type', 'fractalNoise');
  turbulence.setAttribute('baseFrequency', config.baseFrequency);
  turbulence.setAttribute('numOctaves', String(numOctaves));
  turbulence.setAttribute('stitchTiles', 'stitch');
  turbulence.setAttribute('result', 'noise');
  turbulence.setAttribute('seed', String(config.seedMin));

  const displacement = document.createElementNS(SVG_NS, 'feDisplacementMap');
  displacement.setAttribute('in2', 'noise');
  displacement.setAttribute('scale', String(config.scaleMin));
  displacement.setAttribute('xChannelSelector', 'R');
  displacement.setAttribute('yChannelSelector', 'G');

  if (preBlurStdDev > 0) {
    const preBlur = document.createElementNS(SVG_NS, 'feGaussianBlur');
    preBlur.setAttribute('in', 'SourceGraphic');
    preBlur.setAttribute('stdDeviation', preBlurStdDev.toFixed(2));
    preBlur.setAttribute('result', 'smoothedSource');
    filter.appendChild(preBlur);
    displacement.setAttribute('in', 'smoothedSource');
  } else {
    displacement.setAttribute('in', 'SourceGraphic');
  }

  filter.appendChild(turbulence);
  filter.appendChild(displacement);
  defs.appendChild(filter);

  const previousFilter = svg.getAttribute('filter');
  svg.setAttribute('filter', `url(#${filterId})`);

  const runtime: HandDrawnRuntime = {
    frameId: 0,
    start: performance.now(),
    turbulence,
    displacement,
    filter,
    config,
  };

  handDrawnRuntimeBySvg.set(svg, runtime);
  startHandDrawnLoop(svg, runtime);

  return () => {
    stopHandDrawnRuntime(svg);
    svg.style.shapeRendering = '';
    Array.from(svg.querySelectorAll<SVGGeometryElement>(DEFAULT_ANIMATED_VECTOR_SELECTORS)).forEach(
      (element) => {
        element.style.shapeRendering = '';
      }
    );
    if (previousFilter) {
      svg.setAttribute('filter', previousFilter);
    } else {
      svg.removeAttribute('filter');
    }
  };
};

/** Map on-screen px drift to SVG user units (viewBox space). */
const getViewBoxUnitScale = (
  svg: SVGSVGElement,
  root: ParentNode
): number => {
  const viewBoxWidth = svg.viewBox.baseVal.width;
  if (!viewBoxWidth) {
    return 1;
  }

  const svgWidth = svg.getBoundingClientRect().width;
  const rootWidth =
    root instanceof HTMLElement ? root.getBoundingClientRect().width : 0;
  const displayWidth = svgWidth || rootWidth;

  if (!displayWidth) {
    return 1;
  }

  return viewBoxWidth / displayWidth;
};

type PathDriftConfig = {
  durationMs: number;
  phaseX: number;
  phaseY: number;
  ampX: number;
  ampY: number;
  rotDeg: number;
};

const buildDriftConfigs = (
  count: number,
  unitScale: number,
  intensity: AnimatedVectorIntensity
): PathDriftConfig[] => {
  const screenPx = intensity === 'subtle' ? 2 : 5;
  const amp = screenPx * unitScale;
  const ampScale = intensity === 'subtle' ? 1.2 : 1.6;

  return Array.from({ length: count }, (_, index) => {
    const durationMs = (8 + animatedVectorSeed(index, 10) * 6) * 1000;
    const spread = (animatedVectorSeed(index, 22) - 0.5) * amp * ampScale;
    return {
      durationMs,
      phaseX: animatedVectorSeed(index, 20) * Math.PI * 2,
      phaseY: animatedVectorSeed(index, 21) * Math.PI * 2,
      ampX: spread,
      ampY: spread * (0.65 + animatedVectorSeed(index, 23) * 0.35),
      rotDeg:
        (animatedVectorSeed(index, 24) - 0.5) *
        (intensity === 'subtle' ? 0.35 : 1.2),
    };
  });
};

const attachDriftAnimation = (
  svg: SVGSVGElement,
  root: ParentNode,
  elements: SVGGeometryElement[],
  intensity: AnimatedVectorIntensity
): (() => void) => {
  const unitScale = getViewBoxUnitScale(svg, root);
  const configs = buildDriftConfigs(elements.length, unitScale, intensity);

  let frameId = 0;
  const start = performance.now();

  const tick = (now: number) => {
    const elapsedBase = now - start;

    elements.forEach((element, index) => {
      const config = configs[index];
      const t =
        ((elapsedBase % config.durationMs) / config.durationMs) * Math.PI * 2;

      const x = Math.sin(t + config.phaseX) * config.ampX;
      const y = Math.sin(t + config.phaseY) * config.ampY;
      const rotate = Math.sin(t + config.phaseX + Math.PI / 4) * config.rotDeg;

      element.setAttribute(
        'transform',
        `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${rotate.toFixed(2)})`
      );
    });

    frameId = requestAnimationFrame(tick);
  };

  frameId = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(frameId);
    elements.forEach((element) => element.removeAttribute('transform'));
  };
};

/**
 * Animates vector artwork inside an SVG.
 * Default `stroke` effect = hand-drawn edge shimmer (SVG displacement filter).
 */
export const attachAnimatedVectorPaths = (
  root: ParentNode | null | undefined,
  options: AnimatedVectorOptions = {}
): (() => void) => {
  const {
    enabled = true,
    intensity = 'subtle',
    effect = 'stroke',
    selectors = DEFAULT_ANIMATED_VECTOR_SELECTORS,
  } = options;

  if (!enabled || !root || prefersReducedMotion()) {
    return () => {};
  }

  const svg =
    root instanceof SVGSVGElement ? root : root.querySelector<SVGSVGElement>('svg');

  if (!svg) {
    return () => {};
  }

  svg.classList.add(
    'animated-vector',
    `animated-vector--${effect}`,
    `animated-vector--intensity-${intensity}`
  );
  svg.style.overflow = 'visible';

  if (effect === 'stroke') {
    const cleanup = attachHandDrawnAnimation(
      svg,
      intensity,
      options.filterDisplayWidthPx
    );
    return () => {
      cleanup();
      svg.classList.remove(
        'animated-vector',
        `animated-vector--${effect}`,
        `animated-vector--intensity-${intensity}`
      );
      svg.style.overflow = '';
    };
  }

  const elements = Array.from(
    svg.querySelectorAll<SVGGeometryElement>(selectors)
  );

  if (elements.length === 0) {
    return () => {};
  }

  const cleanup = attachDriftAnimation(svg, root, elements, intensity);

  return () => {
    cleanup();
    svg.classList.remove(
      'animated-vector',
      `animated-vector--${effect}`,
      `animated-vector--intensity-${intensity}`
    );
    svg.style.overflow = '';
  };
};
