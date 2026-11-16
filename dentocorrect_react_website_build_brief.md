# Jaskani Dental Clinic — Premium React Website Build Brief
## Claude Code / Claude Agent implementation prompt

> **Primary goal:** Rebuild the existing Jaskani Dental Clinic website as a polished, premium, conversion-focused dental clinic website. Use **DentoCorrect** as the visual/design benchmark, but keep Jaskani's real identity, location, services, contact details and clinic-specific content. The finished website should feel at least as refined as the reference, with stronger interaction design, responsiveness, accessibility and performance.
>
> **Do not copy DentoCorrect's brand, wording, multi-city claims, testimonials, statistics, or business information.** Reproduce the quality and design language, not its identity or unverified claims.

---

# 1. Websites and source-of-truth rules

### Design reference — study carefully
- Target design: https://dentocorrect.com.pk/
- Treat this as the primary visual benchmark for layout, hierarchy, section rhythm, whitespace, cards, typography, imagery, calls to action, navigation and overall polish.
- Inspect the live page at desktop, tablet and mobile widths. If browser tooling is available, inspect screenshots, DOM, styles, assets and interactions. Do not rely only on a text extraction.
- Note what works particularly well: the clear hero message, strong booking CTA, trust indicators, problem/solution storytelling, service cards, patient feedback, location information, FAQs and final CTA.

### Existing clinic website — content source
- Existing site: https://jaskanidentalclinic.vercel.app/#home
- Use it to collect Jaskani-specific information and assets:
  - Clinic name and brand/logo
  - Address, phone number, hours and directions
  - Services and their descriptions
  - Existing clinic photographs and other relevant images
  - Existing clinic-specific copy, reviews and contact details
- Inspect all sections, image URLs, metadata, links and responsive behavior. Download or reuse existing assets only where legally and technically appropriate.
- Prefer actual Jaskani clinic imagery over generic stock photography.
- Do not assume the old website's content is complete or error-free. Flag inconsistencies for review instead of silently inventing details.

### Known content visible on the current websites
Use these as initial reference points, then verify against the live source and assets before implementation.

**Jaskani Dental Clinic**
- Name: Jaskani Dental Clinic
- Positioning: modern, careful, transparent family dentistry
- Location: Street 87, G-13/1, G-13, Islamabad, 44034, Pakistan
- Phone: `0315 1932127`
- Hours currently stated: open daily until 10:00 PM
- Existing site mentions a 4.8 Google rating. Only display this if it can be verified against the clinic's actual Google profile and the rating is still current. Do not fabricate review counts.
- Existing site lists services including:
  1. Teeth Whitening
  2. Dental Consultation
  3. Scaling & Polishing
  4. Tooth & Composite Filling
  5. Root Canal Treatment
  6. RCT Consultation
  7. Tooth Extraction
  8. Crown & Bridge
  9. Dentures
  10. Smile Design
  11. Fluoride Treatment
  12. Oral Prophylaxis
- Existing site contains clinic imagery, a treatment-room image, patient/gallery imagery and review excerpts. Verify each image and review before reusing.
- Existing site describes transparent pricing, gentle care, sterilization protocols and evening availability. Retain only claims the clinic confirms.

**DentoCorrect design reference**
Its current page uses a long-form landing-page structure with:
- Brand-led header and prominent appointment CTA
- Large hero headline, supporting copy, trust points and hero imagery
- Credibility/stat highlights
- Patient-problem / empathy section
- Clinic value proposition and treatment-process benefits
- Services grid
- Patient testimonials
- Location/clinic information
- FAQ accordion
- Final appointment CTA and footer

Use the structure as inspiration. Adapt it to a single-location clinic rather than copying its multi-city network model.

---

# 2. Your role and expected output

Act as a senior:
- Product designer / UI-UX designer
- React + TypeScript frontend engineer
- Accessibility and responsive-design specialist
- Frontend performance engineer
- QA engineer

You are responsible for the complete implementation, not just a mockup.

**Deliver a working, production-quality React website**, not a static screenshot. Every visible control must have a meaningful working behavior. Build the project, run it, test it, inspect it at multiple screen sizes, fix issues and provide a concise completion report.

