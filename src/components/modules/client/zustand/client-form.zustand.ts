import { create } from 'zustand'

interface ClientFormDataStore {
  enterprise: {
    corporate_name: string
    fantasy_name: string
    cpf_cnpj: string
    state_registration: string
    municipal_registration?: string
    rural_registration?: string
    name_account: string
    id_account: number
    establishment_typeId: number
    systemsId: number
  }
  contact: {
    contacts: Array<{
      cellphone: string
      phone: string
      email: string
      description?: string
      favorite?: boolean
    }>
  }
  address: {
    addresses: Array<{
      postal_code?: string
      street?: string
      number?: string
      neighborhood?: string
      municipality_name?: string
      state?: string
      complement?: string
    }>
  }
  representative: {
    owner: Array<{
      name: string
      cpf_cnpj: string
      birth_date: string
    }>
  }
  accounting: {
    id_account: number
    establishment_typeId: number
    systemsId: number
  }
}

interface ClientFormStore {
  formData: ClientFormDataStore
  updateFormData: (data: Partial<ClientFormDataStore>) => void
  isMutationSuccess: boolean
  setMutationSuccess: (success: boolean) => void
}

export const useClientFormStore = create<ClientFormStore>(set => ({
  formData: {
    enterprise: {
      corporate_name: '',
      fantasy_name: '',
      cpf_cnpj: '',
      state_registration: '',
      name_account: '',
      id_account: 0,
      establishment_typeId: 0,
      systemsId: 0,
    },
    contact: {
      contacts: [],
    },
    address: {
      addresses: [],
    },
    representative: {
      owner: [],
    },
    accounting: {
      id_account: 0,
      establishment_typeId: 0,
      systemsId: 0,
    },
  },
  updateFormData: data =>
    set(state => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),
  isMutationSuccess: false,
  setMutationSuccess: success => set({ isMutationSuccess: success }),
}))
