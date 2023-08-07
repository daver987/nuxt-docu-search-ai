export function useCreateTokenStream() {
  let controller: ReadableStreamDefaultController<Uint8Array>

  const stream = new ReadableStream<Uint8Array>({
    start(c) {
      controller = c
    },
  })

  function handleTokenCallback(token: string) {
    const encoder = new TextEncoder()
    const encodedToken = encoder.encode(token)
    controller.enqueue(encodedToken)
    console.log({ token })
  }

  function finalizeStream() {
    controller.close() // This finalizes the stream
  }

  return { stream, handleTokenCallback, finalizeStream }
}
