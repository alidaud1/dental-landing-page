export interface AppointmentDraft {
  name: string
  phone: string
  service: string
  preferredTime: string
  message: string
  consent: boolean
}

export type AppointmentErrors = Partial<Record<keyof AppointmentDraft, string>>

/**
 * Accepts the Pakistani mobile formats people actually type, in any of:
 *   03151932127 · 0315-193-2127 · 0315 1932127
 *   +923151932127 · 0092 315 1932127 · 923151932127
 * Separators (spaces, dashes, dots, brackets) are ignored before checking.
 * Deliberately permissive — rejecting a real number costs the clinic a patient.
 */
export function isValidPakistaniPhone(raw: string): boolean {
  const digits = raw.replace(/[\s\-().]/g, '')
  if (!/^\+?\d+$/.test(digits)) return false

  const normalised = digits
    .replace(/^\+/, '')
    .replace(/^0092/, '92')
    .replace(/^92/, '0')

  // Mobile numbers: 03xx followed by 7 digits. Landlines: 0 + area + 6-8 digits.
  return /^03\d{9}$/.test(normalised) || /^0\d{9,10}$/.test(normalised)
}

export function validateAppointment(draft: AppointmentDraft): AppointmentErrors {
  const errors: AppointmentErrors = {}

  const name = draft.name.trim()
  if (!name) {
    errors.name = 'Please enter your name so the clinic knows who to call back.'
  } else if (name.length < 2) {
    errors.name = 'Please enter your full name.'
  }

  const phone = draft.phone.trim()
  if (!phone) {
    errors.phone = 'A phone number is required — the clinic confirms appointments by phone.'
  } else if (!isValidPakistaniPhone(phone)) {
    errors.phone = 'That does not look like a valid number. Try 0315 1932127 or +92 315 1932127.'
  }

  if (!draft.service) {
    errors.service = 'Please choose what the appointment is for.'
  }

  if (draft.message.length > 1000) {
    errors.message = 'Please keep your message under 1000 characters.'
  }

  if (!draft.consent) {
    errors.consent = 'Please confirm the clinic may contact you about this request.'
  }

  return errors
}
