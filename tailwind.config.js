/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./app/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          montserrat: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }