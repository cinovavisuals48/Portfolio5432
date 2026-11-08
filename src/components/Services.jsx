'use client'

// ─────────────────────────────────────────────────────────────
// WHAT I MAKE — src/components/Services.jsx
// Numbered typographic rows. No cards, no icons.
// ─────────────────────────────────────────────────────────────

import { Reveal, Line, SectionLabel } from './Reveal'

const offerings = [
  {
    label: 'Smooth UI animations',
    description: "Motion for the small stuff: hover states, transitions and micro-interactions. It's the detail that makes an interface feel finished.",
  },
  {
    label: 'Product promo videos',
    description: 'Short videos that show what your product does and why it matters. Built from your real UI, not stock footage or templates.',
  },
  {
    label: 'Explainer videos',
    description: 'I take a complicated product or feature and make it simple enough for a first-time visitor to understand in seconds.',
  },
  {
    label: "Don't see your style here?",
    description: "Send me a reference or even a rough idea and we'll work it out together. I can match most styles in After Effects.",
  },
]

const tools = ['After Effects', 'Premiere Pro', 'Illustrator', 'Figma', 'Framer', 'Lottie', 'Notion']

export default function Services() {
  return (
    <section id="what-i-make" className="section-py border-t border-line">
      <div className="container-site">
        <div className="grid lg:grid-cols-12 gap-6 mb-14 md:mb-20">
          <SectionLabel index="02" className="lg:col-span-3">What I make</SectionLabel>
          <h2 className="lg:col-span-9 display text-[clamp(2.8rem,7vw,7.5rem)]">
            <Line>What I can</Line>
            <Line delay={0.08}><span className="serif-italic">build</span> for you</Line>
          </h2>
        </div>

        <ol className="border-t border-line">
          {offerings.map((o, i) => (
            <Reveal as="li" key={o.label} delay={i * 0.05} className="group border-b border-line">
              <div className="grid grid-cols-[auto_1fr] lg:grid-cols-12 gap-x-6 gap-y-3 py-8 md:py-10">
                <span className="label pt-2 lg:col-span-3 transition-colors duration-500 group-hover:text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="lg:col-span-4 text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.1] tracking-[-0.02em] font-medium transition-transform duration-700 ease-expo group-hover:translate-x-2">
                  {o.label}
                </h3>
                <p className="col-start-2 lg:col-start-auto lg:col-span-5 text-ink-muted leading-relaxed max-w-[52ch]">
                  {o.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-14 grid lg:grid-cols-12 gap-6">
          <p className="label lg:col-span-3">Tools I use</p>
          <ul className="lg:col-span-9 flex flex-wrap gap-x-2 gap-y-1 text-[clamp(1.1rem,1.6vw,1.45rem)] text-ink-secondary">
            {tools.map((t, i) => (
              <li key={t}>
                {t}
                {i < tools.length - 1 && <span className="text-ink-subtle">,</span>}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
