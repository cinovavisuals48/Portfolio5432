'use client'

// ─────────────────────────────────────────────────────────────
// FOOTER — src/components/Footer.jsx
// ─────────────────────────────────────────────────────────────

import Link from 'next/link'
import Image from 'next/image'
import { links } from '../data/links'

const footerLinks = [
  { label: 'Work',     href: '/#projects' },
  { label: 'About',    href: '/about' },
  { label: 'Contact',  href: '/#contact' },
  { label: 'Projects', href: '/projects' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <footer className="border-t border-line">
      <div className="container-site py-10 grid gap-8 md:grid-cols-12 md:items-center">
        <Link href="/" className="md:col-span-4 flex items-center gap-2.5">
          <Image src="/images/logo.png" alt="" width={24} height={24} className="rounded-full" />
          <span className="font-medium tracking-tight">Moulidoesmotion</span>
          <span className="label hidden lg:inline ml-2">{links.tagline}</span>
        </Link>

        <nav aria-label="Footer" className="md:col-span-4 flex flex-wrap gap-x-6 gap-y-2 md:justify-center">
          {footerLinks.map((l) => (
            <Link key={l.href} href={l.href} className="label link-underline hover:text-ink-primary">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="md:col-span-4 flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
          <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="label link-underline hover:text-ink-primary">Instagram</a>
          <a href={links.twitter} target="_blank" rel="noopener noreferrer" className="label link-underline hover:text-ink-primary">X / Twitter</a>
          <button type="button" onClick={toTop} className="label link-underline hover:text-ink-primary">Back to top ↑</button>
        </div>
      </div>

      <div className="container-site pb-8 flex flex-col sm:flex-row justify-between gap-2">
        <p className="label text-ink-subtle">&copy; {year} Moulidoesmotion. All rights reserved.</p>
        <p className="label text-ink-subtle">Motion Design for SaaS</p>
      </div>
    </footer>
  )
}
