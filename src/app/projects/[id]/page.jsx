'use client'

// ─────────────────────────────────────────────────────────────
// VIDEO DETAIL PAGE — src/app/projects/[id]/page.jsx
// Full-screen video view with description and back button
// ─────────────────────────────────────────────────────────────

import { useMemo, useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../../../data/projects'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import CustomCursor from '../../../components/CustomCursor'
import CursorGlow from '../../../components/CursorGlow'
import SmoothScroll from '../../../components/SmoothScroll'

const isTouchDevice = () => {
  if (typeof window === 'undefined') return false
  const isHoverDisabled = window.matchMedia('(hover: none)').matches
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
  return isHoverDisabled && isCoarsePointer
}

export default function VideoDetailPage() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)
  const [isMuted, setIsMuted] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isTouch, setIsTouch] = useState(isTouchDevice())
  const iframeRef = useRef(null)
  const videoContainerRef = useRef(null)
  const videoAspectRatio = project?.aspectRatio ?? '16 / 9'

  const handleMouseMove = (event) => {
    if (!videoContainerRef.current) return
    const rect = videoContainerRef.current.getBoundingClientRect()
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  const getVideoAspectStyles = (ratio) => {
    const normalized = String(ratio).replace(/\s+/g, '').replace(':', '/')
    const [width, height] = normalized.split('/').map(Number)

    if (!width || !height || Number.isNaN(width) || Number.isNaN(height)) {
      return { aspectRatio: '16 / 9', paddingBottom: '56.25%' }
    }

    return {
      aspectRatio: `${width} / ${height}`,
      paddingBottom: `${(height / width) * 100}%`,
    }
  }

  const videoAspectStyles = getVideoAspectStyles(videoAspectRatio)

  const videoUrl = useMemo(() => {
    if (!project) return ''

    try {
      const url = new URL(project.videoEmbedUrl)
      // Start muted for autoplay to work in restrictive browsers like Instagram in-app
      url.searchParams.set('autoplay', '1')
      url.searchParams.set('muted', '1')
      url.searchParams.set('loop', '1')
      url.searchParams.set('controls', '0')
      url.searchParams.set('playsinline', '1')
      url.searchParams.set('title', '0')
      url.searchParams.set('byline', '0')
      url.searchParams.set('portrait', '0')
      url.searchParams.set('background', '0')
      url.searchParams.set('autopause', '0')
      return url.toString()
    } catch (error) {
      return project.videoEmbedUrl
    }
  }, [project])

  // Use Vimeo Player API to control mute without reloading iframe
  useEffect(() => {
    if (!iframeRef.current) return

    const postMessageToVimeo = () => {
      try {
        const data = {
          method: 'setMuted',
          value: isMuted,
        }
        iframeRef.current?.contentWindow?.postMessage(data, '*')
      } catch (error) {
        console.warn('Could not post message to Vimeo iframe:', error)
      }
    }

    // Wait for iframe to load before posting message
    const timer = setTimeout(postMessageToVimeo, 500)
    return () => clearTimeout(timer)
  }, [isMuted])

  // Autoplay audio after page loads (user already interacted by clicking project)
  useEffect(() => {
    setIsTouch(isTouchDevice())
    // Wait a bit longer for iframe to fully initialize
    const timer = setTimeout(() => {
      setIsMuted(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  // Check initial cursor position on first mouse movement to handle page loads with cursor already over the video
  useEffect(() => {
    if (!videoContainerRef.current) return

    const checkInitialCursorPosition = (event) => {
      const rect = videoContainerRef.current.getBoundingClientRect()
      const isInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom

      if (isInside) {
        setHovered(true)
        setCursorPosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        })
      }

      // Only need this once — normal onMouseEnter/Move/Leave on the
      // container take over from here
      document.removeEventListener('mousemove', checkInitialCursorPosition)
    }

    document.addEventListener('mousemove', checkInitialCursorPosition, { once: true })
    return () => document.removeEventListener('mousemove', checkInitialCursorPosition)
  }, [])

  if (!project) {
    return (
      <main className="relative min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Project Not Found</h1>
          <Link href="/projects" className="btn-primary">
            Back to Projects
          </Link>
        </div>
      </main>
    )
  }

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#0a0a0a]">
        <CursorGlow />
        <CustomCursor />

      {/* Main Content */}
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Wide Video Embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10"
          >
            <div
              ref={videoContainerRef}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onMouseMove={handleMouseMove}
              className="relative w-full rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-bg-card cursor-pointer"
              style={videoAspectStyles}
            >
              <iframe
                ref={iframeRef}
                src={videoUrl}
                className="absolute inset-0 w-full h-full pointer-events-none"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
                title={project.title}
                style={{ cursor: 'none' }}
              />

              {isTouch ? (
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    setIsMuted((value) => !value)
                  }}
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  className="absolute bottom-3 right-3 z-30 rounded-full border border-white/20 bg-white/10 p-2.5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl transition duration-300"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-white">
                    <path
                      d="M5 8v8h5l5 5V3L10 8H5z"
                      fill="currentColor"
                    />
                    {isMuted ? (
                      <path
                        d="M16 8l4 4M20 8l-4 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    ) : null}
                  </svg>
                </button>
              ) : (
                <motion.button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    setIsMuted((value) => !value)
                  }}
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  className="absolute z-30 pointer-events-auto rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.75rem] uppercase tracking-[0.2em] text-white shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl transition duration-300"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{
                    opacity: hovered ? 1 : 0,
                    scale: hovered ? 1 : 0.88,
                    left: cursorPosition.x - 50,
                    top: cursorPosition.y - 35,
                  }}
                  transition={{ type: 'spring', stiffness: 360, damping: 24, mass: 0.18 }}
                  whileTap={{ scale: 0.92 }}
                  style={{ transform: 'translate(-50%, 0)', cursor: 'pointer' }}
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_16px_rgba(56,189,248,0.4)]" />
                    {isMuted ? 'Unmute' : 'Mute'}
                  </span>
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Project Info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl"
          >
            {/* Category Pill */}
            <div className="mb-4">
              <span className="tag-pill">{project.category}</span>
            </div>

            {/* Title */}
            <h1 className="font-display font-800 text-[clamp(1.8rem,4vw,2.5rem)]
                           leading-[1.1] tracking-tight text-ink-primary mb-4">
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-ink-muted text-[1rem] leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[0.75rem] px-3 py-1.5 rounded-lg font-medium
                             bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]
                             text-ink-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              <p className="text-ink-muted text-[0.9rem] mr-4">
                Like this style? Let&apos;s talk.
              </p>
              <a
                href="/book-project"
                className="btn-primary text-sm py-2.5 px-5"
              >
                Book a Project
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor"
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <Link href="/projects" className="btn-ghost text-sm py-2.5 px-5">
                View More Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="border-t border-[rgba(255,255,255,0.05)] py-6 px-6"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/projects" className="text-ink-muted hover:text-ink-primary transition-colors text-sm">
            &larr; Back to All Projects
          </Link>
          <Link href="/" className="text-ink-muted hover:text-ink-primary transition-colors text-sm">
            Home
          </Link>
        </div>
      </motion.footer>
    </main>
  </SmoothScroll>
  )
}
