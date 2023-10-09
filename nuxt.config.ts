// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-icon',
    '@formkit/auto-animate/nuxt',
  ],

  app: {
    pageTransition: {
      name: 'side-fade',
      mode: 'out-in',
    },
  },

  ui: {
    global: true,
  },

  colorMode: {
    preference: 'system',
    dataValue: 'theme',
    classSuffix: '',
  },

  build: {
    transpile: ['@headlessui/vue'],
  },

  css: ['md-editor-v3/lib/style.css', 'md-editor-v3/lib/preview.css'],

  runtimeConfig: {
    OPENAI_FINE_TUNED: process.env.OPENAI_FINE_TUNED,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    PINECONE_API_KEY: process.env.PINECONE_API_KEY,
    PINECONE_ENVIRONMENT: process.env.PINECONE_ENVIRONMENT,
    PINECONE_INDEX: process.env.PINECONE_INDEX,
    LANGCHAIN_TRACING_V2: process.env.LANGCHAIN_TRACING_V2,
    LANGCHAIN_ENDPOINT: process.env.LANGCHAIN_ENDPOINT,
    LANGCHAIN_API_KEY: process.env.LANGCHAIN_API_KEY,
    LANGCHAIN_PROJECT: process.env.LANGCHAIN_PROJECT,
  },

  nitro: {
    preset: process.env.NITRO_PRESET,
  },

  devtools: {
    enabled: false,
  },
})
