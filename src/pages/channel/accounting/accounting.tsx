import type React from "react"
import { useState } from "react"
import { FormFilter } from "@/components/form-utils/form-filter/form-filter"
import { FormHeader } from "@/components/form-utils/form-header/form-header"
import { ModalAccountingAdd } from "@/components/modules/accounting-components/modal-accouting/modal-accounting-add"
import {
  TableAccounting,
  type TAccount,
} from "@/components/modules/accounting-components/table-accountig"
import { useAccountingStore } from "@/components/modules/accounting-components/zustand-accounting/create-zustand"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useQuery } from "@tanstack/react-query"
import api from "@/infra/auth/database/acess-api/interceptors-axios"
import { generatePDF } from "@/components/pdf/pdf-accounting/accouting-pdf"

export const AccountingComponent: React.FC = () => {
  const { isOpen, onOpen } = useAccountingStore()
  const [searchTerm, setSearchTerm] = useState("")

  const { data } = useQuery<TAccount[]>({
    queryKey: ["get-accounting"],
    queryFn: async () => {
      const response = await api.get("/accouting")
      return response.data
    },
  })

  const handleOpenPDF = () => {
    if (!data || data.length === 0) {
      alert("Não há dados para gerar o PDF.")
      return
    }
    generatePDF(data)
  }

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <FormHeader title="Contabilidade" />

      <FormFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpen={onOpen}
        showPrinterButton={true}
        onOpenPDF={handleOpenPDF}
      />

      <TableAccounting searchTerm={searchTerm} />
      {isOpen && <ModalAccountingAdd />}
      <ToastContainer />
    </div>
  )
}
