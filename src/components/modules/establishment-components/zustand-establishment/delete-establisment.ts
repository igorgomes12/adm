import { create } from 'zustand'

export type TEstablishmentEdit = {
  id: number | null
  isOpen: boolean
  onOpen: (id: number) => void
  onClose: () => void
}

export const useEstablishmentDeleteZustand = create<TEstablishmentEdit>(
  set => ({
    id: null,
    isOpen: false,
    onOpen: (id: number) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false, id: null }),
  }),
)
