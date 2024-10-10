import { create } from 'zustand'

export type TAccount = {
  id: number | null
  isOpen: boolean
  onOpen: (id: number) => void
  onClose: () => void
}

export const useAccoutingDeleteZustand = create<TAccount>(set => ({
  isOpen: false,
  id: null,
  onOpen: (id: number) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: null }),
}))
