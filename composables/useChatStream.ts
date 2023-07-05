import { Ref } from 'vue'

interface Chunk {
  choices: { delta: { content: string } }[]
}

interface StreamData {
  done: boolean
  value?: string
}

interface ResolveStreamParams {
  data: Ref<string>
  stream: ReadableStream<Uint8Array>
  onChunk?: (chunk: { data: string }) => void
  onReady?: (params: { data: string }) => void
}

const resolveStream = async ({
  data,
  onChunk = () => {},
  onReady = () => {},
  stream,
}: ResolveStreamParams) => {
  const reader = stream.pipeThrough(new TextDecoderStream()).getReader()

  while (true) {
    const stream: StreamData | undefined = await reader.read()
    if (stream?.done) break

    const chunks = stream?.value
      ?.replaceAll(/^data: /gm, '')
      ?.split('\n')
      .filter((c) => Boolean(c.length) && c !== '[DONE]')
      .map((c) => JSON.parse(c) as Chunk)

    if (chunks) {
      for (let chunk of chunks) {
        const content = chunk.choices[0].delta.content
        if (!content) continue
        data.value += chunk.choices[0].delta.content
        onChunk({ data: content })
      }
    }
  }

  onReady({ data: data.value })
}

interface UseChatStreamParams {
  stream: ReadableStream<Uint8Array>
  onChunk?: (chunk: { data: string }) => void
  onReady?: (params: { data: string }) => void
}

export async function useChatStream({
  onChunk = () => {},
  onReady = () => {},
  stream,
}: UseChatStreamParams) {
  const data = ref('')

  await resolveStream({
    data,
    onChunk,
    onReady,
    stream,
  })

  return {
    data: readonly(data),
  }
}
