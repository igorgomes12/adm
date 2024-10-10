import { create } from 'zustand'

export type TSystem = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useSystemZustand = create<TSystem>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
