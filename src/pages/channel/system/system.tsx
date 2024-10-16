import { FormFilter } from '@/components/form-utils/form-filter/form-filter'
import { FormHeader } from '@/components/form-utils/form-header/form-header'
import { ModalSystemAdd } from '@/components/modules/system-components/system-add/modal-add-system'
import { useSystemZustand } from '@/components/modules/system-components/system-add/zustand-state/system-add-zustand'
import { TableSystem } from '@/components/modules/system-components/table-system'

import type { FC } from 'react'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const SystemComponent: FC = () => {
  const { isOpen, onOpen } = useSystemZustand()
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <FormHeader title="Sistema" />
      <FormFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpen={onOpen}
      />
      <TableSystem searchTerm={searchTerm} />
      {isOpen && <ModalSystemAdd />}
      <ToastContainer />
    </div>
  )
}
