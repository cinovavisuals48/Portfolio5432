'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ProjectForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    whatsapp_number: '',
    contact_method: 'email',
    project_description: '',
    inspiration_references: '',
    deadline: 'within-1-2-weeks',
    video_length: '20-40s',
    budget: '$300-$600',
  })

  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.full_name.trim()) {
      setErrorMessage('Full name is required')
      return
    }
    if (!formData.email.trim()) {
      setErrorMessage('Email is required')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage('Please enter a valid email')
      return
    }
    if (!formData.project_description.trim()) {
      setErrorMessage('Project description is required')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          full_name: formData.full_name,
          email: formData.email,
          whatsapp_number: formData.whatsapp_number,
          contact_method: formData.contact_method,
          project_description: formData.project_description,
          inspiration_references: formData.inspiration_references,
          deadline: formData.deadline,
          video_length: formData.video_length,
          budget: formData.budget,
          botcheck: true,
        })
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setSubmitted(true)
      } else {
        setStatus('error')
        setErrorMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
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
            Thanks for reaching out. I&apos;ll get back to you within 24 hours.
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

      {/* Form Container */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="w-full space-y-6 cursor-none"
      >
        {/* Full Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <label className="block text-ink-primary font-medium mb-2">Full name <span className="text-accent-blue">*</span></label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            placeholder="Jane Doe"
            className="w-full px-4 py-3 bg-bg-card border border-[rgba(255,255,255,0.06)] rounded-lg text-ink-primary placeholder-ink-muted focus:outline-none focus:border-accent-blue transition-colors"
            required
          />
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="block text-ink-primary font-medium mb-2">Email <span className="text-accent-blue">*</span></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="you@company.com"
            className="w-full px-4 py-3 bg-bg-card border border-[rgba(255,255,255,0.06)] rounded-lg text-ink-primary placeholder-ink-muted focus:outline-none focus:border-accent-blue transition-colors"
            required
          />
        </motion.div>

        {/* WhatsApp Number */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <label className="block text-ink-primary font-medium mb-2">WhatsApp number (optional)</label>
          <input
            type="tel"
            name="whatsapp_number"
            value={formData.whatsapp_number}
            onChange={handleInputChange}
            placeholder="+1 555 123 4567"
            className="w-full px-4 py-3 bg-bg-card border border-[rgba(255,255,255,0.06)] rounded-lg text-ink-primary placeholder-ink-muted focus:outline-none focus:border-accent-blue transition-colors"
          />
        </motion.div>

        {/* Preferred Contact Method */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label className="block text-ink-primary font-medium mb-3">Preferred contact method <span className="text-accent-blue">*</span></label>
          <div className="flex flex-wrap gap-3">
            {[
              { value: 'email', label: 'Email' },
              { value: 'whatsapp', label: 'WhatsApp' },
              { value: 'instagram', label: 'Instagram DM' },
            ].map(method => (
              <button
                key={method.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, contact_method: method.value }))}
                className={`px-4 py-2 rounded-lg font-medium transition-all border ${
                  formData.contact_method === method.value
                    ? 'bg-accent-blue border-accent-blue text-white'
                    : 'border-[rgba(255,255,255,0.1)] text-ink-primary hover:border-[rgba(255,255,255,0.2)]'
                }`}
              >
                {method.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project Description */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          <label className="block text-ink-primary font-medium mb-2">Project description <span className="text-accent-blue">*</span></label>
          <textarea
            name="project_description"
            value={formData.project_description}
            onChange={handleInputChange}
            placeholder="Tell me what you're building and what you need."
            rows="4"
            className="w-full px-4 py-3 bg-bg-card border border-[rgba(255,255,255,0.06)] rounded-lg text-ink-primary placeholder-ink-muted focus:outline-none focus:border-accent-blue transition-colors resize-none"
            required
          />
        </motion.div>

        {/* Inspiration & References */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <label className="block text-ink-primary font-medium mb-2">Inspiration & references (optional)</label>
          <textarea
            name="inspiration_references"
            value={formData.inspiration_references}
            onChange={handleInputChange}
            placeholder="Paste links to videos or styles you like."
            rows="3"
            className="w-full px-4 py-3 bg-bg-card border border-[rgba(255,255,255,0.06)] rounded-lg text-ink-primary placeholder-ink-muted focus:outline-none focus:border-accent-blue transition-colors resize-none"
          />
        </motion.div>

        {/* Deadline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
        >
          <label className="block text-ink-primary font-medium mb-3">Deadline <span className="text-accent-blue">*</span></label>
          <div className="space-y-2">
            {[
              { value: 'asap', label: 'ASAP (rush fee may apply)' },
              { value: 'within-1-2-weeks', label: 'Within 1–2 weeks' },
              { value: 'flexible', label: 'No rush, flexible' },
            ].map(deadline => (
              <button
                key={deadline.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, deadline: deadline.value }))}
                className={`w-full px-4 py-3 rounded-lg font-medium transition-all border text-left ${
                  formData.deadline === deadline.value
                    ? 'bg-accent-blue border-accent-blue text-white'
                    : 'border-[rgba(255,255,255,0.06)] text-ink-primary hover:border-[rgba(255,255,255,0.1)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.deadline === deadline.value ? 'border-white' : 'border-[rgba(255,255,255,0.2)]'
                  }`}>
                    {formData.deadline === deadline.value && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                  </div>
                  {deadline.label}
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Video Length */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <label className="block text-ink-primary font-medium mb-3">Video length <span className="text-accent-blue">*</span></label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: '5-10s', label: '5–10s' },
              { value: '10-20s', label: '10–20s' },
              { value: '20-40s', label: '20–40s' },
              { value: '40-60s', label: '40–60s' },
              { value: '60plus', label: '60+s' },
            ].map(length => (
              <button
                key={length.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, video_length: length.value }))}
                className={`px-4 py-2 rounded-lg font-medium transition-all border ${
                  formData.video_length === length.value
                    ? 'bg-accent-blue border-accent-blue text-white'
                    : 'border-[rgba(255,255,255,0.06)] text-ink-primary hover:border-[rgba(255,255,255,0.1)]'
                }`}
              >
                {length.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Budget */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
        >
          <label className="block text-ink-primary font-medium mb-2">Budget <span className="text-accent-blue">*</span></label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-bg-card border border-[rgba(255,255,255,0.06)] rounded-lg text-ink-primary focus:outline-none focus:border-accent-blue transition-colors appearance-none cursor-pointer"
          >
            <option value="$300-$600">$300–$600</option>
            <option value="$600-$1000">$600–$1,000</option>
            <option value="$1000-$2000">$1,000–$2,000</option>
            <option value="$2000-$5000">$2,000–$5,000</option>
            <option value="$5000+">$5,000+</option>
          </select>
        </motion.div>

        {/* Error Message */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300"
          >
            {errorMessage}
          </motion.div>
        )}

        {/* Required Fields Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-ink-muted text-xs"
        >
          Fields marked with <span className="text-accent-blue">*</span> are required
        </motion.p>

        {/* Submit Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95 }}
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-3.5 bg-accent-blue hover:bg-blue-600 disabled:bg-gray-600 text-white font-display font-600 rounded-lg transition-all"
        >
          {status === 'idle' && 'Send it over'}
          {status === 'loading' && 'Sending...'}
          {status === 'success' && 'Sent!'}
          {status === 'error' && 'Try Again'}
        </motion.button>
      </motion.form>
    </motion.div>
  )
}
