import { z } from 'zod'

export const SchemaAccoutingDto = z.object({
  id: z
    .number()
    .int()
    .positive({ message: 'Necessário digitar o ID da contabilidade' })
    .optional(),
  name: z
    .string()
    .min(1, { message: 'Necessário digitar o nome da contabilidade' }),
  phone: z.string(),
  email: z.string(),
  contact: z.string(),
  crc: z.string(),
  cnpj: z.string(),
})
export type TSchemaAccountingDto = z.infer<typeof SchemaAccoutingDto>
