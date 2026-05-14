// ─────────────────────────────────────────────────────────────
// HOME PAGE — src/app/page.jsx
//
// This file assembles all sections of the portfolio.
// To reorder sections: move the component tags below.
// To add a new section: import it and add it here.
// ─────────────────────────────────────────────────────────────

import Navbar       from '../components/Navbar'
import Hero         from '../components/Hero'
import Marquee      from '../components/Marquee'
import Projects     from '../components/Projects'
import Services     from '../components/Services'
import About        from '../components/About'
import Contact      from '../components/Contact'
import Footer       from '../components/Footer'
import CursorGlow   from '../components/CursorGlow'
import CustomCursor from '../components/CustomCursor'
import SmoothScroll from '../components/SmoothScroll'

export default function Home() {
  return (
    <SmoothScroll>
    <main className="relative">
      {/* Ambient cursor glow (desktop only) */}
      <CursorGlow />

      {/* Custom dot cursor (desktop only) */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Marquee strip */}
      <Marquee />

      {/* Projects — the main showcase */}
      <Projects />

      {/* About */}
      <About />

      {/* Services */}
      <Services />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
    </SmoothScroll>
  )
}
