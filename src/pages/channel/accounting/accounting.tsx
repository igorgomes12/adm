import { FormFilter } from '@/components/form-utils/form-filter/form-filter'
import { FormHeader } from '@/components/form-utils/form-header/form-header'
import { ModalAccountingAdd } from '@/components/modules/accounting-components/modal-accouting/modal-accounting-add'
import { TableAccounting } from '@/components/modules/accounting-components/table-accountig'
import { useAccountingStore } from '@/components/modules/accounting-components/zustand-accounting/create-zustand'
import { useState, type FC } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const AccountingComponent: FC = () => {
  const { isOpen, onOpen } = useAccountingStore()
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <FormHeader title="Contabilidade" />
      <FormFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpen={onOpen}
        showPrinterButton={true}
      />
      <TableAccounting searchTerm={searchTerm} />
      {isOpen && <ModalAccountingAdd />}
      <ToastContainer />
    </div>
  )
}
