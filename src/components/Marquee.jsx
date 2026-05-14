'use client'

// ─────────────────────────────────────────────────────────────
// MARQUEE STRIP — src/components/Marquee.jsx
// Subtle infinite scrolling text strip
// ─────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'

const items = [
  'SaaS Motion Design',
  'UI Animation',
  'Product Explainers',
  'Launch Videos',
  'Motion Systems',
  'After Effects',
  'Cinematic Quality',
]

const doubled = [...items, ...items]

export default function Marquee() {
  return (
    <div className="relative overflow-hidden py-5 border-y border-[rgba(255,255,255,0.04)]">
      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-20 z-10
                      bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 z-10
                      bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />

      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 text-[0.72rem] font-display
                       font-600 text-ink-subtle tracking-[0.1em] uppercase"
          >
            {item}
            <span className="w-1 h-1 rounded-full bg-accent-blue/50 inline-block" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
