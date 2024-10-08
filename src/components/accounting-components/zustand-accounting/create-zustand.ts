import { create } from 'zustand'

export type Accounting = {
  id: number
  name: string
  telefone: string
  crc: string
  cnpj: string
}

export type AccountingStore = {
  isOpen: boolean
  accountings: Accounting[]
  onOpen: () => void
  onClose: () => void
  addAccounting: (accounting: Accounting) => void
  editAccounting: (id: number, updatedAccounting: Accounting) => void
  deleteAccounting: (id: number) => void
}

export const useAccountingStore = create<AccountingStore>(set => ({
  isOpen: false,
  accountings: [],
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  addAccounting: accounting =>
    set(state => ({ accountings: [...state.accountings, accounting] })),
  editAccounting: (id, updatedAccounting) =>
    set(state => ({
      accountings: state.accountings.map(accounting =>
        accounting.id === id ? updatedAccounting : accounting,
      ),
    })),
  deleteAccounting: id =>
    set(state => ({
      accountings: state.accountings.filter(accounting => accounting.id !== id),
    })),
}))
