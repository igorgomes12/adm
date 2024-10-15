import { FormFilter } from '@/components/form-utils/form-filter/form-filter'
import { FormHeader } from '@/components/form-utils/form-header/form-header'
import { TableClientBuy } from '@/components/modules/client/table-client-buy'
import { useState } from 'react'

export const ClientComponent = () => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="flex flex-col gap-2 w-full">
      <FormHeader title="Clientes de venda" />
      <FormFilter
        onOpen={() => {}}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <TableClientBuy searchTerm={searchTerm} />
    </div>
  )
}
