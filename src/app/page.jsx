// ─────────────────────────────────────────────────────────────
// HOME PAGE — src/app/page.jsx
//
// This file assembles all sections of the portfolio.
// To reorder sections: move the component tags below.
// To add a new section: import it and add it here.
// ─────────────────────────────────────────────────────────────

import Hero         from '../components/Hero'
import Projects     from '../components/Projects'
import Services     from '../components/Services'
import Statement    from '../components/Statement'
import FAQ          from '../components/FAQ'
import Contact      from '../components/Contact'
import Footer       from '../components/Footer'
import SmoothScroll from '../components/SmoothScroll'

export default function Home() {
  return (
    <SmoothScroll>
      <main id="main" className="relative">
        <Hero />
        <Projects />
        <Statement />
        <Services />
        <FAQ />
        <Contact />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
