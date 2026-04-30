/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#eef5ef',
          100: '#cde3d1',
          200: '#9ec9a6',
          300: '#6aa877',
          400: '#428451',
          500: '#276133',
          600: '#1a4a25',
          700: '#103318',
          800: '#0a200f',
          900: '#061209',
          950: '#030904',
        },
        gold: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      fontFamily: {
        sans:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'gold':      '0 0 20px rgba(245,158,11,0.2)',
        'gold-lg':   '0 0 40px rgba(245,158,11,0.35)',
        'card':      '0 4px 24px rgba(3,9,4,0.55)',
        'card-hover':'0 12px 40px rgba(3,9,4,0.75)',
      },
      animation: {
        'fade-in':    'fadeIn 0.6s ease-out forwards',
        'slide-up':   'slideUp 0.7s ease-out forwards',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:   { from: { opacity: '0', transform: 'translateY(28px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        pulseGold: { '0%,100%': { opacity: '0.15' }, '50%': { opacity: '0.3' } },
      },
    },
  },
  plugins: [],
};
