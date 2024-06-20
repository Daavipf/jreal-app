const flowbite = require("flowbite-react/tailwind")
const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('./assets/img/background-login.jpg')"
      }
    },
    colors: {
      slate: colors.slate,
      white: colors.white,
      'JReal': {
        100: '#8cc8d5',
        200: '#2e5760',
        300: '#2d5761',
        400: '#1f2d25',
        500: '#071119',
      }
    },
    fontFamily: {
      sans: ["Wix Madefor Display", 'sans-serif']
    }
  },
  plugins: [
    flowbite.plugin()
  ],
}

