'use client'

// ─────────────────────────────────────────────────────────────
// PAGE TRANSITION — src/components/PageTransition.jsx
// Every internal link (navbar, menu, footer, project links, back
// links…) plays the same transition:
//   1. A blue panel rises in staggered columns, left first.
//   2. The destination name appears big, with a progress line.
//   3. Under the cover we change page / jump to the section.
//   4. The name slides away and the columns lift off, left first.
// Reduced-motion users navigate instantly.
//
// Labels come from LABELS below; any link can override with
//   data-transition-label="Something"
// and opt out with data-no-transition.
// ─────────────────────────────────────────────────────────────

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import { projects } from '../data/projects'
import { EASE } from './Reveal'

const LABELS = {
  '/': 'Home',
  '/projects': 'Work',
  '/about': 'About',
  '/book-project': 'Book a project',
  '#home': 'Home',
  '#projects': 'Work',
  '#about': 'About',
  '#what-i-make': 'Services',
  '#faq': 'FAQ',
  '#contact': 'Contact',
}

const IN = 0.55      // each column's rise
const OUT = 0.6      // each column's lift
const STAGGER = 0.055
const HOLD = 0.45    // time the name sits on screen

function labelFor(path, hash) {
  if (hash && LABELS[hash]) return LABELS[hash]
  const match = path.match(/^\/projects\/([^/]+)/)
  if (match) return projects.find((p) => String(p.id) === match[1])?.title ?? 'Project'
  return LABELS[path] ?? 'Loading'
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

// Waits (up to ~2.5s) for the new route and, if needed, the target section.
function waitFor(check) {
  return new Promise((resolve) => {
    const start = performance.now()
    const tick = () => {
      if (check() || performance.now() - start > 2500) return resolve()
      requestAnimationFrame(tick)
    }
    tick()
  })
}

function jumpTo(hash) {
  const lenis = window.__lenis
  const el = hash ? document.getElementById(hash.slice(1)) : null
  const top = el ? el.getBoundingClientRect().top + window.scrollY : 0
  if (lenis) lenis.scrollTo(top, { immediate: true, force: true })
  window.scrollTo(0, top)
}

export default function PageTransition() {
  const router = useRouter()
  const pathname = usePathname()
  const pathRef = useRef(pathname)
  const busy = useRef(false)
  const [state, setState] = useState(null) // { label, phase: 'in' | 'out' }
  const [cols, setCols] = useState(6)

  useEffect(() => { pathRef.current = pathname }, [pathname])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setCols(mq.matches ? 6 : 4)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const go = useCallback(async (path, hash, label) => {
    if (busy.current) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const samePage = path === pathRef.current

    const navigate = async () => {
      if (!samePage) {
        router.push(path, { scroll: false })
        await waitFor(() => pathRef.current === path && (!hash || document.getElementById(hash.slice(1))))
        // let the new page's layout settle (fonts, images, pinned sections)
        await wait(80)
      }
      jumpTo(hash)
      if (hash) history.replaceState(null, '', path + hash)
    }

    if (reduce) return navigate()

    busy.current = true
    window.__ptCovering = true // pages wait for 'pt:reveal' before animating in
    window.__lenis?.stop()
    setState({ label, phase: 'in' })

    const coverTime = IN + STAGGER * (cols - 1)
    await wait(coverTime * 1000)
    await Promise.all([navigate(), wait(HOLD * 1000)])

    window.__lenis?.start()
    setState({ label, phase: 'out' })
    // Columns start lifting now: let the new page's headings rise with them.
    window.__ptCovering = false
    window.dispatchEvent(new Event('pt:reveal'))
    await wait((OUT + STAGGER * (cols - 1) + 0.25) * 1000)
    setState(null)
    busy.current = false
  }, [router, cols])

  // Intercept every internal link click on the site.
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target.closest?.('a[href]')
      if (!a || a.hasAttribute('data-no-transition') || a.hasAttribute('download')) return
      if (a.target && a.target !== '_self') return

      const url = new URL(a.href, window.location.href)
      if (url.origin !== window.location.origin) return
      // Skip-to-content and other in-page helpers
      if (a.getAttribute('href') === '#main') return

      e.preventDefault()
      const path = url.pathname
      const hash = url.hash || ''
      const label = a.getAttribute('data-transition-label') || labelFor(path, hash)
      go(path, hash, label)
    }
    // Programmatic navigation, e.g. openBooking()
    const onNavigate = (e) => {
      const { path, hash = '' } = e.detail || {}
      if (path) go(path, hash, labelFor(path, hash))
    }
    document.addEventListener('click', onClick, true)
    window.addEventListener('pt:navigate', onNavigate)
    return () => {
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('pt:navigate', onNavigate)
    }
  }, [go])

  const total = cols
  const delay = (i) => i * STAGGER

  return (
    <AnimatePresence>
      {state && (
        <div className="fixed inset-0 z-[90] pointer-events-auto" aria-hidden>
          {/* Columns */}
          <div className="absolute inset-0">
            {Array.from({ length: total }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-y-0 bg-accent"
                // overlap by 2px so no seams show between columns
                style={{
                  left: `${(i * 100) / total}%`,
                  width: `calc(${100 / total}% + 2px)`,
                  originY: state.phase === 'in' ? 1 : 0,
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: state.phase === 'in' ? 1 : 0 }}
                transition={{
                  duration: state.phase === 'in' ? IN : OUT,
                  ease: [0.76, 0, 0.24, 1],
                  delay: delay(i),
                }}
              />
            ))}
          </div>

          {/* Destination name */}
          <motion.div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 container-site text-accent-ink"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="flex items-center justify-between label !text-accent-ink"
              initial={{ opacity: 0 }}
              animate={{ opacity: state.phase === 'in' ? 1 : 0 }}
              transition={{ duration: 0.3, delay: state.phase === 'in' ? IN * 0.8 : 0 }}
            >
              <span>(Going to)</span>
              <span>Moulidoesmotion</span>
            </motion.div>

            <p className="mt-3 display text-[clamp(3.4rem,13vw,14rem)] whitespace-nowrap overflow-hidden pb-[0.06em]">
              {state.label.split('').map((ch, i) => (
                <motion.span
                  key={`${state.label}-${i}`}
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: state.phase === 'in' ? '0%' : '-110%' }}
                  transition={{
                    duration: state.phase === 'in' ? 0.7 : 0.45,
                    ease: EASE,
                    delay: state.phase === 'in' ? IN * 0.6 + i * 0.035 : i * 0.025,
                  }}
                >
                  {ch === ' ' ? ' ' : ch}
                </motion.span>
              ))}
            </p>

            <div className="mt-4 h-px bg-accent-ink/20 overflow-hidden">
              <motion.div
                className="h-full bg-accent-ink origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1, opacity: state.phase === 'in' ? 1 : 0 }}
                transition={{
                  scaleX: { duration: HOLD + 0.35, ease: [0.65, 0, 0.35, 1], delay: IN * 0.8 },
                  opacity: { duration: 0.2 },
                }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
