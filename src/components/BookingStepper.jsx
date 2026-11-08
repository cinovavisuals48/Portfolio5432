'use client'

import React, { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Stepper, { Step } from './Stepper'
import { useBooking } from '../context/BookingContext'

const PROJECT_FORM_CONFIG = {
  budgets: {
    '$300–$600': {
      allowedLengths: ['5–10s', '10–20s'],
      helperText: 'Best for short teasers & UI loops. Supports videos up to 20s.',
      badge: 'Starter',
    },
    '$600–$1,000': {
      allowedLengths: ['5–10s', '10–20s', '20–40s'],
      helperText: 'Best for product showcases. Supports videos up to 40s.',
      badge: 'Popular',
    },
    '$1,000–$2,000': {
      allowedLengths: ['5–10s', '10–20s', '20–40s', '40–60s'],
      helperText: 'Best for full product explainers. Supports videos up to 60s.',
      badge: 'Full Scale',
    },
    '$2,000–$5,000': {
      allowedLengths: ['5–10s', '10–20s', '20–40s', '40–60s', '60+s'],
      helperText: 'Best for premium launch campaigns & high video complexity. All lengths supported.',
      badge: 'Campaign',
    },
  },
  videoLengths: {
    '5–10s': {
      label: 'Micro Teaser',
      helperText: 'Projects of this length typically start from $300.',
    },
    '10–20s': {
      label: 'Social Clip',
      helperText: 'Projects of this length typically start from $300.',
    },
    '20–40s': {
      label: 'Product Showcase',
      helperText: 'Projects of this length typically start from $600.',
    },
    '40–60s': {
      label: 'Full Explainer',
      helperText: 'Projects of this length typically start from $1,000.',
    },
    '60+s': {
      label: 'Launch Campaign',
      helperText: 'Projects of this length typically start from $2,000.',
    },
  },
}

const CONTACT_METHODS = [
  { id: 'Email', label: 'Email', placeholder: '', note: 'We will reply directly to your email.' },
  { id: 'WhatsApp', label: 'WhatsApp', placeholder: '+1 (555) 123-4567 (with country code)' },
  { id: 'Telegram', label: 'Telegram', placeholder: '@username or phone number' },
  { id: 'Discord', label: 'Discord', placeholder: 'username#1234 or @handle' },
  { id: 'Instagram DM', label: 'Instagram DM', placeholder: '@your_instagram_handle' },
  { id: 'X / Twitter DM', label: 'X / Twitter DM', placeholder: '@your_twitter_handle' },
  { id: 'Phone Call', label: 'Phone Call', placeholder: '+1 (555) 123-4567 (with country code)' },
]

const DEADLINE_OPTIONS = [
  { id: 'Within 1–2 weeks', label: 'Within 1–2 weeks', note: 'Standard turnaround' },
  { id: 'ASAP (Rush fee may apply)', label: 'ASAP (< 1 week)', note: 'Priority queue & rush fee' },
  { id: 'Within 3–4 weeks', label: 'Within 3–4 weeks', note: 'Comfortable timeline' },
  { id: 'Flexible / No rush', label: 'Flexible / No rush', note: 'Open-ended scheduling' },
]

const STEP_LABELS = [
  'Name',
  'Email',
  'Contact',
  'Brief',
  'Timeline',
  'Budget',
  'Review',
]

const isBudgetAllowed = (budget, videoLength) => {
  if (!videoLength) return true
  return PROJECT_FORM_CONFIG.budgets[budget]?.allowedLengths.includes(videoLength)
}

// variant: 'page' — the large panel on /book-project (default)
//          'modal' — legacy borderless style for a popup
export default function BookingStepper({ onClose, onSubmitted, isModal = false, variant = isModal ? 'modal' : 'page' }) {
  const {
    formData,
    setFormData,
    currentStep,
    setCurrentStep,
    resetBookingForm,
  } = useBooking()

  // Put the cursor in the step's field on mouse/trackpad devices only.
  // On phones and tablets this would pop the keyboard open as soon as the
  // page loads, so there the field waits for a tap.
  const focusOnDesktop = useCallback((el) => {
    if (el && window.matchMedia('(pointer: fine)').matches) el.focus({ preventScroll: true })
  }, [])

  const [stepError, setStepError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [submitState, setSubmitState] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')
  const [submittedData, setSubmittedData] = useState(null)

  // Handle generic input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setStepError('')
    setErrorMessage('')
    setFormData((prev) => {
      const updated = { ...prev, [name]: value }

      // If budget changes, ensure compatibility with video length
      if (name === 'budget' && prev.videoLength) {
        if (!PROJECT_FORM_CONFIG.budgets[value]?.allowedLengths.includes(prev.videoLength)) {
          // Keep video length or pick compatible
        }
      }
      return updated
    })
  }

  // Handle contact method select
  const handleSelectContactMethod = (methodId) => {
    setStepError('')
    setFormData((prev) => ({
      ...prev,
      preferredContact: methodId,
      // Clear detail if user switches back to email
      contactDetail: methodId === 'Email' ? '' : prev.contactDetail,
    }))
  }

  // Handle video length select
  const handleSelectVideoLength = (length) => {
    setStepError('')
    setFormData((prev) => {
      const updated = { ...prev, videoLength: length }
      // If current budget does not support this length, adjust to the first allowed budget
      if (prev.budget && !isBudgetAllowed(prev.budget, length)) {
        const firstCompatible = Object.keys(PROJECT_FORM_CONFIG.budgets).find((b) =>
          PROJECT_FORM_CONFIG.budgets[b].allowedLengths.includes(length)
        )
        if (firstCompatible) updated.budget = firstCompatible
      }
      return updated
    })
  }

  // Handle budget select
  const handleSelectBudget = (budgetKey) => {
    setStepError('')
    setFormData((prev) => ({ ...prev, budget: budgetKey }))
  }

  // Validate step before advancing
  const handleBeforeNext = async (step) => {
    setStepError('')
    setErrorMessage('')

    if (step === 1) {
      if (!formData.fullName.trim()) {
        setStepError('Please enter your full name to continue.')
        return false
      }
      if (formData.fullName.trim().length < 2) {
        setStepError('Please enter a valid name.')
        return false
      }
    }

    if (step === 2) {
      if (!formData.email.trim()) {
        setStepError('Please enter your email address.')
        return false
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email.trim())) {
        setStepError('Please enter a valid email address (e.g. name@company.com).')
        return false
      }
    }

    if (step === 3) {
      if (formData.preferredContact !== 'Email' && !formData.contactDetail.trim()) {
        const method = CONTACT_METHODS.find((m) => m.id === formData.preferredContact)
        setStepError(`Please provide your ${method?.label || 'contact'} details.`)
        return false
      }
    }

    if (step === 4) {
      if (!formData.projectDescription.trim()) {
        setStepError('Please give a brief description of what you are looking to create.')
        return false
      }
      if (formData.projectDescription.trim().length < 10) {
        setStepError('Please provide a bit more detail about your project (at least 10 characters).')
        return false
      }
    }

    if (step === 5) {
      if (!formData.deadline) {
        setStepError('Please select a deadline.')
        return false
      }
      if (!formData.videoLength) {
        setStepError('Please select an estimated video duration.')
        return false
      }
    }

    if (step === 6) {
      if (!formData.budget) {
        setStepError('Please select a budget range.')
        return false
      }
      if (!isBudgetAllowed(formData.budget, formData.videoLength)) {
        setStepError(`The selected budget does not support ${formData.videoLength} videos. Please select an appropriate tier.`)
        return false
      }
    }

    return true
  }

  // Submit via Web3Forms (same logic preserved)
  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    setErrorMessage('')
    setStepError('')

    const isValid = await handleBeforeNext(6)
    if (!isValid) return

    setIsLoading(true)
    setSubmitState('loading')

    try {
      const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

      if (!web3formsKey) {
        throw new Error('Web3Forms access key is not configured. Please check your environment variables.')
      }

      const contactMethodFull =
        formData.preferredContact === 'Email'
          ? `Email (${formData.email})`
          : `${formData.preferredContact}: ${formData.contactDetail}`

      const formDataObj = {
        access_key: web3formsKey,
        subject: `New Project Booking from ${formData.fullName}`,
        name: formData.fullName,
        from_name: formData.fullName,
        email: formData.email,
        message: `
Full Name: ${formData.fullName}
Email: ${formData.email}
Preferred Contact Method: ${contactMethodFull}

Project Description:
${formData.projectDescription}

Inspiration & References:
${formData.inspirationReferences || 'Not provided'}

Deadline: ${formData.deadline}
Video Length: ${formData.videoLength}
Budget: ${formData.budget}
        `.trim(),
        phone: formData.preferredContact === 'Phone Call' || formData.preferredContact === 'WhatsApp' ? formData.contactDetail : '',
        whatsapp_number: formData.preferredContact === 'WhatsApp' ? formData.contactDetail : '',
        contact_method: contactMethodFull,
        project_description: formData.projectDescription,
        inspiration_references: formData.inspirationReferences || 'Not provided',
        deadline: formData.deadline,
        video_length: formData.videoLength,
        budget: formData.budget,
        botcheck: '',
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formDataObj),
      })

      let data
      try {
        data = await response.json()
      } catch {
        throw new Error(`Web3Forms returned status ${response.status}. Please check your connection or try again.`)
      }

      if (response.ok && data.success) {
        setSubmittedData({ ...formData })
        resetBookingForm()
        setSubmitState('success')
        if (onSubmitted) onSubmitted(formData)
      } else {
        const failureMessage = data?.message || `Submission failed with status ${response.status}. Please try again.`
        setErrorMessage(failureMessage)
        setSubmitState('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setErrorMessage(error.message || 'Something went wrong. Please try again.')
      setSubmitState('error')
    } finally {
      setIsLoading(false)
    }
  }

  // Success view
  if (submitState === 'success') {
    const clientName = (submittedData?.fullName || formData.fullName).split(' ')[0] || 'friend'
    const contactChannel = submittedData?.preferredContact || formData.preferredContact

    return (
      <div className="stepper-outer-container py-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="stepper-circle-container p-8 sm:p-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="w-16 h-16 sm:w-20 sm:h-20 bg-accent text-accent-ink rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>

          <p className="text-[#A3A3A3] text-xs font-display font-semibold tracking-[0.15em] uppercase mb-2">
            Project Brief Sent
          </p>

          <h2 className="font-display font-800 text-2xl sm:text-4xl text-white mb-3 tracking-tight">
            Thanks for reaching out, {clientName}!
          </h2>

          <p className="text-ink-muted text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8">
            Your project brief has been received. I&apos;ll review the details and reach out via{' '}
            <span className="text-white font-medium">{contactChannel}</span> within 24 hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                className="stepper-next-button px-6 py-3 text-sm cursor-pointer"
              >
                Close Window
              </button>
            ) : (
              <a href="/" className="stepper-next-button px-6 py-3 text-sm">
                Back to Home
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    )
  }

  // Current contact placeholder
  const activeContactConfig = CONTACT_METHODS.find((m) => m.id === formData.preferredContact)

  return (
    <div className="w-full">
      <Stepper
        initialStep={1}
        currentStep={currentStep}
        stepCircleContainerClassName={variant === 'modal' ? '!border-none !bg-transparent !shadow-none !backdrop-filter-none' : 'booking-panel'}
        stepContainerClassName="booking-steps"
        // Progress: one labelled segment per step, filled in blue as you go.
        renderStepIndicator={({ step, currentStep: cur, label, onStepClick }) => {
          const state = cur === step ? 'active' : cur > step ? 'complete' : 'upcoming'
          return (
            <button
              key={step}
              type="button"
              onClick={onStepClick}
              className="booking-step"
              data-state={state}
              aria-current={state === 'active' ? 'step' : undefined}
              aria-label={`Step ${step}: ${label}`}
            >
              <span className="booking-step-bar">
                <motion.span
                  className="booking-step-fill"
                  initial={false}
                  animate={{ scaleX: state === 'upcoming' ? 0 : 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
              <span className="booking-step-label">
                <span className="booking-step-num">{String(step).padStart(2, '0')}</span>
                <span className="booking-step-name">{label}</span>
              </span>
            </button>
          )
        }}
        onStepChange={(step) => {
          setCurrentStep(step)
          setStepError('')
          setErrorMessage('')
        }}
        onBeforeNext={handleBeforeNext}
        stepLabels={STEP_LABELS}
        backButtonText="Back"
        nextButtonText="Continue"
        renderFooter={({ currentStep: cStep, totalSteps, isLastStep, handleBack, handleNext }) => (
          <div className="w-full">
            {/* Step error prompt */}
            <AnimatePresence>
              {stepError && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mb-4 px-4 py-2.5 bg-red-500/10 border border-red-500/25 rounded-xl text-red-400 text-xs sm:text-sm flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="shrink-0">
                    <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm-.75-9.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5zm.75 6.5a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75z" clipRule="evenodd" />
                  </svg>
                  <span>{stepError}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 7 error */}
            <AnimatePresence>
              {cStep === 7 && errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mb-4 px-4 py-2.5 bg-red-500/10 border border-red-500/25 rounded-xl text-red-400 text-xs sm:text-sm flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="shrink-0">
                    <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm-.75-9.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5zm.75 6.5a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75z" clipRule="evenodd" />
                  </svg>
                  <span>{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={`stepper-footer-nav ${cStep !== 1 ? 'spread' : 'end'}`}>
              {cStep !== 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isLoading}
                  className="stepper-back-button"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M8.5 3.5L5 7l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Back
                </button>
              )}

              {cStep === 7 ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="stepper-next-button px-6 py-3"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send it over</span>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="stepper-next-button"
                >
                  <span>Continue</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5.5 3.5L9 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
      >
        {/* ── STEP 1: NAME ────────────────────────────────────── */}
        <Step>
          <div className="space-y-9">
            <div>
              <div className="flex items-center gap-2">
                <span className="label !text-accent">
                  Step 01 / 07 • Introduction
                </span>
              </div>
              <h2 className="mt-4 text-[clamp(1.9rem,2.7vw,2.8rem)] leading-[1.06] tracking-[-0.025em] font-medium text-ink-primary">
                What&apos;s your name?
              </h2>
              <p className="mt-3 text-ink-muted text-base md:text-[1.05rem] leading-relaxed max-w-[52ch]">
                Let&apos;s start with your full name so I know who I&apos;ll be working with.
              </p>
            </div>

            <div className="pt-2">
              <label className="block label !text-ink-secondary mb-3">
                Full Name <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleBeforeNext(1).then((valid) => valid && setCurrentStep(2))
                  }
                }}
                ref={focusOnDesktop}
                placeholder="Jane Doe"
                className="booking-input"
              />
            </div>
          </div>
        </Step>

        {/* ── STEP 2: EMAIL ───────────────────────────────────── */}
        <Step>
          <div className="space-y-9">
            <div>
              <div className="flex items-center gap-2">
                <span className="label !text-accent">
                  Step 02 / 07 • Contact Details
                </span>
              </div>
              <h2 className="mt-4 text-[clamp(1.9rem,2.7vw,2.8rem)] leading-[1.06] tracking-[-0.025em] font-medium text-ink-primary">
                Where should I email you?
              </h2>
              <p className="mt-3 text-ink-muted text-base md:text-[1.05rem] leading-relaxed max-w-[52ch]">
                Your primary email address for briefs, deliverables, and project updates.
              </p>
            </div>

            <div className="pt-2">
              <label className="block label !text-ink-secondary mb-3">
                Email Address <span className="text-accent">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleBeforeNext(2).then((valid) => valid && setCurrentStep(3))
                  }
                }}
                ref={focusOnDesktop}
                placeholder="jane@company.com"
                className="booking-input"
              />
            </div>
          </div>
        </Step>

        {/* ── STEP 3: PREFERRED CONTACT METHOD ────────────────── */}
        <Step>
          <div className="space-y-9">
            <div>
              <div className="flex items-center gap-2">
                <span className="label !text-accent">
                  Step 03 / 07 • Communication
                </span>
              </div>
              <h2 className="mt-4 text-[clamp(1.9rem,2.7vw,2.8rem)] leading-[1.06] tracking-[-0.025em] font-medium text-ink-primary">
                Preferred contact method
              </h2>
              <p className="mt-3 text-ink-muted text-base md:text-[1.05rem] leading-relaxed max-w-[52ch]">
                How do you prefer to collaborate throughout the animation process?
              </p>
            </div>

            {/* Selection pills */}
            <div className="pt-2">
              <label className="block label !text-ink-secondary mb-3">
                Select your preferred channel <span className="text-accent">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CONTACT_METHODS.map((method) => {
                  const isSelected = formData.preferredContact === method.id
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => handleSelectContactMethod(method.id)}
                      className={`px-4 py-4 rounded-xl border text-left text-sm sm:text-[0.95rem] font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-accent/10 text-ink-primary border-accent'
                          : 'bg-transparent border-line-strong text-ink-secondary hover:border-ink-muted hover:text-ink-primary'
                      }`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-accent' : 'border-line-strong'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 bg-accent rounded-full" />}
                      </div>
                      <span className="whitespace-normal leading-tight">{method.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Dynamic input field when NOT email */}
            <AnimatePresence mode="wait">
              {formData.preferredContact !== 'Email' ? (
                <motion.div
                  key="other-contact-input"
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="pt-2 overflow-hidden"
                >
                  <label className="block label !text-ink-secondary mb-3">
                    Your {activeContactConfig?.label || 'Contact'} Handle or Number <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactDetail"
                    value={formData.contactDetail}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleBeforeNext(3).then((valid) => valid && setCurrentStep(4))
                      }
                    }}
                    placeholder={activeContactConfig?.placeholder || 'Enter your contact details'}
                    className="booking-input"
                  />
                  <p className="text-ink-muted text-sm mt-2">
                    I will reach out directly through this handle for updates and reviews.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="email-confirm-note"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 border border-line rounded-xl text-sm text-ink-muted flex items-center gap-3"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white shrink-0">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>
                    Direct communication will be conducted via your email:{' '}
                    <strong className="text-white">{formData.email || 'provided in Step 2'}</strong>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Step>

        {/* ── STEP 4: PROJECT DESCRIPTION & INSPIRATION LINKS ──── */}
        <Step>
          <div className="space-y-9">
            <div>
              <div className="flex items-center gap-2">
                <span className="label !text-accent">
                  Step 04 / 07 • Project Scope
                </span>
              </div>
              <h2 className="mt-4 text-[clamp(1.9rem,2.7vw,2.8rem)] leading-[1.06] tracking-[-0.025em] font-medium text-ink-primary">
                Project description & references
              </h2>
              <p className="mt-3 text-ink-muted text-base md:text-[1.05rem] leading-relaxed max-w-[52ch]">
                Tell me what you are building and share any styles you admire.
              </p>
            </div>

            <div className="pt-1 space-y-7">
              <div>
                <label className="block label !text-ink-secondary mb-3">
                  Project Description <span className="text-accent">*</span>
                </label>
                <textarea
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Tell me what product or feature you're launching, who your audience is, and what key points the animation should convey..."
                  className="booking-input resize-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block label !text-ink-secondary mb-3">
                    Inspiration & References <span className="text-ink-muted font-normal lowercase">(optional)</span>
                  </label>
                </div>
                <textarea
                  name="inspirationReferences"
                  value={formData.inspirationReferences}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Paste links to videos, YouTube/Vimeo references, or visual styles you like..."
                  className="booking-input resize-none"
                />
              </div>
            </div>
          </div>
        </Step>

        {/* ── STEP 5: DEADLINE & VIDEO LENGTH ─────────────────── */}
        <Step>
          <div className="space-y-9">
            <div>
              <div className="flex items-center gap-2">
                <span className="label !text-accent">
                  Step 05 / 07 • Timeline & Length
                </span>
              </div>
              <h2 className="mt-4 text-[clamp(1.9rem,2.7vw,2.8rem)] leading-[1.06] tracking-[-0.025em] font-medium text-ink-primary">
                Deadline & video duration
              </h2>
              <p className="mt-3 text-ink-muted text-base md:text-[1.05rem] leading-relaxed max-w-[52ch]">
                Select your target delivery date and anticipated video length.
              </p>
            </div>

            {/* Deadline selection */}
            <div>
              <label className="block label !text-ink-secondary mb-3">
                Timeline / Deadline <span className="text-accent">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {DEADLINE_OPTIONS.map((opt) => {
                  const isSelected = formData.deadline === opt.id
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setStepError('')
                        setFormData((prev) => ({ ...prev, deadline: opt.id }))
                      }}
                      className={`p-4 sm:p-5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-accent/10 text-ink-primary border-accent'
                          : 'bg-transparent border-line-strong text-ink-secondary hover:border-ink-muted hover:text-ink-primary'
                      }`}
                    >
                      <div className="text-sm sm:text-[0.95rem] font-medium">{opt.label}</div>
                      <div className={`mt-1 text-xs ${isSelected ? 'text-accent-soft' : 'text-ink-subtle'}`}>
                        {opt.note}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Video length selection */}
            <div className="pt-1">
              <label className="block label !text-ink-secondary mb-3">
                Estimated Video Length <span className="text-accent">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {Object.keys(PROJECT_FORM_CONFIG.videoLengths).map((len) => {
                  const isSelected = formData.videoLength === len
                  const info = PROJECT_FORM_CONFIG.videoLengths[len]
                  return (
                    <button
                      key={len}
                      type="button"
                      onClick={() => handleSelectVideoLength(len)}
                      className={`px-1.5 py-2.5 sm:px-2 sm:py-3 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center min-h-[84px] sm:min-h-[96px] ${
                        isSelected
                          ? 'bg-accent/10 text-ink-primary border-accent'
                          : 'bg-transparent border-line-strong text-ink-secondary hover:border-ink-muted hover:text-ink-primary'
                      }`}
                    >
                      <div className="text-sm sm:text-base font-semibold tracking-tight mb-1">{len}</div>
                      <div
                        className={`text-[0.66rem] sm:text-[0.7rem] leading-[1.25] text-center font-medium ${
                          isSelected ? 'text-accent-soft' : 'text-ink-muted'
                        }`}
                      >
                        {info.label}
                      </div>
                    </button>
                  )
                })}
              </div>
              {formData.videoLength && (
                <p className="text-ink-muted text-sm mt-3">
                  💡 {PROJECT_FORM_CONFIG.videoLengths[formData.videoLength]?.helperText}
                </p>
              )}
            </div>
          </div>
        </Step>

        {/* ── STEP 6: BUDGET LOGIC ────────────────────────────── */}
        <Step>
          <div className="space-y-9">
            <div>
              <div className="flex items-center gap-2">
                <span className="label !text-accent">
                  Step 06 / 07 • Investment
                </span>
              </div>
              <h2 className="mt-4 text-[clamp(1.9rem,2.7vw,2.8rem)] leading-[1.06] tracking-[-0.025em] font-medium text-ink-primary">
                Select your budget
              </h2>
              <p className="mt-3 text-ink-muted text-base md:text-[1.05rem] leading-relaxed max-w-[52ch]">
                Calibrated tiers reflecting turnaround speed and video complexity.
              </p>
            </div>

            <div className="pt-1 space-y-3">
              {Object.keys(PROJECT_FORM_CONFIG.budgets).map((budgetKey) => {
                const isSelected = formData.budget === budgetKey
                const config = PROJECT_FORM_CONFIG.budgets[budgetKey]
                const isAllowed = isBudgetAllowed(budgetKey, formData.videoLength)

                return (
                  <button
                    key={budgetKey}
                    type="button"
                    onClick={() => {
                      if (isAllowed) handleSelectBudget(budgetKey)
                    }}
                    disabled={!isAllowed}
                    className={`w-full p-5 sm:px-6 rounded-xl border text-left transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                      !isAllowed
                        ? 'opacity-35 cursor-not-allowed bg-transparent border-line'
                        : isSelected
                        ? 'bg-accent/10 text-ink-primary border-accent cursor-pointer'
                        : 'bg-transparent border-line-strong text-ink-primary hover:border-ink-muted cursor-pointer'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-base sm:text-lg tracking-tight">
                          {budgetKey}
                        </span>
                        <span
                          className={`text-[0.65rem] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                            isSelected ? 'bg-accent text-accent-ink' : 'bg-white/[0.06] text-ink-secondary'
                          }`}
                        >
                          {config.badge}
                        </span>
                        {!isAllowed && (
                          <span className="text-[0.65rem] text-red-400 border border-red-500/20 px-1.5 py-0.5 rounded">
                            Video length ({formData.videoLength}) exceeds tier
                          </span>
                        )}
                      </div>
                      <p className={`text-xs ${isSelected ? 'text-ink-secondary' : 'text-ink-muted'}`}>
                        {config.helperText}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5 self-end sm:self-center">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-accent' : 'border-line-strong'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 bg-accent rounded-full" />}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </Step>

        {/* ── STEP 7: REVIEW TEMPLATE & SUBMIT ────────────────── */}
        <Step>
          <div className="space-y-9">
            <div>
              <div className="flex items-center gap-2">
                <span className="label !text-accent">
                  Step 07 / 07 • Final Review
                </span>
              </div>
              <h2 className="mt-4 text-[clamp(1.9rem,2.7vw,2.8rem)] leading-[1.06] tracking-[-0.025em] font-medium text-ink-primary">
                Review your project brief
              </h2>
              <p className="mt-3 text-ink-muted text-base md:text-[1.05rem] leading-relaxed max-w-[52ch]">
                Everything you selected is formatted below. Click &quot;Send it over&quot; to submit.
              </p>
            </div>

            {/* Template Summary Card */}
            <div className="p-5 sm:p-6 border border-line rounded-2xl space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="text-xs font-mono font-semibold tracking-wider text-neutral-400 uppercase">
                  Project Brief Template
                </span>
                <span className="text-[0.68rem] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono">
                  ● Ready
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Client Name */}
                <div className="p-4 rounded-lg border border-line">
                  <div className="flex justify-between items-center text-neutral-400 mb-0.5">
                    <span>Client Name</span>
                    <button type="button" onClick={() => setCurrentStep(1)} className="text-[0.65rem] underline text-white/70 hover:text-white cursor-pointer">
                      Edit
                    </button>
                  </div>
                  <div className="text-white font-semibold text-sm">{formData.fullName}</div>
                </div>

                {/* Email */}
                <div className="p-4 rounded-lg border border-line">
                  <div className="flex justify-between items-center text-neutral-400 mb-0.5">
                    <span>Email Address</span>
                    <button type="button" onClick={() => setCurrentStep(2)} className="text-[0.65rem] underline text-white/70 hover:text-white cursor-pointer">
                      Edit
                    </button>
                  </div>
                  <div className="text-white font-semibold truncate">{formData.email}</div>
                </div>

                {/* Preferred Contact */}
                <div className="p-4 rounded-lg border border-line sm:col-span-2">
                  <div className="flex justify-between items-center text-neutral-400 mb-0.5">
                    <span>Preferred Communication</span>
                    <button type="button" onClick={() => setCurrentStep(3)} className="text-[0.65rem] underline text-white/70 hover:text-white cursor-pointer">
                      Edit
                    </button>
                  </div>
                  <div className="text-white font-medium">
                    {formData.preferredContact}
                    {formData.preferredContact !== 'Email' && formData.contactDetail && (
                      <span className="text-neutral-400 ml-1.5 font-mono text-[0.75rem]">
                        ({formData.contactDetail})
                      </span>
                    )}
                  </div>
                </div>

                {/* Timeline & Duration & Budget */}
                <div className="p-4 rounded-lg border border-line sm:col-span-2 flex flex-wrap justify-between items-center gap-2">
                  <div>
                    <span className="text-neutral-400 block text-[0.7rem]">Timeline</span>
                    <span className="text-white font-semibold">{formData.deadline}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[0.7rem]">Duration</span>
                    <span className="text-white font-semibold">{formData.videoLength}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[0.7rem]">Target Budget</span>
                    <span className="text-white font-semibold">{formData.budget}</span>
                  </div>
                  <button type="button" onClick={() => setCurrentStep(5)} className="text-[0.65rem] underline text-white/70 hover:text-white cursor-pointer">
                    Edit
                  </button>
                </div>

                {/* Project Description */}
                <div className="p-4 rounded-lg border border-line sm:col-span-2">
                  <div className="flex justify-between items-center text-neutral-400 mb-1">
                    <span>Project Description</span>
                    <button type="button" onClick={() => setCurrentStep(4)} className="text-[0.65rem] underline text-white/70 hover:text-white cursor-pointer">
                      Edit
                    </button>
                  </div>
                  <p className="text-neutral-200 text-xs leading-relaxed max-h-24 overflow-y-auto whitespace-pre-wrap">
                    {formData.projectDescription}
                  </p>
                </div>

                {/* Inspiration */}
                {formData.inspirationReferences && (
                  <div className="p-4 rounded-lg border border-line sm:col-span-2">
                    <div className="flex justify-between items-center text-neutral-400 mb-1">
                      <span>Inspiration Links & Style</span>
                      <button type="button" onClick={() => setCurrentStep(4)} className="text-[0.65rem] underline text-white/70 hover:text-white cursor-pointer">
                        Edit
                      </button>
                    </div>
                    <p className="text-neutral-300 text-xs leading-relaxed break-all max-h-16 overflow-y-auto whitespace-pre-wrap">
                      {formData.inspirationReferences}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Step>
      </Stepper>
    </div>
  )
}
