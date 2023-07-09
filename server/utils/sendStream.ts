interface EventNodeRes {
  _data: BodyInit
  socket?: any
  write(chunk: any): void
  end(): void
}

interface Event {
  _handled: boolean
  node: {
    res: unknown
  }
}

export function sendStreams(event: Event, stream: ReadableStream<Uint8Array>) {
  event._handled = true
  ;(event.node.res as EventNodeRes)._data = stream

  const res = event.node.res as EventNodeRes

  if (res.socket) {
    stream.pipeTo(
      new WritableStream({
        write(chunk) {
          res.write(chunk)
        },
        close() {
          res.end()
        },
      })
    )
  }
}
