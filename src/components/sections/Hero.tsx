import { Clock, MapPin, Phone } from 'lucide-react'
import { clinic, sectionIds } from '../../data/clinic'
import { heroImage } from '../../data/gallery'
import { Container } from '../layout/Container'
import { ButtonLink } from '../ui/Button'

export function Hero() {
  return (
    <section id={sectionIds.home} className="relative overflow-hidden bg-surface">
      {/* A single soft mint field behind the image column — no blobs, no gradients mesh. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 hidden w-[46%] rounded-bl-[6rem] bg-surface-mint lg:block"
      />

      <Container className="relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
        <div className="flex flex-col items-start">
          <p className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-[0.6875rem] font-semibold tracking-[0.13em] text-brand-700 uppercase">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-500" />
            {clinic.name} · G-13, Islamabad
          </p>

          <h1 className="text-display mt-6 max-w-[15ch]">
            A healthier smile starts with care you can{' '}
            <span className="text-brand-600">trust</span>.
          </h1>

          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-ink-muted sm:text-lg">
            Thoughtful dental care, clear guidance and a comfortable experience for every smile.
            Visit Jaskani Dental Clinic in G-13, Islamabad.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <ButtonLink href={`#${sectionIds.appointment}`} size="lg">
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

          <dl className="mt-9 grid w-full grid-cols-1 gap-x-8 gap-y-4 border-t border-line pt-7 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-brand-500" strokeWidth={1.7} aria-hidden="true" />
              <div>
                <dt className="text-sm font-semibold text-ink">Where to find us</dt>
                <dd className="mt-0.5 text-sm text-ink-muted">{clinic.address.street}, G-13</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-brand-500" strokeWidth={1.7} aria-hidden="true" />
              <div>
                <dt className="text-sm font-semibold text-ink">Opening hours</dt>
                <dd className="mt-0.5 text-sm text-ink-muted">{clinic.hours.summary}</dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[1.75rem] bg-brand-100 shadow-lift">
            <img
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
              className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
            />
          </div>

          {/* Factual overlay only — hours, not an invented statistic. */}
          <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-line bg-surface-raised px-4 py-3 shadow-soft sm:left-8">
            <span
              aria-hidden="true"
              className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-600"
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
