import { create } from 'zustand'

export type TSystem = {
  id: number | null
  isOpen: boolean
  onOpen: (id: number) => void
  onClose: () => void
}

export const useSystemEditZustand = create<TSystem>(set => ({
  isOpen: false,
  id: null,
  onOpen: (id: number) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: null }),
}))
