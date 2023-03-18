export default defineNuxtConfig({
  rootDir: 'src',
  css: ['~/assets/styles/tailwind.css'],
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: '123',
    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase: process.env.API_BASE || 'default_api_url',
      otherUrl: process.env.OTHER_URL || 'default_other_url',
      apiBaseUrl: 'https://maes.puntoo.com/platform/APIREST/V2',
      googleApiKey: 'AIzaSyATX2fY3BZwaKeURsQhwpEVLmLRr27s4vw',
      authClientId: 'clientidweb',
      authClientSecret: 'xkedv6THjwLTlWhp9izKEj26KeQTdnSGp28n7FPu',
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
  ],
})
