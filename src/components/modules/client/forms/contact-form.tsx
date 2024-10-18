import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { FC } from 'react'
import {
  FormProvider,
  useForm,
  useFieldArray,
  Controller,
} from 'react-hook-form'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { Textarea } from '@/components/ui/textarea'
import type { TClient } from '../zod-form/zod_client.schema'
import { ContactSchema, type TContact } from '../zod-form/zod_contact.schema'
import { zodResolver } from '@hookform/resolvers/zod'

const applyMask = (value: string, mask: string): string => {
  let formattedValue = ''
  let maskIndex = 0
  for (let i = 0; i < value.length && maskIndex < mask.length; i++) {
    if (/\d/.test(value[i])) {
      while (maskIndex < mask.length && mask[maskIndex] !== '9') {
        formattedValue += mask[maskIndex++]
      }
      formattedValue += value[i]
      maskIndex++
    }
  }
  return formattedValue
}

export const ContactForm: FC<{ onNext: (data: TClient) => void }> = ({
  onNext,
}) => {
  const form = useForm<TContact>({
    // resolver: zodResolver(ContactSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'telefones',
  })

  const handleAddPhone = () => {
    append({ number: '', type: 'TELEFONE' })
  }

  const getMask = (type: string) => {
    switch (type) {
      case 'whatsApp':
      case 'celular':
        return '(99) 99999-9999'
      case 'fixo':
        return '(99) 9999-9999'
      default:
        return ''
    }
  }

  const submitForm = async (data: TContact) => {
    try {
      onNext(data as unknown as TClient)
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error)
    }
  }

  return (
    <div className="flex flex-col p-4 w-full h-screen">
      <div className="flex w-full items-start justify-start">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          Formulário de Contatos
        </h1>
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex border bg-white rounded-xl shadow-lg p-4 flex-col space-y-4 w-full "
        >
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="contact"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nome do contato</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              render={({ field, fieldState }) => (
                <FormItem className="w-full">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="exemplo@dominio.com"
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="flex lg:flex-row flex-col w-full gap-2 items-center justify-between"
            >
              <FormField
                name={`telefones.${index}.type` as const}
                render={() => (
                  <FormItem className="w-full">
                    <FormLabel>Tipo de Contato</FormLabel>
                    <FormControl>
                      <Controller
                        control={form.control}
                        name={`telefones.${index}.type` as const}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fixo">
                                Telefone fixo
                              </SelectItem>
                              <SelectItem value="whatsApp">WhatsApp</SelectItem>
                              <SelectItem value="celular">Celular</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={`telefones.${index}.number` as const}
                render={({ field }) => (
                  <FormItem className="w-[95%]">
                    <FormLabel>Contatos</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={e => {
                          const mask = getMask(
                            form.getValues(`telefones.${index}.type`),
                          )
                          field.onChange(applyMask(e.target.value, mask))
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {index > 0 && (
                <FaTrash
                  onClick={() => remove(index)}
                  className=" w-8 h-8 cursor-pointer text-red-500"
                />
              )}
            </div>
          ))}
          <Button
            type="button"
            onClick={handleAddPhone}
            variant="secondary"
            className="flex items-center"
          >
            <FaPlus className="mr-2" /> Adicionar contatos
          </Button>
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
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
