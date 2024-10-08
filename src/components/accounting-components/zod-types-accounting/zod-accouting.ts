import { z } from 'zod'

export const SchemaAccoutingDto = z.object({
  id: z
    .number()
    .int()
    .positive({ message: 'Necessário digitar o ID da contabilidade' }),
  name: z
    .string()
    .min(1, { message: 'Necessário digitar o nome da contabilidade' }),
  phone: z.string(),
  crc: z.string(),
  cpnj: z.string(),
})
export type TSchemaAccountingDto = z.infer<typeof SchemaAccoutingDto>
