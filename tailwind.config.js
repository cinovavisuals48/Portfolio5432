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
      // ─────────────────────────────────────────────
      colors: {
        bg: {
          primary:   '#070708',
          secondary: '#0E0E10',
          card:      '#111114',
        },
        accent: {
          blue:   '#5B8EF0',
          violet: '#9B7AF5',
          glow:   '#3D6FE0',
        },
        brand: {
          DEFAULT: '#5B8EF0',
        },
        ink: {
          primary: '#F2F1EE',
          muted:   '#7A7A8A',
          subtle:  '#3E3E4A',
        },
      },
      // ─────────────────────────────────────────────
      // FONTS — defined in globals.css via Google Fonts
      // ─────────────────────────────────────────────
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['Plus Jakarta Sans', 'sans-serif'],
      },
      // ─────────────────────────────────────────────
      // SPACING & SIZING
      // ─────────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      fontSize: {
        '10xl': ['10rem',  { lineHeight: '1' }],
        '9xl':  ['8rem',   { lineHeight: '1' }],
        '8xl':  ['6.5rem', { lineHeight: '1' }],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
