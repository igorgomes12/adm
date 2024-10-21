import z from 'zod'

export const contactRepresentativeSchemaDto = z.object({
  cellphone: z.string(),
  phone: z.string(),
  email: z.string(),
})
export type ContactRepresentativeDto = z.infer<
  typeof contactRepresentativeSchemaDto
>
