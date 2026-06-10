'use client'

// ─────────────────────────────────────────────────────────────
// WHY ME SECTION — src/components/WhyMe.jsx
// Four-card grid layout highlighting key differentiators
// ─────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7l-6-6H5c-1.1 0-2 .9-2 2z"/>
        <polyline points="14 3 14 8 19 8"/>
      </svg>
    ),
    title: 'Built around your product',
    description: 'The work mirrors how the product actually feels. Smooth easing, real UI patterns, restrained motion. No templates or AI generated content.'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Delivered in 10 business days',
    description: 'From the moment we kick off, you have final files within 10 working days. Fast enough to keep your launch on track, thorough enough to get it right.'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3L5.5 9.5L3 15"/>
        <path d="M15 3l3.5 6.5L21 15"/>
        <line x1="12" y1="3" x2="12" y2="15"/>
        <path d="M3 15h18"/>
      </svg>
    ),
    title: 'Aligned before production',
    description: 'Every project starts with a Figma storyboard you approve. By the time animation begins, there are no surprises.'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
      </svg>
    ),
    title: 'Two clean revision rounds',
    description: 'Two revision rounds included in every project. Scope stays clear, delivery stays on time.'
  }
]

export default function WhyMe() {
  return (
    <section id="why-me" className="section-py relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-accent-blue text-sm font-display font-600 tracking-[0.1em] uppercase mb-3"
        >
          Why Me
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display font-800 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] tracking-tight text-ink-primary mb-12"
        >
          What makes this different
        </motion.h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-accent-blue/20 flex items-center justify-center mb-4 text-accent-blue">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="font-display font-700 text-[1.1rem] text-ink-primary mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-ink-muted text-[0.9rem] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
