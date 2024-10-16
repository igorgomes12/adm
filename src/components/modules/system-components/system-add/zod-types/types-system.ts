import { z } from 'zod'

export const SystemSchemaDto = z.object({
  id: z
    .number()
    .int()
    .positive({ message: 'Necessário digitar o ID do sistema' })
    .optional(),
  name: z.string().min(1, { message: 'Necessário digitar o nome do sistema' }),
  image_url: z
    .union([
      z.string().url('URL inválida'),
      z.instanceof(File, { message: 'Deve ser um arquivo válido' }),
    ])
    .optional(),
  description: z.string().min(1, 'A descrição é obrigatória'),
  stable_version: z.string().optional(),
})

export type TSystemSchemaDto = z.infer<typeof SystemSchemaDto>
