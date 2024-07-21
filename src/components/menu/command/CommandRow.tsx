"use client"

import { useEffect, useRef } from "react"

import IconWrapper from "../../ui/IconWrapper"
import { Command } from "../../types"
import { Tag } from "antd"

const MenuRow = ({
  command: { description, icon, title, tags, command },
  selected,
}: {
  command: Command
  selected: boolean
}) => {
  const ref = useRef<HTMLLIElement>(null)

  const handleClick = () => {
    alert(`Should run commmand: ${command}`)
  }

  const classNameSelected = selected ? "bg-[#e1e6ed]" : ""

  useEffect(() => {
    if (selected && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      })
    }
  }, [selected])

  return (
    <li
      className={`border-0 rounded-md transition ease-out ${classNameSelected} hover:bg-[#e1e6ed]`}
      ref={ref}
    >
      <button
        className="flex justify-between items-center w-full p-2 py-2"
        onClick={handleClick}
      >
        <div className="flex items-center">
          <IconWrapper bgColor="#fefefe" color="#aaade8">
            {icon}
          </IconWrapper>
          <div className="ml-2 text-[#666868]">{title}</div>
          {tags && (
            <div className="ml-2">
              {tags.map((tag) => (
                <Tag key={tag} color="#108ee9" className="uppercase">
                  {tag}
                </Tag>
              ))}
            </div>
          )}
          <div className="text-[#caced3] text-sm">{description}</div>
        </div>
      </button>
    </li>
  )
}

export default MenuRow
