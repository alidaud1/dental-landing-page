import { useEffect, useId, useRef, useState } from 'react'
import { AlertCircle, CheckCircle2, Info, Loader2, MessageCircle, Phone } from 'lucide-react'
import { clinic } from '../../data/clinic'
import type { Enquiry } from '../../lib/enquiry'
import { services } from '../../data/services'
import {
  appointmentMode,
  formatAppointmentMessage,
  submitAppointment,
} from '../../lib/appointmentService'
import { cn } from '../../lib/cn'
import {
  validateAppointment,
  type AppointmentDraft,
  type AppointmentErrors,
} from '../../lib/validation'
import { Button, ButtonLink } from './Button'

const emptyDraft: AppointmentDraft = {
  name: '',
  phone: '',
  service: '',
  preferredTime: '',
  message: '',
  consent: false,
}

type Status = 'idle' | 'submitting' | 'sent' | 'demo' | 'error'

interface AppointmentFormProps {
  /** Set when a visitor uses a service card's Enquire action. */
  enquiry?: Enquiry
}

export function AppointmentForm({ enquiry }: AppointmentFormProps) {
  const [draft, setDraft] = useState<AppointmentDraft>(emptyDraft)
  const [errors, setErrors] = useState<AppointmentErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [lastDraft, setLastDraft] = useState<AppointmentDraft | null>(null)

  const formId = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const field = (name: string) => `${formId}-${name}`

  /*
   * A service card's Enquire action pre-fills the treatment.
   *
   * This adjusts state during render rather than in an effect: the new value
   * is derived entirely from a changed prop, so React can re-render
   * immediately without the extra commit-then-render pass an effect would
   * cost. Moving focus is a genuine DOM side effect and stays in the effect
   * below.
   */
  const [seenNonce, setSeenNonce] = useState<number | undefined>(enquiry?.nonce)
  if (enquiry && enquiry.nonce !== seenNonce) {
    setSeenNonce(enquiry.nonce)
    setDraft((current) => ({ ...current, service: enquiry.service }))
    setErrors((current) => ({ ...current, service: undefined }))
    setStatus('idle')
  }

  const enquiryNonce = enquiry?.nonce
  useEffect(() => {
    if (enquiryNonce === undefined) return
    // Focus once the smooth scroll has settled, so the page does not jump.
    const nameInput = formRef.current?.querySelector<HTMLInputElement>('input[name="name"]')
    const timer = window.setTimeout(() => nameInput?.focus({ preventScroll: true }), 500)
    return () => window.clearTimeout(timer)
  }, [enquiryNonce])

  const update = <K extends keyof AppointmentDraft>(key: K, value: AppointmentDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }))
    // Clear a field's error as soon as the visitor edits it.
    setErrors((current) => (current[key] ? { ...current, [key]: undefined } : current))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return // guards against double submission

    const found = validateAppointment(draft)
    setErrors(found)

    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0]
      formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus()
      return
    }

    setStatus('submitting')
    const result = await submitAppointment(draft)

    if (result.status === 'sent') {
      setLastDraft(draft)
      setStatus('sent')
      setDraft(emptyDraft)
    } else if (result.status === 'demo') {
      setLastDraft(draft)
      setStatus('demo')
    } else {
      setErrorMessage(result.message)
      setStatus('error')
    }
  }

  const submitting = status === 'submitting'

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[1.5rem] border border-line bg-surface-raised p-6 shadow-soft sm:p-8"
    >
      <h3 className="font-display text-xl font-bold">Request an appointment</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        Send your details and the clinic will call you back to confirm a time. This is a request,
        not a confirmed booking.
      </p>

      <div className="mt-7 flex flex-col gap-5">
        <Field
          id={field('name')}
          label="Full name"
          error={errors.name}
          required
        >
          <input
            id={field('name')}
            name="name"
            type="text"
            autoComplete="name"
            value={draft.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${field('name')}-error` : undefined}
            className={inputClass(Boolean(errors.name))}
            placeholder="e.g. Ahmed Khan"
          />
        </Field>

        <Field
          id={field('phone')}
          label="Phone number"
          hint="The clinic confirms appointments by phone."
          error={errors.phone}
          required
        >
          <input
            id={field('phone')}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={draft.phone}
            onChange={(e) => update('phone', e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={cn(
              `${field('phone')}-hint`,
              errors.phone ? `${field('phone')}-error` : '',
            )}
            className={inputClass(Boolean(errors.phone))}
            placeholder="0315 1932127"
          />
        </Field>

        <Field
          id={field('service')}
          label="What is the appointment for?"
          error={errors.service}
          required
        >
          <select
            id={field('service')}
            name="service"
            value={draft.service}
            onChange={(e) => update('service', e.target.value)}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? `${field('service')}-error` : undefined}
            className={cn(inputClass(Boolean(errors.service)), 'appearance-none bg-no-repeat pr-10')}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235a6b68' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
              backgroundPosition: 'right 1rem center',
            }}
          >
            <option value="">Select a treatment or reason…</option>
            {services.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name}
              </option>
            ))}
            <option value="Something else">Something else / not sure</option>
          </select>
        </Field>

        <Field
          id={field('time')}
          label="Preferred day or time"
          hint="Optional. The clinic will do its best to match it."
        >
          <input
            id={field('time')}
            name="preferredTime"
            type="text"
            value={draft.preferredTime}
            onChange={(e) => update('preferredTime', e.target.value)}
            aria-describedby={`${field('time')}-hint`}
            className={inputClass(false)}
            placeholder="e.g. weekday evenings, after 7 PM"
          />
        </Field>

        <Field
          id={field('message')}
          label="Anything else to mention?"
          hint="Optional. Symptoms, nervousness about treatment, accessibility needs."
          error={errors.message}
        >
          <textarea
            id={field('message')}
            name="message"
            rows={4}
            value={draft.message}
            onChange={(e) => update('message', e.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={cn(
              `${field('message')}-hint`,
              errors.message ? `${field('message')}-error` : '',
            )}
            className={cn(inputClass(Boolean(errors.message)), 'resize-y')}
            placeholder="Tell the clinic anything that would help before your visit."
          />
        </Field>

        <div>
          <label
            htmlFor={field('consent')}
            className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-soft"
          >
            <input
              id={field('consent')}
              name="consent"
              type="checkbox"
              checked={draft.consent}
              onChange={(e) => update('consent', e.target.checked)}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? `${field('consent')}-error` : undefined}
              className="mt-px size-6 shrink-0 cursor-pointer rounded border-line-strong accent-brand-600"
            />
            <span>
              I agree that {clinic.name} may contact me by phone or WhatsApp about this appointment
              request. <span className="text-brand-700">*</span>
            </span>
          </label>
          {errors.consent && <ErrorText id={`${field('consent')}-error`}>{errors.consent}</ErrorText>}
        </div>
      </div>

      {/* Spam honeypot. Hidden from sighted users and from screen readers, and
          never focusable — only a bot fills it in, and Web3Forms discards any
          submission where it is non-empty. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <Button type="submit" size="lg" className="mt-7 w-full" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending request…
          </>
        ) : (
          'Send appointment request'
        )}
      </Button>

      {/* Status messages are announced to screen readers as they appear. */}
      <div aria-live="polite" className="mt-5 empty:mt-0">
        {status === 'sent' && (
          <Notice tone="success" icon={CheckCircle2} title="Request sent">
            The clinic has your details and will call you back on {lastDraft?.phone} to confirm a
            time. If you need to be seen sooner, call {clinic.phone.display}.
          </Notice>
        )}

        {status === 'demo' && lastDraft && (
          <Notice tone="warning" icon={Info} title="Not sent — this form has no backend yet">
            <p>
              Your details were checked and formatted, but this site has no appointment backend
              configured, so <strong>nothing was delivered to the clinic</strong>. Use one of the
              options below to reach them directly.
            </p>
            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
              <ButtonLink href={clinic.phone.href} variant="primary">
                <Phone className="size-4" aria-hidden="true" />
                Call {clinic.phone.display}
              </ButtonLink>
              <ButtonLink
                href={`${clinic.whatsapp.href}?text=${encodeURIComponent(formatAppointmentMessage(lastDraft))}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Open in WhatsApp
              </ButtonLink>
            </div>
            <p className="mt-3 text-xs">
              The WhatsApp option opens a pre-filled message — you still need to press send. The
              clinic has not confirmed that WhatsApp is active on this number.
            </p>
          </Notice>
        )}

        {status === 'error' && (
          <Notice tone="error" icon={AlertCircle} title="Could not send">
            <p>{errorMessage}</p>
            <ButtonLink href={clinic.phone.href} variant="primary" className="mt-4">
              <Phone className="size-4" aria-hidden="true" />
              Call {clinic.phone.display}
            </ButtonLink>
          </Notice>
        )}
      </div>

      {appointmentMode === 'demo' && status === 'idle' && (
        <p className="mt-5 flex gap-2 rounded-xl bg-accent-soft px-4 py-3 text-xs leading-relaxed text-accent">
          <Info className="mt-px size-4 shrink-0" aria-hidden="true" />
          <span>
            <strong>Demo mode.</strong> No appointment backend is configured, so submitting this
            form will not contact the clinic. To book now, call {clinic.phone.display}.
          </span>
        </p>
      )}
    </form>
  )
}

