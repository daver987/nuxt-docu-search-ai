// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxthq/ui', '@vueuse/nuxt', 'nuxt-icon'],

  colorMode: {
    preference: 'system',
    dataValue: 'theme',
    classSuffix: '',
  },
  runtimeConfig: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    ACTIVELOOP_TOKEN: process.env.ACTIVELOOP_TOKEN,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_PRIVATE_KEY: process.env.SUPABASE_PRIVATE_KEY,
    PINECONE_API_KEY: process.env.PINECONE_API_KEY,
    PINECONE_ENVIRONMENT: process.env.PINECONE_ENVIRONMENT,
    PINECONE_INDEX: process.env.PINECONE_INDEX,
  },
  nitro: {
    preset: 'vercel-edge',
  },
})
