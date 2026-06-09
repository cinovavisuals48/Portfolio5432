'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function ProjectForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsappNumber: '',
    preferredContact: 'Email',
    projectDescription: '',
    inspirationReferences: '',
    deadline: 'Within 1–2 weeks',
    videoLength: '20–40s',
    budget: '$300–$600',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [submitState, setSubmitState] = useState('idle') // 'idle', 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setErrorMessage('Full name is required')
      return false
    }
    if (!formData.email.trim()) {
      setErrorMessage('Email is required')
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email')
      return false
    }
    if (!formData.projectDescription.trim()) {
      setErrorMessage('Project description is required')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!validateForm()) {
      setSubmitState('error')
      return
    }

    setIsLoading(true)
    setSubmitState('loading')

    try {
      const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
      
      if (!web3formsKey) {
        throw new Error('Web3Forms key is not configured')
      }

      const formDataObj = {
        access_key: web3formsKey,
        subject: `New Project Booking from ${formData.fullName}`,
        from_name: formData.fullName,
        email: formData.email,
        message: `
Full Name: ${formData.fullName}
Email: ${formData.email}
WhatsApp Number: ${formData.whatsappNumber || 'Not provided'}
Preferred Contact Method: ${formData.preferredContact}

Project Description:
${formData.projectDescription}

Inspiration & References:
${formData.inspirationReferences || 'Not provided'}

Deadline: ${formData.deadline}
Video Length: ${formData.videoLength}
Budget: ${formData.budget}
        `,
        phone: formData.whatsappNumber || '',
        contact_method: formData.preferredContact,
        deadline: formData.deadline,
        video_length: formData.videoLength,
        budget: formData.budget,
        botcheck: '',
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formDataObj),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitState('success')
        setFormData({
          fullName: '',
          email: '',
          whatsappNumber: '',
          preferredContact: 'Email',
          projectDescription: '',
          inspirationReferences: '',
          deadline: 'Within 1–2 weeks',
          videoLength: '20–40s',
          budget: '$300–$600',
        })
      } else {
        setErrorMessage(data.message || 'Something went wrong. Please try again.')
        setSubmitState('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setErrorMessage('Something went wrong. Please try again.')
      setSubmitState('error')
    } finally {
      setIsLoading(false)
    }
  }

  if (submitState === 'success') {
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
            Thanks for reaching out.
          </h2>
          <p className="text-ink-muted text-base leading-relaxed mb-8">
            I'll get back to you within 24 hours.
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

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 cursor-none"
      >
        {/* Full Name */}
        <motion.div variants={itemVariants}>
          <label className="block text-ink-primary text-sm font-medium mb-2">
            Full name <span className="text-accent-blue">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Jane Doe"
            className="w-full px-4 py-3 bg-bg-secondary border border-[rgba(255,255,255,0.1)] rounded-lg text-ink-primary placeholder-ink-muted focus:outline-none focus:border-accent-blue transition-colors"
          />
        </motion.div>

        {/* Email */}
        <motion.div variants={itemVariants}>
          <label className="block text-ink-primary text-sm font-medium mb-2">
            Email <span className="text-accent-blue">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@company.com"
            className="w-full px-4 py-3 bg-bg-secondary border border-[rgba(255,255,255,0.1)] rounded-lg text-ink-primary placeholder-ink-muted focus:outline-none focus:border-accent-blue transition-colors"
          />
        </motion.div>

        {/* WhatsApp Number */}
        <motion.div variants={itemVariants}>
          <label className="block text-ink-primary text-sm font-medium mb-2">
            WhatsApp number (optional)
          </label>
          <input
            type="tel"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleChange}
            placeholder="+1 555 123 4567"
            className="w-full px-4 py-3 bg-bg-secondary border border-[rgba(255,255,255,0.1)] rounded-lg text-ink-primary placeholder-ink-muted focus:outline-none focus:border-accent-blue transition-colors"
          />
        </motion.div>

        {/* Preferred Contact Method */}
        <motion.div variants={itemVariants}>
          <label className="block text-ink-primary text-sm font-medium mb-3">
            Preferred contact method <span className="text-accent-blue">*</span>
          </label>
          <div className="flex gap-3 flex-wrap">
            {['Email', 'WhatsApp', 'Instagram DM'].map((method) => (
              <button
                key={method}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    preferredContact: method,
                  }))
                }
                className={`px-4 py-2 rounded-lg border transition-colors font-medium text-sm flex items-center gap-2 ${
                  formData.preferredContact === method
                    ? 'bg-accent-blue border-accent-blue text-white'
                    : 'border-[rgba(255,255,255,0.1)] text-ink-muted hover:text-ink-primary'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    formData.preferredContact === method
                      ? 'border-white'
                      : 'border-[rgba(255,255,255,0.3)]'
                  }`}
                >
                  {formData.preferredContact === method && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                {method}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project Description */}
        <motion.div variants={itemVariants}>
          <label className="block text-ink-primary text-sm font-medium mb-2">
            Project description <span className="text-accent-blue">*</span>
          </label>
          <textarea
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            placeholder="Tell me what you're building and what you need."
            rows="4"
            className="w-full px-4 py-3 bg-bg-secondary border border-[rgba(255,255,255,0.1)] rounded-lg text-ink-primary placeholder-ink-muted focus:outline-none focus:border-accent-blue transition-colors resize-none"
          />
        </motion.div>

        {/* Inspiration & References */}
        <motion.div variants={itemVariants}>
          <label className="block text-ink-primary text-sm font-medium mb-2">
            Inspiration & references (optional)
          </label>
          <textarea
            name="inspirationReferences"
            value={formData.inspirationReferences}
            onChange={handleChange}
            placeholder="Paste links to videos or styles you like."
            rows="4"
            className="w-full px-4 py-3 bg-bg-secondary border border-[rgba(255,255,255,0.1)] rounded-lg text-ink-primary placeholder-ink-muted focus:outline-none focus:border-accent-blue transition-colors resize-none"
          />
        </motion.div>

        {/* Deadline */}
        <motion.div variants={itemVariants}>
          <label className="block text-ink-primary text-sm font-medium mb-3">
            Deadline <span className="text-accent-blue">*</span>
          </label>
          <div className="space-y-2">
            {['ASAP (rush fee may apply)', 'Within 1–2 weeks', 'No rush, flexible'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    deadline: option,
                  }))
                }
                className={`w-full px-4 py-3 rounded-lg border text-left transition-colors font-medium text-sm ${
                  formData.deadline === option
                    ? 'bg-accent-blue border-accent-blue text-white'
                    : 'border-[rgba(255,255,255,0.1)] text-ink-primary hover:border-[rgba(255,255,255,0.2)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      formData.deadline === option
                        ? 'border-white'
                        : 'border-[rgba(255,255,255,0.3)]'
                    }`}
                  >
                    {formData.deadline === option && (
                      <div className="w-2.5 h-2.5 bg-white rounded-full" />
                    )}
                  </div>
                  {option}
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Video Length */}
        <motion.div variants={itemVariants}>
          <label className="block text-ink-primary text-sm font-medium mb-3">
            Video length <span className="text-accent-blue">*</span>
          </label>
          <div className="flex gap-3 flex-wrap">
            {['5–10s', '10–20s', '20–40s', '40–60s', '60+s'].map((length) => (
              <button
                key={length}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    videoLength: length,
                  }))
                }
                className={`px-4 py-2 rounded-lg border transition-colors font-medium text-sm ${
                  formData.videoLength === length
                    ? 'bg-accent-blue border-accent-blue text-white'
                    : 'border-[rgba(255,255,255,0.1)] text-ink-muted hover:text-ink-primary'
                }`}
              >
                {length}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Budget */}
        <motion.div variants={itemVariants}>
          <label className="block text-ink-primary text-sm font-medium mb-2">
            Budget <span className="text-accent-blue">*</span>
          </label>
          <div className="relative">
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-bg-secondary border border-[rgba(255,255,255,0.1)] rounded-lg text-ink-primary focus:outline-none focus:border-accent-blue transition-colors appearance-none cursor-pointer pr-10"
            >
              <option>$300–$600</option>
              <option>$600–$1,000</option>
              <option>$1,000–$2,000</option>
              <option>$2,000–$5,000</option>
              <option>$5,000+</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-ink-muted">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3.5 5.5L8 10.5L12.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        {submitState === 'error' && errorMessage && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
          >
            <p className="text-red-400 text-sm">{errorMessage}</p>
          </motion.div>
        )}

        {/* Required Fields Note */}
        <motion.p variants={itemVariants} className="text-ink-muted text-xs">
          Fields marked with <span className="text-accent-blue">*</span> are required
        </motion.p>

        {/* Submit Button */}
        <motion.button
          variants={itemVariants}
          type="submit"
          disabled={isLoading}
          whileHover={!isLoading ? { scale: 1.02 } : {}}
          whileTap={!isLoading ? { scale: 0.98 } : {}}
          className="w-full py-3.5 bg-accent-blue text-white font-medium rounded-lg hover:bg-blue-600 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Sending...' : 'Send it over'}
        </motion.button>
      </motion.form>
    </motion.div>
  )
}
