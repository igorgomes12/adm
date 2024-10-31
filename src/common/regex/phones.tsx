// Função para formatar o número de telefone
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "")
  return cleaned.length === 11
    ? cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") // Celular com 9 dígitos
    : cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3") // Telefone fixo
}

// Expressão regular para validar o formato correto de telefone e celular
export const phoneRegex = /^$$\d{2}$$ \d{4,5}-\d{4}$/

export const applyMask = (value: string, mask: string): string => {
  let formattedValue = ""
  let maskIndex = 0
  for (let i = 0; i < value.length && maskIndex < mask.length; i++) {
    if (/\d/.test(value[i])) {
      while (maskIndex < mask.length && mask[maskIndex] !== "9") {
        formattedValue += mask[maskIndex++]
      }
      formattedValue += value[i]
      maskIndex++
    }
  }
  return formattedValue
}
