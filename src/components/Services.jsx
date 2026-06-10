'use client'

// ─────────────────────────────────────────────────────────────
// WHAT I MAKE SECTION — src/components/Services.jsx
// Services/offerings with tech stack and visual items
// ─────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'

const offerings = [
  {
    label: 'Smooth UI animations',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </svg>
    ),
    description: 'Component-level motion that makes your interface feel intentional. Hover states, transitions, micro-interactions - the details that make a product feel finished.'
  },
  {
    label: 'Product promo videos',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 7l-7 5 7 5V7z" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
    description: 'Videos that show what your product does in a way that actually converts. Built around your UI, not stock footage or generic templates.'
  },
  {
    label: 'Explainer videos',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    description: 'Breaks down a complicated feature or product into something a first-time visitor instantly gets. Clear, clean, no fluff.'
  },
  {
    label: 'Don\'t see your style here?',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" />
        <path d="M9 12l3-3 3 3" />
      </svg>
    ),
    description: 'If you have a reference or a general idea of what you\'re after, we can figure it out together. I\'ve got enough experience in After Effects to match most styles, just bring the inspiration.'
  }
]

const tools = [
  { name: 'After Effects', abbr: 'Ae', bg: '#00005B' },
  { name: 'Premiere Pro', abbr: 'Pr', bg: '#00005B' },
  { name: 'Illustrator', abbr: 'Ai', bg: '#330000' },
  { name: 'Figma', abbr: null, isSvg: 'figma' },
  { name: 'Framer', abbr: null, isSvg: 'framer' },
  { name: 'Lottie', abbr: null, isSvg: 'lottie' },
  { name: 'Notion', abbr: null, isSvg: 'notion' },
]

// Simple SVG icons for tools
const ToolIcon = ({ type }) => {
  switch (type) {
    case 'figma':
      return (
        <svg width="20" height="28" viewBox="0 0 38 57" fill="none">
          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
        </svg>
      )
    case 'framer':
      return (
        <svg width="20" height="28" viewBox="0 0 14 21" fill="none">
          <path d="M0 14H7V21L0 14Z" fill="#fff"/>
          <path d="M0 7H7L14 14H0V7Z" fill="#fff"/>
          <path d="M0 0H14L7 7H0V0Z" fill="#fff"/>
        </svg>
      )
    case 'lottie':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#00DDB3"/>
        </svg>
      )
    case 'notion':
      return (
        <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
          <path d="M6.017 4.313l55.333-4.087c6.797-.583 8.543-.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277-1.553 6.807-6.99 7.193L24.467 99.967c-4.08.193-6.023-.39-8.16-3.113L3.3 79.94c-2.333-3.113-3.3-5.443-3.3-8.167V11.113c0-3.497 1.553-6.413 6.017-6.8z" fill="#1a1a1a"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M61.35.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257-3.89c5.433-.387 6.99-2.917 6.99-7.193V20.64c0-2.21-.873-2.847-3.443-4.733L75.1 3.473l-.08-.057c-4.053-2.94-5.883-3.397-12.343-2.83L61.35.227zM25.663 19.77c-5.247.353-6.437.433-9.417-1.99L8.927 11.78c-.77-.78-.383-1.753 1.557-1.947l53.193-3.887c4.467-.39 6.793 1.167 8.54 2.527l9.123 6.61c.39.197.97 1.36 0 1.36l-54.87 3.327h-.807zm-3.39 74.027V29.593c0-2.723.77-4.083 3.887-4.28l61.293-3.5c2.917-.193 4.28 1.363 4.28 4.08v63.817c0 2.723-.58 5.053-5.053 5.247l-58.377 3.5c-4.467.193-6.03-1.17-6.03-4.66zm57.6-62.457c.387 1.75 0 3.5-1.75 3.697l-2.723.58v47.043c-2.333 1.167-4.467 1.943-6.22 1.943-2.917 0-3.693-.97-5.833-3.5L42.05 47.42v32.087l5.83 1.363s0 3.5-4.857 3.5l-13.397.78c-.387-.777 0-2.723 1.357-3.11l3.5-.97V37.59l-4.857-.39c-.387-1.75.58-4.277 3.3-4.47l14.363-.967 22.283 34.03V36.04l-4.857-.58c-.39-2.14 1.167-3.697 3.11-3.89l13.787-.83z" fill="#fff"/>
        </svg>
      )
    default:
      return null
  }
}

export default function Services() {
  return (
    <section id="what-i-make" className="section-py relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-accent-blue text-sm font-display font-600 tracking-[0.1em] uppercase mb-6"
        >
          What I Make
        </motion.p>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-800 text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-ink-primary mb-16"
        >
          What I can <span className="text-accent-blue">build for you</span>
        </motion.h2>

        {/* Service Items */}
        <div className="grid grid-cols-1 gap-5 mb-12">
          {offerings.map((offering, i) => (
            <motion.div
              key={offering.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300"
            >
              {/* Icon + Title */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent-blue/20 flex items-center justify-center flex-shrink-0 text-accent-blue">
                  {offering.icon}
                </div>
                <h3 className="font-display font-700 text-[1.1rem] text-ink-primary">
                  {offering.label}
                </h3>
              </div>
              
              {/* Description */}
              <p className="text-ink-muted text-[0.9rem] leading-relaxed">
                {offering.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack at Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-8 border-t border-white/10"
        >
          <p className="text-ink-primary font-display font-600 text-[0.95rem] mb-6">
            My tech stack
          </p>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.05 }}
                className="w-14 h-14 rounded-xl border border-white/10 bg-white/5
                           flex items-center justify-center
                           hover:border-white/20 transition-colors"
                title={tool.name}
              >
                {tool.abbr ? (
                  <span 
                    className="font-display font-700 text-[0.9rem] text-white px-2 py-1 rounded"
                    style={{ backgroundColor: tool.bg }}
                  >
                    {tool.abbr}
                  </span>
                ) : tool.isSvg ? (
                  <ToolIcon type={tool.isSvg} />
                ) : (
                  <span className="font-display font-600 text-[0.75rem] text-neutral-600">
                    {tool.name.slice(0, 2)}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
