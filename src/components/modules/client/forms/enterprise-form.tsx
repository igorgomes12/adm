import { HeaderForms } from '@/components/header-forms/header-forms'
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
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useEffect, type FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import type { TSchemaEstablished } from '../../establishment-components/zod-types-establishment/zod-establihment'
import type { TClient } from '../zod-form/zod_client.schema'

export const EnterpriseForm: FC<{ onNext: (data: TClient) => void }> = ({
  onNext,
}) => {
  const form = useForm()

  const { data, error } = useQuery<TSchemaEstablished[], AxiosError<Error>>({
    queryKey: ['get-establishment'],
    queryFn: async () => {
      const response = await api.get(`/establishment`)
      return response.data
    },
  })

  if (error) {
    return (
      <div>
        <p>{`Nenhum estabelecimento encontrado. Por favor, tente novamente. ${error.message}`}</p>
      </div>
    )
  }

  const { setValue, register, handleSubmit } = form

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setValue('createdAt', today)
  }, [setValue])

  const submitForm = async () => {
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
        <HeaderForms title="Formulários da Empresa" />
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex border bg-white rounded-xl shadow-lg p-4 flex-col space-y-4 w-full"
          action=""
        >
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="createdAt"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Data Cadastro</FormLabel>
                  <Input
                    {...register('createdAt')}
                    className="text-md font-normal"
                    type="date"
                    disabled
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="corporate_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nome Corporativo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      {...register('corporate_name', { required: true })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="fantasy_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nome Fantasia</FormLabel>
                  <Input {...register('fantasy_name')} {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="cpf_cnpj"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input {...field} {...register('cpf_cnpj')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="state_registration"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Incrição Estadual</FormLabel>
                  <FormControl>
                    <Input {...field} {...register('state_registration')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="municipal_registration"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Incrição Municipal</FormLabel>
                  <Input {...field} {...register('municipal_registration')} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="rural_registration"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Incrição Rural</FormLabel>
                  <Input {...field} {...register('rural_registration')} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex lg:flex-row flex-col w-full gap-2 items-center justify-between">
            <FormField
              name={'establishment_typeId'}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tipo Estabelecimento</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={value => field.onChange(Number(value))}
                      defaultValue={field.value?.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {data?.map((item: TSchemaEstablished) => (
                          <SelectItem
                            key={item.id}
                            value={item?.id?.toString() || '0'}
                          >
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full items-center justify-center">
            <Button className="w-full" type="submit" variant="success">
              Próximo
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
