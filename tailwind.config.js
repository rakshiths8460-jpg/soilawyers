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
        institutional: {
          950: '#060911',
          900: '#0b101f',
          850: '#10172c',
          800: '#151e38',
          700: '#1f2d52',
          600: '#2d3f6f',
        },
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
          950: '#060911',
        },
        bronze: {
          50: '#faf8f5',
          100: '#f3efe6',
          200: '#e6dcce',
          300: '#d5c4ad',
          400: '#c5a880',
          500: '#b89458',
          600: '#a37b38',
          700: '#835e2e',
          800: '#6c4b2b',
          900: '#4d341c',
        },
        gold: {
          50: '#faf8f4',
          100: '#f4ede1',
          200: '#e7d8be',
          300: '#d7be95',
          400: '#c5a880',
          500: '#b89445',
          600: '#9e7930',
          700: '#7e5c24',
          800: '#674a22',
          900: '#553c1f',
          950: '#2f1e0d',
        },
        paper: {
          50: '#fdfcf9',
          100: '#fbf9f4',
          200: '#f4efe5',
          300: '#e8dfcd',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        'widest-editorial': '0.22em',
      },
      boxShadow: {
        editorial: '0 24px 48px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.06)',
        seal: '0 0 50px -10px rgba(197, 168, 128, 0.18)',
      },
    },
  },
  plugins: [],
};
