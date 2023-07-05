import { LangChainStream, Message } from 'ai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { AIChatMessage, HumanChatMessage } from 'langchain/schema'

export const runtime = 'edge'

function sendStream(event: any, stream: ReadableStream) {
  // Mark to prevent h3 handling response
  event._handled = true

  // Vercel (unenv)
  ;(event.node.res as unknown as { _data: BodyInit })._data = stream

  // Node.js
  if (event.node.res.socket) {
    stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk)
        },
        close() {
          event.node.res.end()
        },
      })
    )
  }
}

export default defineEventHandler(async (event: any) => {
  // Extract the `prompt` from the body of the request
  const { messages } = await readBody(event)

  const { stream, handlers } = LangChainStream()

  const OPENAI_API_KEY = event.context.openai
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set in the environment')
  } else {
    const llm = new ChatOpenAI({
      temperature: 0.5,
      openAIApiKey: OPENAI_API_KEY,
      streaming: true,
    })

    llm
      .call(
        (messages as Message[]).map((message) =>
          message.role === 'user'
            ? new HumanChatMessage(message.content)
            : new AIChatMessage(message.content)
        ),
        {},
        [handlers]
      )
      // eslint-disable-next-line no-console
      .catch(console.error)

    return sendStream(event, stream)
  }
})
