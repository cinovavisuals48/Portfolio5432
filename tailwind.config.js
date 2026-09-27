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
        mono: {
          black: '#000000',
          900:   '#0D0D0D',
          800:   '#1A1A1A',
          700:   '#2E2E2E',
          600:   '#4D4D4D',
          500:   '#737373',
          400:   '#A3A3A3',
          300:   '#D4D4D4',
          200:   '#E8E8E8',
          100:   '#F5F5F5',
          white: '#FFFFFF',
        },
        bg: {
          primary:   '#000000',
          secondary: '#0D0D0D',
          card:      '#141414',
          elevated:  '#1A1A1A',
        },
        accent: {
          DEFAULT: '#FFFFFF',
          soft:    '#D4D4D4',
          muted:   '#A3A3A3',
          glow:    'rgba(255, 255, 255, 0.12)',
          // Legacy aliases mapped to monochrome to prevent any accidental color leak
          blue:    '#FFFFFF',
          violet:  '#E8E8E8',
        },
        brand: {
          DEFAULT: '#FFFFFF',
        },
        ink: {
          primary:   '#FFFFFF',
          secondary: '#E8E8E8',
          muted:     '#A3A3A3',
          subtle:    '#737373',
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
