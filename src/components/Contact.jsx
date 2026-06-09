'use client'

// ─────────────────────────────────────────────────────────────
// CONTACT SECTION — src/components/Contact.jsx
// Clean minimal contact section
// ─────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'
import { links } from '../data/links'

const socials = [
  {
    name: 'Instagram',
    handle: '@cinova.visuals',
    href: links.instagram,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'X / Twitter',
    handle: '@Cinova_visuals',
    href: links.twitter,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
]

export default function Contact() {
  return (
    <section id="contact" className="section-py relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-accent-blue text-sm font-display font-600 tracking-[0.1em] uppercase mb-3"
        >
          Get In Touch
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display font-800 text-[clamp(2rem,4.5vw,3.5rem)]
                     leading-[1] tracking-tight text-ink-primary mb-4"
        >
          Ready to move{' '}
          <span className="text-gradient-blue">your product</span>
          <br />
          forward?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-ink-muted text-[0.92rem] max-w-md leading-relaxed mb-10"
        >
          Book a free call or reach out on social. Let&apos;s turn your product into a motion story.
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10"
        >
          <a
            href={links.bookCall}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Book a Free 30-min Call
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>

        {/* Social Links */}
        <div className="flex flex-wrap gap-3">
          {socials.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg
                         border border-thin bg-bg-card
                         hover:border-[rgba(255,255,255,0.12)] hover:bg-bg-elevated
                         transition-all duration-200 group"
            >
              <span className="text-ink-muted group-hover:text-ink-primary transition-colors">
                {social.icon}
              </span>
              <div>
                <div className="font-display font-600 text-[0.85rem] text-ink-primary">
                  {social.name}
                </div>
                <div className="text-ink-muted text-[0.75rem]">{social.handle}</div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
