'use client'

// ─────────────────────────────────────────────────────────────
// PAGE WIPE — src/components/PageWipe.jsx
// Grey overlay with bottom-to-top wipe animation with blur edges
// ─────────────────────────────────────────────────────────────

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback, useEffect, useRef } from 'react'

// Global state for page wipe trigger
let pendingWipe = null

// Trigger the page wipe. Provide a callback that returns a Promise (or void).
// The wipe will:
// 1) animate in (cover)
// 2) run the callback and await it (if it returns a Promise)
// 3) animate out (reveal) and then resolve the returned Promise
export const triggerPageWipe = (callback) => {
  return new Promise((resolve) => {
    pendingWipe = { callback, resolve }
    // The PageWipe component will pick this up and start the animation
  })
}

export default function PageWipe() {
  const [isActive, setIsActive] = useState(false)
  const phaseRef = useRef('idle') // 'idle' | 'in' | 'out'
  const pendingRef = useRef(null)

  useEffect(() => {
    if (!pendingWipe) return
    // Claim the pending wipe
    pendingRef.current = pendingWipe
    pendingWipe = null
    phaseRef.current = 'in'
    setIsActive(true)
  }, [isActive])

  // watch for new triggers via a small interval (safe for hydration)
  useEffect(() => {
    const id = setInterval(() => {
      if (!isActive && pendingWipe) {
        pendingRef.current = pendingWipe
        pendingWipe = null
        phaseRef.current = 'in'
        setIsActive(true)
      }
    }, 50)
    return () => clearInterval(id)
  }, [isActive])

  const handleInComplete = useCallback(() => {
    const entry = pendingRef.current
    if (!entry) return
    // Run callback and wait for it (supports async navigation)
    try {
      const result = entry.callback()
      Promise.resolve(result)
        .then(() => {
          // start exit animation
          phaseRef.current = 'out'
        })
        .catch(() => {
          phaseRef.current = 'out'
        })
    } catch (err) {
      phaseRef.current = 'out'
    }
  }, [])

  const handleOutComplete = useCallback(() => {
    const entry = pendingRef.current
    if (entry && entry.resolve) {
      entry.resolve()
    }
    pendingRef.current = null
    phaseRef.current = 'idle'
    setIsActive(false)
  }, [])

  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Main wipe overlay - animates from bottom to top (in) and continues up (out) */}
          <motion.div
            key="wipe-overlay"
            initial={{ y: '100%' }}
            animate={phaseRef.current === 'in' ? { y: '0%' } : { y: '-100%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            onAnimationComplete={() => {
              if (phaseRef.current === 'in') handleInComplete()
              else if (phaseRef.current === 'out') handleOutComplete()
            }}
            className="fixed inset-0 bg-[#2a2a2a] z-[9999] pointer-events-none"
            style={{
              maskImage:
                'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 15%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0) 35%)',
              WebkitMaskImage:
                'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 15%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0) 35%)',
            }}
          />

          {/* Additional blur feather effect for smoother edge */}
          <motion.div
            key="wipe-blur"
            initial={{ y: '100%' }}
            animate={phaseRef.current === 'in' ? { y: '0%' } : { y: '-100%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
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
