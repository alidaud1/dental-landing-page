import adnan400 from '../assets/images/team/dr-adnan-400.webp'
import adnan from '../assets/images/team/dr-adnan.webp'
import farman400 from '../assets/images/team/dr-farman-400.webp'
import farman from '../assets/images/team/dr-farman.webp'
import usama400 from '../assets/images/team/dr-usama-rehman-400.webp'
import usama from '../assets/images/team/dr-usama-rehman.webp'

export interface Dentist {
  id: string
  name: string
  /** Shown under the name. Keep to a title that the clinic has confirmed. */
  role: string
  /** One or two lines. Must not claim qualifications that are unconfirmed. */
  bio: string
  src: string
  srcSet: string
  width: number
  height: number
  alt: string
}

/**
 * The clinic's dentists, from photographs supplied by the client.
 *
 * These are real photographs of the people who actually practise here, which
 * is why the earlier stock photo of a female dentist was removed — it showed
 * someone who does not work at this clinic.
 *
 * IMPORTANT — what is and is not verified:
 *
 *   - The names and the fact that these three are dentists at the clinic come
 *     from the client.
 *   - "Dental Surgeon" for Dr Usama Rehman is visible embroidered on his
 *     scrubs in the supplied photograph.
 *   - Nothing else is confirmed. No degree (BDS, FCPS), PMDC registration
 *     number, years in practice or special interest is listed, because none
 *     has been provided. Do not add any of those without the clinic
 *     confirming them in writing — qualifications are exactly the kind of
 *     claim a regulator cares about.
 *
 * The `bio` lines below are deliberately modest: they describe what a dentist
 * at this clinic does, not achievements nobody has verified. Replace them with
 * real biographies as soon as the clinic supplies them. See CONTENT_REVIEW.md §2.8.
 */
export const dentists: readonly Dentist[] = [
  {
    id: 'dr-farman',
    name: 'Dr Farman',
    role: 'Dentist',
    bio: 'Sees patients for consultations and general dental treatment at the G-13 clinic, and will talk you through what he finds before anything is agreed.',
    src: farman,
    srcSet: `${farman400} 400w, ${farman} 640w`,
    width: 640,
    height: 800,
    alt: 'Portrait of Dr Farman, dentist at Jaskani Dental Clinic',
  },
  {
    id: 'dr-usama-rehman',
    name: 'Dr Usama Rehman',
    role: 'Dental Surgeon',
    bio: 'Carries out restorative and surgical treatment, including fillings, root canal treatment and extractions, with aftercare explained before you leave.',
    src: usama,
    srcSet: `${usama400} 400w, ${usama} 640w`,
    width: 640,
    height: 800,
    alt: 'Portrait of Dr Usama Rehman, dental surgeon at Jaskani Dental Clinic',
  },
  {
    id: 'dr-adnan',
    name: 'Dr Adnan',
    role: 'Dentist',
    bio: 'Handles routine and preventive care — check-ups, cleaning and fillings — and is happy to take the time if you are nervous about treatment.',
    src: adnan,
    srcSet: `${adnan400} 400w, ${adnan} 640w`,
    width: 640,
    height: 800,
    alt: 'Portrait of Dr Adnan, dentist at Jaskani Dental Clinic',
  },
]
