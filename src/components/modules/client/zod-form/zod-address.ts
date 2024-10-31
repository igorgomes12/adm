import { z } from 'zod'

export const addressSchema = z.object({
  postal_code: z.string().min(8, 'O CEP deve ter pelo menos 8 caracteres'),
  street: z.string().min(1, 'O endereço é obrigatório'),
  neighborhood: z.string().min(1, 'O bairro é obrigatório'),
  municipality_name: z.string().min(1, 'O município é obrigatório'),
  state: z.string().length(2, 'UF deve ter 2 caracteres'),
  number: z.string().optional(),
  complement: z.string().optional(),
})

export type addressSchemaType = z.infer<typeof addressSchema>
