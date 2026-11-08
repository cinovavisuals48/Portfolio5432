'use client'

// ─────────────────────────────────────────────────────────────
// HERO — src/components/Hero.jsx
// Oversized editorial headline, supporting copy, CTAs and a
// slow marquee of what I make. No background effects.
// ─────────────────────────────────────────────────────────────

import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Line, SplitText, EASE, Arrow } from './Reveal'

// Edit the rotating words here — the longest one reserves the width.
const ROTATING_WORDS = ['SaaS', 'Fintech', 'Launch Videos', 'Product Explainers', 'UI Animation']
const LONGEST = ROTATING_WORDS.reduce((a, b) => (b.length > a.length ? b : a))

function RotatingWord() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setI((n) => (n + 1) % ROTATING_WORDS.length), 2400)
    return () => clearInterval(id)
  }, [reduce])

  return (
    <span className="relative inline-grid align-baseline overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap">{LONGEST}.</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={ROTATING_WORDS[i]}
          initial={reduce ? { opacity: 0 } : { y: '100%' }}
          animate={reduce ? { opacity: 1 } : { y: '0%' }}
          exit={reduce ? { opacity: 0 } : { y: '-100%' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {ROTATING_WORDS[i]}<span className="text-accent">.</span>
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Marquee() {
  const items = [...ROTATING_WORDS, ...ROTATING_WORDS]
  return (
    <div className="group relative overflow-hidden border-y border-line py-5 md:py-7" aria-hidden>
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((word, idx) => (
              <li key={`${copy}-${idx}`} className="flex items-center">
                <span className="serif-italic text-[clamp(2rem,4.6vw,4.4rem)] leading-none px-6 md:px-10 text-ink-primary">
                  {word}
                </span>
                <span className="text-accent text-[0.7rem]">◆</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-12%'])

  return (
    <section ref={ref} id="home" className="relative pt-28 md:pt-36">
      <div className="container-site md:min-h-[calc(100svh-9rem)] flex flex-col pb-10 md:pb-14">
        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="flex items-start justify-between gap-6 mb-10 md:mb-14"
        >
          <p className="label"><span className="text-accent">●</span>&nbsp; Motion designer</p>
          <p className="label text-right">Based in India<br className="sm:hidden" /><span className="hidden sm:inline"> — </span>working globally</p>
        </motion.div>

        {/* Headline */}
        <motion.h1 style={{ y }} className="display text-[clamp(2.6rem,11.6vw,13rem)] text-ink-primary">
          <SplitText delay={0.1}>Hi, I&apos;m Mouli.</SplitText>
          <SplitText delay={0.3}>I do motion for</SplitText>
          <Line animateOnMount delay={0.35} className="serif-italic text-[min(1.06em,10.4vw)] leading-[1.02] mt-[0.04em]">
            <span className="sr-only">SaaS, Fintech, Launch Videos, Product Explainers and UI Animation.</span>
            <span aria-hidden><RotatingWord /></span>
          </Line>
        </motion.h1>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.6 }}
          className="mt-auto pt-12 grid gap-8 md:grid-cols-12 md:items-end"
        >
          <p className="md:col-span-5 text-[clamp(1.05rem,1.45vw,1.4rem)] leading-[1.4] text-ink-secondary max-w-[30ch]">
            Explainers, launch videos and UI animation for founders who want people to get their product fast.
          </p>
          <p className="label hidden md:block md:col-span-3 md:col-start-6">↓ Scroll</p>
          <div className="md:col-span-4 flex flex-wrap items-center gap-3 md:justify-end">
            <a href="/projects" className="btn-ghost">
              See the work <Arrow />
            </a>
          </div>
        </motion.div>
      </div>

      <Marquee />
    </section>
  )
}
