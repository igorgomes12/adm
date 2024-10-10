import { create } from 'zustand'

interface IUserAddProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useAddUserZustand = create<IUserAddProps>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
