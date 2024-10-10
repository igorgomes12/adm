import { z } from 'zod'

const ProfileEnum = z.enum([
  'ADMIN',
  'FINANCE',
  'REPRESENTATIVE',
  'REPRESENTATIVE_SUPERVISOR',
  'PROGRAMMING',
  'PROGRAMMING_SUPERVISOR',
  'SUPPORT',
  'SUPPORT_SUPERVISOR',
])

export const UserSchemaDto = z.object({
  id: z
    .number()
    .int()
    .positive({ message: 'O ID do usuário é obrigatório' })
    .optional(),
  name: z
    .string()
    .min(1, { message: 'O nome do usuário é obrigatório' })
    .min(5, { message: 'O nome do usuário deve ter pelo menos 5 caracteres' })
    .max(100, {
      message: 'O nome do usuário deve ter no máximo 100 caracteres',
    }),

  email: z
    .string()
    .email({ message: 'O e-mail do usuário deve ser válido' })
    .min(1, { message: 'O e-mail do usuário é obrigatório' }),

  password: z
    .string()
    .min(1, { message: 'A senha do usuário é obrigatória' })
    .min(8, { message: 'A senha do usuário deve ter pelo menos 8 caracteres' })
    .max(100, {
      message: 'A senha do usuário deve ter no máximo 100 caracteres',
    })
    .refine(password => /[A-Z]/.test(password), {
      message: 'A senha deve conter pelo menos uma letra maiúscula',
    })
    .refine(password => /[a-z]/.test(password), {
      message: 'A senha deve conter pelo menos uma letra minúscula',
    })
    .refine(password => /(\d|\W)/.test(password), {
      message: 'A senha deve conter pelo menos um número ou caractere especial',
    }),

  channel: z.number().optional(),

  profile: z.union([ProfileEnum, z.array(ProfileEnum)]),

  status: z.enum(['ativo', 'inativo']).default('ativo'),

  organization: z.enum(['lider', 'Quality']).optional(),
  profileId: z.number().optional(),
})
export type TUserSchemaDto = z.infer<typeof UserSchemaDto>
