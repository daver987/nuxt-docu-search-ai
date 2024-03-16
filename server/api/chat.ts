import { ChatOpenAI } from '@langchain/openai'
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import type { EventHandlerRequest, H3Event } from 'h3'
import { defineEventHandler, sendStream } from 'h3'
import { z } from 'zod'

const chatSchema = z.object({
  messages: z.array(
    z.object({
      id: z.string().optional(),
      createdAt: z.string().optional(),
      content: z.string(),
      role: z.enum(['system', 'user', 'assistant', 'function']).optional(),
    })
  ),
})

interface Config {
  NUXT_OPENAI_API_KEY: string
  NUXT_OPENAI_FINE_TUNED: string
}

const prompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    "As an AI assistant specializing in Nuxt 3, it's your responsibility to provide comprehensive and insightful responses to queries about this JavaScript framework. When providing code examples, Always use TYPESCRIPT, and the Vue 3 script setup and composition api syntax. Ensure they are strictly aligned with the latest Nuxt 3 syntax, and refrain from using outdated Nuxt 2 syntax. Your responses should be detailed, informative, and aimed at enabling users to understand and effectively apply the knowledge in their projects.",
  ],
  new MessagesPlaceholder('chat_history'),
  ['user', '{input}'],
])

function getConfig(event: H3Event): Config {
  return {
    NUXT_OPENAI_API_KEY: useRuntimeConfig(event).NUXT_OPENAI_API_KEY,
    NUXT_OPENAI_FINE_TUNED: useRuntimeConfig(event).NUXT_OPENAI_FINE_TUNED,
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

const initOutputParser = () => {
  return new StringOutputParser()
}

export default defineEventHandler(
  async (event: H3Event<EventHandlerRequest>) => {
    const body = await readValidatedBody(event, chatSchema.parse)
    const { messages } = body

    const config = getConfig(event)
    const llm = initLangchain(
      config.NUXT_OPENAI_API_KEY,
      config.NUXT_OPENAI_FINE_TUNED
    )
    const parser = initOutputParser()

    const chain = prompt.pipe(llm).pipe(parser)
    const stream = await chain.stream({ input: messages[0].content })

    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          controller.enqueue(chunk)
        }
        controller.close()
      },
    })

    return sendStream(event, readableStream)
  }
)
