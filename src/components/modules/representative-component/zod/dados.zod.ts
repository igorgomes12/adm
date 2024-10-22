import { z } from 'zod'

export const schemaDadosGerais = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().min(3, { message: 'Favor digitar o nome do representante' }),
  region: z.string().min(1, { message: 'Favor digitar o nome da região' }),
  supervisor: z.string(),
  status: z.string(),
  type: z.enum(['REPRESENTATIVE', 'CONSULTANT', 'PARTHER']),
})
export type TSchemaDadosGerais = z.infer<typeof schemaDadosGerais>
