import { Button } from "@/components/ui/button"
import api from "@/infra/auth/database/acess-api/interceptors-axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { FaRocket } from "react-icons/fa"
import { Flip, toast } from "react-toastify"
import { useUserDeleteZustand } from "../zustand/del-zustand"

export const ModalUserDelete = () => {
  const { id, isOpen, onClose } = useUserDeleteZustand()
  const [isDeleting, setIsDeleting] = useState(false)
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: async () => {
      const res = await api.delete("/user", { params: { id } })
      return res.data
    },
    onSuccess: () => {
      toast.success("Usuário excluído com sucesso!", {
        theme: "dark",
        icon: <FaRocket />,
        progressStyle: { background: "#1f62cf" },
        transition: Flip,
      })
      queryClient.invalidateQueries({ queryKey: ["get-users"] })
      onClose()
    },
    onError: error => {
      console.error("Erro ao excluir o usuário:", error)
      toast.error("Erro ao excluir o usuário. Por favor, tente novamente.")
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
        <h1 className="text-lg sm:text-xl font-semibold mb-4 text-center">
          Tem certeza que deseja excluir o usuário?
        </h1>
        <p className="text-center mb-4">
          Esta ação não pode ser desfeita. O usuário com ID {id} será
          permanentemente removido.
        </p>
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
