import { z } from 'zod'

export const schemaEnterpriseDto = z.object({
  corporate_name: z.string().min(1, 'O nome corporativo é obrigatório'),
  fantasy_name: z.string().min(1, 'O nome fantasia é obrigatório'),
  cpf_cnpj: z.string().min(1, 'O CNPJ é obrigatório'),
  state_registration: z.string().optional(),
  municipal_registration: z.string().optional(),
  rural_registration: z.string().optional(),
})

export type EnterpriseDto = z.infer<typeof schemaEnterpriseDto>
