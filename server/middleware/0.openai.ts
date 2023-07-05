import { Configuration, OpenAIApi } from 'openai'

declare module 'h3' {
  interface H3EventContext {
    openai: OpenAI
  }
}

export default eventHandler((event) => {
  const configuration = new Configuration({
    apiKey: useRuntimeConfig().OPENAI_API_KEY,
  })
  let openAIConfig = new OpenAIApi(configuration)

  type OpenAI = typeof openAIConfig

  let openai: OpenAI

  openai = new OpenAIApi(configuration)

  if (!openai) {
    openai = new OpenAIApi(configuration)
  }
  event.context.openai = openai
})
