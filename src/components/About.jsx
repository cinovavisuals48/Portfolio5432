'use client'

// ─────────────────────────────────────────────────────────────
// ABOUT SECTION — src/components/About.jsx
// About section with rounded brand logo and bio
// ─────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useBooking } from '../context/BookingContext'

export default function About() {
  const { openBooking } = useBooking()

  return (
    <section id="about" className="section-py relative overflow-hidden">
      <div className="max-w-[clamp(1280px,82vw,1920px)] mx-auto px-6 relative z-10">

        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[#A3A3A3] text-sm font-display font-600 tracking-[0.1em] uppercase mb-12"
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
                {/* TODO: Replace with new Moulidoesmotion logo file at /images/logo.png */}
                <Image
                  src="/images/logo.png"
                  alt="Moulidoesmotion Logo"
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
                  Hey, I&apos;m <span className="text-ink-primary font-medium">Mouli</span>. I&apos;m 22 and I&apos;ve been obsessed with motion design for a while now.
                </p>
                <p>
                  Most of my work right now is focused on SaaS, product videos, explainers, and UI animation. I enjoy taking products and ideas that can feel complicated and turning them into something clear, engaging, and fun to watch.
                </p>
                <p>
                  I&apos;m also exploring 2D, 3D, and more story-driven animation to keep expanding what I can create with motion.
                </p>
                <p>
                  I&apos;m always learning, experimenting, and looking for new ways to make better work.
                </p>
              </div>

              {/* Book a Project CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="btn-book-project cursor-pointer"
                >
                  Book a Project
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </motion.div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  )
}
