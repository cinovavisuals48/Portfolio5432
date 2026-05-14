'use client'

// ─────────────────────────────────────────────────────────────
// HERO SECTION — src/components/Hero.jsx
// Clean, minimal hero with black/grey gradient
// ─────────────────────────────────────────────────────────────

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { links } from '../data/links'

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

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: '7rem', paddingBottom: '5rem' }}
    >
      {/* Background Elements */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Subtle radial gradient */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[800px] h-[600px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]"
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
        className="relative z-10 max-w-7xl mx-auto px-6 w-full"
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
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mr-2 inline-block" />
              Motion Designer
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-800 leading-[0.95] tracking-tight mb-8"
          >
            <span className="block text-[clamp(3rem,8vw,7rem)] text-ink-primary">
              Motion Design
            </span>
            <span className="block text-[clamp(3rem,8vw,7rem)] text-gradient-blue">
              That Converts.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="font-body text-ink-muted text-[clamp(1rem,1.5vw,1.15rem)]
                       leading-relaxed max-w-xl mb-10"
          >
            I create SaaS explainers, product launch videos, and UI animations
            that help founders make their products stand out.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-primary"
            >
              View Projects
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M3 7.5h9M7.5 3l4.5 4.5L7.5 12" stroke="currentColor"
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <a
              href={links.bookCall}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Book a Call
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
