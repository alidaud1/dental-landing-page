import { useState } from 'react'
import { sectionIds } from '../../data/clinic'
import { serviceGroups, services, type Service, type ServiceGroup } from '../../data/services'
import { cn } from '../../lib/cn'
import { Container } from '../layout/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { ServiceCard } from '../ui/ServiceCard'

type Filter = 'All' | ServiceGroup

const filters: readonly Filter[] = ['All', ...serviceGroups]

interface ServicesProps {
  onEnquire: (service: Service) => void
}

export function Services({ onEnquire }: ServicesProps) {
  const [filter, setFilter] = useState<Filter>('All')

  // All twelve fit comfortably in the grid, so filtering is a convenience —
  // never a gate that hides services behind an extra click.
  const visible = filter === 'All' ? services : services.filter((s) => s.group === filter)

  return (
    <section
      id={sectionIds.services}
      aria-labelledby="services-title"
      className="bg-surface py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          data-reveal
        >
          <SectionHeading
            id="services-title"
            eyebrow="Our services"
            title="Complete dental care for every stage of your smile."
            description="Twelve treatments, all offered at the G-13 clinic. Whether a treatment is right for you depends on an examination — these descriptions are a starting point for that conversation."
          />

          <div
            role="group"
            aria-label="Filter services by type"
            className="flex flex-wrap gap-2 lg:shrink-0"
          >
            {filters.map((option) => {
              const active = filter === option
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(option)}
                  className={cn(
                    'inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors',
                    active
                      ? 'border-brand-600 bg-brand-600 text-white'
                      : 'border-line-strong text-ink-soft hover:border-brand-400 hover:text-brand-700',
                  )}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>

        {/* A short status line, rather than a live region on the list itself —
            otherwise every filter change re-announces all twelve cards. */}
        <p aria-live="polite" className="sr-only">
          Showing {visible.length} of {services.length} services
          {filter === 'All' ? '' : ` in ${filter}`}.
        </p>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
          {visible.map((service) => (
            <ServiceCard key={service.id} service={service} onEnquire={onEnquire} />
          ))}
        </ul>

        <p className="mt-8 max-w-[62ch] text-sm leading-relaxed text-ink-muted">
          Looking for something not listed? Call the clinic and ask — it is quicker than guessing
          from a website.
        </p>
      </Container>
    </section>
  )
}
