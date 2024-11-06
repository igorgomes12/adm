import { create } from 'zustand'

enum TelefoneType {
  TELEFONE = 'TELEFONE',
  CELULAR = 'CELULAR',
  WHATSAPP = 'WHATSAPP',
}

interface Telefone {
  number: string
  type: TelefoneType
  favorite: boolean
}

type TelefonesArray = [Telefone, ...Telefone[]]

interface Contact {
  description: string
  contact: string
  type: TelefoneType
  favorite: boolean
  telefones: TelefonesArray
}

export interface Address {
  street?: string // Updated to optional to match variant interface
  complement?: string
  postal_code?: string
  number?: string
  neighborhood?: string
  municipality_id?: number
  municipality_name?: string
  state_id?: number
  state?: string
  country_id?: number
  region_id?: number
  description?: string
  favorite?: boolean
  main?: boolean
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
  addresses: Address[]
  id_account: number
  name_account: string
  owner: Owner
}

interface FormStore {
  formData: FormDataStore
  updateFormData: (data: Partial<FormDataStore>) => void
  isMutationSuccess: boolean
  setMutationSuccess: (success: boolean) => void
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
        type: TelefoneType.TELEFONE,
        favorite: false,
        telefones: [
          {
            number: '',
            type: TelefoneType.TELEFONE,
            favorite: true,
          },
        ] as TelefonesArray,
      },
    ],
    addresses: [
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
        main: false,
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
    set(state => ({
      formData: {
        ...state.formData,
        ...data,
        owner: {
          ...state.formData.owner,
          ...data.owner,
        },
        contacts: data.contacts
          ? data.contacts.map(contact => ({
              description: contact.description || '',
              contact: contact.contact || '',
              type: contact.type || TelefoneType.TELEFONE,
              favorite: contact.favorite ?? false,
              telefones: contact.telefones?.length
                ? contact.telefones
                : [{ number: '', type: TelefoneType.TELEFONE, favorite: true }],
            }))
          : state.formData.contacts,
      },
    })),
  isMutationSuccess: false,
  setMutationSuccess: success => set({ isMutationSuccess: success }),
}))
