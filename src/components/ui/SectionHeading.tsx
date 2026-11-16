import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  id?: string
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  id,
  className,
}: SectionHeadingProps) {
  const dark = tone === 'dark'
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center mx-auto',
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase',
            dark ? 'text-brand-200' : 'text-brand-600',
          )}
        >
          <span
            aria-hidden="true"
            className={cn('h-px w-7', dark ? 'bg-brand-300/60' : 'bg-brand-300')}
          />
          {eyebrow}
        </p>
      )}

      <h2
        id={id}
        className={cn('text-section-title max-w-[22ch]', dark && 'text-white', align === 'center' && 'mx-auto')}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            'max-w-[58ch] text-base leading-relaxed sm:text-lg',
            dark ? 'text-brand-100/85' : 'text-ink-muted',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
