'use client'

// ─────────────────────────────────────────────────────────────
// CURSOR GLOW — src/components/CursorGlow.jsx
// A soft ambient glow that follows the cursor on desktop.
// ─────────────────────────────────────────────────────────────

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const [mounted, setMounted] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  const mouseX = useSpring(0, { stiffness: 80, damping: 30, mass: 0.5 })
  const mouseY = useSpring(0, { stiffness: 80, damping: 30, mass: 0.5 })

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches)
    setMounted(true)

    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [mouseX, mouseY])

  if (!mounted || isTouch) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-40"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <div
        className="w-[350px] h-[350px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 60%)',
        }}
      />
    </motion.div>
  )
}
