"use client"

import { ChangeEventHandler, useEffect, useRef } from "react"
import { SearchOutlined } from "@ant-design/icons"
import { Input, InputRef } from "antd"

import Shortcut from "../ui/Shortcut"

const MenuTop = ({
  command,
  focused,
  onChange,
}: {
  command: string
  focused: boolean
  onChange: ChangeEventHandler
}) => {
  const ref = useRef<InputRef>(null)

  useEffect(() => {
    if (focused) {
      ref.current?.focus()
    }
  }, [focused])

  return (
    <div className="p-1 relative">
      <Input
        ref={ref}
        className="h-14 bg-[#e1e6ed] rounded-xl w-full text-[#7f828a] focus-within:bg-[#e1e6ed] hover:bg-[#e1e6ed]"
        size="large"
        prefix={<SearchOutlined />}
        placeholder="Find info, Ask questions or Run queries and enjoy"
        onChange={onChange}
      />
      <Shortcut
        shortcut={command}
        className="absolute right-4 top-1/2 bottom-1/2 m-auto z-10"
      />
    </div>
  )
}

export default MenuTop
