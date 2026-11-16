import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { sectionIds } from '../../data/clinic'
import {
  groupDetails,
  serviceGroups,
  services,
  type Service,
  type ServiceGroup,
} from '../../data/services'
import { cn } from '../../lib/cn'
import { Container } from '../layout/Container'
import { Icon } from '../ui/Icon'
import { SectionHeading } from '../ui/SectionHeading'
import { ToothDiagram } from '../ui/ToothDiagram'

interface ServicesProps {
  onEnquire: (service: Service) => void
}

/**
 * Services as a scroll showcase rather than twelve identical cards.
 *
 * On desktop the left panel is sticky: as each group's services scroll past on
 * the right, the panel swaps to that group's anatomical diagram and summary.
 * Below `lg` the panel is not sticky and the groups simply stack, because a
 * pinned panel on a short viewport costs more than it gives.
 *
 * The grouping is real structure, not decoration — preventive, restorative and
 * cosmetic is how a dentist would actually sort these twelve treatments.
 */
export function Services({ onEnquire }: ServicesProps) {
  const [activeGroup, setActiveGroup] = useState<ServiceGroup>(serviceGroups[0])
  const groupRefs = useRef(new Map<ServiceGroup, HTMLElement>())

  useEffect(() => {
    const elements = Array.from(groupRefs.current.entries())
    if (elements.length === 0 || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick whichever group currently covers most of the tracking band, so
        // the panel does not flicker at the boundary between two groups.
        let best: ServiceGroup | null = null
        let bestRatio = 0
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const group = entry.target.getAttribute('data-group') as ServiceGroup | null
          if (group && entry.intersectionRatio > bestRatio) {
            best = group
            bestRatio = entry.intersectionRatio
          }
        }
        if (best) setActiveGroup(best)
      },
      { rootMargin: '-30% 0px -40% 0px', threshold: [0, 0.3, 0.6, 1] },
    )

    elements.forEach(([, element]) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const detail = groupDetails[activeGroup]

  return (
    <section
      id={sectionIds.services}
      aria-labelledby="services-title"
      /* No `overflow-hidden` here: any ancestor with a non-visible overflow
         becomes the sticky element's scroll container, which silently stops
         the panel below from sticking. The grid overlay is inset-0 absolute,
         so it cannot escape the section anyway. */
      className="relative bg-surface py-16 sm:py-20 lg:py-24"
    >
      {/* Measured grid, faded out at the edges so it reads as texture. */}
      <div
        aria-hidden="true"
        className="clinical-grid pointer-events-none absolute inset-0 opacity-45 [mask-image:radial-gradient(70%_55%_at_50%_40%,black,transparent)]"
      />

      <Container className="relative">
        <div data-reveal>
          <SectionHeading
            id="services-title"
            eyebrow="Our services"
            title="Complete dental care for every stage of your smile."
            description="Twelve treatments, grouped the way a dentist would sort them. Whether any one of them is right for you depends on an examination — these are a starting point for that conversation."
          />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          {/* ---------- Sticky panel ----------
              The grid item must stay full height (no `self-start`), otherwise
              it shrinks to the panel's own height and the sticky element has
              no track to travel along — it would unstick immediately. */}
          <div>
            <div className="lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-panel border border-line bg-surface-raised p-6 shadow-soft sm:p-7">
                <p className="label-clinical text-clinical">{detail.code}</p>

                <h3 className="mt-3 font-display text-2xl font-bold">{activeGroup}</h3>

                <p className="mt-3 min-h-[4.5rem] text-[0.9375rem] leading-relaxed text-ink-muted">
                  {detail.summary}
                </p>

                {/*
                  The three diagrams are all mounted and cross-faded rather than
                  swapped, so switching groups never flashes an empty panel while
                  an SVG mounts.
                */}
                <div className="relative mx-auto mt-5 aspect-[132/118] w-full max-w-[15rem] text-clinical">
                  {serviceGroups.map((group) => (
                    <div
                      key={group}
                      aria-hidden={group !== activeGroup}
                      className={cn(
                        'absolute inset-0 transition-all duration-500 ease-out',
                        group === activeGroup
                          ? 'scale-100 opacity-100'
                          : 'pointer-events-none scale-95 opacity-0',
                      )}
                    >
                      <ToothDiagram variant={groupDetails[group].diagram} />
                    </div>
                  ))}
                </div>

                {/* Progress through the three groups. */}
                <div className="mt-6 flex items-center gap-2">
                  {serviceGroups.map((group) => (
                    <span
                      key={group}
                      className={cn(
                        'h-0.5 flex-1 rounded-full transition-colors duration-500',
                        group === activeGroup ? 'bg-brand-600' : 'bg-line-strong',
                      )}
                    />
                  ))}
                </div>
                <p className="mt-2.5 label-clinical text-ink-muted">
                  {serviceGroups.indexOf(activeGroup) + 1} of {serviceGroups.length} ·{' '}
                  {services.filter((s) => s.group === activeGroup).length} treatments
                </p>
              </div>
            </div>
          </div>

          {/* ---------- Scrolling groups ----------
              Trailing padding extends the sticky track so the panel stays
              pinned while the last group is still being read. */}
          <div className="flex flex-col gap-14 lg:pb-40">
            {serviceGroups.map((group) => {
              const groupServices = services.filter((service) => service.group === group)

              return (
                <section
                  key={group}
                  data-group={group}
                  aria-labelledby={`group-${group}`}
                  ref={(element) => {
                    if (element) groupRefs.current.set(group, element)
                    else groupRefs.current.delete(group)
                  }}
                >
                  <div className="flex items-baseline gap-4 border-b border-line pb-3">
                    <h3 id={`group-${group}`} className="font-display text-lg font-bold">
                      {group}
                    </h3>
                    <span aria-hidden="true" className="clinical-ticks h-2 flex-1 opacity-60" />
                    <span className="label-clinical text-ink-muted">
                      {String(groupServices.length).padStart(2, '0')}
                    </span>
                  </div>

                  <ul className="mt-5 grid gap-4 sm:grid-cols-2" data-reveal-stagger>
                    {groupServices.map((service) => (
                      <ServiceRow key={service.id} service={service} onEnquire={onEnquire} />
                    ))}
                  </ul>
                </section>
              )
            })}
          </div>
        </div>

        <p className="mt-12 max-w-[62ch] text-sm leading-relaxed text-ink-muted">
          Looking for something not listed? Call the clinic and ask — it is quicker than guessing
          from a website.
        </p>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function ServiceRow({
  service,
  onEnquire,
}: {
  service: Service
  onEnquire: (service: Service) => void
}) {
  return (
    <li className="group relative flex flex-col rounded-card border border-line bg-surface-raised p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift">
      {/* Hairline that draws across the top edge on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-brand-500 transition-transform duration-400 ease-out group-hover:scale-x-100"
      />

      <span
        aria-hidden="true"
        className="grid size-10 place-items-center rounded-card bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white"
      >
        <Icon name={service.icon} className="size-5" />
      </span>

      <h4 className="mt-4 font-display text-[1rem] font-bold">{service.name}</h4>
      <p className="mt-2 grow text-sm leading-relaxed text-ink-muted">{service.description}</p>

      <button
        type="button"
        onClick={() => onEnquire(service)}
        className="mt-4 inline-flex min-h-10 w-fit items-center gap-1.5 self-start rounded-full text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
      >
        Enquire
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
        <span className="sr-only"> about {service.name} — opens the appointment form</span>
      </button>
    </li>
  )
}
