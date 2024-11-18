import { Button } from "@/components/ui/button"
import api from "@/infra/auth/database/acess-api/interceptors-axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { FaRocket } from "react-icons/fa"
import { IoWarningOutline } from "react-icons/io5"
import { Flip, toast } from "react-toastify"

import { TitleMessageDelete } from "@/common/utils/delete-of-message-and-title/title-message-delete"
import { useModuleZustand } from "../entity/zustand/useModule"

export const ModalModuleDelete = () => {
  const { onClose, id, isOpen } = useModuleZustand()
  const queryClient = useQueryClient()

  const { mutate, isSuccess } = useMutation({
    mutationKey: ["delete-client"],
    mutationFn: async () => {
      const res = await api.delete("/client", {
        params: { id },
      })
      return res.data
    },
    onSuccess: () => {
      toast.success("Cliente excluído com sucesso!", {
        theme: "dark",
        icon: <FaRocket />,
        progressStyle: { background: "#1f62cf" },
        transition: Flip,
      })
      queryClient.invalidateQueries({ queryKey: ["clients"] })
      onClose()
    },
    onError: error => {
      console.error("Erro ao excluir o cliente:", error)
      toast.error("Erro ao excluir o cliente. Por favor, tente novamente.", {
        theme: "colored",
        icon: <IoWarningOutline />,
        transition: Flip,
      })
    },
  })

  const handleDelete = () => {
    mutate()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 sm:w-2/3 lg:w-1/3">
        <TitleMessageDelete
          title="Tem certeza que deseja excluir o modulo?"
          message={`Esta ação não pode ser desfeita. O modulo com ID ${id} será permanentemente removido.`}
        />
        <div className="flex w-full flex-col sm:flex-row justify-center gap-2">
          <Button
            className="w-full"
            variant="destructive"
            onClick={onClose}
            disabled={isSuccess}
          >
            Cancelar
          </Button>
          <Button
            className="w-full"
            variant="success"
            onClick={handleDelete}
            disabled={isSuccess}
          >
            {isSuccess ? "Excluindo..." : "Excluir"}
          </Button>
        </div>
      </div>
    </div>
  )
}
