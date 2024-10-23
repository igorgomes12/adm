import { HeaderForms } from '@/components/header-forms/header-forms'
import api from '@/components/sing-in/api/interceptors-axios'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'
import { translateType } from '../table-representative'
import { schemaDadosGerais, type TSchemaDadosGerais } from '../zod/dados.zod'
import type { representative } from '../zod/types-representative'
import { useFormStore } from '../zustand/gerenciador-zustand'

const options: Array<'REPRESENTATIVE' | 'CONSULTANT' | 'PARTHER'> = [
  'REPRESENTATIVE',
  'CONSULTANT',
  'PARTHER',
]

export const DadosGerais: FC<{
  onNext: (data: TSchemaDadosGerais) => void
  initialValues:TSchemaDadosGerais
}> = ({ onNext, initialValues }) => {
  const { formData, updateFormData } = useFormStore()

  const form = useForm<TSchemaDadosGerais>({
    resolver: zodResolver(schemaDadosGerais),
    defaultValues: {
      name: initialValues.name || formData.name, 
      type: initialValues.type || formData.type,
      region: initialValues.region || formData.region,
      supervisor: initialValues.supervisor || formData.supervisor,
      status: initialValues.status || formData.status,
    },
  })
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = form

  const { data } = useQuery<representative[], Error>({
    queryKey: ['get-representative'],
    queryFn: async () => {
      const response = await api.get('/representative')
      return response.data
    },
  })

  const onSubmit = (data: TSchemaDadosGerais) => {
    updateFormData(data)
    onNext(data)
  }

  return (
    <section className="w-full items-start justify-center p-4 flex flex-col">
      <HeaderForms      
        title="Dados Gerais"
      />
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
                    <Input
                      {...field}
                      placeholder="Nome do representante"
                      value={field.value || ''}
                    />
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
                    <Select value={field.value} onValueChange={field.onChange} disabled={!data}>
                      <SelectTrigger id="supervisor">
                        <SelectValue placeholder="Selecione um supervisor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {data?.map((item, i: number) => (
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