Do not stop after generating a plan. First inspect the existing repository and both websites, then implement the complete solution.

---

# 3. Brand and design direction

## Overall visual direction
Create a premium, calm, modern dental-clinic identity. The website should communicate:
- Trust and clinical professionalism
- Comfort and care
- Cleanliness and hygiene
- Modern dentistry
- Clear communication
- Easy appointment booking

The design should feel sophisticated and welcoming rather than cold, overly corporate, childish or like a generic medical template.

## Visual benchmark
Use DentoCorrect as the reference for:
- Clear visual hierarchy
- Generous whitespace
- Strong hero composition
- Balanced image/text sections
- Consistent card design
- Distinct section backgrounds
- Strong but tasteful CTA treatment
- Long-page storytelling
- Professional footer

Improve on it with:
- More coherent single-clinic branding
- More refined typography and spacing
- More intentional image crops
- Smoother but restrained interactions
- Better mobile navigation and mobile CTA behavior
- Better accessibility and performance
- More useful clinic-specific information

## Color system
First inspect the Jaskani logo and current brand assets. Derive the final palette from the logo if it has a clear established palette. If the existing branding does not provide a usable system, use a refined dental palette:
- Deep teal / dark blue-green for primary brand elements
- Soft mint or pale aqua for subtle backgrounds and accents
- Warm off-white for large surfaces
- Deep charcoal for primary text
- Muted grey-green for secondary text
- A restrained accent color for highlights and CTA details

Define colors as CSS variables/design tokens. Do not scatter arbitrary hex values throughout components. Ensure text/background contrast meets WCAG AA where applicable. Do not use a bright, saturated color everywhere.

## Typography
- Use a polished, highly readable sans-serif pairing or one excellent variable sans-serif family.
- Use a strong, confident hero heading with controlled line length.
- Establish a consistent scale for display, heading, body, label and caption text.
- Avoid tiny body text and excessive uppercase labels.
- Load fonts efficiently; prefer a reliable local or optimized font strategy.
- Use responsive `clamp()` sizing for major headings.

## Layout and visual details
- Use a consistent max-width container and spacing scale.
- Use a responsive grid, not fixed-width layouts.
- Give cards consistent radii, borders and subtle shadows.
- Use subtle borders and layered surfaces rather than excessive shadows.
- Use high-quality image crops with consistent aspect ratios.
- Avoid excessive pill shapes, glassmorphism, gradients and decorative blobs.
- Avoid a wall of identical cards. Vary section composition while preserving consistency.
- Avoid clutter, oversized icons and unnecessary animations.
- Keep the website visually rich but not crowded.

---

# 4. Required page structure and content

Build a complete, single-page clinic website with a clear navigation system. Use semantic section IDs so navigation links and CTAs scroll to the right place.

## 4.1 Announcement / utility strip (optional)
A slim top strip can show verified practical information such as:
- G-13/1, Islamabad
- Open daily until 10 PM
- Click-to-call phone number

Keep it compact. Do not let it compete with the main navigation.

## 4.2 Header and navigation
Create a polished sticky header:
- Jaskani Dental Clinic logo/wordmark
- Navigation: Home, Services, Why Choose Us, Gallery, Reviews, FAQs, Contact
- Prominent “Book Appointment” CTA
- Mobile menu button with accessible open/close state
- Smooth scrolling to sections
- Header changes subtly on scroll if useful
- Do not cover section headings when using anchor navigation; account for sticky-header offset.

Mobile:
- Use a proper accessible menu/drawer or dropdown.
- Close the menu after a navigation item is selected.
- Support Escape key and sensible focus behavior.
- Keep the booking action easy to reach.
- Avoid a cramped desktop nav squeezed onto mobile.

## 4.3 Hero section
The hero is the most important first impression. Create a high-impact, premium composition inspired by DentoCorrect's hero without copying it.

