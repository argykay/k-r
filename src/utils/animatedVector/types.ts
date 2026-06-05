export type AnimatedVectorIntensity = 'subtle' | 'medium' | 'strong';

export type AnimatedVectorEffect = 'stroke' | 'drift';

export type AnimatedVectorOptions = {
  /** When false, animation is not applied and styles are cleared. */
  enabled?: boolean;
  intensity?: AnimatedVectorIntensity;
  /** `stroke` = soft hand-drawn edge shimmer (SVG filter). `drift` = gentle position drift. */
  effect?: AnimatedVectorEffect;
  /** SVG geometry selectors to animate (default: paths, lines, and basic shapes). */
  selectors?: string;
  /**
   * Visual width in px used to tune the hand-drawn filter (e.g. when SVG is
   * scaled down with CSS). Defaults to the SVG element width.
   */
  filterDisplayWidthPx?: number;
};
