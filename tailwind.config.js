/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./pages/**/*.html", "./test/**/*.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'soap-pink': {
          50: '#F7F7F7',  // Soft white/very light grey
          100: '#F7A9C8', // Light bubble pink
          500: '#E7499A', // Main bright pink
          600: '#C21875', // Deep magenta/purple-pink
          700: '#234A8C', // Dark blue (used in labels/strips)
        }
      }
    },
  },
  plugins: [],
}

