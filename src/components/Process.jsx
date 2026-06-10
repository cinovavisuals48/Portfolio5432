'use client'

// ─────────────────────────────────────────────────────────────
// PROCESS SECTION — src/components/Process.jsx
// Five-step workflow timeline from brief to delivery
// ─────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Intake form',
    description: 'You fill out a short form with the project goal, references, brand assets, and budget. If you have a script, send it. If not, we\'ll write one together.'
  },
  {
    number: '02',
    title: 'First contact',
    description: 'You fill out the intake form. I review it, reach out with a few questions, and come back with a price estimate based on your scope.'
  },
  {
    number: '03',
    title: 'Storyboard & script',
    description: 'I build a frame-by-frame storyboard in Figma so you can see every scene before animation starts. If you don\'t have a script yet, I\'ll write one based on your brief.'
  },
  {
    number: '04',
    title: 'Animation in After Effects',
    description: 'Once the storyboard and script are approved, I move into After Effects. You don\'t have to manage anything during this phase, just wait for the first cut.'
  },
  {
    number: '05',
    title: 'Two revision rounds, then delivery',
    description: 'If something needs adjusting, two rounds of revisions are included at no extra cost. Final files delivered in every aspect ratio you need.'
  }
]

export default function Process() {
  return (
    <section id="process" className="section-py relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-accent-blue text-sm font-display font-600 tracking-[0.1em] uppercase mb-3"
        >
          The Process
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display font-800 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] tracking-tight text-ink-primary mb-12"
        >
          From brief to delivery in{' '}
          <span className="text-accent-blue">five</span> steps
        </motion.h2>

        {/* Steps Timeline */}
        <div className="space-y-1">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-b border-white/10 py-8 flex gap-6 lg:gap-12 group hover:border-white/20 transition-colors"
            >
              {/* Number */}
              <div className="flex-shrink-0 w-16 lg:w-24">
                <span className="font-display font-800 text-[2.5rem] lg:text-[3rem] text-ink-muted/40 group-hover:text-ink-muted/60 transition-colors">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-700 text-[1.2rem] text-ink-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-ink-muted text-[0.92rem] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
