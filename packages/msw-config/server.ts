import { RequestHandler } from "msw"
import { setupServer } from "msw/node"

export function createServer(handler: RequestHandler[]) {
  return setupServer(...handler)
}
