'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

// Your Tally form - maintains dark theme colors
const TALLY_FORM_URL = 'https://tally.so/r/eqzGOq'

export default function ProjectForm() {
  const [submitted, setSubmitted] = useState(false)

  // Scroll to form after a brief delay to let animation complete
  const handleFormOpen = () => {
    setTimeout(() => {
      const formElement = document.getElementById('tally-form')
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 300)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-bg-primary to-bg-secondary"
      >
        <div className="text-center max-w-md">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-accent-blue rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </motion.div>
          <h2 className="font-display font-800 text-3xl text-ink-primary mb-3">
            Message Received!
          </h2>
          <p className="text-ink-muted text-base leading-relaxed mb-8">
            Thanks for reaching out. I'll review your project details and get back to you within 24 hours.
          </p>
          <a
            href="/"
            className="btn-primary inline-flex"
          >
            Back to Home
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="mb-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-accent-blue text-sm font-display font-600 tracking-[0.1em] uppercase mb-2"
        >
          Book a Project
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display font-800 text-[clamp(2.5rem,5vw,4rem)] leading-[1] tracking-tight text-ink-primary mb-3"
        >
          Let&apos;s work <span className="text-gradient-blue">together.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-ink-muted text-base leading-relaxed mb-8"
        >
          Tell me about your project. Takes less than 2 minutes and I&apos;ll get back to you within a day.
        </motion.p>
      </div>

      {/* Tally Form Embed Container */}
      <motion.div
        id="tally-form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="w-full cursor-none"
      >
        <iframe
          src={TALLY_FORM_URL}
          loading="lazy"
          style={{
            colorScheme: 'dark',
            width: '100%',
            height: 'auto',
            border: 'none',
            borderRadius: '1rem',
            cursor: 'none',
          }}
          title="Book a Project – Cinova Visuals"
          className="min-h-[600px] md:min-h-[700px]"
        />
      </motion.div>
    </motion.div>
  )
}
