/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#EDE8DC',
          100: '#D8D0BF',
          200: '#B0A48A',
          300: '#887860',
          400: '#5E5040',
          500: '#3C3228',
          600: '#252018',
          700: '#181410',
          800: '#0F0C0A',
          900: '#090D1C',
          950: '#040810',
        },
        gold: {
          50:  '#FBF6EC',
          100: '#F5EAD0',
          200: '#EAD4A0',
          300: '#DDB96C',
          400: '#CFA04A',
          500: '#C4903A',
          600: '#A8762E',
          700: '#8A5D22',
          800: '#6C4618',
          900: '#4E3010',
        },
      },
      fontFamily: {
        sans:    ['"DM Sans"',  'system-ui', 'sans-serif'],
        display: ['Outfit',     'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold':       '0 0 0 1px rgba(196,144,58,0.15)',
        'card':       '0 2px 8px rgba(0,0,0,0.35), 0 8px 32px rgba(0,0,0,0.25)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.4), 0 16px 48px rgba(0,0,0,0.3)',
        'panel':      '0 24px 64px rgba(0,0,0,0.5)',
      },
      animation: {
        'fade-in':  'fadeIn 0.7s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' },                               to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(32px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};
