import type { FC } from 'react'
import { BsPlus } from 'react-icons/bs'

type TButtonAdd = {
  onOpen?: () => void
}
export const ButtonAdd: FC<TButtonAdd> = ({ onOpen }) => {
  return (
    <div>
      <BsPlus
        className="border rounded-full bg-foreground/50 font-bold cursor-pointer hover:bg-foreground/70 text-white"
        width="bold"
        size={40}
        onClick={onOpen}
      />
    </div>
  )
}
