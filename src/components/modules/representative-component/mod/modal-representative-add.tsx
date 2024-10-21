// import api from '@/components/sing-in/api/interceptors-axios'
// import { Button } from '@/components/ui/button'
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useQueryClient } from '@tanstack/react-query'
// import { useState } from 'react'
// import { Controller, FormProvider, useForm } from 'react-hook-form'
// import { FaRocket } from 'react-icons/fa'
// import { IoWarningOutline } from 'react-icons/io5'
// import { Flip, toast } from 'react-toastify'
// import { translateType } from '../table-representative'
// import { representativeSchemaDto } from '../zod/representative.dto'
// import { useCreateModalRepresentativeZustand } from '../zustand/modal-add-zustand'
// import { Switch } from '@/components/ui/switch'
// import { formatPhone } from '@/utils/regex/phones'
// import { CreateRepresentativeSchemaDto } from '../zod/create-representative.dto'
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

// export const ModalRepresentativeAdd = () => {
//   const { onClose } = useCreateModalRepresentativeZustand()
//   const queryClient = useQueryClient()
//   const [isLoading, setIsLoading] = useState(false)
//   const [errorMessage, setErrorMessage] = useState('')

//   const form = useForm<CreateRepresentativeSchemaDto>({
//     resolver: zodResolver(representativeSchemaDto),
//     defaultValues: {
//       name: '',
//       type: 'REPRESENTATIVE',
//       region: '',
//       supervisor: '',
//       commission: {
//         implantation: 0,
//         mensality: 0,
//       },
//       contact: {
//         cellphone: '',
//         phone: '',
//         email: '',
//       },
//       address: {
//         postal_code: '',
//         street: '',
//         number: '',
//         neighborhood: '',
//         municipality_name: '',
//         state: '',
//       },
//     },
//   })

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = form

//   const options: Array<'REPRESENTATIVE' | 'CONSULTANT' | 'PARTHER'> = [
//     'REPRESENTATIVE',
//     'CONSULTANT',
//     'PARTHER',
//   ]

