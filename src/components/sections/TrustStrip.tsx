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
        <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4" data-reveal-stagger>
          {trustFacts.map((fact) => (
            <li
              key={fact.label}
              className="group relative flex items-start gap-3.5 lg:pl-5"
            >
              {/* Hairline divider between columns, as on a spec sheet. */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 hidden w-px bg-line lg:block"
              />
              <span
                aria-hidden="true"
                className="grid size-10 shrink-0 place-items-center rounded-card bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white"
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
