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
        keyframes: {
          'float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
          },
          'float-slow': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          'float-fast': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-30px)' },
          },
        },
        animation: {
          'float': 'float 8s ease-in-out infinite',
          'float-slow': 'float-slow 12s ease-in-out infinite',
          'float-fast': 'float-fast 6s ease-in-out infinite',
        },
      },
    },
    plugins: [],
  }