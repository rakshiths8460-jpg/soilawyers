/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        legal: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#060d1a',
        },
        gold: {
          50: '#fbf9f4',
          100: '#f6f1e6',
          200: '#ece0c9',
          300: '#deca9e',
          400: '#ceb070',
          500: '#b89445',
          600: '#a37b38',
          700: '#835e2e',
          800: '#6c4b2b',
          900: '#5c3f27',
          950: '#352112',
        },
        crimson: {
          600: '#9b1c1c',
          700: '#7f1d1d',
          800: '#5d1515',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
