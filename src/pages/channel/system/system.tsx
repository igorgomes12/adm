import { ButtonAdd } from '@/components/buttons/buttons-add'
import { ModalSystemAdd } from '@/components/system-components/system-add/modal-add-system'
import { useSystemZustand } from '@/components/system-components/system-add/zustand-state/system-add-zustand'
import { TableSystem } from '@/components/system-components/table-system'
import type { FC } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
        <ButtonAdd onOpen={onOpen} />
      </div>
      <TableSystem />
      {isOpen && <ModalSystemAdd />}
      <ToastContainer />
    </div>
  )
}
