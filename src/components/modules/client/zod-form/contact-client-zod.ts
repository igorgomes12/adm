import { z } from 'zod'

// Define o esquema para cada telefone
const telefoneSchema = z.object({
  number: z.string().nonempty({ message: 'Número de telefone é obrigatório' }), // Exemplo de validação não vazia
  type: z.enum(['TELEFONE', 'WHATSAPP', 'CELULAR']),
  favorite: z.boolean().default(false), // Define um padrão para favorite
})

// Expande o esquema principal para contatos
export const contactSchemaDto = z.object({
  description: z.string().min(1, { message: 'É obrigatório uma descrição' }),
  contact: z
    .string()
    .email({ message: 'Formato de email inválido' })
    .min(4, { message: 'É obrigatório um email válido' }),
  telefones: z
    .array(telefoneSchema)
    .nonempty({ message: 'É obrigatório ter pelo menos um telefone' }), // Certifica que sempre haja pelo menos um telefone
})

export type TContactDto = z.infer<typeof contactSchemaDto>
