import { useCallback, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { GalleryImage } from '../../data/gallery'
import { useOverlay } from '../../hooks/useOverlay'

interface LightboxProps {
  images: readonly GalleryImage[]
  /** Index of the open image, or null when closed. */
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const open = index !== null
  useOverlay(open, onClose, panelRef)

  const go = useCallback(
    (delta: number) => {
      if (index === null) return
      onNavigate((index + delta + images.length) % images.length)
    },
    [index, images.length, onNavigate],
  )

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') go(1)
      if (event.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, go])

  if (index === null) return null
  const image = images[index]

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-8">
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close image viewer"
        onClick={onClose}
        className="absolute inset-0 bg-ink/85 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Image ${index + 1} of ${images.length}: ${image.caption}`}
        className="relative z-10 flex w-full max-w-4xl flex-col"
      >
        <div className="flex items-center justify-between gap-4 pb-3">
          <p className="text-sm font-medium text-white/70">
            {index + 1} / {images.length}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image viewer"
            className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="(min-width: 640px) 56rem, 100vw"
          width={image.width}
          height={image.height}
          alt={image.alt}
          className="max-h-[70vh] w-full rounded-2xl bg-ink object-contain"
        />

        <div className="flex items-center justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous image"
            className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>

          <p className="text-center text-sm text-white/80">{image.caption}</p>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next image"
            className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
