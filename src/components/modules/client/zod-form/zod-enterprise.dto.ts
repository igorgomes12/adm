import { z } from 'zod'

export const schemaEnterpriseDto = z.object({
  id: z.number().optional(),
  corporate_name: z.string().optional(),
  fantasy_name: z.string().optional(),
  cpf_cnpj: z.string().optional(),
  state_registration: z.string().optional(),
  municipal_registration: z.string().optional(),
  rural_registration: z.string().optional(),
  name_account: z.string().optional(),
  createdAt: z.string().optional(),
})

export type EnterpriseDto = z.infer<typeof schemaEnterpriseDto>
