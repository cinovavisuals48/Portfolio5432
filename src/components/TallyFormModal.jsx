'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Your Tally form - maintains dark theme colors
const TALLY_FORM_URL = 'https://tally.so/r/eqzGOq'

/**
 * ALTERNATIVE COMPONENT: TallyFormModal
 * 
 * This is an OPTIONAL alternative if you prefer a button that opens
 * the Tally form in a modal popup instead of embedding it directly.
 * 
 * USAGE:
 * Replace the direct iframe in ProjectForm.jsx with this component:
 * 
 *   import TallyFormModal from './TallyFormModal'
 *   <TallyFormModal />
 * 
 * Then delete or comment out the iframe section.
 */

export default function TallyFormModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onClick={() => setIsOpen(true)}
        className="btn-primary py-3.5 font-medium px-8"
      >
        Open Project Form
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>

      {/* Modal Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-bg-primary rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-bg-card border-b border-[rgba(255,255,255,0.06)] px-6 py-4 flex items-center justify-between">
                <h2 className="font-display font-700 text-lg text-ink-primary">
                  Book a Project
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-bg-elevated rounded-lg transition-colors text-ink-muted hover:text-ink-primary"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Form Container */}
              <div className="p-6">
                <iframe
                  src={TALLY_FORM_URL}
                  loading="lazy"
                  style={{
                    colorScheme: 'dark',
                    width: '100%',
                    height: 'auto',
                    border: 'none',
                  }}
                  title="Book a Project – Cinova Visuals"
                  className="min-h-[500px]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
