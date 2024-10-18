import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import type { TClient } from '../zod-form/zod_client.schema'
import { OwnerSchema, type TOwner } from '../zod-form/zod_owner.schema'
import { zodResolver } from '@hookform/resolvers/zod'

export const AccoutingForm: FC<{ onNext: (data: TClient) => void }> = ({
  onNext,
}) => {
  const form = useForm<TOwner>({
    resolver: zodResolver(OwnerSchema),
  })

  const { handleSubmit, register } = form

  const submitForm = async (data: any) => {
    console.log('Dados do formulário:', data)
    try {
      onNext(data as unknown as TClient)
      console.log('Form enviado com sucesso:', data)
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error)
    }
  }

  return (
    <div className="flex flex-col p-4 w-full h-screen">
      <div className="flex w-full items-start justify-start">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          Formulário de Endereço
        </h1>
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex border bg-white rounded-xl shadow-lg p-4 flex-col space-y-4 w-full"
        >
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Proprietário</FormLabel>
                  <FormControl>
                    <Input {...field} {...register('name')} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="cpf_cnpj"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>CPF</FormLabel>
                  <Input {...field} {...register('cpf_cnpj')} />
                </FormItem>
              )}
            />
            <FormField
              name="date-birthday"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Data de Nascimento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} {...register('birth_date')} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="obs"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Observação</FormLabel>
                  <Textarea {...field} />
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full items-center justify-center">
            <Button className="w-full" type="submit" variant="success">
              Enviar
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
