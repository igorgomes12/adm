import { z } from 'zod'

export const OwnerSchema = z.object({
  name: z.string().min(1, 'O nome deve ter pelo menos 1 caractere'),
  cpf_cnpj: z.string().min(11, 'CPF/CNPJ deve ter pelo menos 11 caracteres'),
  // biome-ignore lint/suspicious/noGlobalIsNan: <explanation>
  birth_date: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: 'Data de nascimento inválida',
  }),
  observation: z.string().optional(),
})

export type TOwner = z.infer<typeof OwnerSchema>
