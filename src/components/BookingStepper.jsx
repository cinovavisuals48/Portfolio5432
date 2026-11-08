'use client'

// ─────────────────────────────────────────────────────────────
// BOOKING FORM — src/components/BookingStepper.jsx
// Five steps, project first and personal details last:
//   1. Project  — what it is, website, references
//   2. Scope    — length and deadline
//   3. Budget   — tiers are guidance only, nothing is blocked
//   4. You      — name, email, preferred contact
//   5. Review   — check and send (Web3Forms)
// Edit the options in the config blocks below.
// ─────────────────────────────────────────────────────────────

import React, { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Stepper, { Step } from './Stepper'
import { useBooking } from '../context/BookingContext'

const NOT_SURE = 'Not sure yet'

const VIDEO_LENGTHS = [
  { id: '5–10s', label: 'Micro teaser', from: 300 },
  { id: '10–20s', label: 'Social clip', from: 300 },
  { id: '20–40s', label: 'Product showcase', from: 600 },
  { id: '40–60s', label: 'Full explainer', from: 1000 },
  { id: '60+s', label: 'Launch campaign', from: 2000 },
  { id: NOT_SURE, label: 'Help me decide', from: 0 },
]

const BUDGETS = [
  { id: '$300–$600', badge: 'Starter', max: 600, note: 'Short teasers and UI loops, up to about 20s.' },
  { id: '$600–$1,000', badge: 'Popular', max: 1000, note: 'Product showcases, up to about 40s.' },
  { id: '$1,000–$2,000', badge: 'Full scale', max: 2000, note: 'Full product explainers, up to about 60s.' },
  { id: '$2,000–$5,000', badge: 'Campaign', max: 5000, note: 'Launch campaigns and complex pieces, any length.' },
  { id: NOT_SURE, badge: "Let's talk", max: Infinity, note: "Share the idea and I'll suggest a scope that fits." },
]

const DEADLINE_OPTIONS = [
  { id: 'ASAP (Rush fee may apply)', label: 'ASAP (< 1 week)', note: 'Priority queue, rush fee' },
  { id: 'Within 1–2 weeks', label: 'Within 1–2 weeks', note: 'Standard turnaround' },
  { id: 'Within 3–4 weeks', label: 'Within 3–4 weeks', note: 'Comfortable timeline' },
  { id: 'Flexible / No rush', label: 'Flexible', note: 'No fixed date' },
]

const CONTACT_METHODS = [
  { id: 'Email', label: 'Email' },
  { id: 'WhatsApp', label: 'WhatsApp', field: 'WhatsApp number', error: 'Please add your WhatsApp number.', placeholder: '+1 555 123 4567 (with country code)' },
  { id: 'Other', label: 'Other', field: 'Where and how', error: 'Please add where and how to reach you.', placeholder: 'e.g. Telegram @handle, Discord username, a call…' },
]

const STEP_LABELS = ['Project', 'Scope', 'Budget', 'You', 'Review']
const LAST_STEP = STEP_LABELS.length

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Soft warning when the budget sits below what that length usually costs.
function budgetNote(budgetId, lengthId) {
  const budget = BUDGETS.find((b) => b.id === budgetId)
  const length = VIDEO_LENGTHS.find((l) => l.id === lengthId)
  if (!budget || !length || budget.max > length.from) return ''
  return `${length.id} videos usually start from $${length.from.toLocaleString('en-US')}. Send it anyway and we can shape the scope to fit.`
}

// Shared look for the selectable cards
const optionClass = (selected) =>
  `rounded-xl border text-left transition-all duration-200 cursor-pointer ${
    selected
      ? 'bg-accent/10 text-ink-primary border-accent'
      : 'bg-transparent border-line-strong text-ink-secondary hover:border-ink-muted hover:text-ink-primary'
  }`

function StepHeader({ step, kicker, title, children }) {
  return (
    <div>
      <span className="label !text-accent">
        Step {String(step).padStart(2, '0')} / {String(LAST_STEP).padStart(2, '0')} • {kicker}
      </span>
      <h2 className="mt-4 text-[clamp(1.9rem,2.7vw,2.8rem)] leading-[1.06] tracking-[-0.025em] font-medium text-ink-primary">
        {title}
      </h2>
      {children && (
        <p className="mt-3 text-ink-muted text-base md:text-[1.05rem] leading-relaxed max-w-[52ch]">{children}</p>
      )}
    </div>
  )
}

function FieldLabel({ children, optional }) {
  return (
    <label className="block label !text-ink-secondary mb-3">
      {children}{' '}
      {optional ? (
        <span className="text-ink-muted font-normal lowercase">(optional)</span>
      ) : (
        <span className="text-accent">*</span>
      )}
    </label>
  )
}

function Radio({ selected }) {
  return (
    <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${selected ? 'border-accent' : 'border-line-strong'}`}>
      {selected && <span className="w-2 h-2 bg-accent rounded-full" />}
    </span>
  )
}

function ErrorBox({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      className="mb-4 px-4 py-2.5 bg-red-500/10 border border-red-500/25 rounded-xl text-red-400 text-xs sm:text-sm flex items-center gap-2"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="shrink-0">
        <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm-.75-9.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5zm.75 6.5a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75z" clipRule="evenodd" />
      </svg>
      <span>{children}</span>
    </motion.div>
  )
}

function ReviewItem({ label, onEdit, wide, children }) {
  return (
    <div className={`p-4 rounded-lg border border-line ${wide ? 'sm:col-span-2' : ''}`}>
      <div className="flex justify-between items-center text-neutral-400 mb-1">
        <span>{label}</span>
        <button type="button" onClick={onEdit} className="text-[0.65rem] underline text-white/70 hover:text-white cursor-pointer">
          Edit
        </button>
      </div>
      {children}
    </div>
  )
}

// variant: 'page' — the large panel on /book-project (default)
//          'modal' — legacy borderless style for a popup
export default function BookingStepper({ onClose, onSubmitted, isModal = false, variant = isModal ? 'modal' : 'page' }) {
  const { formData, setFormData, currentStep, setCurrentStep, resetBookingForm } = useBooking()

  // Put the cursor in the step's first field on mouse/trackpad devices only.
  // On phones and tablets this would pop the keyboard open on page load.
  const focusOnDesktop = useCallback((el) => {
    if (el && window.matchMedia('(pointer: fine)').matches) el.focus({ preventScroll: true })
  }, [])

  const [stepError, setStepError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [submitState, setSubmitState] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')
  const [submittedData, setSubmittedData] = useState(null)

  const set = (field, value) => {
    setStepError('')
    setErrorMessage('')
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  const handleChange = (e) => set(e.target.name, e.target.value)

  const selectContact = (id) => {
    setStepError('')
    setFormData((prev) => ({ ...prev, preferredContact: id, contactDetail: id === 'Email' ? '' : prev.contactDetail }))
  }

  // Validate a step before moving on. Returns an error message or ''.
  const errorFor = (step) => {
    const d = formData
    if (step === 1) {
      if (!d.projectDescription.trim()) return 'Tell me a little about what you want to make.'
      if (d.projectDescription.trim().length < 10) return 'A bit more detail please (at least 10 characters).'
    }
    if (step === 2) {
      if (!d.videoLength) return 'Pick a rough length, or "Not sure yet".'
      if (!d.deadline) return 'Pick a timeline.'
    }
    if (step === 3 && !d.budget) return 'Pick a budget range, or "Not sure yet".'
    if (step === 4) {
      if (d.fullName.trim().length < 2) return 'Please enter your name.'
      if (!EMAIL_RE.test(d.email.trim())) return 'Please enter a valid email (e.g. name@company.com).'
      if (d.preferredContact !== 'Email' && !d.contactDetail.trim()) {
        const m = CONTACT_METHODS.find((c) => c.id === d.preferredContact)
        return m?.error || 'Please add your contact details.'
      }
    }
    return ''
  }

  const handleBeforeNext = async (step) => {
    setErrorMessage('')
    const err = errorFor(step)
    setStepError(err)
    return !err
  }

  // Enter in a single-line field moves to the next step
  const nextOnEnter = (step) => (e) => {
    if (e.key !== 'Enter') return
    e.preventDefault()
    handleBeforeNext(step).then((ok) => ok && setCurrentStep(step + 1))
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    setErrorMessage('')
    setStepError('')

    // Re-check every step; jump to the first one with a problem
    for (let s = 1; s < LAST_STEP; s++) {
      const err = errorFor(s)
      if (err) {
        setCurrentStep(s)
        setStepError(err)
        return
      }
    }

    setIsLoading(true)
    setSubmitState('loading')

    try {
      const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
      if (!web3formsKey) {
        throw new Error('Web3Forms access key is not configured. Please check your environment variables.')
      }

      // Web3Forms prints every field it receives as its own row in the
      // email, so send each answer once and leave out anything not filled in.
      // The keys below are the row titles you see in the email.
      const answers = {
        'Contact via':
          formData.preferredContact === 'Email' ? '' : `${formData.preferredContact}: ${formData.contactDetail.trim()}`,
        Project: formData.projectDescription.trim(),
        Website: formData.website.trim(),
        References: formData.inspirationReferences.trim(),
        Length: formData.videoLength,
        Timeline: formData.deadline,
        Budget: formData.budget,
      }

      const formDataObj = {
        access_key: web3formsKey,
        subject: `New Project Booking from ${formData.fullName}`,
        from_name: formData.fullName,
        name: formData.fullName,
        email: formData.email, // also the reply-to address
        ...Object.fromEntries(Object.entries(answers).filter(([, v]) => v)),
        botcheck: '',
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
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
        setErrorMessage(data?.message || `Submission failed with status ${response.status}. Please try again.`)
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

  // ── Success view ─────────────────────────────────────────
  if (submitState === 'success') {
    const sent = submittedData || formData
    const clientName = sent.fullName.split(' ')[0] || 'friend'
    const channel = sent.preferredContact === 'Other' ? sent.contactDetail : sent.preferredContact

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

          <p className="text-[#A3A3A3] text-xs font-display font-semibold tracking-[0.15em] uppercase mb-2">Project Brief Sent</p>

          <h2 className="font-display font-800 text-2xl sm:text-4xl text-white mb-3 tracking-tight">
            Thanks for reaching out, {clientName}!
          </h2>

          <p className="text-ink-muted text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8">
            Your brief is in. I&apos;ll review it and reach out via{' '}
            <span className="text-white font-medium">{channel}</span> within 24 hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {onClose ? (
              <button type="button" onClick={onClose} className="stepper-next-button px-6 py-3 text-sm cursor-pointer">
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

  const activeContact = CONTACT_METHODS.find((m) => m.id === formData.preferredContact) || CONTACT_METHODS[0]
  const lengthInfo = VIDEO_LENGTHS.find((l) => l.id === formData.videoLength)

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
        renderFooter={({ currentStep: cStep, handleBack, handleNext }) => (
          <div className="w-full">
            <AnimatePresence>{stepError && <ErrorBox key="step">{stepError}</ErrorBox>}</AnimatePresence>
            <AnimatePresence>
              {cStep === LAST_STEP && errorMessage && <ErrorBox key="submit">{errorMessage}</ErrorBox>}
            </AnimatePresence>

            <div className={`stepper-footer-nav ${cStep !== 1 ? 'spread' : 'end'}`}>
              {cStep !== 1 && (
                <button type="button" onClick={handleBack} disabled={isLoading} className="stepper-back-button">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M8.5 3.5L5 7l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Back
                </button>
              )}

              {cStep === LAST_STEP ? (
                <button type="button" onClick={handleSubmit} disabled={isLoading} className="stepper-next-button px-6 py-3">
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
                <button type="button" onClick={handleNext} className="stepper-next-button">
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
        {/* ── STEP 1: PROJECT ─────────────────────────────────── */}
        <Step>
          <div className="space-y-9">
            <StepHeader step={1} kicker="The project" title="What are we making?">
              The product, who it&apos;s for and what the animation needs to get across. Rough is fine.
            </StepHeader>

            <div className="pt-1 space-y-7">
              <div>
                <FieldLabel>Project description</FieldLabel>
                <textarea
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  ref={focusOnDesktop}
                  rows={3}
                  placeholder="e.g. A 30s launch video for our new dashboard feature, aimed at product teams…"
                  className="booking-input resize-none"
                />
              </div>

              <div>
                <FieldLabel optional>Company or product website</FieldLabel>
                <input
                  type="text"
                  inputMode="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  onKeyDown={nextOnEnter(1)}
                  placeholder="yourproduct.com"
                  className="booking-input"
                />
              </div>

              <div>
                <FieldLabel optional>Inspiration & references</FieldLabel>
                <textarea
                  name="inspirationReferences"
                  value={formData.inspirationReferences}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Links to videos or styles you like…"
                  className="booking-input resize-none"
                />
              </div>
            </div>
          </div>
        </Step>

        {/* ── STEP 2: SCOPE ───────────────────────────────────── */}
        <Step>
          <div className="space-y-9">
            <StepHeader step={2} kicker="Scope" title="How long, and by when?">
              A rough idea is enough. If you&apos;re not sure about length, I&apos;ll recommend one.
            </StepHeader>

            <div className="pt-1">
              <FieldLabel>Video length</FieldLabel>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {VIDEO_LENGTHS.map((len) => {
                  const selected = formData.videoLength === len.id
                  return (
                    <button
                      key={len.id}
                      type="button"
                      onClick={() => set('videoLength', len.id)}
                      className={`${optionClass(selected)} px-4 py-4 min-h-[84px] flex flex-col justify-center`}
                    >
                      <span className="text-sm sm:text-base font-semibold tracking-tight">{len.id}</span>
                      <span className={`mt-1 text-xs ${selected ? 'text-accent-soft' : 'text-ink-muted'}`}>{len.label}</span>
                    </button>
                  )
                })}
              </div>
              {lengthInfo && lengthInfo.from > 0 && (
                <p className="text-ink-muted text-sm mt-3">
                  Videos of this length usually start from ${lengthInfo.from.toLocaleString('en-US')}.
                </p>
              )}
            </div>

            <div>
              <FieldLabel>Timeline</FieldLabel>
              <div className="grid grid-cols-2 gap-3">
                {DEADLINE_OPTIONS.map((opt) => {
                  const selected = formData.deadline === opt.id
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => set('deadline', opt.id)}
                      className={`${optionClass(selected)} p-4 sm:p-5`}
                    >
                      <div className="text-sm sm:text-[0.95rem] font-medium">{opt.label}</div>
                      <div className={`mt-1 text-xs ${selected ? 'text-accent-soft' : 'text-ink-subtle'}`}>{opt.note}</div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </Step>

        {/* ── STEP 3: BUDGET ──────────────────────────────────── */}
        <Step>
          <div className="space-y-9">
            <StepHeader step={3} kicker="Budget" title="What's your budget?">
              Pick what feels right. It helps me suggest the best approach, not rule anything out.
            </StepHeader>

            <div className="pt-1 space-y-3">
              {BUDGETS.map((b) => {
                const selected = formData.budget === b.id
                const note = selected ? budgetNote(b.id, formData.videoLength) : ''
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => set('budget', b.id)}
                    className={`${optionClass(selected)} w-full p-5 sm:px-6 flex items-center justify-between gap-4`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-base sm:text-lg tracking-tight text-ink-primary">{b.id}</span>
                        <span
                          className={`text-[0.65rem] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                            selected ? 'bg-accent text-accent-ink' : 'bg-white/[0.06] text-ink-secondary'
                          }`}
                        >
                          {b.badge}
                        </span>
                      </div>
                      <p className={`text-xs ${selected ? 'text-ink-secondary' : 'text-ink-muted'}`}>{b.note}</p>
                      {note && <p className="text-xs text-accent-soft pt-1">{note}</p>}
                    </div>
                    <Radio selected={selected} />
                  </button>
                )
              })}
            </div>
          </div>
        </Step>

        {/* ── STEP 4: YOU ─────────────────────────────────────── */}
        <Step>
          <div className="space-y-9">
            <StepHeader step={4} kicker="About you" title="Who should I reply to?">
              I&apos;ll get back to you within 24 hours.
            </StepHeader>

            <div className="pt-1 grid gap-7 sm:grid-cols-2 sm:gap-6">
              <div>
                <FieldLabel>Your name</FieldLabel>
                <input
                  type="text"
                  name="fullName"
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleChange}
                  ref={focusOnDesktop}
                  placeholder="Jane Doe"
                  className="booking-input"
                />
              </div>
              <div>
                <FieldLabel>Email</FieldLabel>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  onKeyDown={formData.preferredContact === 'Email' ? nextOnEnter(4) : undefined}
                  placeholder="jane@company.com"
                  className="booking-input"
                />
              </div>
            </div>

            <div>
              <FieldLabel>Best way to reach you</FieldLabel>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {CONTACT_METHODS.map((m) => {
                  const selected = formData.preferredContact === m.id
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => selectContact(m.id)}
                      className={`${optionClass(selected)} px-3 sm:px-4 py-4 text-[0.8rem] sm:text-[0.95rem] font-medium flex items-center justify-center sm:justify-start gap-2.5 min-w-0`}
                    >
                      <span className="hidden sm:flex"><Radio selected={selected} /></span>
                      {m.label}
                    </button>
                  )
                })}
              </div>

              <AnimatePresence initial={false}>
                {activeContact.field && (
                  <motion.div
                    key={activeContact.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-7">
                      <FieldLabel>{activeContact.field}</FieldLabel>
                      <input
                        type={activeContact.id === 'WhatsApp' ? 'tel' : 'text'}
                        name="contactDetail"
                        value={formData.contactDetail}
                        onChange={handleChange}
                        onKeyDown={nextOnEnter(4)}
                        placeholder={activeContact.placeholder}
                        className="booking-input"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Step>

        {/* ── STEP 5: REVIEW & SEND ───────────────────────────── */}
        <Step>
          <div className="space-y-9">
            <StepHeader step={5} kicker="Review" title="Look good?">
              Check the details below, then hit &quot;Send it over&quot;.
            </StepHeader>

            <div className="p-5 sm:p-6 border border-line rounded-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <ReviewItem label="Project" onEdit={() => setCurrentStep(1)} wide>
                  <p className="text-neutral-200 text-xs leading-relaxed max-h-24 overflow-y-auto whitespace-pre-wrap">
                    {formData.projectDescription}
                  </p>
                  {(formData.website || formData.inspirationReferences) && (
                    <div className="mt-3 space-y-1 text-neutral-400 break-all">
                      {formData.website && <p>Website: <span className="text-neutral-200">{formData.website}</span></p>}
                      {formData.inspirationReferences && (
                        <p className="whitespace-pre-wrap max-h-16 overflow-y-auto">
                          References: <span className="text-neutral-200">{formData.inspirationReferences}</span>
                        </p>
                      )}
                    </div>
                  )}
                </ReviewItem>

                <ReviewItem label="Scope" onEdit={() => setCurrentStep(2)}>
                  <div className="text-white font-semibold text-sm">{formData.videoLength}</div>
                  <div className="text-neutral-300 mt-0.5">{formData.deadline}</div>
                </ReviewItem>

                <ReviewItem label="Budget" onEdit={() => setCurrentStep(3)}>
                  <div className="text-white font-semibold text-sm">{formData.budget}</div>
                </ReviewItem>

                <ReviewItem label="You" onEdit={() => setCurrentStep(4)} wide>
                  <div className="text-white font-semibold text-sm">{formData.fullName}</div>
                  <div className="text-neutral-300 mt-0.5 truncate">{formData.email}</div>
                  {formData.preferredContact !== 'Email' && (
                    <div className="text-neutral-400 mt-0.5">
                      {formData.preferredContact}: <span className="text-neutral-200">{formData.contactDetail}</span>
                    </div>
                  )}
                </ReviewItem>
              </div>
            </div>
          </div>
        </Step>
      </Stepper>
    </div>
  )
}
