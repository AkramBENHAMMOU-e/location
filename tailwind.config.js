/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gold-gradient': 'linear-gradient(45deg, #d4af37 0%, #b8860b 50%, #8b6914 100%)',
        'dark-gradient': 'linear-gradient(45deg, #1a1a1a 0%, #2d2d2d 100%)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}

