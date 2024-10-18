import { z } from 'zod'

export const representativeSchemaDto = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().min(3, { message: 'Favor digitar o nome do representante' }),
  cellphone: z.string(),
  phone: z.string(),
  type: z.enum(['REPRESENTATIVE', 'CONSULTANT', 'PARTHER']),
  region: z.string().min(1, { message: 'Favor digitar o nome da região' }),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted_at: z.date().nullable().optional(),
  deleted_by: z.string().nullable().optional(),
})

export type TRepresentativeSchemaDto = z.infer<typeof representativeSchemaDto>
