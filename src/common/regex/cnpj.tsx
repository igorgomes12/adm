export const formatCNPJ = (inputValue: string): string => {
  let formattedValue = inputValue.replace(/\D/g, "")

  if (formattedValue.length > 14) {
    formattedValue = formattedValue.substring(0, 14)
  }

  formattedValue = formattedValue.replace(/^(\d{2})(\d)/, "$1.$2")
  formattedValue = formattedValue.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
  formattedValue = formattedValue.replace(/\.(\d{3})(\d)/, ".$1/$2")
  formattedValue = formattedValue.replace(/(\d{4})(\d)/, "$1-$2")

  return formattedValue
}
