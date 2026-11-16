/**
 * A request from a service card to pre-fill the appointment form.
 *
 * `nonce` increments on every click so that enquiring about the same service
 * twice still produces a new value — otherwise React would see an unchanged
 * prop and the form would not re-focus.
 */
export interface Enquiry {
  service: string
  nonce: number
}
