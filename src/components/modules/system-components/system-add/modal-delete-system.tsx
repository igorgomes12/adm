import { Button } from "@/components/ui/button"
import api from "@/infra/auth/database/acess-api/interceptors-axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { IoWarningOutline } from "react-icons/io5"
import { Flip, toast } from "react-toastify"
import { useSystemDeleteZustand } from "./zustand-state/system-del-zustand"
import { TitleMessageDelete } from "@/common/utils/delete-of-message-and-title/title-message-delete"

export const ModalSystemDelete = () => {
  const { id, isOpen, onClose } = useSystemDeleteZustand()
  const [isDeleting, setIsDeleting] = useState(false)
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ["delete-system"],
    mutationFn: async () => {
      const res = await api.delete("/systems", { params: { id } })
      return res.data
    },
    onSuccess: () => {
      toast.success("Sistema excluído com sucesso!", {
        theme: "colored",
        icon: <IoWarningOutline />,
        transition: Flip,
      })
      queryClient.invalidateQueries({ queryKey: ["get-systems"] })
      onClose()
    },
    onError: (error: Error) => {
      toast.error(`Error ao excluir o sistema ${error.message}`, {
        theme: "colored",
        icon: <IoWarningOutline />,
        transition: Flip,
      })
    },
    onSettled: () => {
      setIsDeleting(false)
    },
  })

  const handleDelete = () => {
    setIsDeleting(true)
    mutate()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 sm:w-2/3 lg:w-1/3">
        <TitleMessageDelete
          title="Tem certeza que deseja excluir o sistema?"
          message={`Esta ação não pode ser desfeita. O sistema com ID ${id} será permanentemente removido.`}
        />

        <div className="flex w-full flex-col sm:flex-row justify-center gap-2">
          <Button
            className="w-full"
            variant="destructive"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            className="w-full"
            variant="success"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Excluindo..." : "Excluir"}
          </Button>
        </div>
      </div>
    </div>
  )
}
