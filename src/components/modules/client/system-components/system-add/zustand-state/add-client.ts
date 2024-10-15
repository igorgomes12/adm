import { create } from 'zustand'

export type TClient = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useAddClientZustand = create<TClient>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export type Client = {
  id: number
  corporateName: string
  fantasyName: string
  cpfCnpj: string
  stateRegistration: string
  municipalRegistration: string
  ruralRegistration: string
  system: string
  contacts: Array<{
    description: string
    contact: string
    type: string
    main_account: boolean
  }>
  addresses: Array<{
    street: string
    complement: string
    postal_code: string
    number: string
    neighborhood: string
    municipality_id: number
  }>
  owners: Array<{
    name: string
    cpf_cnpj: string
    birthDate: string
  }>
  inDebt?: boolean
}
