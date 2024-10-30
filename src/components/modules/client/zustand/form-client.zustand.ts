import { create } from 'zustand'

interface FormDataClientStore {
  id?: number
  inDebt?: boolean
  identifier?: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string | null
  corporate_name?: string
  fantasy_name?: string
  contacts?: Array<{
    name: string
    contact: string
    telefones: Array<{
      number: string
      type: 'TELEFONE' | 'WHATSAPP' | 'CELULAR'
      favorite: boolean
    }>
    description?: string
  }>
  cpf_cnpj?: string
  state_registration?: string
  municipal_registration?: string | null
  rural_registration?: string | null
  address?: Array<{
    postal_code: string
    street: string
    number: string
    neighborhood: string
    municipality_id: number
    municipality_name: string
    state_id: number
    state: string
    country_id: number
    region_id: number
    description?: string
    main: boolean
  }>
  name_account?: string
  id_account?: number
  establishment_typeId?: number
  systemsId?: number
  owner?: Array<{
    name: string
    cpf_cnpj: string
    birth_date: string
  }>
}

interface FormClientStore {
  formData: FormDataClientStore
  updateFormData: (data: Partial<FormDataClientStore>) => void
  isMutationSuccess: boolean
  setMutationSuccess: (success: boolean) => void
}

export const useFormClientStore = create<FormClientStore>(set => ({
  formData: {
    address: [],
  },
  updateFormData: data =>
    set(state => ({
      formData: { ...state.formData, ...data },
    })),
  isMutationSuccess: false,
  setMutationSuccess: success => set({ isMutationSuccess: success }),
}))
