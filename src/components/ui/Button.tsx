import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 ' +
  'disabled:cursor-not-allowed disabled:opacity-60 select-none'

const variants: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800',
  secondary:
    'bg-surface-raised text-ink border border-line-strong hover:border-brand-400 hover:text-brand-700 active:bg-brand-50',
  ghost: 'text-brand-700 hover:bg-brand-50 active:bg-brand-100',
  onDark: 'bg-white text-brand-800 hover:bg-brand-50 active:bg-brand-100',
}

/** Minimum 44px tall at both sizes, so touch targets stay comfortable. */
const sizes: Record<Size, string> = {
  md: 'min-h-11 px-5 py-2.5 text-sm',
  lg: 'min-h-13 px-7 py-3.5 text-base',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>
type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>

/** Use for actions — submitting, opening a dialog, toggling state. */
export function Button({ variant = 'primary', size = 'md', className, children, ...rest }: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  )
}

/** Use for navigation — anchors, tel:, wa.me, external links. */
export function ButtonLink({ variant = 'primary', size = 'md', className, children, ...rest }: LinkProps) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </a>
  )
}
