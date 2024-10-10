import { AddEstablishmentModal } from '@/components/modules/establishment-components/modal-establishment/add-modal-establishment'
import { TableEstablishment } from '@/components/modules/establishment-components/table-establishment'
import { useEstablishmentZustand } from '@/components/modules/establishment-components/zustand-establishment/create-establishment'
import { FormFilter } from '@/components/form-utils/form-filter/form-filter'
import { FormHeader } from '@/components/form-utils/form-header/form-header'
import { useState, type FC } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const EstablishmentComponent: FC = () => {
  const { isOpen, onOpen } = useEstablishmentZustand()
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="flex flex-col gap-2 w-full">
      <FormHeader title="Estabelecimento" />
      <FormFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpen={onOpen}
      />
      <TableEstablishment searchTerm={searchTerm} />
      {isOpen && <AddEstablishmentModal />}
      <ToastContainer />
    </div>
  )
}
