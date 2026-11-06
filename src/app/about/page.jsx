// ─────────────────────────────────────────────────────────────
// ABOUT PAGE — src/app/about/page.jsx
// Giant title + logo card on the left, bio on the right.
// Edit the text in INTRO and PARAGRAPHS below.
// ─────────────────────────────────────────────────────────────

import Image from 'next/image'
import SmoothScroll from '../../components/SmoothScroll'
import Footer from '../../components/Footer'
import { SplitText, Reveal } from '../../components/Reveal'

export const metadata = {
  title: 'About — Moulidoesmotion',
  description: 'Mouli is a motion designer focused on product motion and visual storytelling.',
  alternates: { canonical: '/about' },
}

const INTRO = "Hi, I'm Mouli. I'm a motion designer focused on product motion and visual storytelling."

const PARAGRAPHS = [
  'I work with startups and product teams to bring digital products to life through motion. From UI animations and interactions to feature showcases and product launches, I help make products feel more engaging and easier to understand.',
  'Most of my work is about finding interesting ways to show how a product works and what makes it special. Sometimes I build a visual story around a product from scratch. Other times, I take an existing idea and turn it into a complete visual experience. This usually involves designing interfaces, animating UI elements, creating transitions and exploring different ways to present product features.',
  "I enjoy the space where design, animation and storytelling come together. I believe good motion is not just about making things look pretty. It's about making products easier to understand, keeping people interested and creating experiences that feel good to watch.",
]

export default function AboutPage() {
  return (
    <SmoothScroll>
      <main id="main" className="relative">
        <section className="pt-24 md:pt-28 pb-20 md:pb-32">
          <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: title + card */}
            <div>
              <h1 className="display text-[clamp(4.5rem,15vw,15rem)]">
                <SplitText delay={0.05}>About</SplitText>
              </h1>
              <Reveal delay={0.25} className="mt-6 md:mt-10">
                <div className="relative aspect-[4/3] rounded-2xl border border-line-strong bg-black overflow-hidden flex items-center justify-center">
                  <Image
                    src="/images/logo.png"
                    alt="Moulidoesmotion logo"
                    width={320}
                    height={320}
                    priority
                    className="w-[38%] h-auto mix-blend-lighten"
                  />
                </div>
              </Reveal>
            </div>

            {/* Right: bio */}
            <div className="lg:self-end lg:pb-4">
              <Reveal delay={0.35}>
                <p className="text-[clamp(1.6rem,2.6vw,2.6rem)] leading-[1.15] tracking-[-0.02em] font-medium">
                  {INTRO}
                </p>
              </Reveal>
              <div className="mt-8 md:mt-10 space-y-6 text-[clamp(1rem,1.2vw,1.2rem)] leading-[1.6] text-ink-secondary max-w-[60ch]">
                {PARAGRAPHS.map((text, i) => (
                  <Reveal key={i} delay={0.45 + i * 0.08}>
                    <p>{text}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </SmoothScroll>
  )
}
