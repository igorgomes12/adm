import { useEffect, type FC } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { fetchViaCep } from "@/infra/http/api-via-cep/fecth-viacep"
import {
  addressSchema,
  type addressSchemaType,
} from "../../client/zod-form/zod-address"
import { HeaderClientForms } from "../header-client"
import "react-toastify/dist/ReactToastify.css"
import { useFormStore } from "../zustand/form-client.zustand"

type Address = {
  postal_code: string
  street: string
  neighborhood: string
  municipality_name: string
  state: string
  number: string
  complement: string
  municipality_id: number
  state_id: number
  country_id: number
  region_id: number
  description: string
  favorite: boolean
  main: boolean // Ensure this is part of your Address type definition
}

interface IAddressClientFormProps {
  onNext: (data: Address) => void
  initialValues: Partial<Address>
}

export const AddressClientForm: FC<IAddressClientFormProps> = ({
  onNext,
  initialValues,
}) => {
  const { updateFormData } = useFormStore()
  const navigate = useNavigate()

  const form = useForm<addressSchemaType>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialValues as addressSchemaType,
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

  const postal_code = watch("postal_code")

  const { data: viaCepData, isError } = useQuery({
    queryKey: ["viaCep", postal_code],
    queryFn: () => fetchViaCep(postal_code),
    enabled: Boolean(postal_code) && postal_code.length === 8,
  })

  useEffect(() => {
    if (initialValues) {
      reset(initialValues as addressSchemaType)
    }
  }, [initialValues, reset])

  useEffect(() => {
    if (!postal_code) {
      reset(
        {
          street: "",
          neighborhood: "",
          municipality_name: "",
          state: "",
        },
        { keepDefaultValues: true }
      )
      return
    }

    if (viaCepData) {
      setValue("street", viaCepData.logradouro || "")
      setValue("neighborhood", viaCepData.bairro || "")
      setValue("municipality_name", viaCepData.localidade || "")
      setValue("state", viaCepData.uf || "")
      clearErrors(["street", "neighborhood", "municipality_name", "state"])
    }
  }, [postal_code, viaCepData, reset, setValue, clearErrors])

  if (isError) {
    return (
      <div className="text-red-500">
        Não foi possível localizar o CEP. Por favor, verifique o número e tente
        novamente.
      </div>
    )
  }

  const submitForm = async (data: addressSchemaType) => {
    try {
      console.log("Dados do formulário:", data)

      const completeAddress: Address = {
        ...data,
        municipality_id: initialValues.municipality_id ?? 0,
        state_id: initialValues.state_id ?? 0,
        country_id: initialValues.country_id ?? 0,
        region_id: initialValues.region_id ?? 0,
        description: initialValues.description ?? "",
        favorite: initialValues.favorite ?? false,
        main: initialValues.main ?? false, // Ensure 'main' is included
        complement: data.complement ?? "",
        number: data.number ?? "",
      }

      updateFormData({ addresses: [completeAddress] })
      onNext(completeAddress)
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
      <div className="flex w-full items-start justify-start">
        <HeaderClientForms title="Formulários de Endereço" />
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex border bg-white rounded-xl shadow-lg p-4 flex-col space-y-4 w-full"
        >
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="postal_code"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input {...field} {...register("postal_code")} />
                  </FormControl>
                  <FormMessage>{errors.postal_code?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="street"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Endereço</FormLabel>
                  <Input {...field} {...register("street")} />
                  <FormMessage>{errors.street?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="neighborhood"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input {...field} {...register("neighborhood")} />
                  </FormControl>
                  <FormMessage>{errors.neighborhood?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="municipality_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Municipio</FormLabel>
                  <Input {...field} {...register("municipality_name")} />
                  <FormMessage>{errors.municipality_name?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="state"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input {...field} {...register("state")} />
                  </FormControl>
                  <FormMessage>{errors.state?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="number"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input {...field} {...register("number")} />
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
                  <Input {...field} {...register("complement")} />
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
      <ToastContainer />
    </div>
  )
}
