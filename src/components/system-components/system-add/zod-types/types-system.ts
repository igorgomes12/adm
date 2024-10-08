import { z } from 'zod'

export const SystemSchemaDto = z.object({
  id: z
    .number()
    .int()
    .positive({ message: 'Necessário digitar o ID do sistema' }),
  name: z.string().min(1, { message: 'Necessário digitar o nome do sistema' }),
})
export type TSystemSchemaDto = z.infer<typeof SystemSchemaDto>
