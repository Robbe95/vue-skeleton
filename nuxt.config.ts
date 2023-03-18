export default defineNuxtConfig({
  rootDir: 'src',
  css: ['~/assets/styles/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  imports: {
    presets: [
      'vue',
      'vue-i18n',
      'pinia',

    ],
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

})
