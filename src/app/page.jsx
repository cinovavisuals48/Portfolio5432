// ─────────────────────────────────────────────────────────────
// HOME PAGE — src/app/page.jsx
//
// This file assembles all sections of the portfolio.
// To reorder sections: move the component tags below.
// To add a new section: import it and add it here.
// ─────────────────────────────────────────────────────────────

import Hero         from '../components/Hero'
import Projects     from '../components/Projects'
import WhyMe        from '../components/WhyMe'
import Process      from '../components/Process'
import Services     from '../components/Services'
import About        from '../components/About'
import FAQ          from '../components/FAQ'
import Contact      from '../components/Contact'
import Footer       from '../components/Footer'
import SmoothScroll from '../components/SmoothScroll'

export default function Home() {
  return (
    <SmoothScroll>
    <main className="relative">
      {/* Hero */}
      <Hero />

      {/* Projects — the main showcase */}
      <Projects />

      {/* Why Me — what makes this different */}
      <WhyMe />

      {/* Process — from brief to delivery */}
      <Process />

      {/* What I Make — services section */}
      <Services />

      {/* About */}
      <About />

      {/* FAQ */}
      <FAQ />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
    </SmoothScroll>
  )
}
