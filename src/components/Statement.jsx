'use client'

// ─────────────────────────────────────────────────────────────
// STATEMENT — src/components/Statement.jsx
// Short intro on the home page. Words light up one by one as you
// scroll past. Wrap a word in *asterisks* for italic serif and in
// _underscores_ for the blue accent. The full bio lives on /about.
// ─────────────────────────────────────────────────────────────

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const TEXT =
  "I'm Mouli, a motion designer creating *engaging* product animations and bringing digital experiences to life through _motion._"

function Word({ progress, range, children }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return <motion.span style={{ opacity }}>{children}</motion.span>
}

function styled(raw) {
  if (raw.startsWith('*')) return <span className="serif-italic font-normal">{raw.replace(/\*/g, '')}</span>
  if (raw.startsWith('_')) return <span className="text-accent">{raw.replace(/_/g, '')}</span>
  return raw
}

// While pinned, words light up across this slice of the scroll (0–1).
// The rest is a short hold before the section scrolls away.
const START = 0.04
const END = 0.78

export default function Statement() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const words = TEXT.split(' ')
  const step = (END - START) / words.length

  const content = (
    <div className="container-site w-full">
      <p className="label !text-accent mb-8 md:mb-12">(Hello)</p>
      <p className="font-display font-bold [font-variation-settings:'wdth'_82] text-[clamp(2.1rem,5.4vw,6rem)] leading-[1.02] tracking-[-0.02em] max-w-[24ch]">
        <span className="sr-only">{TEXT.replace(/[*_]/g, '')}</span>
        <span aria-hidden>
          {words.map((raw, i) => (
            <span key={i}>
              {reduce ? styled(raw) : (
                <Word progress={scrollYProgress} range={[START + i * step, START + (i + 1) * step]}>
                  {styled(raw)}
                </Word>
              )}{' '}
            </span>
          ))}
        </span>
      </p>
    </div>
  )

  // Reduced motion: plain section, no pinning.
  if (reduce) {
    return (
      <section id="hello" ref={ref} className="relative section-py border-t border-line">
        {content}
      </section>
    )
  }

  // The section is tall; its inner panel sticks to the screen while you
  // scroll through it, so the text stays put as the words light up.
  return (
    <section id="hello" ref={ref} className="relative h-[220vh] border-t border-line">
      <div className="sticky top-0 h-[100svh] flex items-center overflow-hidden">
        {content}
      </div>
    </section>
  )
}
