import { FormFilter } from "@/components/form-utils/form-filter/form-filter"
import { FormHeader } from "@/components/form-utils/form-header/form-header"
import { useCalledStore } from "@/components/modules/support/called/data/entity/hook/use-called"
import { CalledModuleData } from "@/components/modules/support/called/data/mod/called"
import { TableCalled } from "@/components/modules/support/called/table-called"
import { type FC, useState } from "react"
import { useNavigate } from "react-router"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const CalledComponent: FC = () => {
  const { isOpen, onOpen } = useCalledStore()
  const [searchTerm, setSearchTerm] = useState("")

  const navigate = useNavigate()
  const handleAddClick = () => {
    navigate("/cadastro-chamado")
  }

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <FormHeader title="Chamados" />
      <FormFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpen={handleAddClick}
      />
      <TableCalled
        onOpenFormClient={() => onOpen("edit")}
        searchTerm={searchTerm}
      />
      {isOpen && <CalledModuleData />}
      <ToastContainer />
    </div>
  )
}
