import { ChatOpenAI } from '@langchain/openai'
import type { Peer, Message, WSError } from 'crossws'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'

const prompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    "As an AI assistant specializing in Nuxt 3, it's your responsibility to provide comprehensive and insightful responses to queries about this JavaScript framework. When providing code examples, Always use TYPESCRIPT, and the Vue 3 script setup and composition api syntax. Ensure they are strictly aligned with the latest Nuxt 3 syntax, and refrain from using outdated Nuxt 2 syntax. Your responses should be detailed, informative, and aimed at enabling users to understand and effectively apply the knowledge in their projects.",
  ],
  ['user', '{input}'],
])

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

export default defineWebSocketHandler({
  open(peer: Peer) {
    console.log('[ws] open', peer.id)
  },
  message(peer: Peer, message: Message) {
    console.log('[ws] message received from', peer.id, ':', message.text())
    sendWebSocketMessage(peer, message)
      .then(() => {
        console.log('[ws] message successfully sent to', peer.id)
      })
      .catch((error: Error) => {
        console.error(
          '[ws] error sending message to',
          peer.id,
          ':',
          error.message
        )
      })
  },
  close(peer: Peer, details: { code?: number; reason?: string }) {
    console.log('[ws] close', peer.id, details.code, details.reason)
  },
  error(peer: Peer, error: WSError) {
    console.log('[ws] error', peer.id, error.message)
  },
})

async function sendWebSocketMessage(
  peer: Peer,
  message: Message
): Promise<void> {
  console.log('[ws] Preparing to send message:', message.text())
  const config = useRuntimeConfig()
  console.log('[ws] Using runtime config for API keys')
  const llm = initLangchain(
    config.NUXT_OPENAI_API_KEY as string,
    config.NUXT_OPENAI_FINE_TUNED as string
  )
  console.log(
    '[ws] Langchain initialized with model:',
    config.NUXT_OPENAI_FINE_TUNED
  )
  const parser = initOutputParser()
  console.log('[ws] Output parser initialized')
  const chain = prompt.pipe(llm).pipe(parser)
  console.log('[ws] Processing message content through Langchain and parser')
  const messageContent = JSON.parse(message.text()).content
  console.log('[ws] Message content parsed:', messageContent)
  const stream = await chain.stream({ input: messageContent })
  console.log('[ws] Streaming response to peer:', peer.id)
  for await (const chunk of stream) {
    console.log('[ws] Sending chunk to peer:', peer.id)
    peer.send(chunk)
  }
  console.log('[ws] Message stream completed for peer:', peer.id)
}
