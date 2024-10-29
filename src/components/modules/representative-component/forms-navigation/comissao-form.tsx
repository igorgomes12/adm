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
import { FC, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { HeaderForms } from '@/components/header-forms/header-forms'
import { ToastContainer } from 'react-toastify'
import {
  commissionRepresentativeSchemaDto,
  type CommissionRepresentativeDto,
} from '../zod/commission-representative.dto'
import { useFormStore } from '../zustand/gerenciador-zustand'

export const ComissaoForm: FC<{
  onNext: (data: CommissionRepresentativeDto) => void
  initialValues: CommissionRepresentativeDto
}> = ({ onNext, initialValues }) => {
  const { updateFormData } = useFormStore()

  const form = useForm<CommissionRepresentativeDto>({
    resolver: zodResolver(commissionRepresentativeSchemaDto),
    defaultValues: initialValues,
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = form

  useEffect(() => {
    reset(initialValues)
  }, [initialValues, reset])

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
                      value={field.value}
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
                      value={field.value}
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
              Próximo
            </Button>
          </div>
        </form>
      </FormProvider>
      <ToastContainer />
    </section>
  )
}
