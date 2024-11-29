import { FormFilter } from "@/components/form-utils/form-filter/form-filter"
import { FormHeader } from "@/components/form-utils/form-header/form-header"
import { TableAccount } from "@/components/modules/Finance/account/data/table-account"
import type { TAccounts } from "@/components/modules/Finance/account/dto/account.dto"
import { CreateAccount } from "@/components/modules/Finance/account/mod/create-account"
import { useAccountsStore } from "@/components/modules/Finance/account/service/zustand"
import { generateAccountPDF } from "@/components/pdf/pdf-account/account-pdf"
import { api } from "@/infra/auth/database/acess-api/api"
import { useQuery } from "@tanstack/react-query"
import type { FC } from "react"
import { ToastContainer } from "react-toastify"

export const Account: FC = () => {
  const { isOpen, onOpen, mode, searchTerm, setSearchTerm } = useAccountsStore()

  const { data } = useQuery<TAccounts[], Error>({
    queryKey: ["get-account"],
    queryFn: async () => {
      const response = await api.get("/account")
      return response.data
    },
  })
  const handleOpenPDF = () => {
    if (!data || data.length === 0) {
      alert("Não há dados para gerar o PDF.")

      return
    }
    generateAccountPDF(data)
  }

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <FormHeader title="Cadastro de Contas" />
      <FormFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpen={() => onOpen("default")}
        showPrinterButton={true}
        onOpenPDF={handleOpenPDF}
      />
      <TableAccount searchTerm={searchTerm} />
      {isOpen && mode === "default" && <CreateAccount />}
      <ToastContainer />
    </div>
  )
}
