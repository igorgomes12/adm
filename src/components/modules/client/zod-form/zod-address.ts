import { z } from 'zod'

export const addressSchema = z.object({
  cep: z.string().min(8, 'O CEP deve ter pelo menos 8 caracteres'),
  street: z.string().min(1, 'O endereço é obrigatório'),
  bairro: z.string().min(1, 'O bairro é obrigatório'),
  municipio: z.string().min(1, 'O município é obrigatório'),
  UF: z.string().length(2, 'UF deve ter 2 caracteres'),
  number: z.string().optional(),
  complement: z.string().optional(),
})

export type addressSchemaType = z.infer<typeof addressSchema>
