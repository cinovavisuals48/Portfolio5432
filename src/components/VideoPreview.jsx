'use client'

// ─────────────────────────────────────────────────────────────
// VIDEO PREVIEW — src/components/VideoPreview.jsx
// Thumbnail first; a muted, looping Vimeo background player is only
// mounted while `active` is true (keeps the page light). If `active`
// is "inView", it plays while the frame is on screen.
// Reduced-motion users always get the still thumbnail.
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'

export function parseAspect(ratio) {
  const [w, h] = String(ratio ?? '16 / 9').replace(/\s+/g, '').replace(':', '/').split('/').map(Number)
  return w && h ? `${w} / ${h}` : '16 / 9'
}

export function previewUrl(url) {
  try {
    const u = new URL(url)
    const m = u.hostname.includes('vimeo.com') && u.pathname.match(/^\/(\d+)$/)
    if (m) u.pathname = `/video/${m[1]}`
    const params = { autoplay: 1, muted: 1, loop: 1, playsinline: 1, controls: 0, background: 1, title: 0, byline: 0, portrait: 0, dnt: 1, quality: '1080p' }
    Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, String(v)))
    return u.toString()
  } catch {
    return url
  }
}

export default function VideoPreview({
  project,
  active = false,           // true | false | 'inView'
  aspect,                   // override aspect ratio (e.g. '16 / 9' for a fixed frame)
  sizes = '(max-width: 1024px) 100vw, 60vw',
  priority = false,
  className = '',
}) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    if (active !== 'inView' || !ref.current) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [active])

  const shouldPlay = !reduce && !!project.videoEmbedUrl && (active === 'inView' ? inView : active)

  useEffect(() => { if (!shouldPlay) setLoaded(false) }, [shouldPlay])

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-bg-card ${className}`}
      style={{ aspectRatio: parseAspect(aspect ?? project.aspectRatio) }}
    >
      {project.thumbnailUrl && !imgError && (
        <Image
          src={project.thumbnailUrl}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setImgError(true)}
          className="object-cover"
        />
      )}
      {shouldPlay && (
        <iframe
          src={previewUrl(project.videoEmbedUrl)}
          title={`${project.title} preview`}
          allow="autoplay; fullscreen; picture-in-picture"
          tabIndex={-1}
          aria-hidden
          onLoad={() => setTimeout(() => setLoaded(true), 250)}
          className="absolute inset-0 w-full h-full pointer-events-none border-0 transition-opacity duration-700"
          style={{ opacity: loaded ? 1 : 0 }}
        />
      )}
    </div>
  )
}
