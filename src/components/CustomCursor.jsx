'use client'

// ─────────────────────────────────────────────────────────────
// CUSTOM CURSOR — src/components/CustomCursor.jsx
// A series of trailing dots that follow the cursor
// Disabled on mobile/touch devices automatically.
// ─────────────────────────────────────────────────────────────

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

const DOT_COUNT = 5
const DOT_SIZES = [10, 8, 6, 4, 3]
const DOT_DELAYS = [0, 0.02, 0.04, 0.06, 0.08]

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const mousePos = useRef({ x: 0, y: 0 })

  // Create springs for each dot with different stiffness for trailing effect
  const dots = Array.from({ length: DOT_COUNT }, (_, i) => ({
    x: useSpring(0, { stiffness: 400 - i * 60, damping: 28 - i * 2, mass: 0.4 + i * 0.1 }),
    y: useSpring(0, { stiffness: 400 - i * 60, damping: 28 - i * 2, mass: 0.4 + i * 0.1 }),
  }))

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches)
    setMounted(true)

    const move = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      dots.forEach((dot) => {
        dot.x.set(e.clientX)
        dot.y.set(e.clientY)
      })
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })
    document.addEventListener('mousedown', handleMouseDown, { passive: true })
    document.addEventListener('mouseup', handleMouseUp, { passive: true })

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dots])

  if (!mounted || isTouch) return null

  return (
    <>
      {/* Hide default cursor globally */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Trailing dots */}
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference"
          style={{
            x: dot.x,
            y: dot.y,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <motion.div
            className="rounded-full bg-white"
            animate={{
              width: isClicking 
                ? DOT_SIZES[i] * 0.6 
                : isHovering 
                  ? (i === 0 ? 24 : DOT_SIZES[i] * 1.2) 
                  : DOT_SIZES[i],
              height: isClicking 
                ? DOT_SIZES[i] * 0.6 
                : isHovering 
                  ? (i === 0 ? 24 : DOT_SIZES[i] * 1.2) 
                  : DOT_SIZES[i],
              opacity: isHovering ? 1 - i * 0.12 : 1 - i * 0.15,
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              delay: DOT_DELAYS[i],
            }}
          />
        </motion.div>
      ))}

      {/* Outer ring (appears on hover) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[99] mix-blend-difference"
        style={{
          x: dots[0].x,
          y: dots[0].y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border border-white/40"
          animate={{
            width: isHovering ? 40 : 0,
            height: isHovering ? 40 : 0,
            opacity: isHovering ? 0.6 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 22,
          }}
        />
      </motion.div>
    </>
  )
}
