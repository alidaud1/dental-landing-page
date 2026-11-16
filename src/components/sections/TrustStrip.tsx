import { trustFacts } from '../../data/clinic'
import { Container } from '../layout/Container'
import { Icon } from '../ui/Icon'

/**
 * Verified practical facts, not fabricated counters. There is no confirmed
 * patient count, years-in-practice figure or rating to show here, so none
 * is shown.
 */
export function TrustStrip() {
  return (
    <section aria-label="Clinic at a glance" className="border-y border-line bg-surface-raised">
      <Container className="py-8 sm:py-10">
        <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {trustFacts.map((fact) => (
            <li key={fact.label} className="flex items-start gap-3.5">
              <span
                aria-hidden="true"
                className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600"
              >
                <Icon name={fact.icon} className="size-5" />
              </span>
              <div>
                <p className="font-display text-[0.9375rem] font-bold text-ink">{fact.label}</p>
                <p className="mt-1 text-sm leading-snug text-ink-muted">{fact.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
