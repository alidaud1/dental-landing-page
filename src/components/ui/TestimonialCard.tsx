import { Star } from 'lucide-react'
import type { Testimonial } from '../../data/testimonials'

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <li className="flex flex-col rounded-2xl border border-line bg-surface-raised p-6 shadow-soft">
      {testimonial.rating !== undefined && (
        <p className="flex items-center gap-1" aria-label={`Rated ${testimonial.rating} out of 5`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              aria-hidden="true"
              className={
                i < Math.round(testimonial.rating ?? 0)
                  ? 'size-4 fill-accent text-accent'
                  : 'size-4 text-line-strong'
              }
            />
          ))}
        </p>
      )}

      <blockquote className="mt-4 grow">
        <p className="text-[0.9375rem] leading-relaxed text-ink-soft">“{testimonial.quote}”</p>
      </blockquote>

      <p className="mt-5 border-t border-line pt-4 text-sm font-semibold text-ink">
        {testimonial.author}
      </p>
    </li>
  )
}
