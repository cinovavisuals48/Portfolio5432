'use client'

// ─────────────────────────────────────────────────────────────
// REVEAL HELPERS — src/components/Reveal.jsx
// Small, restrained motion primitives shared across sections.
// All of them respect prefers-reduced-motion.
// ─────────────────────────────────────────────────────────────

import { Children, isValidElement, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'

export const EASE = [0.16, 1, 0.3, 1]

// Fade + small rise when the element scrolls into view.
export function Reveal({ children, delay = 0, y = 24, className = '', as = 'div', ...rest }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const ready = useTransitionReady() // wait until the transition cover lifts
  const Tag = motion[as] ?? motion.div
  const hidden = reduce ? { opacity: 0 } : { opacity: 0, y }
  return (
    <Tag
      ref={ref}
      initial={hidden}
      animate={inView && ready ? { opacity: 1, y: 0 } : hidden}
      transition={{ duration: reduce ? 0.3 : 0.9, ease: EASE, delay }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// True once the page is visible. While the page transition's blue
// columns cover the screen this stays false, then flips to true the
// moment the columns start lifting — so entrance animations play in
// view instead of hidden under the cover.
export function useTransitionReady() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (!window.__ptCovering) { setReady(true); return }
    const go = () => setReady(true)
    window.addEventListener('pt:reveal', go, { once: true })
    return () => window.removeEventListener('pt:reveal', go)
  }, [])
  return ready
}

// Big heading that rises letter by letter, left first — the same
// staggered motion as the page-transition columns. Plain strings and
// simple <span className="…">text</span> children are split.
export const LETTER_STAGGER = 0.035
export function SplitText({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion()
  const ready = useTransitionReady()

  // Flatten children into [{ text, className }]
  const parts = []
  Children.forEach(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number') parts.push({ text: String(child) })
    else if (isValidElement(child)) parts.push({ text: String(child.props.children ?? ''), className: child.props.className })
  })

  let n = 0
  const label = parts.map((p) => p.text).join('')
  return (
    <span className={`block ${className}`}>
      <span className="sr-only">{label}</span>
      <span aria-hidden className="block">
        {parts.map((part, pi) =>
          part.text.split(/(\s+)/).map((word, wi) => {
            if (!word) return null
            if (/^\s+$/.test(word)) return <span key={`${pi}-${wi}`}>{' '}</span>
            return (
              <span key={`${pi}-${wi}`} className={`inline-block whitespace-nowrap overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom ${part.className ?? ''}`}>
                {word.split('').map((ch, ci) => {
                  const i = n++
                  return (
                    <motion.span
                      key={ci}
                      className="inline-block will-change-transform"
                      initial={reduce ? { opacity: 0 } : { y: '110%' }}
                      animate={ready ? (reduce ? { opacity: 1 } : { y: '0%' }) : undefined}
                      transition={{ duration: reduce ? 0.3 : 0.9, ease: EASE, delay: delay + i * LETTER_STAGGER }}
                    >
                      {ch}
                    </motion.span>
                  )
                })}
              </span>
            )
          })
        )}
      </span>
    </span>
  )
}

// A single line of text that slides up from behind a mask.
// `animateOnMount` plays immediately (used in the hero); otherwise on view.
export function Line({ children, delay = 0, className = '', animateOnMount = false }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  // Observe the visible wrapper (the inner span starts fully clipped).
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const ready = useTransitionReady()
  const show = ready && (animateOnMount || inView)
  const hidden = reduce ? { opacity: 0 } : { y: '105%' }
  const shown = reduce ? { opacity: 1 } : { y: '0%' }

  return (
    <span ref={ref} className={`block overflow-hidden pb-[0.06em] -mb-[0.06em] ${className}`}>
      <motion.span
        className="block will-change-transform"
        initial={hidden}
        animate={show ? shown : hidden}
        transition={{ duration: reduce ? 0.3 : 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

// Section label like "(02) Selected work"
export function SectionLabel({ index, children, className = '' }) {
  return (
    <p className={`label flex items-center gap-3 ${className}`}>
      {index && <span className="text-accent">({index})</span>}
      <span>{children}</span>
    </p>
  )
}

export function Arrow({ className = '', size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden className={className}>
      <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
    </svg>
  )
}