Suggested content direction:
- Eyebrow: “JASKANI DENTAL CLINIC · G-13, ISLAMABAD”
- Main headline: “A healthier smile starts with care you can trust.”
- Supporting text: “Thoughtful dental care, clear guidance and a comfortable experience for every smile. Visit Jaskani Dental Clinic in G-13, Islamabad.”
- Primary CTA: “Book an Appointment”
- Secondary CTA: “Call 0315 1932127”
- Trust details: verified opening hours, location and verified patient rating (only if confirmed).

Design:
- Strong two-column desktop layout or an equally compelling editorial composition.
- Large, authentic clinic/dentist image on one side.
- Use an image with a genuine dental consultation/clinic environment if available.
- Use a refined image container with a subtle frame or background shape, not excessive decoration.
- Headline should be prominent and readable without taking over the entire screen.
- Make the hero CTA visible without requiring a long scroll.
- On mobile, stack content in a deliberate order and preserve the CTA visibility.
- Do not put text over a busy image unless contrast is excellent.

## 4.4 Trust / quick facts row
A concise strip immediately after the hero can show 3–4 verified facts, for example:
- G-13/1, Islamabad
- Open daily until 10 PM
- Family dental care
- Verified Google rating

Only show facts that are accurate and substantiated. Do not invent:
- Years of experience
- Number of patients
- Number of dentists
- Number of branches
- Treatment success rates
- Certifications
- Awards
- “Best clinic” or “No. 1” claims

If no reliable numerical statistics exist, use practical trust points instead of fake counters.

## 4.5 Patient needs / empathy section
Create a section that acknowledges common reasons people delay dental visits:
- Uncertainty about what treatment is needed
- Worry about discomfort
- Confusion about treatment costs
- Wanting a clinic that explains options clearly

Use reassuring, responsible language. Avoid fear-based marketing or guarantees. Pair the content with a real clinic/team image or an elegant supporting visual.

Suggested heading: “Dental care should feel clear, comfortable and personal.”

Explain that patients can discuss concerns and understand proposed treatment before deciding. Do not promise every treatment is painless or risk-free.

## 4.6 Why choose Jaskani / value proposition
Create 3–4 distinct feature blocks with tasteful icons:
- Clear explanations and guidance
- Patient-focused, gentle approach
- Hygiene and sterilization practices (only as confirmed by clinic)
- Convenient evening hours
- A range of family dental services

Each item should have a short, specific explanation. Avoid generic filler such as “world-class service” unless backed by evidence.

## 4.7 Services section
Heading direction: “Complete dental care for every stage of your smile.”

Use the verified Jaskani service list. Build a visually attractive responsive grid:
- Teeth Whitening
- Dental Consultation
- Scaling & Polishing
- Tooth & Composite Filling
- Root Canal Treatment
- RCT Consultation
- Tooth Extraction
- Crown & Bridge
- Dentures
- Smile Design
- Fluoride Treatment
- Oral Prophylaxis

Each service card should include:
- Relevant image or consistent high-quality icon/illustration
- Service name
- One or two lines of accurate, patient-friendly description
- A small “Enquire” or “Book consultation” action that leads to the booking/contact section

Use actual service images if present in the old site. Otherwise use a consistent visual strategy. Do not use unrelated images or repeat one image across every card just to fill space.

Descriptions must be informational, not diagnostic. Do not promise guaranteed results or claim that a treatment is suitable for everyone.

Optional interaction:
- A “View all services” control may reveal more services only if the initial grid is intentionally shortened.
- If all 12 services fit cleanly, show them without an unnecessary reveal interaction.
- Cards may have subtle hover/focus states, but must remain usable on touch devices.

## 4.8 Clinic / treatment experience section
Show the clinic environment and what a patient can expect:
1. Contact the clinic or request an appointment.
2. Visit for a consultation.
3. Discuss concerns and possible treatment options with the dentist.
4. Receive guidance on next steps and follow-up.

Do not present this as a guaranteed clinical pathway for every patient. Keep the language flexible and accurate.

Use real clinic images. This section should make the clinic feel approachable and tangible.

## 4.9 Gallery
Build an elegant gallery using verified images from the old Jaskani website:
- Clinic interior / treatment room
- Equipment or instruments, where appropriate
- Patient-related imagery only if the clinic has permission to publish it
- Other authentic clinic photographs

