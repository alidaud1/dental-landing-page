import { ArrowRight } from 'lucide-react'
import type { Service } from '../../data/services'
import { Icon } from './Icon'

interface ServiceCardProps {
  service: Service
  /** Called when the visitor wants to enquire — pre-selects this treatment in the form. */
  onEnquire: (service: Service) => void
}

export function ServiceCard({ service, onEnquire }: ServiceCardProps) {
  return (
    <li className="group flex flex-col rounded-2xl border border-line bg-surface-raised p-6 shadow-soft transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift">
      <div className="flex items-start justify-between gap-4">
        <span
          aria-hidden="true"
          className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white"
        >
          <Icon name={service.icon} className="size-5" />
        </span>
        <span className="rounded-full bg-surface-mint px-2.5 py-1 text-[0.6875rem] font-semibold tracking-wide text-brand-700 uppercase">
          {service.group}
        </span>
      </div>

      <h3 className="mt-5 font-display text-[1.0625rem] font-bold">{service.name}</h3>
      <p className="mt-2.5 grow text-[0.9375rem] leading-relaxed text-ink-muted">
        {service.description}
      </p>

      <button
        type="button"
        onClick={() => onEnquire(service)}
        className="mt-5 inline-flex min-h-10 w-fit items-center gap-1.5 self-start rounded-full text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
      >
        Enquire about this
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
        <span className="sr-only"> — opens the appointment form</span>
      </button>
    </li>
  )
}
