'use client'

// ─────────────────────────────────────────────────────────────
// ABOUT SECTION — src/components/About.jsx
// About section with rounded brand logo and bio
// ─────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <section id="about" className="section-py relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-accent-blue text-sm font-display font-600 tracking-[0.1em] uppercase mb-12"
        >
          About
        </motion.p>

        {/* Logo + Bio — Top Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
            
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-3xl overflow-hidden border border-white/20 bg-white/5 shadow-lg">
                <Image
                  src="/images/cinova-logo.png"
                  alt="Cinova Visuals Logo"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </motion.div>

            {/* Bio Text */}
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

              {/* Book a Project CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link
                  href="/book-project"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg
                             border border-white/20 bg-white/5
                             hover:border-white/40 hover:bg-white/10
                             transition-all duration-200
                             text-sm font-medium text-ink-primary"
                >
                  Book a Project
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </motion.div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  )
}
