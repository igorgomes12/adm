import { create } from 'zustand'

export type TClientZustand = {
  id: number | null
  isOpen: boolean
  onOpen: (id: number) => void
  onClose: () => void
}

export const useClientDeleteZustand = create<TClientZustand>(set => ({
  isOpen: false,
  id: null,
  onOpen: (id: number) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: null }),
}))
