// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-icon',
    '@formkit/auto-animate/nuxt',
    '@nuxt/image',
    '@nuxtjs/seo',
    'nuxt-shiki',
  ],
  app: {
    pageTransition: {
      name: 'side-fade',
      mode: 'out-in',
    },
  },
  tailwindcss: {
    viewer: false,
  },

  colorMode: {
    preference: 'dark',
    dataValue: 'theme',
    classSuffix: '',
  },

  site: {
    url: 'https://nuxtdocusearchai.com',
    name: 'NuxtDocuSearchAi',
    description:
      'Experience the power of AI in searching the Nuxt 3 documentation with NuxtDocuSearchAi. Discover content faster and more efficiently.',
    defaultLocale: 'en',
    identity: {
      type: 'Person',
    },
    twitter: '@davidalexr987',
    trailingSlash: true,
    titleSeparator: '|',
  },

  runtimeConfig: {
    NUXT_OPENAI_FINE_TUNED: process.env.NUXT_OPENAI_FINE_TUNED,
    NUXT_OPENAI_API_KEY: process.env.NUXT_OPENAI_API_KEY,
    LANGCHAIN_TRACING_V2: process.env.LANGCHAIN_TRACING_V2,
    LANGCHAIN_ENDPOINT: process.env.LANGCHAIN_ENDPOINT,
    LANGCHAIN_API_KEY: process.env.LANGCHAIN_API_KEY,
    LANGCHAIN_PROJECT: process.env.LANGCHAIN_PROJECT,
  },

  nitro: {
    awsAmplify: {
      catchAllStaticFallback: true,
    },
    experimental: {
      websocket: true,
    },
  },
  future: {
    typescriptBundlerResolution: true,
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
})
