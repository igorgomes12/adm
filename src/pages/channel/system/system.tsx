import { ModalSystemAdd } from '@/components/system-components/system-add/modal-add-system'
import { useSystemZustand } from '@/components/system-components/system-add/zustand-state/system-add-zustand'
import { TableSystem } from '@/components/system-components/table-system'
import type { FC } from 'react'
import { BsPlus } from 'react-icons/bs'

export const SystemComponent: FC = () => {
  const { isOpen, onOpen } = useSystemZustand()
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-start justify-start">
        <h1 className="text-2xl font-semibold">Cadastro de Software`s</h1>
      </div>
      <div className="flex gap-2 items-center justify-between w-full">
        <input
          placeholder="Pesquisar"
          type="text"
          className="p-2 cursor-text w-full border rounded-lg"
        />
        <div>
          <BsPlus
            className="border rounded-full bg-green-600 font-bold cursor-pointer hover:bg-green-800 text-white"
            width="bold"
            size={40}
            onClick={onOpen}
          />
        </div>
      </div>
      <TableSystem />
      {isOpen && <ModalSystemAdd />}
    </div>
  )
}
