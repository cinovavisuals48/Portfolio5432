'use client'

// ─────────────────────────────────────────────────────────────
// BOOK A PROJECT — src/components/BookProject.jsx
// Used by src/app/book-project/page.jsx.
// Left: giant title (letters thin out near the cursor), short intro and
// contact details. Right: the large step-by-step brief panel.
// Edit the copy in INTRO and DETAILS below.
// ─────────────────────────────────────────────────────────────

import { useRef } from 'react'
import { links } from '../data/links'
import BookingStepper from './BookingStepper'
import ProximityText from './ProximityText'
import { Reveal } from './Reveal'

const INTRO =
  "Tell me a bit about your product and what you want people to understand. I'll get back to you within 24 hours with a few questions, ideas and a rough idea of cost."

const DETAILS = [
  { label: 'Reply time', value: 'Within 24 hours' },
  { label: 'Based in', value: 'India, working with teams anywhere' },
]

const SOCIALS = [
  { name: 'Instagram', href: links.instagram },
  { name: 'X / Twitter', href: links.twitter },
]

export default function BookProject() {
  const titleRef = useRef(null)

  return (
    <section className="pt-24 md:pt-32 pb-20 md:pb-32">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-16">
        {/* Left: title, intro, details */}
        <div className="lg:col-span-5">
          <h1 ref={titleRef} className="display text-[clamp(4rem,17vw,9rem)] lg:text-[clamp(4rem,8.6vw,10rem)]">
            <span className="block whitespace-nowrap">
              <ProximityText text="Book a" areaRef={titleRef} reveal delay={0.05} />
            </span>
            <span className="block whitespace-nowrap">
              <ProximityText text="project" areaRef={titleRef} reveal delay={0.05 + 6 * 0.035} className="text-accent" />
            </span>
          </h1>

          <Reveal delay={0.3} className="mt-10 md:mt-14">
            <p className="text-[clamp(1.15rem,1.45vw,1.4rem)] leading-[1.45] text-ink-secondary max-w-[34ch]">
              {INTRO}
            </p>
          </Reveal>

          <Reveal delay={0.4} className="mt-10 md:mt-12 grid grid-cols-2 gap-x-6 gap-y-7 max-w-md">
            {DETAILS.map((d) => (
              <div key={d.label}>
                <p className="label mb-1.5">{d.label}</p>
                <p className="text-ink-primary">{d.value}</p>
              </div>
            ))}
            <div className="col-span-2">
              <p className="label mb-1.5">Elsewhere</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-1">
                {SOCIALS.map((s) => (
                  <li key={s.name}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-accent transition-colors">
                      {s.name} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Right: the brief (same 7 steps and logic as before) */}
        <div className="lg:col-span-7">
          <Reveal delay={0.35}>
            <BookingStepper />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
