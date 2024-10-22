import { create } from 'zustand'

export interface FormDataStore {
  id?: number
  name?: string
  type?: 'REPRESENTATIVE' | 'CONSULTANT' | 'PARTHER'
  region?: string
  supervisor?: string
  status: string
  commission?: {
    implantation?: number
    mensality?: number
  }
  contact?: {
    cellphone: string
    phone: string
    email: string
    main_account?: boolean
  }
  address?: {
    postal_code?: string
    street?: string
    number?: string
    neighborhood?: string
    municipality_name?: string
    state?: string
    complement?: string
  }
}

interface FormStore {
  formData: FormDataStore
  updateFormData: (data: Partial<FormDataStore>) => void
}

export const useFormStore = create<FormStore>(set => ({
  formData: {
    status: 'ativo',
    contact: {
      cellphone: '',
      phone: '',
      email: '',
    },
  },
  updateFormData: data =>
    set(state => ({
      formData: { ...state.formData, ...data },
    })),
}))
