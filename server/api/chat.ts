import { PineconeClient } from '@pinecone-database/pinecone'
import chalk from 'chalk'
import { ConversationalRetrievalQAChain } from 'langchain/chains'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { BufferMemory } from 'langchain/memory'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { LangChainStream } from 'ai'
import { sendStreams } from '~/server/utils/sendStream'
import {
  AIChatMessage,
  HumanChatMessage,
  SystemChatMessage,
} from 'langchain/schema'
import { z } from 'zod'

const ChatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['system', 'user', 'assistant']),
      content: z.string(),
      id: z.string().optional(),
      createdAt: z.date().optional(),
    })
  ),
})

// Define runtime
export const runtime = 'edge'

// Define Config
function getConfig() {
  return {
    PINECONE_API_KEY: useRuntimeConfig().PINECONE_API_KEY,
    PINECONE_ENVIRONMENT: useRuntimeConfig().PINECONE_ENVIRONMENT,
    PINECONE_INDEX: useRuntimeConfig().PINECONE_INDEX,
    OPENAI_API_KEY: useRuntimeConfig().OPENAI_API_KEY,
  }
}

async function initializePineconeClient(config: any) {
  const client = new PineconeClient()
  await client.init({
    apiKey: config.PINECONE_API_KEY,
    environment: config.PINECONE_ENVIRONMENT,
  })
  return client
}

async function initializePineconeStore(client: PineconeClient, config: any) {
  const pineconeIndex = client.Index(config.PINECONE_INDEX)

  return await PineconeStore.fromExistingIndex(new OpenAIEmbeddings(), {
    pineconeIndex,
  })
}

export default defineEventHandler(async (event: any) => {
  const config = getConfig()
  const client = await initializePineconeClient(config)
  const vectorStore = await initializePineconeStore(client, config)

  const body = await readBody(event)
  const { messages } = ChatSchema.parse(body)

  console.log(chalk.blue('[MESSAGE]', JSON.stringify(messages)))

  if (!config.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set in the environment')
  }

  const pastMessages = messages.map((m: any) => {
    if (m.role === 'user') {
      return new HumanChatMessage(m.content)
    }
    if (m.role === 'system') {
      return new SystemChatMessage(m.content)
    }
    return new AIChatMessage(m.content)
  })

  const { stream, handlers } = LangChainStream()

  const streamingModel = new ChatOpenAI({
    modelName: 'gpt-4',
    streaming: true,
    openAIApiKey: config.OPENAI_API_KEY,
    temperature: 0.5,
  })
  const questionModel = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    openAIApiKey: config.OPENAI_API_KEY,
    temperature: 0,
  })

  // Initialize ConversationalRetrievalQAChain
  const chain = ConversationalRetrievalQAChain.fromLLM(
    streamingModel,
    vectorStore.asRetriever(),
    {
      verbose: true,
      memory: new BufferMemory({
        memoryKey: 'chat_history',
        inputKey: 'question',
        outputKey: 'text',
        returnMessages: true,
      }),
      questionGeneratorChainOptions: {
        llm: questionModel,
      },
    }
  )

  let question = ''
  question = messages[messages.length - 1].content

  chain
    .call(
      {
        question,
        chat_history: pastMessages,
      },
      [handlers]
    )
    .catch((e) => {
      console.error(e.message)
    })

  return sendStreams(event, stream)
})
