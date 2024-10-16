import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { AddressData, fetchViaCep } from '@/utils/api/fecth-viacep'
import { zodResolver } from '@hookform/resolvers/zod'
import { addressSchema, type addressSchemaType } from '../zod-form/zod-address'
import type { TClient } from '../zod-form/zod_client.schema'

export const AddressForm: FC<{ onNext: (data: TClient) => void }> = ({
  onNext,
}) => {
  const form = useForm<addressSchemaType>({
    defaultValues: {
      cep: '',
    },
    resolver: zodResolver(addressSchema),
  })

  const {
    handleSubmit,
    register,
    watch,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = form

  const cep = watch('cep')

  const { data: viaCepData, isError } = useQuery<AddressData>({
    queryKey: ['viaCep', cep],
    queryFn: () => fetchViaCep(cep),
    enabled: Boolean(cep) && cep.length === 8,
  })

  useEffect(() => {
    if (!cep) {
      reset({
        street: '',
        bairro: '',
        municipio: '',
        UF: '',
      })
      return
    }

    if (viaCepData) {
      setValue('street', viaCepData.logradouro || '')
      setValue('bairro', viaCepData.bairro || '')
      setValue('municipio', viaCepData.localidade || viaCepData.estado || '')
      setValue('UF', viaCepData.uf || '')
      clearErrors(['street', 'bairro', 'municipio', 'UF'])
    }
  }, [cep, viaCepData, reset, setValue, clearErrors])

  if (isError) {
    return (
      <div className="text-red-500">
        Não foi possível localizar o CEP. Por favor, verifique o número e tente
        novamente.
      </div>
    )
  }

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
              name="cep"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input {...field} {...register('cep')} />
                  </FormControl>
                  <FormMessage>{errors.cep?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="street"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Endereço</FormLabel>
                  <Input {...field} {...register('street')} />
                  <FormMessage>{errors.street?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="bairro"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input {...field} {...register('bairro')} />
                  </FormControl>
                  <FormMessage>{errors.bairro?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="municipio"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Municipio</FormLabel>
                  <Input {...field} {...register('municipio')} />
                  <FormMessage>{errors.municipio?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="UF"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>UF</FormLabel>
                  <FormControl>
                    <Input {...field} {...register('UF')} />
                  </FormControl>
                  <FormMessage>{errors.UF?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="number"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Numero</FormLabel>
                  <FormControl>
                    <Input {...field} {...register('number')} />
                  </FormControl>
                  <FormMessage>{errors.number?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="complement"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Complemento</FormLabel>
                  <Input {...field} {...register('complement')} />
                  <FormMessage>{errors.complement?.message}</FormMessage>
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
