import { z } from 'zod'

export const commissionRepresentativeSchemaDto = z.object({
  implantation: z
    .number()
    .min(0, { message: 'O valor de implantação não pode ser negativo.' })
    .optional(),
  mensality: z
    .number()
    .min(0, { message: 'O valor de mensalidade não pode ser negativo.' })
    .optional(),
})

export type CommissionRepresentativeDto = z.infer<
  typeof commissionRepresentativeSchemaDto
>
