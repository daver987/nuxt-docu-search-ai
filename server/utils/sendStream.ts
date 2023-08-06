import { H3Event } from 'h3'

interface EnhancedResponse {
  _data: BodyInit | ReadableStream<Uint8Array>
  socket?: unknown

  write(chunk: Uint8Array): void

  end(): void
}

interface EnhancedEvent {
  _handled: boolean
  node: {
    res: EnhancedResponse & H3Event['node']['res']
  }
}

type ExtendedH3Event = H3Event & EnhancedEvent

export function sendStreams(
  event: H3Event | ExtendedH3Event,
  stream: ReadableStream<Uint8Array>
): void {
  if ('_data' in event.node.res) {
    event._handled = true
    event.node.res._data = stream

    const { res } = event.node

    if (res.socket) {
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
          console.error('Error piping to stream: ', error)
        })
    } else {
      console.error('No active socket connection found')
    }
  } else {
    console.error('Response object is missing in the event node')
  }
}
