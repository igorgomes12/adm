import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { SystemSchemaDto, TSystemSchemaDto } from './zod-types/types-system'
import { useSystemDeleteZustand } from './zustand-state/system-del-zustand'

export const ModalSystemDelete = () => {
  const { id, onClose } = useSystemDeleteZustand()

  const { handleSubmit } = useForm<TSystemSchemaDto>({
    resolver: zodResolver(SystemSchemaDto),
  })

  const submit = () => {
    console.log('Excluindo item com ID:', id)
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 sm:w-2/3 lg:w-1/3">
        <h1 className="text-lg sm:text-xl font-semibold mb-4 text-center">
          Tem certeza que deseja excluir o software?
        </h1>
        <form onSubmit={handleSubmit(submit)} action="">
          <div className="flex w-full flex-col sm:flex-row justify-center gap-2">
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
