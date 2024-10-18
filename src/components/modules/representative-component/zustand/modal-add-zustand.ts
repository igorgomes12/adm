import { create } from 'zustand'

export type TModalAdd = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useCreateModalRepresentativeZustand = create<TModalAdd>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
