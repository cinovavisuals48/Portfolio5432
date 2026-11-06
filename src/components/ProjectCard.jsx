'use client'

// ─────────────────────────────────────────────────────────────
// PROJECT CARD — src/components/ProjectCard.jsx
// Large preview + title row. Plays a muted loop on hover (desktop)
// or while on screen (touch). `previewOnly` cards are not links.
// ─────────────────────────────────────────────────────────────

import { useEffect, useState } from 'react'
import Link from 'next/link'
import VideoPreview from './VideoPreview'
import { Reveal, Arrow } from './Reveal'

export default function ProjectCard({ project, index = 0, previewOnly = false }) {
  const [hovered, setHovered] = useState(false)
  const [touch, setTouch] = useState(false)

  useEffect(() => {
    setTouch(window.matchMedia('(hover: none)').matches)
  }, [])

  const active = previewOnly || touch ? 'inView' : hovered

  const body = (
    <>
      <VideoPreview
        project={project}
        active={active}
        aspect={previewOnly ? undefined : '16 / 9'}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="transition-[filter] duration-700"
      />
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <span className="label text-accent">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="text-[clamp(1.3rem,2vw,1.8rem)] leading-tight tracking-[-0.01em] font-medium">
            {project.title}
          </h3>
        </div>
        {!previewOnly && (
          <span className="label inline-flex items-center gap-2 pt-1.5 transition-colors group-hover:text-ink-primary">
            View <Arrow size={11} className="transition-transform duration-500 ease-expo group-hover:translate-x-1" />
          </span>
        )}
      </div>
      <p className="label mt-2 pl-[2.1rem]">{project.category}</p>
    </>
  )

  return (
    <Reveal delay={(index % 2) * 0.08}>
      {previewOnly ? (
        <article>{body}</article>
      ) : (
        <Link
          href={`/projects/${project.id}`}
          data-cursor="View"
          className="group block"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
        >
          {body}
        </Link>
      )}
    </Reveal>
  )
}
