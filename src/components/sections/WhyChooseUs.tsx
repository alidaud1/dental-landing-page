import { Container } from '../layout/Container'
import { Icon } from '../ui/Icon'
import { SectionHeading } from '../ui/SectionHeading'

/**
 * Specific, checkable commitments. No "world-class", no superlatives, no
 * claims about equipment or credentials that have not been confirmed.
 */
const pillars = [
  {
    icon: 'message-circle',
    title: 'Explanations you can follow',
    body: 'What the dentist found, what the options are, and what each one involves — described without jargon, and repeated if anything is unclear.',
  },
  {
    icon: 'smile',
    title: 'A gentle, unhurried approach',
    body: 'Appointments are paced so there is room to ask questions. If you are anxious, say so — the team would rather know at the start than halfway through.',
  },
  {
    icon: 'shield-check',
    title: 'Hygiene taken seriously',
    body: 'Instruments are sterilised between patients and single-use items are used where appropriate, as standard clinical practice requires.',
  },
  {
    icon: 'clock',
    title: 'Hours that fit a working week',
    body: 'The clinic stays open until 10 PM daily, so an appointment does not have to mean taking time off work or school.',
  },
  {
    icon: 'users',
    title: 'One clinic for the whole family',
    body: 'Children’s check-ups through to dentures — preventive, restorative and cosmetic treatment handled in the same place.',
  },
  {
    icon: 'clipboard-list',
    title: 'No pressure to proceed',
    body: 'A consultation is a conversation. You are free to take the information away and decide in your own time.',
  },
]

export function WhyChooseUs() {
  return (
    <section
      aria-labelledby="why-title"
      className="border-y border-line bg-surface-mint py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div data-reveal>
          <SectionHeading
            id="why-title"
            eyebrow="Why Jaskani"
            title="Care that is clear, calm and careful."
            description="Six things you can expect on every visit — stated plainly, so you can hold the clinic to them."
            align="center"
          />
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
          {pillars.map((pillar) => (
            <li
              key={pillar.title}
              className="group rounded-2xl border border-line bg-surface-raised p-6 shadow-soft transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"
            >
              <span
                aria-hidden="true"
                className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white"
              >
                <Icon name={pillar.icon} className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-[1.0625rem] font-bold">{pillar.title}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-muted">{pillar.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
