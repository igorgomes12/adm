import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import api from "@/infra/auth/database/acess-api/interceptors-axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { TrashIcon } from "@radix-ui/react-icons"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { FormProvider, useForm } from "react-hook-form"
import { FaRocket } from "react-icons/fa"
import { Flip, toast } from "react-toastify"
import {
  SystemSchemaDto,
  type TSystemSchemaDto,
} from "./zod-types/types-system"
import { useSystemEditZustand } from "./zustand-state/system-edit-zustand"

export const ModalSystemEdit = () => {
  const { id, isOpen, onClose } = useSystemEditZustand()
  const queryClient = useQueryClient()

  const form = useForm<TSystemSchemaDto>({
    defaultValues: {
      id: 0,
      name: "",
      image_url: "",
      description: "",
      stable_version: "",
    },
    resolver: zodResolver(SystemSchemaDto),
  })

  const { data: systemData, isLoading: isLoadingSystem } = useQuery({
    queryKey: ["get-system", id],
    queryFn: async () => {
      if (id) {
        const response = await api.get("/systems", { params: { id } })
        return (
          response.data.find((system: TSystemSchemaDto) => system.id === id) ||
          null
        )
      }
      return null
    },
    enabled: !!id && isOpen,
  })

  useEffect(() => {
    if (systemData) {
      form.reset({
        id: systemData.id,
        name: systemData.name,
        image_url: systemData.image_url,
        description: systemData.description,
        stable_version: systemData.stable_version || "",
      })
    }
  }, [systemData, form])

  const { mutate, isSuccess: isUpdating } = useMutation({
    mutationKey: ["patch-system"],
    mutationFn: async (data: TSystemSchemaDto) => {
      const res = await api.patch("/systems", data, { params: { id: data.id } })
      return res.data
    },
    onSuccess: () => {
      toast.success("Sistema atualizado com sucesso!", {
        theme: "dark",
        icon: <FaRocket />,
        progressStyle: { background: "#1f62cf" },
        transition: Flip,
      })
      queryClient.invalidateQueries({ queryKey: ["get-systems"] })
      queryClient.invalidateQueries({ queryKey: ["get-system", id] })
      onClose()
    },
    onError: error => {
      console.error("Mutation error:", error)
      toast.error("Erro ao atualizar o sistema. Por favor, tente novamente.")
    },
  })

  const onSubmit = (data: TSystemSchemaDto) => {
    mutate(data)
  }

  const handleFileSelect = (
    file: File | null,
    onChange: (...event: unknown[]) => void
  ) => {
    if (file) {
      onChange(file)
    } else {
      onChange(undefined)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 sm:w-2/3 lg:w-1/3">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          Edição de Software
        </h1>
        {isLoadingSystem ? (
          <p>Carregando dados do sistema...</p>
        ) : (
          <FormProvider {...form}>
            <form
              className="gap-2 flex flex-col"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do software</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagem do software</FormLabel>
                    <FormControl>
                      <ImageDropzone
                        onFileSelect={file =>
                          handleFileSelect(file, field.onChange)
                        }
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição do software</FormLabel>
                    <FormControl>
                      <textarea
                        className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stable_version"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Versão estável</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                  disabled={isUpdating}
                  type="button"
                >
                  Fechar
                </Button>
                <Button
                  className="w-full"
                  type="submit"
                  variant="success"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Salvando..." : "Salvar"}
                </Button>
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </div>
  )
}

interface ImageDropzoneProps {
  onFileSelect: (file: File | null) => void
  value?: File | string
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  onFileSelect,
  value,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0])
      }
    },
    [onFileSelect]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
  })

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onFileSelect(null)
  }

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer">
        {value ? (
          <div className="flex flex-col w-full  items-center">
            <div className="flex items-center justify-center gap-2">
              <p>{value instanceof File ? value.name : value}</p>

              <TrashIcon
                onClick={handleDelete}
                className="w-6 h-6 text-red-500"
              />
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            {isDragActive
              ? "Solte a imagem aqui"
              : "Arraste e solte para adicionar imagem ou clique para selecionar"}
          </p>
        )}
      </div>
    </div>
  )
}
