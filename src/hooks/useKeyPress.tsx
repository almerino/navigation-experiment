import { useCallback, useEffect, useLayoutEffect, useRef } from "react"

const useKeyPress = (keys: string[], callback: Function) => {
  // callback ref pattern
  const callbackRef = useRef(callback)
  useLayoutEffect(() => {
    callbackRef.current = callback
  })

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const eventKey = `${event.ctrlKey ? "ctrl+" : ""}${
        event.altKey ? "alt+" : ""
      }${event.shiftKey ? "shift+" : ""}${event.metaKey ? "meta+" : ""}${
        event.code
      }`

      if (keys.includes(eventKey)) {
        callbackRef.current(event, eventKey)
      } else if (keys.includes(event.key)) {
        callbackRef.current(event, event.key)
      }
    },
    [keys]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)

    return () => document.removeEventListener("keydown", handleKeyPress)
  }, [handleKeyPress])
}

export default useKeyPress
