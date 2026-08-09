import ProjectForm from '../../components/ProjectForm'
import Footer from '../../components/Footer'
import CursorGlow from '../../components/CursorGlow'
import CustomCursor from '../../components/CustomCursor'
import SmoothScroll from '../../components/SmoothScroll'

export const metadata = {
  title: 'Book a Project – Cinova Visuals',
  description: 'Tell me about your project and let\'s create something amazing together.',
}

export default function BookProject() {
  return (
    <SmoothScroll>
      <main className="relative">
        <CursorGlow />
        <CustomCursor />

        <section className="section-py relative overflow-hidden">
          <div className="max-w-2xl mx-auto px-6 relative z-10">
            <ProjectForm />
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  )
}
