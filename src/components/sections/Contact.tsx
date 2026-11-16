import { Clock, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react'
import { clinic, sectionIds } from '../../data/clinic'
import type { Enquiry } from '../../lib/enquiry'
import { Container } from '../layout/Container'
import { ButtonLink } from '../ui/Button'
import { AppointmentForm } from '../ui/AppointmentForm'
import { SectionHeading } from '../ui/SectionHeading'

interface ContactProps {
  enquiry?: Enquiry
}

export function Contact({ enquiry }: ContactProps) {
  return (
    <section
      id={sectionIds.contact}
      aria-labelledby="contact-title"
      className="bg-surface py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div data-reveal>
          <SectionHeading
            id="contact-title"
            eyebrow="Visit or call"
            title="Find the clinic in G-13, Islamabad."
            description="Call during opening hours for the fastest answer, or send a request and the clinic will get back to you."
          />
        </div>

        <div
          id={sectionIds.appointment}
          className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12"
        >
          <div className="flex flex-col gap-5" data-reveal="left">
            <ul className="flex flex-col gap-5 rounded-panel border border-line bg-surface-raised p-6 shadow-soft sm:p-8">
              <ContactRow icon={MapPin} label="Address">
                <address className="not-italic">
                  {clinic.address.street}
                  <br />
                  {clinic.address.locality} {clinic.address.postalCode}
                  <br />
                  {clinic.address.country}
                </address>
              </ContactRow>

              <ContactRow icon={Phone} label="Phone">
                <a
                  href={clinic.phone.href}
                  className="inline-flex min-h-11 items-center font-medium text-brand-700 underline-offset-4 hover:underline"
                >
                  {clinic.phone.display}
                </a>
              </ContactRow>

              <ContactRow icon={Clock} label="Opening hours">
                <p>{clinic.hours.detail}</p>
                <p className="mt-1 text-sm text-ink-muted">{clinic.hours.note}</p>
              </ContactRow>
            </ul>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink
                href={clinic.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
              >
                <Navigation className="size-4" aria-hidden="true" />
                Get directions
              </ButtonLink>
              <ButtonLink
                href={clinic.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Message on WhatsApp
              </ButtonLink>
            </div>

            {/*
              No map embed: the clinic's Google Business listing has not been
              verified, and an embed pinned to a guessed location would send
              patients to the wrong place. The directions link runs a search
              for the clinic by name and address instead.
            */}
            <p className="rounded-card border border-line bg-surface-mint px-4 py-3 text-xs leading-relaxed text-ink-muted">
              The directions link opens a Google Maps search for the clinic. Please confirm the
              exact location by phone before travelling a long distance.
            </p>
          </div>

          <div data-reveal="right">
            <AppointmentForm enquiry={enquiry} />
          </div>
        </div>
      </Container>
    </section>
  )
}

function ContactRow({
  icon: IconComponent,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number; 'aria-hidden'?: boolean }>
  label: string
  children: React.ReactNode
}) {
  return (
    <li className="flex gap-4">
      <span
        aria-hidden="true"
        className="grid size-10 shrink-0 place-items-center rounded-card bg-brand-50 text-brand-600"
      >
        <IconComponent className="size-5" strokeWidth={1.7} aria-hidden />
      </span>
      <div className="text-[0.9375rem] leading-relaxed text-ink-soft">
        <p className="font-display text-sm font-bold text-ink">{label}</p>
        <div className="mt-1">{children}</div>
      </div>
    </li>
  )
}
