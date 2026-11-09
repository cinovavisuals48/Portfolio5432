'use client'

// ─────────────────────────────────────────────────────────────
// PROJECTS PAGE — src/app/projects/page.jsx
// All work: text filter tabs, large two-column grid, then the
// short UI animation loops.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, categories } from '../../data/projects'
import ProjectCard from '../../components/ProjectCard'
import Footer from '../../components/Footer'
import SmoothScroll from '../../components/SmoothScroll'
import Link from 'next/link'
import { Line, SplitText, Reveal, Arrow } from '../../components/Reveal'

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const shortUiAnimations = projects.filter((p) => p.shortUiAnimation)
  const mainProjects = projects.filter((p) => !p.shortUiAnimation)
  const filteredProjects = activeCategory === 'All'
    ? mainProjects
    : mainProjects.filter((p) => p.category === activeCategory)

  return (
    <SmoothScroll>
      <main id="main" className="relative min-h-screen">
        <section className="pt-32 md:pt-40 pb-20">
          <div className="container-site">
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
              <Link href="/" className="btn-back">← Back to home</Link>
              <p className="label">Portfolio</p>
            </div>

            <h1 className="display text-[clamp(4rem,16vw,17rem)]">
              <SplitText>All <span className="serif-italic">work</span></SplitText>
            </h1>

            <div className="mt-10 md:mt-14 pt-6 border-t border-line grid gap-8 lg:grid-cols-12">
              <p className="lg:col-span-5 text-ink-muted max-w-[46ch] leading-relaxed">
                SaaS explainers, product videos and UI animations. Tap any project to watch it.
              </p>

              {/* Filter: only shown once there are at least two kinds of project */}
              {categories.length > 2 && (
              <div className="lg:col-span-7 flex flex-wrap gap-x-5 gap-y-3 lg:justify-end" role="group" aria-label="Filter by category">
                {categories.map((category) => {
                  const count = category === 'All'
                    ? mainProjects.length
                    : mainProjects.filter((p) => p.category === category).length
                  const isActive = activeCategory === category
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      aria-pressed={isActive}
                      className={`label transition-colors ${isActive ? 'text-ink-primary' : 'hover:text-ink-primary'}`}
                    >
                      <span className={isActive ? 'border-b border-accent pb-1' : ''}>{category}</span>
                      <sup className="ml-1 text-ink-subtle">{count}</sup>
                    </button>
                  )
                })}
              </div>
              )}
            </div>

            {/* Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16"
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <div className="py-16 border-b border-line">
                <p className="text-ink-muted text-lg mb-4">No projects in this category yet.</p>
                <button type="button" onClick={() => setActiveCategory('All')} className="label link-underline text-ink-primary">
                  See all work
                </button>
              </div>
            )}

            {/* Short UI animations */}
            {shortUiAnimations.length > 0 && (
              <section className="mt-28 md:mt-36">
                <div className="grid gap-6 lg:grid-cols-12 pb-6 border-b border-line mb-10">
                  <p className="label lg:col-span-3">Experiments</p>
                  <div className="lg:col-span-9">
                    <h2 className="display text-[clamp(2.4rem,5vw,5rem)]">
                      <Line>UI <span className="serif-italic">animations</span></Line>
                    </h2>
                    <p className="mt-4 text-ink-muted max-w-[52ch]">
                      Short pieces I made to practise and try out new ideas.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                  {shortUiAnimations.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} previewOnly />
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <Reveal className="mt-28 md:mt-36 border-t border-line pt-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <h3 className="display text-[clamp(2.4rem,6vw,6rem)]">
                Like what <span className="serif-italic">you see?</span>
              </h3>
              <div className="flex flex-col items-start md:items-end gap-4">
                <p className="text-ink-muted">Tell me what you&apos;re working on.</p>
                <Link href="/book-project" className="btn-pill">
                  Book a project <Arrow />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  )
}
