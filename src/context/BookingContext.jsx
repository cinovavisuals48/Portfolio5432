'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const INITIAL_FORM_DATA = {
  fullName: '',
  email: '',
  preferredContact: 'Email',
  contactDetail: '',
  website: '',
  projectDescription: '',
  inspirationReferences: '',
  deadline: 'Within 1–2 weeks',
  videoLength: '',
  budget: '',
}

// v2 = the 5-step form. Older saved drafts (7 steps, more contact
// options) are dropped so nobody lands on a step that no longer exists.
const FORM_KEY = 'moulidoesmotion_booking_form_v2'
const STEP_KEY = 'moulidoesmotion_booking_step_v2'
const LEGACY_KEYS = ['moulidoesmotion_booking_form', 'moulidoesmotion_booking_step']
export const TOTAL_STEPS = 5

const BookingContext = createContext({
  isBookingOpen: false,
  openBooking: () => {},
  closeBooking: () => {},
  toggleBooking: () => {},
  formData: INITIAL_FORM_DATA,
  setFormData: () => {},
  currentStep: 1,
  setCurrentStep: () => {},
  resetBookingForm: () => {},
})

export function BookingProvider({ children }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [currentStep, setCurrentStep] = useState(1)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load saved state from localStorage on client mount
  useEffect(() => {
    try {
      LEGACY_KEYS.forEach((k) => localStorage.removeItem(k))
      const savedData = localStorage.getItem(FORM_KEY)
      if (savedData) {
        const parsed = JSON.parse(savedData)
        setFormData((prev) => ({ ...prev, ...parsed }))
      }
      const savedStep = localStorage.getItem(STEP_KEY)
      if (savedStep) {
        const stepNum = parseInt(savedStep, 10)
        if (stepNum >= 1 && stepNum <= TOTAL_STEPS) {
          setCurrentStep(stepNum)
        }
      }
    } catch (e) {
      console.warn('Could not read form state from localStorage', e)
    } finally {
      setIsHydrated(true)
    }
  }, [])

  // Sync formData to localStorage after hydration
  useEffect(() => {
    if (!isHydrated) return
    try {
      localStorage.setItem(FORM_KEY, JSON.stringify(formData))
    } catch (e) {}
  }, [formData, isHydrated])

  // Sync currentStep to localStorage after hydration
  useEffect(() => {
    if (!isHydrated) return
    try {
      localStorage.setItem(STEP_KEY, currentStep.toString())
    } catch (e) {}
  }, [currentStep, isHydrated])

  // "Book a project" is its own page now (/book-project). Anything that
  // still calls openBooking() is sent there with the page transition.
  const openBooking = useCallback(() => {
    window.dispatchEvent(new CustomEvent('pt:navigate', { detail: { path: '/book-project' } }))
  }, [])

  const closeBooking = useCallback(() => {
    setIsBookingOpen(false)
  }, [])

  const toggleBooking = useCallback(() => {
    setIsBookingOpen((prev) => !prev)
  }, [])

  const resetBookingForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA)
    setCurrentStep(1)
    try {
      localStorage.removeItem(FORM_KEY)
      localStorage.removeItem(STEP_KEY)
    } catch (e) {}
  }, [])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isBookingOpen) {
        closeBooking()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isBookingOpen, closeBooking])

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isBookingOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalStyle
      }
    }
  }, [isBookingOpen])

  // Listen to hash or query parameter for direct triggers
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkHashOrSearch = () => {
        if (window.location.hash === '#book' || window.location.hash === '#book-project') {
          openBooking()
        }
      }
      checkHashOrSearch()
      window.addEventListener('hashchange', checkHashOrSearch)
      return () => window.removeEventListener('hashchange', checkHashOrSearch)
    }
  }, [openBooking])

  return (
    <BookingContext.Provider
      value={{
        isBookingOpen,
        openBooking,
        closeBooking,
        toggleBooking,
        formData,
        setFormData,
        currentStep,
        setCurrentStep,
        resetBookingForm,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}
