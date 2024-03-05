import { RequestHandler } from "msw"
export async function initMock(handlers: RequestHandler[]) {
  if (typeof window === "undefined") {
    const { createServer } = await import("./server")
    const server = createServer(handlers)
    server.listen()
  } else {
    const { createWorker } = await import("./browsers")
    const worker = createWorker(handlers)
    worker.start({
      onUnhandledRequest: "bypass",
    })
  }
}
