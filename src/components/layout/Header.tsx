import { useState } from 'react'
import { Clock, MapPin, Menu, Phone } from 'lucide-react'
import { clinic, navLinks, sectionIds } from '../../data/clinic'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolledPast } from '../../hooks/useScrolledPast'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { cn } from '../../lib/cn'
import { ButtonLink } from '../ui/Button'
import { Container } from './Container'
import { Logo } from './Logo'
import { MobileNav } from './MobileNav'

/** Section ids the nav links point at, used to highlight where the reader is. */
const trackedSections = navLinks.map((link) => link.href.slice(1))

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolledPast(24)
  const progress = useScrollProgress()
  const activeSection = useActiveSection(trackedSections)

  return (
    <>
      {/* Utility strip — practical details only, and it scrolls away. */}
      <div className="hidden bg-brand-800 text-brand-100 lg:block">
        <Container className="flex h-9 items-center justify-between text-[0.78125rem]">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" aria-hidden="true" />
              {clinic.address.short}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden="true" />
              {clinic.hours.summary}
            </span>
          </div>
          <a
            href={clinic.phone.href}
            className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-white"
          >
            <Phone className="size-3.5" aria-hidden="true" />
            {clinic.phone.display}
          </a>
        </Container>
      </div>

      <header
        className={cn(
          /* `sticky` already establishes a containing block for the absolutely
             positioned progress rule — adding `relative` would collide with it,
             since both set `position` and class order does not decide the winner. */
          'sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300',
          scrolled
            ? 'border-b border-line bg-surface/90 shadow-soft backdrop-blur-md'
            : 'border-b border-transparent bg-surface',
        )}
      >
        <Container className="flex h-(--spacing-header) items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Primary" className="max-lg:hidden">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1)
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'group relative inline-flex min-h-10 items-center rounded-full px-3.5 text-[0.9375rem] font-medium transition-colors lg:px-4',
                        isActive ? 'text-brand-700' : 'text-ink-soft hover:text-brand-700',
                      )}
                    >
                      {link.label}
                      {/* Underline grows from the centre on hover, and stays
                          put for whichever section is currently in view. */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-x-3.5 bottom-1.5 h-0.5 origin-center rounded-full bg-brand-500 transition-transform duration-300 ease-out lg:inset-x-4',
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                        )}
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink
              href={clinic.phone.href}
              variant="secondary"
              className="max-lg:hidden"
              aria-label={`Call the clinic on ${clinic.phone.display}`}
            >
              <Phone className="size-4" aria-hidden="true" />
              {clinic.phone.display}
            </ButtonLink>

            <ButtonLink href={`#${sectionIds.appointment}`} className="max-sm:hidden">
              Book Appointment
            </ButtonLink>

            {/* Mobile: calling is one tap, menu is the other. */}
            <ButtonLink
              href={clinic.phone.href}
              className="sm:hidden"
              aria-label={`Call the clinic on ${clinic.phone.display}`}
            >
              <Phone className="size-4" aria-hidden="true" />
              Call
            </ButtonLink>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              aria-label="Open menu"
              className="grid size-11 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-brand-400 hover:text-brand-700 lg:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </Container>

        {/* Reading progress, drawn on the header's own bottom rule. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-brand-500 transition-opacity duration-300"
          style={{ transform: `scaleX(${progress})`, opacity: scrolled ? 1 : 0 }}
        />
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
