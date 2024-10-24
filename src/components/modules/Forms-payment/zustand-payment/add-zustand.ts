import { create } from 'zustand'

export type TPayment = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useAddPaymentZustand = create<TPayment>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
