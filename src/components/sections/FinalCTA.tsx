import { Phone } from 'lucide-react'
import { clinic, sectionIds } from '../../data/clinic'
import { Container } from '../layout/Container'
import { ButtonLink } from '../ui/Button'

export function FinalCTA() {
  return (
    <section aria-labelledby="final-cta-title" className="bg-brand-800 py-16 text-white sm:py-20">
      <Container className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:gap-12 lg:text-left">
        <div data-reveal>
          <h2 id="final-cta-title" className="text-section-title max-w-[18ch] text-white">
            Your next step towards a healthier smile.
          </h2>
          <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-brand-100/85 sm:text-lg">
            Book a consultation at {clinic.name} in G-13, Islamabad. {clinic.hours.summary} — so
            there is usually an evening slot that works.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:shrink-0" data-reveal>
          <ButtonLink href={`#${sectionIds.appointment}`} variant="onDark" size="lg">
            Book an Appointment
          </ButtonLink>
          <ButtonLink
            href={clinic.phone.href}
            size="lg"
            className="border border-white/30 bg-transparent text-white hover:bg-white/10 active:bg-white/15"
          >
            <Phone className="size-4" aria-hidden="true" />
            {clinic.phone.display}
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
