'use client'

// ─────────────────────────────────────────────────────────────
// PROJECT CARD — src/components/ProjectCard.jsx
// Displays project thumbnail, title, and info. Clicks to detail page.
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function ProjectCard({ project, index, forcePreview = false, previewOnly = false }) {
  const [hovered, setHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [showVideoPreview, setShowVideoPreview] = useState(forcePreview)
  const [previewLoaded, setPreviewLoaded] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  const hasThumbnail = project.thumbnailUrl && !imageError
  const hasVideoPreview = !!project.videoEmbedUrl
  const hasActivePreview = showVideoPreview && hasVideoPreview
  const pillVisible = previewOnly && hovered && hasVideoPreview
  const pillLabel = isMuted ? 'Unmute' : 'Mute'
  const videoAspectRatio = project.aspectRatio ?? '16 / 9'

  const handleMouseMove = (event) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  const getVideoAspectStyles = (ratio) => {
    const normalized = String(ratio).replace(/\s+/g, '').replace(':', '/')
    const [width, height] = normalized.split('/').map(Number)

    if (!width || !height || Number.isNaN(width) || Number.isNaN(height)) {
      return { aspectRatio: '16 / 9' }
    }

    return {
      aspectRatio: `${width} / ${height}`,
    }
  }

  const aspectStyles = getVideoAspectStyles(videoAspectRatio)

  const normalizeVimeoEmbedUrl = (urlString) => {
    try {
      const parsed = new URL(urlString)
      if (parsed.hostname.includes('vimeo.com')) {
        const pathMatch = parsed.pathname.match(/^\/(\d+)$/)
        if (pathMatch) {
          parsed.pathname = `/video/${pathMatch[1]}`
        }
      }
      return parsed.toString()
    } catch (error) {
      return urlString
    }
  }

  const getPreviewUrl = (url, muted = true) => {
    try {
      const parsed = new URL(normalizeVimeoEmbedUrl(url))
      parsed.searchParams.set('autoplay', '1')
      parsed.searchParams.set('muted', muted ? '1' : '0')
      parsed.searchParams.set('loop', '1')
      parsed.searchParams.set('playsinline', '1')
      parsed.searchParams.set('controls', '0')
      parsed.searchParams.set('background', '1')
      parsed.searchParams.set('title', '0')
      parsed.searchParams.set('byline', '0')
      parsed.searchParams.set('portrait', '0')
      return parsed.toString()
    } catch (error) {
      return `${url}${url.includes('?') ? '&' : '?'}autoplay=1&muted=${muted ? '1' : '0'}&loop=1&playsinline=1&controls=0&background=1&title=0&byline=0&portrait=0`
    }
  }

  useEffect(() => {
    if (!hasVideoPreview) return

    if (forcePreview) {
      setShowVideoPreview(true)
      return
    }

    if (!cardRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowVideoPreview(true)
        }
      },
      { threshold: 0.45, rootMargin: '0px 0px -20% 0px' }
    )

    observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [forcePreview, hasVideoPreview])

  const cardContent = (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className={`relative rounded-xl overflow-hidden border border-thin
                   bg-bg-card group ${forcePreview || previewOnly ? 'cursor-default' : 'cursor-pointer'} h-full`}
      style={{
        boxShadow: hovered
          ? '0 20px 60px rgba(0,0,0,0.4)'
          : '0 4px 20px rgba(0,0,0,0.2)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.25s ease',
      }}
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none z-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'radial-gradient(ellipse at top left, rgba(59, 130, 246, 0.08) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10">
        {/* Thumbnail Section */}
        <div className="relative overflow-hidden bg-bg-secondary" style={{ ...aspectStyles, backgroundColor: '#0f0f0f' }}>
          {hasThumbnail && (
            <Image
              src={project.thumbnailUrl}
              alt={`${project.title} thumbnail`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ minWidth: '100%', minHeight: '100%', display: 'block' }}
            />
          )}

          {hasActivePreview && (
            <>
              <iframe
                className="absolute inset-0 w-full h-full pointer-events-none"
                src={getPreviewUrl(project.videoEmbedUrl, isMuted)}
                title={`${project.title} preview`}
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
                loading="lazy"
                aria-hidden="true"
                onLoad={() => setPreviewLoaded(true)}
                style={{
                  border: 'none',
                  opacity: previewLoaded ? 1 : 0,
                  transition: 'opacity 0.35s ease',
                  minWidth: '100%',
                  minHeight: '100%',
                  display: 'block',
                  backgroundColor: '#0f0f0f',
                  transform: 'translateZ(0)',
                }}
              />

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  opacity: previewLoaded ? 0 : 1,
                  transition: 'opacity 0.35s ease',
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.95) 100%)',
                }}
              />
            </>
          )}

          {!hasActivePreview && !hasThumbnail && (
            <div className="absolute inset-0 bg-gradient-to-br from-bg-elevated to-bg-card flex items-center justify-center overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ['0%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />

              <div className="text-center relative z-10">
                <svg 
                  width="40" 
                  height="40" 
                  viewBox="0 0 24 24" 
                  className="text-ink-subtle/50 mx-auto mb-2"
                >
                  <path d="M8 5v14l11-7z" fill="currentColor"/>
                </svg>
                <span className="text-ink-subtle/40 text-xs font-medium">
                  {project.category}
                </span>
              </div>
            </div>
          )}

          {/* Light sweep for thumbnail when video not showing */}
          {!showVideoPreview && hasThumbnail && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
              animate={{ x: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          )}
          
          {/* Play icon overlay on hover */}
          {!showVideoPreview && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm 
                              flex items-center justify-center border border-white/20
                              transform scale-90 group-hover:scale-100 transition-transform duration-200">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="tag-pill text-[0.68rem]">{project.category}</span>
          </div>

          {previewOnly && hasVideoPreview && (
            <motion.button
              type="button"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                setIsMuted((value) => !value)
              }}
              aria-label={isMuted ? 'Unmute preview' : 'Mute preview'}
              className="absolute top-0 left-0 z-30 pointer-events-auto rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.75rem] uppercase tracking-[0.2em] text-white shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl transition duration-300"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{
                opacity: pillVisible ? 1 : 0,
                scale: pillVisible ? 1 : 0.88,
                x: cursorPosition.x + 20,
                y: cursorPosition.y + 20,
              }}
              transition={{ type: 'spring', stiffness: 320, damping: 28, mass: 0.15 }}
              whileTap={{ scale: 0.92 }}
              style={{ transformOrigin: 'top left' }}
            >
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_16px_rgba(56,189,248,0.4)]" />
                {pillLabel}
              </span>
            </motion.button>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Title */}
          <h3 className="font-display text-lg font-700 text-ink-primary mb-2 tracking-tight
                         group-hover:text-white transition-colors flex items-center justify-between">
            {project.title}
            <motion.div
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-ink-subtle"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" 
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </h3>

          {/* Description */}
          <p className="text-ink-muted text-[0.85rem] leading-relaxed line-clamp-2 mb-4">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[0.68rem] px-2 py-0.5 rounded-full font-medium
                           bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]
                           text-ink-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  )

  return previewOnly ? cardContent : <Link href={`/projects/${project.id}`}>{cardContent}</Link>
}
