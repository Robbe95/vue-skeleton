export default defineNuxtConfig({
  rootDir: 'src',
  css: ['~/assets/styles/tailwind.css'],
  runtimeConfig: {
    public: {
      apiUrl: '',
    },
  },
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
    '@nuxtjs/tailwindcss',
  ],
  tailwindcss: {
    cssPath: '~/assets/styles/tailwind.css',
    configPath: '../tailwind.config',
  },

})
