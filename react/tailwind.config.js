/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          light: '#FAF8F5',
          DEFAULT: '#F9F6F0',
          dark: '#F3EFEA',
        },
        dark: {
          DEFAULT: '#171717',
          mate: '#1A1A1A',
        },
        border: {
          DEFAULT: '#E8E2D9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      }
    },
  },
  plugins: [],
}
