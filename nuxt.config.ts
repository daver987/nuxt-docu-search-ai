// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxthq/ui', '@vueuse/nuxt', 'nuxt-icon'],
  build: {
    transpile: [
      'marked',
      'marked-highlight',
      'marked-mangle',
      'marked-gfm-heading-id',
    ],
  },

  colorMode: {
    preference: 'system',
    dataValue: 'theme',
    classSuffix: '',
  },
  css: [
    'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css',
    '~/assets/main.css',
  ],
  runtimeConfig: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    PINECONE_API_KEY: process.env.PINECONE_API_KEY,
    PINECONE_ENVIRONMENT: process.env.PINECONE_ENVIRONMENT,
    PINECONE_INDEX: process.env.PINECONE_INDEX,
  },
  nitro: {
    preset: 'vercel-edge',
  },
})
