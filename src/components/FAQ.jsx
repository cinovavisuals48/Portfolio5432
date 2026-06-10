'use client'

// ─────────────────────────────────────────────────────────────
// FAQ SECTION — src/components/FAQ.jsx
// Accordion-style FAQ with expandable questions
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    id: 1,
    question: 'How does the process work?',
    answer: 'You fill out the intake form. I reach out, ask a few questions, and come back with a price estimate. We align on the concept and script. I storyboard in Figma. You approve. I animate. Two revision rounds, then delivery. The full breakdown is in the section above.'
  },
  {
    id: 2,
    question: 'How long does a project take?',
    answer: 'Most projects deliver within 10 business days from kickoff. Faster is sometimes possible, but not at the cost of quality. If you\'re under tight deadline, mention it in the intake form.'
  },
  {
    id: 3,
    question: 'What do I need from you to get started?',
    answer: 'Your product (a link or access), brand basics (logo as SVG, brand colors), any reference videos you like, what you want the video to achieve, and roughly how long you want it. The form walks you through everything.'
  },
  {
    id: 4,
    question: 'How many revisions are included?',
    answer: 'Two rounds. That\'s almost always enough because the storyboard locks the direction before any animation starts. Extra rounds are billed at a flat rate, agreed up front.'
  },
  {
    id: 5,
    question: 'How much does it cost?',
    answer: 'It completely depends on a few things - length, scope, and how much you bring to the table. Most projects start around $300 for something short like a 15-second clip and can go up to $2,500+ for full-length ads or explainers. I lock the price once the scope is clear.'
  },
  {
    id: 6,
    question: 'Do you work with early-stage startups?',
    answer: 'Yes. Most of my clients are founders who are still building - early product, growing team, not yet at scale. The work is built so it makes early-stage products look the way they\'re meant to.'
  }
]

export default function FAQ() {
  const [expandedId, setExpandedId] = useState(null)

  const toggleFAQ = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="faq" className="section-py relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">

        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-accent-blue text-sm font-display font-600 tracking-[0.1em] uppercase mb-3"
        >
          FAQ
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display font-800 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] tracking-tight text-ink-primary mb-3"
        >
          Things people usually{' '}
          <span className="text-accent-blue">ask</span>
        </motion.h2>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-white/10 to-transparent mb-8 lg:mb-12" />

        {/* FAQ Items */}
        <div className="space-y-1">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between py-5 lg:py-6 border-b border-white/10 hover:border-white/20 transition-colors text-left group"
              >
                <span className="font-display font-600 text-[1.05rem] lg:text-[1.15rem] text-ink-primary group-hover:text-accent-blue transition-colors">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: expandedId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-ink-muted"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {expandedId === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 lg:pb-8 pt-2 text-ink-muted text-[0.92rem] lg:text-[0.95rem] leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
