import type { Ref } from 'vue'

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
  const decoder = new TextDecoder()
  const transformStream = new TransformStream({
    transform(chunk) {
      const text = decoder.decode(chunk)

      data.value += text
      onChunk({ data: text })
    },
  })

  const reader = stream.pipeThrough(transformStream).getReader()
  while (true) {
    const { done } = await reader.read()
    if (done) break
  }
  onReady({ data: data.value })
}

interface UseChatStreamParams {
  stream: ReadableStream<Uint8Array>
  onChunk?: (chunk: { data: string }) => void
  onReady?: (params: { data: string }) => void
}

export const useChatStream = ({
  onChunk = () => {},
  onReady = () => {},
  stream,
}: UseChatStreamParams) => {
  const data = ref('')
  resolveStream({ data, onChunk, onReady, stream })
  return { data: readonly(data) }
}
