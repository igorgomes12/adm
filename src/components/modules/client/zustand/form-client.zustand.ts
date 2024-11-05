import { create } from 'zustand'

// Define a interface para cada telefone
interface Telefone {
  number: string
  type: 'TELEFONE' | 'WHATSAPP' | 'CELULAR'
  favorite: boolean
}

// Expande a interface Contact para incluir uma lista de telefones
interface Contact {
  description: string
  contact: string
  type: 'TELEFONE' | 'WHATSAPP' | 'CELULAR'
  favorite: boolean
  telefones: Telefone[] // Corrigido para ser um array de objetos Telefone
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

export interface Owner {
  name: string
  cpf_cnpj: string
  birth_date: string
  observation: string
}

export interface Representative {
  representative: string
  channel_entry: string
  region: string
}

interface FormDataStore {
  representative: Representative
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
  owner: Owner
}

interface FormStore {
  formData: FormDataStore
  updateFormData: (data: Partial<FormDataStore>) => void
}

export const useFormStore = create<FormStore>(set => ({
  formData: {
    representative: {
      representative: '',
      channel_entry: '',
      region: '',
    },
    corporate_name: '',
    fantasy_name: '',
    cpf_cnpj: '',
    state_registration: '',
    municipal_registration: '',
    rural_registration: '',
    establishment_typeId: 1,
    systemsId: 1,
    contacts: [
      {
        description: '',
        contact: '',
        type: 'TELEFONE',
        favorite: false,
        telefones: [],
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
    id_account: 1,
    name_account: '',
    owner: {
      name: '',
      cpf_cnpj: '',
      birth_date: '',
      observation: '',
    },
  },
  updateFormData: data =>
    set(state => {
      // Atualize o owner com valores padrão se não forem fornecidos
      const updatedOwner: Owner = {
        name: data.owner?.name ?? state.formData.owner.name,
        cpf_cnpj: data.owner?.cpf_cnpj ?? state.formData.owner.cpf_cnpj,
        birth_date: data.owner?.birth_date ?? state.formData.owner.birth_date,
        observation:
          data.owner?.observation ?? state.formData.owner.observation,
      }

      const updatedContacts =
        data.contacts?.map(contact => ({
          description: contact?.description || '',
          contact: contact?.contact || '',
          type: contact?.type || 'TELEFONE',
          favorite: contact?.favorite ?? false,
          telefones: contact?.telefones || [],
        })) || state.formData.contacts

      return {
        formData: {
          ...state.formData,
          ...data,
          owner: updatedOwner,
          contacts: updatedContacts,
        },
      }
    }),
}))
