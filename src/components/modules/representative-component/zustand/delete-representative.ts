import { create } from 'zustand'

export type TRepresentative = {
  id: number | null
  isOpen: boolean
  onOpen: (id: number) => void
  onClose: () => void
}

export const useRepresentativeDeleteZustand = create<TRepresentative>(set => ({
  isOpen: false,
  id: null,
  onOpen: (id: number) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: null }),
}))
