import type { FC } from "react"
import { useEffect } from "react"
import { useModuleZustand } from "../entity/zustand/useModule"
import { Button } from "@/components/ui/button"
import { FormProvider, useForm } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ModuleSchemaDto, type TModuleSchemaDto } from "../dto/modules"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/infra/auth/database/acess-api/api"
import { FaRocket } from "react-icons/fa"
import { IoWarningOutline } from "react-icons/io5"
import { toast, Flip } from "react-toastify"

export const ModuleAddComponent: FC = () => {
  const { onClose, id } = useModuleZustand()
  const queryClient = useQueryClient()
  const form = useForm<TModuleSchemaDto>({
    defaultValues: {
      system: "FRENTE",
      module: "",
      status: true,
    },
    resolver: zodResolver(ModuleSchemaDto),
  })

  const { reset, setValue } = form

  useEffect(() => {
    if (id) {
      api
        .get(`/modules/${id}`)
        .then(response => {
          const moduleData = {
            ...response.data,
            id: response.data.id ?? undefined,
          }
          reset(moduleData)
        })
        .catch(error => {
          console.error("Erro ao carregar módulo:", error)
          toast.error("Erro ao carregar módulo para edição.")
        })
    }
  }, [id, reset])

  const { mutate, isSuccess } = useMutation({
    mutationFn: async (data: TModuleSchemaDto) => {
      if (id) {
        await api.put(`/modules/${id}`, data)
        return
      }
      const res = await api.post("/modules", data)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-modules"] })
      toast.success(`Modulo ${id ? "atualizado" : "cadastrado"} com sucesso!`, {
        theme: "dark",
        icon: <FaRocket />,
        progressStyle: { background: "#1f62cf" },
        transition: Flip,
      })
      onClose()
    },
    onError: error => {
      console.error("Erro ao cadastrar o modulo:", error)
      toast.error("Erro ao cadastrar o modulo. Por favor, tente novamente.", {
        theme: "colored",
        icon: <IoWarningOutline />,
        transition: Flip,
      })
    },
  })
  const handleSubmitAdd = () => {
    const formData = form.getValues()
    mutate({
      ...formData,
      status: !!formData.status,
      id: id !== null ? id : undefined,
    })
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-4 space-y-4 rounded-lg shadow-lg w-full mx-4 sm:w-2/3 lg:w-2/5">
        <h1 className="text-2xl p-2 text-center font-bold">
          {id ? "Editar Modulo" : "Cadastro de Modulo"}
        </h1>
        <FormProvider {...form}>
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmitAdd)}
          >
            <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
              <FormField
                control={form.control}
                name="system"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Sistema</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="p-4">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o sistema" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="FRENTE">FRENTE</SelectItem>
                        <SelectItem value="RETAGUARDA">RETAGUARDA</SelectItem>
                        <SelectItem value="LIDERPDV">LIDER-PDV</SelectItem>
                        <SelectItem value="LIDERODONTO">
                          LIDER ODONTO
                        </SelectItem>
                        <SelectItem value="WEBLIDER">WEBLIDER</SelectItem>
                        <SelectItem value="OUTROS">OUTROS</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="module"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Modulo</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do modulo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Renderize o status apenas no modo de edição */}
            {id && (
              <div className="flex flex-col w-full gap-2 items-start justify-between">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col gap-2">
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Switch
                          className="w-10 h-6"
                          checked={field.value === true}
                          onCheckedChange={checked =>
                            setValue("status", checked)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-2 mt-4">
              <Button
                className="w-full"
                variant="destructive"
                onClick={onClose}
                type="button"
                disabled={isSuccess}
              >
                Fechar
              </Button>
              <Button
                className="w-full"
                type="submit"
                variant="success"
                disabled={isSuccess}
              >
                {isSuccess ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
