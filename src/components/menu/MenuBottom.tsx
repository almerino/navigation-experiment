import Shortcut from "../ui/Shortcut"

const MenuBottom = ({ enterLabel = "Open" }: { enterLabel: string }) => {
  return (
    <div className="absolute bottom-0 w-full h-16 p-4 rounded-b-xl flex justify-between">
      <Shortcut shortcut="↑↓" description="Move" />

      <div className="flex">
        <Shortcut shortcut="↵" description={enterLabel} />
        <Shortcut shortcut="esc" description="Close" className="ml-3" />
      </div>
    </div>
  )
}

export default MenuBottom
