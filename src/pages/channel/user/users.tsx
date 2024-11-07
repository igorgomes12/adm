import { FormFilter } from "@/components/form-utils/form-filter/form-filter"
import { FormHeader } from "@/components/form-utils/form-header/form-header"
import { ModalUserAdd } from "@/components/modules/users-components/mod/add-mod"
import { TableUsers } from "@/components/modules/users-components/table-users"
import { useAddUserZustand } from "@/components/modules/users-components/zustand/add-zustand"
import { type TUser, generateUserPDF } from "@/components/pdf/pdf-user/user-pdf"
import { api } from "@/infra/auth/database/acess-api/api"
import { useQuery } from "@tanstack/react-query"
import { type FC, useState } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const UsersComponent: FC = () => {
  const { isOpen, onOpen } = useAddUserZustand()
  const [searchTerm, setSearchTerm] = useState("")

  const { data } = useQuery<TUser[], Error>({
    queryKey: ["get-users"],
    queryFn: async () => {
      const res = await api.get<TUser[]>("/user")
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
    generateUserPDF(data)
  }

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <FormHeader title="Usuários" />
      <FormFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpen={onOpen}
        showPrinterButton={true}
        onOpenPDF={handleOpenPDF}
      />
      <TableUsers searchTerm={searchTerm} />
      {isOpen && <ModalUserAdd />}
      <ToastContainer />
    </div>
  )
}
