import { z } from 'zod'

export const signInSchemaDto = z.object({
  email: z
    .string()
    .min(1, { message: 'O email é obrigatório' })
    .email({ message: 'Email inválido' }),
  password: z.string().min(1, { message: 'A senha é obrigatória' }),
})

export type SignInFormDto = z.infer<typeof signInSchemaDto>
