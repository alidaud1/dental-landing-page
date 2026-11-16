import { useEffect, useRef, type RefObject } from 'react'
import { clamp, prefersReducedMotion } from '../lib/motion'

interface ParallaxOptions {
  /** Pixels of travel across the full scroll-through. Keep small — 10–40. */
  distance?: number
  /** Negative moves against the scroll direction. */
  direction?: 1 | -1
}

/**
 * Subtle depth: the element drifts as it passes through the viewport.
 *
 * Driven by rAF rather than a scroll handler, so at most one write happens per
 * frame no matter how fast the wheel spins, and only `transform` is touched so
 * the browser never re-lays-out. Does nothing under reduced motion.
 */
export function useParallax<T extends HTMLElement>({
  distance = 28,
  direction = -1,
}: ParallaxOptions = {}): RefObject<T | null> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion()) return

    let frame = 0
    let latest = 0

    const apply = () => {
      frame = 0
      element.style.setProperty('--parallax-y', `${latest.toFixed(2)}px`)
    }

    const measure = () => {
      const rect = element.getBoundingClientRect()
      const viewport = window.innerHeight

      // 0 when the element is entering at the bottom, 1 when it has left the top.
      const progress = clamp((viewport - rect.top) / (viewport + rect.height), 0, 1)
      latest = (progress - 0.5) * 2 * distance * direction

      if (!frame) frame = requestAnimationFrame(apply)
    }

    measure()
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
      element.style.removeProperty('--parallax-y')
    }
  }, [distance, direction])

  return ref
}
