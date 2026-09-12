/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0512',
        midnight: '#120a24',
        plum: '#1e1036',
        gold: '#f5c76a',
        rose: '#ff8fab',
        lilac: '#a78bfa',
        cream: '#f8f1e4',
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        seal: '0 0 40px rgba(255,143,171,0.55), inset 0 2px 6px rgba(255,255,255,0.35)',
        paper: '0 30px 80px -20px rgba(0,0,0,0.75)',
      },
    },
  },
  plugins: [],
};