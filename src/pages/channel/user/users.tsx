import { FormFilter } from '@/components/form-utils/form-filter/form-filter'
import { FormHeader } from '@/components/form-utils/form-header/form-header'
import { ModalUserAdd } from '@/components/modules/users-components/mod/add-mod'
import { TableUsers } from '@/components/modules/users-components/table-users'
import { useAddUserZustand } from '@/components/modules/users-components/zustand/add-zustand'
import { useState, type FC } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const UsersComponent: FC = () => {
  const { isOpen, onOpen } = useAddUserZustand()
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <FormHeader title="Usuários" />
      <FormFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpen={onOpen}
      />
      <TableUsers searchTerm={searchTerm} />
      {isOpen && <ModalUserAdd />}
      <ToastContainer />
    </div>
  )
}
