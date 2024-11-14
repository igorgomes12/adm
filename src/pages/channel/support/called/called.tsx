import { FormFilter } from "@/components/form-utils/form-filter/form-filter"
import { FormHeader } from "@/components/form-utils/form-header/form-header"
import { TableCalled } from "@/components/modules/support/called/table-called"
import { type FC, useState } from "react"
import { useNavigate } from "react-router"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const CalledComponent: FC = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const navigate = useNavigate()
  const handleAddClick = () => {
    navigate("/cadastro-chamado")
  }
  const handleAddClickEdit = () => {
    navigate("/cadastro-chamado/:id")
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
        onOpenFormClient={handleAddClickEdit}
        searchTerm={searchTerm}
      />

      <ToastContainer />
    </div>
  )
}
