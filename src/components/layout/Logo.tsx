import { clinic, sectionIds } from '../../data/clinic'
import { cn } from '../../lib/cn'

/**
 * No original Jaskani logo file was available, so this is a typographic
 * wordmark built from the brand palette. Swap in the real mark when the clinic
 * provides one (see CONTENT_REVIEW.md).
 */
export function Logo({ tone = 'light', className }: { tone?: 'light' | 'dark'; className?: string }) {
  const dark = tone === 'dark'

  return (
    <a
      href={`#${sectionIds.home}`}
      className={cn('group inline-flex shrink-0 items-center gap-3 rounded-lg', className)}
      aria-label={`${clinic.name} — back to top`}
    >
      <span
        aria-hidden="true"
        className={cn(
          'grid size-10 shrink-0 place-items-center rounded-xl transition-colors',
          dark ? 'bg-white/10 text-brand-100' : 'bg-brand-600 text-white',
        )}
      >
        <ToothMark className="size-5" />
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-[1.0625rem] font-bold tracking-tight',
            dark ? 'text-white' : 'text-ink',
          )}
        >
          Jaskani
        </span>
        <span
          className={cn(
            'mt-1 text-[0.6875rem] font-medium tracking-[0.17em] whitespace-nowrap uppercase',
            dark ? 'text-brand-200' : 'text-brand-600',
          )}
        >
          Dental Clinic
        </span>
      </span>
    </a>
  )
}

function ToothMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3.2c-1.6 0-2.3.7-3.9.7-2.3 0-4.1 1.6-4.1 4.3 0 2.2.8 3.6 1.4 5.4.5 1.5.7 3 .9 4.6.2 1.4.6 2.6 1.6 2.6 1.1 0 1.4-1.1 1.7-2.6.3-1.6.6-3.1 1.4-3.1s1.1 1.5 1.4 3.1c.3 1.5.6 2.6 1.7 2.6 1 0 1.4-1.2 1.6-2.6.2-1.6.4-3.1.9-4.6.6-1.8 1.4-3.2 1.4-5.4 0-2.7-1.8-4.3-4.1-4.3-1.6 0-2.3-.7-3.9-.7Z"
        fill="currentColor"
      />
    </svg>
  )
}
