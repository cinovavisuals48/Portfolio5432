'use client'

// ─────────────────────────────────────────────────────────────
// PAGE WIPE — src/components/PageWipe.jsx
// Grey overlay with bottom-to-top wipe animation with blur edges
// ─────────────────────────────────────────────────────────────

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback, useEffect } from 'react'

// Global state for page wipe
let wipeCallback = null

export const triggerPageWipe = (callback) => {
  if (wipeCallback) {
    wipeCallback(callback)
  }
}

export default function PageWipe() {
  const [isActive, setIsActive] = useState(false)
  const [callback, setCallback] = useState(null)

  useEffect(() => {
    wipeCallback = (cb) => {
      setIsActive(true)
      setCallback(() => cb)
    }

    return () => {
      wipeCallback = null
    }
  }, [])

  const handleAnimationComplete = useCallback(() => {
    if (callback) {
      callback()
      setCallback(null)
    }
    setIsActive(false)
  }, [callback])

  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Main wipe overlay - animates from bottom to top */}
          <motion.div
            key="wipe-overlay"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ 
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1], // Smooth easing curve
            }}
            onAnimationComplete={handleAnimationComplete}
            className="fixed inset-0 bg-[#2a2a2a] z-[9999] pointer-events-none"
            style={{
              // Add feather effect with a gradient blur edge
              maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 15%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0) 35%)',
              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 15%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0) 35%)',
            }}
          />

          {/* Additional blur feather effect for smoother edge */}
          <motion.div
            key="wipe-blur"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ 
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="fixed inset-0 pointer-events-none z-[9998]"
            style={{
              background: 'linear-gradient(to top, rgba(42,42,42,0.6) 0%, transparent 40%)',
              filter: 'blur(12px)',
              maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%)',
              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%)',
            }}
          />
        </>
      )}
    </AnimatePresence>
  )
}
