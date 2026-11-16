import { useEffect, useRef, type RefObject } from 'react'
import { clamp, hasFinePointer, prefersReducedMotion } from '../lib/motion'

/**
 * Nudges an element toward the cursor when it is nearby, so primary CTAs feel
 * like they are reaching back. Deliberately weak — the button must never move
 * far enough that a click lands outside it.
 *
 * Off on touch devices and under reduced motion.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.22): RefObject<T | null> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion() || !hasFinePointer()) return

    let frame = 0
    let pending: { x: number; y: number } | null = null

    const apply = () => {
      frame = 0
      if (!pending) return
      element.style.transform = `translate3d(${pending.x.toFixed(2)}px, ${pending.y.toFixed(2)}px, 0)`
    }

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)

      pending = {
        // Capped so the control never drifts off its own hit area.
        x: clamp(dx * strength, -12, 12),
        y: clamp(dy * strength, -8, 8),
      }
      if (!frame) frame = requestAnimationFrame(apply)
    }

    const onLeave = () => {
      if (frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
      pending = null
      element.style.transform = ''
    }

    element.addEventListener('pointermove', onMove)
    element.addEventListener('pointerleave', onLeave)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerleave', onLeave)
      element.style.transform = ''
    }
  }, [strength])

  return ref
}
