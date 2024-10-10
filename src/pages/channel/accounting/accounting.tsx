import { useState, type FC } from 'react'
import { TableAccounting } from '@/components/accounting-components/table-accountig'
import { ButtonAdd } from '@/components/buttons/buttons-add'
import { useAccountingStore } from '@/components/accounting-components/zustand-accounting/create-zustand'
import { ModalAccountingAdd } from '@/components/accounting-components/modal-accouting/modal-accounting-add'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const AccountingComponent: FC = () => {
  const { isOpen, onOpen } = useAccountingStore()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-start justify-start">
        <h1 className="text-2xl font-semibold">Contabilidades</h1>
      </div>
      <div className="flex gap-2 items-center justify-between w-full">
        <input
          placeholder="Pesquisar"
          type="text"
          className="p-2 cursor-text w-full border rounded-lg"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <ButtonAdd onOpen={onOpen} />
      </div>
      <TableAccounting searchTerm={searchTerm} />
      {isOpen && <ModalAccountingAdd />}
      <ToastContainer />
    </div>
  )
}
