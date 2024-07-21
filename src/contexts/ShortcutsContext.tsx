"use client"

// Explored an alternative for shortcuts through contexts
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

type Shortcuts = {
  [key: string]: Function
}

export const GLOBAL_SHORTCUS = {
  "ctrl+k": () => {},
  "meta+e": () => {},
}

export const ShortcutsContext = createContext<Function>(() => {})

export function ShortcutsProvider({
  children,
  shortcuts = GLOBAL_SHORTCUS,
}: {
  children: ReactNode
  shortcuts?: Shortcuts
}) {
  const [currentShortcuts, setShortcuts] = useState(shortcuts)

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      const eventKey = `${event.ctrlKey ? "ctrl+" : ""}${
        event.shiftKey ? "shift+" : ""
      }${event.altKey ? "alt+" : ""}${event.metaKey ? "meta+" : ""}${
        event.code
      }`

      if (currentShortcuts[eventKey]) {
        event.stopPropagation()
        event.preventDefault()
        currentShortcuts[eventKey]()
      }
    }

    window.addEventListener("keydown", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyUp)
    }
  }, [currentShortcuts])

  return (
    <>
      <ShortcutsContext.Provider value={setShortcuts}>
        {children}
      </ShortcutsContext.Provider>
    </>
  )
}

export const useShortcuts = (shortcuts: Shortcuts) => {
  const shortcutsContext = useContext(ShortcutsContext)

  useEffect(() => {
    shortcutsContext(shortcuts)
  }, [shortcuts, shortcutsContext])

  if (!shortcutsContext) {
    throw new Error(
      "useShortcuts has to be used within <ShortcutsContext.Provider>"
    )
  }

  return shortcutsContext
}