Requirements:
- Consistent image ratios and deliberate cropping
- Responsive grid or restrained carousel
- Accessible image alt text
- Optional lightbox with close button, Escape support and keyboard navigation
- Prevent layout shift by setting image dimensions/aspect ratios
- Never invent patient photographs or imply a stock model is an actual patient.
- Do not publish identifiable patient photos without appropriate permission.

If there are too few authentic images, use a smaller gallery rather than padding it with misleading stock imagery.

## 4.10 Reviews / testimonials
Use only real, authorized, verifiable patient feedback from the existing site or the clinic's approved sources.

The existing website currently displays review excerpts attributed to:
- Ayesha R.
- Bilal H.
- Sana K.

Verify the source and permission before using them. If these are illustrative placeholder reviews rather than actual patient feedback, do not publish them as genuine testimonials. Do not invent names, photos, star ratings or review counts.

Design:
- Clear testimonial cards or a restrained slider
- Rating display only if verified
- Good mobile behavior
- Keyboard-accessible controls
- No autoplay that moves content unexpectedly

If the review content cannot be verified, replace the section with a neutral “Patient feedback” introduction and a link to the clinic's verified review profile, if available.

## 4.11 Location and contact section
Make it exceptionally easy to find and contact the clinic.

Use verified details:
- Jaskani Dental Clinic
- Street 87, G-13/1, G-13, Islamabad, 44034, Pakistan
- Phone: 0315 1932127
- Hours: daily until 10:00 PM, subject to confirmation

Include:
- Click-to-call phone link (`tel:`)
- WhatsApp action using the verified phone number, if WhatsApp is active for that number
- “Get Directions” link to the correct Google Maps destination
- Map embed only if a correct clinic pin/embed URL can be verified
- Address with readable formatting
- Opening hours
- A clear booking CTA

Do not invent a Google Maps URL or clinic coordinates. Verify the actual listing/pin.

## 4.12 Appointment request form
Build a beautiful, accessible form. At minimum:
- Full name
- Phone number
- Service / reason for visit (select)
- Preferred day or time (optional)
- Additional message (optional)
- Consent checkbox for being contacted about the appointment request

Behavior:
- Client-side validation with helpful inline errors.
- Phone number input should accept common Pakistani formats, including `03xx...` and `+92...`; do not reject valid numbers due to overly strict formatting.
- Submit button has idle, submitting, success and error states.
- Prevent duplicate submissions while submitting.
- Provide a clear success message only after a real submission action succeeds.
- Never pretend a request has been sent if there is no backend integration.

**Backend decision:**
1. First inspect the repository for an existing API, serverless function, form provider or backend integration.
2. Reuse the existing supported integration if available.
3. If no backend exists, implement a clearly separated form service/adapter and document the required environment variables and setup. Do not hardcode secrets.
4. For a frontend-only preview, provide a clearly labelled demo mode that does not claim to contact the clinic. In demo mode show a message explaining that live submission needs backend configuration.
5. Do not expose API keys, email credentials or private tokens in client-side code.

A WhatsApp prefilled-message fallback can be provided if the clinic confirms the number is active on WhatsApp. Make it clear that this opens WhatsApp and the user must send the message; do not claim that the form itself was submitted.

## 4.13 FAQs
Create a clean accessible accordion with questions relevant to the clinic. Use verified information and cautious language.

Potential questions:
- What dental services are available at Jaskani Dental Clinic?
- How can I book an appointment?
- Where is the clinic located?
- What are the clinic's opening hours?
- How do I know which treatment I need?
- Can I ask about treatment costs before proceeding?
- What should I expect during an initial consultation?

Answers:
- Do not invent exact prices.
- Explain that treatment recommendations depend on a dentist's assessment.
- Avoid guarantees such as “completely painless”.
- Mention that patients can call the clinic to confirm availability and details.

Accordion behavior:
- Keyboard accessible
- Correct `aria-expanded` and relationships
- Smooth but restrained open/close
- One-open-at-a-time or multiple-open behavior is acceptable; choose consistently.

