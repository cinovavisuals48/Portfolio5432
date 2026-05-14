'use client'

// ─────────────────────────────────────────────────────────────
// VIDEO EMBED — src/components/VideoEmbed.jsx
// Clean video wrapper with play button overlay
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function VideoEmbed({ embedUrl, thumbnailUrl, title, accentColor = '#3b82f6' }) {
  const [playing, setPlaying] = useState(false)

  const autoplayUrl = embedUrl.includes('?')
    ? `${embedUrl}&autoplay=1`
    : `${embedUrl}?autoplay=1`

  const hasThumbnail = !!thumbnailUrl

  return (
    <div className="relative group">
      {/* Subtle glow on hover */}
      <div
        className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 
                   transition-opacity duration-500 -z-10 blur-xl"
        style={{ background: `radial-gradient(ellipse, ${accentColor}20 0%, transparent 70%)` }}
      />

      {/* Outer frame */}
      <div
        className="relative rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)]
                   bg-bg-card"
      >
        {/* 16:9 wrapper */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>

          {/* Thumbnail + Play Button overlay */}
          <AnimatePresence>
            {!playing && (
              <motion.div
                key="thumbnail"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-10 cursor-pointer"
                onClick={() => setPlaying(true)}
              >
                {/* Background */}
                {hasThumbnail ? (
                  <img
                    src={thumbnailUrl}
                    alt={`${title} thumbnail`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="w-full h-full"
                    style={{ background: 'linear-gradient(135deg, #141414 0%, #1a1a1a 100%)' }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                    w-24 h-24 rounded-full opacity-15"
                      style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }}
                    />
                  </div>
                )}

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[rgba(10,10,10,0.3)]" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="w-14 h-14 rounded-full flex items-center justify-center
                               border border-[rgba(255,255,255,0.2)]
                               bg-[rgba(255,255,255,0.1)] backdrop-blur-sm"
                  >
                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
                      <path d="M8 5.5L17 11L8 16.5V5.5Z" fill="white" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actual iframe */}
          {playing && (
            <motion.iframe
              key="iframe"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full"
              src={autoplayUrl}
              title={title}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
              style={{ border: 'none' }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
