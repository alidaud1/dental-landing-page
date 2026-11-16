import { useRef } from 'react'
import { Phone, X } from 'lucide-react'
import { clinic, navLinks, sectionIds } from '../../data/clinic'
import { useOverlay } from '../../hooks/useOverlay'
import { ButtonLink } from '../ui/Button'

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  useOverlay(open, onClose, panelRef)

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      // Kept mounted so the slide transition can run in both directions.
      inert={!open}
      aria-hidden={!open}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close menu"
        onClick={onClose}
        className={`absolute inset-0 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        ref={panelRef}
        /* The panel stays mounted so it can slide out as well as in, but it is
           only a dialog while it is actually open — an always-present
           aria-modal region would otherwise sit in the a11y tree. */
        role={open ? 'dialog' : undefined}
        aria-modal={open ? true : undefined}
        aria-label="Site menu"
        data-site-menu
        className={`absolute inset-y-0 right-0 flex w-[min(21rem,88vw)] flex-col bg-surface shadow-lift transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <p className="font-display text-sm font-bold tracking-tight">Menu</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-11 place-items-center rounded-full text-ink-muted transition-colors hover:bg-brand-50 hover:text-brand-700"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-2 py-3">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={onClose}
                  className="flex min-h-12 items-center rounded-xl px-3 font-display text-lg font-semibold text-ink transition-colors hover:bg-brand-50 hover:text-brand-700"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 border-t border-line px-5 py-5">
          <ButtonLink href={`#${sectionIds.appointment}`} onClick={onClose} size="lg">
            Book an Appointment
          </ButtonLink>
          <ButtonLink href={clinic.phone.href} variant="secondary" size="lg">
            <Phone className="size-4" aria-hidden="true" />
            {clinic.phone.display}
          </ButtonLink>
          <p className="text-center text-xs text-ink-muted">
            {clinic.address.short} · {clinic.hours.short}
          </p>
        </div>
      </div>
    </div>
  )
}
