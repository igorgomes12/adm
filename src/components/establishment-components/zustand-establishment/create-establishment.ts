import { create } from 'zustand'

export type TEstablishment = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useEstablishmentZustand = create<TEstablishment>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
