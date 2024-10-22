import { FormFilter } from '@/components/form-utils/form-filter/form-filter'
import { FormHeader } from '@/components/form-utils/form-header/form-header'
import { TableRepresentative } from '@/components/modules/representative-component/table-representative'
import { useState, type FC } from 'react'
import { ToastContainer } from 'react-toastify'

interface IComponentProps {
  onOpenFormClient: () => void
}
export const RepresentativeComponent: FC<IComponentProps> = ({
  onOpenFormClient,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <FormHeader title="Representantes" />
      <FormFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpen={onOpenFormClient}
      />
      <TableRepresentative searchTerm={searchTerm} />
      <ToastContainer />
    </div>
  )
}
