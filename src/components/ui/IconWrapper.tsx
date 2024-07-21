import { ReactNode } from "react"

const IconWrapper = ({
  bgColor = "transparent",
  color = "white",
  children,
}: {
  children: ReactNode
  bgColor?: string
  color?: string
}) => {
  return (
    <div
      className="p-1 h-8 w-8 rounded-md flex justify-center"
      style={{ backgroundColor: bgColor, color: color }}
    >
      {children}
    </div>
  )
}

export default IconWrapper
