const Shortcut = ({
  shortcut,
  description,
  className,
}: {
  shortcut: string
  description?: string
  className?: string
}) => {
  return (
    <div
      className={`flex items-center select-none text-xs text-[#c4c7ca] ${className}`}
    >
      <div className="bg-[#fffffe] text-[#c4c7ca] h-8 min-w-8 p-2 rounded-md text-center">
        {shortcut}
      </div>
      {description && <span className="ml-2">{description}</span>}
    </div>
  )
}

export default Shortcut
