/**
 * One place that answers "is motion allowed?".
 *
 * Every animated hook checks this. When a visitor has asked for reduced
 * motion, the hooks do not attach listeners at all — the effect is not merely
 * invisible, it never runs, so there is no scroll or pointer work happening
 * in the background either.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Coarse pointers (touch) get no tilt or magnetic effects — they cannot hover. */
export function hasFinePointer(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(pointer: fine)').matches
}

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max)
