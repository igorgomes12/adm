import { TitleMessageDelete } from "@/common/utils/delete-of-message-and-title/title-message-delete";
import { Button } from "@/components/ui/button";
import api from "@/infra/auth/database/acess-api/interceptors-axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaRocket } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import { Flip, toast } from "react-toastify";
import { useDescriptionCalledStore } from "../services/hook/useDescriptionCalled";

export const ModalDescriptionCalledDelete = () => {
  const { id, isOpen, onClose } = useDescriptionCalledStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["delete-description-calls"],
    mutationFn: async () => {
      const res = await api.delete(`/descriptionCalled/${id}`);

      return res.data;
    },
    onSuccess: () => {
      toast.success("Descrição de Chamados excluído com sucesso!", {
        theme: "dark",
        icon: <FaRocket />,
        progressStyle: { background: "#1f62cf" },
        transition: Flip,
      });
      queryClient.invalidateQueries({ queryKey: ["get-description-calls"] });
      onClose();
    },
    onError: (error) => {
      console.error("Erro ao excluir a Descrição de Chamados:", error);
      toast.error(
        "Erro ao excluir a Descrição de Chamados. Por favor, tente novamente.",
        {
          theme: "colored",
          icon: <IoWarningOutline />,
          transition: Flip,
        }
      );
    },
    onSettled: () => {
      setIsDeleting(false);
    },
  });

  const handleDelete = () => {
    setIsDeleting(true);
    mutate();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 sm:w-2/3 lg:w-1/3">
        <TitleMessageDelete
          title="Tem certeza que deseja excluir a Descrição de Chamados?"
          message={`Esta ação não pode ser desfeita. A Descrição de Chamados com ID ${id} será permanentemente removido.`}
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
  );
};
