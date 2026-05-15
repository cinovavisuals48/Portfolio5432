// ─────────────────────────────────────────────────────────────
// ROOT LAYOUT — src/app/layout.jsx
// Edit the metadata below to update SEO title, description, etc.
// ─────────────────────────────────────────────────────────────

import './globals.css'

// ── SEO METADATA — edit these values ──────────────────────────
export const metadata = {
  title: 'Cinova Visuals — SaaS Motion Design',
  description:
    'Premium SaaS motion design, UI animation, and product explainer videos for indie hackers and bootstrapped founders. Based in India, working globally.',
  keywords: [
    'motion design',
    'SaaS explainer video',
    'UI animation',
    'product demo',
    'Cinova Visuals',
  ],
  openGraph: {
    title: 'Cinova Visuals — SaaS Motion Design',
    description:
      'Premium SaaS motion design and product explainer videos.',
    url: 'https://cinova.framer.website',
    siteName: 'Cinova Visuals',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cinova Visuals — SaaS Motion Design',
    description: 'Premium SaaS motion design & product explainers.',
    creator: '@Cinova_visuals',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-bg-primary text-ink-primary font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
