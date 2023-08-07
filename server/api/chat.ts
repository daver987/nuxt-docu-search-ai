import { PineconeClient } from '@pinecone-database/pinecone'
import { LangChainStream } from 'ai'
import { ConversationalRetrievalQAChain } from 'langchain/chains'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { z } from 'zod'
import { ExtendedH3Event, sendStreams } from '~/server/utils/sendStream'
import { AIMessage, HumanMessage } from 'langchain/schema'

interface Config {
  PINECONE_API_KEY: string
  PINECONE_ENVIRONMENT: string
  PINECONE_INDEX: string
  OPENAI_API_KEY: string
}

const MessageSchema = z.object({
  role: z.enum(['system', 'user', 'assistant']),
  content: z.string(),
  id: z.string().optional(),
  createdAt: z.date().optional(),
})

const ChatSchema = z.object({
  messages: z.array(MessageSchema),
})

export const runtime = 'edge'

function getConfig(): Config {
  return {
    PINECONE_API_KEY: useRuntimeConfig().PINECONE_API_KEY,
    PINECONE_ENVIRONMENT: useRuntimeConfig().PINECONE_ENVIRONMENT,
    PINECONE_INDEX: useRuntimeConfig().PINECONE_INDEX,
    OPENAI_API_KEY: useRuntimeConfig().OPENAI_API_KEY,
  }
}

async function initializePineconeClient(config: Config) {
  const client = new PineconeClient()
  await client.init({
    apiKey: config.PINECONE_API_KEY,
    environment: config.PINECONE_ENVIRONMENT,
  })
  return client
}

async function initializePineconeStore(client: PineconeClient, config: Config) {
  const pineconeIndex = client.Index(config.PINECONE_INDEX)

  return await PineconeStore.fromExistingIndex(new OpenAIEmbeddings(), {
    pineconeIndex,
  })
}

const CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT = `Given the following conversation and a follow-up question, return the conversation history excerpt that includes any relevant context to the question if it exists and rephrase the follow-up question to be a standalone question.
Chat History:
{chat_history}
Follow-Up Input: {question}
Your answer should follow the following format:
\`\`\`
Use the following pieces of context to answer the users question and embody the role of a Nuxt 3 educator, particularly catering to beginners. 
Use retrieved documentation to answer user questions accurately and helpfully.
When asked for code examples, provide an extended version with clear explanations, highlighting potential issues or context-specific limitations from the documentation. 
Remember to generate markdown for Code Examples
Remember, Nuxt 3 auto-imports built-in composables, utilities, and components, so omit them from examples.If unsure about an answer, simply admit it. 
Your goal is to assist users in understanding Nuxt 3, fostering growth while pointing out potential pitfalls.
----------------
<Relevant chat history excerpt as context here>
Follow-up question: <Rephrased question here>
\`\`\`
Your answer:`

export default defineEventHandler(async (event) => {
  try {
    const config = getConfig()

    if (!config.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set in the environment')
    }

    const client = await initializePineconeClient(config)
    const vectorStore = await initializePineconeStore(client, config)

    const body = await readBody(event)

    const { messages } = ChatSchema.parse(body)

    const question = messages[messages.length - 1].content

    const chatHistory = messages
      .slice(0, -1)
      .map((message) =>
        message.role === 'user'
          ? new HumanMessage(message.content)
          : new AIMessage(message.content)
      )

    const { stream, handlers } = LangChainStream()

    const streamingModel = new ChatOpenAI({
      modelName: 'gpt-4',
      streaming: true,
      openAIApiKey: config.OPENAI_API_KEY,
      temperature: 0.7,
    })

    const questionModel = new ChatOpenAI({
      modelName: 'gpt-4',
      openAIApiKey: config.OPENAI_API_KEY,
      temperature: 0,
    })

    const chain = ConversationalRetrievalQAChain.fromLLM(
      streamingModel,
      vectorStore.asRetriever(20),
      {
        verbose: true,
        questionGeneratorChainOptions: {
          llm: questionModel,
          template: CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT,
        },
      }
    )

    chain.call(
      {
        question,
        chat_history: chatHistory,
      },
      [handlers]
    )

    return sendStreams(event as ExtendedH3Event, stream)
  } catch (error: any) {
    console.error(error.message)
    return error.message
  }
})
