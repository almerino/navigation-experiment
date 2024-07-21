"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"

import useKeyPress from "@/hooks/useKeyPress"

import { Group, type Option } from "../../types"
import TagButton from "../../ui/TagButton"

import MenuRow from "./MenuRow"
import { menuList } from "./list"

const MenuList = () => {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const options = useRef<Option[]>(
    menuList.flatMap((group) => [
      ...(!selectedGroup || group.id === selectedGroup?.id
        ? group.options.map((option) => option)
        : []),
    ])
  )

  const router = useRouter()

  const selectGroup = (group?: Group) => () => {
    if (group) {
      options.current = group.options
    } else {
      options.current = menuList.flatMap((group) => [
        ...(!selectedGroup || group.id === selectedGroup?.id
          ? group.options.map((option) => option)
          : []),
      ])
    }

    setSelectedGroup(group || null)
    setSelectedOption(null)
  }

  const shortcutKeys = useMemo(
    () => [
      "ArrowDown",
      "ArrowUp",
      "Enter",
      ...menuList.flatMap((group) => [
        ...group.options.map((option) => option.shortcutKey),
      ]),
    ],
    []
  )

  const shortcutEvents = useCallback(
    (e: KeyboardEvent, eventKey: string) => {
      switch (eventKey) {
        case "ArrowDown": {
          setSelectedOption((prevSelectedOption) => {
            const newIndex =
              options.current.findIndex(
                (item) => prevSelectedOption?.id === item.id
              ) + 1

            return options.current[newIndex % options.current.length]
          })
          break
        }
        case "ArrowUp": {
          setSelectedOption((prevSelectedOption) => {
            const newIndex =
              options.current.findIndex(
                (item) => prevSelectedOption?.id === item.id
              ) - 1

            return options.current[
              newIndex < 0 ? options.current.length - 1 : newIndex
            ]
          })
          break
        }
        case "Enter": {
          if (selectedOption) {
            router.push(selectedOption.href)
          }
        }
      }
    },
    [router, selectedOption]
  )

  useKeyPress(shortcutKeys, shortcutEvents)

  return (
    <>
      <div className="absolute w-full px-3 py-4 flex gap-1 bg-[#f1f4f7]">
        <TagButton
          label="All"
          selected={!selectedGroup}
          selectedColor="#3d3f45"
          onClick={selectGroup()}
        />
        {menuList.map((menu) => (
          <TagButton
            key={menu.id}
            icon={menu.icon}
            label={menu.label}
            selected={selectedGroup?.id === menu.id}
            selectedColor={menu.iconBgColor}
            onClick={selectGroup(menu)}
          />
        ))}
      </div>
      <div className="mt-10 p-2 overflow-scroll max-h-[calc(100%-168px)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {menuList.map(
          (group) =>
            (!selectedGroup || selectedGroup.id === group.id) && (
              <ul key={group.label} className="border-0 mt-4">
                <span className="uppercase text-base p-2 text-[#aeb1b5]">
                  {group.label}
                </span>
                {group.options.map((option) => (
                  <MenuRow
                    key={option.id}
                    iconBgColor={group.iconBgColor}
                    option={option}
                    selected={option.id === selectedOption?.id}
                  />
                ))}
              </ul>
            )
        )}
      </div>
    </>
  )
}

export default MenuList
