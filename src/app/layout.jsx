// ─────────────────────────────────────────────────────────────
// ROOT LAYOUT — src/app/layout.jsx
// Edit the metadata below to update SEO title, description, etc.
// ─────────────────────────────────────────────────────────────

import './globals.css'
import Navbar from '../components/Navbar'
import { BookingProvider } from '../context/BookingContext'
import BookingModal from '../components/BookingModal'
import CursorGlow from '../components/CursorGlow'
import CustomCursor from '../components/CustomCursor'

export const viewport = {
  themeColor: '#000000',
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
    'theme-color': '#000000',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" style={{ cursor: 'none' }}>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body, :root, #__next, *, *::before, *::after {
                cursor: none !important;
                cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=') 0 0, none !important;
                cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='none'/%3E%3C/svg%3E") 0 0, none !important;
              }
            `,
          }}
        />
      </head>
      <body className="bg-bg-primary text-ink-primary font-body antialiased overflow-x-hidden" style={{ cursor: 'none' }}>
        <BookingProvider>
          <CursorGlow />
          <CustomCursor />
          <Navbar />
          {children}
          <BookingModal />
        </BookingProvider>
      </body>
    </html>
  )
}
