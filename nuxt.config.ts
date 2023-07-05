// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxthq/ui', '@vueuse/nuxt'],

  colorMode: {
    preference: 'system',
    dataValue: 'theme',
    classSuffix: '',
  },
  runtimeConfig: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    ACTIVELOOP_TOKEN: process.env.ACTIVELOOP_TOKEN,
  },
  nitro: {
    preset: 'vercel-edge',
  },
})
