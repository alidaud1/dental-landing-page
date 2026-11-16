import instruments from '../assets/images/dental-instruments-740.webp'
import smile from '../assets/images/healthy-smile-850.webp'
import treatmentRoomLarge from '../assets/images/treatment-room-1200.webp'
import treatmentRoomSmall from '../assets/images/treatment-room-700.webp'

export interface GalleryImage {
  id: string
  src: string
  srcSet?: string
  sizes?: string
  width: number
  height: number
  /** Describes what is in the frame. Never claims a model is a real patient. */
  alt: string
  caption: string
}

/**
 * IMPORTANT — why there are no photographs of people at work here.
 *
 * The previous site's hero and gallery used a stock photo of a *female*
 * dentist treating a patient. The dentist at this clinic is male, so that
 * image told every visitor something specifically untrue about who would be
 * treating them. A caption cannot undo that — most people read the picture and
 * never read the note — so the photo was removed outright rather than
 * disclaimed.
 *
 * The three images below show a room, instruments and a smile. None of them
 * depicts clinic staff, so none of them can misrepresent who works here.
 *
 * The right fix is a real photograph of the actual dentist. When the clinic
 * provides one, it belongs in the hero. See CONTENT_REVIEW.md §5.
 */
export const galleryImages: readonly GalleryImage[] = [
  {
    id: 'treatment-room',
    src: treatmentRoomLarge,
    srcSet: `${treatmentRoomSmall} 700w, ${treatmentRoomLarge} 1200w`,
    sizes: '(min-width: 1024px) 50vw, 100vw',
    width: 1200,
    height: 800,
    alt: 'A dental treatment room with a reclining chair, overhead light and instrument tray',
    caption: 'Treatment room at the G-13 clinic',
  },
  {
    id: 'instruments',
    src: instruments,
    width: 740,
    height: 518,
    alt: 'A dental mirror, probe and tweezers laid out against a plain background',
    caption: 'Sterilised instruments prepared for each appointment',
  },
  {
    id: 'smile',
    src: smile,
    width: 850,
    height: 275,
    alt: 'Close-up of a healthy smile',
    caption: 'Preventive care, maintained over time',
  },
]

/**
 * The hero leads with the treatment room — of the available images it is the
 * only one that looks like a photograph of this specific clinic rather than
 * stock, which makes it both the most honest and the most persuasive choice.
 */
export const heroImage = {
  src: treatmentRoomLarge,
  srcSet: `${treatmentRoomSmall} 700w, ${treatmentRoomLarge} 1200w`,
  sizes: '(min-width: 1024px) 640px, 100vw',
  width: 1200,
  height: 800,
  alt: 'The treatment room at Jaskani Dental Clinic, with a dental chair, overhead light and instrument tray',
}
