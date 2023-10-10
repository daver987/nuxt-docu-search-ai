import { LangChainStream, Message } from 'ai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { AIMessage, HumanMessage } from 'langchain/schema'
import { sendStreams } from '~/server/utils/sendStream'
import { H3Event } from 'h3'
import { z, zh } from 'h3-zod'

export const runtime = 'edge'

interface Config {
  OPENAI_API_KEY: string
}

interface SystemMessage {
  role: 'system'
  content: string
  id: string
}

function getConfig(): Config {
  return {
    OPENAI_API_KEY: useRuntimeConfig().OPENAI_API_KEY,
  }
}

const initLangchain = (apiKey: string) => {
  return new ChatOpenAI({
    modelName: 'ft:gpt-3.5-turbo-0613:personal::87mRjTyU',
    openAIApiKey: apiKey,
    streaming: true,
    temperature: 0.3,
  })
}

const systemMessage: SystemMessage = {
  role: 'system',
  content:
    'You are a helpful assistant who is an expert in Nuxt 3. Make sure your answers are detailed and helpful.',
  id: '123',
}

export default defineEventHandler(async (event: H3Event) => {
  const body = await zh.useValidatedBody(
    event,
    z.object({
      messages: z.array(
        z.object({
          id: z.string(),
          createdAt: z.date().optional(),
          content: z.string(),
          role: z.enum(['system', 'user', 'assistant', 'function']),
          name: z.string().optional(),
          function_call: z.string().optional(),
        })
      ),
    })
  )
  const config = getConfig()
  const llm = initLangchain(config.OPENAI_API_KEY)

  const { messages } = body
  messages.push(systemMessage)

  console.log('Message:', messages)

  const { stream, handlers } = LangChainStream()

  llm
    .call(
      (messages as Message[]).map((message) =>
        message.role === 'user'
          ? new HumanMessage(message.content)
          : new AIMessage(message.content)
      ),
      {},
      [handlers]
    )
    // eslint-disable-next-line no-console
    .catch(console.error)

  return sendStreams(event as ExtendedH3Event, stream)
})
