import { useState, type FC } from "react"
import { useNavigate } from "react-router-dom"
import { FormFilter } from "@/components/form-utils/form-filter/form-filter"
import { FormHeader } from "@/components/form-utils/form-header/form-header"
import { TableClientBuy } from "@/components/modules/client/table-client-buy"
import { ToastContainer } from "react-toastify"

export const ClientComponent: FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  const handleAddClick = () => {
    navigate("/cadastro-cliente")
  }

  const handleEditClick = (id: number) => {
    navigate(`/cadastro-cliente/${id}`)
  }

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <FormHeader title="Clientes de venda" />
      <FormFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpen={handleAddClick}
      />
      <TableClientBuy
        searchTerm={searchTerm}
        onOpenFormClient={handleEditClick}
      />
      <ToastContainer />
    </div>
  )
}
