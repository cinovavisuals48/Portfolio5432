import ProjectForm from '../../components/ProjectForm'
import Footer from '../../components/Footer'
import SmoothScroll from '../../components/SmoothScroll'
import Link from 'next/link'

export const metadata = {
  title: 'Book a Project – Moulidoesmotion',
  description: 'Tell me about your project and let\'s create something amazing together.',
}

export default function BookProject() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen">

        {/* Ambient background glows */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-[0.05] bg-radial from-white to-transparent blur-3xl" />
        </div>

        <section className="pt-32 pb-24 px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-8 text-center">
              <Link
                href="/"
                className="btn-back mb-6 inline-flex text-xs uppercase tracking-wider text-neutral-400 hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M11.5 7H2.5M6.5 3L2.5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to Home
              </Link>
              <h1 className="font-display font-800 text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.05] tracking-tight text-white mb-2">
                Let&apos;s build your <span className="text-gradient-mono">motion story.</span>
              </h1>
              <p className="text-ink-muted text-sm sm:text-base max-w-lg mx-auto">
                Step-by-step brief. Takes under 2 minutes and I&apos;ll get back to you within 24 hours.
              </p>
            </div>

            {/* React Bits Stepper Form */}
            <div className="w-full">
              <ProjectForm />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  )
}
