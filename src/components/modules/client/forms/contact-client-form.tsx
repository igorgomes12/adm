import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { type FC, useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { HeaderClientForms } from "../header-client"
import {
  type TContactDto,
  contactSchemaDto,
} from "../zod-form/contact-client-zod"
import { useFormStore } from "../zustand/form-client.zustand"

export const ContactClientForm: FC<{
  onNext: (data: TContactDto) => void
  initialValues: TContactDto
}> = ({ onNext, initialValues }) => {
  const { formData, updateFormData } = useFormStore()

  const form = useForm<TContactDto>({
    resolver: zodResolver(contactSchemaDto),
    defaultValues: {
      contact: initialValues?.contact || formData.contacts[0]?.contact || "",
      description:
        initialValues?.description || formData.contacts[0]?.description || "",
      type: initialValues?.type || formData.contacts[0]?.type || "TELEFONE",
      favorite:
        initialValues?.favorite || formData.contacts[0]?.favorite || false,
    },
  })

  const {
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = form

  useEffect(() => {
    if (initialValues) {
      reset(initialValues)
    }
  }, [initialValues, reset])

  useEffect(() => {
    const subscription = watch(value => {
      console.log("value", value)
      if (value.contact !== undefined) {
        updateFormData({
          contacts: [
            {
              contact: value.contact,
              description: value.description || "",
              type: value.type || "TELEFONE",
              favorite: value.favorite ?? false,
            },
          ],
        })
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, updateFormData])
  const onSubmit = (data: TContactDto) => {
    updateFormData({ contacts: [data] })
    onNext(data)
  }

  return (
    <section className="w-full items-start justify-center p-4 flex flex-col">
      <HeaderClientForms title="Formulários de Contatos" />
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-4 p-4 w-full border-2 shadow-lg rounded-md flex flex-col"
        >
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage>{errors.description?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="contact"
              render={({ field, fieldState }) => (
                <FormItem className="w-full">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="exemplo@dominio.com" />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex lg:flex-row flex-col w-full gap-2 items-center justify-between">
            <FormField
              name="type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tipo de Contato</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TELEFONE">Telefone fixo</SelectItem>
                        <SelectItem value="WHATSAPP">WhatsApp</SelectItem>
                        <SelectItem value="CELULAR">Celular</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name=""
              render={({ field, fieldState }) => (
                <FormItem className="w-full">
                  <FormLabel>Contato</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full items-center justify-center space-x-4">
            <Button className="w-full" type="submit" variant="success">
              Próximo
            </Button>
          </div>
        </form>
      </FormProvider>
    </section>
  )
}
