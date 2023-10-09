import OpenAI from 'openai'
import { OpenAIStream } from 'ai'
import { ChatCompletionMessageParam } from 'openai/resources/chat'

interface Config {
  OPENAI_API_KEY: string
}

function getConfig(): Config {
  return {
    OPENAI_API_KEY: useRuntimeConfig().OPENAI_API_KEY,
  }
}

const initOpenai = (apiKey: string) => {
  return new OpenAI({
    apiKey: apiKey,
  })
}

export default defineEventHandler(async (event) => {
  const config = getConfig()
  const openai = initOpenai(config.OPENAI_API_KEY)

  // Extract the `prompt` from the body of the request
  const { messages } = (await readBody(event)) as {
    messages: ChatCompletionMessageParam[]
  }

  const response = await openai.chat.completions.create({
    model: 'ft:gpt-3.5-turbo-0613:personal::87mRjTyU',
    stream: true,
    messages: messages.map((message) => ({
      content: message.content,
      role: message.role,
    })),
    temperature: 0.3,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })
  // Convert the response into a friendly text-stream
  return OpenAIStream(response)
})
