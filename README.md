# Jaskani Dental Clinic

Marketing site for Jaskani Dental Clinic, G-13, Islamabad. Single-page React
app built with Vite, TypeScript and Tailwind CSS v4.

> **Before launch, read [`CONTENT_REVIEW.md`](./CONTENT_REVIEW.md).** Several
> facts on this site still need confirmation from the clinic, the appointment
> form needs an access key before it delivers anything, and the stock images
> need replacing.

---

## Running it

```bash
npm install
npm run dev        # dev server with hot reload
```

| Command | What it does |
|---|---|
| `npm run dev` | Dev server at http://localhost:5173 |
| `npm run build` | Type-check (`tsc -b`) then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | oxlint across `src/` |

Requires Node 20+.

---

## Appointment form configuration

The form has three modes, chosen automatically.

### Demo mode (current default)

No configuration. The form validates input, then states plainly that the
request was **not** sent and offers the clinic's phone number and a pre-filled
WhatsApp message. It never claims a request was delivered.

### Email delivery via Web3Forms (the configured route)

Appointment requests arrive as formatted emails. Setup takes about 30 seconds
and needs no account or server:

1. Go to <https://web3forms.com>
2. Enter the destination email address in the "Create Access Key" box
3. Click the confirmation link in that inbox
4. Paste the key into `.env.local`:

```bash
VITE_WEB3FORMS_KEY=your-access-key-here
```

5. Restart the dev server (or rebuild — Vite inlines env vars at build time)

The form then reports real results: a success message on delivery, and an
honest failure message with the phone number if anything goes wrong.

Free tier covers 250 submissions/month.

> The Web3Forms access key is **public by design** — it only permits sending to
> the one address registered against it, and cannot read past submissions.
> Committing it is not a security problem, but `.env.local` is git-ignored
> anyway.

Each email contains: name, phone, treatment, preferred time, message, whether
consent was given, and the submission timestamp in Pakistan time. The subject
line names the patient and treatment, so requests are scannable in an inbox.

Spam is filtered by a hidden honeypot field — hidden from sighted users and
screen readers alike, and never focusable.

### Custom endpoint

For a serverless function or your own backend, set this instead:

```bash
VITE_APPOINTMENT_ENDPOINT=https://your-endpoint.example/appointments
```

It receives a JSON POST:

```json
{
  "name": "...",
  "phone": "...",
  "service": "...",
  "preferredTime": "...",
  "message": "...",
  "consent": true,
  "submittedAt": "2026-01-01T00:00:00.000Z",
  "source": "jaskanidentalclinic-website"
}
```

> **Never put a Gmail app password, SMTP credential or private API token in a
> `VITE_*` variable.** Everything prefixed `VITE_` is bundled into the
> JavaScript that ships to the browser and is readable by anyone viewing the
> page source. Web3Forms avoids this by keeping the mail credentials on their
> side.

Implementation: `src/lib/appointmentService.ts`.

---

## Editing content

Clinic details and copy live in `src/data/` and are deliberately separated from
the components, so text can change without touching layout code.

| File | Contains |
|---|---|
| `src/data/clinic.ts` | Name, phone, address, hours, directions URL, nav links, trust facts |
| `src/data/services.ts` | The 12 treatments, their groups, icons and descriptions |
| `src/data/faqs.ts` | FAQ questions and answers |
| `src/data/testimonials.ts` | Reviews — **currently switched off**, see CONTENT_REVIEW.md §3 |
| `src/data/gallery.ts` | Gallery and section images with dimensions and alt text |

The phone number, address and hours appear in several places on the page but
are defined **once** in `clinic.ts`. Change them there and every reference
updates.

---

## Project structure

```
src/
  app/App.tsx              Page composition and the service-enquiry wiring
  components/
    layout/                Header, MobileNav, Footer, Container, Logo, BackToTop
    sections/              One component per page section, top to bottom
    ui/                    Button, SectionHeading, Accordion, ServiceCard,
                           TestimonialCard, Lightbox, AppointmentForm, Icon
  data/                    All clinic content (see above)
  hooks/                   useScrollReveal, useScrolledPast, useOverlay
  lib/                     appointmentService, validation, enquiry, cn
  styles/globals.css       Design tokens (@theme), base styles, utilities
  assets/images/           Optimised WebP images
```

### Design tokens

Colours, fonts, radii and shadows are defined once in the `@theme` block at the
top of `src/styles/globals.css` and referenced through Tailwind classes
(`bg-brand-600`, `text-ink-muted`). There are no ad-hoc hex values in
components — change the palette in that one block.

---

## Notable implementation details

- **Images** are WebP with `srcSet`/`sizes` and explicit `width`/`height` to
  prevent layout shift. The hero image is eager with `fetchPriority="high"`
  (it is the LCP element); everything below the fold is lazy.
- **Scroll reveal** hides content only after JS confirms `IntersectionObserver`
  support, uses a generous `rootMargin`, and has a 2.5s safety timer that
  reveals anything still hidden. Content can never get stuck invisible.
- **`prefers-reduced-motion`** disables reveals, smooth scrolling and
  transitions.
- **Overlays** (mobile menu, gallery lightbox) share `useOverlay`: scroll lock,
  Escape to close, focus moved in and trapped, focus restored on close.
- **Anchor offset** is handled with `scroll-padding-top` on `<html>`, so the
  sticky header never covers a section heading.
- **No map embed** — the clinic's Maps listing is unverified, so the directions
  link runs a search rather than pointing at a guessed pin.

---

## Known limitations

1. **Appointment delivery needs an access key.** The Web3Forms integration is
   built and tested, but `VITE_WEB3FORMS_KEY` is still empty, so the form runs
   in demo mode. See the section above — it is a 30-second setup.
2. **Client-rendered SPA.** With JavaScript disabled the page is blank. Content
   is static, so if SEO or no-JS support matters, this would port to Astro or
   Next.js static export without redesigning anything — the components and data
   layer carry over.
3. **No canonical URL or sitemap**, pending a confirmed production domain.
4. **Two stock images remain** (instruments, smile) and need licensing
   confirmation. A photograph of the actual dentist is the highest-value
   addition still outstanding — see CONTENT_REVIEW.md §5.
5. **No automated test suite.** QA was done through a Playwright script run
   against the production build (results in the handover notes). Those checks
   are not committed as a regression suite.

---

## Deploying

The build output in `dist/` is static — deploy it to Vercel, Netlify, Cloudflare
Pages or any static host.

```bash
npm run build
```

### CI

`.github/workflows/ci.yml` runs lint, type-check and build on every push to
`main` and on every PR, and uploads the `dist/` output as an artifact. It does
**not** deploy — connect a host for that.

### Continuous deployment

The simplest route is to connect the repo to Vercel or Netlify and let it build
on every push to `main`:

| Setting | Value |
|---|---|
| Framework preset | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm ci` |
| Node version | 22 |

Then add `VITE_WEB3FORMS_KEY` in the host's environment variables.

> Env vars must be set **before** the build runs — Vite inlines them at build
> time, so adding one afterwards has no effect until the next deploy. If the
> form shows demo mode on the live site, that is almost always the cause:
> set the variable, then trigger a fresh build.