//   const onSubmit = async (data: CreateRepresentativeSchemaDto) => {
//     setIsLoading(true)
//     setErrorMessage('')
//     try {
//       await api.post('/representative', data)
//       queryClient.invalidateQueries({ queryKey: ['get-representative'] })
//       toast.success('Representante adicionado com sucesso!', {
//         theme: 'dark',
//         icon: <FaRocket />,
//         progressStyle: { background: '#1f62cf' },
//         transition: Flip,
//       })
//       onClose()
//     } catch (error) {
//       setErrorMessage('Erro ao cadastrar representante. Tente novamente.')
//       toast.error(
//         'Ocorreu um erro ao adicionar a contabilidade. Por favor, tente novamente.',
//         {
//           theme: 'colored',
//           icon: <IoWarningOutline />,
//           transition: Flip,
//         },
//       )
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-4 sm:w-2/3 lg:w-7/12 h-auto ">
//         <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
//           Cadastro de Representantes
//         </h1>
//         {errorMessage && (
//           <div className="text-red-500 text-center mb-4">{errorMessage}</div>
//         )}
//         <FormProvider {...form}>
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="gap-4 flex flex-col"
//           >
//             <div className="flex w-full gap-2">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field: { value } }) => (
//                   <FormItem className="w-full">
//                     <FormLabel>Nome do Representante</FormLabel>
//                     <FormControl>
//                       <Controller
//                         name="name"
//                         control={form.control}
//                         render={({ field }) => (
//                           <Input
//                             {...field}
//                             defaultValue={value}
//                             placeholder="Nome do representante"
//                           />
//                         )}
//                       />
//                     </FormControl>
//                     <FormMessage>{errors.name?.message}</FormMessage>
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="type"
//                 render={({ field }) => (
//                   <FormItem className="w-full border">
//                     <FormLabel>Tipo</FormLabel>
//                     <FormControl>
//                       <div className="flex flex-col items-start justify-between w-full">
//                         {options.map(option => (
//                           <div
//                             key={option}
//                             className="flex flex-col items-center gap-2 p-2"
//                           >
//                             <RadioGroup defaultValue="comfortable">
//                               <div className="flex gap-2">
//                                 <RadioGroupItem value="Representante" id="1" />
//                                 <label
//                                   htmlFor={option}
//                                   className="cursor-pointer text-sm"
//                                 >
//                                   {translateType(option)}
//                                 </label>
//                               </div>
//                             </RadioGroup>
//                           </div>
//                         ))}
//                       </div>
//                     </FormControl>
//                     <FormMessage>{errors.type?.message}</FormMessage>
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <div className="flex w-full gap-2">
//               <FormField
//                 control={form.control}
//                 name="region"
//                 render={({ field }) => (
//                   <FormItem className="w-full">
//                     <FormLabel>Região de Atuação</FormLabel>
//                     <FormControl>
//                       <Input
//                         {...register('region')}
//                         placeholder="Região de Atuação"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage>{errors.region?.message}</FormMessage>
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="supervisor"
//                 render={({ field }) => (
//                   <FormItem className="w-full">
//                     <FormLabel>Supervisor</FormLabel>
//                     <FormControl>
//                       <Input
//                         {...register('supervisor')}
//                         placeholder="Supervisor"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage>{errors.supervisor?.message}</FormMessage>
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <div className="flex w-full gap-2">
//               <div className="card border-2 p-3 rounded-lg flex flex-col w-full gap-2">
//                 <span className="underline p-1.5 text-lg font-semibold">
//                   Comissão
//                 </span>
//                 <div className="flex w-full gap-2">
//                   <FormField
//                     control={form.control}
//                     name="commission.implantation"
//                     render={({ field }) => (
//                       <FormItem className="w-full">
//                         <FormLabel>Implantação</FormLabel>
//                         <FormControl>
//                           <Input
//                             {...register('commission.implantation', {
//                               valueAsNumber: true,
//                             })}
//                             type="number"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage>
//                           {errors.commission?.implantation?.message}
//                         </FormMessage>
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="commission.mensality"
//                     render={({ field }) => (
//                       <FormItem className="w-full">
//                         <FormLabel>Mensalidade</FormLabel>
//                         <FormControl>
//                           <Input
//                             {...register('commission.mensality', {
//                               valueAsNumber: true,
//                             })}
//                             type="number"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage>
//                           {errors.commission?.mensality?.message}
//                         </FormMessage>
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>
//               <div className="card border-2 p-3 rounded-lg flex flex-col w-full gap-2">
//                 <span className="underline p-1.5 text-lg font-semibold">
//                   Contato
//                 </span>
//                 <div className="flex w-full gap-2">
//                   <FormField
//                     control={form.control}
//                     name="contact.cellphone"
//                     render={({ field }) => (
//                       <FormItem className="w-full">
//                         <FormLabel>Celular</FormLabel>
//                         <FormControl>
//                           <Input
//                             {...register('contact.cellphone')}
//                             placeholder="(XX) XXXXX-XXXX"
//                             {...field}
//                             onBlur={() =>
//                               setValue(
//                                 'contact.cellphone',
//                                 formatPhone(field.value),
//                               )
//                             } // Formata ao perder o foco
//                           />
//                         </FormControl>
//                         <FormMessage>
//                           {errors && errors.contact?.cellphone?.message}
//                         </FormMessage>
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="contact.phone"
//                     render={({ field }) => (
//                       <FormItem className="w-full">
//                         <FormLabel>Telefone</FormLabel>
//                         <FormControl>
//                           <Input
//                             {...register('contact.phone')}
//                             placeholder="(XX) XXXX-XXXX"
//                             {...field}
//                             onBlur={() =>
//                               setValue(
//                                 'contact.phone',
//                                 formatPhone(field.value),
//                               )
//                             }
//                           />
//                         </FormControl>
//                         <FormMessage>
//                           {errors && errors.contact?.phone?.message}
//                         </FormMessage>
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="contact.email"
//                     render={({ field }) => (
//                       <FormItem className="w-full">
//                         <FormLabel>Email</FormLabel>
//                         <FormControl>
//                           <Input
//                             {...register('contact.email')}
//                             placeholder="contact.email"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage>
//                           {errors && errors.contact?.email?.message}
//                         </FormMessage>
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="flex w-full gap-2">
//               <div className="card border-2 p-3 rounded-lg flex flex-col w-full gap-2">
//                 <span className="underline p-1.5 text-lg font-semibold">
//                   Endereço
//                 </span>
//                 <div className="flex w-full gap-2">
//                   <FormField
//                     control={form.control}
//                     name="address.postal_code"
//                     render={({ field }) => (
//                       <FormItem className="w-96">
//                         <FormLabel>Cep</FormLabel>
//                         <FormControl>
//                           <Input
//                             {...register('address.postal_code')}
//                             placeholder="Cep"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage>
//                           {errors.address?.postal_code?.message}
//                         </FormMessage>
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="address.street"
//                     render={({ field }) => (
//                       <FormItem className="w-full">
//                         <FormLabel>Logadouro</FormLabel>
//                         <FormControl>
//                           <Input
//                             {...register('address.street')}
//                             placeholder="Logadouro"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage>
//                           {errors.address?.street?.message}
//                         </FormMessage>
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="address.number"
//                     render={({ field }) => (
//                       <FormItem className="w-60">
//                         <FormLabel>Número</FormLabel>
//                         <FormControl>
//                           <Input
//                             {...register('address.number')}
//                             placeholder="Numero"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage>
//                           {errors.address?.number?.message}
//                         </FormMessage>
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//                 <div className="flex w-full gap-2">
//                   <FormField
//                     control={form.control}
//                     name="address.neighborhood"
//                     render={({ field }) => (
//                       <FormItem className="w-full">
//                         <FormLabel>Bairro</FormLabel>
//                         <FormControl>
//                           <Input
//                             {...register('address.neighborhood')}
//                             placeholder="Bairro"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage>
//                           {errors.address?.neighborhood?.message}
//                         </FormMessage>
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="address.municipality_name"
//                     render={({ field }) => (
//                       <FormItem className="w-full">
//                         <FormLabel>Município</FormLabel>
//                         <FormControl>
//                           <Input
//                             {...register('address.municipality_name')}
//                             placeholder="Municipio"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage>
//                           {errors.address?.municipality_name?.message}
//                         </FormMessage>
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="address.state"
//                     render={({ field }) => (
//                       <FormItem className="w-[22rem]">
//                         <FormLabel>UF</FormLabel>
//                         <FormControl>
//                           <Input
//                             {...register('address.state')}
//                             placeholder="UF"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage>
//                           {errors.address?.state?.message}
//                         </FormMessage>
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row justify-center gap-2 mt-4">
//               <Button
//                 className="w-full"
//                 variant="destructive"
//                 onClick={onClose}
//                 type="button"
//                 disabled={isLoading}
//               >
//                 Fechar
//               </Button>
//               <Button
//                 className="w-full"
//                 type="submit"
//                 variant="success"
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Salvando...' : 'Salvar'}
//               </Button>
//             </div>
//           </form>
//         </FormProvider>
//       </div>
//     </div>
//   )
// }
