import { z } from 'zod'

export const UserEditSchemaDto = z.object({
  id: z
    .number()
    .int()
    .positive({ message: 'O ID do usuario é obrigatorio' })
    .optional(),
  name: z.string().min(1, { message: 'O nome do usuario é obrigatorio' }),
  email: z.string().email({ message: 'O email do usuario deve ser valido' }),
  password: z.string().optional(),
  channel: z.number().optional(),
  status: z.enum(['ativo', 'inativo']).default('ativo'),
  organization: z.enum(['lider', 'Quality']).optional(),
})

export type TUserEditSchemaDto = z.infer<typeof UserEditSchemaDto>
