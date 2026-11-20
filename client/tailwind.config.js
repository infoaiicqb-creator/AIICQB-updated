/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aicqb: {
          navy: '#10264B',
          'navy-dark': '#0B1B36',
          'navy-light': '#1E3A6E',
          orange: '#F47716',
          'orange-hover': '#DC660E',
          'orange-light': '#FFF4EC',
          bg: '#F7F9FC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#64748B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

