import { z } from 'zod'

export const contactSchemaDto = z.object({
  description: z.string(),
  contact: z.string().email(),
  type: z.enum(['TELEFONE', 'WHATSAPP', 'CELULAR']),
  favorite: z.boolean(),
})

export type TContactDto = z.infer<typeof contactSchemaDto>
