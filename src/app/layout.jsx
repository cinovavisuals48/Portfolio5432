// ─────────────────────────────────────────────────────────────
// ROOT LAYOUT — src/app/layout.jsx
// Edit the metadata below to update SEO title, description, etc.
// ─────────────────────────────────────────────────────────────

import './globals.css'
import Navbar from '../components/Navbar'

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
    <html lang="en" className="scroll-smooth">
      <body className="bg-bg-primary text-ink-primary font-body antialiased overflow-x-hidden">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
