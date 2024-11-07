import type React from "react"
import { useEffect } from "react"
import { FormProvider, useForm, useWatch } from "react-hook-form"
import { useFormStore } from "../../representative-component/zustand/gerenciador-zustand"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  addressSchema,
  type addressSchemaType,
} from "../../client/zod-form/zod-address"
import { ToastContainer, toast } from "react-toastify"
import { HeaderForms } from "@/components/modules/representative-component/header-forms/header-forms"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import {
  type AddressData,
  fetchViaCep,
} from "@/infra/http/api-via-cep/fecth-viacep"
import { Input } from "@/components/ui/input"

export const AddressForm: React.FC<{
  onNext?: (data: addressSchemaType) => void
  initialValues?: addressSchemaType
}> = ({ onNext, initialValues }) => {
  const { formData, updateFormData, setMutationSuccess } = useFormStore()
  const navigate = useNavigate()

  const form = useForm<addressSchemaType>({
    defaultValues: {
      postal_code:
        initialValues?.postal_code || formData.address?.postal_code || "",
      street: initialValues?.street || formData.address?.street || "",
      neighborhood:
        initialValues?.neighborhood || formData.address?.neighborhood || "",
      municipality_name:
        initialValues?.municipality_name ||
        formData.address?.municipality_name ||
        "",
      state: initialValues?.state || formData.address?.state || "",
      number: initialValues?.number || formData.address?.number || "",
      complement:
        initialValues?.complement || formData.address?.complement || "",
    },
    resolver: zodResolver(addressSchema),
  })

  const {
    handleSubmit,
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = form
  const cep = useWatch({ control, name: "postal_code" })

  const { data: viaCepData } = useQuery<AddressData>({
    queryKey: ["viaCep", cep],
    queryFn: () => fetchViaCep(cep),
    enabled: Boolean(cep) && cep.length === 8,
  })

  useEffect(() => {
    if (viaCepData) {
      setValue("street", viaCepData.logradouro || "")
      setValue("neighborhood", viaCepData.bairro || "")
      setValue("municipality_name", viaCepData.localidade || "")
      setValue("state", viaCepData.uf || "")
      clearErrors(["street", "neighborhood", "municipality_name", "state"])
    }
  }, [viaCepData, setValue, clearErrors])

  // Effect to update the global state whenever the form inputs change
  const watchedFields = useWatch({ control })

  useEffect(() => {
    updateFormData({ address: watchedFields })
  }, [watchedFields, updateFormData])

  const submitForm = async (data: addressSchemaType) => {
    try {
      updateFormData({ address: data })
      if (onNext) onNext(data)
      setMutationSuccess(true)
      toast.success("Formulário enviado com sucesso!", {
        onClose: () => navigate("/canais"),
        autoClose: 2000,
      })
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error)
      toast.error("Erro ao enviar o formulário. Tente novamente.")
    }
  }

  return (
    <div className="flex flex-col p-4 w-full h-screen">
      <HeaderForms title="Formulários de Endereço" />
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex border bg-white rounded-xl shadow-lg p-4 flex-col space-y-4 w-full"
        >
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="postal_code"
              control={control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage>{errors.postal_code?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="street"
              control={control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Endereço</FormLabel>
                  <Input {...field} />
                  <FormMessage>{errors.street?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="neighborhood"
              control={control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage>{errors.neighborhood?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="municipality_name"
              control={control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Município</FormLabel>
                  <Input {...field} />
                  <FormMessage>{errors.municipality_name?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="state"
              control={control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>UF</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage>{errors.state?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="number"
              control={control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage>{errors.number?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="complement"
              control={control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Complemento</FormLabel>
                  <Input {...field} />
                  <FormMessage>{errors.complement?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          {/* <Button type="submit" variant="success">
            Próximo
          </Button> */}
        </form>
      </FormProvider>
      <ToastContainer />
    </div>
  )
}
