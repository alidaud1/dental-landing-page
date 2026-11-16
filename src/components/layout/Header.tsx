import { useState } from 'react'
import { Clock, MapPin, Menu, Phone } from 'lucide-react'
import { clinic, navLinks, sectionIds } from '../../data/clinic'
import { useScrolledPast } from '../../hooks/useScrolledPast'
import { cn } from '../../lib/cn'
import { ButtonLink } from '../ui/Button'
import { Container } from './Container'
import { Logo } from './Logo'
import { MobileNav } from './MobileNav'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolledPast(24)

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
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-10 items-center rounded-full px-3.5 text-[0.9375rem] font-medium text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700 lg:px-4"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
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
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
