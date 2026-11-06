'use client'

// ─────────────────────────────────────────────────────────────
// SMOOTH SCROLL — src/components/SmoothScroll.jsx
// Lenis smooth scrolling. Skipped entirely for reduced-motion users.
// ─────────────────────────────────────────────────────────────

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    window.__lenis = lenis // used by PageTransition to jump under the cover

    let id
    const raf = (time) => {
      lenis.raf(time)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(id)
      if (window.__lenis === lenis) window.__lenis = null
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
