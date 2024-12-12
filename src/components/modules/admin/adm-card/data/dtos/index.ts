import { z } from "zod";

export const AdministrationCardSchema = z.object({
  id: z.number().int().positive().optional(),
  moviment: z.date(),
  forgod: z.date(),
  admin: z.string(),
  value: z.string(),
  autorization: z.number(),
  qtd_parcelas: z.number(),
  document: z.number(),
});

export type AdministrationCardSchemaDto = z.infer<
  typeof AdministrationCardSchema
>;
