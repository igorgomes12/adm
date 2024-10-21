import { create } from 'zustand'

interface FormData {
  id?: number
  name?: string
  type?: 'REPRESENTATIVE' | 'CONSULTANT' | 'PARTHER'
  region?: string
  supervisor?: string
  status?: 'ativo' | 'inativo'
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
  created_at?: Date
}

interface FormStore {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export const useFormStore = create<FormStore>(set => ({
  formData: {
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
