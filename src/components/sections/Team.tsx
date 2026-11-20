import { Phone } from 'lucide-react'
import { clinic, sectionIds } from '../../data/clinic'
import { dentists } from '../../data/team'
import { Container } from '../layout/Container'
import { ButtonLink } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'

/**
 * The dentists who actually practise here, from photographs supplied by the
 * clinic.
 *
 * The three portraits were shot against different backdrops — navy, grey and
 * mauve — so they are cropped to one ratio and framed identically. A gradient
 * scrim at the foot of each carries the name, which keeps the varied
 * backgrounds from reading as three unrelated images.
 */
export function Team() {
  return (
    <section
      id={sectionIds.team}
      aria-labelledby="team-title"
      className="relative bg-surface py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="clinical-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(65%_55%_at_50%_40%,black,transparent)]"
      />

      <Container className="relative">
        <div data-reveal>
          <SectionHeading
            id="team-title"
            eyebrow="The team"
            title="The dentists who will actually see you."
            description="Three dentists practise at the G-13 clinic. You are welcome to ask for any of them when you book — and to ask questions at any point during your visit."
          />
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger>
          {dentists.map((dentist) => (
            <li
              key={dentist.id}
              className="group flex flex-col overflow-hidden rounded-panel border border-line bg-surface-raised shadow-soft transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift"
            >
              <div className="relative overflow-hidden bg-brand-50">
                <img
                  src={dentist.src}
                  srcSet={dentist.srcSet}
                  sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 100vw"
                  width={dentist.width}
                  height={dentist.height}
                  alt={dentist.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Scrim ties the three different studio backdrops together. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="label-clinical text-white/70">{dentist.role}</p>
                  <h3 className="mt-1 font-display text-xl font-bold text-white drop-shadow">
                    {dentist.name}
                  </h3>
                </div>
              </div>

              <p className="grow p-5 text-[0.9375rem] leading-relaxed text-ink-muted sm:p-6">
                {dentist.bio}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" data-reveal>
          <ButtonLink href={`#${sectionIds.appointment}`} size="lg">
            Book with the clinic
          </ButtonLink>
          <ButtonLink href={clinic.phone.href} variant="secondary" size="lg">
            <Phone className="size-4" aria-hidden="true" />
            Call {clinic.phone.display}
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
