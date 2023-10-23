import { LangChainStream, Message } from 'ai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { AIMessage, HumanMessage } from 'langchain/schema'
import { type ExtendedH3Event, sendStreams } from '~/server/utils/sendStream'
import type { H3Event } from 'h3'
import { z, zh } from 'h3-zod'

export const runtime = 'edge'

interface Config {
  OPENAI_API_KEY: string
  OPENAI_FINE_TUNED: string
}

interface SystemMessage {
  role: 'system'
  content: string
  id: string
}

const systemMessage: SystemMessage = {
  role: 'system',
  content:
    "As an AI assistant specializing in Nuxt 3, it's your responsibility to provide comprehensive and insightful responses to queries about this JavaScript framework. When providing code examples, ensure they are strictly aligned with the latest Nuxt 3 syntax, and refrain from using outdated Nuxt 2 syntax. Your responses should be detailed, informative, and aimed at enabling users to understand and effectively apply the knowledge in their projects.",
  id: '123',
}

function getConfig(): Config {
  return {
    OPENAI_API_KEY: useRuntimeConfig().OPENAI_API_KEY,
    OPENAI_FINE_TUNED: useRuntimeConfig().OPENAI_FINE_TUNED,
  }
}

const initLangchain = (apiKey: string, chatModel: string) => {
  return new ChatOpenAI({
    modelName: chatModel,
    openAIApiKey: apiKey,
    streaming: true,
    temperature: 0.2,
  })
}

export default defineEventHandler(async (event: H3Event) => {
  const body = await zh.useValidatedBody(
    //@ts-ignore
    event,
    z.object({
      messages: z.array(
        z.object({
          id: z.string().optional(),
          createdAt: z.string().optional(),
          content: z.string(),
          role: z.enum(['system', 'user', 'assistant', 'function']),
          name: z.string().optional(),
          function_call: z.string().optional(),
        })
      ),
    })
  )

  const config = getConfig()
  const llm = initLangchain(config.OPENAI_API_KEY, config.OPENAI_FINE_TUNED)

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
