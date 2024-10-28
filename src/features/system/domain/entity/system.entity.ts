import { create } from 'zustand'

export type ModalType = 'edit' | 'add' | 'delete' | null

export type TSystem = {
  id: number | null
  isOpen: boolean
  modalType: ModalType
  searchTerm: string
  onOpen: (id: number, type: ModalType) => void
  onClose: () => void
  setSearchTerm: (term: string | ((prev: string) => string)) => void
}

export const useSystemZustand = create<TSystem>(set => ({
  isOpen: false,
  id: null,
  modalType: null,
  searchTerm: '',
  onOpen: (id, type) => set({ isOpen: true, id, modalType: type }),
  onClose: () => set({ isOpen: false, id: null, modalType: null }),
  setSearchTerm: term =>
    set(state => ({
      searchTerm: typeof term === 'function' ? term(state.searchTerm) : term,
    })),
}))
