import { z } from 'zod'

export const ContactSchema = z.object({
  name: z.string().nonempty('O nome é obrigatório'),
  contact: z
    .string()
    .email('Digite um e-mail válido')
    .nonempty('O e-mail é obrigatório'),
  telefones: z.array(
    z.object({
      number: z.string().nonempty('O número é obrigatório'),
      type: z.enum(['TELEFONE', 'WHATSAPP', 'CELULAR']),
      favorite: z.boolean().default(false),
    }),
  ),
  description: z.string().optional(),
})

export type TContact = z.infer<typeof ContactSchema>
