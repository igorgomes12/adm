import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSystemZustand } from '@/features/system/domain/entity/system.entity'
import { useSystemForm } from '@/features/system/domain/services/system-form.services'
import { SystemAdd } from '@/features/system/domain/usecases/system-add.usecase'
import { FormProvider } from 'react-hook-form'
import { ImageDropzone } from '../image-dropzone/image-drop'
import { TSystemSchemaDto } from './zod-types/types-system'

export const ModalSystemAdd = () => {
  const { isOpen, onClose } = useSystemZustand()
  const { mutate, isSuccess } = SystemAdd()

  const form = useSystemForm()
  const onSubmit = (data: TSystemSchemaDto) => {
    mutate(data)
  }

  if (!isOpen) return null

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
