import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import api from '@/infra/auth/database/acess-api/interceptors-axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { FaRocket } from 'react-icons/fa'
import { IoWarningOutline } from 'react-icons/io5'
import { Flip, toast } from 'react-toastify'
import {
  SchemaAccoutingDto,
  type TSchemaAccountingDto,
} from '../zod-types-accounting/zod-accouting'
import { useAccountingStore } from '../zustand-accounting/create-zustand'

type TAddAccouting = {
  message: string
}

export const ModalAccountingAdd = () => {
  const { onClose } = useAccountingStore()

  const queryClient = useQueryClient()

  const { mutateAsync: mutation, isSuccess } = useMutation({
    mutationFn: async (data: TSchemaAccountingDto) => {
      const res = await api.post<TAddAccouting>('/accouting', data)
      return res.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-accounting'] })
      toast.success('Contabilidade adicionada com sucesso!', {
        theme: 'dark',
        icon: <FaRocket />,
        progressStyle: { background: '#1f62cf' },
        transition: Flip,
      })
      onClose()
    },
    onError: error => {
      console.error('Erro ao adicionar contabilidade:', error)
      toast.error(
        'Ocorreu um erro ao adicionar a contabilidade. Por favor, tente novamente.',
        {
          theme: 'colored',
          icon: <IoWarningOutline />,
          transition: Flip,
        },
      )
    },
  })

  const form = useForm<TSchemaAccountingDto>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      contact: '',
      crc: '',
      cnpj: '',
    },
    resolver: zodResolver(SchemaAccoutingDto),
  })

  const onSubmit = async (data: TSchemaAccountingDto) => {
    await mutation(data)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-4 sm:w-2/3 lg:w-8/12">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          Cadastro de Contabilidades
        </h1>
        <FormProvider {...form}>
          <form
            className="gap-2 flex flex-col"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nome da Contabilidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da contabilidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Tipo de Contato</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="p-4">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de contato" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="telefone">Telefone</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Número de Contato</FormLabel>
                    <FormControl>
                      <Input placeholder="Número do contato" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="E-mail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
              <FormField
                control={form.control}
                name="crc"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>CRC</FormLabel>
                    <FormControl>
                      <Input placeholder="CRC" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl>
                      <Input placeholder="CNPJ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                {isSuccess ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
