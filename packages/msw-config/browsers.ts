import { RequestHandler } from "msw"
import { setupWorker } from "msw/browser"
export function createWorker(handler: RequestHandler[]) {
  return setupWorker(...handler)
}
