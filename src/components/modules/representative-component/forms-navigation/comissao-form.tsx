import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import {
  commissionRepresentativeSchemaDto,
  type CommissionRepresentativeDto,
} from '../zod/commission-representative.dto'
import { HeaderForms } from '@/components/header-forms/header-forms'
import { useFormStore } from '../zustand/gerenciador-zustand'
import { ToastContainer } from 'react-toastify'

export const ComissaoForm: FC<{
  onNext: (data: CommissionRepresentativeDto) => void
}> = ({ onNext }) => {
  const { formData, updateFormData } = useFormStore()
  const form = useForm<CommissionRepresentativeDto>({
    resolver: zodResolver(commissionRepresentativeSchemaDto),
    defaultValues: {
      implantation: formData.commission?.implantation || 0,
      mensality: formData.commission?.mensality || 0,
    },
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form

  const onSubmit = (data: CommissionRepresentativeDto) => {
    updateFormData({ commission: data })
    onNext(data)
  }

  return (
    <section className="w-full items-start justify-center p-4 flex flex-col">
      <HeaderForms title="Comissão" />
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-4 p-4 w-full border-2 shadow-lg rounded-md flex flex-col"
        >
          <div className="flex w-full gap-2">
            <FormField
              control={control}
              name="implantation"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Implantação</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      onChange={e =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage>{errors.implantation?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="mensality"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Mensalidade</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      onChange={e =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage>{errors.mensality?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-2 mt-4">
            <Button className="w-full" type="submit" variant="success">
              Proximo
            </Button>
          </div>
        </form>
      </FormProvider>
      <ToastContainer />
    </section>
  )
}
