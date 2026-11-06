'use client'

// ─────────────────────────────────────────────────────────────
// FAQ — src/components/FAQ.jsx
// Hairline accordion. Plus sign rotates to a cross when open.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal, Line, SectionLabel, EASE } from './Reveal'

const faqs = [
  {
    id: 1,
    question: 'How does the process work?',
    answer: 'You fill out the intake form. I reach out, ask a few questions, and come back with a price estimate. We align on the concept and script. I storyboard in Figma. You approve. I animate. Two revision rounds, then delivery. The full breakdown is in the section above.',
  },
  {
    id: 2,
    question: 'How long does a project take?',
    answer: "Most projects deliver within 10 business days from kickoff. Faster is sometimes possible, but not at the cost of quality. If you're under tight deadline, mention it in the intake form.",
  },
  {
    id: 3,
    question: 'What do I need from you to get started?',
    answer: 'Your product (a link or access), brand basics (logo as SVG, brand colors), any reference videos you like, what you want the video to achieve, and roughly how long you want it. The form walks you through everything.',
  },
  {
    id: 4,
    question: 'How many revisions are included?',
    answer: "Two rounds. That's almost always enough because the storyboard locks the direction before any animation starts. Extra rounds are billed at a flat rate, agreed up front.",
  },
  {
    id: 5,
    question: 'How much does it cost?',
    answer: 'It completely depends on a few things - length, scope, and how much you bring to the table. Most projects start around $300 for something short like a 15-second clip and can go up to $2,500+ for full-length ads or explainers. I lock the price once the scope is clear.',
  },
  {
    id: 6,
    question: 'Do you work with early-stage startups?',
    answer: "Yes. Most of my clients are founders who are still building - early product, growing team, not yet at scale. The work is built so it makes early-stage products look the way they're meant to.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="section-py border-t border-line">
      <div className="container-site grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <SectionLabel index="03">FAQ</SectionLabel>
        </div>
        <div className="lg:col-span-9">
          <h2 className="display text-[clamp(2.8rem,7vw,7.5rem)] mb-14 md:mb-20">
            <Line>Things people</Line>
            <Line delay={0.08}>usually <span className="serif-italic">ask</span></Line>
          </h2>

          <ul className="border-t border-line">
            {faqs.map((faq, i) => {
              const isOpen = open === faq.id
              return (
                <Reveal as="li" key={faq.id} delay={i * 0.03} className="border-b border-line">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${faq.id}`}
                      className="w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left group"
                    >
                      <span className="text-[clamp(1.15rem,1.8vw,1.6rem)] tracking-[-0.01em] font-medium transition-colors group-hover:text-accent">
                        {faq.question}
                      </span>
                      <span className="relative w-4 h-4 shrink-0" aria-hidden>
                        <span className="absolute left-0 top-1/2 w-4 h-px bg-current" />
                        <span className={`absolute left-1/2 top-0 w-px h-4 bg-current transition-transform duration-500 ease-expo ${isOpen ? 'scale-y-0' : ''}`} />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-${faq.id}`}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="pb-8 text-ink-muted leading-relaxed max-w-[62ch]">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