/* ------------------------------------------------------------------ */

function inputClass(hasError: boolean): string {
  return cn(
    'w-full rounded-xl border bg-surface px-4 py-3 text-[0.9375rem] text-ink transition-colors',
    'placeholder:text-ink-muted/60 focus:bg-surface-raised',
    hasError
      ? 'border-red-500/70 focus-visible:outline-red-600'
      : 'border-line-strong hover:border-brand-300',
  )
}

interface FieldProps {
  id: string
  label: string
  hint?: string
  error?: string
  required?: boolean
  children: React.ReactNode
}

function Field({ id, label, hint, error, required, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="text-brand-700">
              {' '}
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mb-2 text-xs text-ink-muted">
          {hint}
        </p>
      )}
      {children}
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  )
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-xs font-medium text-red-700">
      {/* An icon as well as colour, so state is never communicated by colour alone. */}
      <AlertCircle className="mt-px size-3.5 shrink-0" aria-hidden="true" />
      {children}
    </p>
  )
}

const noticeTones = {
  success: 'border-brand-300 bg-brand-50 text-brand-800',
  warning: 'border-accent/30 bg-accent-soft text-accent',
  error: 'border-red-300 bg-red-50 text-red-800',
} as const

interface NoticeProps {
  tone: keyof typeof noticeTones
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
  title: string
  children: React.ReactNode
}

function Notice({ tone, icon: IconComponent, title, children }: NoticeProps) {
  return (
    <div className={cn('rounded-xl border p-4 text-sm leading-relaxed', noticeTones[tone])}>
      <p className="flex items-center gap-2 font-display font-bold">
        <IconComponent className="size-4 shrink-0" aria-hidden />
        {title}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  )
}
