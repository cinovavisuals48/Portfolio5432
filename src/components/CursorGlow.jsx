'use client'

// ─────────────────────────────────────────────────────────────
// CURSOR GLOW — src/components/CursorGlow.jsx
// A soft ambient glow that follows the cursor on desktop.
// ─────────────────────────────────────────────────────────────

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useSpring(-500, { stiffness: 80, damping: 30, mass: 0.5 })
  const mouseY = useSpring(-500, { stiffness: 80, damping: 30, mass: 0.5 })

  useEffect(() => {
    setMounted(true)

    const handleMove = (e) => {
      if (e.pointerType === 'touch') return
      setIsVisible(true)
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = (e) => {
      if (e.clientX && e.clientY) {
        setIsVisible(true)
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
      }
    }

    const handleTouchStart = () => {
      setIsVisible(false)
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [mouseX, mouseY])

  if (!mounted) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9990] transition-opacity duration-300"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: '-50%',
        translateY: '-50%',
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div
        className="w-[350px] h-[350px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 65%)',
        }}
      />
    </motion.div>
  )
}
