import { create } from 'zustand'

type PaymentState = {
  id: number | null
  isOpen: boolean
  mode: 'add' | 'edit' | 'delete'
  onOpen: (mode: 'add' | 'edit' | 'delete', id?: number) => void
  onClose: () => void
}

export const usePaymentZustand = create<PaymentState>(set => ({
  id: null,
  isOpen: false,
  mode: 'add',
  onOpen: (mode, id) => set({ isOpen: true, mode, id: id ?? null }),
  onClose: () => set({ isOpen: false, id: null, mode: 'add' }),
}))
