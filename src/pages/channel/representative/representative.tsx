import { FormFilter } from '@/components/form-utils/form-filter/form-filter'
import { FormHeader } from '@/components/form-utils/form-header/form-header'
import { ModalRepresentativeAdd } from '@/components/modules/representative-component/mod/modal-representative-add'
import { TableRepresentative } from '@/components/modules/representative-component/table-representative'
import { useCreateModalRepresentativeZustand } from '@/components/modules/representative-component/zustand/modal-add-zustand'
import { useState, type FC } from 'react'

export const RepresentativeComponent: FC = () => {
  const { isOpen, onOpen } = useCreateModalRepresentativeZustand()
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <FormHeader title="Representantes" />
      <FormFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpen={onOpen}
      />
      <TableRepresentative searchTerm={searchTerm} />
      {isOpen && <ModalRepresentativeAdd />}
    </div>
  )
}
