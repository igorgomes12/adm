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
import { FormProvider, useForm } from 'react-hook-form'

export const EnterpriseForm: FC<{ onNext: () => void }> = ({ onNext }) => {
  const form = useForm()

  return (
    <div className="flex flex-col p-4  w-full h-screen">
      <div className="flex w-full items-start justify-start ">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          Formulário da Empresa
        </h1>
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onNext)}
          className="flex border bg-white rounded-xl shadow-lg p-4 flex-col space-y-4 w-full "
          action=""
        >
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="cód"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Código</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="Data de cadastro"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Data Cadastro</FormLabel>
                  <Input type="date" disabled {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Razão Social</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="fantasy"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nome Fantasia</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="cnpj"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex lg:flex-row flex-col  w-full gap-2 items-start justify-between">
            <FormField
              name="state_registration"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Incrição Estadual</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="municipal"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Incrição Municipal</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="rural_Registration"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Incrição Rural</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex lg:flex-row flex-col w-full gap-2 items-center justify-between">
            <FormField
              name={'type_establishment'}
              render={() => (
                <FormItem className="w-full">
                  <FormLabel>Tipo Estabelecimento</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixo">Loja</SelectItem>
                        <SelectItem value="whatsApp">loja1</SelectItem>
                        <SelectItem value="celular">loja 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="Regime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Regime Apuração</FormLabel>
                  <Input {...field} />
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
