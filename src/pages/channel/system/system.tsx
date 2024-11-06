import { FormFilter } from "@/components/form-utils/form-filter/form-filter"
import { FormHeader } from "@/components/form-utils/form-header/form-header"
import { ModalSystemAdd } from "@/components/modules/system-components/system-add/modal-add-system"
import { TableSystem } from "@/components/modules/system-components/table-system"
import { useSystemZustand } from "@/features/system/domain/entity/system.entity"

import type { FC } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const SystemComponent: FC = () => {
  const { isOpen, onOpen, searchTerm, setSearchTerm } = useSystemZustand()

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <FormHeader title="Sistema" />
      <FormFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpen={id => onOpen(id, "add")}
        showPrinterButton={false}
      />
      <TableSystem searchTerm={searchTerm} />
      {isOpen && <ModalSystemAdd />}
      <ToastContainer />
    </div>
  )
}
