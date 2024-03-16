import { type Ref, ref } from '#imports'

export function useStreaming(onChunk?: (chunk: string) => Ref<string>) {
  const stream = ref<string | string[]>('')
  const loading = ref(false)

  async function postToApi(api: string, event: Record<string, any> | null) {
    console.log('Posting to API:', api, 'with event:', event)

    return await $fetch<ReadableStream<Uint8Array>>(api, {
      method: 'POST',
      body: event,
      responseType: 'stream',
    })
  }

  async function readStream(reader: ReadableStreamDefaultReader<Uint8Array>) {
    const decoder = new TextDecoder()
    console.log('Starting to read the stream...')

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          console.log('Finished reading the stream.')
          break
        }
        const textChunk = decoder.decode(value, { stream: true })
        console.log('Received text chunk:', textChunk)

        if (onChunk) {
          const processedChunks = onChunk(textChunk)
          console.log('Processed chunks:', processedChunks.value)
          if (processedChunks.value.some((chunk) => chunk.done)) {
            console.log('Received [DONE] token, finalizing stream processing.')
            break
          }
          if (Array.isArray(stream.value)) {
            stream.value = [...stream.value, ...processedChunks.value]
          } else {
            console.error('Stream value is not an array.')
          }
        } else if (typeof stream.value === 'string') {
          stream.value += textChunk
        } else {
          console.error('Stream value is not a string.')
        }
      }
    } catch (error) {
      console.error('Error while reading the stream:', error)
    }
  }

  async function handleStream(api: string, event: Record<string, any> | null) {
    loading.value = true
    console.log('Handling stream for event:', event)

    try {
      const response = await postToApi(api, event)
      console.log('Received response from API:', response)
      if (!response) {
        console.error('Stream not available.')
        return
      }

      const reader = response.getReader()
      await readStream(reader)
    } catch (error) {
      console.error('Error during streaming:', error)
    } finally {
      loading.value = false
      console.log('Streaming finished. Current stream value:', stream.value)
    }
  }

  return { stream, handleStream, loading }
}
