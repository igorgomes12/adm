import { FormFilter } from '@/components/form-utils/form-filter/form-filter'
import { FormHeader } from '@/components/form-utils/form-header/form-header'
import { TableClientBuy } from '@/components/modules/client/table-client-buy'
import { useState, type FC } from 'react'
import { useNavigate } from 'react-router-dom'

export const ClientComponent: FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const handleAddClick = () => {
    navigate('/cadastro-cliente')
  }

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <FormHeader title="Clientes de venda" />
      <FormFilter
        onOpen={handleAddClick}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <TableClientBuy searchTerm={searchTerm} />
    </div>
  )
}
