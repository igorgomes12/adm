import { create } from 'zustand'

export type TSystem = {
  id: number | null
  isOpen: boolean
  onOpen: (id: number) => void
  onClose: () => void
}

export const useUserDeleteZustand = create<TSystem>(set => ({
  isOpen: false,
  id: null,
  onOpen: id => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: null }),
}))
