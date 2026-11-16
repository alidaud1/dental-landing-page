import { useEffect } from 'react'
import { prefersReducedMotion } from '../lib/motion'

/** Nothing stays hidden longer than this, whatever the observer does. */
const SAFETY_REVEAL_MS = 2500

/**
 * Reveals `[data-reveal]` and `[data-reveal-stagger]` elements as they scroll
 * into view, and sets `--i` on staggered children so they resolve in sequence.
 *
 * Three guards keep content from ever being stuck invisible, which matters far
 * more than the animation does:
 *
 *   1. The hiding styles sit behind a `.reveal-ready` class this hook adds to
 *      <html>, so if JS never runs — or IntersectionObserver is missing —
 *      nothing is hidden in the first place.
 *   2. A generous rootMargin triggers the reveal before an element reaches the
 *      viewport, so fast scrolling and anchor jumps cannot outrun it.
 *   3. A timer reveals anything still hidden after a few seconds, covering
 *      cases the observer never reports (restored scroll positions, print,
 *      background tabs).
 */
export function useScrollReveal(): void {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    // Under reduced motion we skip the machinery entirely rather than
    // animating to a no-op: no class, no observer, no listeners.
    if (prefersReducedMotion()) return

    const root = document.documentElement
    root.classList.add('reveal-ready')

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-stagger]'),
    )

    // Index staggered children once, up front.
    for (const target of targets) {
      if (!target.hasAttribute('data-reveal-stagger')) continue
      Array.from(target.children).forEach((child, index) => {
        ;(child as HTMLElement).style.setProperty('--i', String(index))
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '240px 0px 240px 0px', threshold: 0 },
    )

    targets.forEach((target) => observer.observe(target))

    const safety = window.setTimeout(() => {
      targets.forEach((target) => target.classList.add('is-visible'))
      observer.disconnect()
    }, SAFETY_REVEAL_MS)

    return () => {
      window.clearTimeout(safety)
      observer.disconnect()
      root.classList.remove('reveal-ready')
    }
  }, [])
}
