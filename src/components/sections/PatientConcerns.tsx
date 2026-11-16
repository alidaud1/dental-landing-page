import { Check } from 'lucide-react'
import { sectionIds } from '../../data/clinic'
import { galleryImages } from '../../data/gallery'
import { Container } from '../layout/Container'
import { ButtonLink } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'

/**
 * Reassurance, not fear marketing. Each line names a real hesitation and says
 * what the clinic does about it — without promising comfort or outcomes.
 */
const concerns = [
  {
    worry: '“I don’t know what treatment I actually need.”',
    response:
      'The dentist examines the area, explains what they find in plain language, and sets out the options rather than deciding for you.',
  },
  {
    worry: '“I’m worried it will be uncomfortable.”',
    response:
      'Tell the team beforehand. Knowing in advance lets the dentist talk you through each step and work at a pace you are comfortable with.',
  },
  {
    worry: '“I’m not sure what it will cost.”',
    response:
      'Ask at any point. Costs depend on what the treatment involves, so you will hear the figure before anything is scheduled — not after.',
  },
  {
    worry: '“I want time to think it over.”',
    response:
      'A consultation does not commit you to treatment. Take the information home and come back when you have decided.',
  },
]

const smileImage = galleryImages.find((image) => image.id === 'smile')

export function PatientConcerns() {
  return (
    <section
      id={sectionIds.whyUs}
      aria-labelledby="concerns-title"
      className="bg-surface py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <div data-reveal>
            <SectionHeading
              id="concerns-title"
              eyebrow="Why people put it off"
              title="Dental care should feel clear, comfortable and personal."
              description="Most people delay a dental visit for one of a handful of reasons — and almost all of them come down to not knowing what to expect. Here is how each one is handled at Jaskani."
            />

            {smileImage && (
              <div className="mt-9 hidden overflow-hidden rounded-2xl border border-line lg:block">
                <img
                  src={smileImage.src}
                  width={smileImage.width}
                  height={smileImage.height}
                  alt={smileImage.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/1] w-full object-cover"
                />
              </div>
            )}

            <ButtonLink href={`#${sectionIds.appointment}`} size="lg" className="mt-9">
              Talk to the dentist first
            </ButtonLink>
          </div>

          <ul className="flex flex-col gap-4" data-reveal>
            {concerns.map((item) => (
              <li
                key={item.worry}
                className="rounded-2xl border border-line bg-surface-raised p-5 shadow-soft transition-colors hover:border-brand-200 sm:p-6"
              >
                <p className="font-display text-[1.0625rem] font-bold text-ink">{item.worry}</p>
                <p className="mt-2.5 flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink-muted">
                  <Check
                    className="mt-1 size-4 shrink-0 text-brand-500"
                    strokeWidth={2.4}
                    aria-hidden="true"
                  />
                  <span>{item.response}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
