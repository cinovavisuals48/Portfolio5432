from pathlib import Path

content = '''use client

// ─────────────────────────────────────────────────────────────
// PROJECTS SECTION — src/components/Projects.jsx
// Shows first 3 featured projects with link to all projects
// ─────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'
import { featuredProjects } from '../data/projects'
import ProjectCard from './ProjectCard'
import Link from 'next/link'

export default function Projects() {
  return (
    <section id="projects" className="section-py relative overflow-hidden projects-gradient">

      {/* Background blue glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[1000px] h-[800px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(ellipse, #3b82f6 0%, transparent 60%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-accent-blue text-sm font-display font-600 tracking-[0.1em] uppercase mb-3">
            Selected Work
          </p>
          <h2 className="font-display font-800 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1] tracking-tight text-ink-primary">
            Recent Projects
          </h2>
        </motion.div>

        {/* Project Grid - 3 featured */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              forcePreview
            />
          ))}
        </div>

        {/* Show All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/projects"
            className="btn-ghost group"
          >
            Show All Projects
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                 className="transition-transform group-hover:translate-x-1">
              <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor"
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
'''
Path('src/components/Projects.jsx').write_text(content, encoding='utf-8')
print('Written Projects.jsx')
