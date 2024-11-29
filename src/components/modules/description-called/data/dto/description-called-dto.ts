import { z } from "zod";

export const descriptionCalledSchema = z.object({
  id: z.number().optional(),
  description: z.string().min(3, "Descrição é obrigatória"),
});

export type TDescriptionCalledSchema = z.infer<typeof descriptionCalledSchema>;