## 4.14 Final CTA
Create a visually strong closing section:
- Heading: “Your next step towards a healthier smile.”
- Short supporting copy
- Primary “Book an Appointment” button
- Secondary click-to-call action
- Optional real clinic image or subtle brand-colored background

Keep it confident, calm and welcoming.

## 4.15 Footer
Include:
- Logo / clinic name
- Short clinic description
- Navigation links
- Services links
- Phone
- Address
- Opening hours
- Social links only if verified
- Copyright year generated dynamically
- Privacy notice / terms links only if real pages exist

Do not create dead links or fake social profiles.

---

# 5. Interactions and dynamic behavior

The website must feel alive and responsive, not static.

Implement:
- Smooth anchor scrolling (respect reduced-motion preferences)
- Sticky header with sensible scroll behavior
- Mobile navigation with working open/close states
- CTA buttons that scroll to the form or launch a verified call/WhatsApp link
- Service enquiry actions
- FAQ accordion
- Gallery lightbox or accessible gallery interaction
- Form validation and realistic submission states
- Subtle hover/focus/active states
- Optional scroll-reveal animation for selected sections
- A back-to-top control only if it improves long-page navigation
- Responsive menu and controls with touch-friendly hit areas

Animation guidelines:
- Keep animations subtle and professional.
- Use short transitions and avoid distracting motion.
- Respect `prefers-reduced-motion`.
- Do not animate every element.
- Avoid scroll-jacking, forced horizontal scrolling and autoplaying carousels.
- Ensure content remains visible if JavaScript animation fails.

---

# 6. Technical implementation requirements

## Stack
Use:
- React
- TypeScript
- Vite unless the existing repository already uses a suitable React framework
- Tailwind CSS if already installed or if it can be added cleanly
- Otherwise use CSS Modules or a well-organized global CSS architecture
- Lucide React or the icon library already present in the repository

Do not migrate frameworks unnecessarily. Inspect the current repository before deciding.

## Architecture
Use reusable, maintainable components. Suggested structure (adapt to existing repo conventions):

```text
src/
  app/
    App.tsx
  components/
    layout/
      Header.tsx
      MobileNav.tsx
      Footer.tsx
      Container.tsx
    sections/
      Hero.tsx
      TrustStrip.tsx
      PatientConcerns.tsx
      WhyChooseUs.tsx
      Services.tsx
      TreatmentJourney.tsx
      Gallery.tsx
      Testimonials.tsx
      Contact.tsx
      FAQ.tsx
      FinalCTA.tsx
    ui/
      Button.tsx
      SectionHeading.tsx
      ServiceCard.tsx
      TestimonialCard.tsx
      Accordion.tsx
      AppointmentForm.tsx
      Icon.tsx
  data/
    clinic.ts
    services.ts
    faqs.ts
    testimonials.ts
  hooks/
  lib/
    appointmentService.ts
    validation.ts
  styles/
    globals.css
  assets/
```

Keep content data separate from layout components so clinic details and services can be updated without rewriting UI components.

## Code quality
- Strict TypeScript; avoid `any`.
- Avoid giant monolithic components.
- Avoid unnecessary dependencies.
- Use semantic HTML.
- Use stable keys in lists.
- Handle missing image assets gracefully.
- Avoid console errors and React warnings.
- Keep components readable and cohesive.
- Do not add a state-management library for a simple landing page.
- Do not hardcode repeated clinic details in multiple components; centralize them.
- Do not make unrelated changes to package files or project configuration.
- Preserve existing working functionality unless a change is required and documented.

## Images and assets
- Inspect and inventory the old site's images.
- Reuse authentic Jaskani assets when appropriate.
- Keep assets local in the project when licensing and access permit.
- Use descriptive filenames.
- Compress large images and prefer WebP/AVIF where supported.
- Use responsive image sizing (`srcSet` / `sizes`) where practical.
- Set explicit dimensions or aspect ratios to avoid layout shift.
- Use lazy loading for below-the-fold images.
- Do not lazy-load the primary hero image if that harms LCP.
- Add descriptive alt text; use empty alt for decorative images.
- Do not use hotlinked temporary image URLs if a local asset can be used reliably.
- Do not invent image paths. Verify every referenced asset exists.

