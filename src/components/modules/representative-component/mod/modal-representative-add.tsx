import api from '@/components/sing-in/api/interceptors-axios'
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
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { FaRocket } from 'react-icons/fa'
import { IoWarningOutline } from 'react-icons/io5'
import { Flip, toast } from 'react-toastify'
import { translateType } from '../table-representative'
import { representativeSchemaDto } from '../zod/representative.dto'
import { useCreateModalRepresentativeZustand } from '../zustand/modal-add-zustand'
import { Switch } from '@/components/ui/switch'
import { formatPhone } from '@/utils/regex/phones'
import { CreateRepresentativeSchemaDto } from '../zod/create-representative.dto'

export const ModalRepresentativeAdd = () => {
  const { onClose } = useCreateModalRepresentativeZustand()
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const form = useForm<CreateRepresentativeSchemaDto>({
    resolver: zodResolver(representativeSchemaDto),
    defaultValues: {
      name: '',
      type: 'REPRESENTATIVE',
      region: '',
      supervisor: '',
      commission: {
        implantation: 0,
        mensality: 0,
      },
      contact: {
        cellphone: '',
        phone: '',
        email: '',
      },
      address: {
        postal_code: '',
        street: '',
        number: '',
        neighborhood: '',
        municipality_name: '',
        state: '',
      },
    },
  })

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = form

  const options: Array<'REPRESENTATIVE' | 'CONSULTANT' | 'PARTHER'> = [
    'REPRESENTATIVE',
    'CONSULTANT',
    'PARTHER',
  ]

  const onSubmit = async (data: CreateRepresentativeSchemaDto) => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      await api.post('/representative', data)
      queryClient.invalidateQueries({ queryKey: ['get-representative'] })
      toast.success('Representante adicionado com sucesso!', {
        theme: 'dark',
        icon: <FaRocket />,
        progressStyle: { background: '#1f62cf' },
        transition: Flip,
      })
      onClose()
    } catch (error) {
      setErrorMessage('Erro ao cadastrar representante. Tente novamente.')
      toast.error(
        'Ocorreu um erro ao adicionar a contabilidade. Por favor, tente novamente.',
        {
          theme: 'colored',
          icon: <IoWarningOutline />,
          transition: Flip,
        },
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-4 sm:w-2/3 lg:w-7/12 h-auto ">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          Cadastro de Representantes
        </h1>
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="gap-4 flex flex-col"
          >
            <div className="flex w-full gap-2">
              <FormField
                control={form.control}
                name="name"
                render={() => (
                  <FormItem className="w-full">
                    <FormLabel>Nome do Representante</FormLabel>
                    <FormControl>
                      <Controller
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Nome do representante"
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage>{errors.name?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Tipo</FormLabel>
                    <FormControl>
                      <div className="flex w-full">
                        {options.map(option => (
                          <div
                            key={option}
                            className="flex items-center gap-2 p-2"
                          >
                            <Switch
                              id={option}
                              checked={field.value === option}
                              onCheckedChange={() => field.onChange(option)}
                              className="gap-2"
                            />
                            <label
                              htmlFor={option}
                              className="cursor-pointer text-sm"
                            >
                              {translateType(option)}
                            </label>
                          </div>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage>{errors.type?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full gap-2">
              <FormField
                control={form.control}
                name="region"
                render={() => (
                  <FormItem className="w-full">
                    <FormLabel>Região de Atuação</FormLabel>
                    <FormControl>
                      <Controller
                        name="region"
                        control={form.control}
                        render={({ field }) => (
                          <Input {...field} placeholder="Região de Atuação" />
                        )}
                      />
                    </FormControl>
                    <FormMessage>{errors.region?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="supervisor"
                render={() => (
                  <FormItem className="w-full">
                    <FormLabel>Supervisor</FormLabel>
                    <FormControl>
                      <Controller
                        name="supervisor"
                        control={form.control}
                        render={({ field }) => (
                          <Input {...field} placeholder="Supervisor" />
                        )}
                      />
                    </FormControl>
                    <FormMessage>{errors.supervisor?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full gap-2">
              <div className="card border-2 p-3 rounded-lg flex flex-col w-full gap-2">
                <span className="underline p-1.5 text-lg font-semibold">
                  Comissão
                </span>
                <div className="flex w-full gap-2">
                  <FormField
                    control={form.control}
                    name="commission.implantation"
                    render={() => (
                      <FormItem className="w-full">
                        <FormLabel>Implantação</FormLabel>
                        <FormControl>
                          <Controller
                            name="commission.implantation"
                            control={form.control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                type="number"
                                placeholder="Implantação"
                              />
                            )}
                          />
                        </FormControl>
                        <FormMessage>
                          {errors.commission?.implantation?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="commission.mensality"
                    render={() => (
                      <FormItem className="w-full">
                        <FormLabel>Mensalidade</FormLabel>
                        <FormControl>
                          <Controller
                            name="commission.mensality"
                            control={form.control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                type="number"
                                placeholder="Mensalidade"
                              />
                            )}
                          />
                        </FormControl>
                        <FormMessage>
                          {errors.commission?.mensality?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="card border-2 p-3 rounded-lg flex flex-col w-full gap-2">
                <span className="underline p-1.5 text-lg font-semibold">
                  Contato
                </span>
                <div className="flex w-full gap-2">
                  <FormField
                    control={form.control}
                    name="contact.cellphone"
                    render={() => (
                      <FormItem className="w-full">
                        <FormLabel>Celular</FormLabel>
                        <FormControl>
                          <Controller
                            name="contact.cellphone"
                            control={form.control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="(XX) XXXXX-XXXX"
                                onBlur={() =>
                                  setValue(
                                    'contact.cellphone',
                                    formatPhone(field.value),
                                  )
                                }
                              />
                            )}
                          />
                        </FormControl>
                        <FormMessage>
                          {errors.contact?.cellphone?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contact.phone"
                    render={() => (
                      <FormItem className="w-full">
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Controller
                            name="contact.phone"
                            control={form.control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="(XX) XXXX-XXXX"
                                onBlur={() =>
                                  setValue(
                                    'contact.phone',
                                    formatPhone(field.value),
                                  )
                                }
                              />
                            )}
                          />
                        </FormControl>
                        <FormMessage>
                          {errors.contact?.phone?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contact.email"
                    render={() => (
                      <FormItem className="w-full">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Controller
                            name="contact.email"
                            control={form.control}
                            render={({ field }) => (
                              <Input {...field} placeholder="Email" />
                            )}
                          />
                        </FormControl>
                        <FormMessage>
                          {errors.contact?.email?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full gap-2">
              <div className="card border-2 p-3 rounded-lg flex flex-col w-full gap-2">
                <span className="underline p-1.5 text-lg font-semibold">
                  Endereço
                </span>
                <div className="flex w-full gap-2">
                  <FormField
                    control={form.control}
                    name="address.postal_code"
                    render={() => (
                      <FormItem className="w-96">
                        <FormLabel>Cep</FormLabel>
                        <FormControl>
                          <Controller
                            name="address.postal_code"
                            control={form.control}
                            render={({ field }) => (
                              <Input {...field} placeholder="Cep" />
                            )}
                          />
                        </FormControl>
                        <FormMessage>
                          {errors.address?.postal_code?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.street"
                    render={() => (
                      <FormItem className="w-full">
                        <FormLabel>Logradouro</FormLabel>
                        <FormControl>
                          <Controller
                            name="address.street"
                            control={form.control}
                            render={({ field }) => (
                              <Input {...field} placeholder="Logradouro" />
                            )}
                          />
                        </FormControl>
                        <FormMessage>
                          {errors.address?.street?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.number"
                    render={() => (
                      <FormItem className="w-60">
                        <FormLabel>Número</FormLabel>
                        <FormControl>
                          <Controller
                            name="address.number"
                            control={form.control}
                            render={({ field }) => (
                              <Input {...field} placeholder="Número" />
                            )}
                          />
                        </FormControl>
                        <FormMessage>
                          {errors.address?.number?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex w-full gap-2">
                  <FormField
                    control={form.control}
                    name="address.neighborhood"
                    render={() => (
                      <FormItem className="w-full">
                        <FormLabel>Bairro</FormLabel>
                        <FormControl>
                          <Controller
                            name="address.neighborhood"
                            control={form.control}
                            render={({ field }) => (
                              <Input {...field} placeholder="Bairro" />
                            )}
                          />
                        </FormControl>
                        <FormMessage>
                          {errors.address?.neighborhood?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.municipality_name"
                    render={() => (
                      <FormItem className="w-full">
                        <FormLabel>Município</FormLabel>
                        <FormControl>
                          <Controller
                            name="address.municipality_name"
                            control={form.control}
                            render={({ field }) => (
                              <Input {...field} placeholder="Município" />
                            )}
                          />
                        </FormControl>
                        <FormMessage>
                          {errors.address?.municipality_name?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.state"
                    render={() => (
                      <FormItem className="w-[22rem]">
                        <FormLabel>UF</FormLabel>
                        <FormControl>
                          <Controller
                            name="address.state"
                            control={form.control}
                            render={({ field }) => (
                              <Input {...field} placeholder="UF" />
                            )}
                          />
                        </FormControl>
                        <FormMessage>
                          {errors.address?.state?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-2 mt-4">
              <Button
                className="w-full"
                variant="destructive"
                onClick={onClose}
                type="button"
                disabled={isLoading}
              >
                Fechar
              </Button>
              <Button
                className="w-full"
                type="submit"
                variant="success"
                disabled={isLoading}
              >
                {isLoading ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
