'use client'

// ─────────────────────────────────────────────────────────────
// NAVBAR — src/components/Navbar.jsx
// Glassy floating navbar with shrink/expand morphing animation
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { label: 'Work',     href: '/#projects' },
  { label: 'Services', href: '/#services' },
]

// Typing dots animation component (realistic typing indicator)
function TypingDots() {
  return (
    <span className="flex items-center gap-[4px] ml-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-[5px] h-[5px] rounded-full bg-white/70"
          animate={{
            y: [0, -6, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'loop',
            delay: i * 0.25,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      ))}
    </span>
  )
}

// Smooth spring config for morphing
const springConfig = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.8,
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const collapseThreshold = 72
    const expandThreshold = 64
    let ticking = false

    const onScroll = () => {
      const currentScrollY = window.scrollY
      const scrollingDown = currentScrollY > lastScrollY.current

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!scrolled && scrollingDown && currentScrollY > collapseThreshold) {
            setScrolled(true)
          } else if (scrolled && !scrollingDown && currentScrollY < expandThreshold) {
            setScrolled(false)
          }

          lastScrollY.current = currentScrollY
          ticking = false
        })

        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrolled])

  const handleNavClick = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault()
      setMobileOpen(false)
      const target = href.replace('/#', '#')
      const el = document.querySelector(target)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      {/* Navbar Container - Fixed positioning with centering */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            padding: scrolled ? '0.55rem 0.75rem' : '0.75rem 1rem',
            gap: scrolled ? 12 : 24,
          }}
          transition={springConfig}
          className="relative flex items-center backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-full overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Logo - Circular */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <motion.div 
              layout
              layoutId="logo"
              className="relative overflow-hidden rounded-full bg-neutral-900 flex items-center justify-center"
              animate={{
                width: scrolled ? 32 : 36,
                height: scrolled ? 32 : 36,
              }}
              transition={springConfig}
            >
              <Image
                src="/images/cinova-logo.png"
                alt="Cinova Visuals"
                width={36}
                height={36}
                className="object-cover"
              />
            </motion.div>
            <span className="font-display font-semibold text-[0.95rem] tracking-tight text-white">
              Cinova Visuals
            </span>
            {/* Typing dots - only show after collapse */}
            <AnimatePresence>
              {scrolled && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center ml-2"
                >
                  <TypingDots />
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Desktop Links - fade and collapse inside navbar */}
          <motion.div
            initial={false}
            animate={{
              opacity: scrolled ? 0 : 1,
              scaleX: scrolled ? 0.88 : 1,
              x: scrolled ? -6 : 0,
            }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:flex items-center gap-1 overflow-hidden"
            style={{ transformOrigin: '0 50%', pointerEvents: scrolled ? 'none' : 'auto' }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-white/70 hover:text-white transition-colors duration-200 text-sm font-medium px-4 py-2 rounded-full hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>

          {/* Desktop CTA - fade smoothly while collapsing */}
          <motion.div
            className="hidden md:flex items-center"
            initial={false}
            animate={{
              opacity: scrolled ? 0 : 1,
              scale: scrolled ? 0.92 : 1,
              x: scrolled ? -6 : 0,
            }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: '0 50%', pointerEvents: scrolled ? 'none' : 'auto' }}
          >
            <Link
              href="/#contact"
              onClick={(e) => handleNavClick(e, '/#contact')}
              className="
                inline-flex items-center gap-2
                px-5 py-2
                bg-white/10 hover:bg-white/20
                border border-white/20
                rounded-full
                text-sm font-medium text-white
                transition-all duration-200
                backdrop-blur-sm
              "
            >
              Contact
            </Link>
          </motion.div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1 p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-4 h-[1.5px] bg-white rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-4 h-[1.5px] bg-white rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-4 h-[1.5px] bg-white rounded-full"
            />
          </button>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 
                       backdrop-blur-xl bg-white/10
                       border border-white/20
                       rounded-2xl
                       shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                       overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.div 
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-lg font-display font-semibold text-white py-3 px-4
                               rounded-xl hover:bg-white/10
                               flex items-center justify-between transition-colors"
                  >
                    {link.label}
                    <span className="text-white/40 text-sm font-body">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <Link
                  href="/projects"
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-display font-semibold text-white py-3 px-4
                             rounded-xl hover:bg-white/10
                             flex items-center justify-between transition-colors"
                >
                  All Projects
                  <span className="text-white/40 text-sm font-body">04</span>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.05 }}
                className="mt-2"
              >
                <Link
                  href="/#contact"
                  onClick={(e) => handleNavClick(e, '/#contact')}
                  className="
                    w-full inline-flex items-center justify-center gap-2
                    px-5 py-3
                    bg-white text-neutral-900
                    rounded-full
                    text-sm font-semibold
                    transition-all duration-200
                    hover:bg-white/90
                  "
                >
                  Contact
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
