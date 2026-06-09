'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ProjectForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    contactMethod: 'Email',
    projectDescription: '',
    inspiration: '',
    deadline: 'Within 1-2 weeks',
    videoLength: '20-40s',
    budget: '$300-$600',
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Send form data to your email or API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          fullName: '',
          email: '',
          whatsapp: '',
          contactMethod: 'Email',
          projectDescription: '',
          inspiration: '',
          deadline: 'Within 1-2 weeks',
          videoLength: '20-40s',
          budget: '$300-$600',
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
    }
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
      <div className="mb-8">
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
          className="text-ink-muted text-base leading-relaxed"
        >
          Tell me about your project. Takes less than 2 minutes and I&apos;ll get back to you within a day.
        </motion.p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <label className="block text-ink-primary font-medium text-sm mb-2">
            Full name <span className="text-accent-blue">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Jane Doe"
            required
            className="w-full px-4 py-3 rounded-lg bg-bg-card border border-[rgba(255,255,255,0.08)]
                       focus:border-accent-blue focus:outline-none transition-colors
                       text-ink-primary placeholder-ink-subtle"
          />
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-ink-primary font-medium text-sm mb-2">
            Email <span className="text-accent-blue">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@company.com"
            required
            className="w-full px-4 py-3 rounded-lg bg-bg-card border border-[rgba(255,255,255,0.08)]
                       focus:border-accent-blue focus:outline-none transition-colors
                       text-ink-primary placeholder-ink-subtle"
          />
        </motion.div>

        {/* WhatsApp */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <label className="block text-ink-primary font-medium text-sm mb-2">
            WhatsApp number <span className="text-ink-subtle">(optional)</span>
          </label>
          <input
            type="tel"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            placeholder="+1 555 123 4567"
            className="w-full px-4 py-3 rounded-lg bg-bg-card border border-[rgba(255,255,255,0.08)]
                       focus:border-accent-blue focus:outline-none transition-colors
                       text-ink-primary placeholder-ink-subtle"
          />
        </motion.div>

        {/* Preferred Contact Method */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="block text-ink-primary font-medium text-sm mb-3">
            Preferred contact method <span className="text-accent-blue">*</span>
          </label>
          <div className="flex flex-wrap gap-3">
            {['Email', 'WhatsApp', 'Instagram DM'].map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, contactMethod: method }))}
                className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  formData.contactMethod === method
                    ? 'bg-accent-blue text-white border border-accent-blue'
                    : 'bg-bg-card border border-[rgba(255,255,255,0.08)] text-ink-primary hover:border-[rgba(255,255,255,0.15)]'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project Description */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <label className="block text-ink-primary font-medium text-sm mb-2">
            Project description <span className="text-accent-blue">*</span>
          </label>
          <textarea
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            placeholder="Tell me what you're building and what you need."
            required
            rows="4"
            className="w-full px-4 py-3 rounded-lg bg-bg-card border border-[rgba(255,255,255,0.08)]
                       focus:border-accent-blue focus:outline-none transition-colors
                       text-ink-primary placeholder-ink-subtle resize-none"
          />
        </motion.div>

        {/* Inspiration & References */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label className="block text-ink-primary font-medium text-sm mb-2">
            Inspiration & references <span className="text-ink-subtle">(optional)</span>
          </label>
          <textarea
            name="inspiration"
            value={formData.inspiration}
            onChange={handleChange}
            placeholder="Paste links to videos or styles you like."
            rows="3"
            className="w-full px-4 py-3 rounded-lg bg-bg-card border border-[rgba(255,255,255,0.08)]
                       focus:border-accent-blue focus:outline-none transition-colors
                       text-ink-primary placeholder-ink-subtle resize-none"
          />
        </motion.div>

        {/* Deadline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          <label className="block text-ink-primary font-medium text-sm mb-3">
            Deadline <span className="text-accent-blue">*</span>
          </label>
          <div className="space-y-2">
            {['ASAP (rush fee may apply)', 'Within 1-2 weeks', 'No rush, flexible'].map((option) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="deadline"
                  value={option}
                  checked={formData.deadline === option}
                  onChange={handleChange}
                  className="w-4 h-4 accent-accent-blue"
                />
                <span className="text-ink-primary text-sm">{option}</span>
              </label>
            ))}
          </div>
        </motion.div>

        {/* Video Length */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <label className="block text-ink-primary font-medium text-sm mb-3">
            Video length <span className="text-accent-blue">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            {['5–10s', '10–20s', '20–40s', '40–60s', '60+s'].map((length) => (
              <button
                key={length}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, videoLength: length }))}
                className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  formData.videoLength === length
                    ? 'bg-accent-blue text-white border border-accent-blue'
                    : 'bg-bg-card border border-[rgba(255,255,255,0.08)] text-ink-primary hover:border-[rgba(255,255,255,0.15)]'
                }`}
              >
                {length}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Budget */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
        >
          <label className="block text-ink-primary font-medium text-sm mb-2">
            Budget <span className="text-accent-blue">*</span>
          </label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-bg-card border border-[rgba(255,255,255,0.08)]
                       focus:border-accent-blue focus:outline-none transition-colors
                       text-ink-primary"
          >
            <option>$300–$600</option>
            <option>$600–$1,200</option>
            <option>$1,200–$2,500</option>
            <option>$2,500–$5,000</option>
            <option>$5,000+</option>
            <option>Not sure yet</option>
          </select>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="pt-2"
        >
          <p className="text-ink-subtle text-xs mb-4">
            Fields marked with <span className="text-accent-blue">*</span> are required
          </p>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3.5 font-medium justify-center disabled:opacity-75"
          >
            {loading ? 'Sending...' : 'Send it over'}
            {!loading && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </motion.div>
      </form>
    </motion.div>
  )
}
