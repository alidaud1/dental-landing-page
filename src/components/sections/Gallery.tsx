import { useState } from 'react'
import { Maximize2 } from 'lucide-react'
import { sectionIds } from '../../data/clinic'
import { galleryImages } from '../../data/gallery'
import { Container } from '../layout/Container'
import { Lightbox } from '../ui/Lightbox'
import { SectionHeading } from '../ui/SectionHeading'

/**
 * Three images rather than a padded grid. None shows clinic staff, so none can
 * misrepresent who works here — see the note in data/gallery.ts. Captions and
 * alt text describe only what is in frame. See CONTENT_REVIEW.md §5.
 */
export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      id={sectionIds.gallery}
      aria-labelledby="gallery-title"
      className="bg-surface py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div data-reveal>
          <SectionHeading
            id="gallery-title"
            eyebrow="Inside the clinic"
            title="A calm, clean place to be treated."
            description="A short look at the G-13 clinic and how treatment is set up. Select any image to view it larger."
          />
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-12" data-reveal-stagger>
          {galleryImages.map((image, index) => (
            <li
              key={image.id}
              /* The clinic photo takes the wide slot — it is the one
                 authentic image, so it earns the space. */
              className={index === 0 ? 'lg:col-span-7 lg:row-span-2' : 'lg:col-span-5'}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="group relative block h-full w-full overflow-hidden rounded-card border border-line bg-brand-50 text-left"
              >
                <img
                  src={image.src}
                  srcSet={image.srcSet}
                  sizes={image.sizes ?? '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
                  width={image.width}
                  height={image.height}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
                    index === 0 ? 'aspect-[4/3] lg:h-full' : 'aspect-[16/10]'
                  }`}
                />

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95"
                />

                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                  <span className="flex flex-col gap-1">
                    <span aria-hidden="true" className="label-clinical text-white/60">
                      FIG. {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-medium text-white drop-shadow">
                      {image.caption}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-[background-color,transform] duration-300 group-hover:scale-110 group-hover:bg-white/30"
                  >
                    <Maximize2 className="size-4" />
                  </span>
                </span>

                <span className="sr-only">View larger: {image.caption}</span>
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-[62ch] text-sm leading-relaxed text-ink-muted">
          These images show the clinic, its instruments and general dental care. No photograph on
          this page shows a patient or a member of the clinic team.
        </p>
      </Container>

      <Lightbox
        images={galleryImages}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  )
}
