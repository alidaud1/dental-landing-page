import { MessageSquareQuote, Phone } from 'lucide-react'
import { clinic, sectionIds } from '../../data/clinic'
import { reviewProfileUrl, testimonials, testimonialsVerified } from '../../data/testimonials'
import { Container } from '../layout/Container'
import { ButtonLink } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'
import { TestimonialCard } from '../ui/TestimonialCard'

/**
 * Two renderings of the same section.
 *
 * Until the clinic confirms its reviews are genuine and cleared for
 * publication, the neutral variant renders: an honest invitation to look up
 * real reviews, rather than quotes and star ratings we cannot stand behind.
 * Flip `testimonialsVerified` in data/testimonials.ts to show real feedback.
 */
export function Reviews() {
  const showTestimonials = testimonialsVerified && testimonials.length > 0

  return (
    <section
      id={sectionIds.reviews}
      aria-labelledby="reviews-title"
      className="border-y border-line bg-surface-mint py-16 sm:py-20 lg:py-24"
    >
      <Container>
        {showTestimonials ? (
          <>
            <div data-reveal>
              <SectionHeading
                id="reviews-title"
                eyebrow="Patient feedback"
                title="What patients say about their visit."
                align="center"
              />
            </div>
            <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-reveal>
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </ul>
          </>
        ) : (
          <div
            className="mx-auto flex max-w-2xl flex-col items-center text-center"
            data-reveal
          >
            <span
              aria-hidden="true"
              className="grid size-14 place-items-center rounded-2xl bg-brand-600 text-white"
            >
              <MessageSquareQuote className="size-6" strokeWidth={1.6} />
            </span>

            <div className="mt-7">
              <SectionHeading
                id="reviews-title"
                eyebrow="Patient feedback"
                title="We would rather you heard it from patients directly."
                description="Rather than publish quotes and star ratings we cannot independently verify, this page leaves them out. If you want a sense of how the clinic treats people, search for Jaskani Dental Clinic, G-13 and read what patients have written themselves — or call and ask."
                align="center"
              />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {reviewProfileUrl ? (
                <ButtonLink
                  href={reviewProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                >
                  Read verified reviews
                </ButtonLink>
              ) : (
                <ButtonLink
                  href={clinic.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                >
                  Find the clinic on Google Maps
                </ButtonLink>
              )}

              <ButtonLink href={clinic.phone.href} variant="secondary" size="lg">
                <Phone className="size-4" aria-hidden="true" />
                Call {clinic.phone.display}
              </ButtonLink>
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
