# Content review — needs confirmation from the clinic

This site was rebuilt from the content on the previous Jaskani website
(`jaskanidentalclinic.vercel.app`). Almost nothing on that site could be
independently verified, so this build takes the conservative route: anything
unconfirmed was either softened or left out, never invented.

**Please go through this list before the site goes live.** Each item says what
the site currently does, so you can see the cost of leaving it unconfirmed.

---

## 1. Claims that were removed and will stay removed until confirmed

These appeared on the old site. None are on the new one.

| Claim on the old site | Why it was removed |
|---|---|
| **"Rated 4.8★ by our patients" / "Google Rating 4.8"** | No Google Business listing was found to verify this. Publishing an unverified rating — especially for a healthcare provider — is misleading and can breach Google's review policies. |
| **Testimonials from "Ayesha R.", "Bilal H.", "Sana K."** | No evidence these are real patients, and no record of consent to publish. See §3. |
| **"0+ Treatments Offered" animated counter** | The counter animated up from zero to zero. There is no real figure behind it. |
| **"Gentle, painless RCT"** | No dental procedure can be promised to be painless. The site now says root canal treatment is "carried out with local anaesthetic", which is accurate. |
| **"Transparent pricing — no surprises, ever"** | Softened to a description of *when* you will hear a price, which the clinic can actually honour. |
| **"Strict sterilization & single-use protocols"** | Kept but reworded to standard clinical practice rather than a differentiating claim. **Confirm this is accurate** (§4). |

**To restore any of these, confirm the underlying fact first — then it can go back in.**

---

## 2. Facts to confirm

| # | Item | What the site currently says | Needed |
|---|---|---|---|
| 2.1 | **Opening hours** | "Open daily until 10:00 PM", plus "Please call ahead to confirm availability, especially on public holidays." | Exact opening *and* closing times per day, and the holiday schedule. The old site never stated an opening time. |
| 2.2 | **Phone number** | `0315 1932127` → `tel:+923151932127` | Confirm this is the current clinic number and that the country-code form is right. |
| 2.3 | **WhatsApp** | A "Message on WhatsApp" button links to `wa.me/923151932127`, and the form's demo mode offers a pre-filled WhatsApp message. | **Confirm WhatsApp is active on this number.** If it is not, these buttons send patients nowhere — tell us and they will be removed. |
| 2.4 | **Address** | Street 87, G-13/1, G-13, Islamabad, 44034, Pakistan | Confirm exact spelling and postal code. |
| 2.5 | **Google Maps location** | "Get directions" runs a Maps **search** for the clinic name and address. There is **no map embed and no pinned coordinate**, because an unverified pin would send patients to the wrong place. | Send the clinic's real Google Business profile link or Place ID. Then a proper pin and embed can be added. |
| 2.6 | **Service list** | All 12 services from the old site are shown. | Confirm all 12 are currently offered, and that nothing is missing. |
| 2.7 | **Service descriptions** | Written to be informational, not diagnostic — they describe what a treatment generally involves, never that it suits a particular patient. | A dentist should read these for clinical accuracy. |
| 2.8 | **Dentist / team details** | Nothing is published. | The site would be noticeably stronger with the dentist's name, qualifications and a photo. Send these if you would like them added. |
| 2.9 | **Social profiles** | No social links anywhere — none were found, and fake ones are worse than none. | Send real profile URLs if they exist. |
| 2.10 | **Production domain** | No `canonical` tag and no sitemap, because the final URL is unknown. `robots.txt` has the sitemap line commented out. | Confirm the domain, then canonical, `og:url` and a sitemap can be added. |

---

## 3. Testimonials — currently switched off

The Reviews section does **not** show quotes or star ratings. It instead
invites visitors to look up the clinic's reviews themselves and offers a phone
number.

To publish real patient feedback:

1. Confirm each review is genuine and that the patient agreed to it being
   published on the website.
2. Add them to `testimonials` in `src/data/testimonials.ts`.
3. Set `testimonialsVerified` to `true` in the same file.

To link out to a verified review profile instead, set `reviewProfileUrl` in
that file to the clinic's real Google Business URL. Leave it `null` until you
have the actual link.

---

## 4. Hygiene and equipment claims

