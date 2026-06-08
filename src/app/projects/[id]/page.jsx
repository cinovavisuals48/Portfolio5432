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

export default function VideoDetailPage() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)
  const [isMuted, setIsMuted] = useState(true)
  const iframeRef = useRef(null)
  const videoAspectRatio = project?.aspectRatio ?? '16 / 9'

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

        {/* Fixed Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-[rgba(10,10,10,0.9)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link 
            href="/projects" 
            className="btn-back"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11.5 7H2.5M6.5 3L2.5 7l4 4" stroke="currentColor" 
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All Projects
          </Link>

          <span className="tag-pill">{project.category}</span>
        </div>
      </motion.header>

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
            <div className="relative w-full rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-bg-card"
                 style={videoAspectStyles}>
              <iframe
                ref={iframeRef}
                src={videoUrl}
                className="absolute inset-0 w-full h-full pointer-events-none"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
                title={project.title}
                style={{ cursor: 'none' }}
              />

              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  setIsMuted((value) => !value)
                }}
                className="absolute bottom-3 right-3 z-20 rounded-full bg-black/50 border border-white/15 p-2 shadow-lg backdrop-blur-sm transition hover:bg-black/70 hover:border-white/25"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
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
            </div>
          </motion.div>

          {/* Project Info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl"
          >
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
                href="https://cal.com/cinova-visuals/30-minute-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm py-2.5 px-5"
              >
                Book a Call
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
