/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        main: '0px 10px 20px rgba(0, 0, 0, 0.05)',
      },
      colors: {
        danger: {
          500: '#ff0000',
        },
        success: {
          500: '#00ff00',
        },
        primary: {
          500: '#0000ff',
        },
        secondary: {
          500: '#ff00ff',
        },
      },
    },
  },
  plugins: [],
}
