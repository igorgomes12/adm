import { ButtonAdd } from '@/components/buttons/buttons-add'
import { AddEstablishmentModal } from '@/components/establishment-components/modal-establishment/add-modal-establishment'
import { TableEstablishment } from '@/components/establishment-components/table-establishment'
import { useEstablishmentZustand } from '@/components/establishment-components/zustand-establishment/create-establishment'
import { useState, type FC } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const EstablishmentComponent: FC = () => {
  const { isOpen, onOpen } = useEstablishmentZustand()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-start justify-start">
        <h1 className="text-2xl font-semibold">Cadastro de Estabelecimento</h1>
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
      <TableEstablishment searchTerm={searchTerm} />
      {isOpen && <AddEstablishmentModal />}
      <ToastContainer />
    </div>
  )
}
