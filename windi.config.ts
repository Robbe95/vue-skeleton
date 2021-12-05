import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'class',
  // https://windicss.org/posts/v30.html#attributify-mode
  attributify: true,
  theme: {
    extend: {
      outline: {
        primary: '2px solid #FEA81E',
      },
      animation: ['hover', 'group-hover'],
      boxShadow: {
      },
      colors: {
        primary: '#FEA81E',
      },

    },
  },
  shortcuts: {
    'btn': 'py-2 px-4 font-semibold rounded-xl shadow-md cursor-pointer',
    'btn-primary': 'text-white bg-primary hover:bg-opacity-30 border-2 border-transparent',
    'btn-secondary': 'text-black border-primary border-2 hover:bg-opacity-30 bg-white',
    'tag': 'bg-primary bg-opacity-30 rounded-full px-4 py-1 max-w-max text-primary',
  },
})
