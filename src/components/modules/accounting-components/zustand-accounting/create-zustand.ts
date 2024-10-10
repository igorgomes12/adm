import { create } from 'zustand'
export type AccountingStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useAccountingStore = create<AccountingStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
