import type { AppointmentDraft } from './validation'

/**
 * Appointment delivery adapter.
 *
 * Three modes, chosen automatically from the environment:
 *
 *   'web3forms' — VITE_WEB3FORMS_KEY is set. Requests are posted to
 *                 Web3Forms, which emails them to the address registered
 *                 against that key. This is the configured route.
 *   'endpoint'  — VITE_APPOINTMENT_ENDPOINT is set instead. Requests are
 *                 POSTed there as plain JSON. For a custom backend later.
 *   'demo'      — neither is set. The form validates and formats the request
 *                 but tells the visitor plainly that it was NOT sent, and
 *                 offers calling or WhatsApp instead.
 *
 * Setup is documented in README.md. The Web3Forms access key is public by
 * design — it only permits sending to the one address registered with it, and
 * cannot read submissions. Never put a mail password or private API token in
 * any VITE_* variable: those are bundled into the client JavaScript.
 */

const web3formsKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined
const customEndpoint = import.meta.env.VITE_APPOINTMENT_ENDPOINT as string | undefined

const WEB3FORMS_URL = 'https://api.web3forms.com/submit'

export type AppointmentMode = 'web3forms' | 'endpoint' | 'demo'

export const appointmentMode: AppointmentMode = web3formsKey
  ? 'web3forms'
  : customEndpoint
    ? 'endpoint'
    : 'demo'

export type SubmitResult =
  | { status: 'sent' }
  | { status: 'demo' }
  | { status: 'error'; message: string }

/** Plain-text rendering, used for the WhatsApp fallback and the email body. */
export function formatAppointmentMessage(draft: AppointmentDraft): string {
  const lines = [
    'Appointment request — Jaskani Dental Clinic',
    `Name: ${draft.name.trim()}`,
    `Phone: ${draft.phone.trim()}`,
    `Treatment: ${draft.service}`,
  ]
  if (draft.preferredTime.trim()) lines.push(`Preferred time: ${draft.preferredTime.trim()}`)
  if (draft.message.trim()) lines.push(`Message: ${draft.message.trim()}`)
  return lines.join('\n')
}

const CALL_INSTEAD = 'Please call the clinic instead.'

export async function submitAppointment(draft: AppointmentDraft): Promise<SubmitResult> {
  if (appointmentMode === 'demo') return { status: 'demo' }

  try {
    const response = web3formsKey
      ? await fetch(WEB3FORMS_URL, {
          method: 'POST',
          /*
           * FormData, not JSON — and deliberately so.
           *
           * `Content-Type: application/json` makes this a non-simple
           * cross-origin request, so the browser sends a CORS preflight first.
           * Web3Forms answers OPTIONS with a 403 and no Access-Control-Allow-*
           * headers, so the real POST never leaves the browser and the fetch
           * rejects with an opaque network error.
           *
           * multipart/form-data is a "simple" content type: no preflight, the
           * POST goes straight out. This is why the official Web3Forms snippet
           * uses FormData. Do not set a Content-Type header here — the browser
           * must set it itself to include the multipart boundary.
           */
          headers: { Accept: 'application/json' },
          body: toFormData(web3formsPayload(draft, web3formsKey)),
        })
      : await fetch(customEndpoint!, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(jsonPayload(draft)),
        })

    // Web3Forms answers 200 with { success: false } for a rejected key or a
    // tripped spam filter, so the status code alone is not enough.
    if (web3formsKey) {
      const result = (await response.json().catch(() => null)) as
        | { success?: boolean; message?: string }
        | null

      if (!response.ok || !result?.success) {
        return {
          status: 'error',
          message: `The request could not be delivered${
            result?.message ? ` (${result.message})` : ''
          }. ${CALL_INSTEAD}`,
        }
      }

      return { status: 'sent' }
    }

    if (!response.ok) {
      return {
        status: 'error',
        message: `The request could not be delivered (error ${response.status}). ${CALL_INSTEAD}`,
      }
    }

    return { status: 'sent' }
  } catch {
    return {
      status: 'error',
      message: `The request could not be sent — this is usually a connection problem. ${CALL_INSTEAD}`,
    }
  }
}

/* ------------------------------------------------------------------ */

function toFormData(fields: Record<string, string>): FormData {
  const form = new FormData()
  for (const [key, value] of Object.entries(fields)) form.append(key, value)
  return form
}

function jsonPayload(draft: AppointmentDraft) {
  return {
    name: draft.name.trim(),
    phone: draft.phone.trim(),
    service: draft.service,
    preferredTime: draft.preferredTime.trim(),
    message: draft.message.trim(),
    consent: draft.consent,
    submittedAt: new Date().toISOString(),
    source: 'jaskanidentalclinic-website',
  }
}

/**
 * Web3Forms emails every field it receives, using the key order below, so the
 * labels are written for whoever reads the email rather than for a database.
 */
function web3formsPayload(draft: AppointmentDraft, accessKey: string): Record<string, string> {
  return {
    access_key: accessKey,
    subject: `Appointment request — ${draft.name.trim()} (${draft.service})`,
    from_name: 'Jaskani Dental Clinic website',
    Name: draft.name.trim(),
    Phone: draft.phone.trim(),
    Treatment: draft.service,
    'Preferred time': draft.preferredTime.trim() || '—',
    Message: draft.message.trim() || '—',
    'Consented to contact': draft.consent ? 'Yes' : 'No',
    Submitted: new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' }),
    // Web3Forms discards any submission where this is non-empty. The matching
    // input is hidden from both sighted users and screen readers.
    botcheck: '',
  }
}
