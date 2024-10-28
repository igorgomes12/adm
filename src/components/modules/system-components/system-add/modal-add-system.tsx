import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import api from '@/infra/auth/database/acess-api/interceptors-axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FormProvider, useForm } from 'react-hook-form'
import { FaRocket } from 'react-icons/fa'
import { GoPaperclip } from 'react-icons/go'
import { Flip, toast } from 'react-toastify'
import {
  SystemSchemaDto,
  type TSystemSchemaDto,
} from './zod-types/types-system'
import { useSystemZustand } from './zustand-state/system-add-zustand'

export const ModalSystemAdd = () => {
  const { onClose } = useSystemZustand()
  const queryClient = useQueryClient()

  const { mutate, isSuccess } = useMutation({
    mutationKey: ['post-system'],
    mutationFn: async (data: TSystemSchemaDto) => {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('description', data.description)
      if (data.image_url instanceof File) {
        formData.append('image', data.image_url)
      }

      const res = await api.post('/systems', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return res.data
    },
    onSuccess: () => {
      toast.success('Sistema adicionado com sucesso!', {
        theme: 'dark',
        icon: <FaRocket />,
        progressStyle: { background: '#1f62cf' },
        transition: Flip,
      })
      queryClient.invalidateQueries({ queryKey: ['get-systems'] })
      onClose()
    },
    onError: error => {
      console.error('Mutation error:', error)
      toast.error('Erro ao salvar o sistema. Por favor, tente novamente.')
    },
  })

  const form = useForm<TSystemSchemaDto>({
    defaultValues: {
      name: '',
      image_url: undefined,
      description: '',
    },
    resolver: zodResolver(SystemSchemaDto),
  })

  const onSubmit = (data: TSystemSchemaDto) => {
    mutate(data)
  }

  const handleFileSelect = (
    file: File | null,
    onChange: (...event: any[]) => void,
  ) => {
    if (file) {
      onChange(file)
    } else {
      onChange(undefined)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 sm:w-2/3 lg:w-1/3">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          Cadastro de Software's
        </h1>
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
                  <FormControl>
                    <Input placeholder="Nome do software" {...field} />
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
                  <FormControl>
                    <textarea
                      className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                      placeholder="Descrição do software"
                      rows={3}
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
                {isSuccess ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

interface ImageDropzoneProps {
  onFileSelect: (file: File) => void
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
    [onFileSelect],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    maxFiles: 1,
  })

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <div className="border-2 border-dashed border-gray-300 gap-2 rounded-lg p-4 flex text-center cursor-pointer">
        <GoPaperclip />

        <p className="text-gray-500 text-sm">
          {!isDragActive && 'Arraste e solte para adicionar imagem'}
        </p>
        {value && (
          <p className="mt-2">{value instanceof File ? value.name : value}</p>
        )}
      </div>
    </div>
  )
}
