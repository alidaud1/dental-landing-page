import { useEffect } from 'react'

/** Nothing stays hidden longer than this, whatever the observer does. */
const SAFETY_REVEAL_MS = 2500

/**
 * Reveals `[data-reveal]` elements as they enter the viewport.
 *
 * Three guards keep content from ever being stuck invisible, which matters far
 * more than the animation itself:
 *
 *   1. The hiding styles live behind a `.reveal-ready` class that this hook
 *      adds to <html>, so if JS never runs — or IntersectionObserver is
 *      missing — nothing is hidden in the first place.
 *   2. A generous rootMargin triggers the reveal before an element scrolls
 *      into view, so fast scrolling and anchor jumps cannot outrun it.
 *   3. A timer reveals anything still hidden after a few seconds, covering
 *      cases the observer does not report at all (restored scroll positions,
 *      print, background tabs).
 */
export function useScrollReveal(): void {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const root = document.documentElement
    root.classList.add('reveal-ready')

    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

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
