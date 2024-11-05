import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type FC, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { HeaderClientForms } from "../header-client"
import {
  schemaEnterpriseDto,
  type EnterpriseDto,
} from "../zod-form/zod-enterprise.dto"
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormStore } from "../zustand/form-client.zustand"
import { Button } from "@/components/ui/button"
import { formatCNPJ } from "@/common/regex/cnpj"

export const EnterpriseForm: FC<{
  onNext: (data: EnterpriseDto) => void
  initialValues: EnterpriseDto & { id?: number }
}> = ({ onNext, initialValues }) => {
  const { updateFormData } = useFormStore()

  const form = useForm<EnterpriseDto>({
    resolver: zodResolver(schemaEnterpriseDto),
    defaultValues: {
      corporate_name: initialValues?.corporate_name || "",
      fantasy_name: initialValues?.fantasy_name || "",
      cpf_cnpj: initialValues?.cpf_cnpj || "",
      state_registration: initialValues?.state_registration || "",
      municipal_registration: initialValues?.municipal_registration || "",
      rural_registration: initialValues?.rural_registration || "",
    },
  })

  const {
    handleSubmit,

    reset,
    watch,
    setValue,
    formState: { errors },
  } = form

  useEffect(() => {
    reset(initialValues)
  }, [initialValues, reset])

  useEffect(() => {
    const subscription = watch(value => {
      updateFormData(value)
    })
    return () => subscription.unsubscribe()
  }, [watch, updateFormData])

  const onSubmit = (data: EnterpriseDto) => {
    if (Object.keys(errors).length > 0) {
      toast.error("Por favor, preencha todos os campos obrigatórios.")
      console.log(errors)
    } else {
      updateFormData(data)
      onNext(data)
    }
  }

  return (
    <section className="w-full items-start justify-center p-4 flex flex-col">
      <HeaderClientForms title="Dados Gerais" />
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-4 p-4 w-full border-2 shadow-lg rounded-md flex flex-col"
        >
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="corporate_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nome Corporativo</FormLabel>
                  <Input {...field} />
                  <FormMessage>{errors.corporate_name?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="fantasy_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nome Fantasia</FormLabel>
                  <Input {...field} />
                  <FormMessage>{errors.fantasy_name?.message}</FormMessage>
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
                  <Input
                    {...field}
                    onChange={e =>
                      setValue("cpf_cnpj", formatCNPJ(e.target.value))
                    }
                  />
                  <FormMessage>{errors.cpf_cnpj?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="state_registration"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Inscrição Estadual</FormLabel>
                  <Input {...field} />
                  <FormMessage>
                    {errors.state_registration?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="municipal_registration"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Inscrição Municipal</FormLabel>
                  <Input {...field} />
                  <FormMessage>
                    {errors.municipal_registration?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="rural_registration"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Inscrição Rural</FormLabel>
                  <Input {...field} />
                  <FormMessage>
                    {errors.rural_registration?.message}
                  </FormMessage>
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
      <ToastContainer />
    </section>
  )
}
