import OpenAI from 'openai'
import type { H3EventContext } from 'h3'
import { defineEventHandler } from 'h3'
import { useRuntimeConfig } from '#imports'

declare module 'h3' {
  interface H3EventContext {
    openai: OpenAI
  }
}

function initOpenai(apiKey: string) {
  return new OpenAI({
    apiKey,
  })
}

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const apiKey = config.OPENAI_API_KEY
  event.context.openai = initOpenai(apiKey)
})
