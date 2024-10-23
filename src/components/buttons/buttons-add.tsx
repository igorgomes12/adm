import type { FC, ReactNode } from 'react'

type TButtonAdd = {
  onOpen?: () => void
  icon: ReactNode
}
export const ButtonAdd: FC<TButtonAdd> = ({ onOpen, icon }) => {
  return (
    <div
      onClick={onOpen}
      className="border rounded-full bg-foreground/50 font-bold cursor-pointer hover:bg-foreground/70 text-white"
    >
      {icon}
    </div>
  )
}
