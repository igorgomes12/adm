import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import api from "@/infra/auth/database/acess-api/interceptors-axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaRocket } from "react-icons/fa";
import { Flip, toast } from "react-toastify";
import {
  type TDescriptionCalledSchema,
  descriptionCalledSchema,
} from "../dto/description-called-dto";
import { useDescriptionCalledStore } from "../services/hook/useDescriptionCalled";

export const FormDescriptionCalled = ({ id }: { id: number }) => {
  const { isOpen, mode, onClose } = useDescriptionCalledStore();
  const queryClient = useQueryClient();

  const isEditMode = mode === "edit";

  const mutation = useMutation({
    mutationFn: async (data: TDescriptionCalledSchema) => {
      if (id) {
        await api.put(`/descriptionCalled/${id}`, data);
        return;
      }
      const res = await api.post("/descriptionCalled", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-description-calls"] });
      toast.success(
        `Descrição de Chamados ${
          isEditMode ? "editada" : "adicionada"
        } com sucesso!`,
        {
          theme: "dark",
          icon: <FaRocket />,
          progressStyle: { background: "#1f62cf" },
          transition: Flip,
        }
      );
      onClose();
    },
    onError: (error: Error) => {
      console.error(
        `Erro ao ${isEditMode ? "editar" : "adicionar"} Descrição de Chamados:`,
        error
      );
      toast.error(
        `Ocorreu um erro ao ${
          isEditMode ? "editar" : "adicionar"
        } a Descrição de Chamados. Por favor, tente novamente. ${error}`
      );
    },
  });

  const form = useForm<TDescriptionCalledSchema>({
    defaultValues: {
      description: "",
    },
    resolver: zodResolver(descriptionCalledSchema),
  });

  const { register, setValue } = form;

  useEffect(() => {
    if (isEditMode && id && isOpen) {
      const fetchDescriptionCalledById = async (id: number) => {
        try {
          const response = await api.get<TDescriptionCalledSchema>(
            `/descriptionCalled/${id}`
          );
          setValue("description", response.data.description);
        } catch (error) {
          console.error(
            "Erro ao buscar dados da Descrição de Chamados:",
            error
          );
          toast.error("Erro ao carregar dados para edição. Tente novamente.");
        }
      };

      fetchDescriptionCalledById(id);
    }
  }, [isEditMode, id, isOpen, setValue]);

  const onSubmit = form.handleSubmit((data: TDescriptionCalledSchema) => {
    mutation.mutate(data);
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-4 sm:w-2/3 lg:w-1/3">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          {isEditMode
            ? "Editar Descrição de Chamados"
            : "Cadastro de Descrição de Chamados"}
        </h1>
        <FormProvider {...form}>
          <form onSubmit={onSubmit} className="gap-4 flex flex-col">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição de Chamados</FormLabel>
                  <FormControl>
                    <Input
                      {...register("description")}
                      placeholder="Descrição"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row justify-center gap-2 mt-4">
              <Button
                className="w-full"
                variant="destructive"
                onClick={onClose}
                type="button"
              >
                Fechar
              </Button>
              <Button className="w-full" type="submit" variant="success">
                Salvar
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