## SEO and sharing
Implement:
- Page title: `Jaskani Dental Clinic | Dental Care in G-13, Islamabad`
- A unique, useful meta description
- Canonical URL only if the production domain is known
- Open Graph title, description and image
- Favicon using the actual clinic logo/brand asset if available
- Semantic heading hierarchy (one clear H1)
- Descriptive section headings
- LocalBusiness / Dentist structured data only with verified information
- NAP consistency (name, address, phone)
- Sitemap and robots file if the deployment setup supports them
- Meaningful image alt text

Do not add unsupported claims, fake ratings, fabricated review schema or fake business details to structured data.

## Accessibility
Target WCAG 2.2 AA where practical:
- Keyboard navigation throughout
- Visible focus indicators
- Sufficient color contrast
- Correct labels for every form field
- Accessible error and success messaging
- Appropriate ARIA only where needed
- Buttons for actions; anchors for navigation
- Accessible accordion and modal/lightbox behavior
- Logical heading order
- Touch targets that are comfortably usable
- Reduced-motion support
- Do not rely on color alone to communicate state

## Performance
Aim for:
- Fast first render and strong Core Web Vitals
- Minimal JavaScript and dependency weight
- Optimized images
- No unnecessary animation libraries
- No layout shift from images or fonts
- Lazy loading below the fold
- Sensible font loading
- No large background videos
- Avoid unnecessary client-side rendering complexity

---

# 7. Responsive design requirements

Design and test at these viewport widths at minimum:
- 360 × 800 (small mobile)
- 390 × 844 (modern mobile)
- 768 × 1024 (tablet)
- 1024 × 768 (small desktop / landscape tablet)
- 1440 × 900 (desktop)
- 1920 × 1080 (wide desktop)

Check:
- No horizontal overflow
- No clipped headings or buttons
- No overlapping content
- Correct image crops
- Appropriate section spacing
- Usable service cards
- Proper mobile navigation
- Forms fit the viewport
- Footer columns stack correctly
- Sticky header does not obscure content
- Buttons remain touch-friendly

Do not simply shrink the desktop layout. Make deliberate mobile layout decisions.

---

# 8. Testing and QA — mandatory

Do not claim the website is tested unless you actually run the tests.

## 8.1 Repository and setup inspection
- Inspect all existing files and scripts first.
- Identify the current framework, package manager, build command and available tests.
- Check existing environment variables and integrations without printing secrets.
- Preserve the current project conventions where sensible.
- Record any missing configuration.

## 8.2 Static checks
Run the available equivalents of:
- TypeScript type check
- ESLint
- Production build

Fix all errors and important warnings caused by your changes.

## 8.3 Functional checks
Test every interactive element:
- Logo returns to home
- Header links scroll to the correct sections
- Mobile menu opens, closes and closes after navigation
- Escape closes overlays where applicable
- Booking CTAs reach the appointment form
- Phone links open the dialer on supported devices
- WhatsApp action uses the verified number and correct URL encoding, if implemented
- Service enquiry actions work
- FAQ accordion opens and closes
- Gallery opens and closes and supports keyboard interaction
- Form required fields validate
- Invalid phone number produces a useful error
- Valid form reaches the configured submission adapter
- Loading, success and failure states work correctly
- Duplicate submissions are prevented
- No dead buttons or placeholder links remain

If no live form backend is configured, test the demo state and explicitly report that live appointment delivery is not enabled.

## 8.4 Visual checks
Use browser automation or the available browser tool if present:
- Open the site locally.
- Capture desktop and mobile screenshots.
- Inspect every major section.
- Compare the overall composition with DentoCorrect.
- Check for visual regressions and fix them.
- Test sticky header, menu, FAQ, gallery and form.
- Check image loading and broken assets.

If browser automation is unavailable, do not pretend to have done browser-based visual testing. Perform the available checks and clearly state the limitation.

## 8.5 Accessibility checks
- Keyboard-only navigation
- Focus visibility
- Form labels and error announcements
- Image alt text
- Heading hierarchy
- Reduced-motion behavior
- Contrast checks with available tooling

