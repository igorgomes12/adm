import { FormFilter } from '@/components/form-utils/form-filter/form-filter'
import { FormHeader } from '@/components/form-utils/form-header/form-header'
import { TableRepresentative } from '@/components/modules/representative-component/table-representative'
import { useState, type FC } from 'react'
import { useNavigate } from 'react-router'
import { ToastContainer } from 'react-toastify'

export const RepresentativeComponent: FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()
  const handleAddClick = () => {
    navigate('/cadastro-representante')
  }

  const handleEditClick = (id: number) => {
    navigate(`/cadastro-representante/${id}`)
  }

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <FormHeader title="Representantes" />
      <FormFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpen={handleAddClick}
      />
      <TableRepresentative
        onOpenFormClient={handleEditClick}
        searchTerm={searchTerm}
      />
      <ToastContainer />
    </div>
  )
}
