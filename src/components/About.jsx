'use client'

// ─────────────────────────────────────────────────────────────
// ABOUT SECTION — src/components/About.jsx
// Clean about section without stats (no client work yet)
// ─────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="section-py relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-accent-blue text-sm font-display font-600 tracking-[0.1em] uppercase mb-3"
        >
          About
        </motion.p>

        {/* Headline + Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left — Headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-800 text-[clamp(1.8rem,3.5vw,3rem)]
                           leading-[1.1] tracking-tight text-ink-primary">
              Motion made for{' '}
              <span className="text-gradient-blue">products</span>{' '}
              that mean business.
            </h2>
          </motion.div>

          {/* Right — Bio */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="space-y-4 text-ink-muted leading-relaxed text-[0.92rem]">
              <p>
                Hey, I&apos;m the creator behind{' '}
                <span className="text-ink-primary font-medium">Cinova Visuals</span>
                . I craft motion design for SaaS products, startups, and
                anyone who wants their product to truly move.
              </p>
              <p>
                I turn complex ideas into compelling visual stories through
                explainer videos, product launches, and smooth UI animations.
              </p>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  )
}
