'use client'

// ─────────────────────────────────────────────────────────────
// VIDEO DETAIL PAGE — src/app/projects/[id]/page.jsx
// Full-screen video view with description and back button
// ─────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'
import { projects, categoryLabel } from '../../../data/projects'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import SmoothScroll from '../../../components/SmoothScroll'
import Footer from '../../../components/Footer'
import { SplitText, Arrow } from '../../../components/Reveal'
import VideoPlayer from '../../../components/VideoPlayer'

export default function VideoDetailPage() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)

  if (!project) {
    return (
      <main id="main" className="relative min-h-screen flex items-center">
        <div className="container-site">
          <p className="label mb-6">404</p>
          <h1 className="display text-[clamp(3rem,10vw,9rem)] mb-10">Project not <span className="serif-italic">found</span></h1>
          <Link href="/projects" className="btn-ghost">Back to projects <Arrow /></Link>
        </div>
      </main>
    )
  }

  const mainList = projects.filter((p) => !p.shortUiAnimation)
  const idx = mainList.findIndex((p) => p.id === project.id)
  const nextProject = idx >= 0 ? mainList[(idx + 1) % mainList.length] : mainList[0]

  return (
    <SmoothScroll>
      <main id="main" className="relative min-h-screen">
        <div className="pt-32 md:pt-40 pb-20">
          <div className="container-site">
            <div className="flex items-center justify-between mb-10">
              <Link href="/projects" className="btn-back">← All projects</Link>
              <p className="label">{categoryLabel(project)}</p>
            </div>

            <h1 className="display text-[clamp(3.4rem,11vw,12rem)] mb-10 md:mb-14">
              <SplitText>{project.title}</SplitText>
            </h1>

            {/* Video */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className={project.aspectRatio ? 'max-w-3xl mx-auto' : ''}
            >
              <VideoPlayer key={project.id} project={project} />
            </motion.div>

            {/* Info */}
            <div className="mt-14 md:mt-20 pt-8 border-t border-line grid gap-10 lg:grid-cols-12">
              <p className="label lg:col-span-3">About the project</p>
              <div className="lg:col-span-6">
                <p className="text-[clamp(1.15rem,1.6vw,1.45rem)] leading-[1.5] text-ink-secondary">
                  {project.description}
                </p>
              </div>
              <div className="lg:col-span-3">
                <p className="label mb-3">Tags</p>
                <ul className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag} className="tag-pill">{tag}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-14 pt-8 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <p className="text-ink-muted">Like this style? Let&apos;s talk.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/book-project" className="btn-pill">
                  Book a project <Arrow />
                </Link>
                <Link href="/projects" className="btn-ghost">View more projects</Link>
              </div>
            </div>

            {/* Next project */}
            {nextProject && nextProject.id !== project.id && (
              <Link
                href={`/projects/${nextProject.id}`}
                data-cursor="Next"
                className="group mt-24 md:mt-32 block border-t border-line pt-6"
              >
                <p className="label mb-4">Next project</p>
                <p className="display text-[clamp(3rem,10vw,10rem)] flex items-end justify-between gap-6 transition-colors duration-500 group-hover:text-accent">
                  {nextProject.title}
                  <Arrow size={48} className="hidden md:block mb-[1.5vw] transition-transform duration-700 ease-expo group-hover:translate-x-2" />
                </p>
              </Link>
            )}
          </div>
        </div>
        <Footer />
      </main>
    </SmoothScroll>
  )
}
