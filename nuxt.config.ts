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

  build: {
    transpile: ['openai-edge'],
  },

  ui: {
    global: true,
  },

  colorMode: {
    preference: 'dark',
    dataValue: 'theme',
    classSuffix: '',
  },

  css: ['md-editor-v3/lib/style.css', 'md-editor-v3/lib/preview.css'],

  runtimeConfig: {
    OPENAI_FINE_TUNED: process.env.OPENAI_FINE_TUNED,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    LANGCHAIN_TRACING_V2: process.env.LANGCHAIN_TRACING_V2,
    LANGCHAIN_ENDPOINT: process.env.LANGCHAIN_ENDPOINT,
    LANGCHAIN_API_KEY: process.env.LANGCHAIN_API_KEY,
    LANGCHAIN_PROJECT: process.env.LANGCHAIN_PROJECT,
  },

  nitro: {
    preset: process.env.NITRO_PRESET,
  },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
})
