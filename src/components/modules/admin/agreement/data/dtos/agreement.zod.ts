import { z } from "zod";

export const TSchemaAgreementDto = z.object({
  id: z.number().int().positive().optional(),
  client: z.string().min(3, { message: "Necessário colocar um nome válido" }),
  description: z
    .string()
    .min(3, { message: "Necessário colocar um nome válido" }),
});

export type TSchemaAgreementDtoForm = z.infer<typeof TSchemaAgreementDto>;
