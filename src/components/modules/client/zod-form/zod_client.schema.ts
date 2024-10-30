import { z } from 'zod'
import { AddressSchema, ContactSchema, OwnerSchema } from '.'

export const ClientSchema = z.object({
  id: z.number().int().positive().optional(),
  inDebt: z.boolean().optional(),
  identifier: z.string().uuid().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().nullable().optional(),
  corporate_name: z.string().nonempty('Corporate name is required'),
  fantasy_name: z.string().optional(),
  contacts: z.array(ContactSchema).min(1).max(5),
  cpf_cnpj: z.string().min(11).max(18),
  state_registration: z.string().min(1),
  municipal_registration: z.string().nullable(),
  rural_registration: z.string().nullable(),
  address: z.array(AddressSchema).min(1).max(10),
  name_account: z.string(),
  id_account: z.number().int().positive(),
  establishment_typeId: z.number().int().positive(),
  systemsId: z.number().int().positive(),
  owner: z.array(OwnerSchema).min(1).max(1),
})

export type TClient = z.infer<typeof ClientSchema>
