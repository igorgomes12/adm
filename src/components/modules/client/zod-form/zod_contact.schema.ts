import { z } from 'zod'

export const TypeEnum = z.enum(['TELEFONE', 'CELULAR', 'EMAIL', 'WHATSAPP'])

export const PhoneSchema = z.object({
  number: z.string().min(1, 'Número é obrigatório'),
  type: TypeEnum,
})

export const ContactSchema = z.object({
  id: z.number().int().positive().optional(),
  description: z.string().min(1, 'Descrição é obrigatória'),
  contact: z.string().min(1, 'Contato é obrigatório'),
  telefones: z.array(PhoneSchema),
  main_account: z.boolean(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
  clientId: z.number().int().positive().optional(),
})

export type TContact = z.infer<typeof ContactSchema>
