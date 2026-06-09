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
                {method === 'Email' && <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                {method === 'WhatsApp' && <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 5.441 4.764 9.86 10.206 9.86 5.487 0 9.878-4.454 9.878-9.86 0-5.39-4.314-9.798-9.333-9.798z"/></svg>}
                {method === 'Instagram DM' && <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" fill="none"/><circle cx="12" cy="12" r="4.5" stroke="currentColor" fill="none"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>}
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
