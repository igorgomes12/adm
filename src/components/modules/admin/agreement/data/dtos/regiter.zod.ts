import { z } from "zod";
export const RegisterSchema = z.object({
  id: z.number().int().positive().optional(),
  time: z.string().optional(),
  channel: z.string().optional(),
  description: z.string().optional(),
  value: z.string().optional(),
  client: z.string().optional(),
  paymment: z.string().optional(),
  formpayment: z.string().optional(),
  observation: z.string().optional(),
  situation: z.string().optional(),
  situatonpayment: z.string().optional(),
});

export type TSchemaRegisterSchema = z.infer<typeof RegisterSchema>;
