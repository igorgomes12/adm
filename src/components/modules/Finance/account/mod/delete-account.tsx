import type { FC } from "react"
import axios from "axios"
import { showMessageError } from "@/common/messages/Err/toast-err"
import { showMessageSuccess } from "@/common/messages/Success/toast-success"
import { Button } from "@/components/ui/button"
import { api } from "@/infra/auth/database/acess-api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAccountsStore } from "../service/zustand"
import { TitleMessageDelete } from "@/common/utils/delete-of-message-and-title/title-message-delete"

export const ModalAccountDelete: FC = () => {
  const { id, isOpen, onClose } = useAccountsStore()
  const queryClient = useQueryClient()

  const { mutate, isSuccess } = useMutation({
    mutationKey: ["account"],
    mutationFn: async () => {
      const res = await api.delete("/account", {
        params: { id },
      })
      return res.data
    },
    onSuccess: () => {
      const message = "Conta excluída com sucesso!"
      showMessageSuccess({ message })
      queryClient.invalidateQueries({ queryKey: ["get-account"] })
      onClose()
    },
    onError: (error: unknown) => {
      let errorMessage = "Verifique sua conta."

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage
      }

      showMessageError(errorMessage)
      console.error("Erro de login:", error)
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
          title="Tem certeza que deseja excluir a Conta?"
          message={`Esta ação não pode ser desfeita. A conta com ID ${id} sera permanentemente removido.`}
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
