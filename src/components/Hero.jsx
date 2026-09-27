'use client'

// ─────────────────────────────────────────────────────────────
// HERO SECTION — src/components/Hero.jsx
// Clean, minimal hero with black/grey gradient
// ─────────────────────────────────────────────────────────────

import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { links } from '../data/links'
import Beams from './Beams'
import { useBooking } from '../context/BookingContext'

const ROTATING_WORDS = [
  'SaaS',
  'Fintech',
  'Launch Videos',
  'Product Explainers',
  'UI Animation',
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const wordSlideVariants = {
  initial: {
    y: '100%',
    opacity: 0,
  },
  animate: {
    y: '0%',
    opacity: 1,
    transition: {
      y: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.3, ease: 'easeOut' },
    },
  },
  exit: {
    y: '-100%',
    opacity: 0,
    transition: {
      y: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.25, ease: 'easeIn' },
    },
  },
}

const reducedMotionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export default function Hero() {
  const { openBooking } = useBooking()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  const [wordIndex, setWordIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) return

    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length)
    }, 2200)

    return () => clearInterval(interval)
  }, [shouldReduceMotion])

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: '7rem', paddingBottom: '5rem' }}
    >
      {/* Background Elements */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* 3D Animated Beams */}
        <div
          className="absolute inset-0 z-0 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 60%, transparent 100%)',
          }}
        >
          <Beams
            beamWidth={2}
            beamHeight={18}
            beamNumber={14}
            lightColor="#ffffff"
            beamColor="#000000"
            backgroundColor="#000000"
            speed={1.6}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={-12}
          />
        </div>

        {/* Subtle radial gradient */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[800px] h-[600px] rounded-full opacity-[0.03] z-10"
          style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)' }}
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] z-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y }}
        className="relative z-10 max-w-[clamp(1280px,82vw,1920px)] mx-auto px-6 w-full"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="tag-pill">
              <span className="w-1.5 h-1.5 rounded-full bg-white mr-2 inline-block" />
              Motion Designer
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-800 leading-[1.05] tracking-tight mb-8 text-[clamp(2.5rem,5.5vw,5.5rem)]"
          >
            {/* Screen reader full announcement */}
            <span className="sr-only">
              Hi, I&apos;m Mouli. I do motion for SaaS, Fintech, Launch Videos, Product Explainers, and UI Animation.
            </span>

            {/* Visual presentation */}
            <span aria-hidden="true" className="block text-ink-primary">
              Hi, I&apos;m Mouli.
            </span>
            <span aria-hidden="true" className="block text-ink-primary">
              I do motion for{' '}
              <span className="inline-grid relative overflow-hidden align-baseline py-1 -my-1">
                {/* Longest word placeholder to reserve exact width & prevent any layout shift */}
                <span className="invisible opacity-0 pointer-events-none select-none col-start-1 row-start-1 whitespace-nowrap">
                  Product Explainers.
                </span>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={ROTATING_WORDS[wordIndex]}
                    variants={shouldReduceMotion ? reducedMotionVariants : wordSlideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="col-start-1 row-start-1 block whitespace-nowrap text-gradient-mono"
                  >
                    {ROTATING_WORDS[wordIndex]}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="font-body text-ink-muted text-[clamp(1rem,1.3vw,1.4rem)]
                       leading-relaxed max-w-xl mb-10"
          >
            Explainers, launch videos, and UI animation for founders who want their product to stand out.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
            <button
              type="button"
              onClick={() => openBooking()}
              className="btn-book-project cursor-pointer"
            >
              Book a Project
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M3 7.5h9M7.5 3l4.5 4.5L7.5 12" stroke="currentColor"
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-work"
            >
              See Work
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-ink-subtle text-[0.7rem] tracking-[0.15em] uppercase">Scroll</span>
        <motion.div
          className="w-[1px] h-8 bg-gradient-to-b from-ink-subtle to-transparent"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  )
}
