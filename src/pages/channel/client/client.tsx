import { FormFilter } from '@/components/form-utils/form-filter/form-filter'
import { FormHeader } from '@/components/form-utils/form-header/form-header'
import { TableClientBuy } from '@/components/modules/client/table-client-buy'
import { useState, type FC } from 'react'

interface ClientComponentProps {
  onOpenFormClient: () => void
}

export const ClientComponent: FC<ClientComponentProps> = ({
  onOpenFormClient,
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <FormHeader title="Clientes de venda" />
      <FormFilter
        onOpen={onOpenFormClient}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <TableClientBuy searchTerm={searchTerm} />
    </div>
  )
}
