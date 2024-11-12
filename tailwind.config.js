/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom colors for dark mode
        dark: {
          DEFAULT: '#1a1b1e',
          100: '#1a1b1e',
          200: '#2c2e33',
          300: '#3d4147',
          400: '#5c636e',
        },
      },
    },
  },
  plugins: [],
};