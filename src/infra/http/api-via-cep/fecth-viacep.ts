import api from '@/infra/auth/database/acess-api/interceptors-axios'

export interface AddressData {
  cep: string
  logradouro: string
  complemento: string
  unidade: string
  bairro: string
  localidade: string
  uf: string
  estado: string
  regiao: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

export const fetchViaCep = async (cep: string): Promise<AddressData> => {
  const response = await api.get<AddressData>(
    `https://viacep.com.br/ws/${cep}/json/`,
  )
  return response.data
}
