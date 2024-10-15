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
import { FormProvider, useForm, useFieldArray } from 'react-hook-form'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { Textarea } from '@/components/ui/textarea'

export const ContactForm: FC<{ onNext: () => void }> = ({ onNext }) => {
  const form = useForm()
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'telefones',
  })

  const handleAddPhone = () => {
    append({ number: '', type: '' })
  }

  const getMask = (type: string) => {
    switch (type) {
      case 'whatsApp':
      case 'celular':
        return '(99) 99999-9999'
      case 'fixo':
        return '(99) 9999-9999'
      case 'email':
        return ''
      default:
        return ''
    }
  }

  return (
    <div className="flex flex-col p-4 space-x-4 space-y-2 w-full h-screen">
      <div className="flex w-full items-start justify-start p-4">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          Contatos da Empresa
        </h1>
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onNext)}
          className="flex border bg-white rounded-xl shadow-lg p-4 flex-col space-y-4 w-full "
        >
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="contato"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Contato</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>E-mail</FormLabel>
                  <Input {...field} />
                  <FormMessage />
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
                name={`telefones[${index}].number`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={getMask(
                          form.getValues(`telefones[${index}].type`),
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={`telefones[${index}].type`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Tipo de Contato</FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="telefone">Telefone</SelectItem>
                          <SelectItem value="whatsApp">WhatsApp</SelectItem>
                          <SelectItem value="celular">Celular</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FaTrash
                onClick={() => remove(index)}
                className="mr-2 w-10 h-10 cursor-pointer text-red-500"
              />
            </div>
          ))}
          <Button
            type="button"
            onClick={handleAddPhone}
            variant="secondary"
            className="flex items-center"
          >
            <FaPlus className="mr-2" /> Adicionar Telefone
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
