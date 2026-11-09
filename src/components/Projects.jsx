'use client'

// ─────────────────────────────────────────────────────────────
// SELECTED WORK — src/components/Projects.jsx
// Desktop: numbered list on the left, one large sticky preview on
// the right. The preview follows whichever project sits in the middle
// of the screen as you scroll, and hovering a name switches it too.
// Mobile: each project stacks with its own preview.
// Short UI animations only appear on /projects.
// Projects come from src/data/projects.js.
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useSpring } from 'framer-motion'
import { projects, categoryLabel } from '../data/projects'
import VideoPreview from './VideoPreview'
import { Reveal, Line, SectionLabel, Arrow, EASE } from './Reveal'

const mainProjects = projects.filter((p) => !p.shortUiAnimation)
const pad = (n) => String(n).padStart(2, '0')

// ── Follow preview ─────────────────────────────────────────────
// One video card. At rest it sits in the right column at full size.
// While the pointer is over the project list it shrinks, floats
// beside the cursor and tilts with how fast you move.
const FLOAT_W = 380   // card width while following the cursor (px)
const GAP = 32        // space between cursor and card

function FollowPreview({ current, active, total, listRef }) {
  const dockRef = useRef(null)
  const [floating, setFloating] = useState(false)
  const x = useSpring(0, { stiffness: 260, damping: 30, mass: 0.7 })
  const y = useSpring(0, { stiffness: 260, damping: 30, mass: 0.7 })
  const scale = useSpring(1, { stiffness: 220, damping: 30 })
  const rotate = useSpring(0, { stiffness: 160, damping: 16 })

  useEffect(() => {
    const list = listRef.current
    const dock = dockRef.current
    if (!list || !dock) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let pointer = null
    let lastX = null
    let vx = 0
    let raf = 0

    const loop = () => {
      const d = dock.getBoundingClientRect()
      if (pointer && d.width) {
        const s = FLOAT_W / d.width
        const cx = pointer.x + GAP + FLOAT_W / 2
        const cy = pointer.y
        x.set(cx - (d.left + d.width / 2))
        y.set(cy - (d.top + d.height / 2))
        scale.set(s)
        vx += ((lastX == null ? 0 : pointer.x - lastX) - vx) * 0.25
        lastX = pointer.x
        rotate.set(Math.max(-14, Math.min(14, vx * 0.9)))
      } else {
        x.set(0); y.set(0); scale.set(1); rotate.set(0)
        lastX = null; vx = 0
      }
      raf = requestAnimationFrame(loop)
    }

    // Follow only on real mouse movement over the list. Scrolling docks the
    // card again (the list slides away under a still cursor, and no
    // pointerleave fires for that), until the mouse moves over the list again.
    const follow = (e) => { pointer = { x: e.clientX, y: e.clientY }; setFloating(true) }
    const onLeave = () => { pointer = null; setFloating(false) }
    const onScroll = () => { if (pointer) onLeave() }
    list.addEventListener('pointerenter', follow)
    list.addEventListener('pointermove', follow)
    list.addEventListener('pointerleave', onLeave)
    window.addEventListener('scroll', onScroll, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      list.removeEventListener('pointerenter', follow)
      list.removeEventListener('pointermove', follow)
      list.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', onScroll)
    }
  }, [listRef, x, y, scale, rotate])

  return (
    <div className="sticky top-28 pt-10">
      <div ref={dockRef} className="relative" style={{ aspectRatio: '16 / 9' }}>
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ x, y, scale, rotate, pointerEvents: floating ? 'none' : 'auto' }}
        >
          <Link href={`/projects/${current.id}`} data-cursor="View" className="block h-full" tabIndex={-1} aria-hidden>
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="h-full"
              >
                <VideoPreview project={current} active aspect="16 / 9" sizes="60vw" />
              </motion.div>
            </AnimatePresence>
          </Link>
        </motion.div>
      </div>

      <div className="mt-4 flex items-center justify-between label">
        <span>
          <span className="text-ink-primary">({pad(active + 1)}/{pad(total)})</span>&nbsp; {current.title}
        </span>
        <span>{categoryLabel(current)}</span>
      </div>
      <div className="mt-4 h-px bg-line overflow-hidden" aria-hidden>
        <motion.div
          className="h-full bg-accent origin-left"
          animate={{ scaleX: (active + 1) / total }}
          transition={{ duration: 0.8, ease: EASE }}
        />
      </div>
    </div>
  )
}

export default function Projects() {
  const [active, setActive] = useState(0)
  const rowRefs = useRef([])
  const listRef = useRef(null)

  // Scroll picks the row crossing the middle of the screen.
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const mid = window.innerHeight / 2
      let pick = 0
      rowRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= mid) pick = i
      })
      setActive((prev) => (prev === pick ? prev : pick))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const current = mainProjects[active]

  return (
    <section id="projects" className="section-py">
      <div className="container-site">
        {/* Header */}
        <div className="flex items-end justify-between gap-6 pb-8 md:pb-10 border-b border-line">
          <div>
            <SectionLabel index="01" className="mb-5">Selected work ({pad(mainProjects.length)})</SectionLabel>
            <h2 className="display text-[clamp(3rem,8vw,8.5rem)]">
              <Line>Selected <span className="serif-italic">work</span></Line>
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 lg:gap-10">
          {/* List */}
          <ol
            ref={listRef}
            className="lg:col-span-5"
          >
            {mainProjects.map((project, i) => {
              const isActive = i === active
              return (
                <li
                  key={project.id}
                  ref={(el) => (rowRefs.current[i] = el)}
                  data-index={i}
                  className="border-b border-line"
                >
                  <Link
                    href={`/projects/${project.id}`}
                    data-cursor="View"
                    onMouseMove={() => active !== i && setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group block py-8 md:py-10 lg:min-h-[42vh] lg:flex lg:flex-col lg:justify-center"
                  >
                    {/* Mobile / tablet preview */}
                    <div className="lg:hidden mb-6">
                      <VideoPreview project={project} active="inView" aspect="16 / 9" sizes="100vw" />
                    </div>

                    <div className="flex items-start gap-5 md:gap-8">
                      <span className={`label pt-3 transition-colors duration-500 ${isActive ? 'text-accent' : ''}`}>
                        {pad(i + 1)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`display text-[clamp(2.6rem,5.4vw,5.6rem)] transition-colors duration-500 ${
                            isActive ? 'text-ink-primary lg:text-accent' : 'lg:text-ink-subtle'
                          }`}
                        >
                          {project.title}
                        </h3>
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
                          <p className="label">
                            {categoryLabel(project)}
                            {project.tags?.length ? <span className="text-ink-subtle"> &nbsp;/&nbsp; {project.tags.filter((t) => t !== project.category && t !== 'Spec work').slice(0, 2).join(', ')}</span> : null}
                          </p>
                          <span
                            className={`label inline-flex items-center gap-2 text-ink-primary transition-all duration-500 ${
                              isActive ? 'lg:opacity-100 lg:translate-x-0' : 'lg:opacity-0 lg:-translate-x-2'
                            }`}
                          >
                            View project <Arrow size={12} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ol>

          {/* Preview (desktop): docked in the right column, follows the cursor over the list */}
          <div className="hidden lg:block lg:col-span-7 relative z-20">
            <FollowPreview current={current} active={active} total={mainProjects.length} listRef={listRef} />
          </div>
        </div>

        {/* See all */}
        <Reveal className="mt-12 md:mt-16 flex justify-center">
          <Link href="/projects" className="btn-ghost">
            See all work <Arrow />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
