"use client"
import { RequestHandler } from "msw"
import { useState, useEffect } from "react"

function MswGenerator({ handlers, isMockingMode }: { handlers: RequestHandler[]; isMockingMode: boolean }) {
  const [useMsw, setUseMsw] = useState(() => !isMockingMode)
  useEffect(() => {
    const mswInit = async () => {
      if (isMockingMode && handlers) {
        const initMock = await import("./initServer").then(rs => rs.initMock)
        await initMock(handlers)
        setUseMsw(true)
      }
    }
    if (!useMsw) mswInit()
  }, [useMsw, handlers])
  // if (!useMsw && !test) return null
  // return <>{children}</>
  return null
}

export default MswGenerator
