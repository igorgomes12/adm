import { z } from "zod";

export enum BudgetType {
  ABERTO = "Aberto",
  FECHADO = "Fechado",
  CANCELADO = "Cancelado",
}

export const BudgetSchema = z.object({
  id: z.number().int().positive().optional(),
  dataEmissao: z.date(),
  status: z.nativeEnum(BudgetType),
  cliente: z.string(),
  valor: z.string(),
  paymentForms: z.string(),
});

export type BudgetSchemaDto = z.infer<typeof BudgetSchema>;
