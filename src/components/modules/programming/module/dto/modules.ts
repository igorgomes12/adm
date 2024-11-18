import { z } from "zod";

export const ModuleSchemaDto = z.object({
  id: z
    .number()
    .int()
    .positive({ message: "O ID do modulo é obrigatório" })
    .optional(),

  system: z
    .string()
    .min(1, { message: "O sistema é obrigatório" })
    .min(5, { message: "O sistema deve ter pelo menos 5 caracteres" })
    .max(100, {
      message: "O sistema deve ter no máximo 100 caracteres",
    }),

  module: z
    .string()
    .min(1, { message: "O nome do modulo é obrigatório" })
    .min(5, { message: "O nome do modulo deve ter pelo menos 5 caracteres" })
    .max(100, {
      message: "O nome do modulo deve ter no máximo 100 caracteres",
    }),

  status: z.enum(["Ativo", "Inativo"]).default("Ativo"),
});
export type TModuleSchemaDto = z.infer<typeof ModuleSchemaDto>;
