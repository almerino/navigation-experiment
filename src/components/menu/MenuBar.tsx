"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { AppstoreOutlined } from "@ant-design/icons"
import { Transition, TransitionChild } from "@headlessui/react"
import useKeyPress from "@/hooks/useKeyPress"

import CommandList from "./command/CommandList"
import MenuList from "./list/MenuList"
import MenuBottom from "./MenuBottom"
import MenuTop from "./MenuTop"

import ClickAwayListener from "../ui/ClickAwayListener"
import SearchContent from "./search/SearchContent"

const MenuBar = () => {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<"list" | "command" | "search">("list")
  const pathname = usePathname()
  const allKeys = useMemo(() => ["meta+KeyE", "Escape"], [])

  const onClickOutside = () => {
    setIsOpen(false)
    setMode("list")
  }

  useEffect(() => {
    setIsOpen(false)
    setMode("list")
  }, [pathname])

  const shortcutEvents = useCallback((e: KeyboardEvent, eventKey: string) => {
    switch (eventKey) {
      case "meta+KeyE":
        setIsOpen((isOpen) => !isOpen)
        setMode("list")
        break
      case "Escape":
        setIsOpen(false)
        break
    }
  }, [])

  useKeyPress(allKeys, shortcutEvents)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  useEffect(() => {
    if (query.startsWith("/")) {
      setMode("command")
    } else if (query === "") {
      setMode("list")
    } else {
      setMode("search")
    }
  }, [query])

  return (
    <div className="h-16">
      <Transition show={!isOpen}>
        <button
          key="menu-button"
          onClick={() => setIsOpen(true)}
          className="fixed flex w-full top-0 left-0 right-0 mx-auto bg-[#e1e6ed] text-[#7f828a] px-8 py-3 justify-between items-center transition-all duration-200 ease-in data-[closed]:w-3/5 data-[closed]:translate-y-10 data-[closed]:opacity-0 data-[enter]:w-3/5 data-[enter]:translate-y-10 data-[enter]:opacity-0"
        >
          <div className="text-lg">Search for anything</div>
          <div className="flex px-4 py-3 rounded-lg bg-white">
            <AppstoreOutlined />
            <div className="ml-2 text-xs">⌘E</div>
          </div>
        </button>
      </Transition>

      <Transition show={isOpen}>
        <TransitionChild>
          <div
            key="menu-background"
            className="fixed h-full w-full top-0 left-0 backdrop-blur-sm transition-opacity ease-in duration-200 data-[enter]:opacity-0"
          />
        </TransitionChild>
        <TransitionChild>
          <div
            key="menu-content"
            className="fixed md:h-3/6 h-full w-full md:w-3/5 top-0 md:top-10 left-0 right-0 mx-auto rounded-xl bg-[#f1f4f7] text-[#7f828a] justify-between items-center transition-all duration-200 ease-in data-[enter]:w-full data-[enter]:h-1/6 data-[closed]:h-1/6 data-[closed]:w-full data-[enter]:opacity-0 data-[enter]:-translate-y-10 data-[closed]:-translate-y-10 data-[closed]:opacity-0"
          >
            <ClickAwayListener
              onClick={onClickOutside}
              className="h-full w-full relative"
            >
              <MenuTop
                command={
                  mode === "command" ? "⏎ Run Command" : "'/' for commands"
                }
                onChange={handleChange}
              />
              {mode === "list" && <MenuList />}
              {mode === "command" && <CommandList command={query} />}
              {mode === "search" && <SearchContent query={query} />}
              <MenuBottom enterLabel={mode === "command" ? "Run" : "Open"} />
            </ClickAwayListener>
          </div>
        </TransitionChild>
      </Transition>
    </div>
  )
}

export default MenuBar
