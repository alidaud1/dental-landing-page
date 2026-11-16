import { useId, useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface AccordionItem {
  id: string
  question: string
  answer: string
}

interface AccordionProps {
  items: readonly AccordionItem[]
  /**
   * Optional panel to open on first render. Omit it — as the FAQ section does —
   * so every panel starts closed and the list reads as a scannable index of
   * questions rather than one pre-answered question plus a list.
   */
  defaultOpenId?: string
}

export function Accordion({ items, defaultOpenId }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null)
  const baseId = useId()

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => {
        const isOpen = openId === item.id
        const buttonId = `${baseId}-${item.id}-trigger`
        const panelId = `${baseId}-${item.id}-panel`

        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className={cn(
                  'group flex w-full items-start justify-between gap-5 py-5 text-left',
                  'text-base font-semibold transition-colors sm:text-lg',
                  isOpen ? 'text-brand-700' : 'text-ink hover:text-brand-700',
                )}
              >
                <span className="max-w-[48ch]">{item.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300',
                    isOpen
                      ? 'rotate-45 border-brand-600 bg-brand-600 text-white'
                      : 'border-line-strong text-ink-muted group-hover:border-brand-400 group-hover:text-brand-600',
                  )}
                >
                  <Plus className="size-4" strokeWidth={2} />
                </span>
              </button>
            </h3>

            {/* Grid-rows trick animates to the panel's natural height without JS measurement. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              /* `inert` (not `hidden`) keeps the collapse animation while taking
                 the closed panel out of the tab order and the a11y tree. */
              inert={!isOpen}
              className={cn(
                'grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-[62ch] pb-6 text-[0.975rem] leading-relaxed text-ink-muted">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
