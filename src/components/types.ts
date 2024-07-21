import { ReactNode } from "react"

export type Option = {
  id: string
  title: string
  href: string
  description: string
  shortcut: string
  shortcutKey: string
  icon: ReactNode
}

export type Group = {
  id: string
  label: string
  iconBgColor: string
  icon: ReactNode
  options: Option[]
}

export type GroupList = Group[]

export type Command = {
  id: string
  title: string
  tags: string[]
  description: string
  command: string
  icon: ReactNode
}

export type CommandGroup = {
  id: string
  label: string
  commands: Command[]
}

export type CommandList = CommandGroup[]
