/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─────────────────────────────────────────────
      // COLORS — edit here to change the brand palette
      // Charcoal ground, warm off-white type, one electric-blue accent.
      // ─────────────────────────────────────────────
      colors: {
        bg: {
          primary:   '#141413', // page background (charcoal)
          secondary: '#1A1A18',
          card:      '#1E1E1C', // media placeholders
          elevated:  '#242422',
        },
        ink: {
          primary:   '#EEEAE2', // warm off-white
          secondary: '#D9D4CA',
          muted:     '#9A958C',
          subtle:    '#6B675F',
        },
        line: {
          DEFAULT: 'rgba(238, 234, 226, 0.12)',
          strong:  'rgba(238, 234, 226, 0.24)',
        },
        accent: {
          DEFAULT: '#7C9CFF', // electric blue — use sparingly
          soft:    '#A9BDFF',
          ink:     '#0F1530', // text on accent fills
        },
        // Legacy alias kept so older class names still resolve
        mono: {
          black: '#141413',
          white: '#EEEAE2',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Arial Narrow', 'sans-serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        serif:   ['var(--font-serif)', 'Georgia', 'serif'],
        mono:    ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        site: '1680px',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0,0,0)' },
          to:   { transform: 'translate3d(-50%,0,0)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [],
}
