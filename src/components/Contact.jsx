'use client'

// ─────────────────────────────────────────────────────────────
// CONTACT — src/components/Contact.jsx
// Giant "Book a project" line that opens the booking form,
// plus social links. Links live in src/data/links.js.
// ─────────────────────────────────────────────────────────────

import { links } from '../data/links'
import Link from 'next/link'
import { useRef } from 'react'
import { Reveal, Line, SectionLabel, Arrow } from './Reveal'
import ProximityText from './ProximityText'

const socials = [
  { name: 'Instagram', handle: '@moulidoesmotion', href: links.instagram },
  { name: 'X / Twitter', handle: '@moulidoesmotion', href: links.twitter },
]

export default function Contact() {
  const ctaRef = useRef(null)

  return (
    <section id="contact" className="pt-[clamp(5rem,11vw,10rem)] pb-16 border-t border-line">
      <div className="container-site">
        <div className="grid lg:grid-cols-12 gap-6 mb-10 md:mb-14">
          <SectionLabel index="04" className="lg:col-span-3">Get in touch</SectionLabel>
          <div className="lg:col-span-9">
            <p className="text-[clamp(1.5rem,2.8vw,2.6rem)] leading-[1.15] tracking-[-0.02em] font-medium max-w-[22ch]">
              Got a <span className="serif-italic text-accent">product</span> people should see?
            </p>
            <p className="mt-5 text-ink-muted max-w-[46ch] leading-relaxed">
              Fill out a short brief or message me on social. I usually reply within a day.
            </p>
          </div>
        </div>

        {/* Big CTA: turns blue on hover, letters near the cursor go thin */}
        <Link
          ref={ctaRef}
          href="/book-project"
          className="group relative block w-full text-left border-y border-line py-6 md:py-8 overflow-hidden"
        >
          <span className="relative flex items-end justify-between gap-6 transition-colors duration-500 group-hover:text-accent group-focus-visible:text-accent">
            <span className="display text-[clamp(2.6rem,11.4vw,13.5rem)] whitespace-nowrap">
              <Line>
                <ProximityText text="Book a project" areaRef={ctaRef} />
              </Line>
            </span>
            <Arrow size={56} className="hidden md:block mb-[2vw] shrink-0 transition-transform duration-700 ease-expo group-hover:translate-x-2" />
          </span>
        </Link>

        <Reveal className="mt-10 grid sm:grid-cols-2 lg:grid-cols-12 gap-6">
          {socials.map((s, i) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-baseline justify-between gap-4 border-b border-line pb-4 lg:col-span-3 ${i === 0 ? 'lg:col-start-4' : ''}`}
            >
              <span className="label">{s.name}</span>
              <span className="text-[1.1rem] link-underline group-hover:text-accent transition-colors">{s.handle} ↗</span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
