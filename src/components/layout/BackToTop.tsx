import { ArrowUp } from 'lucide-react'
import { sectionIds } from '../../data/clinic'
import { useScrolledPast } from '../../hooks/useScrolledPast'

/** Earns its place on a page this long. Hidden until the visitor is well down it. */
export function BackToTop() {
  const visible = useScrolledPast(1400)

  return (
    <a
      href={`#${sectionIds.home}`}
      aria-label="Back to top"
      className={`fixed right-5 bottom-5 z-30 grid size-12 place-items-center rounded-full border border-line bg-surface-raised text-brand-700 shadow-lift transition-all duration-300 hover:bg-brand-50 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </a>
  )
}
