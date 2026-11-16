export interface Testimonial {
  id: string
  quote: string
  author: string
  /** Only render a rating when the clinic has confirmed the source. */
  rating?: number
}

/**
 * IMPORTANT — read before editing.
 *
 * The previous Jaskani website displayed three review excerpts attributed to
 * "Ayesha R.", "Bilal H." and "Sana K.", alongside a 4.8 Google rating. None
 * of that has been verified as genuine, authorised patient feedback, so this
 * site does not publish it. Publishing unverified testimonials as real is
 * misleading, and in the case of a healthcare provider, actively risky.
 *
 * To turn the testimonial section on:
 *   1. Confirm each review is genuine and that the patient consented to
 *      publication.
 *   2. Add the confirmed reviews to `testimonials` below.
 *   3. Set `testimonialsVerified` to true.
 *
 * To link out to a verified review profile instead, set `reviewProfileUrl` to
 * the clinic's real Google Business profile URL. Leave it null until then —
 * a guessed URL is worse than no link.
 */
export const testimonialsVerified = false

export const reviewProfileUrl: string | null = null

export const testimonials: readonly Testimonial[] = []
