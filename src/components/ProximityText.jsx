'use client'

// ─────────────────────────────────────────────────────────────
// PROXIMITY TEXT — src/components/ProximityText.jsx
// Each letter's weight reacts to the cursor: letters near the
// pointer go thin, letters further away stay bold. Weights ease
// toward their target every frame so it feels fluid.
// Pass the element to listen on as `areaRef` (e.g. the button).
// Touch screens and reduced-motion users get plain text.
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTransitionReady, LETTER_STAGGER, EASE as REVEAL_EASE } from './Reveal'

const BOLD = 800   // resting weight
const THIN = 200   // weight right under the cursor
const WIDTH = 75   // matches .display
const EASE = 0.14  // 0–1, how quickly letters follow

// `reveal`: letters also rise in one by one (left first) when the page
// appears, matching the page-transition stagger. `delay` offsets that.
export default function ProximityText({ text, areaRef, radius = 0.22, className = '', reveal = false, delay = 0 }) {
  const reduce = useReducedMotion()
  const ready = useTransitionReady()
  const letters = useRef([])
  const weights = useRef([])
  const pointer = useRef(null) // { x, y } in viewport px, or null when away

  useEffect(() => {
    const area = areaRef?.current
    if (!area) return
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    weights.current = letters.current.map(() => BOLD)
    let raf = 0
    let running = false

    const tick = () => {
      const p = pointer.current
      const reach = area.getBoundingClientRect().width * radius
      let settled = true
      letters.current.forEach((el, i) => {
        if (!el) return
        let target = BOLD
        if (p) {
          const r = el.getBoundingClientRect()
          const dx = p.x - (r.left + r.width / 2)
          const dy = p.y - (r.top + r.height / 2)
          const t = Math.min(1, Math.hypot(dx, dy) / reach)
          // smooth falloff: thin at the cursor, bold at the edge of reach
          const eased = t * t * (3 - 2 * t)
          target = THIN + (BOLD - THIN) * eased
        }
        const w = weights.current[i] + (target - weights.current[i]) * EASE
        weights.current[i] = w
        if (Math.abs(target - w) > 0.5) settled = false
        el.style.fontVariationSettings = `'wght' ${w.toFixed(1)}, 'wdth' ${WIDTH}`
      })
      if (settled && !p) { running = false; return }
      raf = requestAnimationFrame(tick)
    }
    const start = () => { if (!running) { running = true; raf = requestAnimationFrame(tick) } }

    const onMove = (e) => { pointer.current = { x: e.clientX, y: e.clientY }; start() }
    const onLeave = () => { pointer.current = null; start() }
    area.addEventListener('pointermove', onMove)
    area.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      area.removeEventListener('pointermove', onMove)
      area.removeEventListener('pointerleave', onLeave)
    }
  }, [areaRef, radius])

  return (
    <span className={`${className} ${reveal ? 'inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom' : ''}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.split('').map((ch, i) => (
          <span
            key={i}
            ref={(el) => (letters.current[i] = el)}
            className="inline-block"
            style={{ fontVariationSettings: `'wght' ${BOLD}, 'wdth' ${WIDTH}` }}
          >
            {reveal ? (
              <motion.span
                className="inline-block will-change-transform"
                initial={reduce ? { opacity: 0 } : { y: '110%' }}
                animate={ready ? (reduce ? { opacity: 1 } : { y: '0%' }) : undefined}
                transition={{ duration: reduce ? 0.3 : 0.9, ease: REVEAL_EASE, delay: delay + i * LETTER_STAGGER }}
              >
                {ch === ' ' ? ' ' : ch}
              </motion.span>
            ) : (ch === ' ' ? ' ' : ch)}
          </span>
        ))}
      </span>
    </span>
  )
}
