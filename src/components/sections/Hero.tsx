import { Clock, MapPin, Phone } from 'lucide-react'
import { clinic, sectionIds } from '../../data/clinic'
import { heroImage } from '../../data/gallery'
import { useMagnetic } from '../../hooks/useMagnetic'
import { useParallax } from '../../hooks/useParallax'
import { Container } from '../layout/Container'
import { ButtonLink } from '../ui/Button'
import { ToothDiagram } from '../ui/ToothDiagram'

export function Hero() {
  // The image drifts against the scroll; the card drifts with it, slightly
  // faster, so the two separate into distinct planes as the page moves.
  const imageRef = useParallax<HTMLImageElement>({ distance: 26, direction: -1 })
  const cardRef = useParallax<HTMLDivElement>({ distance: 16, direction: 1 })
  const ctaRef = useMagnetic<HTMLAnchorElement>()

  return (
    <section id={sectionIds.home} className="relative overflow-hidden bg-surface">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 hidden w-[46%] bg-surface-mint lg:block"
      />
      {/* Measured grid over the mint field — texture, not decoration. */}
      <div
        aria-hidden="true"
        className="clinical-grid absolute inset-y-0 right-0 hidden w-[46%] opacity-60 lg:block"
      />
      {/* Hairline rule marking the panel edge, as on a technical drawing. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-[46%] hidden w-px bg-line lg:block"
      />

      <Container className="relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
        <div className="flex flex-col items-start">
          <p
            data-reveal
            className="label-clinical inline-flex items-center gap-2 rounded-full border border-line bg-surface-raised px-3.5 py-1.5 text-brand-700"
          >
            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-500" />
            {clinic.name} · G-13, Islamabad
          </p>

          <h1 data-reveal className="text-display mt-6 max-w-[15ch]">
            A healthier smile starts with care you can{' '}
            <span className="relative inline-block text-brand-600">
              trust
              {/* Underline draws itself in once the hero reveals. */}
              <svg
                viewBox="0 0 120 8"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-1 h-2 w-full overflow-visible"
              >
                <path
                  d="M2 5.5 C30 2, 90 2, 118 5"
                  className="stroke-brand-300"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  data-draw
                  style={{ '--len': 120 } as React.CSSProperties}
                />
              </svg>
            </span>
            .
          </h1>

          <p
            data-reveal
            className="mt-5 max-w-[52ch] text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            Thoughtful dental care, clear guidance and a comfortable experience for every smile.
            Visit Jaskani Dental Clinic in G-13, Islamabad.
          </p>

          <div
            data-reveal
            className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <ButtonLink ref={ctaRef} href={`#${sectionIds.appointment}`} size="lg">
              Book an Appointment
            </ButtonLink>
            <ButtonLink
              href={clinic.phone.href}
              variant="secondary"
              size="lg"
              aria-label={`Call the clinic on ${clinic.phone.display}`}
            >
              <Phone className="size-4" aria-hidden="true" />
              Call {clinic.phone.display}
            </ButtonLink>
          </div>

          <dl
            data-reveal-stagger
            className="mt-9 grid w-full grid-cols-1 gap-x-8 gap-y-4 border-t border-line pt-7 sm:grid-cols-2"
          >
            <div className="flex items-start gap-3">
              <MapPin
                className="mt-0.5 size-5 shrink-0 text-brand-500"
                strokeWidth={1.7}
                aria-hidden="true"
              />
              <div>
                <dt className="text-sm font-semibold text-ink">Where to find us</dt>
                <dd className="mt-0.5 text-sm text-ink-muted">{clinic.address.street}, G-13</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock
                className="mt-0.5 size-5 shrink-0 text-brand-500"
                strokeWidth={1.7}
                aria-hidden="true"
              />
              <div>
                <dt className="text-sm font-semibold text-ink">Opening hours</dt>
                <dd className="mt-0.5 text-sm text-ink-muted">{clinic.hours.summary}</dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="relative" data-reveal="scale">
          <div className="overflow-hidden rounded-panel bg-brand-100 shadow-float">
            <img
              ref={imageRef}
              src={heroImage.src}
              srcSet={heroImage.srcSet}
              sizes={heroImage.sizes}
              width={heroImage.width}
              height={heroImage.height}
              alt={heroImage.alt}
              /* The LCP image: eagerly fetched at high priority, never lazy. */
              loading="eager"
              fetchPriority="high"
              decoding="async"
              /* Scaled slightly over the frame so the parallax drift never
                 exposes an edge. */
              className="aspect-[4/3] w-full scale-[1.06] object-cover lg:aspect-[5/4]"
              style={{ translate: '0 var(--parallax-y, 0px)' }}
            />
          </div>

          {/* Anatomical reference card over the frame's corner — large enough
              that the enamel/dentin/pulp layers actually read. */}
          <div
            aria-hidden="true"
            className="absolute -top-6 -right-3 hidden w-28 rounded-card border border-line bg-surface-raised/95 p-3 shadow-lift backdrop-blur-sm sm:block lg:-right-7 lg:w-32"
          >
            <div className="h-28 text-clinical lg:h-32">
              <ToothDiagram variant="preventive" bare />
            </div>
            <p className="label-clinical mt-2 text-center text-[0.5625rem] text-ink-muted">
              Molar · cross-section
            </p>
          </div>

          {/* Factual overlay only — hours, not an invented statistic. */}
          <div
            ref={cardRef}
            className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-card border border-line bg-surface-raised px-4 py-3 shadow-lift sm:left-8"
            style={{ translate: '0 var(--parallax-y, 0px)' }}
          >
            <span
              aria-hidden="true"
              className="grid size-10 place-items-center rounded-card bg-brand-50 text-brand-600"
            >
              <Clock className="size-5" strokeWidth={1.7} />
            </span>
            <p className="text-sm leading-tight">
              <span className="block font-semibold text-ink">Evening appointments</span>
              <span className="block text-ink-muted">{clinic.hours.short}</span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
