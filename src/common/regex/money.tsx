export function formatCurrency(value: string) {
  // Remove tudo que não for dígito
  const onlyDigits = value.replace(/\D/g, "")

  // Formatando o valor para BRL
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number.parseFloat(onlyDigits) / 100)

  return formattedValue
}

export function validateCurrency(value: string) {
  // Regex para validar o formato BRL
  const regex = /^R\$\s?\d{1,3}(\.\d{3})*,\d{2}$/
  return regex.test(value)
}
