'use client'

// ─────────────────────────────────────────────────────────────
// WHY ME — src/components/WhyMe.jsx
// Four columns separated by hairlines.
// ─────────────────────────────────────────────────────────────

import { Reveal, Line, SectionLabel } from './Reveal'

const features = [
  {
    title: 'Built around your product',
    description: 'The work mirrors how the product actually feels. Smooth easing, real UI patterns, restrained motion. No templates or AI generated content.',
  },
  {
    title: 'Delivered in 10 business days',
    description: 'From the moment we kick off, you have final files within 10 working days. Fast enough to keep your launch on track, thorough enough to get it right.',
  },
  {
    title: 'Aligned before production',
    description: 'Every project starts with a Figma storyboard you approve. By the time animation begins, there are no surprises.',
  },
  {
    title: 'Two clean revision rounds',
    description: 'Two revision rounds included in every project. Scope stays clear, delivery stays on time.',
  },
]

export default function WhyMe() {
  return (
    <section id="why-me" className="section-py border-t border-line">
      <div className="container-site">
        <div className="grid lg:grid-cols-12 gap-6 mb-14 md:mb-20">
          <SectionLabel index="04" className="lg:col-span-3">Why me</SectionLabel>
          <h2 className="lg:col-span-9 display text-[clamp(2.8rem,7vw,7.5rem)]">
            <Line>What makes this</Line>
            <Line delay={0.08}><span className="serif-italic">different</span></Line>
          </h2>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-line">
          {features.map((f, i) => (
            <Reveal
              as="li"
              key={f.title}
              delay={i * 0.06}
              className="border-b border-line sm:[&:nth-child(odd)]:border-r lg:border-r lg:[&:last-child]:border-r-0 pt-6 pb-10 sm:pr-6 sm:[&:nth-child(even)]:pl-6 lg:pl-6 lg:first:pl-0"
            >
              <span className="label text-accent">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-10 text-[1.4rem] leading-[1.15] tracking-[-0.01em] font-medium">{f.title}</h3>
              <p className="mt-4 text-ink-muted leading-relaxed text-[0.95rem]">{f.description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
