/**
 * The twelve services listed on the existing Jaskani website.
 *
 * Descriptions are informational, not diagnostic: they say what a treatment
 * generally involves, never that it is right for a particular reader, and
 * never that an outcome is guaranteed or that a procedure is painless.
 */

export type ServiceGroup = 'Preventive' | 'Restorative' | 'Cosmetic'

export interface Service {
  id: string
  name: string
  group: ServiceGroup
  /** Lucide icon name, resolved in ui/Icon.tsx */
  icon: string
  description: string
}

export const serviceGroups: readonly ServiceGroup[] = ['Preventive', 'Restorative', 'Cosmetic']

/**
 * Each group's panel in the services showcase: which anatomical diagram to
 * draw, and a plain-language summary of what the group is for.
 *
 * `code` is a display label only — it is not a real clinical coding system,
 * and is written so it cannot be mistaken for one.
 */
export const groupDetails: Record<
  ServiceGroup,
  { diagram: 'preventive' | 'restorative' | 'cosmetic'; code: string; summary: string }
> = {
  Preventive: {
    diagram: 'preventive',
    code: 'GROUP 01',
    summary:
      'Keeping healthy teeth healthy. Regular cleaning and check-ups catch problems while they are still small and cheap to treat.',
  },
  Restorative: {
    diagram: 'restorative',
    code: 'GROUP 02',
    summary:
      'Repairing damage that has already happened — decay, fracture or a missing tooth — to bring back normal function.',
  },
  Cosmetic: {
    diagram: 'cosmetic',
    code: 'GROUP 03',
    summary:
      'Changing how teeth look, planned and agreed with you before any work begins. Results vary between individuals.',
  },
}

export const services: readonly Service[] = [
  {
    id: 'dental-consultation',
    name: 'Dental Consultation',
    group: 'Preventive',
    icon: 'stethoscope',
    description:
      'A check-up and discussion of your concerns, so you understand what is happening and what the options are.',
  },
  {
    id: 'scaling-polishing',
    name: 'Scaling & Polishing',
    group: 'Preventive',
    icon: 'sparkles',
    description:
      'Professional cleaning that removes plaque and hardened deposits from around the gum line.',
  },
  {
    id: 'oral-prophylaxis',
    name: 'Oral Prophylaxis',
    group: 'Preventive',
    icon: 'shield-check',
    description:
      'Routine preventive cleaning and gum care, usually recommended on a regular schedule.',
  },
  {
    id: 'fluoride-treatment',
    name: 'Fluoride Treatment',
    group: 'Preventive',
    icon: 'droplets',
    description:
      'A topical application intended to help strengthen enamel and reduce the risk of decay.',
  },
  {
    id: 'composite-filling',
    name: 'Tooth & Composite Filling',
    group: 'Restorative',
    icon: 'layers',
    description:
      'Tooth-coloured material used to restore the shape and function of a decayed or damaged tooth.',
  },
  {
    id: 'root-canal',
    name: 'Root Canal Treatment',
    group: 'Restorative',
    icon: 'activity',
    description:
      'Treatment of an infected or inflamed tooth pulp, carried out with local anaesthetic.',
  },
  {
    id: 'rct-consultation',
    name: 'RCT Consultation',
    group: 'Restorative',
    icon: 'clipboard-list',
    description:
      'An assessment to determine whether root canal treatment is appropriate and how it would be planned.',
  },
  {
    id: 'tooth-extraction',
    name: 'Tooth Extraction',
    group: 'Restorative',
    icon: 'scissors',
    description:
      'Removal of a tooth when it cannot be saved, with aftercare guidance for healing.',
  },
  {
    id: 'crown-bridge',
    name: 'Crown & Bridge',
    group: 'Restorative',
    icon: 'crown',
    description:
      'Fixed restorations that cover a damaged tooth or replace a missing one between healthy teeth.',
  },
  {
    id: 'dentures',
    name: 'Dentures',
    group: 'Restorative',
    icon: 'smile',
    description:
      'Removable full or partial replacements for missing teeth, fitted and adjusted over several visits.',
  },
  {
    id: 'teeth-whitening',
    name: 'Teeth Whitening',
    group: 'Cosmetic',
    icon: 'sun',
    description:
      'Professional whitening to lighten surface staining. Results vary between individuals.',
  },
  {
    id: 'smile-design',
    name: 'Smile Design',
    group: 'Cosmetic',
    icon: 'wand-sparkles',
    description:
      'A planned combination of cosmetic treatments, discussed and agreed with you before any work begins.',
  },
]
