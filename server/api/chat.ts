import { BufferMemory } from 'langchain/memory'
import { UpstashRedisChatMessageHistory } from 'langchain/stores/message/upstash_redis'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { ConversationChain } from 'langchain/chains'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const memory = new BufferMemory({
    chatHistory: new UpstashRedisChatMessageHistory({
      sessionId: new Date().toISOString(), // Or some other unique identifier for the conversation
      sessionTTL: 300, // 5 minutes, omit this parameter to make sessions never expire
      config: {
        url: 'us1-relevant-bull-40231.upstash.io', // Override with your own instance's URL
        token: '9dd43bff8d8d46afb67935590b75182c', // Override with your own instance's token
      },
    }),
  })

  const model = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    temperature: 0,
  })

  const chain = new ConversationChain({
    llm: model,
    memory,
  })

  const chatResponse = await chain.call({ input: body.input })
  console.log({ chatResponse })

  return chatResponse
})
