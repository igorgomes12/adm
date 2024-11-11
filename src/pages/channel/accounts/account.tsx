import { FormFilter } from "@/components/form-utils/form-filter/form-filter"
import { FormHeader } from "@/components/form-utils/form-header/form-header"
import { TableAccount } from "@/components/modules/Finance/account/data/table-account"
import { CreateAccount } from "@/components/modules/Finance/account/mod/create-account"
import { useAccountsStore } from "@/components/modules/Finance/account/service/zustand"
import type { FC } from "react"
import { ToastContainer } from "react-toastify"

export const Account: FC = () => {
  const { isOpen, onOpen, mode, searchTerm, setSearchTerm } = useAccountsStore()
  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <FormHeader title="Cadastro de Contas" />
      <FormFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpen={() => onOpen("default")}
        showPrinterButton={true}
        onOpenPDF={() => {}}
      />
      <TableAccount searchTerm={searchTerm} />
      {isOpen && mode === "default" && <CreateAccount />}
      <ToastContainer />
    </div>
  )
}
