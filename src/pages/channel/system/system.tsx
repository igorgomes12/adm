import { FormFilter } from "@/components/form-utils/form-filter/form-filter"
import { FormHeader } from "@/components/form-utils/form-header/form-header"
import { ModalSystemAdd } from "@/components/modules/system-components/system-add/modal-add-system"
import { TableSystem } from "@/components/modules/system-components/table-system"
import { generateSystemPDF } from "@/components/pdf/pdf-systems/systems-pdf"
import type { TSystemSchemaDto } from "@/features/system/domain/dto/system.dto"
import { useSystemZustand } from "@/features/system/domain/entity/system.entity"
import { api } from "@/infra/auth/database/acess-api/api"
import { useQuery } from "@tanstack/react-query"

import type { FC } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const SystemComponent: FC = () => {
  const { isOpen, onOpen, searchTerm, setSearchTerm } = useSystemZustand()

  const { data } = useQuery<TSystemSchemaDto[], Error>({
    queryKey: ["get-systems"],
    queryFn: async () => {
      const res = await api.get<TSystemSchemaDto[]>("/systems")
      return res.data
    },
    refetchOnWindowFocus: true,
    staleTime: 0,
  })

  const handleOpenPDF = () => {
    if (!data || data.length === 0) {
      alert("Não há dados para gerar o PDF.")

      return
    }
    generateSystemPDF(data)
  }

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <FormHeader title="Sistema" />
      <FormFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpen={id => onOpen(id, "add")}
        showPrinterButton={true}
        onOpenPDF={handleOpenPDF}
      />
      <TableSystem searchTerm={searchTerm} />
      {isOpen && <ModalSystemAdd />}
      <ToastContainer />
    </div>
  )
}
