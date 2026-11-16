import { Clock, MapPin, Phone } from 'lucide-react'
import { clinic, navLinks, sectionIds } from '../../data/clinic'
import { services } from '../../data/services'
import { Container } from './Container'
import { Logo } from './Logo'

/** Six representative services — the full list lives in the Services section. */
const footerServices = services.slice(0, 6)

/** Read once at module load: the copyright year must not change mid-render. */
const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="bg-brand-900 text-brand-100">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-8">
          <div className="flex flex-col gap-4">
            <Logo tone="dark" />
            <p className="max-w-[38ch] text-sm leading-relaxed text-brand-200/80">
              {clinic.description}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-display text-sm font-bold tracking-wide text-white">Explore</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-8 items-center text-brand-200/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-bold tracking-wide text-white">Services</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {footerServices.map((service) => (
                <li key={service.id}>
                  <a
                    href={`#${sectionIds.services}`}
                    className="inline-flex min-h-8 items-center text-brand-200/80 transition-colors hover:text-white"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-bold tracking-wide text-white">Visit or call</h2>
            <ul className="mt-4 flex flex-col gap-3.5 text-sm">
              <li>
                <a
                  href={clinic.phone.href}
                  className="inline-flex min-h-11 items-start gap-2.5 py-1 text-brand-200/80 transition-colors hover:text-white"
                >
                  <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {clinic.phone.display}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-brand-200/80">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <address className="not-italic">
                  {clinic.address.street}
                  <br />
                  {clinic.address.locality} {clinic.address.postalCode}
                </address>
              </li>
              <li className="flex items-start gap-2.5 text-brand-200/80">
                <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {clinic.hours.summary}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-brand-200/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {clinic.name}, Islamabad. All rights reserved.
          </p>
          <p>
            Information on this site is general and does not replace a dentist’s assessment.
          </p>
        </div>
      </Container>
    </footer>
  )
}
