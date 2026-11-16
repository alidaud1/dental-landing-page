import { clinic } from './clinic'

export interface Faq {
  id: string
  question: string
  answer: string
}

/**
 * Answers deliberately avoid exact prices, clinical guarantees and
 * "completely painless" style claims, and point the reader back to the
 * clinic for anything that depends on an actual assessment.
 */
export const faqs: readonly Faq[] = [
  {
    id: 'services',
    question: 'What dental services are available at Jaskani Dental Clinic?',
    answer:
      'The clinic offers preventive care such as consultations, scaling and polishing, oral prophylaxis and fluoride treatment; restorative treatments including fillings, root canal treatment, extractions, crowns, bridges and dentures; and cosmetic options such as teeth whitening and smile design. If you are looking for something not listed here, please call to ask.',
  },
  {
    id: 'booking',
    question: 'How do I book an appointment?',
    answer: `You can call ${clinic.phone.display} during clinic hours, or send an appointment request using the form on this page. A request is not a confirmed booking — the clinic will contact you to agree a time.`,
  },
  {
    id: 'location',
    question: 'Where is the clinic located?',
    answer: `${clinic.address.full}. The "Get Directions" link on this page opens the location in Google Maps.`,
  },
  {
    id: 'hours',
    question: 'What are the clinic’s opening hours?',
    answer: `${clinic.hours.detail}. ${clinic.hours.note}`,
  },
  {
    id: 'which-treatment',
    question: 'How do I know which treatment I need?',
    answer:
      'That depends on an examination. The dentist will look at the tooth or area you are concerned about, explain what they find, and set out the options along with what each one involves. Nothing is decided for you — you choose how to proceed.',
  },
  {
    id: 'costs',
    question: 'Can I ask about treatment costs before proceeding?',
    answer:
      'Yes. Ask at any point, and ask again if something is unclear. Costs depend on what the treatment actually involves, so a reliable figure usually follows an examination rather than preceding it. You are under no obligation to proceed after a consultation.',
  },
  {
    id: 'first-visit',
    question: 'What should I expect during a first consultation?',
    answer:
      'A conversation about what brought you in, an examination, and an explanation of what the dentist has found. If treatment is recommended, you will hear what it involves, roughly how long it takes and what the alternatives are before anything is scheduled.',
  },
  {
    id: 'anxiety',
    question: 'I am nervous about dental treatment. What can I do?',
    answer:
      'Tell the team when you arrive, or mention it in your appointment request. Knowing in advance lets the dentist explain each step before it happens and work at a pace you are comfortable with. Local anaesthetic is used where appropriate, though no dental procedure can be promised to be entirely free of discomfort.',
  },
]
