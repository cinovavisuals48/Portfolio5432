'use client'

// ─────────────────────────────────────────────────────────────
// PROCESS — src/components/Process.jsx
// Five steps as large numbered rows.
// ─────────────────────────────────────────────────────────────

import { Reveal, Line, SectionLabel } from './Reveal'

const steps = [
  {
    title: 'Intake form',
    description: "You fill out a short form with the project goal, references, brand assets, and budget. If you have a script, send it. If not, we'll write one together.",
  },
  {
    title: 'First contact',
    description: 'You fill out the intake form. I review it, reach out with a few questions, and come back with a price estimate based on your scope.',
  },
  {
    title: 'Storyboard & script',
    description: "I build a frame-by-frame storyboard in Figma so you can see every scene before animation starts. If you don't have a script yet, I'll write one based on your brief.",
  },
  {
    title: 'Animation in After Effects',
    description: "Once the storyboard and script are approved, I move into After Effects. You don't have to manage anything during this phase, just wait for the first cut.",
  },
  {
    title: 'Two revision rounds, then delivery',
    description: 'If something needs adjusting, two rounds of revisions are included at no extra cost. Final files delivered in every aspect ratio you need.',
  },
]

export default function Process() {
  return (
    <section id="process" className="section-py border-t border-line">
      <div className="container-site">
        <div className="grid lg:grid-cols-12 gap-6 mb-14 md:mb-20">
          <SectionLabel index="05" className="lg:col-span-3">The process</SectionLabel>
          <h2 className="lg:col-span-9 display text-[clamp(2.8rem,7vw,7.5rem)]">
            <Line>From brief to delivery</Line>
            <Line delay={0.08}>in <span className="serif-italic">five</span> steps</Line>
          </h2>
        </div>

        <ol className="border-t border-line">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.04} className="group border-b border-line">
              <div className="grid grid-cols-[auto_1fr] lg:grid-cols-12 gap-x-6 gap-y-3 py-8 md:py-10 items-baseline">
                <span className="display text-[clamp(2.6rem,4.6vw,4.4rem)] text-ink-subtle transition-colors duration-500 group-hover:text-accent lg:col-span-3">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="lg:col-span-4 text-[clamp(1.3rem,2vw,1.8rem)] leading-[1.15] tracking-[-0.01em] font-medium">
                  {s.title}
                </h3>
                <p className="col-start-2 lg:col-start-auto lg:col-span-5 text-ink-muted leading-relaxed max-w-[52ch]">
                  {s.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
