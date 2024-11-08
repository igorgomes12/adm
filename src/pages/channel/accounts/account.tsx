import { FormFilter } from "@/components/form-utils/form-filter/form-filter"
import { FormHeader } from "@/components/form-utils/form-header/form-header"
import { TableAccount } from "@/components/modules/Finance/account/data/table-account"
import { CreateAccount } from "@/components/modules/Finance/account/mod/create-account"
import { useAccountsStore } from "@/components/modules/Finance/account/service/zustand"
import { useState, type FC } from "react"
import { ToastContainer } from "react-toastify"

export const Account: FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const { isOpen, onOpen } = useAccountsStore()
  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <FormHeader title="Cadastro de Contas" />
      <FormFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpen={onOpen}
        showPrinterButton={true}
        onOpenPDF={() => {}}
      />
      <TableAccount searchTerm={searchTerm} />
      {isOpen && <CreateAccount />}
      <ToastContainer />
    </div>
  )
}
