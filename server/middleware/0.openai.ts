import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: useRuntimeConfig().OPENAI_API_KEY,
})
let openAIConfig = new OpenAIApi(configuration)

type OpenAI = typeof openAIConfig

let openai: OpenAI

declare module 'h3' {
  interface H3EventContext {
    openai: OpenAI
  }
}
openai = new OpenAIApi(configuration)

export default eventHandler((event) => {
  if (!openai) {
    openai = new OpenAIApi(configuration)
  }
  event.context.openai = openai
})
