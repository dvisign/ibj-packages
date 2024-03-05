"use client"
import { RequestHandler } from "msw"
import { useState, useEffect } from "react"

const isMockingMode = process.env.NEXT_PUBLIC_API_MOCKING === "enabled"
let serverInit = false
function MswGenerator({ handlers }: { handlers: RequestHandler[] }) {
  const [useMsw, setUseMsw] = useState(() => !isMockingMode)
  useEffect(() => {
    const mswInit = async () => {
      if (isMockingMode && handlers) {
        const initMock = await import("./initServer").then(rs => rs.initMock)
        await initMock(handlers)
        setUseMsw(true)
        serverInit = true
      }
    }
    if (!useMsw && !serverInit) mswInit()
  }, [useMsw, handlers])
  // if (!useMsw && !test) return null
  // return <>{children}</>
  return null
}

export default MswGenerator
