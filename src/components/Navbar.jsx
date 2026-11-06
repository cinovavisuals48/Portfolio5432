'use client'

// ─────────────────────────────────────────────────────────────
// NAVBAR — src/components/Navbar.jsx
// Minimal top bar: brand left, local time centre, links + CTA right.
// Hides on scroll down, returns on scroll up. Full-screen menu on mobile.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { links } from '../data/links'
import { EASE } from './Reveal'

const navLinks = [
  { label: 'Work',  href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'FAQ',   href: '/#faq' },
]

function useIndiaTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata',
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 15000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function Navbar() {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const time = useIndiaTime()
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastY.current
      setSolid(y > 24)
      if (Math.abs(delta) > 6) {
        setHidden(y > 160 && delta > 0)
        lastY.current = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isActive = (href) =>
    href === '/projects' ? pathname.startsWith('/projects') : href === pathname

  // Navigation itself (and the transition) is handled by PageTransition.
  const handleNavClick = () => setMobileOpen(false)

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: hidden && !mobileOpen ? '-100%' : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
          solid || mobileOpen ? 'bg-bg-primary/90 border-b border-line' : 'bg-transparent border-b border-transparent'
        }`}
      >
        <nav className="container-site h-16 md:h-[4.5rem] grid grid-cols-[1fr_auto] md:grid-cols-3 items-center" aria-label="Main">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 justify-self-start" onClick={() => setMobileOpen(false)}>
            <Image src="/images/logo.png" alt="" width={28} height={28} className="rounded-full" priority />
            <span className="font-body font-semibold text-[0.95rem] tracking-tight">Moulidoesmotion</span>
          </Link>

          {/* Location + time */}
          <p className="label hidden md:block justify-self-center" aria-label={`India, local time ${time}`}>
            India <span className="mx-2 text-ink-subtle">/</span> {time || '--:--'} IST
          </p>

          {/* Links */}
          <div className="justify-self-end flex items-center gap-6">
            <ul className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={handleNavClick}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={`label link-underline inline-flex items-center gap-2 hover:text-ink-primary transition-colors ${
                      isActive(link.href) ? 'text-ink-primary' : ''
                    }`}
                  >
                    {isActive(link.href) && <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden />}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/book-project" className="btn-pill hidden md:inline-flex !py-2.5">
              Book a project
            </Link>

            <button
              type="button"
              className="md:hidden label text-ink-primary py-2"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg-primary pt-24 pb-8 md:hidden flex flex-col"
          >
            <ul className="container-site flex-1">
              {[...navLinks, { label: 'Contact', href: '/#contact' }].map((link, i) => (
                <li key={link.href} className="border-b border-line overflow-hidden">
                  <motion.div
                    initial={reduce ? { opacity: 0 } : { y: '100%' }}
                    animate={reduce ? { opacity: 1 } : { y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.05 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={handleNavClick}
                      className="flex items-baseline justify-between py-4"
                    >
                      <span className="display text-[3.4rem]">{link.label}</span>
                      <span className="label">0{i + 1}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <div className="container-site flex items-center justify-between gap-4">
              <Link
                href="/book-project"
                onClick={() => setMobileOpen(false)}
                className="btn-pill"
              >
                Book a project
              </Link>
              <div className="flex gap-4">
                <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="label">Instagram</a>
                <a href={links.twitter} target="_blank" rel="noopener noreferrer" className="label">X</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
