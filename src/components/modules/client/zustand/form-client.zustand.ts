import { create } from 'zustand'

interface Contact {
  description: string
  contact: string
  type: 'EMAIL'
  favorite: boolean
}

interface Address {
  street: string
  complement: string
  postal_code: string
  number: string
  neighborhood: string
  municipality_id: number
  municipality_name: string
  state_id: number
  state: string
  country_id: number
  region_id: number
  description: string
  favorite: boolean
}

interface Owner {
  name: string
  cpf_cnpj: string
  birth_date: string
}

interface FormDataStore {
  corporate_name: string
  fantasy_name: string
  cpf_cnpj: string
  state_registration: string
  municipal_registration: string
  rural_registration: string
  establishment_typeId: number
  systemsId: number
  contacts: Contact[]
  address: Address[]
  id_account: number
  name_account: string
  owner: Owner[]
}

interface FormStore {
  formData: FormDataStore
  updateFormData: (data: Partial<FormDataStore>) => void
}

export const useFormStore = create<FormStore>(set => ({
  formData: {
    corporate_name: '',
    fantasy_name: '',
    cpf_cnpj: '',
    state_registration: '',
    municipal_registration: '',
    rural_registration: '',
    establishment_typeId: 1,
    systemsId: 1,
    contacts: [],
    address: [],
    id_account: 1,
    name_account: '',
    owner: [],
  },
  updateFormData: data =>
    set(state => ({
      formData: { ...state.formData, ...data },
    })),
}))