The "Why Jaskani" section says: *"Instruments are sterilised between patients
and single-use items are used where appropriate, as standard clinical practice
requires."*

**Confirm this reflects the clinic's actual protocol.** If the clinic follows a
specific named standard or uses a particular autoclave process, say so and the
copy can be made more specific — specifics build more trust than generalities.

---

## 5. Images

### Removed: the stock photo of a female dentist

The previous site used a stock photo of a **female** dentist treating a patient
as its hero and gallery centrepiece. The dentist at this clinic is **male**, so
that image told every visitor something specifically untrue about who would be
treating them.

A caption cannot fix this — people read the picture, not the note — so the
photo was **removed entirely** rather than disclaimed. It was also the source
of the social-share (Open Graph) image, which has been regenerated from the
treatment-room photo.

The hero now leads with the treatment room, and the "What a visit looks like"
section was rebuilt as a step grid that needs no photograph.

### The three remaining images

| File | What it shows | Assessment |
|---|---|---|
| `treatment-room-*.webp` | The treatment room | Most likely a real photo of this clinic — the wood panelling, stone feature wall and Eureka chair look like a specific room rather than stock. **Confirm it is yours.** Now used in the hero. |
| `dental-instruments-740.webp` | Instruments on white | Generic stock product photography. Shows no people. |
| `healthy-smile-850.webp` | A close-up smile | Generic stock photography. Shows no identifiable face and no clinic staff. |

None of the three depicts clinic staff, so none can misrepresent who works
here. The gallery carries a visible note: *"These images show the clinic, its
instruments and general dental care. No photograph on this page shows a patient
or a member of the clinic team."*

### What is still needed

1. **A photograph of the actual dentist.** This is the single highest-value
   addition left on the site. A real photo of the male dentist who practises
   here beats any stock image for trust, and would go straight into the hero.
   Send it along with his name and qualifications and an "About the dentist"
   block can be added.
2. **Real clinic photographs** — reception, other treatment rooms, equipment,
   the team. These would replace the two remaining stock images.
3. **Licensing confirmation** for the two stock images. They came from the
   previous site, which is not proof of a licence. If there is none, they must
   be replaced before launch.

Patient photographs require written consent and must never be published
without it.

Images are swapped in one place: `src/data/gallery.ts`.

---

## 6. Appointment form — not delivering to anyone yet

**The form does not currently send anything to the clinic.** It validates and
formats the request, then tells the visitor plainly that it was not sent and
offers the phone number and a pre-filled WhatsApp message instead. It never
claims a request was delivered.

**Email delivery is built and tested — it just needs an access key.** The
integration uses Web3Forms, which emails each request to a registered address.
Setup takes about 30 seconds and needs no account or server:

1. Go to <https://web3forms.com>
2. Enter the destination email address in the "Create Access Key" box
3. Click the confirmation link in that inbox
4. Paste the key into `.env.local` as `VITE_WEB3FORMS_KEY`, then rebuild

The form then switches to real delivery automatically and reports genuine
success and failure. See `README.md` for detail.

**Destination address:** currently set up for testing against
`alivirad54321@gmail.com`. **Confirm the clinic's own address before launch** —
requests going to a developer's inbox instead of the clinic's is the kind of
thing that gets missed until a patient complains they were never called back.

Also confirm: who monitors incoming requests, and during what hours? The form
currently promises a call back, so somebody needs to be making those calls.

---

## 7. Branding

No Jaskani logo file was available — the old site used styled text. The header,
footer and favicon use a typographic wordmark with a tooth mark, built from the
site palette.

**If a real logo exists, send it** (SVG preferred, or a high-resolution PNG
with a transparent background). It would replace `src/components/layout/Logo.tsx`
and `public/favicon.svg`.

The palette (deep teal, mint, warm off-white) was chosen for the sector, since
there were no existing brand colours to derive from. If the clinic has brand
colours, they go in one place: the `@theme` block in `src/styles/globals.css`.

---

## 8. Structured data

The page includes `Dentist` structured data with name, address, phone, opening
hours and services only.

Deliberately omitted: `aggregateRating`, `review`, `geo` coordinates,
`priceRange`, `sameAs`. Search engines treat fabricated review markup as a
manual-action-worthy violation, so **do not add these without real data.**
