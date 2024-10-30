import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type FC, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { HeaderClientForms } from "../header-client"
import {
  type EnterpriseDto,
  schemaEnterpriseDto,
} from "../zod-form/zod-enterprise.dto"
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormStore } from "../zustand/form-client.zustand"
import { Button } from "@/components/ui/button"

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
    register,
    reset,
    watch,
    formState: { errors },
  } = form

  useEffect(() => {
    if (initialValues) {
      reset(initialValues)
    }
  }, [initialValues, reset])

  // Update global form data on input change
  useEffect(() => {
    const subscription = watch(value => {
      updateFormData(value)
    })
    return () => subscription.unsubscribe()
  }, [watch, updateFormData])

  const onSubmit = (data: EnterpriseDto) => {
    console.log("=> ", data)
    updateFormData(data)
    onNext(data)
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
                  <Input
                    {...field}
                    {...register("corporate_name", { required: true })}
                  />
                  <FormMessage>{errors.corporate_name?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="fantasy_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nome Fantasia</FormLabel>
                  <Input {...register("fantasy_name")} {...field} />
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
                  <Input {...field} {...register("cpf_cnpj")} />
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
                  <FormLabel>Incrição Estadual</FormLabel>
                  <Input {...field} {...register("state_registration")} />
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
                  <FormLabel>Incrição Municipal</FormLabel>
                  <Input {...field} {...register("municipal_registration")} />
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
                  <FormLabel>Incrição Rural</FormLabel>
                  <Input {...field} {...register("rural_registration")} />
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
