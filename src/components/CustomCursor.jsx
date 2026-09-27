'use client'

// ─────────────────────────────────────────────────────────────
// CUSTOM CURSOR — src/components/CustomCursor.jsx
// A series of trailing dots that follow the cursor
// Completely suppresses native OS cursor across all browsers, devices, and platforms.
// ─────────────────────────────────────────────────────────────

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

const DOT_COUNT = 5
const DOT_SIZES = [10, 8, 6, 4, 3]
const DOT_DELAYS = [0, 0.02, 0.04, 0.06, 0.08]

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const mousePos = useRef({ x: -100, y: -100 })

  // Springs for each dot
  const dots = Array.from({ length: DOT_COUNT }, (_, i) => ({
    x: useSpring(-100, { stiffness: 450 - i * 60, damping: 28 - i * 2, mass: 0.4 + i * 0.1 }),
    y: useSpring(-100, { stiffness: 450 - i * 60, damping: 28 - i * 2, mass: 0.4 + i * 0.1 }),
  }))

  useEffect(() => {
    setMounted(true)

    // Unconditionally force OS cursor to be hidden on root elements
    if (typeof document !== 'undefined') {
      try {
        document.documentElement.style.setProperty('cursor', 'none', 'important')
        document.body.style.setProperty('cursor', 'none', 'important')
      } catch (err) {
        // Fallback if setProperty fails
        document.documentElement.style.cursor = 'none'
        document.body.style.cursor = 'none'
      }

      // Inject global stylesheet to enforce across all browsers, devices, and elements
      const styleId = 'force-suppress-native-cursor'
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style')
        style.id = styleId
        style.textContent = `
          *, *::before, *::after,
          html, body, :root, #__next,
          a, a *, button, button *, input, textarea, select, option, optgroup,
          label, summary, details, svg, svg *, canvas, iframe, video, audio,
          embed, object, [role], [role] *, [tabindex], [contenteditable],
          .cursor-pointer, .cursor-default, .cursor-text, .cursor-not-allowed,
          *:hover, *:active, *:focus, *:focus-visible, *:focus-within {
            cursor: none !important;
            cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=') 0 0, none !important;
            cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='none'/%3E%3C/svg%3E") 0 0, none !important;
          }
        `
        document.head.appendChild(style)
      }
    }

    const isInteractive = (el) => {
      if (!el || !(el instanceof Element)) return false
      return !!el.closest(
        'a, button, input, textarea, select, label, summary, [role="button"], [role="link"], [role="tab"], [tabindex]:not([tabindex="-1"]), .cursor-pointer, .btn-primary, .btn-ghost, .btn-back, .btn-book-project, .btn-work'
      )
    }

    const handleMove = (e) => {
      if (e.pointerType === 'touch') return
      setIsVisible(true)
      mousePos.current = { x: e.clientX, y: e.clientY }
      dots.forEach((dot) => {
        dot.x.set(e.clientX)
        dot.y.set(e.clientY)
      })
    }

    const handleMouseOver = (e) => {
      if (isInteractive(e.target)) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e) => {
      if (!isInteractive(e.relatedTarget)) {
        setIsHovering(false)
      }
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = (e) => {
      if (e.clientX && e.clientY) {
        setIsVisible(true)
        dots.forEach((dot) => {
          dot.x.set(e.clientX)
          dot.y.set(e.clientY)
        })
      }
    }

    const handleTouchStart = () => {
      setIsVisible(false)
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })
    document.addEventListener('mousedown', handleMouseDown, { passive: true })
    document.addEventListener('mouseup', handleMouseUp, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('touchstart', handleTouchStart)
    }
  }, [dots])

  if (!mounted) return null

  return (
    <>
      {/* Hide default cursor globally across all devices and browsers */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            *, *::before, *::after,
            html, body, :root, #__next,
            a, button, input, textarea, select, label, summary, details,
            svg, svg *, canvas, iframe, video, audio, embed, object,
            [role], [tabindex], [contenteditable],
            .cursor-pointer, .cursor-default, .cursor-text, .cursor-not-allowed,
            *:hover, *:active, *:focus, *:focus-visible, *:focus-within {
              cursor: none !important;
              cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=') 0 0, none !important;
              cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='none'/%3E%3C/svg%3E") 0 0, none !important;
            }
          `,
        }}
      />

      {/* Trailing dots - z-index set to 9999999 to guarantee top placement */}
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 z-[9999999] mix-blend-difference"
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
                  ? (i === 0 ? 22 : DOT_SIZES[i] * 1.15)
                  : DOT_SIZES[i],
              height: isClicking
                ? DOT_SIZES[i] * 0.6
                : isHovering
                  ? (i === 0 ? 22 : DOT_SIZES[i] * 1.15)
                  : DOT_SIZES[i],
              opacity: isVisible
                ? (isHovering ? 1 - i * 0.12 : 1 - i * 0.15)
                : 0,
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
        className="pointer-events-none fixed top-0 left-0 z-[9999998] mix-blend-difference"
        style={{
          x: dots[0].x,
          y: dots[0].y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border border-white/50"
          animate={{
            width: isVisible && isHovering ? 38 : 0,
            height: isVisible && isHovering ? 38 : 0,
            opacity: isVisible && isHovering ? 0.7 : 0,
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
