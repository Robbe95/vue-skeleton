export default defineNuxtConfig({
  rootDir: 'src',
  css: ['~/assets/styles/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
    {
      path: '~/modules',
      pathPrefix: false,
    },
  ],
  modules: [
    '@pinia/nuxt',
    '@nuxt/devtools',
  ],
})
