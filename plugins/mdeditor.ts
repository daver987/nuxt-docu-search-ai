import { MdEditor } from 'md-editor-v3'

export default defineNuxtPlugin((nuxtApp: any) => {
  nuxtApp.vueApp.use(MdEditor)
})
