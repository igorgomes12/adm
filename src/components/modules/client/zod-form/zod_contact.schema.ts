import { z } from 'zod'

export const TypeEnum = z.enum(['TELEFONE', 'CELULAR', 'EMAIL', 'WHATSAPP'])

export const PhoneSchema = z.object({
  number: z.string().min(1, 'Número é obrigatório'),
  type: TypeEnum,
})

export const ContactSchema = z.object({
  name: z.string().min(1, 'Descrição é obrigatória'),
  contact: z.string().min(1, 'Contato é obrigatório'),
  telefones: z.array(PhoneSchema),
  main_account: z.boolean(),
})

export type TContact = z.infer<typeof ContactSchema>
