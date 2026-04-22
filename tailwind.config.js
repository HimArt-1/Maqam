/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2f8f4',
          100: '#e1efe4',
          200: '#c5dfcd',
          300: '#9bc8a9',
          400: '#6ca980',
          500: '#468b5d',
          600: '#346d46',
          700: '#2b573a',
          800: '#244530',
          900: '#1b3626', // Logo Green
          950: '#0e1e15',
        },
        secondary: {
          50: '#fbf8f3',
          100: '#f5efe4',
          200: '#e7d8bd',
          300: '#d5bb8f',
          400: '#c29d61',
          500: '#b08237',
          600: '#a16c2c',
          700: '#865426', // Logo Bronze/Gold
          800: '#6f4423',
          900: '#5a381f',
          950: '#321c0f',
        }
      },
      fontFamily: {
        sans: ['Tajawal', 'sans-serif'],
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(8%, -6%) scale(1.04)' },
          '66%': { transform: 'translate(-6%, 4%) scale(0.98)' },
        },
      },
      animation: {
        blob: 'blob 8s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
