'use client'

import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBooking } from '../context/BookingContext'
import BookingStepper from './BookingStepper'

export default function BookingModal() {
  const { isBookingOpen, closeBooking } = useBooking()
  const modalContentRef = useRef(null)

  // Handle click outside modal content
  const handleBackdropClick = (e) => {
    if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
      closeBooking()
    }
  }

  // Close on Escape
  useEffect(() => {
    if (!isBookingOpen) return
    const onKey = (e) => { if (e.key === 'Escape') closeBooking() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isBookingOpen, closeBooking])

  // Prevent scroll when modal is active
  useEffect(() => {
    if (isBookingOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [isBookingOpen])

  return (
    <AnimatePresence>
      {isBookingOpen && (
        <div data-lenis-prevent className="fixed inset-0 z-[9999] flex items-center justify-center overflow-x-hidden overflow-y-auto">
          {/* Blurred Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeBooking}
            className="fixed inset-0 bg-[#0c0c0b]/90 z-[-1]"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div
            className="w-full max-w-2xl px-3 sm:px-6 py-4 sm:py-8 my-auto flex items-center justify-center"
            onClick={handleBackdropClick}
          >
            <motion.div
              ref={modalContentRef}
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
              className="relative w-full rounded-xl border border-line bg-bg-secondary overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Book a Project Modal"
            >

              {/* Dedicated Top Header Bar - separates close button cleanly from step indicators */}
              <div className="flex items-center justify-between px-5 sm:px-8 pt-4 pb-3 border-b border-line relative z-20">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-xs font-display font-semibold tracking-[0.14em] uppercase text-white/90">
                    Book a Project
                  </span>
                </div>

                {/* Close Button with dedicated spacing */}
                <button
                  type="button"
                  onClick={closeBooking}
                  aria-label="Close modal"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer group"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:rotate-90 duration-200"
                  >
                    <path d="M1 1l12 12M13 1L1 13" />
                  </svg>
                </button>
              </div>

              {/* Stepper Form */}
              <div className="w-full">
                <BookingStepper onClose={closeBooking} isModal={true} />
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
