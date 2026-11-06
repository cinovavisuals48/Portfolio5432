'use client'

// ─────────────────────────────────────────────────────────────
// VIDEO PLAYER — src/components/VideoPlayer.jsx
// The main video on a project page.
//   • Autoplays with sound and loops forever.
//   • Two see-through round buttons, bottom right: sound + play/pause.
//   • Sound fades out when less than half the video is on screen,
//     and fades back in when you scroll back to it.
//   • Sound also fades out while the booking form is open.
// If the browser blocks sound on a fresh visit, the video plays
// muted and sound comes on with your first click or key press.
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX, Play, Pause } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { parseAspect } from './VideoPreview'

function embedUrl(url) {
  try {
    const u = new URL(url)
    const params = {
      autoplay: 1, muted: 1, loop: 1, controls: 0, playsinline: 1, quality: '1080p',
      title: 0, byline: 0, portrait: 0, background: 0, autopause: 0, dnt: 1,
    }
    Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, String(v)))
    return u.toString()
  } catch {
    return url
  }
}

const FADE_MS = 450

// Picks the highest quality Vimeo offers for this video (up to 1080p)
export async function setBestQuality(p) {
  try {
    const list = (await p.getQualities()).map((q) => q.id)
    const pick = ['1080p', '720p'].find((q) => list.includes(q))
    if (pick) await p.setQuality(pick)
  } catch {
    /* quality switching unavailable — keep auto */
  }
}

export default function VideoPlayer({ project }) {
  const { isBookingOpen } = useBooking()
  const wrapRef = useRef(null)
  const iframeRef = useRef(null)
  const player = useRef(null)
  const fade = useRef({ raf: 0, value: 0 })

  const [soundOn, setSoundOn] = useState(true)  // what the visitor wants
  const [playing, setPlaying] = useState(true)
  const [visible, setVisible] = useState(true)  // at least half on screen
  const [blocked, setBlocked] = useState(false) // browser refused sound
  const [ready, setReady] = useState(false)

  const audible = soundOn && visible && !isBookingOpen && !blocked

  // Smoothly ramp the volume so muting/unmuting never clicks.
  const fadeTo = (target) => {
    const p = player.current
    if (!p) return
    cancelAnimationFrame(fade.current.raf)
    const from = fade.current.value
    const start = performance.now()
    if (target > 0) p.setMuted(false).catch(() => {})
    const step = (now) => {
      const t = Math.min(1, (now - start) / FADE_MS)
      const v = from + (target - from) * t
      fade.current.value = v
      p.setVolume(v).catch(() => {})
      if (t < 1) fade.current.raf = requestAnimationFrame(step)
      else if (target === 0) p.setMuted(true).catch(() => {})
    }
    fade.current.raf = requestAnimationFrame(step)
  }

  // Create the player
  useEffect(() => {
    let cancelled = false
    let p
    import('@vimeo/player').then(({ default: Player }) => {
      if (cancelled || !iframeRef.current) return
      p = new Player(iframeRef.current)
      player.current = p
      p.setLoop(true).catch(() => {})
      // Vimeo's "auto" quality starts low and sizes to the frame, which
      // looks soft. Ask for the sharpest version that exists.
      p.ready().then(() => setBestQuality(p))
      p.setVolume(0).catch(() => {})
      // Safety net: if loop is ever ignored, restart ourselves.
      p.on('ended', () => p.setCurrentTime(0).then(() => p.play()).catch(() => {}))
      p.on('play', () => setPlaying(true))
      p.on('pause', () => setPlaying(false))

      // Try to start with sound; fall back to muted if the browser says no.
      p.ready().then(async () => {
        try {
          await p.setMuted(false)
          await p.play()
          setReady(true)
        } catch {
          setBlocked(true)
          await p.setMuted(true).catch(() => {})
          p.play().catch(() => {})
          setReady(true)
        }
      })
    })
    return () => {
      cancelled = true
      cancelAnimationFrame(fade.current.raf)
      p?.destroy().catch(() => {})
      player.current = null
    }
  }, [project.videoEmbedUrl])

  // If sound was blocked, the first click or key press anywhere unlocks it.
  useEffect(() => {
    if (!blocked) return
    const unlock = () => setBlocked(false)
    window.addEventListener('pointerdown', unlock, { once: true })
    window.addEventListener('keydown', unlock, { once: true })
    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
    }
  }, [blocked])

  // Half-visible check
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.intersectionRatio >= 0.5),
      { threshold: [0, 0.5, 1] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Apply volume whenever anything that affects it changes
  useEffect(() => {
    if (ready) fadeTo(audible ? 1 : 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audible, ready])

  const togglePlay = () => {
    const p = player.current
    if (!p) return
    if (playing) p.pause().catch(() => {})
    else p.play().catch(() => {})
  }

  const toggleSound = () => {
    if (blocked) setBlocked(false)
    setSoundOn((v) => (blocked ? true : !v))
  }

  const showSound = soundOn && !blocked

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden bg-bg-card"
      style={{ aspectRatio: parseAspect(project.aspectRatio) }}
    >
      <iframe
        ref={iframeRef}
        src={embedUrl(project.videoEmbedUrl)}
        className="absolute inset-0 w-full h-full pointer-events-none border-0"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
        title={project.title}
      />

      <div className="video-ctrls absolute bottom-3 right-3 md:bottom-5 md:right-5 z-10 flex gap-2.5">
        <button
          type="button"
          onClick={toggleSound}
          aria-label={showSound ? 'Mute video' : 'Unmute video'}
          aria-pressed={!showSound}
          className="video-ctrl"
        >
          {showSound ? <Volume2 size={18} strokeWidth={1.5} /> : <VolumeX size={18} strokeWidth={1.5} />}
        </button>
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? 'Pause video' : 'Play video'}
          className="video-ctrl"
        >
          {playing ? <Pause size={18} strokeWidth={1.5} /> : <Play size={18} strokeWidth={1.5} className="translate-x-px" />}
        </button>
      </div>
    </div>
  )
}
