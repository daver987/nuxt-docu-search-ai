import type { H3Event, EventHandlerRequest } from 'h3'
import * as net from 'net'

type SocketType = net.Socket

interface EventNodeRes {
  _data: BodyInit | ReadableStream<Uint8Array>
  socket?: SocketType

  write(chunk: Uint8Array): void

  end(): void
}

interface EnhancedEventNode {
  _handled: boolean
  node: {
    res: EventNodeRes
  }
}

export type ExtendedH3Event = H3Event<EventHandlerRequest> & EnhancedEventNode

export async function sendStreams(
  event: ExtendedH3Event,
  stream: ReadableStream<Uint8Array>
): Promise<void> {
  if (!event.node.res) {
    return await handleError(
      new Error('Response object is missing in the event node')
    )
  }

  try {
    const { res } = event.node

    setHandled(event)
    setDataStream(event, stream)

    if (!res.socket) {
      return handleError(new Error('No active socket connection found'))
    }

    pipeStreamToSocket(stream, res)
  } catch (error: unknown) {
    if (error instanceof Error) {
      await handleError(error)
    } else {
      await handleError(new Error('An unknown error occurred'))
    }
  }
}

function setHandled(event: ExtendedH3Event): void {
  event._handled = true
}

function setDataStream(
  event: ExtendedH3Event,
  stream: ReadableStream<Uint8Array>
): void {
  event.node.res._data = stream
}

function pipeStreamToSocket(
  stream: ReadableStream<Uint8Array>,
  res: EventNodeRes
): void {
  stream
    .pipeTo(
      new WritableStream<Uint8Array>({
        write(chunk) {
          res.write(chunk)
        },
        close() {
          res.end()
        },
      })
    )
    .catch((error) => {
      handleError(
        new Error(`Error piping to stream: ${error.message}`),
        res
      ).catch((innerError) => {
        console.error('Failed to handle the error:', innerError)
      })
    })
}

async function handleError(error: Error, res?: EventNodeRes): Promise<void> {
  console.error(error.message)

  if (error.message.includes('Error piping to stream') && res?._data) {
    try {
      const chunkedData = res._data as Uint8Array
      // noinspection JSUnusedLocalSymbols
      const jsonData = JSON.parse(new TextDecoder().decode(chunkedData))

      res.write(chunkedData)
      res.end()

      console.info('Fallback to single JSON chunk succeeded.')
      return
    } catch (jsonError) {
      console.error('Failed to process data as a single JSON chunk:', jsonError)
    }
  }
}
