"use client"

import { useCallback, useMemo, useRef, useState } from "react"

import useKeyPress from "@/hooks/useKeyPress"

import { Command } from "../../types"

import CommandRow from "./CommandRow"
import { commandList } from "./list"

const CommandList = ({ command }: { command: string }) => {
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null)
  const commands = useRef<Command[]>(
    commandList.flatMap((group) => [
      ...group.commands.map((command) => command),
    ])
  )

  const shortcutKeys = useMemo(() => ["ArrowDown", "ArrowUp", "Enter"], [])

  const shortcutEvents = useCallback(
    (e: KeyboardEvent, eventKey: string) => {
      switch (eventKey) {
        case "ArrowDown": {
          setSelectedCommand((prevSelectedCommand) => {
            const newIndex =
              commands.current.findIndex(
                (item) => prevSelectedCommand?.id === item.id
              ) + 1

            return commands.current[newIndex % commands.current.length]
          })
          break
        }
        case "ArrowUp": {
          setSelectedCommand((prevSelectedCommand) => {
            const newIndex =
              commands.current.findIndex(
                (item) => prevSelectedCommand?.id === item.id
              ) - 1

            return commands.current[
              newIndex < 0 ? commands.current.length - 1 : newIndex
            ]
          })
          break
        }
        case "Enter": {
          if (selectedCommand) {
            alert(`Should run commmand: ${selectedCommand.command}`)
          } else {
            alert(`Should run commmand: ${command}`)
          }
        }
      }
    },
    [command, selectedCommand]
  )

  useKeyPress(shortcutKeys, shortcutEvents)

  return (
    <div className="p-2 overflow-scroll max-h-[calc(100%-130px)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {commandList.map((group) => (
        <ul key={group.label} className="border-0 first:mt-0 mt-4">
          <span className="uppercase text-base p-2 text-[#aeb1b5]">
            {group.label}
          </span>
          {group.commands.map((command) => (
            <CommandRow
              key={command.id}
              command={command}
              selected={command.id === selectedCommand?.id}
            />
          ))}
        </ul>
      ))}
    </div>
  )
}

export default CommandList
