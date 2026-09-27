'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const INITIAL_FORM_DATA = {
  fullName: '',
  email: '',
  preferredContact: 'Email',
  contactDetail: '',
  projectDescription: '',
  inspirationReferences: '',
  deadline: 'Within 1–2 weeks',
  videoLength: '20–40s',
  budget: '$600–$1,000',
}

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
      const savedData = localStorage.getItem('moulidoesmotion_booking_form')
      if (savedData) {
        const parsed = JSON.parse(savedData)
        setFormData((prev) => ({ ...prev, ...parsed }))
      }
      const savedStep = localStorage.getItem('moulidoesmotion_booking_step')
      if (savedStep) {
        const stepNum = parseInt(savedStep, 10)
        if (stepNum >= 1 && stepNum <= 7) {
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
      localStorage.setItem('moulidoesmotion_booking_form', JSON.stringify(formData))
    } catch (e) {}
  }, [formData, isHydrated])

  // Sync currentStep to localStorage after hydration
  useEffect(() => {
    if (!isHydrated) return
    try {
      localStorage.setItem('moulidoesmotion_booking_step', currentStep.toString())
    } catch (e) {}
  }, [currentStep, isHydrated])

  const openBooking = useCallback(() => {
    setIsBookingOpen(true)
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
      localStorage.removeItem('moulidoesmotion_booking_form')
      localStorage.removeItem('moulidoesmotion_booking_step')
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
