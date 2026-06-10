'use client'

// ─────────────────────────────────────────────────────────────
// NAVBAR — src/components/Navbar.jsx
// Glassy floating navbar with shrink/expand morphing animation
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Work',     href: '/#projects' },
  { label: 'About',    href: '/#about' },
  { label: 'FAQ',      href: '/#faq' },
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
            y: [0, -5, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatType: 'loop',
            delay: i * 0.2,
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
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY
      
      // Shrink when scrolling down past threshold
      // Expand when scrolling up even 1 pixel
      if (currentScrollY > 60 && currentScrollY > lastScrollY.current) {
        setScrolled(true)
      } else if (currentScrollY < lastScrollY.current) {
        setScrolled(false)
      }
      
      lastScrollY.current = currentScrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault()
      setMobileOpen(false)
      const sectionId = href.replace('/#', '')
      
      // Navigate to home page first if not already there
      if (pathname !== '/' && pathname !== '') {
        router.push('/')
        // After navigation, wait and scroll to section
        setTimeout(() => {
          const el = document.querySelector(`#${sectionId}`)
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 300)
      } else {
        // Already on home page, just scroll to the section
        const el = document.querySelector(`#${sectionId}`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
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
          }}
          transition={springConfig}
          layout
          layoutId="navbar"
          className={`
            relative flex items-center
            backdrop-blur-xl
            border border-white/20
            shadow-[0_8px_32px_rgba(0,0,0,0.3)]
            ${scrolled 
              ? 'px-3 py-2 rounded-full gap-3' 
              : 'px-4 py-2.5 rounded-full gap-6'
            }
          `}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Logo - Circular */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0" onClick={() => setMobileOpen(false)}>
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
            {/* Typing dots - only show when scrolled/collapsed */}
            {scrolled && <TypingDots />}
          </Link>

          {/* Desktop Links - Hidden when scrolled */}
          <AnimatePresence mode="popLayout">
            {!scrolled && (
              <motion.div
                key="nav-links"
                initial={{ opacity: 0, scale: 0.9, width: 0 }}
                animate={{ opacity: 1, scale: 1, width: 'auto' }}
                exit={{ opacity: 0, scale: 0.9, width: 0 }}
                transition={springConfig}
                className="hidden md:flex items-center gap-1 overflow-hidden"
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
            )}
          </AnimatePresence>

          {/* Desktop CTA / Three dots when scrolled */}
          <div className="hidden md:flex items-center">
            <AnimatePresence mode="popLayout">
              {scrolled ? (
                <motion.div 
                  key="spacer" 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="w-2" 
                />
              ) : (
                <motion.div
                  key="book"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={springConfig}
                >
                  <Link
                    href="/book-project"
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
                    Book a Project
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
                  href="/book-project"
                  onClick={() => setMobileOpen(false)}
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
                  Book a Project
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
