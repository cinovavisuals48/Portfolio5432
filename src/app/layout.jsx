// ─────────────────────────────────────────────────────────────
// ROOT LAYOUT — src/app/layout.jsx
// Edit the metadata below to update SEO title, description, etc.
// ─────────────────────────────────────────────────────────────

import './globals.css'
import { Archivo, Inter_Tight, JetBrains_Mono, Instrument_Serif } from 'next/font/google'
import Navbar from '../components/Navbar'
import { BookingProvider } from '../context/BookingContext'
import CustomCursor from '../components/CustomCursor'
import PageTransition from '../components/PageTransition'

// ── FONTS ─────────────────────────────────────────────────────
const display = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-display', display: 'swap' })
const body = Inter_Tight({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' })
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' })

export const viewport = {
  themeColor: '#141413',
}

// ── SEO METADATA — edit these values ──────────────────────────
export const metadata = {
  title: 'Moulidoesmotion — SaaS Motion Design',
  description:
    'Premium SaaS motion design, UI animation, and product explainer videos for indie hackers and bootstrapped founders. Based in India, working globally.',
  keywords: [
    'motion design',
    'SaaS explainer video',
    'UI animation',
    'product demo',
    'Moulidoesmotion',
  ],
  metadataBase: new URL('https://moulidoesmotion.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Moulidoesmotion — SaaS Motion Design',
    description:
      'Premium SaaS motion design and product explainer videos.',
    url: 'https://moulidoesmotion.com',
    siteName: 'Moulidoesmotion',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moulidoesmotion — SaaS Motion Design',
    description: 'Premium SaaS motion design & product explainers.',
    creator: '@moulidoesmotion',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  other: {
    'msapplication-TileImage': '/mstile-150x150.png',
    'theme-color': '#141413',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} ${serif.variable}`}>
      <body className="bg-bg-primary text-ink-primary font-body antialiased overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-accent-ink focus:px-4 focus:py-2 focus:rounded-full"
        >
          Skip to content
        </a>
        <BookingProvider>
          <CustomCursor />
          <Navbar />
          {children}
          <PageTransition />
        </BookingProvider>
      </body>
    </html>
  )
}
