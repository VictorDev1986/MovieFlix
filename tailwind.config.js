/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'netflix-red': '#E50914',
        'dark-bg': '#141414',
        'darker-bg': '#0B0B0B',
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}
