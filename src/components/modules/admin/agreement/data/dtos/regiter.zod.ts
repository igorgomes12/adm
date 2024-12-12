import { z } from "zod";

export const DadosRegisterSchema = z.object({
  id: z
    .number({ invalid_type_error: "ID deve ser um número" })
    .optional()
    .or(z.undefined()),
  time: z
    .string({ required_error: "Hora é obrigatória" })
    .refine((val) => !Number.isNaN(Date.parse(val)), {
      message: "Formato de data inválido para hora",
    })
    .optional()
    .or(z.undefined()),
  channel: z
    .string({ invalid_type_error: "Canal deve ser uma string" })
    .optional()
    .or(z.undefined()),
  description: z
    .string({ invalid_type_error: "Descrição deve ser uma string" })
    .optional()
    .or(z.undefined()),
  value: z
    .string({ invalid_type_error: "Valor deve ser uma string" })
    .optional()
    .or(z.undefined()),
});

export type TSchemaDadosRegisterSchema = z.infer<typeof DadosRegisterSchema>;

export const ResponsableSchema = z.object({
  client: z.string().optional(),
});

export type TSchemaResponsableSchema = z.infer<typeof ResponsableSchema>;

export const paymentSchema = z.object({
  paymment: z.string().optional(),
  formpayment: z.string().optional(),
  observation: z.string().optional(),
});

export type TSchemaPaymentSchema = z.infer<typeof paymentSchema>;

export const situationSchema = z.object({
  situation: z.string().optional(),
  situatonpayment: z.string().optional(),
});
export type TSchemaSituationSchema = z.infer<typeof situationSchema>;

export const RegisterSchema = z.object({
  dados: DadosRegisterSchema,
  responsavel: ResponsableSchema,
  payment: paymentSchema,
  situation: situationSchema,
});

export type TSchemaRegisterSchema = z.infer<typeof RegisterSchema>;
