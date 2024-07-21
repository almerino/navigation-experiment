"use client"

import { useCallback, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import Shortcut from "../../ui/Shortcut"
import IconWrapper from "../../ui/IconWrapper"
import { Option } from "../../types"
import useKeyPress from "@/hooks/useKeyPress"

const MenuRow = ({
  iconBgColor,
  option: { description, href, icon, shortcut, shortcutKey, title },
  selected,
}: {
  iconBgColor: string
  option: Option
  selected: boolean
}) => {
  const ref = useRef<HTMLLIElement>(null)
  const router = useRouter()

  const shortcutEvents = useCallback(
    (e: KeyboardEvent, eventKey: string) => {
      if (eventKey === shortcutKey) {
        router.push(href)
      }
    },
    [router, href, shortcutKey]
  )

  useKeyPress([shortcutKey], shortcutEvents)

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
      <Link className="flex justify-between w-full p-2 py-2" href={href}>
        <div className="flex items-center">
          <IconWrapper bgColor={iconBgColor}>{icon}</IconWrapper>
          <div className="ml-2 text-[#666868]">{title}</div>
          <div className="ml-2 text-[#caced3] text-sm">{description}</div>
        </div>
        <Shortcut shortcut={shortcut} />
      </Link>
    </li>
  )
}

export default MenuRow
