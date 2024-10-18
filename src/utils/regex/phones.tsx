// Função para formatar o número de telefone
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length === 11
    ? cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3') // Celular com 9 dígitos
    : cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3') // Telefone fixo
}

// Expressão regular para validar o formato correto de telefone e celular
export const phoneRegex = /^$$\d{2}$$ \d{4,5}-\d{4}$/
