import { format } from "date-fns"

/**
 * Formata uma data no formato "dd/MM/yyyy".
 * @param date - Data a ser formatada.
 * @returns Uma string com a data formatada ou "Data não disponível" se a data for nula ou indefinida.
 */
export const formatarData = (date: Date | null | undefined): string => {
  return date ? format(date, "dd/MM/yyyy") : "Data não disponível"
}

/**
 * Formata a hora no formato "HH:mm:ss".
 * @param date - Data a partir da qual a hora será extraída e formatada.
 * @returns Uma string com a hora formatada ou "Hora não disponível" se a data for nula ou indefinida.
 */
export const formatarHora = (date: Date | null | undefined): string => {
  return date ? format(date, "HH:mm:ss") : "Hora não disponível"
}
