import { ReactNode } from "react"

const TagButton = ({
  icon,
  label,
  selected = false,
  selectedColor = "",
  onClick,
}: {
  icon?: ReactNode
  label: string
  selected?: boolean
  selectedColor?: string
  onClick?: () => void
}) => {
  return (
    <button
      className="min-w-12 rounded-full text-xs px-2 py-2 border"
      style={{
        backgroundColor: selected ? selectedColor : "#f7f9fb",
        color: selected ? "#f2eefe" : "",
      }}
      onClick={onClick}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </button>
  )
}

export default TagButton
