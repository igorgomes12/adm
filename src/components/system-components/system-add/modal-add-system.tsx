import { Button } from '@/components/ui/button'
import { useSystemZustand } from './zustand-state/system-add-zustand'
import { useForm } from 'react-hook-form'
import {
  SystemSchemaDto,
  type TSystemSchemaDto,
} from './zod-types/types-system'
import { zodResolver } from '@hookform/resolvers/zod'

export const ModalSystemAdd = () => {
  const { onClose } = useSystemZustand()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSystemSchemaDto>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(SystemSchemaDto),
  })

  const submit = (data: TSystemSchemaDto) => {
    console.log(data)
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 sm:w-2/3 lg:w-1/3">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          Cadastro de Software's
        </h1>
        <form onSubmit={handleSubmit(submit)} action="">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Código
            </label>
            <input
              disabled
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg disabled:bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              {...register('name')}
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
              placeholder="Digite o nome do software"
            />
            {errors.name && (
              <p className="text-xs p-1 flex items-center justify-center text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-2">
            <Button className="w-full" variant="destructive" onClick={onClose}>
              Fechar
            </Button>
            <Button className="w-full" type="submit" variant="success">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
