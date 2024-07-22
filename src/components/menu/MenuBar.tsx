"use client"

import { MouseEvent, useCallback, useEffect, useMemo, useState } from "react"
import clsx from "clsx"
import { usePathname } from "next/navigation"
import { AppstoreOutlined } from "@ant-design/icons"
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

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(true)
  }

  const onClickOutside = () => {
    if (isOpen) {
      setIsOpen(false)
      setMode("list")
    }
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
      <button
        onClick={handleClick}
        className={clsx([
          "fixed w-full flex top-0 left-0 right-0 mx-auto z-10 bg-[#e1e6ed] text-[#7f828a] px-8 py-3 justify-between items-center cursor-pointer transition-all duration-300 ease-in",
          isOpen ? "opacity-0 md:w-3/5 md:translate-y-10" : "opacity-100",
        ])}
      >
        <div className="text-lg">Search for anything</div>
        <div className="flex px-4 py-3 rounded-lg bg-white">
          <AppstoreOutlined />
          <div className="ml-2 text-xs">⌘E</div>
        </div>
      </button>

      <div
        className={clsx([
          "fixed h-full w-full top-0 left-0 backdrop-blur-sm transition-all ease-in duration-300",
          isOpen ? "opacity-100" : "opacity-0",
        ])}
      />

      <div
        className={clsx([
          "fixed left-0 right-0 mx-auto w-full rounded-xl bg-[#f1f4f7] text-[#7f828a] justify-between items-center transition-all duration-300 ease-in",
          isOpen
            ? "md:h-3/6 md:w-3/5 top-0 md:top-10 opacity-100"
            : "h-full md:h-1/6 top-0 opacity-0",
        ])}
      >
        <ClickAwayListener
          onClick={onClickOutside}
          className="h-full w-full relative"
        >
          <MenuTop
            command={mode === "command" ? "⏎ Run Command" : "'/' for commands"}
            focused={isOpen}
            onChange={handleChange}
          />
          {isOpen && (
            <>
              {mode === "list" && <MenuList isOpen={isOpen} />}
              {mode === "command" && <CommandList command={query} />}
              {mode === "search" && <SearchContent query={query} />}
            </>
          )}
          <MenuBottom enterLabel={mode === "command" ? "Run" : "Open"} />
        </ClickAwayListener>
      </div>
    </div>
  )
}

export default MenuBar
