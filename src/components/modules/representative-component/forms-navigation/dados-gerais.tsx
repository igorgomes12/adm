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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import api from '@/infra/auth/database/acess-api/interceptors-axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { FC, useEffect } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'
import { translateType } from '../table-representative'
import { schemaDadosGerais, type TSchemaDadosGerais } from '../zod/dados.zod'
import { useFormStore } from '../zustand/gerenciador-zustand'
import type { representative } from '../zod/types-representative'

const options: Array<'REPRESENTATIVE' | 'CONSULTANT' | 'PARTHER'> = [
  'REPRESENTATIVE',
  'CONSULTANT',
  'PARTHER',
]

export const DadosGerais: FC<{
  onNext: (data: TSchemaDadosGerais) => void
  initialValues: TSchemaDadosGerais & { id?: number }
}> = ({ onNext, initialValues }) => {
  const { formData, updateFormData } = useFormStore()

  const form = useForm<TSchemaDadosGerais>({
    resolver: zodResolver(schemaDadosGerais),
    defaultValues: initialValues.id
      ? {
          name: initialValues.name || formData.name || '',
          type: initialValues.type || formData.type || 'REPRESENTATIVE',
          region: initialValues.region || formData.region || '',
          supervisor: initialValues.supervisor || formData.supervisor || '',
          status: initialValues.status || formData.status || '',
        }
      : {
          name: '',
          type: 'REPRESENTATIVE',
          region: '',
          supervisor: '',
          status: '',
        },
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = form

  useEffect(() => {
    if (initialValues.id) {
      reset(initialValues)
    } else {
      reset({
        name: '',
        type: 'REPRESENTATIVE',
        region: '',
        supervisor: '',
        status: '',
      })
    }
  }, [initialValues, reset])

  const watchedFields = useWatch({
    control,
    disabled: !initialValues.id,
  })

  useEffect(() => {
    if (initialValues.id) {
      updateFormData(watchedFields)
    }
  }, [watchedFields, updateFormData, initialValues.id])

  const onSubmit = (data: TSchemaDadosGerais) => {
    updateFormData(data)
    onNext(data)
  }

  const { data: supervisors } = useQuery<representative[], Error>({
    queryKey: ['get-representative'],
    queryFn: async () => {
      const response = await api.get('/representative')
      return response.data
    },
  })

  const filteredSupervisors = supervisors?.filter(
    supervisor => supervisor.id !== initialValues.id,
  )

  return (
    <section className="w-full items-start justify-center p-4 flex flex-col">
      <HeaderForms title="Dados Gerais" />
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-4 p-4 w-full border-2 shadow-lg rounded-md flex flex-col"
        >
          <div className="flex w-full gap-2">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="name">Nome do Representante</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nome do representante" />
                  </FormControl>
                  <FormMessage>{errors.name?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full gap-2">
            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="border-2 p-2 rounded-md"
                    >
                      {options.map(option => (
                        <div key={option} className="flex gap-2 items-start">
                          <RadioGroupItem
                            value={option}
                            id={`type-${option}`}
                          />
                          <label
                            htmlFor={`type-${option}`}
                            className="cursor-pointer text-sm"
                          >
                            {translateType(option)}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage>{errors.type?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full gap-2">
            <FormField
              control={control}
              name="region"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="region">Região de Atuação</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="region"
                      placeholder="Região de Atuação, Ex: Cachoeiro"
                    />
                  </FormControl>
                  <FormMessage>{errors.region?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="supervisor"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="supervisor">Supervisor</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value || ''}
                      onValueChange={field.onChange}
                      disabled={!filteredSupervisors}
                    >
                      <SelectTrigger id="supervisor">
                        <SelectValue placeholder="Selecione um supervisor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {filteredSupervisors?.map((item, i: number) => (
                            <SelectItem key={i} value={item.id.toString()}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.supervisor?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-2 mt-4">
            <Button className="w-full" type="submit" variant="success">
              Próximo
            </Button>
          </div>
        </form>
      </FormProvider>
      <ToastContainer />
    </section>
  )
}
