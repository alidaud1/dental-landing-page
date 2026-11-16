/**
 * Single source of truth for every clinic-specific detail on the site.
 * Nothing here should be duplicated inside a component.
 *
 * Items marked `// NEEDS CONFIRMATION` are carried over from the previous
 * Jaskani website and have not been independently verified. See
 * CONTENT_REVIEW.md before publishing.
 */

const PHONE_INTERNATIONAL = '+923151932127'

export const clinic = {
  name: 'Jaskani Dental Clinic',
  shortName: 'Jaskani',
  tagline: 'Dental care in G-13, Islamabad',
  description:
    'A family dental clinic in G-13, Islamabad offering preventive, restorative and cosmetic treatments with clear guidance at every step.',

  phone: {
    /** Display form, as written on the previous site. */
    display: '0315 1932127',
    /** E.164 form for tel: and wa.me links. */
    international: PHONE_INTERNATIONAL,
    href: `tel:${PHONE_INTERNATIONAL}`,
  },

  /**
   * NEEDS CONFIRMATION: the previous site linked this number on wa.me, but the
   * clinic has not confirmed WhatsApp is active on it.
   */
  whatsapp: {
    number: PHONE_INTERNATIONAL.replace('+', ''),
    href: `https://wa.me/${PHONE_INTERNATIONAL.replace('+', '')}`,
  },

  address: {
    street: 'Street 87, G-13/1',
    locality: 'G-13, Islamabad',
    postalCode: '44034',
    country: 'Pakistan',
    short: 'G-13/1, Islamabad',
    full: 'Street 87, G-13/1, G-13, Islamabad, 44034, Pakistan',
  },

  /**
   * A Maps *search* URL rather than a coordinate pin or place ID — we have not
   * verified the clinic's Google Business listing, so we must not fabricate one.
   */
  directionsUrl:
    'https://www.google.com/maps/search/?api=1&query=Jaskani+Dental+Clinic+Street+87+G-13+Islamabad',

  /** NEEDS CONFIRMATION: opening hours and holiday schedule. */
  hours: {
    summary: 'Open daily until 10:00 PM',
    short: 'Daily until 10 PM',
    detail: 'Monday to Sunday, closing at 10:00 PM',
    note: 'Please call ahead to confirm availability, especially on public holidays.',
  },
} as const

/** Section ids used by navigation, CTAs and anchor scrolling. */
export const sectionIds = {
  home: 'home',
  services: 'services',
  whyUs: 'why-us',
  journey: 'journey',
  gallery: 'gallery',
  reviews: 'reviews',
  faqs: 'faqs',
  contact: 'contact',
  appointment: 'appointment',
} as const

export const navLinks = [
  { label: 'Services', href: `#${sectionIds.services}` },
  { label: 'Why Choose Us', href: `#${sectionIds.whyUs}` },
  { label: 'Gallery', href: `#${sectionIds.gallery}` },
  { label: 'Reviews', href: `#${sectionIds.reviews}` },
  { label: 'FAQs', href: `#${sectionIds.faqs}` },
  { label: 'Contact', href: `#${sectionIds.contact}` },
] as const

/**
 * Practical trust points only. No years of experience, patient counts,
 * success rates, awards or "No. 1" claims — none of that is substantiated.
 */
export const trustFacts = [
  {
    icon: 'map-pin',
    label: 'G-13/1, Islamabad',
    detail: 'Street 87, easy to reach from across G-13',
  },
  {
    icon: 'clock',
    label: 'Open daily until 10 PM',
    detail: 'Evening appointments for working schedules',
  },
  {
    icon: 'users',
    label: 'Family dental care',
    detail: 'Preventive, restorative and cosmetic treatments',
  },
  {
    icon: 'message-circle',
    label: 'Clear explanations',
    detail: 'Understand your options before you decide',
  },
] as const
