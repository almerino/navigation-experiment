import { type ReactNode, useEffect, useRef } from "react"

export default function ClickAwayListener({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode
  className?: string
  onClick: Function
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClick()
      }
    }

    window.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("click", handleClick)
    }
  }, [onClick])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
