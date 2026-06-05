import { useLayoutEffect, useMemo, useRef, type RefObject } from 'react';
import { attachAnimatedVectorPaths } from './animatedVector';
import type { AnimatedVectorOptions } from './types';

/**
 * Ref for a container that holds an inline SVG (e.g. SVGR).
 * Re-applies after each commit so SVGR re-renders do not drop the filter.
 */
export const useAnimatedVector = (
  options?: AnimatedVectorOptions
): RefObject<HTMLDivElement | null> => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const optionsRef = useRef<AnimatedVectorOptions>({
    effect: 'stroke',
    intensity: 'subtle',
    enabled: true,
  });

  const resolvedOptions = useMemo<AnimatedVectorOptions>(
    () => ({
      effect: options?.effect ?? 'stroke',
      intensity: options?.intensity ?? 'subtle',
      selectors: options?.selectors,
      filterDisplayWidthPx: options?.filterDisplayWidthPx,
      enabled: options?.enabled ?? true,
    }),
    [
      options?.effect,
      options?.enabled,
      options?.intensity,
      options?.selectors,
      options?.filterDisplayWidthPx,
    ]
  );

  optionsRef.current = resolvedOptions;

  useLayoutEffect(() => {
    let cleanup = () => {};
    let frameId = 0;

    const sync = () => {
      const node = containerRef.current;
      const opts = optionsRef.current;

      if (!node || !opts.enabled) {
        cleanup();
        cleanup = () => {};
        return;
      }

      const ready =
        node.querySelectorAll('path').length > 0 &&
        node.getBoundingClientRect().width > 0;

      if (!ready) {
        frameId = requestAnimationFrame(sync);
        return;
      }

      cleanup();
      cleanup = attachAnimatedVectorPaths(node, opts);
    };

    sync();

    return () => {
      cancelAnimationFrame(frameId);
      cleanup();
    };
  });

  return containerRef;
};
