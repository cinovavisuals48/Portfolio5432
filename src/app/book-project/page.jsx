// ─────────────────────────────────────────────────────────────
// BOOK A PROJECT PAGE — src/app/book-project/page.jsx
// Every "Book a project" button on the site comes here.
// Layout and copy live in src/components/BookProject.jsx.
// ─────────────────────────────────────────────────────────────

import BookProject from '../../components/BookProject'
import Footer from '../../components/Footer'
import SmoothScroll from '../../components/SmoothScroll'

export const metadata = {
  title: 'Book a Project – Moulidoesmotion',
  description: 'Tell me about your project and let\'s create something amazing together.',
  alternates: { canonical: '/book-project' },
}

export default function BookProjectPage() {
  return (
    <SmoothScroll>
      <main id="main" className="relative min-h-screen">
        <BookProject />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
