import { useCallback, useState } from 'react'
import { BackToTop } from '../components/layout/BackToTop'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { Contact } from '../components/sections/Contact'
import { FAQ } from '../components/sections/FAQ'
import { FinalCTA } from '../components/sections/FinalCTA'
import { Gallery } from '../components/sections/Gallery'
import { Hero } from '../components/sections/Hero'
import { PatientConcerns } from '../components/sections/PatientConcerns'
import { Reviews } from '../components/sections/Reviews'
import { Services } from '../components/sections/Services'
import { TreatmentJourney } from '../components/sections/TreatmentJourney'
import { TrustStrip } from '../components/sections/TrustStrip'
import { WhyChooseUs } from '../components/sections/WhyChooseUs'
import { sectionIds } from '../data/clinic'
import type { Service } from '../data/services'
import { useScrollReveal } from '../hooks/useScrollReveal'
import type { Enquiry } from '../lib/enquiry'

export function App() {
  useScrollReveal()

  const [enquiry, setEnquiry] = useState<Enquiry | undefined>()

  /**
   * A service card's Enquire action pre-fills the form and scrolls to it.
   * The nonce makes each click a distinct value, so choosing the same service
   * twice still re-runs the form's effect and refocuses it.
   */
  const handleEnquire = useCallback((service: Service) => {
    setEnquiry((current) => ({ service: service.name, nonce: (current?.nonce ?? 0) + 1 }))
    document
      .getElementById(sectionIds.appointment)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-70 focus:rounded-full focus:bg-brand-600 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Hero />
        <TrustStrip />
        <PatientConcerns />
        <WhyChooseUs />
        <Services onEnquire={handleEnquire} />
        <TreatmentJourney />
        <Gallery />
        <Reviews />
        <Contact enquiry={enquiry} />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
      <BackToTop />
    </>
  )
}
