import { Phone } from 'lucide-react'
import { clinic, sectionIds } from '../../data/clinic'
import { Container } from '../layout/Container'
import { ButtonLink } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'

/**
 * Described as what usually happens, not as a guaranteed clinical pathway —
 * the wording stays flexible because real visits vary.
 *
 * This section has no photograph on purpose. The only available image of
 * people at work showed a dentist who is not the one practising here, so the
 * steps carry the section on their own. See data/gallery.ts.
 */
const steps = [
  {
    title: 'Get in touch',
    body: 'Call the clinic or send an appointment request. Someone will confirm a time that works for you.',
  },
  {
    title: 'Come in for a consultation',
    body: 'The dentist examines the area you are concerned about and asks about your history and symptoms.',
  },
  {
    title: 'Talk through the options',
    body: 'You hear what was found and what can be done about it, including what each option involves and costs.',
  },
  {
    title: 'Decide and plan follow-up',
    body: 'If you go ahead, treatment is scheduled and you are told what aftercare or further visits to expect.',
  },
]

export function TreatmentJourney() {
  return (
    <section
      id={sectionIds.journey}
      aria-labelledby="journey-title"
      className="border-y border-line bg-brand-800 py-16 text-white sm:py-20 lg:py-24"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div data-reveal>
            <SectionHeading
              id="journey-title"
              eyebrow="What a visit looks like"
              title="No surprises, from the first call onwards."
              description="Most visits follow roughly this shape. Yours may differ — the dentist will tell you if it does, and why."
              tone="dark"
            />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
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
          </div>

          <ol className="grid gap-4 sm:grid-cols-2" data-reveal>
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="flex flex-col rounded-2xl border border-white/12 bg-white/5 p-6 transition-colors duration-300 hover:border-white/25 hover:bg-white/8"
              >
                <span
                  aria-hidden="true"
                  className="grid size-11 shrink-0 place-items-center rounded-full border border-white/25 bg-brand-700 font-display text-sm font-bold text-brand-100"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 font-display text-[1.0625rem] font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-brand-100/80">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
