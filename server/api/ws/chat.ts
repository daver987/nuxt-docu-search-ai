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
        console.log('[ws] message sent to', peer.id)
      })
      .catch((error) => {
        console.error('[ws] error sending message to', peer.id, ':', error)
      })
  },
  close(peer: Peer, event) {
    console.log('[ws] close', peer.id, event.code, event.reason)
  },
  error(peer: Peer, error: WSError) {
    console.log('[ws] error', peer.id, error.message)
  },
})

async function sendWebSocketMessage(
  peer: Peer,
  message: Message
): Promise<void> {
  const llm = initLangchain(
    process.env.NUXT_OPENAI_API_KEY as string,
    process.env.NUXT_OPENAI_FINE_TUNED as string
  )
  const parser = initOutputParser()
  const chain = prompt.pipe(llm).pipe(parser)
  const messageContent = JSON.parse(message.text()).content
  const stream = await chain.stream({ input: messageContent })
  for await (const chunk of stream) {
    peer.send(chunk)
  }
}
