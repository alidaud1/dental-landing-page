import { useEffect, useRef, type RefObject } from 'react'
import { hasFinePointer, prefersReducedMotion } from '../lib/motion'

interface TiltOptions {
  /** Maximum rotation in degrees. Past ~8 it stops reading as depth. */
  max?: number
  /** Pixels the card lifts toward the viewer on hover. */
  lift?: number
}

/**
 * Tilts a card toward the cursor and tracks a sheen position.
 *
 * Writes CSS custom properties rather than inline transforms, so the styling
 * stays in the stylesheet (`tilt-surface`, `tilt-sheen`) and this hook only
 * supplies numbers.
 *
 * Skipped entirely on touch devices and under reduced motion — no listeners
 * are attached at all, so there is no per-move work on phones.
 */
export function usePointerTilt<T extends HTMLElement>({
  max = 5,
  lift = 6,
}: TiltOptions = {}): RefObject<T | null> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion() || !hasFinePointer()) return

    let frame = 0
    let pending: { x: number; y: number } | null = null

    const apply = () => {
      frame = 0
      if (!pending) return
      const { x, y } = pending

      element.style.setProperty('--tilt-y', `${((x - 0.5) * 2 * max).toFixed(2)}deg`)
      element.style.setProperty('--tilt-x', `${((0.5 - y) * 2 * max).toFixed(2)}deg`)
      element.style.setProperty('--pointer-x', `${(x * 100).toFixed(1)}%`)
      element.style.setProperty('--pointer-y', `${(y * 100).toFixed(1)}%`)
    }

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect()
      pending = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      }
      if (!frame) frame = requestAnimationFrame(apply)
    }

    const onEnter = () => element.style.setProperty('--tilt-lift', `-${lift}px`)

    const onLeave = () => {
      if (frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
      pending = null
      element.style.setProperty('--tilt-x', '0deg')
      element.style.setProperty('--tilt-y', '0deg')
      element.style.setProperty('--tilt-lift', '0px')
    }

    element.addEventListener('pointerenter', onEnter)
    element.addEventListener('pointermove', onMove)
    element.addEventListener('pointerleave', onLeave)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      element.removeEventListener('pointerenter', onEnter)
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerleave', onLeave)
    }
  }, [max, lift])

  return ref
}
