import z from 'zod'

export const commissionRepresentativeSchemaDto = z.object({
  implantation: z.number().int().positive(),
  mensality: z.number().int().positive(),
})

export type CommissionRepresentativeDto = z.infer<
  typeof commissionRepresentativeSchemaDto
>