## 8.6 Final browser console and network checks
- No uncaught runtime errors
- No missing assets / 404s caused by the implementation
- No failed API calls left unexplained
- No React key warnings
- No hydration issues if a framework with SSR is used

---

# 9. Content accuracy and clinic-owner review

Create a `CONTENT_REVIEW.md` file listing anything that needs confirmation from the clinic owner, such as:
- Exact opening hours and holiday schedule
- Whether the listed phone number is also a WhatsApp number
- Correct Google Maps listing / directions URL
- Whether the 4.8 rating is current and its review count
- Whether testimonials are genuine and approved for publication
- Whether patient photographs have publication consent
- Whether sterilization / equipment / doctor qualification claims are accurate
- Whether all listed services are currently offered
- Appointment form delivery destination and backend credentials
- Social media profile URLs
- Any real clinic logo / brand assets that were unavailable

Use safe, conservative copy until these details are confirmed. Never fill gaps with fabricated facts.

---

# 10. What “better than the reference” means

The final design should:
- Feel as polished and intentional as DentoCorrect.
- Have a strong first-screen experience.
- Use real Jaskani identity and imagery.
- Make appointment booking obvious throughout the page.
- Have excellent typography and whitespace.
- Tell a clear story from first impression to booking.
- Use attractive service cards without visual clutter.
- Build trust through accurate clinic details, not invented statistics.
- Feel excellent on mobile.
- Include purposeful, smooth interactions.
- Load quickly and work accessibly.
- Be maintainable for future updates.

Do not make it “better” by adding unnecessary sections, excessive animations, fake counters, random gradients or generic stock images.

---

# 11. Implementation workflow — follow in order

1. **Inspect repository:** identify framework, scripts, existing components, styling, assets and integrations.
2. **Inspect both websites:** review the reference design and existing Jaskani content/assets.
3. **Create an asset inventory:** list each reusable image/logo and its intended use. Verify files and permissions.
4. **Create a content inventory:** centralize verified clinic details, services, FAQs and approved reviews.
5. **Plan the design system:** palette, typography, spacing, container widths, radii, shadows and breakpoints.
6. **Implement the page shell:** global styles, header, navigation, footer and reusable UI primitives.
7. **Implement all sections:** hero through footer in the requested order.
8. **Implement interactions:** mobile menu, anchor navigation, service actions, gallery, FAQ and appointment form.
9. **Implement SEO, accessibility and performance improvements.**
10. **Run type checks, lint and production build.**
11. **Run functional and responsive tests.**
12. **Inspect screenshots and refine the visual design.**
13. **Create `CONTENT_REVIEW.md` and document any integration setup.**
14. **Provide a completion report.**

Do not stop at step 5 or return only a design proposal. Continue through implementation and QA.

---

# 12. Final deliverables

At completion, provide:
1. Fully implemented React website in the existing project.
2. Reusable, organized components and centralized content data.
3. Optimized and verified image assets.
4. Functional responsive navigation and interactions.
5. Appointment form with honest backend/demo behavior.
6. SEO and accessibility essentials.
7. `CONTENT_REVIEW.md` with facts requiring owner confirmation.
8. A short README section explaining how to run and build the site.
9. A QA report listing commands actually run and their results.
10. A list of any known limitations or required environment variables.

Final response format:
- What was built
- Main design decisions
- Important files/components created or changed
- Commands/tests run and pass/fail status
- Whether appointment submission is live or demo-only
- Content details that still need clinic-owner confirmation
- How to run locally

**Be honest:** do not say a test passed unless it was executed successfully. Do not claim the appointment form sends requests unless a real backend integration is configured and verified.

---

# 13. Final instruction

Build this as a real, polished website for **Jaskani Dental Clinic in G-13, Islamabad**.

Use **https://dentocorrect.com.pk/** as the design benchmark and **https://jaskanidentalclinic.vercel.app/** as the source for Jaskani's identity, content and assets.

The result must not look like a lightly modified copy of the old website. It should be a substantial, premium redesign with the visual confidence and conversion quality of the reference, while remaining truthful to Jaskani Dental Clinic.

Start by inspecting the repository and both live websites. Then implement, run, test, inspect and refine the complete project.
