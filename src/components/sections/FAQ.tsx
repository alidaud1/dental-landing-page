import { Phone } from 'lucide-react'
import { clinic, sectionIds } from '../../data/clinic'
import { faqs } from '../../data/faqs'
import { Container } from '../layout/Container'
import { Accordion } from '../ui/Accordion'
import { ButtonLink } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'

export function FAQ() {
  return (
    <section
      id={sectionIds.faqs}
      aria-labelledby="faq-title"
      className="border-t border-line bg-surface-mint py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div data-reveal>
            <SectionHeading
              id="faq-title"
              eyebrow="Questions"
              title="Answers before you call."
              description="If something is not covered here, the clinic would rather you asked than guessed."
            />

            <ButtonLink href={clinic.phone.href} variant="secondary" size="lg" className="mt-8">
              <Phone className="size-4" aria-hidden="true" />
              Call {clinic.phone.display}
            </ButtonLink>
          </div>

          <div data-reveal>
            <Accordion items={faqs} />
          </div>
        </div>
      </Container>
    </section>
  )
}
