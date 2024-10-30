import { create } from 'zustand'

export interface ClientFormDataStore {
  empresa: {
    corporate_name: string
    fantasy_name: string
    cpf_cnpj: string
    state_registration?: string
    municipal_registration?: string
    rural_registration?: string
    name_account: string
    createdAt?: string
  }
  contact: {
    description?: string
    contact: string
    type: string
    favorite: boolean
  }[]
  address: {
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
  }[]
  representative: {
    name: string
    cpf_cnpj: string
    birth_date: string
  }[]
  accounting: {
    id_account: number
    establishment_typeId: number
    systemsId: number
  }
}

export interface ClientFormStore {
  formData: ClientFormDataStore
  updateFormData: (data: Partial<ClientFormDataStore>) => void
  isMutationSuccess: boolean
  setMutationSuccess: (success: boolean) => void
}

export const useClientFormStore = create<ClientFormStore>(set => ({
  formData: {
    empresa: {
      corporate_name: '',
      fantasy_name: '',
      cpf_cnpj: '',
      state_registration: '',
      municipal_registration: '',
      rural_registration: '',
      name_account: '',
      createdAt: '',
    },
    contact: [
      {
        description: '',
        contact: '',
        type: '',
        favorite: false,
      },
    ],
    address: [
      {
        street: '',
        complement: '',
        postal_code: '',
        number: '',
        neighborhood: '',
        municipality_id: 0,
        municipality_name: '',
        state_id: 0,
        state: '',
        country_id: 0,
        region_id: 0,
        description: '',
        favorite: false,
      },
    ],
    representative: [
      {
        name: '',
        cpf_cnpj: '',
        birth_date: '',
      },
    ],
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
