'use client'

// ─────────────────────────────────────────────────────────────
// CUSTOM CURSOR — src/components/CustomCursor.jsx
// A single small dot. Grows over links/buttons; becomes a labelled
// disc over elements with data-cursor="Label" (e.g. project previews).
// Only runs on fine pointers without reduced-motion; otherwise the
// native cursor is left alone.
// ─────────────────────────────────────────────────────────────

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const INTERACTIVE = 'a, button, [role="button"], summary, label, select'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState('default') // default | hover | label
  const [label, setLabel] = useState('')

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 700, damping: 45, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 700, damping: 45, mass: 0.35 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(fine.matches && !reduced.matches)
    update()
    fine.addEventListener('change', update)
    reduced.addEventListener('change', update)
    return () => {
      fine.removeEventListener('change', update)
      reduced.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (!enabled) {
      root.classList.remove('has-custom-cursor')
      return
    }
    root.classList.add('has-custom-cursor')

    let last = null
    const pick = (target) => {
      const labelled = target?.closest('[data-cursor]')
      if (labelled) {
        setMode('label')
        setLabel(labelled.getAttribute('data-cursor'))
      } else if (target?.closest(INTERACTIVE)) {
        setMode('hover')
      } else {
        setMode('default')
      }
    }
    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      last = { x: e.clientX, y: e.clientY }
      setVisible(true)
      pick(e.target instanceof Element ? e.target : null)
    }
    // When the page scrolls under a still cursor, re-check what's beneath it
    // so labels like "View" don't stick after the element has moved away.
    let raf = 0
    const onScroll = () => {
      if (!last || raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        pick(document.elementFromPoint(last.x, last.y))
      })
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', onLeave)
    return () => {
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', onLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const size = mode === 'label' ? 84 : mode === 'hover' ? 36 : 9

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[10000]"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
        className={`rounded-full flex items-center justify-center ${
          mode === 'label' ? 'bg-accent text-accent-ink' : mode === 'hover' ? 'border border-ink-primary/70' : 'bg-ink-primary'
        }`}
        animate={{ width: size, height: size, opacity: visible ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
      >
        {mode === 'label' && <span className="label !text-accent-ink !text-[0.62rem]">{label}</span>}
      </motion.div>
    </motion.div>
  )
}
