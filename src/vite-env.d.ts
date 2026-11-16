/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Web3Forms access key. When set, appointment requests are emailed via Web3Forms. */
  readonly VITE_WEB3FORMS_KEY?: string
  /** Custom JSON POST endpoint for appointment requests. See lib/appointmentService.ts */
  readonly VITE_APPOINTMENT_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
